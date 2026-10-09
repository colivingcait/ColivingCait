"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

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
  const { status } = useSession();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    // Session still resolving — don't treat that as logged out.
    if (status === "loading") return;

    // Logged out: show the email form. Calling signIn("email") here
    // posts /api/auth/signin/email with no address, and NextAuth
    // answers that with error=EmailSignin before any adapter or
    // mailer runs. The form collects the address, then starts the flow.
    if (status !== "authenticated") {
      const callbackUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      window.location.assign(
        `/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`,
      );
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
