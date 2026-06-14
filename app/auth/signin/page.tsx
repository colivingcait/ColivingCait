"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// useSearchParams() opts the subtree into client-side rendering, so Next
// requires it to sit under a Suspense boundary for the static export to
// succeed. The form lives in its own component; the page wraps it.
export default function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}

function SignInForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/learn";

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await signIn("email", { email, callbackUrl, redirect: false });
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-4">
          ✦ Sign in
        </p>
        <h1 className="font-heading text-4xl md:text-5xl leading-heading text-charcoal mb-3">
          Welcome back.
        </h1>
        <p className="text-warmgray leading-body mb-10">
          Enter your email and we&apos;ll send you a magic link to sign in — no
          password needed.
        </p>

        {sent ? (
          <div className="border border-gold bg-gold/[0.06] p-6">
            <p className="font-heading text-xl text-charcoal leading-heading mb-2">
              Check your email ✦
            </p>
            <p className="text-warmgray text-sm leading-body">
              We sent a sign-in link to <strong>{email}</strong>. Click the link
              in the email to continue. Check spam if you don&apos;t see it
              within a minute.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-[10px] uppercase tracking-eyebrow text-warmgray/70 mb-2"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmit(e as any);
                }}
                placeholder="you@example.com"
                className="w-full border border-brand bg-white px-4 py-3 text-charcoal placeholder:text-warmgray/50 focus:border-gold focus:outline-none transition-colors"
                disabled={loading}
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading || !email}
              className="w-full bg-charcoal text-cream px-6 py-3 text-sm uppercase tracking-eyebrow hover:bg-charcoal/90 transition-colors disabled:opacity-50"
            >
              {loading ? "Sending…" : "Send magic link →"}
            </button>
          </div>
        )}

        <p className="mt-8 text-warmgray/60 text-sm">
          Don&apos;t have an account?{" "}
          <Link href={`/auth/signin?callbackUrl=${callbackUrl}`} className="text-gold underline">
            Same page
          </Link>{" "}
          — entering your email creates one automatically.
        </p>
      </div>
    </div>
  );
}
