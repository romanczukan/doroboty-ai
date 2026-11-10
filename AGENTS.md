# Working on DoRoboty.ai Case

This is an AIPH3 teaching prototype, separate from the public production portal.
Read BRIEF.md, docs/case/CASE_PROTOCOL.md, TODO.md and relevant FEATURES.md entries before product work.

## Start and boundaries

- Participant setup: Node.js 24, npm ci, npm run dev (http://127.0.0.1:3001).
- Role selection is a simulation, not security.
- Share plain Zod schemas between forms and domain operations.
- Preserve human editing and approval. Use synthetic data only.
- Keep historical case evidence separate from prototype state. Include only baseline in participant packages; source history and instructor materials must not be distributed.

## Workflow

1. Record intent and acceptance criteria in docs/tasks/ for changes larger than one line.
2. Do not let multiple agents write in one worktree.
3. Implement and run ./scripts/verify before claiming completion; explain actual failures.
4. Perform a separate review pass before merging. Record durable lessons when useful.

## Product behavior register

FEATURES.md describes current behavior, not a roadmap. Update it in the same change/commit for added, changed, removed or simulated flows. Preserve stable IDs, route/role/data boundaries and source/test references. Do not equate source coverage with an executed test or deployment. For changes without behavioral impact, record that the register was reviewed and did not need updating.

## Active design direction — Notes z atramentem (iteration)

The user has requested replacing Poster People with **Notes z atramentem**. This current instruction supersedes older visual requirements. Use warm paper/card surfaces, ink primary actions, brown editorial headings, yellow selections, IBM Plex Serif throughout headings, body text, jobs, data and controls (local weights 400/500/600/700, per the user’s latest typography choice) and the consistent sketch lumberjack. Existing routes, Base UI `render` composition, domain operations and local flows remain required. Preserve existing product copy when changing the design system; example wording in a skill is not authorization to rewrite text. Change copy only when the user explicitly requests it.

Read [GUI.md](GUI.md) and the current [iteration record](docs/tasks/notes-ink-iteration-01.md). The host foundation is tokens.css, shared recipes are src/app/notes-ink.css, and project-owned artwork is src/assets/notes-ink/. Use the repository-local [notes-z-atramentem skill](docs/design-system/skills/notes-z-atramentem/SKILL.md) for its current decisions and assets. The current implementation and [designer documentation](docs/design-system/notes-z-atramentem/README.md) are a working v1 for review. The user explicitly requested committing and publishing this iteration to GitHub on 2026-11-10; this does not close the documented open design decisions.

Keep docs/design-system/agent-kit byte-identical as the historical Poster People reference. Its integrity checks still apply to that historical kit, not to current visual conformity. Existing host implementation/API guides remain useful for behavior and component ownership; old visual values must not override the new user direction. Preserve desktop/mobile, keyboard, content edge-case and integration checks. Do not create parallel button/card libraries or import vanilla reference controllers into React.

## Standards

- Code, comments and authored engineering documentation are English; end-user UI and canonical AIPH source wording are Polish.
- Use npm, Node.js 24 and package-lock.json. No second package manager.
- Features belong in src/features; src/components/ui contains shared Base UI primitives.
- For UI changes follow GUI.md and the active Notes z atramentem direction with the existing Base UI components and render composition API. Preserve the historical reference and do not treat earlier visual values as the active target.
- Use React Router hash routes.
- Never log private free text or introduce secrets into the frontend.

## Validation

- npm run check verifies formatting, lint, types, unit tests, static build and browser journeys. ./scripts/verify runs the same gate.
- npm run dev never installs browser binaries or system tools. Browser tests require a provisioned Playwright Chromium; if missing, report it. Do not install OS dependencies automatically.
- Check mobile/desktop, keyboard access, error states and data recovery.
- Report what actually ran. Local checks do not prove CI, publishing or human approval.
