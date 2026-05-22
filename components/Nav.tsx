"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

// Primary site navigation — frosted glass, transparent → solid on scroll.
// Mirrors Section 7 of the playbook v2 + the HTML design files exactly.
const links = [
  { href: "/about", label: "About" },
  { href: "/what-is-coliving", label: "What Is Coliving" },
  { href: "/learn", label: "Learn With Me" },
  { href: "/partner-with-me", label: "Partner" },
  { href: "/buy-and-sell", label: "Buy & Sell" },
  { href: "/community", label: "Community" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/hello") return null;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[100] px-8 lg:px-[60px] transition-all duration-500 ease-brand border-b",
        scrolled
          ? "bg-white/95 [backdrop-filter:blur(24px)] [-webkit-backdrop-filter:blur(24px)] border-soft"
          : "bg-transparent border-transparent",
      )}
    >
      <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between py-5">
        {/* Wordmark */}
        <Link
          href="/"
          aria-label="ColivingCait — home"
          className="inline-flex items-center hover:opacity-70 transition-opacity"
        >
          <Image
            src="/images/colivingcait-logo.png"
            alt="ColivingCait"
            width={200}
            height={40}
            priority
            className="h-7 w-auto"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-9 list-none">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    "relative text-[13px] tracking-[0.02em] transition-colors duration-200",
                    "after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-gold",
                    "after:transition-[width] after:duration-[350ms] after:ease-brand",
                    active
                      ? "text-charcoal font-medium after:w-full"
                      : "text-warmgray font-normal after:w-0 hover:text-charcoal hover:after:w-full",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href="/contact"
              className="bg-charcoal text-white px-7 py-3 text-[11px] font-medium uppercase tracking-[0.1em] transition-all duration-300 hover:bg-gold hover:-translate-y-px inline-block"
            >
              Book a Call
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex h-10 w-10 flex-col items-center justify-center gap-[5px] cursor-pointer"
        >
          <span className={cn("block h-[1.5px] w-6 bg-charcoal transition", open && "translate-y-[6.5px] rotate-45")} />
          <span className={cn("block h-[1.5px] w-6 bg-charcoal transition", open && "opacity-0")} />
          <span className={cn("block h-[1.5px] w-6 bg-charcoal transition", open && "-translate-y-[6.5px] -rotate-45")} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden border-t border-soft bg-white/95 [backdrop-filter:blur(24px)]">
          <nav className="flex flex-col px-2 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-[13px] tracking-[0.02em] text-charcoal hover:text-gold"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-3 bg-charcoal text-white px-7 py-3 text-[11px] font-medium uppercase tracking-[0.1em] text-center hover:bg-gold transition-colors"
            >
              Book a Call
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
