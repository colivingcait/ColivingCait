"use client";

import { useState } from "react";
import Button from "./Button";
import { cn } from "@/lib/cn";
import { rememberVisitor } from "@/lib/visitor";

// Buyer / investor inquiry form for the Buy & Sell page. Collects enough
// for Caitlyn to qualify a buyer in 30 seconds. Once Zapier credentials
// are configured, the API route will fan out to:
//   1. Follow Up Boss (CRM) for the lead
//   2. ConvertKit with tag `buyer-lead` for the email sequence
//
// Until then it just logs to the server console so we can verify wiring
// end-to-end.
const LOOKING_FOR_OPTIONS = [
  "House hack (live in + rent out)",
  "Coliving conversion",
  "Traditional rental investment",
  "Primary residence",
  "Not sure yet",
] as const;

const PRICE_RANGES = [
  "Under $250K",
  "$250K – $400K",
  "$400K – $600K",
  "$600K – $800K",
  "$800K+",
  "Open / not sure yet",
] as const;

type Status = "idle" | "submitting" | "success" | "error";

type BuyerInquiryFormProps = {
  className?: string;
};

export default function BuyerInquiryForm({ className }: BuyerInquiryFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch("/api/buyer-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          lookingFor,
          priceRange,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");

      // Cache visitor identity (best-effort first-name split)
      rememberVisitor(email, name?.split(/\s+/)[0]);

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
          Got it — talk soon.
        </p>
        <p className="mt-4 text-warmgray text-sm leading-body">
          I&apos;ll personally reach out within one business day to set up a
          time to talk through what you&apos;re looking for.
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
      <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-4">
        Buyer Inquiry
      </p>
      <h3 className="font-heading text-3xl md:text-4xl leading-heading">
        Tell me what you&apos;re <em>looking for.</em>
      </h3>
      <p className="mt-3 text-warmgray text-sm leading-body">
        I&apos;ll get back to you within one business day.
      </p>

      <div className="mt-8 grid gap-4">
        <Field
          label="Full name"
          required
          value={name}
          onChange={setName}
          type="text"
          placeholder="Jane Doe"
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Email"
            required
            value={email}
            onChange={setEmail}
            type="email"
            placeholder="jane@example.com"
          />
          <Field
            label="Phone"
            required
            value={phone}
            onChange={setPhone}
            type="tel"
            placeholder="(404) 555-0123"
          />
        </div>
        <SelectField
          label="What are you looking for?"
          required
          value={lookingFor}
          onChange={setLookingFor}
          options={[...LOOKING_FOR_OPTIONS]}
          placeholder="Select an option"
        />
        <SelectField
          label="Price range"
          required
          value={priceRange}
          onChange={setPriceRange}
          options={[...PRICE_RANGES]}
          placeholder="Select a range"
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
          {status === "submitting" ? "Sending…" : "Send Inquiry →"}
        </Button>
      </div>

      <p className="mt-4 text-xs text-warmgray/70 text-center">
        ✦ No spam. Your information is never shared.
      </p>
    </form>
  );
}

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
  options: string[];
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
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}
