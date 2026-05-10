import type { LessonSection } from "@/lib/courses/types";
import { cn } from "@/lib/cn";
import {
  Callout,
  FascinationCallout,
  KeyTakeaway,
  PadSplitCallout,
  VideoPlaceholder,
} from "./Callouts";

// Renders the array of structured lesson sections into JSX. Adds visual
// rhythm — a ✦ divider before each h2-level heading (after the first
// one) — so long lesson bodies don't read as one wall of text.
export default function LessonSections({
  sections,
}: {
  sections: LessonSection[];
}) {
  // Track whether we've seen the first heading so we only insert
  // dividers BEFORE subsequent h2s, not the first one.
  let headingsSeen = 0;

  return (
    <div className="prose-content">
      {sections.map((s, i) => {
        switch (s.type) {
          case "paragraph":
            return (
              <p
                key={i}
                className="mt-5 text-warmgray leading-body text-[16px] md:text-[17px]"
              >
                {s.content}
              </p>
            );
          case "heading": {
            headingsSeen += 1;
            return (
              <div key={i} className="mt-14">
                {headingsSeen > 1 && (
                  <div
                    aria-hidden
                    className="flex items-center gap-4 mb-10 text-gold/50"
                  >
                    <span className="h-px flex-1 bg-brand/40" />
                    <span className="text-base">✦</span>
                    <span className="h-px flex-1 bg-brand/40" />
                  </div>
                )}
                <h2 className="font-heading text-2xl md:text-3xl leading-heading text-charcoal">
                  {s.content}
                </h2>
              </div>
            );
          }
          case "subheading":
            return (
              <h3
                key={i}
                className="mt-10 font-heading text-xl md:text-2xl leading-heading text-charcoal pl-4 border-l-2 border-gold"
              >
                {s.content}
              </h3>
            );
          case "bullets":
            return (
              <ul key={i} className="mt-5 space-y-3">
                {s.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-warmgray leading-body text-[16px] md:text-[17px]"
                  >
                    <span className="text-gold mt-1">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "numbered":
            return (
              <ol key={i} className="mt-5 space-y-3 list-none">
                {s.items.map((item, idx) => (
                  <li
                    key={item}
                    className="flex gap-4 text-warmgray leading-body text-[16px] md:text-[17px]"
                  >
                    <span className="font-heading text-xl text-gold leading-none mt-0.5 tabular-nums">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="my-10 border-l-2 border-gold pl-6 font-heading italic text-2xl md:text-3xl leading-heading text-charcoal"
              >
                &ldquo;{s.content}&rdquo;
                {s.attribution && (
                  <footer className="mt-4 not-italic font-sans text-xs uppercase tracking-button text-warmgray">
                    ✦ {s.attribution}
                  </footer>
                )}
              </blockquote>
            );
          case "key-takeaway":
            return <KeyTakeaway key={i} title={s.title} body={s.body} />;
          case "fascination":
            return <FascinationCallout key={i} body={s.body} />;
          case "callout":
            return <Callout key={i} body={s.body} tone={s.tone} />;
          case "padsplit":
            return (
              <PadSplitCallout key={i} body={s.body} bullets={s.bullets} />
            );
          case "video":
            return <VideoPlaceholder key={i} />;
          case "card": {
            const toneClasses = {
              cream: "border-brand bg-cream",
              blush: "border-brand bg-blush",
              charcoal: "border-gold/40 bg-charcoal text-cream",
            }[s.tone ?? "cream"];
            const isDark = s.tone === "charcoal";
            return (
              <aside
                key={i}
                className={cn(
                  "border my-7 p-5 md:p-7",
                  toneClasses,
                )}
              >
                {s.eyebrow && (
                  <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-3">
                    ✦ {s.eyebrow}
                  </p>
                )}
                {s.title && (
                  <p
                    className={cn(
                      "font-heading text-xl md:text-2xl leading-heading",
                      isDark ? "text-cream" : "text-charcoal",
                    )}
                  >
                    {s.title}
                  </p>
                )}
                {s.paragraphs?.map((p, pi) => (
                  <p
                    key={pi}
                    className={cn(
                      "leading-body text-[15px] md:text-[16px]",
                      pi === 0 && (s.title || s.eyebrow) ? "mt-3" : "mt-3",
                      isDark ? "text-cream/85" : "text-warmgray",
                    )}
                  >
                    {p}
                  </p>
                ))}
                {s.bullets && (
                  <ul className="mt-4 space-y-2">
                    {s.bullets.map((b) => (
                      <li
                        key={b}
                        className={cn(
                          "flex gap-3 leading-body text-[15px]",
                          isDark ? "text-cream/85" : "text-warmgray",
                        )}
                      >
                        <span className="text-gold mt-1">✦</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </aside>
            );
          }
          case "divider":
            return (
              <div
                key={i}
                aria-hidden
                className="flex items-center gap-4 my-12 text-gold/50"
              >
                <span className="h-px flex-1 bg-brand/40" />
                <span className="text-base">✦</span>
                <span className="h-px flex-1 bg-brand/40" />
              </div>
            );
          case "compare": {
            const cols = s.items.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2";
            return (
              <div
                key={i}
                className={cn("my-7 grid gap-4", cols)}
              >
                {s.items.map((item, idx) => {
                  const tone = idx % 2 === 0 ? "cream" : "blush";
                  const toneClasses =
                    tone === "cream"
                      ? "border-brand bg-cream"
                      : "border-brand bg-blush";
                  return (
                    <aside
                      key={idx}
                      className={cn(
                        "border p-5 md:p-6 flex flex-col",
                        toneClasses,
                      )}
                    >
                      {item.eyebrow && (
                        <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-3">
                          ✦ {item.eyebrow}
                        </p>
                      )}
                      {item.title && (
                        <p className="font-heading text-lg md:text-xl leading-heading text-charcoal">
                          {item.title}
                        </p>
                      )}
                      {item.paragraphs?.map((p, pi) => (
                        <p
                          key={pi}
                          className={cn(
                            "leading-body text-[15px] md:text-[16px] text-warmgray",
                            pi === 0 && (item.title || item.eyebrow)
                              ? "mt-3"
                              : "mt-3",
                          )}
                        >
                          {p}
                        </p>
                      ))}
                      {item.bullets && (
                        <ul className="mt-3 space-y-2">
                          {item.bullets.map((b) => (
                            <li
                              key={b}
                              className="flex gap-3 leading-body text-[14px] md:text-[15px] text-warmgray"
                            >
                              <span className="text-gold mt-1">✦</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </aside>
                  );
                })}
              </div>
            );
          }
        }
      })}
    </div>
  );
}
