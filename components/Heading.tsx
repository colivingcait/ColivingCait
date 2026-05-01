import { cn } from "@/lib/cn";

// Cormorant Garamond display heading. Italic <em> children render in gold
// automatically via the global stylesheet — pass emphasis words wrapped in
// <em> to get the brand's signature gold-italic treatment.
type Level = 1 | 2 | 3 | 4;
type Size = "display" | "xl" | "lg" | "md" | "sm";

// `display` uses clamp so it fluidly grows with the viewport — gives the
// editorial / magazine cover feel without media-query stairsteps.
const sizes: Record<Size, string> = {
  display: "text-[clamp(3.25rem,11vw,11rem)] tracking-[-0.02em]",
  xl: "text-5xl md:text-7xl",
  lg: "text-4xl md:text-6xl",
  md: "text-3xl md:text-5xl",
  sm: "text-2xl md:text-4xl",
};

type HeadingProps = {
  level?: Level;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export default function Heading({
  level = 2,
  size = "lg",
  className,
  children,
}: HeadingProps) {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4";
  return (
    <Tag
      className={cn(
        "font-heading font-medium leading-heading",
        sizes[size],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
