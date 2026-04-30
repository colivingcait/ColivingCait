import { cn } from "@/lib/cn";

// Page section wrapper. Drives background color (the brand alternates
// charcoal / cream / blush / gold) and standard vertical rhythm.
type Tone = "cream" | "charcoal" | "blush" | "gold";

const tones: Record<Tone, string> = {
  cream: "bg-cream text-charcoal",
  charcoal: "bg-charcoal text-cream",
  blush: "bg-blush text-charcoal",
  gold: "bg-gold text-white",
};

type SectionProps = {
  tone?: Tone;
  /** Remove the inner max-width container (e.g. for full-bleed strips). */
  fullBleed?: boolean;
  /** Tighten vertical padding for narrow strips like the stats bar. */
  compact?: boolean;
  id?: string;
  className?: string;
  children: React.ReactNode;
};

export default function Section({
  tone = "cream",
  fullBleed = false,
  compact = false,
  id,
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        tones[tone],
        compact ? "py-8 md:py-12" : "py-16 md:py-24",
        className,
      )}
    >
      {fullBleed ? (
        children
      ) : (
        <div className="mx-auto w-full max-w-6xl px-6 md:px-10">{children}</div>
      )}
    </section>
  );
}
