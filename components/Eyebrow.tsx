import { cn } from "@/lib/cn";

// Small uppercase gold label that sits above section headings.
// Spec: 9–10px, letter-spacing 0.18em, uppercase, gold.
type EyebrowProps = {
  className?: string;
  children: React.ReactNode;
};

export default function Eyebrow({ className, children }: EyebrowProps) {
  return (
    <span
      className={cn(
        "block text-[10px] font-medium uppercase text-gold",
        "tracking-eyebrow",
        className,
      )}
    >
      {children}
    </span>
  );
}
