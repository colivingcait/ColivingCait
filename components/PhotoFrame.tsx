import Image from "next/image";
import { cn } from "@/lib/cn";

// Editorial photo frame: holds an image (or placeholder) inside a thin
// gold-cornered frame. The four L-shaped brackets are absolutely positioned
// so they don't depend on the image loading.
type PhotoFrameProps = {
  /** Path under /public, e.g. "/images/caitlyn-staircase.jpg". Optional —
   *  if omitted, the frame renders as a styled placeholder. */
  src?: string;
  alt: string;
  /** Aspect ratio class. Default 4:5. */
  aspect?: string;
  /** Caption rendered as a small italic label inside the placeholder state. */
  placeholderLabel?: string;
  /** Image priority loading (use for above-the-fold images). */
  priority?: boolean;
  /** Tailwind sizes hint for next/image. */
  sizes?: string;
  className?: string;
};

export default function PhotoFrame({
  src,
  alt,
  aspect = "aspect-[4/5]",
  placeholderLabel = "photo placeholder",
  priority = false,
  sizes = "(min-width: 768px) 50vw, 100vw",
  className,
}: PhotoFrameProps) {
  return (
    <div className={cn("relative", aspect, className)}>
      {/* Image (or placeholder block) */}
      <div className="relative h-full w-full overflow-hidden border border-brand bg-blush">
        {src ? (
          <>
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              sizes={sizes}
              className="object-cover"
            />
            {/* Soft bottom gradient blends photo into page */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-charcoal/10 via-transparent to-transparent"
            />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-warmgray">
            <span className="font-heading italic text-xl md:text-2xl text-center px-6">
              {placeholderLabel}
            </span>
          </div>
        )}
      </div>

      {/* Gold L-shaped corner brackets — editorial frame detail */}
      <Corner position="top-left" />
      <Corner position="top-right" />
      <Corner position="bottom-left" />
      <Corner position="bottom-right" />
    </div>
  );
}

type CornerProps = {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
};

function Corner({ position }: CornerProps) {
  // Each bracket is two thin gold lines forming an L. The bracket sits just
  // outside the photo edge so it reads as a printed registration mark.
  const baseLine = "absolute bg-gold";
  const positions: Record<
    CornerProps["position"],
    { h: string; v: string }
  > = {
    "top-left": {
      h: "-top-px -left-px h-px w-6",
      v: "-top-px -left-px h-6 w-px",
    },
    "top-right": {
      h: "-top-px -right-px h-px w-6",
      v: "-top-px -right-px h-6 w-px",
    },
    "bottom-left": {
      h: "-bottom-px -left-px h-px w-6",
      v: "-bottom-px -left-px h-6 w-px",
    },
    "bottom-right": {
      h: "-bottom-px -right-px h-px w-6",
      v: "-bottom-px -right-px h-6 w-px",
    },
  };

  const { h, v } = positions[position];

  return (
    <>
      <span aria-hidden className={cn(baseLine, h)} />
      <span aria-hidden className={cn(baseLine, v)} />
    </>
  );
}
