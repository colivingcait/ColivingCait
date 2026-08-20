import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { bio, nap, sameAs } from "@/lib/entity";

// Brand fonts loaded once at the root and exposed via CSS variables so they
// can be referenced by Tailwind's font-heading / font-sans utilities.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Coliving Cait — Building wealth through intentional coliving",
  description: bio.short,
  icons: {
    icon: "/images/colivingcait-favicon.png",
    shortcut: "/images/colivingcait-favicon.png",
    apple: "/images/colivingcait-favicon.png",
  },
};

// Person schema — the machine-readable statement that every profile in
// `sameAs` is the same person. Keep in sync with lib/entity.ts.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: nap.name,
  jobTitle: nap.title,
  description: bio.short,
  email: `mailto:${nap.email}`,
  telephone: nap.phone,
  url: nap.primaryWeb,
  address: {
    "@type": "PostalAddress",
    streetAddress: nap.address,
  },
  worksFor: {
    "@type": "RealEstateAgent",
    name: nap.brokerage,
  },
  sameAs,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="bg-white text-warmgray">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <AuthProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
