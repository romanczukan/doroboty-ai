# Extend the shaded paper background to the requested pages

## Intent and acceptance

The user requested the same #E8DDCE background on Methodology, Dla firm, Applications, Profile and My account. Dla firm is currently the employer-scoped persona picker. Apply the shared shaded canvas to methodology, auth/persona selection, application forms and account workspaces (including candidate/employer lists, detail, profile, dashboard and settings).

- Keep one canonical shaded-paper value; the existing listing hero token is an alias to it.
- Select the page canvas in the shared shell rather than editing each page or the global body/listing-results color.
- Preserve light navigation, forms, cards and portals, with readable ink/brown text.
- Preserve all product wording, layout, route/query behavior and stored scenario operations.
- Inspect public, candidate and employer contexts at desktop/mobile widths, confirm scoped surfaces and contrast, run ./scripts/verify and perform a separate review.

FEATURES.md was reviewed. This shared surface extension does not change registered behavior or availability.

## Validation and review

`CI=1 PLAYWRIGHT_CHANNEL=chrome ./scripts/verify` passed locally under Node 24.22.2: formatting, historical kit integrity/six examples, lint, types, 27 unit tests, baseline validation, production build and all 34 browser journeys. CI=1 selected two local workers; no hosted CI run is claimed. Existing nonblocking Zod annotation and bundle-size advisories remain.

An isolated Chrome check covered 12 route compositions at 1280/390px (24 captures): methodology, employer persona picker, candidate account/profile/applications/submitted record/application form/settings, employer account/jobs/record/organization. All resolve to rgb(232, 221, 206) for the shaded wrapper, with light rgb(255, 253, 248) cards/forms/navigation and the original body canvas. The document has no horizontal overflow; Axe color-contrast scans have no violations across all 24 states. Home, listing, public offer and company pages remain outside the shaded-page wrapper; the existing listing hero retains its exact shaded color via the alias.

Separately inspected methodology, employer picker, applications and account desktop screenshots plus mobile profile, and reviewed the route-bound shell class, shared token alias and navigation surface rule. No product strings, state transitions, route destinations, typography or spacing were edited. Evidence is in ignored artifacts/shared-shaded-background/, including review.json, review.log, verify.log and screenshots. Updated the active GUI surface note; historical kit/records remain unchanged. No commit, merge, deployment or GitHub push was performed.
