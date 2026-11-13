import posthog, { type PostHogConfig } from "posthog-js";

const token = import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN;
const host = import.meta.env.VITE_PUBLIC_POSTHOG_HOST;
const consentKey = "doroboty-analytics-consent-v1";
const privateSelector = [
  "[data-analytics-private]",
  ".ph-no-capture",
  '[data-slot="alert-dialog-content"]',
  "input:not([data-analytics-safe-checkbox][type=checkbox])",
  "textarea",
  "select",
  "[contenteditable]",
  "iframe",
  "object",
  "embed",
].join(", ");
const publicRoutes = new Set(["/", "/oferty", "/metodologia", "/polityka-prywatnosci"]);
let initialized = false;
let allowed = false;

export { posthog };
export const analyticsAvailable = Boolean(token && host);
export const isReplayPublicRoute = (pathname: string) => publicRoutes.has(pathname);

function routeName() {
  const pathname = window.location.hash.slice(1).split(/[?#]/, 1)[0] || "/";
  if (publicRoutes.has(pathname)) return pathname;
  if (pathname.startsWith("/oferty/")) return "/oferty/:slug";
  if (pathname.startsWith("/firmy/")) return "/firmy/:slug";
  if (pathname.startsWith("/aplikuj/")) return "/aplikuj/:slug";
  if (pathname === "/app") return "/app";
  for (const section of [
    "profil",
    "zapisane",
    "aplikacje",
    "oferty",
    "kandydaci",
    "organizacja",
    "settings",
    "case",
  ]) {
    const prefix = "/app/" + section;
    if (pathname === prefix || pathname.startsWith(prefix + "/")) return prefix;
  }
  if (pathname.startsWith("/auth/")) return "/auth";
  return "other";
}

function pageOrigin() {
  return window.location.origin + "/";
}

const config = {
  defaults: "2026-08-30",
  persistence: "localStorage",
  persistence_name: "doroboty-opt-in-v1",
  cross_subdomain_cookie: false,
  person_profiles: "never",
  opt_out_capturing_by_default: true,
  opt_out_persistence_by_default: true,
  autocapture: {
    dom_event_allowlist: ["click"],
    css_selector_allowlist: ["[data-ph-capture-attribute-control]"],
    css_selector_ignorelist: [privateSelector, ".ph-no-autocapture", "[data-ph-no-autocapture]"],
    capture_copied_text: false,
  },
  mask_all_text: true,
  mask_all_element_attributes: true,
  capture_pageview: false,
  capture_pageleave: false,
  disable_capture_url_hashes: true,
  save_campaign_params: false,
  save_referrer: false,
  capture_exceptions: false,
  capture_heatmaps: false,
  capture_dead_clicks: false,
  capture_performance: false,
  rageclick: false,
  disable_surveys: true,
  disable_conversations: true,
  disable_product_tours: true,
  advanced_disable_feature_flags: true,
  enable_recording_console_log: false,
  session_recording: {
    blockSelector: privateSelector,
    maskAllInputs: true,
    captureJsonLd: false,
    captureCanvas: { recordCanvas: false },
    recordHeaders: false,
    recordBody: false,
    recordCrossOriginIframes: false,
    maskCapturedNetworkRequestFn: (request) => ({ ...request, name: pageOrigin() }),
    // Link attributes can contain hash routes with raw search terms or record IDs.
    maskAttributeFn: (name, value) => (["href", "xlink:href"].includes(name) ? "" : value),
  },
  before_send: (event) => {
    if (!allowed) return null;
    if (event.event === "$snapshot") return event;

    const properties = event.properties;
    for (const key of Object.keys(properties)) {
      if (
        /^\$.*(?:url|pathname|referr|title)/i.test(key) ||
        ["$search_keyword", "$host", "$external_click_url"].includes(key)
      ) {
        delete properties[key];
      }
    }
    properties.route = routeName();
    return event;
  },
} satisfies Partial<PostHogConfig>;

function storedPermission() {
  try {
    return localStorage.getItem(consentKey) === "yes";
  } catch {
    return false;
  }
}

function applyPermission(next: boolean) {
  allowed = next && analyticsAvailable;
  if (allowed && !initialized) {
    posthog.init(token, { ...config, api_host: host });
    initialized = true;
  }
  if (!initialized) return;
  if (allowed) {
    posthog.set_config({ disable_session_recording: false });
    posthog.opt_in_capturing({ captureEventName: false });
  } else {
    posthog.opt_out_capturing();
    posthog.stopSessionRecording();
  }
}

export function analyticsAllowed() {
  return allowed;
}

export function setAnalyticsPermission(next: boolean) {
  try {
    localStorage.setItem(consentKey, next ? "yes" : "no");
  } catch {
    // Keep the user's choice for the current page if browser storage is unavailable.
  }
  applyPermission(next);
  window.dispatchEvent(new Event(consentKey));
}

export function subscribeToAnalyticsPermission(notify: () => void) {
  window.addEventListener(consentKey, notify);
  return () => window.removeEventListener(consentKey, notify);
}

if (analyticsAvailable) {
  applyPermission(storedPermission());
  window.addEventListener("storage", (event) => {
    if (event.key === consentKey || event.key === null) {
      applyPermission(storedPermission());
      window.dispatchEvent(new Event(consentKey));
    }
  });
}
