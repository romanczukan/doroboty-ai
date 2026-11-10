# Clarify the applications search field

## Intent and acceptance

The user identified the empty applications search input as looking broken. Add a decorative magnifier and a helpful placeholder without changing existing labels, width, filtering or persistence.

- Candidate applications: retain “Szukaj oferty”, add “Wpisz nazwę stanowiska…”.
- The shared recruiter list uses the same presentation with “Imię, nazwisko lub stanowisko…”, retaining its existing label and search behavior.
- Reuse the existing search-field positioning/padding recipe, Lucide Search and Base UI Input. Keep full available width and enough icon/text separation.
- Hide the decorative icon from assistive technology and pointer/focus interaction; preserve the wrapping label and visible input focus.
- Inspect desktop/mobile, exercise filtering/reset and keyboard focus; run the required verification gate and separately review the change.

FEATURES.md was reviewed. Existing local candidate/job search behavior and role boundaries are unchanged, so no register update is needed.

## Validation and review

`CI=1 PLAYWRIGHT_CHANNEL=chrome ./scripts/verify` passed locally under Node 24.22.2: formatting, historical kit integrity/six examples, lint, types, 27 unit tests, baseline validation, production build and all 34 browser journeys. CI=1 selected two local workers; no hosted CI is claimed. Existing nonblocking Zod annotation and bundle-size advisories remain.

An isolated Chrome check covered candidate and recruiter lists at 1280/390/320px. Verified contextual placeholders, decorative/nonfocusable icon semantics, label-click focus, case-insensitive matches, no-results feedback and restoring the list after clearing the query. The input retains full available width, icon/text separation is at least 4px and the document has no horizontal overflow. Axe label and color-contrast checks of main content found no violations across the six states.

Separately inspected candidate desktop/mobile renders and reviewed the changed JSX/CSS: the existing wrapping label remains the accessible name, the icon does not intercept pointers or focus, and the query handler/filter predicates and existing UI labels are untouched. The only new product text is the user-requested contextual placeholder. Evidence is in ignored artifacts/application-search-affordance/, including screenshots, review.json, review.log and verify.log. No new permanent tests, package dependency, commit, merge, deployment or GitHub push was added.
