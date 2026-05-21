"use client";

import { useState } from "react";

// Contact form for /contact — visual layout mirrors the v2 HTML 1:1.
// Posts to /api/contact (ConvertKit + email notification).

type Status = "idle" | "submitting" | "ok" | "error";

const fieldClass =
  "px-4 py-3.5 font-sans text-sm font-light text-charcoal border border-soft bg-white outline-none transition-colors duration-300 focus:border-gold placeholder:text-warmgray-light";

const TOPIC_OPTIONS = [
  { value: "general", label: "General inquiry" },
  { value: "coaching", label: "Coaching & consulting" },
  { value: "partnership", label: "Partnership & investing" },
  { value: "buy-sell", label: "Buy & sell" },
  { value: "house-hacking", label: "House hacking" },
  { value: "speaking", label: "Speaking & media" },
  { value: "wcs", label: "Women's Coliving Summit" },
  { value: "she-leads", label: "She Leads Coliving" },
  { value: "agent-referral", label: "Agent referral" },
  { value: "other", label: "Other" },
];

export default function ContactFormV2() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const data = new FormData(e.currentTarget);
    const payload = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      phone: data.get("phone"),
      topic: data.get("topic"),
      message: data.get("message"),
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus(res.ok ? "ok" : "error");
      if (res.ok) e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="reveal reveal-d2 flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="First Name">
          <input name="firstName" type="text" placeholder="First name" required className={fieldClass} />
        </Field>
        <Field label="Last Name">
          <input name="lastName" type="text" placeholder="Last name" required className={fieldClass} />
        </Field>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Email">
          <input name="email" type="email" placeholder="you@email.com" required className={fieldClass} />
        </Field>
        <Field label="Phone (optional)">
          <input name="phone" type="tel" placeholder="(000) 000-0000" className={fieldClass} />
        </Field>
      </div>
      <Field label="What can I help with?">
        <select name="topic" required className={fieldClass} defaultValue="">
          <option value="" disabled>Select one...</option>
          {TOPIC_OPTIONS.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </Field>
      <Field label="Message">
        <textarea
          name="message"
          rows={5}
          placeholder="Tell me what's on your mind..."
          required
          className={`${fieldClass} resize-y`}
        />
      </Field>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-gold w-full text-center disabled:opacity-60"
      >
        {status === "ok" ? "Sent — talk soon!" : status === "submitting" ? "Sending..." : "Send Message →"}
      </button>
      {status === "error" && (
        <p className="text-xs text-[#C07070] text-center">
          Something went wrong — please try again or email hello@colivingcait.com.
        </p>
      )}
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-warmgray">
        {label}
      </span>
      {children}
    </label>
  );
}
