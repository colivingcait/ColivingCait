"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/cn";

// Element that drifts vertically as the page scrolls. Used for hero photos
// and feature imagery to add depth without feeling gimmicky.
type ParallaxProps = {
  /** Total pixels of drift over the element's scroll range. Default: 80. */
  distance?: number;
  className?: string;
  children: React.ReactNode;
};

export default function Parallax({
  distance = 80,
  className,
  children,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
