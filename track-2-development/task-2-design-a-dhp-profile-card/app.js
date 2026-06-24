const jordanProfile = {
  user: {
    fullName: "Jordan Lee",
    initials: "JL",
    age: 24,
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
    label: "Ready now",
    className: "ready",
  },
  "needs-info": {
    label: "Needs info",
    className: "warning",
  },
  growth: {
    label: "Growth path",
    className: "growth",
  },
};

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
          </aside>

          <div class="profile-content">
            <header class="profile-header">
              <div>
                <div class="identity-row">
                  <span class="avatar" aria-hidden="true">${jordanProfile.user.initials}</span>
                  <h2>${jordanProfile.user.fullName}</h2>
                </div>
                <ul class="meta-list" aria-label="Profile facts">
                  <li>${jordanProfile.user.age} years old</li>
                  <li>${jordanProfile.user.location}</li>
                  <li>${profile.education.qualification}</li>
                </ul>
                <p class="headline">${profile.headline}</p>
              </div>

              <div class="readiness-meter" aria-label="DHP completeness ${this.completeness} percent">
                <span class="meter-label">DHP ready</span>
                <span class="meter-value">${this.completeness}%</span>
                <span class="meter-track" aria-hidden="true">
                  <span class="meter-fill" style="width: ${this.completeness}%"></span>
                </span>
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
          <h2 id="match-title">Opportunity readiness</h2>
          <p class="panel-intro">
            Jordan should know what is worth applying for, what needs proof, and
            what is better treated as a growth goal.
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
        ${label}
      </button>
    `;
  }

  renderDhpView(profile) {
    return `
      <div class="dhp-view">
        <section class="story-block">
          <h3 class="section-title">Human story</h3>
          <p>${profile.personalStory}</p>
        </section>

        <section class="insight-grid" aria-label="DHP signals">
          <div class="insight">
            <strong>Career direction</strong>
            <span>${profile.desiredRoles.join(", ")}</span>
          </div>
          <div class="insight">
            <strong>Work style</strong>
            <span>${profile.workStyleSummary}</span>
          </div>
          <div class="insight">
            <strong>AI readiness</strong>
            <span>Comfort ${profile.aiReadiness.comfortLevel}/5 with ${profile.aiReadiness.toolsUsed.join(", ")}.</span>
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
                      <strong>${item.type}</strong>
                      <span class="status-pill ${item.status === "Verified" ? "ready" : "warning"}">${item.status}</span>
                    </div>
                    <p>${item.visibility}. The DHP stores verification status before exposing sensitive files.</p>
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
            <strong>${profile.education.qualification}</strong>
            <span>${profile.education.institution}. ${profile.education.status}.</span>
          </div>
        </section>

        <section class="resume-strip">
          <h3>Experience</h3>
          ${profile.experiences
            .map(
              (experience) => `
                <div class="resume-item">
                  <strong>${experience.title}</strong>
                  <span>${experience.organisation}. ${experience.detail}</span>
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
                  <strong>${project.title}</strong>
                  <span>${project.role}. ${project.outcome}</span>
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
                      <strong>${application.title}</strong>
                      <span class="status-pill growth">${application.status}</span>
                    </div>
                    <span>${application.employer}. ${application.note}</span>
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
          <strong>${skill.name}</strong>
          <span class="status-pill ready">${skill.level} confidence ${skill.confidence}/5</span>
        </div>
        <p class="skill-context">${skill.context}</p>
        <span class="pill">${attachedEvidence}</span>
      </li>
    `;
  }

  renderMatchCard(match) {
    const status = this.getMatchStatus(match);
    const isActive = this.state.selectedMatchId === match.id;

    return `
      <button type="button" class="match-card ${isActive ? "is-active" : ""}" data-match-id="${match.id}" aria-pressed="${isActive}">
        <div class="match-topline">
          <strong>${match.title}</strong>
          <span class="status-pill ${status.className}">${status.label}</span>
        </div>
        <div class="match-meta">
          <span>${match.employer}</span>
          <span class="score">${match.matchScore}% match</span>
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
        <span class="status-pill ${status.className}">${status.label}</span>
        <h3>${match.title}</h3>
        <p class="detail-summary">${match.summary}</p>

        <strong>Matched DHP signals</strong>
        <div class="matched-tags">
          ${match.matchedSkills.map((skill) => `<span>${skill}</span>`).join("")}
        </div>

        <strong>${match.missing.length ? "What is missing" : "Ready to apply"}</strong>
        ${
          match.missing.length
            ? `<ul class="missing-list">${match.missing.map((item) => this.renderMissingItem(item)).join("")}</ul>`
            : `<p class="detail-summary">Jordan has enough story, evidence, and trust data to apply without guessing.</p>`
        }

        <div class="action-box">
          <strong>Recommended next action</strong>
          <p>${match.nextAction}</p>
          ${
            canAttachEvidence
              ? `<button type="button" class="primary-action" data-action="attach-campaign-evidence">Attach campaign project evidence</button>`
              : ""
          }
        </div>

        <p class="quiet-note">
          This is the product promise in one interaction: Gradstack shows Jordan
          what to do before another application disappears into a job board.
        </p>
      </section>
    `;
  }

  renderMissingItem(item) {
    return `
      <li>
        <div class="skill-line">
          <strong>${item.label}</strong>
          <span class="status-pill warning">${item.type}</span>
        </div>
        <p>${item.detail}</p>
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
  }
}

customElements.define("dhp-readiness-card", DHPReadinessCard);
