import { cn } from "@/lib/cn";

// Brand card: square corners, thin gold border at 25% opacity, padded body.
// Tone controls the surface color so cards read correctly on every section bg.
type Tone = "cream" | "charcoal" | "blush" | "transparent";

const tones: Record<Tone, string> = {
  cream: "bg-cream text-charcoal",
  charcoal: "bg-charcoal text-cream",
  blush: "bg-blush text-charcoal",
  transparent: "bg-transparent",
};

type CardProps = {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
};

export default function Card({
  tone = "cream",
  className,
  children,
}: CardProps) {
  return (
    <div
      className={cn(
        "border border-brand p-8 md:p-10",
        tones[tone],
        className,
      )}
    >
      {children}
    </div>
  );
}
