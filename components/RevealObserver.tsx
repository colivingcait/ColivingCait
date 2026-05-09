"use client";

import { useEffect } from "react";

// Adds `.visible` to every `.reveal` element when it scrolls into the
// viewport — mirrors the IntersectionObserver pattern from the v2 HTML
// design files. Keeps page markup close to the original CSS so we can
// drop reveal classes anywhere without wrapping each block.
export default function RevealObserver() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal:not(.visible)");
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
