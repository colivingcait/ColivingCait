"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

// Continuously-scrolling horizontal marquee. Used for the stats bar so the
// site feels alive even when the user is parked on a section.
type MarqueeProps = {
  /** Seconds for one full loop. Higher = slower. Default: 30s. */
  speed?: number;
  /** Reverse direction (right -> left becomes left -> right). */
  reverse?: boolean;
  className?: string;
  children: React.ReactNode;
};

export default function Marquee({
  speed = 30,
  reverse = false,
  className,
  children,
}: MarqueeProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="flex w-max gap-16 whitespace-nowrap"
        animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{
          ease: "linear",
          duration: speed,
          repeat: Infinity,
        }}
      >
        {/* Duplicate the content so the loop is seamless */}
        <div className="flex gap-16 items-center">{children}</div>
        <div className="flex gap-16 items-center" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
