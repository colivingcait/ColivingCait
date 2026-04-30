"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

// Brand card: square corners, thin gold border at 25% opacity, padded body.
// Tone controls the surface color so cards read correctly on every section bg.
// `interactive` cards lift and brighten their border on hover for a tactile,
// editorial feel.
type Tone = "cream" | "charcoal" | "blush" | "transparent";

const tones: Record<Tone, string> = {
  cream: "bg-cream text-charcoal",
  charcoal: "bg-charcoal text-cream",
  blush: "bg-blush text-charcoal",
  transparent: "bg-transparent",
};

type CardProps = {
  tone?: Tone;
  /** Adds hover lift + gold border glow + subtle shadow. */
  interactive?: boolean;
  className?: string;
  children: React.ReactNode;
};

export default function Card({
  tone = "cream",
  interactive = false,
  className,
  children,
}: CardProps) {
  if (!interactive) {
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

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className={cn(
        "group relative border border-brand p-8 md:p-10 transition-colors duration-300",
        "hover:border-gold hover:shadow-[0_20px_60px_-20px_rgba(196,149,90,0.35)]",
        tones[tone],
        className,
      )}
    >
      {/* Inner gold accent line that scales on hover */}
      <span
        aria-hidden
        className="absolute left-0 top-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full"
      />
      {children}
    </motion.div>
  );
}
