# PostHog privacy boundaries

Keep the wizard's product events and opt-in interaction analytics and session replay for the teaching prototype. The scenario is still synthetic; a persona is not a participant identity.

- Start PostHog only after a participant opts in on the privacy page. Make withdrawal available on that page from public and workspace navigation.
- Allow automatic interaction capture only on explicitly tagged controls; block private areas and editable/dynamic content from replay. Keep sanitized route categories and exclude text, identifiers, and user-entered URL parameters from analytics.
- Use an anonymous browser identity, with the exercise role sent only as a controlled event property. Keep browser logs, exception capture and network recording out of scope.
- Verify consent, safe controls, and private content against the actual SDK using synthetic markers and intercepted requests. A hosted preview and a PostHog test project are still needed to confirm ingestion and playback.

## Preview and rollout

1. Create or select a separate EU PostHog project for preview. Put its project token and host
   in Vite's preview environment and rebuild. Use the production token only on the approved
   deployment. Leave participant copies unconfigured unless telemetry is part of the exercise.
2. In the preview PostHog project enable Web Autocapture and Session Replay. For the test, allow
   recording a short session; set recording sampling, access and retention deliberately before
   rollout. Leave console logs, network bodies and headers, and canvas capture disabled.
3. On the preview, open Privacy, opt in, then use the categories and navigation and submit a
   synthetic application. Check the resulting `$autocapture` event and its `control` property,
   the product events, and play a recording. Make sure workspace details, typed search text,
   answers, CVs and notes are not visible. Check that a second browser selecting the same
   persona has a different anonymous ID. Withdraw in Privacy and check that new interactions
   no longer produce events. Withdrawal applies to future collection; it does not delete
   data already sent.
4. In the candidate funnel use the anonymous browser identity and the opt-in cohort; do not
   interpret unique browsers as unique people or compare it to the historical case packet.

Keep new workspace routes and data from the scenario blocked by default. Before allowing another
interaction, add a fixed `data-ph-capture-attribute-control` value to the control and check that
it has no private content in its DOM subtree or accessible name. When adding a public surface,
review its dynamic data and any components that render outside the route tree, such as dialogs.
