"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

// Subtle magnetic hover: the wrapped element follows the cursor a bit when
// hovered, then springs home on leave. Used on primary buttons + featured
// cards to add tactile delight.
type MagneticProps = {
  /** Maximum pixels of pull. Default: 12. */
  strength?: number;
  className?: string;
  children: React.ReactNode;
};

export default function Magnetic({
  strength = 12,
  className,
  children,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    // Normalize so the pull caps at `strength` regardless of element size
    const px = (dx / (rect.width / 2)) * strength;
    const py = (dy / (rect.height / 2)) * strength;
    x.set(px);
    y.set(py);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
