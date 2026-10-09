"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useSession } from "next-auth/react";

type BuyButtonProps = {
  courseSlug: string;
  children: React.ReactNode;
  className?: string;
};

// One checkout at a time for the whole page. Two BuyButtons can share a
// slug (course hero + footer), and React strict mode runs effects twice.
let inFlightSlug: string | null = null;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function setInFlight(slug: string | null) {
  inFlightSlug = slug;
  listeners.forEach((listener) => listener());
}

function callbackWithBuy(slug: string) {
  const url = new URL(window.location.href);
  url.searchParams.set("buy", slug);
  return `${url.pathname}${url.search}${url.hash}`;
}

function stripBuyParam() {
  const url = new URL(window.location.href);
  if (!url.searchParams.has("buy")) return;
  url.searchParams.delete("buy");
  const next = `${url.pathname}${url.search}${url.hash}`;
  window.history.replaceState(null, "", next);
}

async function startCheckout(courseSlug: string) {
  const res = await fetch("/api/stripe/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ courseSlug }),
  });
  const data = await res.json();
  if (!data.url) {
    throw new Error(data.error || "Something went wrong");
  }
  window.location.assign(data.url);
}

// Client component that handles the full purchase flow:
// 1. If not signed in → sign-in form, then return with ?buy=<slug>
// 2. If that param is present on an authenticated load → checkout once
// 3. If already signed in → create Stripe checkout session → redirect
export default function BuyButton({
  courseSlug,
  children,
  className = "",
}: BuyButtonProps) {
  const { status } = useSession();
  const pending = useSyncExternalStore(
    subscribe,
    () => inFlightSlug === courseSlug,
    () => false,
  );

  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (!event.persisted || inFlightSlug !== courseSlug) return;
      setInFlight(null);
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, [courseSlug]);

  useEffect(() => {
    if (status !== "authenticated") return;
    const buy = new URLSearchParams(window.location.search).get("buy");
    if (buy !== courseSlug) return;
    if (inFlightSlug) return;

    // Drop ?buy before the request so a failed checkout or a second
    // effect pass cannot start another session.
    stripBuyParam();
    setInFlight(courseSlug);
    startCheckout(courseSlug).catch((err) => {
      setInFlight(null);
      alert(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    });
  }, [status, courseSlug]);

  const handleClick = async () => {
    if (status === "loading" || inFlightSlug) return;

    if (status !== "authenticated") {
      const callbackUrl = callbackWithBuy(courseSlug);
      window.location.assign(
        `/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`,
      );
      return;
    }

    setInFlight(courseSlug);
    try {
      await startCheckout(courseSlug);
    } catch (err) {
      setInFlight(null);
      alert(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      className={className}
    >
      {pending ? "Loading…" : children}
    </button>
  );
}
