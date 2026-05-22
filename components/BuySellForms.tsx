"use client";

import { useState } from "react";

// Side-by-side buyer + seller forms for /buy-and-sell. Posts to the
// existing /api/buyer-inquiry route (buyer) and /api/contact (seller,
// tagged seller-lead via topic). Visual layout mirrors the v2 HTML 1:1.

type Status = "idle" | "submitting" | "ok" | "error";

const fieldClass =
  "px-4 py-3.5 font-sans text-sm font-light text-charcoal border border-soft bg-white outline-none transition-colors duration-300 focus:border-gold placeholder:text-warmgray-light";

const labelClass =
  "text-[11px] font-medium uppercase tracking-[0.1em] text-warmgray";

export default function BuySellForms() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <BuyerForm />
      <SellerForm />
    </div>
  );
}

function BuyerForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const data = new FormData(e.currentTarget);
    const payload = {
      name: `${data.get("firstName")} ${data.get("lastName")}`.trim(),
      email: data.get("email"),
      phone: data.get("phone"),
      lookingFor: data.get("lookingFor"),
      priceRange: data.get("priceRange"),
      message: data.get("message"),
    };
    try {
      const res = await fetch("/api/buyer-inquiry", {
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
    <form
      onSubmit={onSubmit}
      className="reveal reveal-d1 bg-white p-12 lg:px-10 border border-soft"
    >
      <h3 className="font-heading font-medium text-2xl text-charcoal mb-2">
        I&apos;m Looking to Buy
      </h3>
      <p className="text-sm text-warmgray mb-7">
        Share a few details and I&apos;ll reach out to start the conversation.
      </p>
      <div className="flex flex-col gap-3.5">
        <div className="grid grid-cols-2 gap-3.5">
          <Field label="First Name">
            <input name="firstName" type="text" placeholder="First name" required className={fieldClass} />
          </Field>
          <Field label="Last Name">
            <input name="lastName" type="text" placeholder="Last name" required className={fieldClass} />
          </Field>
        </div>
        <Field label="Email">
          <input name="email" type="email" placeholder="you@email.com" required className={fieldClass} />
        </Field>
        <Field label="Phone">
          <input name="phone" type="tel" placeholder="(000) 000-0000" required className={fieldClass} />
        </Field>
        <Field label="What are you looking for?">
          <select name="lookingFor" required className={fieldClass} defaultValue="">
            <option value="" disabled>Select one...</option>
            <option>House hacking</option>
            <option>Coliving conversion</option>
            <option>Occupied coliving property</option>
            <option>Investment property</option>
            <option>Primary residence</option>
            <option>Not sure yet</option>
          </select>
        </Field>
        <Field label="Price Range">
          <select name="priceRange" required className={fieldClass} defaultValue="">
            <option value="" disabled>Select a range...</option>
            <option>Under $200K</option>
            <option>$200K – $300K</option>
            <option>$300K – $400K</option>
            <option>$400K – $500K</option>
            <option>$500K+</option>
          </select>
        </Field>
        <Field label="Anything else?">
          <textarea name="message" rows={2} placeholder="Timeline, must-haves, questions..." className={`${fieldClass} resize-y`} />
        </Field>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-gold w-full text-center mt-1 disabled:opacity-60"
        >
          {status === "ok" ? "Sent — talk soon!" : status === "submitting" ? "Sending..." : "Submit →"}
        </button>
        {status === "error" && (
          <p className="text-xs text-[#C07070] text-center">Something went wrong — please try again or email hello@colivingcait.com.</p>
        )}
      </div>
    </form>
  );
}

function SellerForm() {
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
      topic: "buy-sell",
      message: `Seller inquiry. Property: ${data.get("address")}. Considering: ${data.get("considering")}. Notes: ${data.get("message") ?? ""}`,
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
    <form
      onSubmit={onSubmit}
      className="reveal reveal-d2 bg-white p-12 lg:px-10 border border-soft"
    >
      <h3 className="font-heading font-medium text-2xl text-charcoal mb-2">
        I&apos;m Thinking About Selling
      </h3>
      <p className="text-sm text-warmgray mb-7">
        Tell me about your property and I&apos;ll reach out to discuss your options.
      </p>
      <div className="flex flex-col gap-3.5">
        <div className="grid grid-cols-2 gap-3.5">
          <Field label="First Name">
            <input name="firstName" type="text" placeholder="First name" required className={fieldClass} />
          </Field>
          <Field label="Last Name">
            <input name="lastName" type="text" placeholder="Last name" required className={fieldClass} />
          </Field>
        </div>
        <Field label="Email">
          <input name="email" type="email" placeholder="you@email.com" required className={fieldClass} />
        </Field>
        <Field label="Phone">
          <input name="phone" type="tel" placeholder="(000) 000-0000" required className={fieldClass} />
        </Field>
        <Field label="Property Address">
          <input name="address" type="text" placeholder="Street address, city, state, zip" required className={fieldClass} />
        </Field>
        <Field label="What are you considering?">
          <select name="considering" required className={fieldClass} defaultValue="">
            <option value="" disabled>Select one...</option>
            <option>Sell on the open market</option>
            <option>Explore leasing for coliving arbitrage</option>
            <option>Property management referral</option>
            <option>Not sure yet</option>
          </select>
        </Field>
        <Field label="Anything else?">
          <textarea name="message" rows={2} placeholder="Timeline, property details, questions..." className={`${fieldClass} resize-y`} />
        </Field>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-gold w-full text-center mt-1 disabled:opacity-60"
        >
          {status === "ok" ? "Sent — talk soon!" : status === "submitting" ? "Sending..." : "Submit →"}
        </button>
        {status === "error" && (
          <p className="text-xs text-[#C07070] text-center">Something went wrong — please try again or email hello@colivingcait.com.</p>
        )}
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className={labelClass}>{label}</span>
      {children}
    </label>
  );
}
