"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

// Modal overlay that loads Calendly inline so the visitor never leaves /hello.
// Self-contained: backdrop, panel, ESC + outside-click close, body scroll lock,
// and reduced-motion fallback.

type Props = { open: boolean; onClose: () => void };

const CALENDLY_URL =
  "https://calendly.com/colivingcait/discovery?hide_gdpr_banner=1&primary_color=c4955a";

export default function CalendlyModal({ open, onClose }: Props) {
  const reduced = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const ease = [0.16, 1, 0.3, 1] as const;
  const panelMotion = reduced
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, scale: 0.96, y: 8 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.96, y: 8 },
      };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease }}
          onClick={onClose}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-charcoal/85 backdrop-blur-md p-3 sm:p-6"
        >
          <motion.div
            {...panelMotion}
            transition={{ duration: 0.45, ease }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Book a discovery call with Caitlyn"
            className="relative w-full max-w-4xl h-[90vh] sm:h-[82vh] bg-charcoal border border-gold/30 shadow-2xl shadow-gold/20 overflow-hidden"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/80 text-gold-light backdrop-blur-sm border border-gold/30 hover:bg-gold hover:text-charcoal hover:border-gold transition-all duration-300"
            >
              <svg
                aria-hidden
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="h-4 w-4"
              >
                <path d="M5 5l10 10M15 5L5 15" />
              </svg>
            </button>

            <iframe
              src={CALENDLY_URL}
              title="Schedule a discovery call"
              className="w-full h-full border-0 bg-white"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
