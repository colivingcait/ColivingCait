"use client";

import { useState, type FormEvent } from "react";

// Inline opt-in for the basement house-hack case study PDF. Posts to the
// shared /api/subscribe route which tags the subscriber in Kit and
// triggers the matching email sequence. The `community` tag is NOT
// added here — Kit's automation applies it after the 5-email sequence
// finishes.
const KIT_TAG = "house-hacking-case-study";

export default function CaseStudyOptInForm() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

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
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error && err.message
          ? "Something went wrong — try again."
          : "Something went wrong — try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="bg-cream border border-gold/40 px-5 py-5 text-center">
        <p className="text-[22px] text-gold leading-none mb-2">✓</p>
        <p className="font-heading font-medium text-[20px] text-charcoal leading-tight mb-1">
          Check your inbox, {firstName}!
        </p>
        <p className="text-[13px] text-warmgray">
          The case study is on its way.
        </p>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          type="text"
          required
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          disabled={submitting}
          className="bg-cream border border-[rgba(196,149,90,0.25)] px-3.5 py-2.5 text-[13px] text-charcoal placeholder:text-warmgray-light focus:outline-none focus:border-gold transition-colors disabled:opacity-60"
        />
        <input
          type="email"
          required
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={submitting}
          className="bg-cream border border-[rgba(196,149,90,0.25)] px-3.5 py-2.5 text-[13px] text-charcoal placeholder:text-warmgray-light focus:outline-none focus:border-gold transition-colors disabled:opacity-60"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="bg-charcoal text-white px-5 py-3 text-[11px] font-medium uppercase tracking-[0.12em] hover:bg-gold transition-colors duration-300 disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Get the Free Case Study"}
      </button>
      {error && (
        <p className="text-[11px] text-red-600">{error}</p>
      )}
    </form>
  );
}
