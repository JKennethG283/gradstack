const MANIFEST_URL = "./data/generated/manifest.json";

function safeText(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function clampScore(value) {
  const score = Number(value);
  if (Number.isNaN(score)) {
    return 0;
  }
  return Math.max(0, Math.min(100, score));
}

function toneClass(tone) {
  return ["ready", "warning", "growth", "proof", "neutral"].includes(tone)
    ? tone
    : "neutral";
}

function statusLabel(status) {
  const labels = {
    ready: "Verified match",
    "needs-info": "Proof needed",
    growth: "Growth path",
  };
  return labels[status] || status;
}

class DHPJsonProfile extends HTMLElement {
  constructor() {
    super();
    this.state = {
      experiment: null,
      error: "",
      activeViews: {},
      selectedMatchIds: {},
      selectedRunKey: "",
    };
  }

  viewKeyForRun(run) {
    return `${run.provider}-${run.promptToneId}`;
  }

  getRuns(experiment) {
    return (experiment?.models || []).flatMap((model) => model.runs || []);
  }

  getSelectedRun(experiment) {
    const runs = this.getRuns(experiment);
    if (!runs.length) {
      return null;
    }

    return (
      runs.find((run) => this.viewKeyForRun(run) === this.state.selectedRunKey) ||
      runs[0]
    );
  }

  domId(value) {
    return String(value || "reference").replace(/[^a-zA-Z0-9_-]/g, "-");
  }

  targetId(viewKey, target) {
    const targetName = this.domId(target);
    return viewKey === "reference" ? targetName : `${this.domId(viewKey)}-${targetName}`;
  }

  getActiveView(viewKey) {
    return this.state.activeViews[viewKey] || "dhp";
  }

  getSelectedMatchId(viewKey, panel) {
    return (
      this.state.selectedMatchIds[viewKey] ||
      panel?.selectedMatchId ||
      panel?.opportunities?.[0]?.id ||
      ""
    );
  }

  connectedCallback() {
    this.renderLoading();
    this.loadData();
  }

  async loadData() {
    try {
      const experiment = await this.loadExperiment();
      this.state.experiment = experiment;
      const selectedRun = this.getSelectedRun(experiment);
      this.state.selectedRunKey = selectedRun ? this.viewKeyForRun(selectedRun) : "";
      this.render();
    } catch (error) {
      this.state.error =
        "The generated DHP pages could not be loaded. Run this folder through a local server so the browser can read the data files.";
      this.renderError();
    }
  }

  async loadExperiment() {
    try {
      const manifestResponse = await fetch(MANIFEST_URL, { cache: "no-store" });
      if (!manifestResponse.ok) {
        return null;
      }

      const manifest = await manifestResponse.json();
      const models = await Promise.all(
        (manifest.models || []).map(async (model) => {
          const runs = await Promise.all(
            (model.runs || []).map(async (run) => {
              const outputResponse = await fetch(run.outputPath, { cache: "no-store" });
              if (!outputResponse.ok) {
                return { ...run, data: null };
              }
              return { ...run, data: await outputResponse.json() };
            }),
          );
          return { ...model, runs };
        }),
      );

      return { ...manifest, models };
    } catch (error) {
      return null;
    }
  }

  renderLoading() {
    this.innerHTML = `
      <main class="page-shell loading-shell">
        <section class="loading-card">
          <span class="eyebrow">DHP JSON</span>
          <h1>Loading Jordan's profile.</h1>
        </section>
      </main>
    `;
  }

  renderError() {
    this.innerHTML = `
      <main class="page-shell loading-shell">
        <section class="loading-card error-card">
          <span class="eyebrow">Data unavailable</span>
          <h1>Profile JSON did not load.</h1>
          <p>${safeText(this.state.error)}</p>
        </section>
      </main>
    `;
  }

  render() {
    this.innerHTML = `
      <main class="page-shell" aria-label="Gradstack DHP profile generated from JSON">
        ${this.renderExperimentSection(this.state.experiment)}
      </main>
    `;

    this.bindEvents();
  }

  renderProfilePage(data, viewKey) {
    return `
      <section class="prototype-frame">
        ${this.renderProfileCard(data, viewKey)}
        ${this.renderMatchPanel(data.matchPanel, viewKey)}
      </section>
      ${this.renderIndexSection(data.indexes, viewKey)}
    `;
  }

  renderExperimentSection(experiment) {
    if (!experiment) {
      return `
        <section class="experiment-empty" aria-label="Prompt experiment status">
          <div>
            <span class="eyebrow">Prompt experiment</span>
            <h2>Run the model comparison to generate six DHP pages.</h2>
            <p>
              The page is ready to display three Gemini Flash outputs and three Gemini Flash-Lite outputs.
              Run the Python evaluator to create <code>data/generated/manifest.json</code>.
            </p>
          </div>
          <code>python run_prompt_eval.py</code>
        </section>
      `;
    }

    return `
      <section class="experiment-section" aria-label="Generated DHP page navigator">
        <div class="experiment-heading">
          <div>
            <span class="eyebrow">Prompt experiment</span>
            <h2>Choose a generated DHP page.</h2>
            <p>
              Switch between each model and tone without losing your place in the page.
            </p>
          </div>
          <div class="experiment-meta">
            <span class="status-pill ${experiment.dryRun ? "warning" : "ready"}">
              ${experiment.dryRun ? "Dry run" : "Live model run"}
            </span>
            <small>${safeText(experiment.generatedAt)}</small>
          </div>
        </div>

        ${this.renderRunNavigator(experiment)}
        ${this.renderSelectedGeneratedRun(experiment)}
      </section>
    `;
  }

  renderRunNavigator(experiment) {
    return `
      <nav class="run-navigator" aria-label="Generated DHP pages">
        ${(experiment.models || []).map((model) => this.renderRunGroup(model)).join("")}
      </nav>
    `;
  }

  renderRunGroup(model) {
    return `
      <section class="run-group ${safeText(model.provider)}" aria-label="${safeText(model.displayName)} pages">
        <header>
          <span class="eyebrow">${safeText(model.provider)}</span>
          <strong>${safeText(model.displayName)}</strong>
        </header>
        <div class="run-tab-list">
          ${(model.runs || []).map((run) => this.renderRunTab(run)).join("")}
        </div>
      </section>
    `;
  }

  renderRunTab(run) {
    const key = this.viewKeyForRun(run);
    const metrics = run.metrics || {};
    const active = key === this.state.selectedRunKey;
    return `
      <button
        type="button"
        class="run-tab ${active ? "is-active" : ""}"
        data-run-key="${safeText(key)}"
        aria-pressed="${active}"
      >
        <span>${safeText(run.promptLabel)}</span>
        <small>${metrics.schemaValid ? "Schema valid" : "Schema issue"}</small>
      </button>
    `;
  }

  renderSelectedGeneratedRun(experiment) {
    const selectedRun = this.getSelectedRun(experiment);
    if (!selectedRun) {
      return `
        <article class="generated-card">
          <header class="generated-card-header">
            <span class="status-pill warning">No generated pages</span>
            <h4>Run the evaluator to create DHP pages.</h4>
          </header>
        </article>
      `;
    }

    return `
      <div class="selected-run-shell">
        ${this.renderGeneratedRun(selectedRun)}
      </div>
    `;
  }

  renderModelSection(model) {
    return `
      <section class="model-section ${model.provider}" aria-label="${safeText(model.displayName)} generated DHP pages">
        <header class="model-header">
          <div>
            <span class="eyebrow">${safeText(model.provider)}</span>
            <h3>${safeText(model.displayName)}</h3>
            <p>${safeText(model.model)}</p>
          </div>
          <strong>${safeText(model.runs.length)} pages</strong>
        </header>

        <div class="generated-page-list">
          ${model.runs.map((run) => this.renderGeneratedRun(run)).join("")}
        </div>
      </section>
    `;
  }

  renderGeneratedRun(run) {
    if (!run.data) {
      return `
        <article class="generated-card">
          <header class="generated-card-header">
            <span class="status-pill warning">${safeText(run.promptLabel)}</span>
            <h4>Output missing</h4>
          </header>
          <p>The JSON output file for this run could not be loaded.</p>
        </article>
      `;
    }

    const metrics = run.metrics || {};
    const viewKey = this.viewKeyForRun(run);

    return `
      <article class="generated-card generated-dhp-page">
        <header class="generated-card-header">
          <div>
            <span class="status-pill proof">${safeText(run.promptLabel)}</span>
            <h4>${safeText(run.data.user.fullName)}</h4>
            <p>${safeText(run.data.profileHeader.headline)}</p>
          </div>
          <div class="schema-chip ${metrics.schemaValid ? "ready" : "warning"}">
            <strong>${metrics.schemaValid ? "Schema valid" : "Schema issue"}</strong>
            <span>${safeText(metrics.attempts ?? 0)} attempt${metrics.attempts === 1 ? "" : "s"}</span>
          </div>
        </header>

        ${this.renderMetricsStrip(metrics)}

        ${this.renderProfilePage(run.data, viewKey)}
      </article>
    `;
  }

  renderMetricsStrip(metrics) {
    const metricItems = [
      ["Input", metrics.input_tokens],
      ["Output", metrics.output_tokens],
      ["Total", metrics.total_tokens],
      ["Latency", metrics.latency_ms != null ? `${metrics.latency_ms}ms` : null],
    ];

    return `
      <dl class="metrics-strip">
        ${metricItems
          .map(
            ([label, value]) => `
              <div>
                <dt>${safeText(label)}</dt>
                <dd>${safeText(value ?? "n/a")}</dd>
              </div>
            `,
          )
          .join("")}
      </dl>
    `;
  }

  renderProfileCard(data, viewKey = "reference") {
    const header = data.profileHeader;
    const activeView = this.getActiveView(viewKey);
    return `
      <article class="profile-card">
        <aside class="dhp-rail" aria-label="DHP layers">
          ${header.railLabels.map((label) => `<span>${safeText(label)}</span>`).join("")}
        </aside>

        <div class="profile-content">
          <header class="profile-header">
            <div>
              <div class="identity-row">
                <span class="avatar" aria-hidden="true">${safeText(data.user.initials)}</span>
                <h1>${safeText(data.user.fullName)}</h1>
              </div>
              <ul class="meta-list" aria-label="Profile facts">
                ${header.metaFacts.map((fact) => `<li>${safeText(fact)}</li>`).join("")}
              </ul>
              <p class="headline">${safeText(header.headline)}</p>
            </div>

            <div class="profile-score-stack">
              <div class="readiness-meter" aria-label="DHP readiness ${safeText(header.readinessScore)} percent">
                <span>DHP readiness</span>
                <strong>${safeText(header.readinessScore)}%</strong>
                <div class="meter-track" aria-hidden="true">
                  <i style="width: ${clampScore(header.readinessScore)}%"></i>
                </div>
              </div>
              ${header.indexLinks.map((link) => this.renderIndexLink(link, viewKey)).join("")}
            </div>
          </header>

          <div class="view-toggle" role="group" aria-label="Profile view">
            ${this.renderToggle(viewKey, "dhp", "DHP view")}
            ${this.renderToggle(viewKey, "resume", "Resume view")}
          </div>

          <div class="view-body">
            ${
              activeView === "dhp"
                ? this.renderDhpView(data.dhpView, viewKey)
                : this.renderResumeView(data.resumeView)
            }
          </div>
        </div>
      </article>
    `;
  }

  renderIndexLink(link, viewKey = "reference") {
    return `
      <a class="index-link ${toneClass(link.tone)}" href="#${safeText(this.targetId(viewKey, link.targetPage))}">
        <span>${safeText(link.label)}</span>
        <strong>${safeText(link.score)}</strong>
        <small>${safeText(link.subtitle)}</small>
      </a>
    `;
  }

  renderToggle(viewKey, view, label) {
    const active = this.getActiveView(viewKey) === view;
    return `
      <button type="button" data-view-key="${safeText(viewKey)}" data-view="${safeText(view)}" class="${active ? "is-active" : ""}" aria-pressed="${active}">
        ${safeText(label)}
      </button>
    `;
  }

  renderDhpView(view, viewKey = "reference") {
    return `
      <div class="dhp-view">
        <section class="story-block">
          <h2>Human story</h2>
          <p>${safeText(view.personalStory)}</p>
        </section>

        <section class="insight-grid" aria-label="DHP insight cards">
          ${view.insightCards.map((card) => this.renderInsightCard(card, viewKey)).join("")}
        </section>

        <section class="section-block">
          <h2>Skills with evidence</h2>
          <ul class="item-list">
            ${view.skillsWithEvidence.map((skill) => this.renderSkill(skill)).join("")}
          </ul>
        </section>

        <section class="section-block">
          <h2>Trust and consent</h2>
          <ul class="item-list">
            ${view.trustAndConsent.map((item) => this.renderVerification(item)).join("")}
          </ul>
        </section>
      </div>
    `;
  }

  renderInsightCard(card, viewKey = "reference") {
    return `
      <article class="insight ${toneClass(card.tone)}">
        <strong>${safeText(card.title)}</strong>
        <p>${safeText(card.body)}</p>
        ${card.action ? `<a href="#${safeText(this.targetId(viewKey, card.action.target))}">${safeText(card.action.label)}</a>` : ""}
      </article>
    `;
  }

  renderSkill(skill) {
    return `
      <li class="list-item">
        <div class="line">
          <strong>${safeText(skill.name)}</strong>
          <span class="status-pill ready">${safeText(skill.level)} confidence ${safeText(skill.confidence)}/5</span>
        </div>
        <p>${safeText(skill.context)}</p>
        <span class="pill">${safeText(skill.evidence)}</span>
      </li>
    `;
  }

  renderVerification(item) {
    return `
      <li class="list-item">
        <div class="line">
          <strong>${safeText(item.type)}</strong>
          <span class="status-pill ${toneClass(item.tone)}">${safeText(item.status)}</span>
        </div>
        <p>${safeText(item.visibility)}. ${safeText(item.note)}</p>
      </li>
    `;
  }

  renderResumeView(view) {
    return `
      <div class="resume-view">
        <section class="resume-strip">
          <h2>Education</h2>
          ${view.education
            .map(
              (item) => `
                <div class="resume-item">
                  <strong>${safeText(item.qualification)}</strong>
                  <span>${safeText(item.institution)}. ${safeText(item.status)}.</span>
                </div>
              `,
            )
            .join("")}
        </section>

        <section class="resume-strip">
          <h2>Experience</h2>
          ${view.experiences
            .map(
              (item) => `
                <div class="resume-item">
                  <strong>${safeText(item.title)}</strong>
                  <span>${safeText(item.organisation)}. ${safeText(item.detail)}</span>
                </div>
              `,
            )
            .join("")}
        </section>

        <section class="resume-strip">
          <h2>Projects</h2>
          ${view.projects
            .map(
              (item) => `
                <div class="resume-item">
                  <strong>${safeText(item.title)}</strong>
                  <span>${safeText(item.role)}. ${safeText(item.outcome)}</span>
                  <small>${safeText(item.status)}</small>
                </div>
              `,
            )
            .join("")}
        </section>

        <section class="resume-strip">
          <h2>Applications</h2>
          <ul class="item-list">
            ${view.applications
              .map(
                (item) => `
                  <li class="list-item compact">
                    <div class="line">
                      <strong>${safeText(item.title)}</strong>
                      <span class="status-pill growth">${safeText(item.status)}</span>
                    </div>
                    <p>${safeText(item.employer)}. ${safeText(item.note)}</p>
                  </li>
                `,
              )
              .join("")}
          </ul>
        </section>
      </div>
    `;
  }

  renderMatchPanel(panel, viewKey = "reference") {
    const selectedMatchId = this.getSelectedMatchId(viewKey, panel);
    const selected =
      panel.opportunities.find((item) => item.id === selectedMatchId) ||
      panel.opportunities[0];
    const titleId = `match-title-${this.domId(viewKey)}`;

    return `
      <aside class="match-panel" aria-labelledby="${safeText(titleId)}">
        <h2 id="${safeText(titleId)}">${safeText(panel.title)}</h2>
        <p class="panel-intro">${safeText(panel.intro)}</p>

        <div class="match-list">
          ${panel.opportunities.map((item) => this.renderMatchCard(item, viewKey, selectedMatchId)).join("")}
        </div>

        ${this.renderMatchDetail(selected)}
      </aside>
    `;
  }

  renderMatchCard(match, viewKey, selectedMatchId) {
    const active = match.id === selectedMatchId;
    return `
      <button type="button" class="match-card ${active ? "is-active" : ""}" data-view-key="${safeText(viewKey)}" data-match-id="${safeText(match.id)}" aria-pressed="${active}">
        <span class="match-topline">
          <strong>${safeText(match.title)}</strong>
          <em class="status-pill ${toneClass(match.status === "needs-info" ? "warning" : match.status)}">${safeText(statusLabel(match.status))}</em>
        </span>
        <span class="match-meta">
          <span>${safeText(match.employer)}</span>
          <strong>${safeText(match.matchScore)}% match</strong>
        </span>
      </button>
    `;
  }

  renderMatchDetail(match) {
    return `
      <section class="match-detail">
        <span class="status-pill ${toneClass(match.status === "needs-info" ? "warning" : match.status)}">${safeText(statusLabel(match.status))}</span>
        <h3>${safeText(match.title)}</h3>
        <p>${safeText(match.summary)}</p>

        <strong>Matched capability signals</strong>
        <div class="tag-list">
          ${match.matchedSkills.map((skill) => `<span>${safeText(skill)}</span>`).join("")}
        </div>

        <strong>${match.missing.length ? "What is missing" : "Ready to apply"}</strong>
        ${
          match.missing.length
            ? `<ul class="missing-list">${match.missing.map((item) => this.renderMissing(item)).join("")}</ul>`
            : `<p>Jordan has enough story, evidence, and trust data to apply without guessing.</p>`
        }

        <div class="action-box">
          <strong>Recommended next action</strong>
          <p>${safeText(match.nextAction)}</p>
        </div>
      </section>
    `;
  }

  renderMissing(item) {
    return `
      <li>
        <div class="line">
          <strong>${safeText(item.label)}</strong>
          <span class="status-pill warning">${safeText(item.type)}</span>
        </div>
        <p>${safeText(item.detail)}</p>
      </li>
    `;
  }

  renderIndexSection(indexes, viewKey = "reference") {
    return `
      <section class="index-section" id="${safeText(this.targetId(viewKey, "vci"))}" aria-label="Verified indexes">
        <div class="index-grid">
          ${this.renderVei(indexes.verifiedEmployabilityIndex)}
          ${this.renderVci(indexes.verifiedCapabilityIndex)}
        </div>
        <section class="readiness-card" id="${safeText(this.targetId(viewKey, "opportunities"))}">
          <h2>Readiness signals</h2>
          <div class="readiness-list">
            ${indexes.readinessSignals.map((signal) => this.renderBenchmark(signal)).join("")}
          </div>
        </section>
      </section>
    `;
  }

  renderVei(index) {
    return `
      <article class="index-card">
        ${this.renderScoreDial("VEI", index.score, "ready")}
        <div>
          <span class="eyebrow">${safeText(index.benchmarkLabel)}</span>
          <h2>Verified Employability Index</h2>
          <p>${safeText(index.summary)}</p>
        </div>
        <div class="readiness-list">
          ${index.signals.map((signal) => this.renderBenchmark(signal)).join("")}
        </div>
      </article>
    `;
  }

  renderVci(index) {
    return `
      <article class="index-card proof-card">
        ${this.renderScoreDial("VCI", index.score, "proof")}
        <div>
          <span class="eyebrow">Benchmark ${safeText(index.sectorBenchmark)}%</span>
          <h2>Verified Capability Index</h2>
          <p>${safeText(index.summary)}</p>
        </div>
        <div class="layer-list">
          ${index.layers.map((layer) => this.renderLayer(layer)).join("")}
        </div>
      </article>
    `;
  }

  renderScoreDial(label, score, tone) {
    return `
      <div class="score-dial ${toneClass(tone)}" style="--score: ${clampScore(score)}">
        <span>${safeText(label)}</span>
        <strong>${safeText(score)}</strong>
      </div>
    `;
  }

  renderBenchmark(signal) {
    return `
      <article class="benchmark ${toneClass(signal.tone)}">
        <div class="line">
          <strong>${safeText(signal.label)}</strong>
          <span>${safeText(signal.value)}${signal.benchmark ? ` / ${safeText(signal.benchmark)}` : ""}</span>
        </div>
        <div class="bar" aria-hidden="true">
          <i style="width: ${clampScore(signal.value)}%"></i>
        </div>
        <p>${safeText(signal.detail)}</p>
      </article>
    `;
  }

  renderLayer(layer) {
    return `
      <article class="capability-layer ${toneClass(layer.tone)}">
        <div class="capability-score">
          <strong>${safeText(layer.score)}</strong>
          <span>${safeText(layer.status)}</span>
        </div>
        <div>
          <h3>${safeText(layer.label)}</h3>
          <p>${safeText(layer.detail)}</p>
          <small>${safeText(layer.evidence)}</small>
        </div>
      </article>
    `;
  }

  bindEvents() {
    this.querySelectorAll("[data-view]").forEach((button) => {
      button.addEventListener("click", () => {
        const viewKey = button.dataset.viewKey || "reference";
        this.state.activeViews = {
          ...this.state.activeViews,
          [viewKey]: button.dataset.view,
        };
        this.render();
      });
    });

    this.querySelectorAll("[data-match-id]").forEach((button) => {
      button.addEventListener("click", () => {
        const viewKey = button.dataset.viewKey || "reference";
        this.state.selectedMatchIds = {
          ...this.state.selectedMatchIds,
          [viewKey]: button.dataset.matchId,
        };
        this.render();
      });
    });

    this.querySelectorAll("[data-run-key]").forEach((button) => {
      button.addEventListener("click", () => {
        this.state.selectedRunKey = button.dataset.runKey || "";
        this.render();
      });
    });
  }
}

customElements.define("dhp-json-profile", DHPJsonProfile);
