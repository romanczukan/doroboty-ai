# DoRoboty.ai — AIPH3 prototype

A frontend-only job marketplace for participants to extend and test. Built with React, TypeScript and Vite, using Base UI components. The active visual direction is the working Notes z atramentem iteration.

## Design system — start here for UI work

Start with [GUI.md](GUI.md) and the [current iteration record](docs/tasks/notes-ink-iteration-01.md). Notes z atramentem uses warm paper, brown editorial headings, ink actions, yellow selections and a sketch lumberjack. This published working iteration includes [designer documentation v1](docs/design-system/notes-z-atramentem/README.md) and the [updated portable skill](docs/design-system/skills/notes-z-atramentem/SKILL.md). The documentation records open decisions for subsequent iterations.

Use the shared host foundation in tokens.css, existing React/Base UI components and local src/assets/notes-ink artwork. Preserve application behavior, hash routing and stored scenario data. Validate desktop/mobile, long content, focus and states; run ./scripts/verify. AGENTS.md and CLAUDE.md identify the same active direction.

To reuse the skill in Codex, copy `docs/design-system/skills/notes-z-atramentem/` into your personal skills directory as `notes-z-atramentem/`, preserving its references and assets. The application itself runs without installing the skill.

The original 67-file Poster People kit remains unchanged under docs/design-system/agent-kit as historical evidence. `npm run design-system:check` verifies that preserved kit; `npm run design-system:dev` previews it separately on port 8952. Neither command establishes conformity of the current Notes iteration. Existing host/API guides remain useful for behavior and component ownership.

## Run

Requirements: **Node.js 24 and npm**.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3001. No environment file, account, database or additional service is required. Package installation requires access to the npm registry.

Select Anna or Marek as a candidate, Karolina or Tomasz as an employer, or the instructor. Publish a job, apply, switch person and record the employer decision. Changes survive reload in this browser; settings provide export, import and reset. AI and scores simulate prepared scenarios. Use example CVs only.

## Build and verify

```sh
npm run build
npm run preview
./scripts/verify
```

The static output is dist/. Browser checks require an already provisioned Playwright Chromium; starting the app never installs it. See [participant guide](docs/PARTICIPANT_GUIDE.md), [architecture](docs/architecture.md), [current features](FEATURES.md) and [case protocol](docs/case/CASE_PROTOCOL.md).

To distribute a baseline participant package, run npm run package:participant -- /absolute/output/directory. This excludes Git history and instructor source material. Never distribute this repository’s history as a stage-safe packet.

### Optional PostHog analytics

Copy `.env.example` to `.env.local` and use the public PostHog project token and ingestion host
(for an EU Cloud project, `https://eu.i.posthog.com`). Vite embeds both settings at build time.
Keep the default participant build unconfigured. Use a separate PostHog project for preview. Enable Autocapture and
Session Replay in that project and check the integration with synthetic data before enabling it
in the production project.
The participant opts in and can withdraw on `/#/polityka-prywatnosci`.
For the privacy boundary and validation, see [the PostHog task record](docs/tasks/posthog-privacy.md).
