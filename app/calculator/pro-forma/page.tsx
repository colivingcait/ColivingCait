import Section from "@/components/Section";
import Eyebrow from "@/components/Eyebrow";
import Heading from "@/components/Heading";
import Reveal from "@/components/Reveal";
import ProFormaCalculator from "@/components/calculator/ProFormaCalculator";

export const metadata = {
  title: "Rental Property Pro Forma Calculator",
  description:
    "A fully-editable rental pro forma. Toggle every number — gross rent, vacancy, platform fee, utilities, maintenance, CapEx, and financing — and watch cap rate, cash-on-cash, and monthly cash flow update live.",
  alternates: { canonical: "/calculator/pro-forma" },
  openGraph: {
    title: "Rental Property Pro Forma Calculator",
    description:
      "A fully-editable rental pro forma. Toggle every number — gross rent, vacancy, platform fee, utilities, maintenance, CapEx, and financing — and watch cap rate, cash-on-cash, and monthly cash flow update live.",
    url: "/calculator/pro-forma",
  },
};

// Pro Forma Calculator — page wrapper. The calculator is a client component
// with no email gate; everything updates live as you edit. The hero sets
// context as a server-rendered intro.
export default function ProFormaCalculatorPage() {
  return (
    <>
      <Section tone="charcoal" className="relative grain overflow-hidden">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <Eyebrow className="mb-6">The Pro Forma Calculator</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading level={1} size="display" className="text-cream">
              Every number is{" "}
              <em className="text-gold-light">yours to set.</em>
            </Heading>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-8 text-cream/75 leading-body text-[1.0625rem]">
              No locked assumptions, no preloaded figures. Enter your own
              numbers for everything — rent, vacancy, platform fee, utilities,
              maintenance, CapEx, taxes, and financing — and the pro forma
              recalculates as you type, the way the Zillow mortgage calculator
              does.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section tone="cream" fullBleed>
        <ProFormaCalculator />
      </Section>
    </>
  );
}
