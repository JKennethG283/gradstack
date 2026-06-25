const jordanProfile = {
  user: {
    fullName: "Jordan Lee",
    initials: "JL",
    age: 24,
    email: "jordan.lee@example.com",
    phone: "0400 125 642",
    location: "Sydney, NSW",
  },
  dhp: {
    headline:
      "Communications graduate turning hospitality experience, campaign projects, and clear writing into a path toward content and marketing work.",
    personalStory:
      "Jordan graduated from UTS 18 months ago and has been applying for entry-level marketing roles while working casual hospitality shifts. The DHP should make the useful parts of that story visible: customer empathy, communication under pressure, project work, and the next proof employers need.",
    desiredRoles: [
      "Content Coordinator",
      "Marketing Assistant",
      "Social Media Assistant",
    ],
    values: ["Clear communication", "Learning", "Creative problem solving"],
    workStyleSummary:
      "Practical, collaborative, customer-aware, and comfortable turning loose ideas into clear messages.",
    profileCompleteness: 74,
    education: {
      qualification: "Bachelor of Communications",
      institution: "University of Technology Sydney",
      status: "Completed, degree verification pending",
    },
    experiences: [
      {
        title: "Hospitality team member",
        organisation: "Casual shifts while applying",
        detail:
          "Built customer communication, teamwork, prioritisation, and resilience in fast-moving service environments.",
      },
    ],
    skills: [
      {
        name: "Copywriting",
        level: "Working",
        confidence: 4,
        context:
          "Used in portfolio pieces, cover letters, and university campaign copy.",
        evidence: "Writing sample attached",
      },
      {
        name: "Customer communication",
        level: "Confident",
        confidence: 5,
        context:
          "Practised daily through hospitality work and complaint resolution.",
        evidence: "Experience note attached",
      },
      {
        name: "Research and content planning",
        level: "Working",
        confidence: 4,
        context:
          "Used in a university campaign strategy project for a youth audience.",
        evidence: "Campaign project ready to attach",
      },
    ],
    projects: [
      {
        title: "University campaign strategy project",
        role: "Research and content planning",
        outcome:
          "Built a channel plan, audience insight summary, and sample content for a student-facing campaign.",
      },
    ],
    aiReadiness: {
      comfortLevel: 3,
      toolsUsed: ["ChatGPT", "Canva", "Notion AI"],
      useCases: ["Drafting ideas", "Editing cover letters", "Research summaries"],
      responsibleAiConfidence: 3,
    },
    verificationStatuses: [
      {
        type: "Working rights",
        status: "Verified",
        visibility: "Employer on request",
      },
      {
        type: "Degree",
        status: "Pending",
        visibility: "Employer on request",
      },
    ],
    applications: [
      {
        title: "Marketing Intern",
        employer: "Hatch listing",
        status: "Viewed",
        note: "Employer opened the DHP summary two days after submission.",
      },
      {
        title: "Content Assistant",
        employer: "LinkedIn listing",
        status: "Submitted",
        note: "No employer activity yet. Gradstack can prompt for a follow-up.",
      },
    ],
  },
};

const setupDefaults = {
  fullName: "Jordan Lee",
  email: "jordan.lee@example.com",
  phone: "0400 125 642",
  location: "Sydney, NSW",
  desiredRoles:
    "Content Coordinator, Marketing Assistant, Social Media Assistant",
  skills:
    "Copywriting, customer communication, research and content planning, Canva",
  project:
    "University campaign strategy project with audience research, channel planning, and sample campaign content.",
  goal:
    "Find an entry-level content or marketing role where I can show evidence of writing, customer empathy, and project thinking.",
  workRights: "Verified",
  consent: true,
};

const opportunityMatches = [
  {
    id: "content-coordinator",
    title: "Junior Content Coordinator",
    employer: "Civic Spark Studio",
    status: "ready",
    matchScore: 86,
    summary:
      "A practical content role where Jordan's writing samples and customer-aware communication already tell a strong story.",
    matchedSkills: ["Copywriting", "Research", "Canva", "Customer empathy"],
    missing: [],
    nextAction:
      "Apply with the DHP view. Lead with the campaign project and hospitality communication evidence.",
  },
  {
    id: "marketing-assistant",
    title: "Marketing Assistant",
    employer: "Social Impact Collective",
    status: "needs-info",
    matchScore: 72,
    summary:
      "Close match, but the application should not go out until two trust signals are clearer.",
    matchedSkills: ["Content planning", "Customer communication", "Canva"],
    missing: [
      {
        id: "degree-verification",
        label: "Degree verification",
        type: "Verification",
        detail:
          "The employer asks for completed qualification evidence. Store the result, not the raw document, by default.",
      },
      {
        id: "campaign-evidence",
        label: "Campaign project evidence",
        type: "Evidence",
        detail:
          "Attach the university campaign strategy project so the employer can see how Jordan thinks.",
      },
    ],
    nextAction:
      "Attach the campaign project now, then start degree verification before applying.",
  },
  {
    id: "campaign-assistant",
    title: "Digital Campaign Assistant",
    employer: "BrightDesk Media",
    status: "growth",
    matchScore: 61,
    summary:
      "A useful growth opportunity: Jordan is close, but the DHP should explain the skill gap before he spends another application.",
    matchedSkills: ["Writing", "Audience research", "Presentation"],
    missing: [
      {
        id: "analytics-evidence",
        label: "Analytics evidence",
        type: "Growth skill",
        detail:
          "The role asks for basic campaign reporting. Recommend a short analytics learning task and a small evidence item.",
      },
    ],
    nextAction:
      "Save this as a growth goal and complete one analytics mini-project before applying.",
  },
];

const statusCopy = {
  ready: {
    label: "Verified match",
    className: "ready",
  },
  "needs-info": {
    label: "Proof needed",
    className: "warning",
  },
  growth: {
    label: "Growth path",
    className: "growth",
  },
};

const flowSteps = [
  { id: "auth", label: "Account" },
  { id: "details", label: "Details" },
  { id: "import", label: "Evidence" },
  { id: "dashboard", label: "Ready" },
];

const dashboardPages = [
  { id: "overview", label: "Overview" },
  { id: "profile", label: "DHP profile" },
  { id: "opportunities", label: "Opportunities" },
  { id: "vci", label: "VCI" },
  { id: "applications", label: "Applications" },
];

const readinessSignals = [
  {
    label: "Profile completeness",
    value: jordanProfile.dhp.profileCompleteness,
    detail: "Story, skills, education, and goals are already filled.",
    tone: "ready",
  },
  {
    label: "Evidence strength",
    value: 68,
    detail: "Writing sample is attached; campaign project still helps.",
    tone: "proof",
  },
  {
    label: "Trust signals",
    value: 62,
    detail: "Working rights are verified; degree verification is pending.",
    tone: "warning",
  },
  {
    label: "Best opportunity match",
    value: 86,
    detail: "Junior Content Coordinator is ready to apply.",
    tone: "ready",
  },
];

const verifiedEmployabilityIndex = {
  score: 78,
  percentile: 68,
  benchmarkLabel: "Entry marketing benchmark",
  summary:
    "VEI combines employer readiness, industry alignment, collaboration, execution consistency, and professional maturity into one opportunity-facing employability signal.",
  signals: [
    {
      label: "Employer readiness",
      value: 82,
      benchmark: 76,
      detail:
        "Working rights, profile story, and role intent are clear enough for employer review.",
      tone: "ready",
    },
    {
      label: "Industry alignment",
      value: 76,
      benchmark: 72,
      detail:
        "Content and marketing signals match the sector benchmark, with analytics still developing.",
      tone: "proof",
    },
    {
      label: "Collaboration",
      value: 84,
      benchmark: 78,
      detail:
        "Hospitality evidence shows teamwork, customer communication, and pressure handling.",
      tone: "ready",
    },
    {
      label: "Execution consistency",
      value: 71,
      benchmark: 74,
      detail:
        "Campaign project evidence will lift confidence in follow-through and delivery quality.",
      tone: "warning",
    },
    {
      label: "Professional maturity",
      value: 79,
      benchmark: 76,
      detail:
        "Follow-up rhythm and consent settings show employer-safe professional behaviour.",
      tone: "ready",
    },
  ],
  trend: [
    { label: "Wk 1", value: 62 },
    { label: "Wk 2", value: 66 },
    { label: "Wk 3", value: 69 },
    { label: "Wk 4", value: 72 },
    { label: "Wk 5", value: 75 },
    { label: "Now", value: 78 },
  ],
  opportunityImpact: [
    {
      role: "Junior Content Coordinator",
      value: 84,
      benchmark: 76,
      tone: "ready",
      decision: "Apply now",
      evidence: "Writing sample, hospitality communication, Canva portfolio",
      gap: "No material gap",
      action: "Lead the application with the campaign strategy project.",
      detail:
        "Highest employability fit because writing, service communication, and proof are aligned.",
    },
    {
      role: "Marketing Assistant",
      value: 73,
      benchmark: 75,
      tone: "warning",
      decision: "Hold for proof",
      evidence: "Content planning, customer communication, early campaign work",
      gap: "Degree verification and campaign project",
      action: "Attach project evidence before sending the application.",
      detail:
        "Close fit; degree verification and campaign evidence would move this into ready range.",
    },
    {
      role: "Digital Campaign Assistant",
      value: 64,
      benchmark: 74,
      tone: "proof",
      decision: "Growth target",
      evidence: "Writing, audience research, presentation work",
      gap: "Campaign reporting and analytics evidence",
      action: "Complete one analytics mini-project before applying.",
      detail: "Useful growth target once Jordan adds analytics evidence.",
    },
  ],
};

const verifiedCapabilityIndex = {
  score: 73,
  sectorBenchmark: 72,
  summary:
    "VCI is a five-layer verified capability profile. Each layer is independently validated and compared with entry-level sector requirements, including AI Literacy & Fluency.",
  layers: [
    {
      label: "Foundational capability",
      score: 78,
      benchmark: 72,
      status: "Validated",
      evidence: "Resume import, degree claim, and writing sample",
      detail:
        "Core communication, learning habits, and self-management sit above the entry marketing benchmark.",
      tone: "ready",
    },
    {
      label: "Role craft",
      score: 74,
      benchmark: 70,
      status: "Evidence attached",
      evidence: "Copywriting sample and campaign planning work",
      detail:
        "Jordan can show practical content planning, audience thinking, and clear written output.",
      tone: "ready",
    },
    {
      label: "Workplace collaboration",
      score: 82,
      benchmark: 76,
      status: "Validated",
      evidence: "Hospitality experience note and customer scenarios",
      detail:
        "Teamwork and customer-facing judgement are strong signals for early-career employers.",
      tone: "ready",
    },
    {
      label: "AI Literacy & Fluency",
      score: 69,
      benchmark: 74,
      status: "Growth priority",
      evidence: "ChatGPT, Canva, and Notion AI usage examples",
      detail:
        "Jordan uses AI for drafting and summaries, but needs stronger prompt framing, source checking, and responsible disclosure.",
      tone: "warning",
    },
    {
      label: "Applied proof",
      score: 66,
      benchmark: 71,
      status: "Needs evidence",
      evidence: "Campaign project ready to attach",
      detail:
        "The index will lift once the campaign project and one analytics mini-project are attached.",
      tone: "proof",
    },
  ],
  aiFluencySignals: [
    {
      label: "Prompt framing",
      value: 72,
      benchmark: 74,
      detail: "Can describe intent and audience, but needs more consistent constraints.",
      tone: "proof",
    },
    {
      label: "Output evaluation",
      value: 67,
      benchmark: 73,
      detail: "Needs stronger habits for fact checking and identifying weak AI output.",
      tone: "warning",
    },
    {
      label: "Workflow integration",
      value: 71,
      benchmark: 70,
      detail: "Uses AI appropriately for first drafts, edits, and research summaries.",
      tone: "ready",
    },
    {
      label: "Responsible use",
      value: 65,
      benchmark: 75,
      detail: "Needs clearer disclosure and privacy judgement before employer-facing work.",
      tone: "warning",
    },
  ],
  sectorBenchmarks: [
    { label: "Content marketing", value: 76, benchmark: 72, tone: "ready" },
    { label: "Social media", value: 72, benchmark: 73, tone: "proof" },
    { label: "Campaign support", value: 68, benchmark: 74, tone: "warning" },
  ],
  validationSources: [
    {
      label: "Portfolio writing sample",
      status: "Verified",
      detail: "Mapped to copywriting, audience clarity, and role craft.",
    },
    {
      label: "Hospitality experience note",
      status: "Verified",
      detail: "Mapped to collaboration, reliability, and communication under pressure.",
    },
    {
      label: "Campaign strategy project",
      status: "Pending attach",
      detail: "Will validate applied proof and execution consistency once added.",
    },
    {
      label: "AI workflow reflection",
      status: "Benchmarking",
      detail: "Used to assess responsible AI habits against entry-level sector expectations.",
    },
  ],
};

function safeText(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normaliseList(value) {
  return String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function selected(value, option) {
  return value === option ? "selected" : "";
}

function clampScore(value) {
  const number = Number(value);

  if (Number.isNaN(number)) {
    return 0;
  }

  return Math.max(0, Math.min(100, number));
}

class GradstackOnboardingDemo extends HTMLElement {
  constructor() {
    super();
    this.state = {
      stage: "welcome",
      authMode: "sign-in",
      dashboardPage: "overview",
      form: { ...setupDefaults },
      importStatus: {
        state: "idle",
        source: "",
      },
      attachments: {
        projectEvidence: "idle",
        workingRights: "idle",
      },
    };
    this.importTimer = null;
    this.attachmentTimers = {};
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    window.clearTimeout(this.importTimer);
    Object.values(this.attachmentTimers).forEach((timer) => window.clearTimeout(timer));
  }

  render() {
    this.innerHTML = `
      <main class="demo-shell" aria-label="Gradstack DHP onboarding prototype">
        ${this.renderStage()}
      </main>
    `;

    this.bindEvents();
  }

  renderStage() {
    if (this.state.stage === "welcome") {
      return this.renderWelcomeStage();
    }

    if (this.state.stage === "auth") {
      return this.renderAuthStage();
    }

    if (this.state.stage === "details") {
      return this.renderDetailsStage();
    }

    return this.renderDashboardStage();
  }

  renderWelcomeStage() {
    return `
      <section class="welcome-screen" aria-labelledby="welcome-title">
        <div class="welcome-card">
          <p class="eyebrow">Gradstack DHP</p>
          <h1 id="welcome-title">Welcome.</h1>
          <p>
            We will turn your story, skills, proof, and trust signals into a
            profile employers can understand.
          </p>
          <div class="signal-stack" aria-hidden="true">
            <span>Story</span>
            <span>Skill</span>
            <span>Proof</span>
            <span>Trust</span>
          </div>
          <button type="button" class="text-action" data-welcome-skip>
            Start setup now
          </button>
        </div>
      </section>
    `;
  }

  renderAuthStage() {
    const isSignIn = this.state.authMode === "sign-in";

    return `
      <section class="flow-shell" aria-labelledby="auth-title">
        ${this.renderProgress("auth")}
        <article class="flow-card auth-card">
          <div class="flow-copy">
            <p class="eyebrow">Initial setup</p>
            <h1 id="auth-title">${isSignIn ? "Sign in to your DHP." : "Create your DHP account."}</h1>
            <p>
              This prototype keeps the account step lightweight. Jordan's demo
              details are already filled, so either path can continue.
            </p>
          </div>

          <div class="view-toggle flow-toggle" role="group" aria-label="Choose account path">
            <button type="button" data-auth-mode="sign-in" class="${isSignIn ? "is-active" : ""}" aria-pressed="${isSignIn}">
              Sign in
            </button>
            <button type="button" data-auth-mode="sign-up" class="${!isSignIn ? "is-active" : ""}" aria-pressed="${!isSignIn}">
              Sign up
            </button>
          </div>

          <form class="flow-form" data-auth-form>
            ${
              isSignIn
                ? ""
                : `
                  <label>
                    <span>Full name</span>
                    <input name="authName" required value="${safeText(this.state.form.fullName)}" autocomplete="name" />
                  </label>
                `
            }
            <label>
              <span>Email</span>
              <input name="authEmail" type="email" required value="${safeText(this.state.form.email)}" autocomplete="email" />
            </label>
            <label>
              <span>Password</span>
              <input name="authPassword" type="password" required value="gradstack-demo" autocomplete="${isSignIn ? "current-password" : "new-password"}" />
            </label>

            <div class="flow-actions">
              <button type="submit" class="primary-action">
                ${isSignIn ? "Sign in as Jordan" : "Create demo account"}
              </button>
              <p class="quiet-note">No real account is created in this demo.</p>
            </div>
          </form>
        </article>
      </section>
    `;
  }

  renderDetailsStage() {
    const form = this.state.form;
    const isLoading = this.state.importStatus.state === "loading";

    return `
      <section class="flow-shell" aria-labelledby="details-title">
        ${this.renderProgress("details")}
        <article class="flow-card details-card">
          <div class="flow-copy">
            <p class="eyebrow">Build Jordan's DHP</p>
            <h1 id="details-title">Confirm the basics.</h1>
            <p>
              Required fields already use Jordan's demo profile. The resume and
              LinkedIn buttons simulate an import, then confirm the DHP has been
              filled with sample evidence.
            </p>
          </div>

          <div class="import-panel" aria-live="polite">
            <div>
              <strong>Auto-fill from existing material</strong>
              <p>${this.renderImportMessage()}</p>
            </div>
            <div class="import-actions">
              <button type="button" class="secondary-action" data-import-source="resume" ${isLoading ? "disabled" : ""}>
                ${isLoading && this.state.importStatus.source === "resume" ? "Reading resume..." : "Upload resume"}
              </button>
              <button type="button" class="secondary-action" data-import-source="linkedin" ${isLoading ? "disabled" : ""}>
                ${isLoading && this.state.importStatus.source === "linkedin" ? "Connecting..." : "Connect LinkedIn"}
              </button>
            </div>
          </div>

          <form class="setup-form" data-details-form>
            <div class="setup-grid">
              <label>
                ${this.renderRequiredLabel("Full name")}
                <input name="fullName" required value="${safeText(form.fullName)}" autocomplete="name" />
              </label>
              <label>
                ${this.renderRequiredLabel("Email")}
                <input name="email" type="email" required value="${safeText(form.email)}" autocomplete="email" />
              </label>
              <label>
                <span>Phone</span>
                <input name="phone" value="${safeText(form.phone)}" autocomplete="tel" />
              </label>
              <label>
                ${this.renderRequiredLabel("Location")}
                <input name="location" required value="${safeText(form.location)}" autocomplete="address-level2" />
              </label>
              <label class="wide-field">
                ${this.renderRequiredLabel("Career interests")}
                <input name="desiredRoles" required value="${safeText(form.desiredRoles)}" />
              </label>
              <label class="wide-field">
                ${this.renderRequiredLabel("Key skills")}
                <textarea name="skills" required rows="3">${safeText(form.skills)}</textarea>
              </label>
              <div class="wide-field">
                <span class="field-label">Project evidence</span>
                ${this.renderAttachmentControl(
                  "projectEvidence",
                  "Attach project evidence",
                  "University campaign strategy project.pdf",
                  "Optional, but useful for roles that ask to see how Jordan thinks.",
                )}
              </div>
              <label class="wide-field">
                <span>Career goal</span>
                <textarea name="goal" rows="3">${safeText(form.goal)}</textarea>
              </label>
              <div class="wide-field">
                ${this.renderRequiredLabel("Working rights evidence")}
                ${this.renderAttachmentControl(
                  "workingRights",
                  "Attach working rights",
                  "Working rights evidence.pdf",
                  "This demo checks the attachment and stores the result as verified.",
                  true,
                )}
              </div>
              <label class="consent-check">
                <input name="consent" type="checkbox" ${form.consent ? "checked" : ""} />
                <span>Allow employers to request verified profile details.</span>
              </label>
            </div>

            <div class="flow-actions">
              <button type="submit" class="primary-action">Go to readiness dashboard</button>
              <p class="quiet-note">Sensitive documents are represented as verification statuses, not exposed files.</p>
            </div>
          </form>
        </article>
      </section>
    `;
  }

  renderDashboardStage() {
    const importSource = this.getImportSourceLabel();

    return `
      <section class="dashboard-stage" aria-labelledby="dashboard-title">
        <header class="dashboard-topbar" aria-label="Dashboard account bar">
          <div class="dashboard-brand">
            <span class="avatar" aria-hidden="true">${safeText(jordanProfile.user.initials)}</span>
            <div>
              <strong>${safeText(jordanProfile.user.fullName)}</strong>
              <span>Digital Human Profile</span>
            </div>
          </div>
          <button type="button" class="account-action" data-switch-account>
            Switch account
          </button>
        </header>

        <section class="dashboard-hero">
          <div>
            <p class="eyebrow">Readiness dashboard</p>
            <h1 id="dashboard-title">
              Jordan's DHP is ready to guide the next application.
            </h1>
            <p>
              ${importSource} has filled the first profile layer. Jordan can now
              move between profile readiness, VEI opportunity fit, VCI capability
              layers, and application activity without scanning one long page.
            </p>
          </div>
        </section>

        ${this.renderDashboardNav()}

        <div class="dashboard-page" aria-live="polite">
          ${this.renderDashboardPage()}
        </div>
      </section>
    `;
  }

  renderDashboardNav() {
    return `
      <nav class="dashboard-nav" aria-label="Readiness dashboard pages">
        ${dashboardPages
          .map((page) => {
            const isActive = this.state.dashboardPage === page.id;
            return `
              <button type="button" data-dashboard-page="${page.id}" class="${isActive ? "is-active" : ""}" aria-pressed="${isActive}">
                ${safeText(page.label)}
              </button>
            `;
          })
          .join("")}
      </nav>
    `;
  }

  renderDashboardPage() {
    if (this.state.dashboardPage === "profile") {
      return this.renderProfileDashboardPage();
    }

    if (this.state.dashboardPage === "opportunities") {
      return this.renderOpportunitiesDashboardPage();
    }

    if (this.state.dashboardPage === "vci") {
      return this.renderVciDashboardPage();
    }

    if (this.state.dashboardPage === "applications") {
      return this.renderApplicationsDashboardPage();
    }

    return this.renderOverviewDashboardPage();
  }

  renderOverviewDashboardPage() {
    const profile = jordanProfile.dhp;
    const readyCount = opportunityMatches.filter((match) => match.status === "ready").length;

    return `
      <section class="dashboard-panel">
        <div class="dashboard-section-heading">
          <div>
            <p class="eyebrow">Overview</p>
            <h2>One glance before Jordan applies again.</h2>
          </div>
          <p>
            The overview keeps the important signals together: profile
            completeness, opportunity readiness, proof gaps, and the next action.
          </p>
        </div>

        <section class="dashboard-summary" aria-label="Readiness summary">
          <article class="summary-tile">
            <span>DHP completeness</span>
            <strong>${profile.profileCompleteness}%</strong>
            <p>Story, skills, projects, and core trust signals are in place.</p>
          </article>
          <article class="summary-tile index-summary-tile">
            <span>Verified Employability Index</span>
            <strong>${verifiedEmployabilityIndex.score}</strong>
            <p>${safeText(verifiedEmployabilityIndex.benchmarkLabel)}: sector-ready with proof gaps to close.</p>
          </article>
          <article class="summary-tile growth-tile">
            <span>Verified Capability Index</span>
            <strong>${verifiedCapabilityIndex.score}</strong>
            <p>Five capability layers are benchmarked against entry-level role needs.</p>
          </article>
          <article class="summary-tile">
            <span>Ready opportunities</span>
            <strong>${readyCount}</strong>
            <p>Jordan has enough evidence to apply without guessing.</p>
          </article>
        </section>

        <div class="index-snapshot-grid">
          <section class="index-card" aria-labelledby="overview-vei-title">
            <div class="index-card-header">
              ${this.renderIndexMeter("VEI", verifiedEmployabilityIndex.score, "ready")}
              <div>
                <span class="status-pill ready">Science-backed employability</span>
                <h3 id="overview-vei-title">Verified Employability Index</h3>
                <p>${safeText(verifiedEmployabilityIndex.summary)}</p>
              </div>
            </div>
            ${this.renderTrendChart(verifiedEmployabilityIndex.trend, "VEI growth over six weeks")}
            <button type="button" class="secondary-action compact-action" data-dashboard-link="opportunities">
              View opportunity fit
            </button>
          </section>

          <section class="index-card" aria-labelledby="overview-vci-title">
            <div class="index-card-header">
              ${this.renderIndexMeter("VCI", verifiedCapabilityIndex.score, "proof")}
              <div>
                <span class="status-pill growth">Five-layer capability</span>
                <h3 id="overview-vci-title">Verified Capability Index</h3>
                <p>${safeText(verifiedCapabilityIndex.summary)}</p>
              </div>
            </div>
            <div class="mini-layer-stack" aria-label="VCI layer preview">
              ${verifiedCapabilityIndex.layers
                .slice(0, 5)
                .map((layer) => this.renderMiniLayer(layer))
                .join("")}
            </div>
            <button type="button" class="secondary-action compact-action" data-dashboard-link="vci">
              Open VCI section
            </button>
          </section>
        </div>

        <div class="overview-grid">
          <section class="chart-card" aria-labelledby="readiness-chart-title">
            <div class="chart-heading">
              <span class="status-pill ready">Readiness map</span>
              <h3 id="readiness-chart-title">Where the DHP is strongest</h3>
            </div>
            <div class="readiness-chart" role="list">
              ${readinessSignals.map((signal) => this.renderReadinessBar(signal)).join("")}
            </div>
          </section>

          <section class="next-action-band" aria-label="Recommended next action">
            <div>
              <span class="status-pill growth">Recommended next action</span>
              <h2>Attach the campaign project, then start degree verification.</h2>
            </div>
            <p>
              This keeps Jordan from sending another quiet application and shows
              employers the proof behind his strongest entry-level marketing match.
            </p>
          </section>
        </div>
      </section>
    `;
  }

  renderProfileDashboardPage() {
    return `
      <section class="dashboard-panel">
        <div class="dashboard-section-heading">
          <div>
            <p class="eyebrow">DHP profile</p>
            <h2>Story, skills, proof, trust, and verified indexes in one profile.</h2>
          </div>
          <p>
            This page shows how Jordan's profile is more useful than a flat resume:
            it explains the person, the evidence, the employer-facing VEI, and the
            capability-backed VCI employers can trust.
          </p>
        </div>

        <dhp-readiness-card></dhp-readiness-card>
      </section>
    `;
  }

  renderOpportunitiesDashboardPage() {
    return `
      <section class="dashboard-panel">
        <div class="dashboard-section-heading">
          <div>
            <p class="eyebrow">Opportunities + VEI</p>
            <h2>Employability signals are connected to each role.</h2>
          </div>
          <p>
            VEI turns Jordan's employer readiness, industry alignment,
            collaboration, execution consistency, and professional maturity into
            clear opportunity decisions.
          </p>
        </div>

        <div class="opportunity-index-grid">
          <section class="index-card index-card-wide" aria-labelledby="vei-title">
            <div class="index-card-header">
              ${this.renderIndexMeter("VEI", verifiedEmployabilityIndex.score, "ready")}
              <div>
                <span class="status-pill ready">${safeText(verifiedEmployabilityIndex.benchmarkLabel)}</span>
                <h3 id="vei-title">Verified Employability Index</h3>
                <p>${safeText(verifiedEmployabilityIndex.summary)}</p>
              </div>
            </div>
            <div class="benchmark-list">
              ${verifiedEmployabilityIndex.signals
                .map((signal) => this.renderBenchmarkRow(signal))
                .join("")}
            </div>
          </section>

          <section class="chart-card vei-role-card" aria-labelledby="vei-role-title">
            <div class="chart-heading">
              <span class="status-pill growth">Opportunity lens</span>
              <h3 id="vei-role-title">VEI by target role</h3>
              <p>
                Each role compares Jordan's VEI against the role benchmark, then
                translates the gap into an application decision.
              </p>
            </div>
            <div class="role-fit-matrix">
              ${verifiedEmployabilityIndex.opportunityImpact
                .map((role) => this.renderRoleFitRow(role))
                .join("")}
            </div>
          </section>
        </div>

        <div class="opportunity-grid">
          ${opportunityMatches.map((match) => this.renderOpportunityPanel(match)).join("")}
        </div>
      </section>
    `;
  }

  renderVciDashboardPage() {
    return `
      <section class="dashboard-panel">
        <div class="dashboard-section-heading">
          <div>
            <p class="eyebrow">Verified Capability Index</p>
            <h2>Five validated layers show what Jordan can actually do.</h2>
          </div>
          <p>
            VCI separates capability from confidence. Each layer has its own
            evidence source, validation status, and sector benchmark.
          </p>
        </div>

        <div class="vci-hero-grid">
          <section class="index-card index-card-strong" aria-labelledby="vci-title">
            <div class="index-card-header">
              ${this.renderIndexMeter("VCI", verifiedCapabilityIndex.score, "proof")}
              <div>
                <span class="status-pill growth">Benchmark ${verifiedCapabilityIndex.sectorBenchmark}%</span>
                <h3 id="vci-title">VCI score: ${verifiedCapabilityIndex.score}</h3>
                <p>${safeText(verifiedCapabilityIndex.summary)}</p>
              </div>
            </div>
          </section>

          <section class="chart-card" aria-labelledby="sector-benchmark-title">
            <div class="chart-heading">
              <span class="status-pill ready">Sector benchmark</span>
              <h3 id="sector-benchmark-title">Capability fit by sector</h3>
            </div>
            <div class="benchmark-list">
              ${verifiedCapabilityIndex.sectorBenchmarks
                .map((signal) => this.renderBenchmarkRow(signal))
                .join("")}
            </div>
          </section>
        </div>

        <section class="capability-layer-grid" aria-label="VCI capability layers">
          ${verifiedCapabilityIndex.layers
            .map((layer, index) => this.renderCapabilityLayer(layer, index))
            .join("")}
        </section>

        <div class="vci-detail-grid">
          <section class="chart-card" aria-labelledby="ai-fluency-title">
            <div class="chart-heading">
              <span class="status-pill warning">AI Literacy & Fluency</span>
              <h3 id="ai-fluency-title">Responsible AI readiness</h3>
            </div>
            <div class="benchmark-list">
              ${verifiedCapabilityIndex.aiFluencySignals
                .map((signal) => this.renderBenchmarkRow(signal))
                .join("")}
            </div>
          </section>

          <section class="chart-card" aria-labelledby="validation-title">
            <div class="chart-heading">
              <span class="status-pill ready">Independent validation</span>
              <h3 id="validation-title">Evidence used in the index</h3>
            </div>
            <ul class="validation-list">
              ${verifiedCapabilityIndex.validationSources
                .map(
                  (source) => `
                    <li>
                      <div class="evidence-line">
                        <strong>${safeText(source.label)}</strong>
                        <span class="status-pill ${source.status === "Verified" ? "ready" : "growth"}">${safeText(source.status)}</span>
                      </div>
                      <p>${safeText(source.detail)}</p>
                    </li>
                  `,
                )
                .join("")}
            </ul>
          </section>
        </div>
      </section>
    `;
  }

  renderApplicationsDashboardPage() {
    const statuses = [
      "Submitted",
      "Viewed",
      "More information needed",
      "Shortlisted",
      "Interview",
    ];

    return `
      <section class="dashboard-panel">
        <div class="dashboard-section-heading">
          <div>
            <p class="eyebrow">Applications</p>
            <h2 id="applications-title">No more sending applications into silence.</h2>
          </div>
          <p>
            The tracker gives Jordan a visible status history, so applying does
            not feel like losing information into a black box.
          </p>
        </div>

        <div class="application-board" aria-labelledby="applications-title">
          <section class="tracker-panel" aria-label="Application status path">
            <h3>Application status path</h3>
            <ol class="status-timeline">
              ${statuses
                .map(
                  (status) => `
                    <li class="${status === "Viewed" || status === "Submitted" ? "is-current" : ""}">
                      <span></span>
                      <strong>${safeText(status)}</strong>
                    </li>
                  `,
                )
                .join("")}
            </ol>
          </section>

          <div class="application-grid">
            ${jordanProfile.dhp.applications
              .map(
                (application) => `
                  <article class="application-card">
                    <div class="application-line">
                      <strong>${safeText(application.title)}</strong>
                      <span class="status-pill growth">${safeText(application.status)}</span>
                    </div>
                    <span>${safeText(application.employer)}</span>
                    <p>${safeText(application.note)}</p>
                  </article>
                `,
              )
              .join("")}
          </div>
        </div>
      </section>
    `;
  }

  renderIndexMeter(label, score, tone = "ready") {
    const value = clampScore(score);

    return `
      <div class="index-meter ${safeText(tone)}" style="--score: ${value}" aria-label="${safeText(label)} score ${value}">
        <span>${safeText(label)}</span>
        <strong>${value}</strong>
        <small>score</small>
      </div>
    `;
  }

  renderTrendChart(points, label) {
    const values = points.map((point) => clampScore(point.value));
    const min = Math.min(...values, 50);
    const max = Math.max(...values, 90);
    const range = Math.max(1, max - min);
    const chartWidth = 236;
    const startX = 12;
    const startY = 78;
    const chartHeight = 60;
    const step = points.length > 1 ? chartWidth / (points.length - 1) : 0;
    const coordinates = points
      .map((point, index) => {
        const x = startX + step * index;
        const y = startY - ((clampScore(point.value) - min) / range) * chartHeight;

        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
    const firstPoint = points[0];
    const lastPoint = points[points.length - 1];

    return `
      <div class="sparkline-wrap" role="img" aria-label="${safeText(label)} from ${safeText(firstPoint.value)} to ${safeText(lastPoint.value)}">
        <svg class="sparkline" viewBox="0 0 260 96" aria-hidden="true" focusable="false">
          <path class="sparkline-grid" d="M12 18H248 M12 48H248 M12 78H248"></path>
          <polyline class="sparkline-line" points="${coordinates}"></polyline>
          ${points
            .map((point, index) => {
              const x = startX + step * index;
              const y = startY - ((clampScore(point.value) - min) / range) * chartHeight;

              return `<circle class="sparkline-dot" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.5"></circle>`;
            })
            .join("")}
        </svg>
        <div class="sparkline-labels">
          <span>${safeText(firstPoint.label)}</span>
          <strong>${safeText(lastPoint.value)}</strong>
          <span>${safeText(lastPoint.label)}</span>
        </div>
      </div>
    `;
  }

  renderMiniLayer(layer) {
    const score = clampScore(layer.score);

    return `
      <div class="mini-layer ${safeText(layer.tone)}">
        <div>
          <strong>${safeText(layer.label)}</strong>
          <span>${safeText(layer.status)}</span>
        </div>
        <span class="mini-layer-score">${score}</span>
        <span class="mini-layer-track" aria-hidden="true">
          <span style="width: ${score}%"></span>
        </span>
      </div>
    `;
  }

  renderBenchmarkRow(signal) {
    const value = clampScore(signal.value ?? signal.score);
    const benchmark = clampScore(signal.benchmark);
    const variance = value - benchmark;
    const varianceLabel = variance >= 0 ? `+${variance}` : String(variance);

    return `
      <div class="benchmark-row ${safeText(signal.tone)}">
        <div class="benchmark-label">
          <strong>${safeText(signal.label || signal.role)}</strong>
          <span>${value}% / benchmark ${benchmark}% (${safeText(varianceLabel)})</span>
        </div>
        <div class="benchmark-track" aria-hidden="true">
          <span class="benchmark-fill" style="width: ${value}%"></span>
          <span class="benchmark-marker" style="left: ${benchmark}%"></span>
        </div>
        <p>${safeText(signal.detail || "Benchmarked against target sector requirements.")}</p>
      </div>
    `;
  }

  renderRoleFitRow(role) {
    const value = clampScore(role.value);
    const benchmark = clampScore(role.benchmark);
    const variance = value - benchmark;
    const varianceLabel = variance >= 0 ? `+${variance}` : String(variance);
    const statusClass = role.tone === "warning" ? "warning" : role.tone === "proof" ? "growth" : "ready";

    return `
      <article class="role-fit-row ${safeText(role.tone)}">
        <div class="role-fit-score">
          <strong>${value}</strong>
          <span>VEI</span>
        </div>
        <div class="role-fit-main">
          <div class="role-fit-heading">
            <div>
              <h4>${safeText(role.role)}</h4>
              <span>Benchmark ${benchmark} / gap ${safeText(varianceLabel)}</span>
            </div>
            <span class="status-pill ${statusClass}">${safeText(role.decision)}</span>
          </div>
          <div class="role-fit-track" aria-hidden="true">
            <span class="role-fit-fill" style="width: ${value}%"></span>
            <span class="role-fit-marker" style="left: ${benchmark}%"></span>
          </div>
          <div class="role-fit-details">
            <div>
              <strong>Verified evidence</strong>
              <p>${safeText(role.evidence)}</p>
            </div>
            <div>
              <strong>Gap to close</strong>
              <p>${safeText(role.gap)}</p>
            </div>
            <div>
              <strong>Next move</strong>
              <p>${safeText(role.action)}</p>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  renderCapabilityLayer(layer, index) {
    const statusClass = layer.tone === "warning" ? "warning" : layer.tone === "proof" ? "growth" : "ready";

    return `
      <article class="capability-layer ${safeText(layer.tone)}">
        <div class="capability-score ${safeText(layer.tone)}">
          <strong>${clampScore(layer.score)}</strong>
          <span>Layer ${index + 1}</span>
        </div>
        <div class="capability-main">
          <div class="layer-topline">
            <span>Benchmark ${safeText(layer.benchmark)}%</span>
            <span class="status-pill ${statusClass}">${safeText(layer.status)}</span>
          </div>
          <h3>${safeText(layer.label)}</h3>
          ${this.renderBenchmarkRow(layer)}
          <div class="evidence-chip">
            <strong>Validated by</strong>
            <p>${safeText(layer.evidence)}</p>
          </div>
        </div>
      </article>
    `;
  }

  renderRequiredLabel(label) {
    return `
      <span>${safeText(label)} <span class="required-mark" aria-label="required">*</span></span>
    `;
  }

  renderAttachmentControl(source, idleLabel, fileName, helperText, isRequired = false) {
    const status = this.state.attachments[source];
    const isLoading = status === "loading";
    const isDone = status === "done";
    const buttonLabel = isLoading
      ? source === "workingRights"
        ? "Checking evidence..."
        : "Attaching file..."
      : isDone
        ? "Replace attachment"
        : idleLabel;
    const statusLabel = isLoading
      ? source === "workingRights"
        ? "Checking"
        : "Attaching"
      : isDone
        ? source === "workingRights"
          ? "Verified"
          : "Attached"
        : isRequired
          ? "Required"
          : "Not attached";

    return `
      <div class="attachment-card ${isDone ? "is-done" : ""}" data-attachment-card="${safeText(source)}">
        <div>
          <strong>${isDone ? safeText(fileName) : "No file selected"}</strong>
          <p>${safeText(helperText)}</p>
        </div>
        <div class="attachment-actions">
          <span class="status-pill ${isDone ? "ready" : isLoading ? "growth" : "warning"}">${safeText(statusLabel)}</span>
          <button type="button" class="secondary-action" data-attach-source="${safeText(source)}" ${isLoading ? "disabled" : ""}>
            ${safeText(buttonLabel)}
          </button>
        </div>
      </div>
    `;
  }

  renderReadinessBar(signal) {
    return `
      <div class="readiness-row ${safeText(signal.tone)}" role="listitem">
        <div class="readiness-line">
          <strong>${safeText(signal.label)}</strong>
          <span>${safeText(signal.value)}%</span>
        </div>
        <div class="bar-track" aria-hidden="true">
          <span class="bar-fill" style="width: ${safeText(signal.value)}%"></span>
        </div>
        <p>${safeText(signal.detail)}</p>
      </div>
    `;
  }

  renderOpportunityPanel(match) {
    const status = statusCopy[match.status];

    return `
      <article class="opportunity-panel">
        <div class="opportunity-topline">
          <span class="status-pill ${status.className}">${safeText(status.label)}</span>
          <strong>${safeText(match.matchScore)}% match</strong>
        </div>
        <h3>${safeText(match.title)}</h3>
        <p class="detail-summary">${safeText(match.employer)}. ${safeText(match.summary)}</p>

        <strong>Matched signals</strong>
        <div class="matched-tags">
          ${match.matchedSkills.map((skill) => `<span>${safeText(skill)}</span>`).join("")}
        </div>

        <strong>${match.missing.length ? "Still needed" : "Ready now"}</strong>
        ${
          match.missing.length
            ? `<ul class="compact-list">${match.missing
                .map(
                  (item) => `
                    <li>
                      <span>${safeText(item.type)}</span>
                      <p>${safeText(item.label)}: ${safeText(item.detail)}</p>
                    </li>
                  `,
                )
                .join("")}</ul>`
            : `<p class="detail-summary">Jordan can apply with the current DHP and use the matched evidence in the application.</p>`
        }

        <div class="mini-action">
          <strong>Next action</strong>
          <p>${safeText(match.nextAction)}</p>
        </div>
      </article>
    `;
  }

  renderProgress(activeStep) {
    return `
      <nav class="flow-progress" aria-label="Setup progress">
        ${flowSteps
          .map(
            (step) => `
              <span class="${step.id === activeStep ? "is-active" : ""} ${step.id === "dashboard" && activeStep !== "dashboard" ? "is-muted" : ""}">
                ${safeText(step.label)}
              </span>
            `,
          )
          .join("")}
      </nav>
    `;
  }

  renderImportMessage() {
    if (this.state.importStatus.state === "loading") {
      return this.state.importStatus.source === "resume"
        ? "Reading Jordan's sample resume and matching it to DHP fields."
        : "Connecting to Jordan's sample LinkedIn profile and mapping the basics.";
    }

    if (this.state.importStatus.state === "done") {
      return this.state.importStatus.source === "resume"
        ? "Resume import complete. Jordan's profile details and evidence are filled for the demo."
        : "LinkedIn connection complete. Jordan's profile details and work story are filled for the demo.";
    }

    return "Use either demo action. No real upload or LinkedIn connection is required.";
  }

  getImportSourceLabel() {
    if (this.state.importStatus.state !== "done") {
      return "Jordan's setup flow";
    }

    return this.state.importStatus.source === "resume"
      ? "Jordan's sample resume"
      : "Jordan's sample LinkedIn profile";
  }

  navigateDashboard(pageId) {
    if (!dashboardPages.some((page) => page.id === pageId)) {
      return;
    }

    this.state.dashboardPage = pageId;
    this.render();
    window.requestAnimationFrame(() => window.scrollTo(0, 0));
  }

  bindEvents() {
    const welcomeSkip = this.querySelector("[data-welcome-skip]");
    if (welcomeSkip) {
      welcomeSkip.addEventListener("click", () => {
        this.goToStage("auth");
      });
    }

    this.querySelectorAll("[data-dashboard-page]").forEach((button) => {
      button.addEventListener("click", () => {
        this.navigateDashboard(button.dataset.dashboardPage);
      });
    });

    this.querySelectorAll("[data-dashboard-link]").forEach((button) => {
      button.addEventListener("click", () => {
        this.navigateDashboard(button.dataset.dashboardLink);
      });
    });

    const dhpCard = this.querySelector("dhp-readiness-card");
    if (dhpCard) {
      dhpCard.addEventListener("dashboard-navigate", (event) => {
        this.navigateDashboard(event.detail.page);
      });
    }

    const switchAccountButton = this.querySelector("[data-switch-account]");
    if (switchAccountButton) {
      switchAccountButton.addEventListener("click", () => {
        this.state.authMode = "sign-in";
        this.state.dashboardPage = "overview";
        this.goToStage("auth");
      });
    }

    this.querySelectorAll("[data-auth-mode]").forEach((button) => {
      button.addEventListener("click", () => {
        this.state.authMode = button.dataset.authMode;
        this.render();
      });
    });

    const authForm = this.querySelector("[data-auth-form]");
    if (authForm) {
      authForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(authForm);
        const authName = formData.get("authName");
        const authEmail = formData.get("authEmail");

        this.state.form = {
          ...this.state.form,
          fullName: authName ? String(authName) : this.state.form.fullName,
          email: authEmail ? String(authEmail) : this.state.form.email,
        };
        this.goToStage("details");
      });
    }

    this.querySelectorAll("[data-import-source]").forEach((button) => {
      button.addEventListener("click", (event) => {
        this.startAutofill(event.currentTarget.dataset.importSource);
      });
    });

    this.querySelectorAll("[data-attach-source]").forEach((button) => {
      button.addEventListener("click", (event) => {
        this.startAttachment(event.currentTarget.dataset.attachSource);
      });
    });

    const detailsForm = this.querySelector("[data-details-form]");
    if (detailsForm) {
      detailsForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!detailsForm.reportValidity()) {
          return;
        }

        if (this.state.attachments.workingRights !== "done") {
          const card = this.querySelector("[data-attachment-card='workingRights']");
          if (card) {
            card.classList.add("needs-attention");
            card.scrollIntoView({ behavior: "smooth", block: "center" });
          }
          return;
        }

        this.state.form = this.readSetupForm(detailsForm);
        this.applySetupData();
        this.goToStage("dashboard");
      });
    }
  }

  goToStage(stage) {
    this.state.stage = stage;
    this.render();
    window.requestAnimationFrame(() => window.scrollTo(0, 0));
  }

  startAutofill(source) {
    const detailsForm = this.querySelector("[data-details-form]");
    if (detailsForm) {
      this.state.form = this.readSetupForm(detailsForm);
    }

    this.state.importStatus = {
      state: "loading",
      source,
    };
    this.render();

    window.clearTimeout(this.importTimer);
    this.importTimer = window.setTimeout(() => {
      this.state.form = { ...setupDefaults };
      this.state.attachments = {
        projectEvidence: "done",
        workingRights: "done",
      };
      this.state.importStatus = {
        state: "done",
        source,
      };
      this.render();
    }, 1300);
  }

  startAttachment(source) {
    this.state.attachments = {
      ...this.state.attachments,
      [source]: "loading",
    };
    this.render();

    window.clearTimeout(this.attachmentTimers[source]);
    this.attachmentTimers[source] = window.setTimeout(() => {
      this.state.attachments = {
        ...this.state.attachments,
        [source]: "done",
      };
      this.render();
    }, source === "workingRights" ? 1300 : 950);
  }

  readSetupForm(form) {
    const formData = new FormData(form);

    return {
      fullName: String(formData.get("fullName") || setupDefaults.fullName),
      email: String(formData.get("email") || setupDefaults.email),
      phone: String(formData.get("phone") || setupDefaults.phone),
      location: String(formData.get("location") || setupDefaults.location),
      desiredRoles: String(formData.get("desiredRoles") || setupDefaults.desiredRoles),
      skills: String(formData.get("skills") || setupDefaults.skills),
      project: this.state.attachments.projectEvidence === "done" ? setupDefaults.project : "",
      goal: String(formData.get("goal") || ""),
      workRights: this.state.attachments.workingRights === "done" ? "Verified" : "Needs review",
      consent: formData.has("consent"),
    };
  }

  applySetupData() {
    const form = this.state.form;
    const desiredRoles = normaliseList(form.desiredRoles);
    const fullName = form.fullName.trim() || setupDefaults.fullName;
    const initials = fullName
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    jordanProfile.user.fullName = fullName;
    jordanProfile.user.initials = initials || "JL";
    jordanProfile.user.email = form.email.trim() || setupDefaults.email;
    jordanProfile.user.phone = form.phone.trim() || setupDefaults.phone;
    jordanProfile.user.location = form.location.trim() || setupDefaults.location;
    jordanProfile.dhp.desiredRoles = desiredRoles.length
      ? desiredRoles
      : normaliseList(setupDefaults.desiredRoles);
    jordanProfile.dhp.verificationStatuses = jordanProfile.dhp.verificationStatuses.map((item) =>
      item.type === "Working rights"
        ? {
            ...item,
            status: form.workRights,
            visibility: form.consent ? "Employer on request" : "Private",
          }
        : item,
    );
  }
}

class DHPReadinessCard extends HTMLElement {
  constructor() {
    super();
    this.state = {
      activeView: "dhp",
      selectedMatchId: "marketing-assistant",
      campaignEvidenceAttached: false,
    };
  }

  connectedCallback() {
    this.render();
  }

  get completeness() {
    return jordanProfile.dhp.profileCompleteness + (this.state.campaignEvidenceAttached ? 8 : 0);
  }

  get matches() {
    return opportunityMatches.map((match) => {
      if (match.id !== "marketing-assistant" || !this.state.campaignEvidenceAttached) {
        return match;
      }

      return {
        ...match,
        matchScore: 79,
        missing: match.missing.filter((item) => item.id !== "campaign-evidence"),
        nextAction:
          "Campaign evidence is attached. Next, start degree verification so the employer can trust the qualification claim.",
      };
    });
  }

  get selectedMatch() {
    return this.matches.find((match) => match.id === this.state.selectedMatchId) || this.matches[0];
  }

  render() {
    const profile = jordanProfile.dhp;
    const selectedMatch = this.selectedMatch;

    this.innerHTML = `
      <section class="prototype-frame" aria-label="Jordan DHP readiness prototype">
        <article class="profile-card">
          <aside class="dhp-rail" aria-label="DHP profile layers">
            <span class="rail-step">Story</span>
            <span class="rail-step">Skill</span>
            <span class="rail-step">Proof</span>
            <span class="rail-step">Trust</span>
            <span class="rail-step">Index</span>
          </aside>

          <div class="profile-content">
            <header class="profile-header">
              <div>
                <div class="identity-row">
                  <span class="avatar" aria-hidden="true">${safeText(jordanProfile.user.initials)}</span>
                  <h2>${safeText(jordanProfile.user.fullName)}</h2>
                </div>
                <ul class="meta-list" aria-label="Profile facts">
                  <li>${safeText(jordanProfile.user.age)} years old</li>
                  <li>${safeText(jordanProfile.user.location)}</li>
                  <li>${safeText(profile.education.qualification)}</li>
                </ul>
                <p class="headline">${safeText(profile.headline)}</p>
              </div>

              <div class="profile-index-stack">
                <div class="readiness-meter" aria-label="DHP completeness ${this.completeness} percent">
                  <span class="meter-label">DHP readiness</span>
                  <span class="meter-value">${this.completeness}%</span>
                  <span class="meter-track" aria-hidden="true">
                    <span class="meter-fill" style="width: ${this.completeness}%"></span>
                  </span>
                </div>
                <button type="button" class="profile-index-link" data-dashboard-jump="opportunities">
                  <span>VEI</span>
                  <strong>${verifiedEmployabilityIndex.score}</strong>
                  <small>Opportunity fit</small>
                </button>
                <button type="button" class="profile-index-link vci-link" data-dashboard-jump="vci">
                  <span>VCI</span>
                  <strong>${verifiedCapabilityIndex.score}</strong>
                  <small>Capability layers</small>
                </button>
              </div>
            </header>

            <div class="view-toggle" role="group" aria-label="Profile view">
              ${this.renderToggleButton("dhp", "DHP view")}
              ${this.renderToggleButton("resume", "Resume view")}
            </div>

            <div class="view-body">
              ${
                this.state.activeView === "dhp"
                  ? this.renderDhpView(profile)
                  : this.renderResumeView(profile)
              }
            </div>
          </div>
        </article>

        <aside class="match-panel" aria-labelledby="match-title">
          <h2 id="match-title">Capability match</h2>
          <p class="panel-intro">
            Jordan can see where his DHP is already verified, where proof is
            missing, and what is better treated as a growth path.
          </p>

          <div class="match-list">
            ${this.matches.map((match) => this.renderMatchCard(match)).join("")}
          </div>

          ${this.renderMatchDetail(selectedMatch)}
        </aside>
      </section>
    `;

    this.bindEvents();
  }

  renderToggleButton(viewName, label) {
    const isActive = this.state.activeView === viewName;
    return `
      <button type="button" data-view="${viewName}" class="${isActive ? "is-active" : ""}" aria-pressed="${isActive}">
        ${safeText(label)}
      </button>
    `;
  }

  renderDhpView(profile) {
    return `
      <div class="dhp-view">
        <section class="story-block">
          <h3 class="section-title">Human story</h3>
          <p>${safeText(profile.personalStory)}</p>
        </section>

        <section class="insight-grid" aria-label="DHP signals">
          <div class="insight">
            <strong>Career direction</strong>
            <span>${profile.desiredRoles.map((role) => safeText(role)).join(", ")}</span>
            <button type="button" class="link-action" data-dashboard-jump="opportunities">
              View matched roles
            </button>
          </div>
          <div class="insight">
            <strong>Work style</strong>
            <span>${safeText(profile.workStyleSummary)}</span>
          </div>
          <div class="insight">
            <strong>AI readiness</strong>
            <span>Comfort ${safeText(profile.aiReadiness.comfortLevel)}/5 with ${profile.aiReadiness.toolsUsed.map((tool) => safeText(tool)).join(", ")}.</span>
            <button type="button" class="link-action" data-dashboard-jump="vci">
              Open AI layer
            </button>
          </div>
          <div class="insight">
            <strong>Verified indexes</strong>
            <span>VEI ${verifiedEmployabilityIndex.score} and VCI ${verifiedCapabilityIndex.score} turn Jordan's profile into benchmarked employer signals.</span>
            <button type="button" class="link-action" data-dashboard-jump="vci">
              Review VCI
            </button>
          </div>
        </section>

        <section>
          <h3 class="section-title">Skills with evidence</h3>
          <ul class="skill-list">
            ${profile.skills.map((skill) => this.renderSkill(skill)).join("")}
          </ul>
        </section>

        <section>
          <h3 class="section-title">Trust and consent</h3>
          <ul class="evidence-list">
            ${profile.verificationStatuses
              .map(
                (item) => `
                  <li class="evidence-item">
                    <div class="evidence-line">
                      <strong>${safeText(item.type)}</strong>
                      <span class="status-pill ${item.status === "Verified" ? "ready" : "warning"}">${safeText(item.status)}</span>
                    </div>
                    <p>${safeText(item.visibility)}. The DHP stores verification status before exposing sensitive files.</p>
                  </li>
                `,
              )
              .join("")}
          </ul>
        </section>
      </div>
    `;
  }

  renderResumeView(profile) {
    return `
      <div class="resume-view">
        <section class="resume-strip">
          <h3>Education</h3>
          <div class="resume-item">
            <strong>${safeText(profile.education.qualification)}</strong>
            <span>${safeText(profile.education.institution)}. ${safeText(profile.education.status)}.</span>
          </div>
        </section>

        <section class="resume-strip">
          <h3>Experience</h3>
          ${profile.experiences
            .map(
              (experience) => `
                <div class="resume-item">
                  <strong>${safeText(experience.title)}</strong>
                  <span>${safeText(experience.organisation)}. ${safeText(experience.detail)}</span>
                </div>
              `,
            )
            .join("")}
        </section>

        <section class="resume-strip">
          <h3>Projects</h3>
          ${profile.projects
            .map(
              (project) => `
                <div class="resume-item">
                  <strong>${safeText(project.title)}</strong>
                  <span>${safeText(project.role)}. ${safeText(project.outcome)}</span>
                </div>
              `,
            )
            .join("")}
        </section>

        <section class="resume-strip">
          <h3>Applications</h3>
          <ul class="application-list">
            ${profile.applications
              .map(
                (application) => `
                  <li class="application-item">
                    <div class="application-line">
                      <strong>${safeText(application.title)}</strong>
                      <span class="status-pill growth">${safeText(application.status)}</span>
                    </div>
                    <span>${safeText(application.employer)}. ${safeText(application.note)}</span>
                  </li>
                `,
              )
              .join("")}
          </ul>
        </section>
      </div>
    `;
  }

  renderSkill(skill) {
    const attachedEvidence =
      skill.evidence === "Campaign project ready to attach" && this.state.campaignEvidenceAttached
        ? "Campaign project attached"
        : skill.evidence;

    return `
      <li class="skill-item">
        <div class="skill-line">
          <strong>${safeText(skill.name)}</strong>
          <span class="status-pill ready">${safeText(skill.level)} confidence ${safeText(skill.confidence)}/5</span>
        </div>
        <p class="skill-context">${safeText(skill.context)}</p>
        <span class="pill">${safeText(attachedEvidence)}</span>
      </li>
    `;
  }

  renderMatchCard(match) {
    const status = this.getMatchStatus(match);
    const isActive = this.state.selectedMatchId === match.id;

    return `
      <button type="button" class="match-card ${isActive ? "is-active" : ""}" data-match-id="${safeText(match.id)}" aria-pressed="${isActive}">
        <div class="match-topline">
          <strong>${safeText(match.title)}</strong>
          <span class="status-pill ${status.className}">${safeText(status.label)}</span>
        </div>
        <div class="match-meta">
          <span>${safeText(match.employer)}</span>
          <span class="score">${safeText(match.matchScore)}% match</span>
        </div>
      </button>
    `;
  }

  renderMatchDetail(match) {
    const status = this.getMatchStatus(match);
    const canAttachEvidence =
      match.id === "marketing-assistant" &&
      match.missing.some((item) => item.id === "campaign-evidence") &&
      !this.state.campaignEvidenceAttached;

    return `
      <section class="match-detail" aria-live="polite">
        <span class="status-pill ${status.className}">${safeText(status.label)}</span>
        <h3>${safeText(match.title)}</h3>
        <p class="detail-summary">${safeText(match.summary)}</p>

        <strong>Matched capability signals</strong>
        <div class="matched-tags">
          ${match.matchedSkills.map((skill) => `<span>${safeText(skill)}</span>`).join("")}
        </div>

        <strong>${match.missing.length ? "What is missing" : "Ready to apply"}</strong>
        ${
          match.missing.length
            ? `<ul class="missing-list">${match.missing.map((item) => this.renderMissingItem(item)).join("")}</ul>`
            : `<p class="detail-summary">Jordan has enough story, evidence, and trust data to apply without guessing.</p>`
        }

        <div class="action-box">
          <strong>Recommended next action</strong>
          <p>${safeText(match.nextAction)}</p>
          ${
            canAttachEvidence
              ? `<button type="button" class="primary-action" data-action="attach-campaign-evidence">Attach campaign project evidence</button>`
              : ""
          }
        </div>

        <p class="quiet-note">
          This is the product promise in one interaction: Gradstack moves Jordan
          from another unverified application to a clearer capability signal.
        </p>
      </section>
    `;
  }

  renderMissingItem(item) {
    return `
      <li>
        <div class="skill-line">
          <strong>${safeText(item.label)}</strong>
          <span class="status-pill warning">${safeText(item.type)}</span>
        </div>
        <p>${safeText(item.detail)}</p>
      </li>
    `;
  }

  getMatchStatus(match) {
    if (match.id === "marketing-assistant" && match.missing.length === 0) {
      return statusCopy.ready;
    }

    return statusCopy[match.status];
  }

  bindEvents() {
    this.querySelectorAll("[data-view]").forEach((button) => {
      button.addEventListener("click", () => {
        this.state.activeView = button.dataset.view;
        this.render();
      });
    });

    this.querySelectorAll("[data-match-id]").forEach((button) => {
      button.addEventListener("click", () => {
        this.state.selectedMatchId = button.dataset.matchId;
        this.render();
      });
    });

    const attachEvidenceButton = this.querySelector("[data-action='attach-campaign-evidence']");
    if (attachEvidenceButton) {
      attachEvidenceButton.addEventListener("click", () => {
        this.state.campaignEvidenceAttached = true;
        this.state.activeView = "dhp";
        this.render();
      });
    }

    this.querySelectorAll("[data-dashboard-jump]").forEach((button) => {
      button.addEventListener("click", () => {
        this.dispatchEvent(
          new CustomEvent("dashboard-navigate", {
            bubbles: true,
            detail: { page: button.dataset.dashboardJump },
          }),
        );
      });
    });
  }
}

customElements.define("gradstack-onboarding-demo", GradstackOnboardingDemo);
customElements.define("dhp-readiness-card", DHPReadinessCard);
