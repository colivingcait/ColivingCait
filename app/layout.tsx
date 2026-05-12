import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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
  description:
    "Caitlyn Verdugo is an Atlanta-based coliving investor, Realtor, and women's coliving coach helping women build wealth through real estate.",
  icons: {
    icon: "/images/colivingcait-favicon.png",
    shortcut: "/images/colivingcait-favicon.png",
    apple: "/images/colivingcait-favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="bg-white text-warmgray">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
