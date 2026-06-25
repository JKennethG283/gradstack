from __future__ import annotations

import argparse
import copy
import json
import os
import re
import time
import uuid
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Literal, TypedDict

from langchain_core.messages import HumanMessage, SystemMessage
from langgraph.graph import END, StateGraph

try:
    from jsonschema import Draft202012Validator
except ImportError as exc:  # pragma: no cover - shown as a setup error.
    raise SystemExit(
        "Missing dependency: jsonschema. Install dependencies from scripts/requirements.txt."
    ) from exc


# This script lives in <task>/scripts/, while data/ and .env live one level up.
BASE_DIR = Path(__file__).resolve().parent
PROJECT_DIR = BASE_DIR.parent
RAW_INPUT_PATH = PROJECT_DIR / "data" / "raw" / "jordan-unfiltered-input.json"
SCHEMA_PATH = PROJECT_DIR / "data" / "schema" / "dhp-profile-page.schema.json"
CANONICAL_REFERENCE_PATH = PROJECT_DIR / "data" / "reference" / "dhp-profile-page.reference.json"
GENERATED_DIR = PROJECT_DIR / "data" / "generated"
OUTPUT_DIR = GENERATED_DIR / "outputs"
METRICS_DIR = GENERATED_DIR / "metrics"
MANIFEST_PATH = GENERATED_DIR / "manifest.json"

try:
    from dotenv import load_dotenv

    load_dotenv(PROJECT_DIR / ".env")
except Exception:
    pass


ToneId = Literal["supportive-coach", "employer-ready", "product-structured"]


@dataclass(frozen=True)
class PromptVariant:
    tone_id: ToneId
    label: str
    tone_instruction: str


@dataclass(frozen=True)
class ModelConfig:
    provider: Literal["gemini-flash", "gemini-flash-lite"]
    display_name: str
    model_name: str


class EvalState(TypedDict, total=False):
    run_id: str
    model: ModelConfig
    prompt: PromptVariant
    raw_input: dict[str, Any]
    schema: dict[str, Any]
    canonical_output: dict[str, Any]
    system_prompt: str
    user_prompt: str
    raw_response: str
    parsed_json: dict[str, Any]
    parse_error: str | None
    validation_errors: list[str]
    normalization_notes: list[str]
    attempts: int
    metrics: dict[str, Any]
    started_at: float
    dry_run: bool


PROMPTS: list[PromptVariant] = [
    PromptVariant(
        tone_id="supportive-coach",
        label="Supportive coach",
        tone_instruction=(
            "Write in a supportive coaching tone. Help Jordan feel seen while staying precise, "
            "professional, and evidence-based."
        ),
    ),
    PromptVariant(
        tone_id="employer-ready",
        label="Employer-ready",
        tone_instruction=(
            "Write in a concise employer-facing tone. Prioritise proof, trust, role fit, and clear "
            "signals that a hiring team could scan quickly."
        ),
    ),
    PromptVariant(
        tone_id="product-structured",
        label="Product-structured",
        tone_instruction=(
            "Write in a product-system tone. Make the sections consistent, structured, and ready for "
            "a frontend renderer to display without extra interpretation."
        ),
    ),
]


def read_json(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, data: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2, ensure_ascii=True) + "\n", encoding="utf-8")


def compact_json(data: dict[str, Any]) -> str:
    return json.dumps(data, ensure_ascii=True, separators=(",", ":"))


def build_model_configs() -> list[ModelConfig]:
    return [
        ModelConfig(
            provider="gemini-flash",
            display_name=os.getenv("GEMINI_FLASH_DISPLAY_NAME", "Gemini Flash"),
            model_name=os.getenv("GEMINI_FLASH_MODEL", "gemini-flash-latest"),
        ),
        ModelConfig(
            provider="gemini-flash-lite",
            display_name=os.getenv("GEMINI_FLASH_LITE_DISPLAY_NAME", "Gemini Flash-Lite"),
            model_name=os.getenv("GEMINI_FLASH_LITE_MODEL", "gemini-flash-lite-latest"),
        ),
    ]


def build_chat_model(config: ModelConfig):
    from langchain_google_genai import ChatGoogleGenerativeAI

    api_key = os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY")
    return ChatGoogleGenerativeAI(
        model=config.model_name,
        temperature=0.2,
        google_api_key=api_key,
        timeout=120,
        # The DHP profile JSON is large; a generous output cap avoids the model
        # truncating mid-object and producing unparseable JSON.
        max_output_tokens=int(os.getenv("MAX_OUTPUT_TOKENS", "8192")),
    )


def has_required_key(config: ModelConfig) -> bool:
    return bool(os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY"))


def build_prompt_node(state: EvalState) -> EvalState:
    schema = state["schema"]
    raw_input = state["raw_input"]
    canonical_output = state["canonical_output"]
    prompt = state["prompt"]

    state["system_prompt"] = (
        "You are an AI assistant helping Gradstack transform raw graduate information "
        "into one page-ready Digital Human Profile JSON object. Preserve the same page "
        "contract, density, IDs, and DHP product language as the canonical reference page. "
        "Return only valid JSON. Do not include markdown, comments, or code fences."
    )
    state["user_prompt"] = f"""
Transform the raw input into one JSON object that strictly follows this JSON Schema.

Tone requirement:
{prompt.tone_instruction}

Canonical DHP page reference:
Use this JSON as the display contract and style benchmark for the generated page. The raw
input for this task describes the same candidate, so the generated page should feel like a
tone variation of this DHP page, not a different resume/profile format.
{compact_json(canonical_output)}

Hard rules:
- Output only JSON.
- Use schemaVersion "dhp-profile-page.v1".
- Do not invent qualifications, employers, certificates, or verified evidence.
- Mark unverified details as pending, suggested, or needs evidence.
- Scores must be integers from 0 to 100.
- Confidence values must be integers from 1 to 5.
- Use stable kebab-case IDs.
- Keep display strings concise enough for a DHP page.
- Keep the five DHP rail labels exactly: Story, Skill, Proof, Trust, Index.
- Keep the VEI and VCI index links as short product links, with target anchors that the DHP page renderer can use.
- Keep the capability match panel focused on the three raw job ads. Do not rename employers or create new roles.
- Keep the VCI as the five-layer DHP capability model from the reference page, including AI Literacy & Fluency.
- Keep the same section density as the reference page, especially readiness signals, VEI signals, VCI layers, and opportunity impact.
- Tone can change wording, but it must not change the page structure or turn the DHP into a generic CV.

JSON Schema:
{compact_json(schema)}

Raw input:
{compact_json(raw_input)}
""".strip()
    return state


def dry_run_json(state: EvalState) -> dict[str, Any]:
    base = state["canonical_output"]
    prompt = state["prompt"]
    model = state["model"]
    data = copy.deepcopy(base)
    data["sourceSummary"]["assumptions"].append(
        f"Dry-run preview for {model.display_name} using the {prompt.label} prompt."
    )
    data["profileHeader"]["headline"] = (
        f"[Dry run: {prompt.label}] " + data["profileHeader"]["headline"]
    )
    data["dhpView"]["personalStory"] = (
        f"This is a dry-run placeholder for {model.display_name}. "
        + data["dhpView"]["personalStory"]
    )
    return data


def call_model_node(state: EvalState) -> EvalState:
    started = time.perf_counter()
    state["started_at"] = started

    if state.get("dry_run"):
        data = dry_run_json(state)
        state["raw_response"] = json.dumps(data, ensure_ascii=True)
        state["metrics"] = {
            "status": "dry_run",
            "input_tokens": None,
            "output_tokens": None,
            "total_tokens": None,
            "latency_ms": 0,
        }
        return state

    model_config = state["model"]
    if not has_required_key(model_config):
        raise RuntimeError(
            f"Missing API key for {model_config.display_name}: set GOOGLE_API_KEY or GEMINI_API_KEY."
        )

    chat_model = build_chat_model(model_config)
    config: dict[str, Any] = {
        "metadata": {
            "run_id": state["run_id"],
            "provider": model_config.provider,
            "model": model_config.model_name,
            "prompt_tone": state["prompt"].tone_id,
        },
        "tags": ["gradstack", "dhp-json", model_config.provider, state["prompt"].tone_id],
    }

    response = chat_model.invoke(
        [SystemMessage(content=state["system_prompt"]), HumanMessage(content=state["user_prompt"])],
        config=config,
    )
    latency_ms = round((time.perf_counter() - started) * 1000)
    state["raw_response"] = stringify_response_content(response.content)
    usage = extract_usage(response)
    state["metrics"] = {
        "status": "completed",
        "input_tokens": usage.get("input_tokens"),
        "output_tokens": usage.get("output_tokens"),
        "total_tokens": usage.get("total_tokens"),
        "latency_ms": latency_ms,
    }
    return state


def stringify_response_content(content: Any) -> str:
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        parts: list[str] = []
        for item in content:
            if isinstance(item, dict):
                parts.append(str(item.get("text") or item.get("content") or ""))
            else:
                parts.append(str(item))
        return "\n".join(part for part in parts if part)
    return str(content)


def extract_usage(response: Any) -> dict[str, int | None]:
    usage = getattr(response, "usage_metadata", None) or {}
    response_metadata = getattr(response, "response_metadata", None) or {}
    token_usage = response_metadata.get("token_usage") or response_metadata.get("usage") or {}

    input_tokens = (
        usage.get("input_tokens")
        or usage.get("prompt_tokens")
        or token_usage.get("prompt_tokens")
        or token_usage.get("input_tokens")
    )
    output_tokens = (
        usage.get("output_tokens")
        or usage.get("completion_tokens")
        or token_usage.get("completion_tokens")
        or token_usage.get("output_tokens")
    )
    total_tokens = usage.get("total_tokens") or token_usage.get("total_tokens")

    if total_tokens is None and input_tokens is not None and output_tokens is not None:
        total_tokens = input_tokens + output_tokens

    return {
        "input_tokens": input_tokens,
        "output_tokens": output_tokens,
        "total_tokens": total_tokens,
    }


def parse_json_text(text: str) -> dict[str, Any]:
    cleaned = text.strip()
    fence_match = re.search(r"```(?:json)?\s*(.*?)```", cleaned, flags=re.DOTALL | re.IGNORECASE)
    if fence_match:
        cleaned = fence_match.group(1).strip()

    start = cleaned.find("{")
    end = cleaned.rfind("}")
    if start == -1 or end == -1 or end <= start:
        raise ValueError("No JSON object found in model response.")

    return json.loads(cleaned[start : end + 1])


def parse_node(state: EvalState) -> EvalState:
    state["attempts"] = state.get("attempts", 0) + 1
    try:
        state["parsed_json"] = parse_json_text(state["raw_response"])
        state["parse_error"] = None
    except (ValueError, json.JSONDecodeError) as exc:
        # A malformed or truncated response should feed the repair loop instead of
        # crashing the whole run.
        state["parsed_json"] = {}
        state["parse_error"] = f"Response was not valid JSON: {exc}"
    return state


def validate_json(schema: dict[str, Any], data: dict[str, Any]) -> list[str]:
    validator = Draft202012Validator(schema)
    errors = sorted(validator.iter_errors(data), key=lambda error: list(error.path))
    return [
        f"{'/'.join(str(part) for part in error.path) or '<root>'}: {error.message}"
        for error in errors
    ]


DISPLAY_CONTRACT_PATHS: tuple[tuple[str, ...], ...] = (
    ("profileHeader", "railLabels"),
    ("profileHeader", "indexLinks"),
    ("matchPanel", "title"),
    ("matchPanel", "intro"),
    ("matchPanel", "selectedMatchId"),
    ("indexes", "readinessSignals"),
    ("indexes", "verifiedEmployabilityIndex", "signals"),
    ("indexes", "verifiedEmployabilityIndex", "trend"),
    ("indexes", "verifiedEmployabilityIndex", "opportunityImpact"),
    ("indexes", "verifiedCapabilityIndex", "layers"),
    ("indexes", "verifiedCapabilityIndex", "aiFluencySignals"),
    ("indexes", "verifiedCapabilityIndex", "sectorBenchmarks"),
    ("indexes", "verifiedCapabilityIndex", "validationSources"),
)


def get_path(data: dict[str, Any], path: tuple[str, ...]) -> Any:
    current: Any = data
    for key in path:
        if not isinstance(current, dict) or key not in current:
            raise KeyError(".".join(path))
        current = current[key]
    return current


def set_path(data: dict[str, Any], path: tuple[str, ...], value: Any) -> None:
    current: dict[str, Any] = data
    for key in path[:-1]:
        next_value = current.get(key)
        if not isinstance(next_value, dict):
            next_value = {}
            current[key] = next_value
        current = next_value
    current[path[-1]] = value


def copy_display_contract_path(
    data: dict[str, Any],
    canonical_output: dict[str, Any],
    path: tuple[str, ...],
    notes: list[str],
) -> None:
    try:
        expected = get_path(canonical_output, path)
    except KeyError:
        return

    try:
        current = get_path(data, path)
    except KeyError:
        current = None

    if current != expected:
        set_path(data, path, copy.deepcopy(expected))
        notes.append(f"Aligned {'.'.join(path)} with the canonical DHP page contract.")


def opportunity_lookup_key(opportunity: dict[str, Any], key: str) -> str:
    return str(opportunity.get(key, "")).strip().lower()


def align_opportunities(data: dict[str, Any], canonical_output: dict[str, Any], notes: list[str]) -> None:
    panel = data.get("matchPanel")
    canonical_panel = canonical_output.get("matchPanel")
    if not isinstance(panel, dict) or not isinstance(canonical_panel, dict):
        return

    generated = panel.get("opportunities")
    canonical = canonical_panel.get("opportunities")
    if not isinstance(generated, list) or not isinstance(canonical, list):
        return

    by_id = {
        opportunity_lookup_key(item, "id"): item
        for item in generated
        if isinstance(item, dict)
    }
    by_title = {
        opportunity_lookup_key(item, "title"): item
        for item in generated
        if isinstance(item, dict)
    }

    aligned: list[dict[str, Any]] = []
    changed = False
    for canonical_item in canonical:
        if not isinstance(canonical_item, dict):
            continue

        generated_item = by_id.get(opportunity_lookup_key(canonical_item, "id"))
        if generated_item is None:
            generated_item = by_title.get(opportunity_lookup_key(canonical_item, "title"))

        aligned_item = copy.deepcopy(canonical_item)
        if isinstance(generated_item, dict):
            for key in ("status", "matchScore", "summary", "matchedSkills", "nextAction"):
                if key in generated_item:
                    aligned_item[key] = copy.deepcopy(generated_item[key])

        if generated_item != aligned_item:
            changed = True
        aligned.append(aligned_item)

    if aligned and (changed or len(aligned) != len(generated)):
        panel["opportunities"] = aligned
        notes.append("Aligned matchPanel.opportunities with the raw job-ad IDs and DHP opportunity order.")


def apply_display_contract(
    data: dict[str, Any],
    canonical_output: dict[str, Any],
) -> tuple[dict[str, Any], list[str]]:
    normalized = copy.deepcopy(data)
    notes: list[str] = []

    for path in DISPLAY_CONTRACT_PATHS:
        copy_display_contract_path(normalized, canonical_output, path, notes)
    align_opportunities(normalized, canonical_output, notes)

    return normalized, notes


def normalize_node(state: EvalState) -> EvalState:
    if state.get("parse_error"):
        state["normalization_notes"] = []
        return state

    normalized, notes = apply_display_contract(state["parsed_json"], state["canonical_output"])
    state["parsed_json"] = normalized
    state["normalization_notes"] = notes
    return state


def validate_node(state: EvalState) -> EvalState:
    if state.get("parse_error"):
        state["validation_errors"] = [f"<parse>: {state['parse_error']}"]
        return state
    errors = validate_json(state["schema"], state["parsed_json"])
    state["validation_errors"] = errors
    return state


def should_repair(state: EvalState) -> str:
    if not state.get("validation_errors"):
        return "done"
    if state.get("attempts", 0) >= 2 or state.get("dry_run"):
        return "failed"
    return "repair"


def repair_node(state: EvalState) -> EvalState:
    prompt = state["prompt"]
    model_config = state["model"]
    repair_prompt = f"""
The previous response did not match the JSON schema.

Validation errors:
{json.dumps(state["validation_errors"], indent=2)}

Return a corrected JSON object only. Keep the same tone: {prompt.tone_instruction}

JSON Schema:
{compact_json(state["schema"])}

Previous response:
{state["raw_response"]}
""".strip()

    chat_model = build_chat_model(model_config)
    config: dict[str, Any] = {
        "metadata": {
            "run_id": state["run_id"],
            "provider": model_config.provider,
            "model": model_config.model_name,
            "prompt_tone": prompt.tone_id,
            "repair": True,
        },
        "tags": ["gradstack", "dhp-json", "repair", model_config.provider, prompt.tone_id],
    }

    started = time.perf_counter()
    response = chat_model.invoke(
        [SystemMessage(content=state["system_prompt"]), HumanMessage(content=repair_prompt)],
        config=config,
    )
    repair_latency_ms = round((time.perf_counter() - started) * 1000)
    state["raw_response"] = stringify_response_content(response.content)
    usage = extract_usage(response)
    metrics = state.get("metrics", {})
    metrics["repair_latency_ms"] = repair_latency_ms
    metrics["repair_input_tokens"] = usage.get("input_tokens")
    metrics["repair_output_tokens"] = usage.get("output_tokens")
    metrics["repair_total_tokens"] = usage.get("total_tokens")
    if metrics.get("total_tokens") is not None and usage.get("total_tokens") is not None:
        metrics["total_tokens"] += usage["total_tokens"]
    state["metrics"] = metrics
    return state


def build_graph():
    graph = StateGraph(EvalState)
    graph.add_node("build_prompt", build_prompt_node)
    graph.add_node("call_model", call_model_node)
    graph.add_node("parse", parse_node)
    graph.add_node("normalize", normalize_node)
    graph.add_node("validate", validate_node)
    graph.add_node("repair", repair_node)

    graph.set_entry_point("build_prompt")
    graph.add_edge("build_prompt", "call_model")
    graph.add_edge("call_model", "parse")
    graph.add_edge("parse", "normalize")
    graph.add_edge("normalize", "validate")
    graph.add_conditional_edges(
        "validate",
        should_repair,
        {
            "done": END,
            "repair": "repair",
            "failed": END,
        },
    )
    graph.add_edge("repair", "parse")
    return graph.compile()


def output_file_name(model: ModelConfig, prompt: PromptVariant) -> str:
    return f"{model.provider}.{prompt.tone_id}.json"


def metrics_file_name(model: ModelConfig, prompt: PromptVariant) -> str:
    return f"{model.provider}.{prompt.tone_id}.metrics.json"


def run_one(
    app: Any,
    model: ModelConfig,
    prompt: PromptVariant,
    raw_input: dict[str, Any],
    schema: dict[str, Any],
    canonical_output: dict[str, Any],
    dry_run: bool,
) -> dict[str, Any]:
    run_id = str(uuid.uuid4())
    started_at = datetime.now(timezone.utc)
    state: EvalState = {
        "run_id": run_id,
        "model": model,
        "prompt": prompt,
        "raw_input": raw_input,
        "schema": schema,
        "canonical_output": canonical_output,
        "attempts": 0,
        "dry_run": dry_run,
    }

    result = app.invoke(state)
    errors = result.get("validation_errors", [])
    is_valid = not errors

    metrics = {
        "runId": run_id,
        "provider": model.provider,
        "displayName": model.display_name,
        "model": model.model_name,
        "promptToneId": prompt.tone_id,
        "promptLabel": prompt.label,
        "startedAt": started_at.isoformat(),
        "finishedAt": datetime.now(timezone.utc).isoformat(),
        "schemaValid": is_valid,
        "validationErrors": errors,
        "normalizationNotes": result.get("normalization_notes", []),
        "attempts": result.get("attempts", 0),
        "dryRun": dry_run,
        "outputChars": len(result.get("raw_response", "")),
        **result.get("metrics", {}),
    }

    if not is_valid:
        metrics["status"] = "schema_invalid"
        write_json(METRICS_DIR / metrics_file_name(model, prompt), metrics)
        raise RuntimeError(f"{model.display_name} / {prompt.label} failed schema validation: {errors}")

    output_path = OUTPUT_DIR / output_file_name(model, prompt)
    metrics_path = METRICS_DIR / metrics_file_name(model, prompt)
    write_json(output_path, result["parsed_json"])
    write_json(metrics_path, metrics)

    return {
        "runId": run_id,
        "provider": model.provider,
        "displayName": model.display_name,
        "model": model.model_name,
        "promptToneId": prompt.tone_id,
        "promptLabel": prompt.label,
        "outputPath": f"data/generated/outputs/{output_path.name}",
        "metricsPath": f"data/generated/metrics/{metrics_path.name}",
        "metrics": metrics,
    }


def build_manifest(runs: list[dict[str, Any]], dry_run: bool) -> dict[str, Any]:
    grouped: dict[str, dict[str, Any]] = {}
    for run in runs:
        key = run["provider"]
        grouped.setdefault(
            key,
            {
                "provider": run["provider"],
                "displayName": run["displayName"],
                "model": run["model"],
                "runs": [],
            },
        )
        grouped[key]["runs"].append(run)

    return {
        "schemaVersion": "dhp-prompt-eval-manifest.v1",
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "dryRun": dry_run,
        "sourceRawPath": "data/raw/jordan-unfiltered-input.json",
        "schemaPath": "data/schema/dhp-profile-page.schema.json",
        "models": list(grouped.values()),
    }


def load_existing_runs() -> list[dict[str, Any]]:
    if not MANIFEST_PATH.exists():
        return []
    try:
        manifest = read_json(MANIFEST_PATH)
    except Exception:
        return []
    runs: list[dict[str, Any]] = []
    for model in manifest.get("models", []):
        runs.extend(model.get("runs", []))
    return runs


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Run DHP JSON prompt evaluations with LangGraph and LangChain."
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Write preview outputs without calling external model APIs.",
    )
    parser.add_argument(
        "--provider",
        choices=[model.provider for model in build_model_configs()],
        help="Run only this model provider (default: all).",
    )
    parser.add_argument(
        "--tone",
        choices=[prompt.tone_id for prompt in PROMPTS],
        help="Run only this prompt tone (default: all).",
    )
    args = parser.parse_args()

    raw_input = read_json(RAW_INPUT_PATH)
    schema = read_json(SCHEMA_PATH)
    canonical_output = read_json(CANONICAL_REFERENCE_PATH)
    app = build_graph()

    models = [m for m in build_model_configs() if not args.provider or m.provider == args.provider]
    prompts = [p for p in PROMPTS if not args.tone or p.tone_id == args.tone]
    if not models or not prompts:
        raise SystemExit("No model/prompt combination matched the given filters.")

    is_partial = bool(args.provider or args.tone)

    runs: list[dict[str, Any]] = []
    failures = 0
    for model in models:
        for prompt in prompts:
            print(f"Running {model.display_name} ({model.model_name}) / {prompt.label}...")
            try:
                runs.append(
                    run_one(
                        app,
                        model,
                        prompt,
                        raw_input,
                        schema,
                        canonical_output,
                        args.dry_run,
                    )
                )
            except Exception as exc:  # one bad run must not kill the whole batch
                failures += 1
                print(f"  ! Failed: {exc}")
                runs.append(
                    {
                        "runId": "",
                        "provider": model.provider,
                        "displayName": model.display_name,
                        "model": model.model_name,
                        "promptToneId": prompt.tone_id,
                        "promptLabel": prompt.label,
                        "outputPath": None,
                        "metricsPath": None,
                        "metrics": {"status": "error", "error": str(exc)},
                    }
                )

    # On a partial run, merge with prior results so the manifest keeps the combos
    # we did not re-run this time.
    manifest_runs = runs
    if is_partial:
        ran_keys = {(r["provider"], r["promptToneId"]) for r in runs}
        kept = [
            r
            for r in load_existing_runs()
            if (r["provider"], r["promptToneId"]) not in ran_keys
        ]
        manifest_runs = kept + runs

    manifest = build_manifest(manifest_runs, args.dry_run)
    write_json(MANIFEST_PATH, manifest)
    print(f"Wrote manifest: {MANIFEST_PATH}")
    print(f"Completed {len(runs) - failures}/{len(runs)} runs ({failures} failed).")


if __name__ == "__main__":
    main()
