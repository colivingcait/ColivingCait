"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function AuthNav() {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  if (status === "loading") return null;

  if (!session) {
    return (
      <Link
        href="/auth/signin"
        className="text-[13px] tracking-[0.02em] text-warmgray hover:text-charcoal transition-colors"
      >
        Sign In
      </Link>
    );
  }

  const initials = session.user?.email
    ? session.user.email.substring(0, 2).toUpperCase()
    : "CC";

  return (
    <div className="relative">
      <button
        onClick={() => setMenuOpen((v) => !v)}
        className="flex items-center gap-2 text-[13px] tracking-[0.02em] text-warmgray hover:text-charcoal transition-colors cursor-pointer"
      >
        <span className="inline-flex items-center justify-center w-7 h-7 bg-gold/20 text-charcoal text-[10px] font-medium tracking-wider">
          {initials}
        </span>
        <span className="hidden sm:inline">My Account</span>
      </button>

      {menuOpen && (
        <>
          {/* Backdrop to close menu */}
          <div
            className="fixed inset-0 z-[199]"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 z-[200] w-48 bg-white border border-soft shadow-sm py-1">
            <Link
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2.5 text-[13px] text-charcoal hover:bg-cream/50 transition-colors"
            >
              My Courses
            </Link>
            <button
              onClick={() => {
                setMenuOpen(false);
                signOut({ callbackUrl: "/" });
              }}
              className="block w-full text-left px-4 py-2.5 text-[13px] text-warmgray hover:bg-cream/50 transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
