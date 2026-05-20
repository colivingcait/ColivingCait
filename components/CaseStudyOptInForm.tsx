"use client";

import { useState, type FormEvent } from "react";

export default function CaseStudyOptInForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire up to ConvertKit (or similar) — POST `email` to the
    // form/sequence that delivers the basement-house-hack case study PDF.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-cream border border-gold/40 px-5 py-5 text-center">
        <p className="font-heading font-medium text-[20px] text-charcoal leading-tight mb-1">
          Check your inbox!
        </p>
        <p className="text-[13px] text-warmgray">
          Your case study is on its way.
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
        className="flex-1 bg-cream border border-[rgba(196,149,90,0.25)] px-4 py-3.5 text-[14px] text-charcoal placeholder:text-warmgray-light focus:outline-none focus:border-gold transition-colors"
      />
      <button
        type="submit"
        className="bg-charcoal text-white px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.12em] whitespace-nowrap hover:bg-gold transition-colors duration-300"
      >
        Get the free case study
      </button>
    </form>
  );
}
