"use client";

import { useEffect } from "react";

// Next's hash scroll can run before layout, and the fixed nav covers an
// unpadded target. Re-scroll once the bundle block is in the document.
export default function ScrollToBundle() {
  useEffect(() => {
    const scroll = () => {
      if (window.location.hash !== "#bundle") return;
      document.getElementById("bundle")?.scrollIntoView({ block: "start" });
    };
    // Run after Next's own hash/scroll effect, which can leave the page at the top.
    const timer = window.setTimeout(scroll, 0);
    window.addEventListener("hashchange", scroll);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", scroll);
    };
  }, []);

  return null;
}
