"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, Children } from "react";
import { cn } from "@/lib/cn";

// Pinned section: holds a sticky headline while a stack of cards or copy
// blocks slides past it. The card stack receives one item per child node.
// The right-side stack progresses through its items as you scroll the
// section's full height — feels like a feature reveal without a library.
type PinnedRevealProps = {
  /** The sticky headline / left-side content. */
  headline: React.ReactNode;
  /** One reveal block per child node — 3 to 5 works best. */
  children: React.ReactNode;
  className?: string;
};

export default function PinnedReveal({
  headline,
  children,
  className,
}: PinnedRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const items = Children.toArray(children);

  return (
    <div
      ref={ref}
      className={cn("relative", className)}
      // Section is taller than viewport so the sticky element stays pinned.
      style={{ height: `${items.length * 80}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-2 md:px-10">
          {/* Left: pinned headline */}
          <div className="md:pr-8">{headline}</div>

          {/* Right: stacked items revealed as we scroll */}
          <div className="relative">
            {items.map((child, i) => {
              const start = i / items.length;
              const end = (i + 1) / items.length;
              return (
                <Item
                  key={i}
                  scrollYProgress={scrollYProgress}
                  start={start}
                  end={end}
                >
                  {child}
                </Item>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

type ItemProps = {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
  children: React.ReactNode;
};

// Each child fades and slides up as we cross its segment of the scroll range,
// then holds in place. The next item then takes over.
function Item({ scrollYProgress, start, end, children }: ItemProps) {
  const segment = end - start;
  const opacity = useTransform(
    scrollYProgress,
    [start, start + segment * 0.3, end - segment * 0.1, end],
    [0, 1, 1, 0.3],
  );
  const y = useTransform(
    scrollYProgress,
    [start, start + segment * 0.4],
    [40, 0],
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex items-center"
    >
      {children}
    </motion.div>
  );
}
