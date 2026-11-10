# GUI — DoRoboty.ai · Notes z atramentem

The active direction is **Notes z atramentem**, requested by the user on 2026-11-10. This is the first local iteration; final design-system documentation and publication follow acceptance.

- Preserve existing Polish product copy during visual changes. Skill examples demonstrate styling and do not authorize rewriting content.
- Warm paper `#FAF6EE`, card `#FFFDF8`, shared shaded paper `#E8DDCE` for the listing hero, methodology, persona selection, application forms and account workspaces, ink `#171411`, brown `#71472E`, yellow `#F5CF49`.
- Locally bundled IBM Plex Serif throughout headings, body copy, jobs, data, navigation and controls; real weights 400/500/600/700 maintain hierarchy. This user-selected extension supersedes the skill’s initial serif/sans split. Black primary actions and outlined secondary actions; yellow for selection and small accents, neutral tags.
- Compact cards and controls, thin contours and quiet internal separators. Keep the lumberjack in brand modules; data-heavy views give priority to reading.
- One host foundation in [tokens.css](tokens.css), shared recipes in [notes-ink.css](src/app/notes-ink.css), existing marketplace/record/application compositions, and local assets in src/assets/notes-ink/.
- Preserve React/Base UI composition, hash routing, local scenario operations, human editing, snapshots and recovery. Inspect desktop/mobile, long titles, missing pay/logo, focus and states; run ./scripts/verify.

See the [iteration record](docs/tasks/notes-ink-iteration-01.md) for scope, assumptions and actual verification. The [Poster People kit](docs/design-system/agent-kit/design.md) is retained as historical evidence, not the current visual target. Existing component/API and behavior guides remain useful; visual values are being revised in this iteration.
