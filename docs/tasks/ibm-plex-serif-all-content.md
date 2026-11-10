# Extend IBM Plex Serif to all interface text

## Intent and acceptance

The user explicitly requested IBM Plex Serif for the remaining content, beyond headings. This supersedes the initial Notes serif/sans split. Preserve all Polish product wording, workflows, colors and artwork.

- Use one local IBM Plex Serif family for brand/editorial, body, job titles, data, navigation, controls and portal text.
- Bundle unmodified upstream Medium 500, SemiBold 600 and Bold 700 faces alongside Regular 400 and the existing original IBM license; no runtime remote requests or package dependency.
- Remove the explicit Arial workspace wordmark override and unused Timeless runtime alias.
- Preserve regular editorial headings and weight-based hierarchy in dense content; check actual font loading and wrapping on desktop/mobile, including narrow navigation, job titles, salaries, forms and dialogs.
- Run ./scripts/verify and perform a separate review; update active implementation guidance and SYS-01 without rewriting the installed skill or historical evidence.

## Validation and review

`CI=1 PLAYWRIGHT_CHANNEL=chrome ./scripts/verify` passed locally under Node 24.22.2: formatting, historical kit integrity and six example checks, ESLint, TypeScript, 27 unit tests, baseline validation, build and all 34 browser journeys. CI=1 selected two local workers; no hosted CI run is claimed. Existing nonblocking Zod comment and bundle-size advisories remain.

The first full run passed 33 browser scenarios and exposed actual authenticated public-header overflow at 768px after the font substitution. Adjusted header side padding, medium-width navigation gaps and account-action padding; kept navigation labels on one line. Also balanced the 320px header gutter/gap for the wider wordmark. Intermediate and final runs passed all 34 scenarios. No existing layout assertion was weakened.

An isolated Chrome review checked nine route compositions at 1280/390/320px (27 combinations): home, Build-filtered listing, offer, candidate profile/application list/submitted record/application form, employer record and employer job list. After document.fonts.ready, verified every visible HTML text node uses IBM Plex Serif, all four unmodified local WOFF2 files loaded successfully, original product headings remain, no title/document horizontal overflow and no external HTTP(S) requests. Also checked the mobile Base UI filter portal and 12 anonymous/candidate/employer public-header boundaries at 320/640/768/1024px with no brand/navigation overlap or clipped navigation.

Separately inspected rendered desktop/mobile listing, form and recruiter record plus the final 768px authenticated header. No Polish text was rewritten. The stored snapshots and prepared PDF files were untouched. Evidence is in ignored artifacts/ibm-plex-all-content/, including verify.log, verify-before-nav-fix.log, review.log, review.json and captures.

Final source review confirmed one canonical font family via aliases, real 400/500/600/700 faces, preserved regular editorial hierarchy and existing weight distinctions, no remaining hardcoded Arial/Helvetica/sans family in product CSS/TSX, local license/provenance hashes and unchanged component behavior. Updated active guidance and SYS-01 to reflect the user-selected all-serif extension; historical task records, installed skill and original kit remain unchanged. No package dependency, commit, merge, deployment or GitHub push was added.
