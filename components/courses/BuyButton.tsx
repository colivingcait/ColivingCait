"use client";

import { useState } from "react";

type BuyButtonProps = {
  courseSlug: string;
  children: React.ReactNode;
  className?: string;
};

// Client component that sends the user straight to Stripe Checkout.
// No login required — Stripe collects their email, and the webhook
// creates their account + grants access after payment.
export default function BuyButton({
  courseSlug,
  children,
  className = "",
}: BuyButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseSlug }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      alert("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <button onClick={handleClick} disabled={loading} className={className}>
      {loading ? "Loading…" : children}
    </button>
  );
}
