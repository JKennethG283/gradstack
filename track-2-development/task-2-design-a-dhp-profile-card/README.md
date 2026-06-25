# Task 2 Prototype: DHP Onboarding and Readiness Dashboard

## What this is

This is a small frontend prototype for Jordan's first Gradstack experience. It is not a full Community Hub. It now covers the first-run path from a manual welcome screen, to account setup, to basic profile details, to a simulated resume or LinkedIn import, and finally into a multi-page DHP readiness dashboard.

Open `index.html` in a browser to view it.

The visual direction follows the live Gradstack site: DM Sans typography,
JetBrains Mono for score-like labels, off-white page surfaces, deep purple
headings, green verification accents, violet DHP accents, rounded score cards,
and pill-style status labels.

## Why this feature

Jordan has applied to 40+ roles and mostly heard nothing back. A generic profile card would show his education and work history, but it would not solve the feeling of invisibility. This component shows:

- a welcome screen that waits until the user chooses to start setup
- sign-in and sign-up paths that use Jordan's default demo details
- required setup questions that are clearly marked and already filled with Jordan's sample profile
- simulated attachment controls for project evidence and working rights evidence
- working rights evidence that simulates checking, then stores a verified status instead of a dropdown answer
- mock resume upload and LinkedIn connect actions that simulate loading, confirm success, and fill Jordan's DHP data
- dashboard pages for overview, DHP profile, opportunities, VCI, and applications
- a readiness chart for profile completeness, evidence strength, trust signals, and best opportunity match
- a Verified Employability Index (VEI) tied to opportunity fit, with benchmark signals, trend movement, and role-level apply/hold/growth decisions
- a Verified Capability Index (VCI) page with five validated capability layers, sector benchmarks, and an AI Literacy & Fluency breakdown
- a top-right switch-account action
- a DHP view that connects story, goals, skills, projects, evidence, AI readiness, and verification
- DHP profile index links that jump into VEI opportunity fit or VCI capability layers
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
- `verified_employability_index`
- `verified_capability_index`

The prototype keeps sensitive verification as a status and visibility rule, not as a raw document. That matches the privacy trade-off described in the data model.

## Rubric fit

- Problem framing: built for Jordan's first experience, especially the pain of applying without feedback.
- Depth of thinking: shows the DHP as a living trust layer, not just a resume card.
- Technical execution: uses a small custom element with local state and structured sample data.
- Communication: code names match the product language from the model and summary.
- Relevance: centered on Gradstack's Community Hub promise: visible, trusted, and connected.

## With more time

I would connect this to real onboarding data, add an evidence upload flow, add consent controls for employer access, and turn the opportunity panel into a reusable match card component.
