"use client";

import { useEffect, useState, useRef, type FormEvent } from "react";

// Exit-intent modal that surfaces the basement house-hack case study
// once per session when the user's cursor heads for the top of the
// viewport. Arms after 5 seconds, ignores touch devices, respects the
// "already submitted" flag set by CaseStudyOptInForm.
//
// Mount once per page (currently / and /learn).

const KIT_TAG = "house-hacking-case-study";
const SESSION_SHOWN_KEY = "coliving-cait:exit-intent-shown";
const SUBMITTED_KEY = "coliving-cait:case-study-submitted";
const ARM_DELAY_MS = 5000;

type Status = "idle" | "submitting" | "success" | "error";

export default function ExitIntentModal() {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Arm the exit-intent listener.
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Skip touch devices — exit intent doesn't work there.
    const isTouch =
      "ontouchstart" in window ||
      (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0);
    if (isTouch) return;

    // Already shown this session, or already submitted.
    try {
      if (sessionStorage.getItem(SESSION_SHOWN_KEY) === "1") return;
      if (localStorage.getItem(SUBMITTED_KEY) === "1") return;
    } catch {
      // Storage blocked — bail out, don't show.
      return;
    }

    let armed = false;
    const armTimer = setTimeout(() => {
      armed = true;
    }, ARM_DELAY_MS);

    const onMouseLeave = (e: MouseEvent) => {
      if (!armed) return;
      // Only trigger when the cursor crosses out the TOP of the viewport.
      // `clientY <= 0` means the pointer left through the top edge.
      if (e.clientY > 0) return;
      try {
        sessionStorage.setItem(SESSION_SHOWN_KEY, "1");
      } catch {
        /* ignore */
      }
      setOpen(true);
      document.removeEventListener("mouseleave", onMouseLeave);
    };

    document.addEventListener("mouseleave", onMouseLeave);
    return () => {
      clearTimeout(armTimer);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  // Esc-to-close + body scroll lock while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Cleanup any pending auto-close timer on unmount.
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  function close() {
    setOpen(false);
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          first_name: firstName,
          tag_name: KIT_TAG,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Submission failed");
      }
      setStatus("success");
      try {
        localStorage.setItem(SUBMITTED_KEY, "1");
      } catch {
        /* ignore */
      }
      // Auto-close after 3s on success.
      closeTimerRef.current = setTimeout(() => close(), 3000);
    } catch {
      setStatus("error");
      setError("Something went wrong — try again.");
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
      className="fixed inset-0 z-[200] flex items-center justify-center px-5 animate-[exitIntentFade_220ms_cubic-bezier(0.16,1,0.3,1)_both]"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close"
        onClick={close}
        className="absolute inset-0 bg-black/50 cursor-default"
      />

      {/* Modal */}
      <div className="relative bg-white max-w-[480px] w-full p-8 lg:p-10 shadow-[0_30px_80px_rgba(28,25,23,0.35)] animate-[exitIntentRise_240ms_cubic-bezier(0.16,1,0.3,1)_both]">
        <button
          type="button"
          aria-label="Close"
          onClick={close}
          className="absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center text-warmgray hover:text-charcoal transition-colors"
        >
          <span aria-hidden className="text-[20px] leading-none">×</span>
        </button>

        {status === "success" ? (
          <div className="text-center py-2">
            <p className="text-[28px] text-gold leading-none mb-3">✓</p>
            <p
              id="exit-intent-title"
              className="font-heading font-medium text-[22px] text-charcoal leading-tight mb-2"
            >
              Check your inbox, {firstName}!
            </p>
            <p className="text-[13px] text-warmgray">
              The case study is on its way.
            </p>
          </div>
        ) : (
          <>
            <h2
              id="exit-intent-title"
              className="font-heading font-normal tracking-[-0.01em] text-charcoal leading-[1.2] mb-3"
              style={{ fontSize: "clamp(22px, 2vw, 26px)" }}
            >
              Before you go — <em className="italic text-gold font-light">grab this.</em>
            </h2>
            <p className="text-[14px] leading-[1.7] text-warmgray mb-5">
              The full story of how I turned my basement into a $1,500/month asset. Real photos, real math, free PDF.
            </p>

            <div className="grid grid-cols-3 gap-3 border-b border-soft pb-4 mb-5">
              {[
                { num: "$300K", label: "Purchase price" },
                { num: "$12K", label: "Reno cost" },
                { num: "$1,500", label: "Monthly income" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-heading font-medium text-[18px] lg:text-[20px] text-charcoal leading-none mb-1">
                    {s.num}
                  </div>
                  <span className="block text-[10px] uppercase tracking-[0.08em] text-warmgray-light">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={status === "submitting"}
                  className="bg-cream border border-[rgba(196,149,90,0.25)] px-3.5 py-2.5 text-[13px] text-charcoal placeholder:text-warmgray-light focus:outline-none focus:border-gold transition-colors disabled:opacity-60"
                />
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "submitting"}
                  className="bg-cream border border-[rgba(196,149,90,0.25)] px-3.5 py-2.5 text-[13px] text-charcoal placeholder:text-warmgray-light focus:outline-none focus:border-gold transition-colors disabled:opacity-60"
                />
              </div>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="bg-charcoal text-white px-5 py-3 text-[11px] font-medium uppercase tracking-[0.12em] hover:bg-gold transition-colors duration-300 disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : "Send me the case study"}
              </button>
              {error && <p className="text-[11px] text-red-600">{error}</p>}
            </form>

            <p className="text-[11px] text-warmgray-light mt-3 text-center">
              Free PDF. No spam, unsubscribe anytime.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
