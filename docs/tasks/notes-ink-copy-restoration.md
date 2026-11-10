# Restore original copy after the Notes visual iteration

## Intent and acceptance

The user clarified that design-system work must change appearance, not product wording. Restore all copy changed in the first visual iteration while retaining its styles and artwork:

- Home badge: “Dobra robota. Z AI w środku.”
- Home H1: “Praca dla ludzi, którzy dowożą z AI.”
- Listing H1: “Dobra robota. Z AI w środku.”
- Remove the newly introduced listing eyebrow “Dobra robota zaczyna się tutaj”.

Compare the original source to ensure descriptions, action labels and other product copy were preserved. Retain the user clarification in active project guidance. Existing browser assertions must check the restored headings. Inspect desktop/mobile wrapping and run the required verification gate.

## Validation and review

Compared the current home/listing source against the pre-redesign Git revision: all marketing text now matches the original. Only visual classes, decorative sketches and artwork integration differ. Confirmed that the newly introduced phrases are absent from product source. Inspected rendered home desktop and listing desktop/mobile screenshots; the restored headings wrap completely and retain the Notes appearance. Evidence is in ignored artifacts/notes-copy-restoration/.

`PLAYWRIGHT_CHANNEL=chrome ./scripts/verify` passed formatting, historical kit integrity/examples, lint, TypeScript, 27 unit tests, baseline validation and production build. Its parallel browser run passed 32 scenarios; two timed out while setting up browser contexts, before interacting with the app. The processes exited before an attempted cleanup signal, so no process was killed. A repeat with `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e -- --workers=1` passed all 34 scenarios in 35 seconds. No test timeout, application logic or browser installation changes were needed. The existing Zod annotation and bundle-size build advisories remain.

A separate final diff review confirmed that both restored hero texts and the home badge match the original revision, the added listing eyebrow was removed, and design styles/assets remain intact. AGENTS.md and GUI.md now explicitly preserve product wording during visual iteration.

FEATURES.md was reviewed; this correction restores wording and does not change registered flows or their availability. No register update is needed.
