# Document the current Notes z atramentem system for designers

## Intent and acceptance

The user explicitly invoked document-design-system-components to document the current iterated interface. Produce a Polish human-facing v1 review document, with a full component index/cards, visual evidence, annotations, foundations, variant/property coverage, accessibility guidance and open questions.

- Treat current visual captures as the primary corpus and source annotations as supporting specifications; keep historical user screenshots and the Poster People kit separate.
- Preserve all application code and the historical kit. This task authors documentation and captures only; it does not redesign the app or build an agent package.
- Give each family the eleven required documentation areas, distinguish confirmed visual/specification evidence, estimates, recommendations, unknowns and implementation tests.
- Verify current W3C WCAG/APG guidance and link relevant criteria/patterns.
- Deliver a browsable local HTML document and full Markdown with functioning links, assets, source manifest and explicit coverage limits.
- Validate the document, render the complete artifact at desktop/mobile and run the repository gate before completion. Do not publish, push or prepare an optional agent package before the appropriate acceptance/request.

FEATURES.md was reviewed; documentation and isolated capture work do not change registered product behavior.

## Verification and review

Completed on 2026-11-10.

- Delivered the full Polish HTML and Markdown review document in `docs/design-system/notes-z-atramentem/`: 30 families, eleven sections each, foundations, accessibility references, scope matrix, source index and Q01–Q08.
- Preserved 44 current screenshots, 37 component captures and two separately labeled historical user attachments. Recorded viewport/image dimensions, scenario notes, hashes and source annotations. E22/E31 explicitly represent subsequent focus/checked states in their scenarios.
- Separate content/visual review corrected unsupported claims about a next-step component, CV upload, exact popup spacing and capture states. The document records observed limitations rather than treating them as approved recipes. Product source hashes stayed unchanged.
- Document validation passed: 398 unique anchors, 1386 HTML references, local Markdown targets, 330 card sections, 83 visual hashes, exact token values and source revision identifier.
- Chrome checks passed at 1440/390/320px: full card structure, page overflow, assets/fonts, anchor links, search, index keyboard entry and offline file opening. Axe found zero document violations for the configured A/AA rules. This is not a full application accessibility audit.
- `CI=1 PLAYWRIGHT_CHANNEL=chrome ./scripts/verify` passed: formatting, immutable 67-file kit, six historical renderer tests, lint, types, 27 unit tests, baseline packet, build and 34 browser journeys. Existing build warnings concern Zod annotations and bundle size. Final documentation-only edits received relevant render/content/format checks.
- See the retained human review record in `docs/design-system/notes-z-atramentem/verification.md`. No product flow, historical kit, publication or optional agent package was changed/created. The designer document is v1 for user review; acceptance remains open.
