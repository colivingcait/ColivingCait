import posthog from "posthog-js";
import config from "./posthog-config.json";

// PostHog analytics for the Next.js pages. The project key and region live in
// lib/posthog-config.json, which the /audit deck build script reads too.
// Events go through /ingest on this domain (see next.config.mjs) so ad
// blockers don't drop them. Session replay records typed values on purpose:
// Caitlyn wants to see how people fill in the audit intake.

export const POSTHOG_KEY: string = config.key;
export const POSTHOG_UI_HOST = config.region === "eu" ? "https://eu.posthog.com" : "https://us.posthog.com";

let started = false;

/** The PostHog client, initialised on first use in the browser; null if off. */
export function analytics() {
  if (typeof window === "undefined" || !POSTHOG_KEY) return null;
  if (!started) {
    started = true;
    posthog.init(POSTHOG_KEY, {
      api_host: "/ingest",
      ui_host: POSTHOG_UI_HOST,
      defaults: "2025-05-24", // pageviews on every client-side navigation
      session_recording: { maskAllInputs: false },
    });
  }
  return posthog;
}
