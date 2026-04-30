import { cn } from "@/lib/cn";

// Testimonial card used on Homepage, About, Coaching, Buy & Sell, etc.
// Pulls from Zillow reviews — 5-star rating shown as gold sparkles.
type TestimonialCardProps = {
  quote: string;
  /** Reviewer name */
  author: string;
  /** Optional descriptor like "Buyer · Decatur, GA" */
  context?: string;
  /** 1–5; renders that many gold sparkles. Default: 5. */
  rating?: number;
  /** Source label like "Zillow Review". */
  source?: string;
  /** Visual tone — match to the section it sits on. */
  tone?: "cream" | "charcoal";
  className?: string;
};

export default function TestimonialCard({
  quote,
  author,
  context,
  rating = 5,
  source = "Zillow Review",
  tone = "cream",
  className,
}: TestimonialCardProps) {
  const onDark = tone === "charcoal";

  return (
    <article
      className={cn(
        "relative border p-8 md:p-10 h-full flex flex-col",
        onDark
          ? "border-gold/30 bg-charcoal text-cream"
          : "border-brand bg-cream text-charcoal",
        className,
      )}
    >
      {/* Star rating */}
      <div className="flex gap-1 text-gold text-sm">
        {Array.from({ length: rating }).map((_, i) => (
          <span key={i} aria-hidden>
            ✦
          </span>
        ))}
        <span className="sr-only">{rating} out of 5 stars</span>
      </div>

      {/* Quote */}
      <p
        className={cn(
          "mt-6 font-heading text-xl md:text-2xl leading-heading flex-1",
          onDark ? "text-cream" : "text-charcoal",
        )}
      >
        &ldquo;{quote}&rdquo;
      </p>

      {/* Author */}
      <div className="mt-6 pt-6 border-t border-brand">
        <p
          className={cn(
            "font-sans font-medium text-sm",
            onDark ? "text-cream" : "text-charcoal",
          )}
        >
          {author}
        </p>
        {context && (
          <p
            className={cn(
              "mt-1 text-xs",
              onDark ? "text-cream/60" : "text-warmgray",
            )}
          >
            {context}
          </p>
        )}
        <p className="mt-2 text-[10px] uppercase tracking-eyebrow text-gold">
          {source}
        </p>
      </div>
    </article>
  );
}
