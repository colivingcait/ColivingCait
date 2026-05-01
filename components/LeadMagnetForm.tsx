"use client";

import { useState } from "react";
import Button from "./Button";
import { cn } from "@/lib/cn";
import { rememberVisitor } from "@/lib/visitor";

// Reusable inline lead-magnet capture. Used on the homepage for the Coliving
// Starter Guide and on multiple other pages for their respective magnets.
// Submission currently posts to a placeholder API route; once ConvertKit
// keys are wired in, the route will tag the subscriber with `tag` and trigger
// the matching email sequence.
type LeadMagnetFormProps = {
  /** Eyebrow label above the heading */
  eyebrow?: string;
  /** Section heading — pass <em>...</em> for gold italic emphasis */
  heading: React.ReactNode;
  /** Supporting paragraph */
  body?: string;
  /** Button label after submit (e.g. "Send Me the Guide") */
  cta?: string;
  /** ConvertKit tag to apply on submission */
  tag: string;
  /** Optional dark variant for use on charcoal/blush sections */
  tone?: "light" | "dark";
  className?: string;
};

export default function LeadMagnetForm({
  eyebrow,
  heading,
  body,
  cta = "Send It To Me",
  tag,
  tone = "light",
  className,
}: LeadMagnetFormProps) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const onLight = tone === "light";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      // Posts to the unified /api/subscribe endpoint which calls
      // ConvertKit (or no-ops in dev when no API key is set).
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          first_name: firstName || undefined,
          tag_name: tag,
        }),
      });

      if (!res.ok) throw new Error("Submission failed");

      // Cache the visitor identity for future page-visit tags
      rememberVisitor(email, firstName || undefined);

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div
        className={cn(
          "border p-8 md:p-10 text-center",
          onLight ? "border-brand bg-cream" : "border-gold/40 bg-charcoal text-cream",
          className,
        )}
      >
        <p className="text-3xl text-gold mb-4">✓</p>
        <p className="font-heading text-2xl md:text-3xl leading-heading">
          Check your inbox.
        </p>
        <p
          className={cn(
            "mt-4 text-sm leading-body",
            onLight ? "text-warmgray" : "text-cream/70",
          )}
        >
          Your guide is on its way to <strong>{email}</strong>.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "border p-8 md:p-10",
        onLight ? "border-brand bg-cream" : "border-gold/40 bg-charcoal text-cream",
        className,
      )}
    >
      {eyebrow && (
        <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-4">
          {eyebrow}
        </p>
      )}
      <h3 className="font-heading text-3xl md:text-4xl leading-heading">
        {heading}
      </h3>
      {body && (
        <p
          className={cn(
            "mt-4 max-w-lg leading-body",
            onLight ? "text-warmgray" : "text-cream/70",
          )}
        >
          {body}
        </p>
      )}

      <div className="mt-8 grid gap-4 md:grid-cols-[1fr_1fr_auto]">
        <input
          type="text"
          required
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className={cn(
            "border px-4 py-3 text-sm font-sans focus:outline-none focus:border-gold transition-colors",
            onLight
              ? "border-brand bg-white text-charcoal placeholder:text-warmgray/60"
              : "border-cream/30 bg-charcoal text-cream placeholder:text-cream/40",
          )}
        />
        <input
          type="email"
          required
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={cn(
            "border px-4 py-3 text-sm font-sans focus:outline-none focus:border-gold transition-colors",
            onLight
              ? "border-brand bg-white text-charcoal placeholder:text-warmgray/60"
              : "border-cream/30 bg-charcoal text-cream placeholder:text-cream/40",
          )}
        />
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={status === "submitting"}
          className="whitespace-nowrap"
        >
          {status === "submitting" ? "Sending…" : cta}
        </Button>
      </div>

      {error && <p className="mt-4 text-xs text-red-500">{error}</p>}

      <p
        className={cn(
          "mt-4 text-xs",
          onLight ? "text-warmgray/70" : "text-cream/50",
        )}
      >
        No spam — ever. Unsubscribe with one click.
      </p>
    </form>
  );
}
