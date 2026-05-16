"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";

type BuyButtonProps = {
  courseSlug: string;
  children: React.ReactNode;
  className?: string;
};

// Client component that handles the full purchase flow:
// 1. If not signed in → redirect to sign in
// 2. If signed in → create Stripe checkout session → redirect to Stripe
export default function BuyButton({
  courseSlug,
  children,
  className = "",
}: BuyButtonProps) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    // Not signed in — redirect to sign in, then back to this page
    if (status !== "authenticated") {
      signIn("email", {
        callbackUrl: window.location.href,
      });
      return;
    }

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
