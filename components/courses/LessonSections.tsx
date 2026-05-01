import type { LessonSection } from "@/lib/courses/types";
import {
  Callout,
  FascinationCallout,
  KeyTakeaway,
  PadSplitCallout,
  VideoPlaceholder,
} from "./Callouts";

// Renders the array of structured lesson sections into JSX. Keeps the
// data layer pure (no JSX in course data files).
export default function LessonSections({
  sections,
}: {
  sections: LessonSection[];
}) {
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
          case "heading":
            return (
              <h2
                key={i}
                className="mt-12 font-heading text-2xl md:text-3xl leading-heading text-charcoal"
              >
                {s.content}
              </h2>
            );
          case "subheading":
            return (
              <h3
                key={i}
                className="mt-8 font-heading text-xl md:text-2xl leading-heading text-charcoal"
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
        }
      })}
    </div>
  );
}
