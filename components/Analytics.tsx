"use client";

import { useEffect } from "react";
import { analytics } from "@/lib/analytics";

/** Starts PostHog on every page of the site (no-op until a key is set). */
export default function Analytics() {
  useEffect(() => {
    analytics();
  }, []);
  return null;
}
