# Next steps action card

## Intent and acceptance criteria

Implement the approved action-card concept on `codex/kolejne-kroki`. Both application details show the current next step, its schedule and public employer comments above the existing materials/history layout. Employers can plan the first interview, feedback or technical evaluation, omit a date with an explicit warning, reschedule, and cancel edits. Feedback has a calendar deadline; meetings use Europe/Warsaw wall time. Private recruiting notes remain private in role projections.

Changing a stage can include a public comment. Marking the first conversation held completes a planned first interview; terminal states close every plan. Planning alone does not change stages or complete elapsed steps. Previous dates and public changes remain in history. Version-1 browser saves/imports without the new fields stay compatible; exports preserve the feature. No email, backend, merge or publication is included.

## Validation plan

- Unit coverage for partial/dated steps, rescheduling, company/role boundaries, lifecycle, dates/DST and storage compatibility.
- Browser journeys for employer edits, candidate visibility, reload, cancellation, feedback, technical evaluation, terminal states, keyboard, narrow screens and private-note exclusion.
- Run `./scripts/verify`, inspect actual desktop/mobile renders, and perform a separate final review.

## Results

- Added a shared, role-aware `NextStepCard` above record materials and merged public plan updates into chronological record history. Private notes are projected only for employers; the latest public message is dated and remains visible when a later update omits a comment.
- Added version-1-compatible plan/history defaults and shared Zod validation. New history remains separate from the stage-transition chain. Domain operations validate company ownership and terminal lifecycle. Old saves need no reset or storage-key change.
- Meeting fields interpret wall time in Europe/Warsaw regardless of the device zone. Nonexistent or ambiguous DST times are rejected explicitly. Feedback keeps a date-only deadline. No automatic stage advancement, clock-based completion, email or external service was added.
- Targeted validation passed: TypeScript, ESLint, production build, 22 new unit scenarios and three new browser journeys using installed Chrome. The browser journeys cover both roles, partial plans, rescheduling, public/private comments, reload, first-conversation completion, feedback, technical evaluation, closing, validation, cancellation, keyboard focus, long text, 1280/390/320px and axe checks.
- The sandbox blocked the test server's port binding; the authorized Chrome rerun passed without installing browsers or OS dependencies.
- Final `PLAYWRIGHT_CHANNEL=chrome ./scripts/verify` passed: formatting, immutable historical kit (67 files/six renderer tests), ESLint, TypeScript, all 49 unit scenarios, the 120-journey baseline packet, production build and all 37 browser journeys.
- The first full browser run found an extra empty status region in the read-only candidate card, conflicting with the existing withdrawal announcement. The card now creates its save announcement only for employers; the full rerun passed without weakening the existing test.
- Inspected desktop and narrow renders for current date, previous schedule, public comment, private/public field separation and long unbroken content. Evidence is under ignored `artifacts/next-steps/`. Full-page Chrome captures show the previously documented sticky-navigation compositing artifacts; the card content and automated document-width/axe checks were inspected separately from those artifacts.
- Existing nonblocking Vite advisories remain for upstream Zod annotations and the bundle size. No new dependencies were installed.

## Separate final review

Reviewed the final tracked diff and new model, projection, UI and test files after implementation. Confirmed backward-compatible defaults, separate stage/plan histories, authorization before mutation, validated public comments, terminal closure, first-interview completion, immutable application snapshots, Warsaw-specific time conversion, and explicit candidate projection without private notes. Checked focus after open/save/cancel and stage changes, old withdrawal behavior, token reuse and narrow layouts. `git diff --check` passed. No outstanding functional review findings remain.

Changes remain uncommitted on `codex/kolejne-kroki`; no merge, remote push or publication was performed.
