import {
  ZILLOW_PROFILE_URL,
  ZILLOW_RATING,
  ZILLOW_REVIEW_COUNT,
  zillowTestimonials,
} from "@/lib/testimonials";

/** "5.0 from 18 Zillow reviews" — the profile is the source of the quotes. */
export function ZillowRatingLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={ZILLOW_PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`hover:text-charcoal transition-colors duration-300 ${className}`}
    >
      <span className="text-gold tracking-[2px]">★★★★★</span>
      {`\u00a0\u00a0${ZILLOW_RATING} from ${ZILLOW_REVIEW_COUNT} Zillow reviews`}
    </a>
  );
}

/** Two-column review grid in the same card style as the rest of the site. */
export function ZillowReviewGrid({ cardClassName }: { cardClassName: string }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {zillowTestimonials.map((t, i) => (
        <article
          key={t.author}
          className={`reveal reveal-d${(i % 6) + 1} ${cardClassName}`}
        >
          <span className="block text-gold text-xs tracking-[3px] mb-4" aria-hidden>
            ★★★★★
          </span>
          <p className="text-[14.5px] leading-[1.75] text-warmgray italic mb-5">
            &ldquo;{t.quote}&rdquo;
          </p>
          <span className="block text-[13px] font-medium text-charcoal">{t.author}</span>
          <span className="block text-[11px] text-warmgray-light tracking-[0.06em]">
            {t.role}
          </span>
        </article>
      ))}
    </div>
  );
}
