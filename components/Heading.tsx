import { cn } from "@/lib/cn";

// Cormorant Garamond display heading. Italic <em> children render in gold
// automatically via the global stylesheet — pass emphasis words wrapped in
// <em> to get the brand's signature gold-italic treatment.
type Level = 1 | 2 | 3 | 4;
type Size = "xl" | "lg" | "md" | "sm";

const sizes: Record<Size, string> = {
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
