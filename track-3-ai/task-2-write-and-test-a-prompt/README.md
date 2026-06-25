# Track 3 - AI: Task 2

## Goal

This task reverse engineers the Track 2 DHP profile prototype into an AI workflow.

The idea is:

```mermaid
flowchart LR
    A["Unfiltered Jordan information"] --> B["LLM prompt"]
    B --> C["Fixed DHP profile JSON"]
    C --> D["DHP profile page renderer"]
```

The LLM should not create a random paragraph response. It should output the same JSON structure every time, so the frontend can use that JSON to recreate the DHP profile page.

## Files

| File | Purpose |
|---|---|
| `jordan-unfiltered-input.json` | Raw, messy source information about Jordan, jobs, evidence, verification, and page requirements |
| `dhp-profile-page.schema.json` | Fixed JSON contract the LLM must follow |
| `dhp-profile-page.output.json` | Sample output in the fixed format |
| `prompt.md` | Prompt to give the LLM so it transforms the raw input into the fixed output format |

## What the JSON recreates

The output JSON is based on the DHP profile page in:

`track-2-development/task-2-build-a-component-or-prototype/`

It includes the content needed to rebuild:

- the profile header
- story, skill, proof, trust, and index rail
- DHP view
- resume view
- skills with evidence
- trust and consent section
- capability match panel
- VEI and VCI score cards
- role match recommendations

## Prompt test

I tested the prompt by using the raw JSON as the input and producing `dhp-profile-page.output.json` as the expected LLM-style result.

### What works

The fixed JSON format makes the output predictable. A frontend does not need to parse a long text response; it can read stable keys such as `profileHeader`, `dhpView`, `resumeView`, `matchPanel`, and `indexes`.

It also keeps the DHP different from a resume. The output includes Jordan's story, transferable skills, evidence, trust signals, and role match guidance instead of only education and work history.

### What does not work yet

The prompt still depends on the quality of the raw information. If the raw input is incomplete, the LLM may produce weak evidence statements or over-generalise Jordan's skills.

The scores in the sample are mock values from the prototype. A real product would need a clearer scoring model, job data source, and review process before using VEI, VCI, or match scores in production.

### How I would iterate

Next, I would connect the prompt to real job ads, a stronger skills taxonomy, and a validation step. I would also test the output against a JSON Schema validator before accepting it, so the frontend only receives page-ready JSON.

The next technical step would be to update the Track 2 prototype so the profile page reads from `dhp-profile-page.output.json` instead of hard-coded JavaScript data.
