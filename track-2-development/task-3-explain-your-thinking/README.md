# Track 2 – Development · Task 3: Explain your thinking

**What technical decisions did you make and why?**

I built the prototype as a single vanilla JavaScript Web Component, a custom element with no framework or build step. For a 90-minute task that asks me to show how I think in code, this keeps it dependency-free, instantly runnable, and easy to read during review. I used one `state` object as the single source of truth and a `render()` method that redraws whenever state changes, so the welcome, sign-up, onboarding, and dashboard stages stay predictable and easy to reason about. The sample data deliberately mirrors my Task 1 data model, which keeps the front end and schema consistent. Reflecting Jordan's privacy, sensitive verification is stored as a status and visibility rule rather than raw documents, and I escape all user text with a `safeText` helper to avoid injection.

**What would you approach differently with more time or a full team?**

With more time, I would split this large component into smaller modules, swap the string templates for a tested framework, and persist state through a real backend API instead of in-memory sample data. With a full team, I would first validate the most valuable features with Jordan-like users and stakeholders, then divide the work by each member's strengths and review it together before shipping.
