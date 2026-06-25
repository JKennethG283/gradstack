# Gradstack Internship Challenge — Submission

This repository is my response to the Gradstack take-home challenge, built around the
**Digital Human Profile™ (DHP™)** and the persona **Jordan**, a communications graduate
who has applied to 40+ roles and feels invisible in the hiring market.

My primary submission is **Track 2 — Development**. Track 3 — AI is included as a bonus.

## Live demo

**Track 2 · Task 2 prototype:** [gradstack-track-2-task-2-prototype.vercel.app](https://gradstack-track-2-task-2-prototype.vercel.app/)

## Repository map

### Track 2 — Development (primary)
- [`track-2-development/task-1-design-the-data-model/`](track-2-development/task-1-design-the-data-model/) — DHP data model: entities, fields, relationships, ERD, and trade-offs.
- [`track-2-development/task-2-build-a-component-or-prototype/`](track-2-development/task-2-build-a-component-or-prototype/) — Vanilla-JS web component: onboarding flow + multi-page readiness dashboard.
- [`track-2-development/task-3-explain-your-thinking/`](track-2-development/task-3-explain-your-thinking/) — Technical decisions and what I'd do differently.

### Track 3 — AI (bonus)
- [`track-3-ai/task-1-design-an-ai-feature-for-the-dhp/`](track-3-ai/task-1-design-an-ai-feature-for-the-dhp/)
- [`track-3-ai/task-2-write-and-test-a-prompt/`](track-3-ai/task-2-write-and-test-a-prompt/)
- [`track-3-ai/task-3-explain-your-thinking/`](track-3-ai/task-3-explain-your-thinking/)

## Running the prototype locally

The prototype is plain HTML/CSS/JS with no build step or dependencies.

- **Easiest:** open the live demo link above.
- **Double-click:** open `track-2-development/task-2-build-a-component-or-prototype/index.html`
  in a browser (the script uses `defer`, not ES modules, so it runs from the file system).
- **Served:** from that folder run `python -m http.server 8000`, then open `http://localhost:8000`.

## How to read this

1. Start with the **data model** (Task 1) for the structure behind the product.
2. Open the **live prototype** (Task 2) to see Jordan's first experience; try attaching the
   campaign project evidence and watch the readiness guidance update.
3. Read **Task 3** for the reasoning and trade-offs.
