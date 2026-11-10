# Darker background for the listing introduction

## Intent and acceptance

The user requested a darker background specifically for the listing section containing “Dobra robota. Z AI w środku.” and the search form. Use a warmer, darker paper surface while preserving all copy and the current IBM Plex Serif styling.

- Set a host surface token (`--gui-surface-hero: #e8ddce`) for the listing intro, including its existing search/category composition.
- Keep light search controls and the existing ink/yellow treatments readable.
- Preserve the public navigation, results, other pages, artwork, interactions and stored state.
- Inspect desktop/mobile appearance and contrast; run the repository verification gate and separately review the change.

FEATURES.md was reviewed; this surface-color adjustment does not change the behavior or availability of registered flows.

## Validation and review

`CI=1 PLAYWRIGHT_CHANNEL=chrome ./scripts/verify` passed locally with Node 24.22.2: formatting, historical kit integrity/six examples, lint, types, 27 unit tests, baseline packet, production build and all 34 browser journeys. CI=1 selected two local workers; no hosted CI is claimed. Existing nonblocking Zod annotation and bundle-size advisories remain.

Inspected the Build-filtered listing at 1280/390/320px in an isolated Chrome context. Confirmed the hero is rgb(232, 221, 206), search stays rgb(255, 253, 248), body remains rgb(250, 246, 238), original heading is preserved and the document has no horizontal overflow. Axe WCAG 2 A/AA scan of the intro has no violations at all three widths after correcting the selected category’s small-description color from muted to ink. That existing selected-yellow detail had 4.42:1 contrast; its wording, selection behavior and yellow background are unchanged.

Calculated heading contrast on the new surface is 5.93:1, supporting body text 4.98:1 and ink 13.69:1. Evidence is in ignored artifacts/darker-listing-hero/, including screenshots, review.json, review.log and verify.log.

A separate source/render review confirmed the darker surface is scoped to .pp-intro-section via the host token, light search controls are preserved, and no copy, typography, layout, other page surface or domain operation changed. Updated the active GUI color note. No commit, merge, publishing or GitHub push was performed.
