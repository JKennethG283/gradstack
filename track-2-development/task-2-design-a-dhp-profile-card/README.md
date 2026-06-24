# Task 2 Prototype: DHP Readiness Card

## What this is

This is a small frontend prototype for Jordan's first Gradstack experience. It is not a full Community Hub. It focuses on one moment that matters: helping Jordan see how his Digital Human Profile makes him visible before he applies again.

Open `index.html` in a browser to view it.

## Why this feature

Jordan has applied to 40+ roles and mostly heard nothing back. A generic profile card would show his education and work history, but it would not solve the feeling of invisibility. This component shows:

- a DHP view that connects story, goals, skills, projects, evidence, AI readiness, and verification
- a resume view that intentionally feels flatter, so the difference is clear
- opportunity readiness guidance with matched skills, missing proof, and a recommended next action
- one stateful interaction: attach the campaign project evidence and watch the DHP completeness and opportunity guidance update

## How it uses the Task 1 model

The sample data in `app.js` mirrors the Task 1 DHP model:

- `user`
- `digital_human_profile`
- `skills`
- `projects`
- `evidence`
- `ai_readiness`
- `verification_statuses`
- `opportunity_matches`
- `applications`

The prototype keeps sensitive verification as a status and visibility rule, not as a raw document. That matches the privacy trade-off described in the data model.

## Rubric fit

- Problem framing: built for Jordan's first experience, especially the pain of applying without feedback.
- Depth of thinking: shows the DHP as a living trust layer, not just a resume card.
- Technical execution: uses a small custom element with local state and structured sample data.
- Communication: code names match the product language from the model and summary.
- Relevance: centered on Gradstack's Community Hub promise: visible, trusted, and connected.

## With more time

I would connect this to real onboarding data, add an evidence upload flow, add consent controls for employer access, and turn the opportunity panel into a reusable match card component.
