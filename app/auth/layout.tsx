import type { Metadata } from "next";

// Sign-in and magic-link screens carry no search value and should never
// appear in results, so the whole /auth subtree is marked noindex.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
