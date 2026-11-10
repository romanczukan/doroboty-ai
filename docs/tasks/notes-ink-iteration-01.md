# Notes z atramentem — iteration 01

## Intent

Apply the user-requested Notes z atramentem visual direction to the local prototype. This instruction supersedes the previous Poster People visual target. Iterate locally; final design-system documentation and GitHub publication follow the user's later acceptance.

## Acceptance criteria

- Integrate warm paper/card, ink, brown, yellow, editorial headings, neutral data typography and compact radii into the existing host tokens and Base UI controls.
- Replace the previous people artwork with the skill's consistent lumberjack identity; use sketches sparingly and decoratively.
- Adapt home, listing, shared job cards, offer detail and shared workspace surfaces without changing domain operations, hash URLs, persona boundaries or stored data.
- Keep full titles and salary/basis readable on narrow screens, maintain visible focus, explicit missing salary and text statuses.
- Preserve the historical Poster People reference kit and evidence; identify it as historical in active entry instructions.
- Run ./scripts/verify, inspect desktop and mobile renders, and perform a separate review of the final diff. Record actual results below.

## Working assumptions

Use Georgia for editorial headings and the existing local/system Arial stack for data. Color values and geometry from the skill are starting values for feedback, not a frozen release. Keep existing technical class names to avoid unnecessary changes to composition and behavioral tests.

## Validation

Executed with local Node 24.22.2:

- `PLAYWRIGHT_CHANNEL=chrome ./scripts/verify` passed: formatting, immutable historical kit integrity (67 files / six tests), ESLint, TypeScript, 27 unit tests, baseline packet, production build and all 34 browser journeys.
- The initial sandboxed run passed through build but could not bind the preview server. The authorized rerun exposed a missing provisioned Playwright Chromium. An optional `PLAYWRIGHT_CHANNEL=chrome` uses the installed Chrome in an isolated test profile; the default provisioned-Chromium path is unchanged. No browser or OS package was installed.
- Updated existing visual expectations for the intentionally changed palette, headings, type scale and radii. The PDF request assertion now distinguishes Chrome's built-in browser-local PDF resources from external network requests; actual remote HTTP(S) assets remain disallowed. The intermediate Chrome run had 30 passing scenarios and four stale text/viewer-resource assertions; the corrected full gate passed all 34.
- Inspected listing at 1280/1100/850/390px, offer at 1280/850/390px, homepage desktop and listing at 320px. Additional isolated checks captured saved jobs, applications, candidate record/profile and employer list/record at 1280/390px. Long Polish job titles, missing pay and initials fallback were inspected on listing/offer at 1280/390/320px with no document or title overflow and no external HTTP(S) requests.
- Evidence is in ignored `artifacts/notes-ink-01/`, including `verify.log`, `visual.log` and the screenshots. A Chrome full-page capture of the mobile employer record had a compositing artifact; separate top/bottom viewport captures verified the actual note, actions and timeline. No application change was needed for that capture artifact.
- Nonblocking pre-existing build advisories remain for upstream Zod comment annotations and the JS bundle size. The working mascot PNG is approximately 2.2 MB; further export optimization can follow visual acceptance.

## Separate review

Reviewed the final source diff independently from implementation, then compared the rendered home, listing, offer, long-content cases and both role contexts. Confirmed one host token foundation with marketplace aliases, separate ink primary/yellow selection roles, stable Base UI composition and save handlers, decorative artwork semantics, complete mobile salary/title wrapping and no domain/model/storage/fixture changes. The historical kit remains byte-identical. FEATURES.md reflects the changed public/shared visual behavior; role workflows retain their contracts.

Updated the active agent/GUI/font entry guidance so later iterations do not silently restore Poster People. This is working implementation guidance and an engineering record, not the postponed final design-system documentation. No commit, merge, deployment or GitHub push was performed.

## Illustration provenance

Built-in `imagegen` was used in edit mode with the installed skill's `drwal-study.png` as the reference. Project files:

- `src/assets/notes-ink/drwal-study.png`: retained source concept.
- `src/assets/notes-ink/drwal-pointing-v1.png`: transparent, full-body pointing mascot used in the public brand modules.
- `src/assets/notes-ink/arrow.svg`, `underline.svg`, `twig.svg`: skill sketches copied locally with the brown ink color. The underline viewBox was tightened to its drawn marks for readable UI scale.

Prompt used:

> Use case: background-extraction / identity-preserve. Asset type: website mascot hero, transparent PNG. Edit target: supplied character study. Extract ONLY the leftmost standing lumberjack holding a laptop and pointing to the right. One full-body character with both boots visible; remove the other two characters and all background, genuine transparent alpha. Preserve the exact friendly adult face, dark beard, brown knit beanie, brown plaid shirt, dark trousers, black boots, proportions and gesturing pose. Preserve fine handmade black ink outlines and sparse crosshatching, warm brown fills; no change to illustration style. Keep close framing with small breathing room around the silhouette. No added objects, scenery, shadow, text, logos or border. This will sit on warm off-white paper in a Polish IT job board.

The generated asset was inspected both standalone and on the actual paper surface; alpha transparency was confirmed. The installed skill itself was not modified.
