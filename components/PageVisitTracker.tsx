"use client";

import { useEffect } from "react";
import {
  getVisitorEmail,
  getVisitorFirstName,
  markVisitTagFired,
  rememberVisitor,
  shouldFireVisitTag,
} from "@/lib/visitor";

// Drop one of these on any page you want to tag a known subscriber as
// having visited. Two ways the visitor becomes "known":
//   1. They click a ConvertKit email link with ?ck_subscriber_email=
//      (CK appends this automatically) — we cache it
//   2. They've submitted any form on the site previously (cached then)
//
// If we don't know the visitor's email, we no-op gracefully — there's
// nothing to tag yet, and CK can't tag an anonymous visitor anyway.
type PageVisitTrackerProps = {
  /** ConvertKit tag name to apply on visit. */
  tag: string;
};

export default function PageVisitTracker({ tag }: PageVisitTrackerProps) {
  useEffect(() => {
    // First, see if CK passed identity via query param (standard pattern)
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const ckEmail = url.searchParams.get("ck_subscriber_email");
    const ckFirstName = url.searchParams.get("ck_first_name");
    if (ckEmail) {
      rememberVisitor(ckEmail, ckFirstName ?? undefined);
    }

    const email = getVisitorEmail();
    if (!email) return;

    // Don't re-fire the same visit tag in the same session
    if (!shouldFireVisitTag(tag)) return;

    // Fire and forget. We don't block render or surface errors — visit
    // tagging is best-effort.
    fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        first_name: getVisitorFirstName() ?? undefined,
        tag_name: tag,
      }),
    })
      .then(() => markVisitTagFired(tag))
      .catch(() => {
        // ignore — visit tags are best-effort
      });
  }, [tag]);

  return null;
}
