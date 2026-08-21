"use client";

import { useState } from "react";
import { rememberVisitor } from "@/lib/visitor";

// Shared "just an email" capture form — the newsletter/lead-magnet blocks
// on the homepage and a few other pages all used this exact markup, but
// none of them actually submitted anywhere (no onSubmit handler at all).
// This wires them to the same unified /api/subscribe endpoint the richer
// LeadMagnetForm uses, tagged per call site.
type NewsletterCaptureFormProps = {
  tag: string;
  buttonLabel: string;
};

export default function NewsletterCaptureForm({ tag, buttonLabel }: NewsletterCaptureFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tag_name: tag }),
      });
      if (!res.ok) throw new Error("Submission failed");
      rememberVisitor(email);
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return <p className="text-[15px] text-warmgray max-w-[520px] mx-auto">✓ Check your inbox — thank you!</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-[520px] mx-auto">
      <input
        type="email"
        placeholder="Your email address"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-5 py-4 font-sans text-sm font-light text-charcoal border border-soft sm:border-r-0 bg-white outline-none transition-colors duration-300 focus:border-gold placeholder:text-warmgray-light"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="px-8 py-4 bg-charcoal text-white font-sans text-[11px] font-medium uppercase tracking-[0.1em] border-none cursor-pointer whitespace-nowrap transition-colors duration-300 hover:bg-gold"
      >
        {status === "submitting" ? "Sending…" : buttonLabel}
      </button>
      {status === "error" && (
        <p className="mt-3 text-xs text-red-500 basis-full">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
