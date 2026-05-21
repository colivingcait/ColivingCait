"use client";

import { useState } from "react";
import Button from "./Button";
import { cn } from "@/lib/cn";
import { rememberVisitor } from "@/lib/visitor";

// General contact form. Collects everything Caitlyn needs to triage a
// message and route it to the right follow-up.
//
// Once API keys land, /api/contact will:
//   1. Tag the subscriber in ConvertKit by dropdown selection
//   2. Send an email notification to hello@colivingcait.com
const TOPIC_OPTIONS: { value: string; label: string; tag: string }[] = [
  { value: "general", label: "General inquiry", tag: "contact-general" },
  { value: "coaching", label: "Coaching program", tag: "coaching-interested" },
  {
    value: "partnership",
    label: "Partnership & investing",
    tag: "passive-investor",
  },
  { value: "buy-sell", label: "Buy & sell", tag: "buyer-lead" },
  { value: "house-hacking", label: "House hacking", tag: "house-hacker-lead" },
  { value: "speaking", label: "Speaking & media", tag: "media-inquiry" },
  {
    value: "wcs",
    label: "Women's Coliving Summit",
    tag: "wcs-interested",
  },
  {
    value: "she-leads",
    label: "She Leads Coliving",
    tag: "she-leads-interested",
  },
  { value: "other", label: "Other", tag: "contact-other" },
];

type Status = "idle" | "submitting" | "success" | "error";

type ContactFormProps = {
  className?: string;
};

export default function ContactForm({ className }: ContactFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          topic,
          message,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");

      // Cache visitor identity for future page-visit tags
      rememberVisitor(email, firstName);

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
          "border border-brand bg-cream p-8 md:p-10 text-center",
          className,
        )}
      >
        <p className="text-3xl text-gold mb-4">✓</p>
        <p className="font-heading text-3xl leading-heading">
          Message received.
        </p>
        <p className="mt-4 text-warmgray text-sm leading-body max-w-md mx-auto">
          Thanks, {firstName}. I read every message personally and reply
          within one business day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "border border-brand bg-cream p-8 md:p-10",
        className,
      )}
    >
      <div className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="First name"
            required
            value={firstName}
            onChange={setFirstName}
            placeholder="Jane"
          />
          <Field
            label="Last name"
            required
            value={lastName}
            onChange={setLastName}
            placeholder="Doe"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Email"
            required
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="jane@example.com"
          />
          <Field
            label="Phone (optional)"
            type="tel"
            value={phone}
            onChange={setPhone}
            placeholder="(404) 555-0123"
          />
        </div>
        <SelectField
          label="What can I help with?"
          required
          value={topic}
          onChange={setTopic}
          options={TOPIC_OPTIONS.map((o) => ({
            value: o.value,
            label: o.label,
          }))}
          placeholder="Select a topic"
        />
        <TextareaField
          label="Your message"
          required
          value={message}
          onChange={setMessage}
          placeholder="Tell me a little about what you&apos;re working on or thinking through…"
          rows={6}
        />
      </div>

      {error && <p className="mt-4 text-xs text-red-500">{error}</p>}

      <div className="mt-8">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={status === "submitting"}
          className="w-full"
        >
          {status === "submitting" ? "Sending…" : "Send Message →"}
        </Button>
      </div>

      <p className="mt-4 text-xs text-warmgray/70 text-center">
        ✦ I read every message personally. No auto-responders, no chatbots.
      </p>
    </form>
  );
}

/* ---------- form primitives ---------- */

type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
};

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: FieldProps) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-eyebrow text-charcoal/70">
        {label}
        {required && <span className="text-gold ml-1">*</span>}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full border border-brand bg-white px-4 py-3 text-sm font-sans text-charcoal placeholder:text-warmgray/60 focus:outline-none focus:border-gold transition-colors"
      />
    </label>
  );
}

type SelectFieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
};

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder = "Select…",
  required,
}: SelectFieldProps) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-eyebrow text-charcoal/70">
        {label}
        {required && <span className="text-gold ml-1">*</span>}
      </span>
      <select
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border border-brand bg-white px-4 py-3 text-sm font-sans text-charcoal focus:outline-none focus:border-gold transition-colors appearance-none bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2010%206%22%20fill=%22%23C4955A%22><path%20d=%22M0%200l5%206%205-6z%22/></svg>')] bg-no-repeat bg-[right_1rem_center] pr-10"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

type TextareaFieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
};

function TextareaField({
  label,
  value,
  onChange,
  placeholder,
  required,
  rows = 5,
}: TextareaFieldProps) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-eyebrow text-charcoal/70">
        {label}
        {required && <span className="text-gold ml-1">*</span>}
      </span>
      <textarea
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="mt-2 w-full border border-brand bg-white px-4 py-3 text-sm font-sans text-charcoal placeholder:text-warmgray/60 focus:outline-none focus:border-gold transition-colors resize-y leading-body"
      />
    </label>
  );
}
