# Adopt IBM Plex Serif for editorial headings

## Intent and acceptance

The user requested IBM Plex Serif during the Notes z atramentem iteration. Replace the working Georgia editorial face with locally bundled IBM Plex Serif Regular 400, retaining the established typography roles, sizes, colors, copy and artwork.

- Brand/editorial font tokens and shared heading recipes resolve to IBM Plex Serif.
- The full upstream WOFF2 and original license ship with the project; no remote runtime font request or new npm dependency.
- Preserve sans-serif job titles, data and controls and all existing Polish wording.
- Check font loading, Polish glyphs, desktop/mobile wrapping and horizontal overflow; run the required verification gate and separately review the change.
- Update the active font guidance and SYS-01 visual description. Keep historical evidence and the old reference kit unchanged.

## Verification and review

`CI=1 PLAYWRIGHT_CHANNEL=chrome ./scripts/verify` passed locally with Node 24.22.2: formatting, historical reference integrity/six example checks, ESLint, TypeScript, 27 unit tests, baseline validation, production build and all 34 browser journeys. CI=1 selected two local test workers; this is not a claim of a hosted CI run. Existing nonblocking Zod annotation and bundle-size advisories remain. No dependencies or test assertions were added or changed for this font substitution.

A separate isolated Chrome rendering check covered home, listing and offer at 1280/390/320px (nine route/viewport combinations). It waited for document.fonts.ready, confirmed a loaded IBM Plex Serif face and a successful local WOFF2 response, checked original H1 text, ensured body/job/control roles remain sans-serif, and found no title/document horizontal overflow or external HTTP(S) requests. Inspected desktop/mobile screenshots and a temporary Polish glyph specimen visually; all uppercase/lowercase Polish diacritics render. The specimen exists only in the test context, not product UI. Python FontTools was not installed, so no cmap-based inspection is claimed; font loading and visible glyph output were checked in Chrome without installing extra tooling.

Evidence is in ignored artifacts/ibm-plex-serif/, including verify.log, review.log, review.json and captures.

In a separate final review, checked the face declaration, shared brand/editorial token aliases, normal 400 weight and existing no-synthesis heading treatment, local font/license provenance, unchanged Polish source wording and preserved sans-serif overrides. Updated active font guidance and SYS-01; kept the installed skill and historical kit unchanged. No commit, merge, deployment or GitHub push was performed.
