import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import {
  analyticsAllowed,
  analyticsAvailable,
  setAnalyticsPermission,
  subscribeToAnalyticsPermission,
} from "./posthog";

export function AnalyticsPreference() {
  const allowed = useSyncExternalStore(subscribeToAnalyticsPermission, analyticsAllowed);

  if (!analyticsAvailable) return null;

  return (
    <section className="prototype-panel space-y-4" aria-labelledby="analytics-heading">
      <h2 id="analytics-heading">Analityka i nagrania sesji</h2>
      <p>
        Jeśli się zgodzisz, PostHog otrzyma informacje o odsłonach ekranów, wybranych kliknięciach i
        działaniach oraz nagranie korzystania z interfejsu. Obszary z danymi scenariusza, takie jak
        profile, formularze, CV i notatki, są ukryte w nagraniu. Twój wybór nie wpływa na działanie
        prototypu.
      </p>
      <p role="status">Analityka: {allowed ? "włączona" : "wyłączona"}.</p>
      <Button variant="outline" onClick={() => setAnalyticsPermission(!allowed)}>
        {allowed ? "Wyłącz analitykę i nagrania" : "Włącz analitykę i nagrania"}
      </Button>
    </section>
  );
}
