"use client";

import Link from "next/link";
import { useState } from "react";
import Button from "./Button";
import { cn } from "@/lib/cn";

// Primary site navigation. Links match the Phase 1 page list from the
// playbook — keeps mobile-first behavior with a hamburger toggle.
const links = [
  { href: "/about", label: "About" },
  { href: "/what-is-coliving", label: "What Is Coliving" },
  { href: "/get-coaching", label: "Coaching" },
  { href: "/partner-with-me", label: "Partner" },
  { href: "/buy-and-sell", label: "Buy & Sell" },
  { href: "/community", label: "Community" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur border-b border-brand">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        {/* Wordmark — Cormorant italic for the brand feel */}
        <Link
          href="/"
          className="font-heading text-2xl tracking-tight text-charcoal"
        >
          Coliving <span className="italic text-gold">Cait</span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs font-medium uppercase tracking-button text-charcoal hover:text-gold transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Button href="/contact" variant="primary" size="md">
            Book a Discovery Call
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden h-10 w-10 inline-flex items-center justify-center text-charcoal"
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1.5">
            <span className={cn("block h-px w-6 bg-charcoal transition", open && "translate-y-1.5 rotate-45")} />
            <span className={cn("block h-px w-6 bg-charcoal transition", open && "opacity-0")} />
            <span className={cn("block h-px w-6 bg-charcoal transition", open && "-translate-y-1.5 -rotate-45")} />
          </div>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden border-t border-brand bg-cream">
          <nav className="flex flex-col px-6 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium uppercase tracking-button text-charcoal hover:text-gold"
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-4">
              <Button href="/contact" variant="primary" size="md" className="w-full">
                Book a Discovery Call
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
