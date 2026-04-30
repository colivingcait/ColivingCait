import Link from "next/link";
import { cn } from "@/lib/cn";

// Three button variants from the brand system. All share square corners,
// uppercase text, DM Sans 500, and 0.09em letter-spacing.
type Variant = "primary" | "secondary" | "outline";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center font-sans font-medium uppercase tracking-button rounded-none transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none";

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-xs",
  lg: "px-8 py-4 text-sm",
};

const variants: Record<Variant, string> = {
  // Gold background, white text — primary CTA
  primary: "bg-gold text-white hover:bg-gold-dark",
  // Charcoal background, white text
  secondary: "bg-charcoal text-white hover:bg-black",
  // Transparent with gold border + gold text
  outline:
    "border border-gold text-gold bg-transparent hover:bg-gold hover:text-white",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
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
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, sizes[size], variants[variant], className);

  // If `href` is supplied, render an anchor (Next Link for internal routes).
  if ("href" in props && props.href) {
    const isExternal = /^https?:\/\//.test(props.href);
    if (isExternal) {
      return (
        <a
          href={props.href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  // Otherwise behave as a real <button>
  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } =
    props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
