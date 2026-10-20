import Section from "@/components/Section";
import Eyebrow from "@/components/Eyebrow";
import Heading from "@/components/Heading";
import RentLedgerTool from "@/components/rent-ledger/RentLedgerTool";
import { DEFAULT_OG_IMAGE } from "@/lib/site";

export const metadata = {
  title: "Read Your Rent Ledger — Free PadSplit Earnings Report",
  description:
    "Drop in your PadSplit earnings export and see booking requests, stays, collections, breakage, warning signs and ramp-up for every house. Free, and your file never leaves your browser.",
  alternates: { canonical: "/tools/rent-ledger" },
  openGraph: {
    title: "Read Your Rent Ledger — Free PadSplit Earnings Report",
    description:
      "See what your PadSplit export says about breakage, warning signs and ramp-up, house by house. Your file never leaves your browser.",
    url: "/tools/rent-ledger",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function RentLedgerPage() {
  return (
    <>
      <Section tone="charcoal" className="relative grain overflow-hidden">
        <div className="max-w-3xl">
          <Eyebrow className="mb-6">Free tool · For PadSplit hosts</Eyebrow>
          <Heading level={1} size="lg" className="text-cream">
            Read your <em className="text-gold-light">rent ledger.</em>
          </Heading>
          <p className="mt-6 text-cream/90 leading-body text-[1.0625rem] max-w-2xl">
            Drop in your PadSplit earnings export and see what it says about each house: booking requests, how long
            residents stay, what you collect, what residents leave without paying, the warning signs that come first,
            and how fast new houses fill up.
          </p>
          <p className="mt-4 text-cream/70 text-sm">
            Everything is worked out in your browser. Your file, and your residents&apos; names, never leave this device.
          </p>
        </div>
      </Section>
      <Section tone="cream">
        <div className="max-w-5xl">
          <RentLedgerTool />
          <details className="mt-10 text-sm text-warmgray max-w-2xl">
            <summary className="cursor-pointer text-charcoal">Where do I find the export?</summary>
            <p className="mt-2 leading-relaxed">
              In your PadSplit host dashboard, open Earnings and download the earnings details for the date range you want.
              You&apos;ll get a zip named like <code>earning_details_2025-01-01_2026-10-20.zip</code> with four CSV files
              inside. Drop the zip as is. A longer range (a year or more) gives steadier numbers.
            </p>
          </details>
        </div>
      </Section>
    </>
  );
}
