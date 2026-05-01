import Section from "@/components/Section";
import Eyebrow from "@/components/Eyebrow";
import Heading from "@/components/Heading";
import Reveal from "@/components/Reveal";
import ColivingCalculator from "@/components/calculator/ColivingCalculator";

export const metadata = {
  title: "Coliving Conversion Calculator — Coliving Cait",
  description:
    "See what any property could earn as a coliving home. Six-step underwriting wizard with real numbers — gross revenue, expenses, cashflow, cash-on-cash, and 5-year wealth projection.",
};

// Coliving Conversion Calculator — page wrapper. The wizard itself is a
// client component. Hero is a server-rendered intro to set context.
export default function ColivingCalculatorPage() {
  return (
    <>
      <Section tone="charcoal" className="relative grain overflow-hidden">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <Eyebrow className="mb-6">The Coliving Calculator</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading level={1} size="display" className="text-cream">
              Run the <em className="text-gold-light">numbers.</em>
            </Heading>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-8 text-cream/75 leading-body text-[1.0625rem]">
              Six steps. Five minutes. The same underwriting model I run on
              my own deals — adapted into a tool that walks you straight
              from address to verdict.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section tone="cream" fullBleed>
        <ColivingCalculator />
      </Section>
    </>
  );
}
