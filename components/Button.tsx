"use client";

import Link from "next/link";
import Magnetic from "./Magnetic";
import { cn } from "@/lib/cn";

// Three button variants from the brand system. All share square corners,
// uppercase text, DM Sans 500, and 0.09em letter-spacing.
//
// Buttons get a hover gold-fill effect: a gold panel slides in from the left
// behind the label, switching the perceived background as it expands. With
// `magnetic`, the button also softly follows the cursor on hover.
type Variant = "primary" | "secondary" | "outline";
type Size = "md" | "lg";

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-xs",
  lg: "px-8 py-4 text-sm",
};

// Each variant defines its base look + the slide-in fill color
const variants: Record<
  Variant,
  { base: string; fill: string; hoverText: string }
> = {
  primary: {
    base: "bg-gold text-white",
    fill: "bg-charcoal",
    hoverText: "group-hover:text-white",
  },
  secondary: {
    base: "bg-charcoal text-white",
    fill: "bg-gold",
    hoverText: "group-hover:text-white",
  },
  outline: {
    base: "bg-transparent text-gold border border-gold",
    fill: "bg-gold",
    hoverText: "group-hover:text-white",
  },
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  /** Add a magnetic pull-toward-cursor on hover. */
  magnetic?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
  type?: never;
  onClick?: never;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonProps = ButtonAsLink | ButtonAsButton;

export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    magnetic = false,
    className,
    children,
  } = props;

  const v = variants[variant];

  // Inner markup is shared between <a>, <Link>, and <button>
  const inner = (
    <>
      {/* Sliding fill — sits behind the label, expands on hover */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 -translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0",
          v.fill,
        )}
      />
      <span className={cn("relative z-10 transition-colors duration-300", v.hoverText)}>
        {children}
      </span>
    </>
  );

  const classes = cn(
    "group relative inline-flex items-center justify-center overflow-hidden",
    "font-sans font-medium uppercase tracking-button rounded-none",
    "transition-colors duration-200",
    "disabled:opacity-50 disabled:pointer-events-none",
    sizes[size],
    v.base,
    className,
  );

  let element: React.ReactElement;

  if ("href" in props && props.href) {
    const isExternal = /^https?:\/\//.test(props.href);
    element = isExternal ? (
      <a
        href={props.href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {inner}
      </a>
    ) : (
      <Link href={props.href} className={classes}>
        {inner}
      </Link>
    );
  } else {
    const { variant: _v, size: _s, magnetic: _m, className: _c, children: _ch, ...rest } =
      props as ButtonAsButton;
    element = (
      <button className={classes} {...rest}>
        {inner}
      </button>
    );
  }

  return magnetic ? <Magnetic strength={10}>{element}</Magnetic> : element;
}
