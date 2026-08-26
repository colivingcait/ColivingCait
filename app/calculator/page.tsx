import Section from "@/components/Section";
import Eyebrow from "@/components/Eyebrow";
import Heading from "@/components/Heading";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import Link from "next/link";

export const metadata = {
  title: "Free Real Estate Calculators — Coliving, House Hacking & DSCR",
  description:
    "Three free calculators for investors running the numbers on a deal. Coliving conversions, house hacking, and DSCR loans — pencil it before you offer.",
  alternates: { canonical: "/calculator" },
  openGraph: {
    title: "Free Real Estate Calculators — Coliving, House Hacking & DSCR",
    description:
      "Three free calculators for investors running the numbers on a deal. Coliving conversions, house hacking, and DSCR loans — pencil it before you offer.",
    url: "/calculator",
  },
};

type Calc = {
  symbol: string;
  label: string;
  title: string;
  body: string;
  href: string;
  status: "available" | "coming-soon";
};

const calculators: Calc[] = [
  {
    symbol: "◈",
    label: "Calculator 01",
    title: "Coliving Conversion",
    body: "Address the property, walk through the layout, and see what it could earn as a coliving home — gross revenue, expenses, cashflow, cash-on-cash, and 5-year wealth projection.",
    href: "/calculator/coliving",
    status: "available",
  },
  {
    symbol: "▦",
    label: "Calculator 02",
    title: "Pro Forma",
    body: "A fully-editable rental pro forma — toggle every number from rent and vacancy to platform fee, utilities, maintenance, CapEx, and financing. Cap rate, cash-on-cash, and monthly cash flow update live as you type.",
    href: "/calculator/pro-forma",
    status: "available",
  },
  {
    symbol: "$",
    label: "Calculator 03",
    title: "DSCR Loan",
    body: "Plug in projected rent, mortgage, taxes, and insurance — see whether a property qualifies for a DSCR loan and what the ratio looks like.",
    href: "/calculator/dscr",
    status: "coming-soon",
  },
];

// Calculator hub — three cards routing to each calculator. Two of three
// are placeholders awaiting future build phases.
export default function CalculatorHubPage() {
  return (
    <>
      <Section tone="charcoal" className="relative grain overflow-hidden">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <Eyebrow className="mb-6">The calculators</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading level={1} size="display" className="text-cream">
              Pencil it before you{" "}
              <em className="text-gold-light">offer.</em>
            </Heading>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-8 text-cream/75 leading-body text-[1.0625rem] max-w-2xl mx-auto">
              Three free calculators built around the actual numbers I run
              for my own deals. Project revenue, model expenses, see the
              cashflow — and the verdict — in five minutes.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section tone="cream">
        <Stagger
          className="grid gap-6 md:grid-cols-3 items-stretch"
          stagger={0.1}
        >
          {calculators.map((c) => (
            <StaggerItem key={c.title}>
              <CalculatorCard calc={c} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  );
}

function CalculatorCard({ calc }: { calc: Calc }) {
  const isAvailable = calc.status === "available";

  const inner = (
    <div
      className={`group relative h-full flex flex-col border p-8 md:p-10 transition-all duration-300 ${
        isAvailable
          ? "border-brand bg-cream hover:border-gold hover:shadow-[0_20px_60px_-20px_rgba(196,149,90,0.35)] hover:-translate-y-1.5"
          : "border-brand bg-cream/60 opacity-75"
      }`}
    >
      {isAvailable && (
        <span
          aria-hidden
          className="absolute left-0 top-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full"
        />
      )}

      <p className="text-3xl text-gold mb-5">{calc.symbol}</p>
      <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-3">
        {calc.label}
      </p>
      <Heading level={3} size="sm">
        {calc.title}
      </Heading>
      <p className="mt-3 text-warmgray text-sm leading-body flex-1">
        {calc.body}
      </p>

      <p className="mt-6 text-xs uppercase tracking-button">
        {isAvailable ? (
          <span className="text-gold link-underline inline-block">
            Run the numbers →
          </span>
        ) : (
          <span className="text-warmgray/60">Coming soon</span>
        )}
      </p>
    </div>
  );

  if (!isAvailable) return inner;

  return (
    <Link href={calc.href} className="block h-full">
      {inner}
    </Link>
  );
}
