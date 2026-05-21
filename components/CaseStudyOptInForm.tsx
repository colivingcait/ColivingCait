"use client";

import { useState, type FormEvent } from "react";

// Inline opt-in for the basement house-hack case study PDF. Posts to the
// shared /api/subscribe route which tags the subscriber in Kit and
// triggers the matching email sequence. Tag must exist in Kit and be
// wired to a sequence that sends the actual PDF.
const KIT_TAG = "house-hacking-playbook-downloaded";

export default function CaseStudyOptInForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tag_name: KIT_TAG }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Submission failed");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-cream border border-gold/40 px-5 py-5 text-center">
        <p className="font-heading font-medium text-[20px] text-charcoal leading-tight mb-1">
          Check your inbox!
        </p>
        <p className="text-[13px] text-warmgray">
          Your case study is on its way to <strong>{email}</strong>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        required
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === "submitting"}
        className="flex-1 bg-cream border border-[rgba(196,149,90,0.25)] px-3.5 py-2.5 text-[13px] text-charcoal placeholder:text-warmgray-light focus:outline-none focus:border-gold transition-colors disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-charcoal text-white px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.12em] whitespace-nowrap hover:bg-gold transition-colors duration-300 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Get the free case study"}
      </button>
      {error && (
        <p className="sm:hidden text-[11px] text-red-600 mt-1">{error}</p>
      )}
      {error && (
        <p className="hidden sm:block sm:basis-full text-[11px] text-red-600">
          {error}
        </p>
      )}
    </form>
  );
}
