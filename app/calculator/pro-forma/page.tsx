import Section from "@/components/Section";
import Eyebrow from "@/components/Eyebrow";
import Heading from "@/components/Heading";
import Reveal from "@/components/Reveal";
import ProFormaCalculator from "@/components/calculator/ProFormaCalculator";

export const metadata = {
  title: "Pro Forma Calculator — Coliving Cait",
  description:
    "A fully-editable rental pro forma. Toggle every number — gross rent, vacancy, platform fee, utilities, maintenance, CapEx, and financing — and watch cap rate, cash-on-cash, and monthly cash flow update live.",
};

// Pro Forma Calculator — page wrapper. The calculator is a client component
// with no email gate; everything updates live as you edit. The hero sets
// context as a server-rendered intro.
export default function ProFormaCalculatorPage() {
  return (
    <>
      <Section tone="charcoal" compact className="relative grain overflow-hidden">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow className="mb-3">The Pro Forma Calculator</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading level={1} size="sm" className="text-cream">
              Every number is{" "}
              <em className="text-gold-light">yours to set.</em>
            </Heading>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-3 text-cream/70 leading-body text-sm max-w-xl">
              No locked assumptions, no preloaded figures — enter your own
              numbers and the pro forma recalculates as you type.
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
