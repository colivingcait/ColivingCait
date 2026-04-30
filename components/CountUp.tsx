"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useEffect, useRef } from "react";

// Animated number that counts up when it scrolls into view.
// Used for stat blocks (AUM, rooms, residents).
type CountUpProps = {
  /** Target number to animate to. */
  to: number;
  /** Where to start counting from. Default: 0. */
  from?: number;
  /** Animation duration in seconds. Default: 1.6s. */
  duration?: number;
  /** Optional decimal places (e.g. 1 for "2.5"). */
  decimals?: number;
  /** Optional prefix like "$". */
  prefix?: string;
  /** Optional suffix like "M" or "+". */
  suffix?: string;
  className?: string;
};

export default function CountUp({
  to,
  from = 0,
  duration = 1.6,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const motionValue = useMotionValue(from);
  const display = useTransform(motionValue, (latest: number) => {
    const fixed = latest.toFixed(decimals);
    return `${prefix}${fixed}${suffix}`;
  });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, motionValue, to, duration]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}
