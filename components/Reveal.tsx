"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";

// Editorial easing — a gentle ease-out that feels like a magazine page turning.
// Avoids the bouncy "spring" feel we don't want for this brand.
const EASE = [0.22, 1, 0.36, 1] as const;

type Direction = "up" | "down" | "left" | "right" | "none";

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 32 },
  down: { x: 0, y: -32 },
  left: { x: 32, y: 0 },
  right: { x: -32, y: 0 },
  none: { x: 0, y: 0 },
};

type RevealProps = {
  /** Direction the element travels FROM. Default: "up" (slides up into place). */
  direction?: Direction;
  /** Delay before this element starts animating, in seconds. */
  delay?: number;
  /** Animation duration, in seconds. Default: 0.7s. */
  duration?: number;
  /** Once true, the element only animates the first time it enters the viewport. */
  once?: boolean;
  /** Optional element override — defaults to <div>. */
  as?: "div" | "section" | "article" | "li" | "ul" | "header" | "footer";
  className?: string;
  children: React.ReactNode;
};

// Scroll-triggered reveal: fades + slides into place when it enters the viewport.
// Respects prefers-reduced-motion for accessibility.
export default function Reveal({
  direction = "up",
  delay = 0,
  duration = 0.7,
  once = true,
  as = "div",
  className,
  children,
}: RevealProps) {
  const reduced = useReducedMotion();
  const offset = offsets[direction];

  const variants: Variants = {
    hidden: reduced
      ? { opacity: 1, x: 0, y: 0 }
      : { opacity: 0, x: offset.x, y: offset.y },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, delay, ease: EASE },
    },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2 }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

// Container that staggers child <Reveal>s. Useful for grids of cards or lists
// where you want the items to cascade in instead of arriving together.
type StaggerProps = {
  /** Seconds between each child entering. Default: 0.08s. */
  stagger?: number;
  /** Initial delay before the first child fires. */
  delay?: number;
  once?: boolean;
  as?: "div" | "ul" | "section";
  className?: string;
  children: React.ReactNode;
};

export function Stagger({
  stagger = 0.08,
  delay = 0,
  once = true,
  as = "div",
  className,
  children,
}: StaggerProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduced ? 0 : stagger,
        delayChildren: delay,
      },
    },
  };

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.15 }}
      variants={containerVariants}
    >
      {children}
    </MotionTag>
  );
}

// A child that participates in a Stagger parent. Slides up + fades in.
type StaggerItemProps = {
  className?: string;
  as?: "div" | "li" | "article";
  children: React.ReactNode;
};

export function StaggerItem({
  className,
  as = "div",
  children,
}: StaggerItemProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  const itemVariants: Variants = {
    hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE },
    },
  };

  return (
    <MotionTag className={cn(className)} variants={itemVariants}>
      {children}
    </MotionTag>
  );
}
