import { cn } from "@/lib/cn";

// Editorial section index — prints something like "01 / The Vision" with
// a thin gold rule. Sits at the top of major sections to give the page a
// magazine-feature pacing instead of a brochure feel.
type SectionIndexProps = {
  /** Two-digit section number, e.g. "01". */
  number: string;
  /** Short label after the slash, e.g. "The Vision". */
  label: string;
  /** Light or dark variant — pick to match section background. */
  tone?: "light" | "dark";
  className?: string;
};

export default function SectionIndex({
  number,
  label,
  tone = "light",
  className,
}: SectionIndexProps) {
  const onLight = tone === "light";

  return (
    <div
      className={cn(
        "flex items-center gap-4 text-[10px] uppercase tracking-eyebrow font-medium",
        onLight ? "text-charcoal/60" : "text-cream/60",
        className,
      )}
    >
      <span className="text-gold">{number}</span>
      <span
        aria-hidden
        className={cn(
          "h-px flex-1 max-w-[3rem]",
          onLight ? "bg-charcoal/20" : "bg-cream/20",
        )}
      />
      <span>{label}</span>
    </div>
  );
}
