import { cn } from "@/lib/cn";

// KeyTakeaway — high-priority "remember this" callout. Used 1–3 times
// per lesson for the things students absolutely must walk away with.
type KeyTakeawayProps = {
  title: string;
  body: string;
  className?: string;
};

export function KeyTakeaway({ title, body, className }: KeyTakeawayProps) {
  return (
    <aside
      className={cn(
        "border border-brand bg-cream p-6 md:p-8 my-8 relative",
        className,
      )}
    >
      <span aria-hidden className="absolute left-0 top-0 h-full w-1 bg-gold" />
      <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-3">
        ✦ Key takeaway
      </p>
      <p className="font-heading text-xl md:text-2xl leading-heading text-charcoal">
        {title}
      </p>
      <p className="mt-3 text-warmgray leading-body text-[15px]">{body}</p>
    </aside>
  );
}

// FascinationCallout — gold-bordered "did you know" style box. Used to
// surface surprising, lesson-specific facts.
type FascinationProps = {
  body: string;
  className?: string;
};

export function FascinationCallout({ body, className }: FascinationProps) {
  return (
    <aside
      className={cn(
        "border border-gold bg-gradient-to-br from-gold/[0.08] via-cream to-cream p-6 md:p-8 my-8",
        className,
      )}
    >
      <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-3">
        ✦ Did you know
      </p>
      <p className="font-heading text-lg md:text-xl leading-heading italic text-charcoal">
        {body}
      </p>
    </aside>
  );
}

// Generic colored callout box — cream / blush / gold tones. Used for
// CTA-style content blocks within a lesson (e.g. "want help? book a call").
type CalloutProps = {
  body: string;
  tone?: "cream" | "blush" | "gold";
  className?: string;
};

export function Callout({
  body,
  tone = "cream",
  className,
}: CalloutProps) {
  const tones = {
    cream: "border-brand bg-cream text-charcoal",
    blush: "border-brand bg-blush text-charcoal",
    gold: "border-gold bg-gold/[0.08] text-charcoal",
  };
  return (
    <aside
      className={cn(
        "border p-5 md:p-6 my-6 leading-body text-[15px]",
        tones[tone],
        className,
      )}
    >
      {body}
    </aside>
  );
}

// PadSplit referral block. Reused across courses, lead magnets, and
// the coaching hub per the playbook's PadSplit placement plan.
const PADSPLIT_REFERRAL_URL =
  "https://www.padsplit.com/hosts?referral=CDDD2DE3&ref_source=link&ref_device=desktop&ref_role=host";

type PadSplitCalloutProps = {
  body: string;
  bullets?: string[];
};

export function PadSplitCallout({ body, bullets }: PadSplitCalloutProps) {
  return (
    <aside className="border border-gold/40 bg-charcoal text-cream p-6 md:p-8 my-8">
      <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-3">
        ✦ PadSplit · Recommended host platform
      </p>
      <p className="text-cream/85 leading-body text-[15px]">{body}</p>
      {bullets && (
        <ul className="mt-5 space-y-2">
          {bullets.map((b) => (
            <li key={b} className="flex gap-3 text-cream/85 text-sm">
              <span className="text-gold">✦</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
      <a
        href={PADSPLIT_REFERRAL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block text-xs uppercase tracking-button text-gold link-underline"
      >
        Create your free PadSplit host account →
      </a>
      <p className="mt-3 text-[11px] text-cream/40 italic">
        Affiliate link — only recommend things I actually use.
      </p>
    </aside>
  );
}

// VideoPlaceholder — Vimeo embed slot. Renders a placeholder block with
// a play icon until the lesson video is recorded and the embed code
// dropped in. Once recordings exist, swap to a real <iframe> via prop.
type VideoPlaceholderProps = {
  embedUrl?: string;
  title?: string;
};

export function VideoPlaceholder({
  embedUrl,
  title = "Lesson video",
}: VideoPlaceholderProps) {
  if (embedUrl) {
    return (
      <div className="aspect-video w-full bg-charcoal my-8">
        <iframe
          src={embedUrl}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full bg-charcoal text-cream my-8 flex items-center justify-center border border-gold/30 overflow-hidden">
      <span className="absolute top-4 left-4 text-[10px] uppercase tracking-eyebrow text-gold">
        Lesson video · Coming soon
      </span>
      <div className="flex flex-col items-center">
        <span
          aria-hidden
          className="w-16 h-16 border border-gold rounded-full flex items-center justify-center"
        >
          <span className="text-gold text-2xl translate-x-0.5">▶</span>
        </span>
        <p className="mt-4 font-heading italic text-cream/60 text-lg">
          Video lesson placeholder
        </p>
        <p className="mt-1 text-xs text-cream/40">
          ✦ Vimeo embed will live here
        </p>
      </div>
    </div>
  );
}

// WorksheetDownload — at the end of every lesson, download the PDF.
type WorksheetDownloadProps = {
  title: string;
  href: string;
};

export function WorksheetDownload({ title, href }: WorksheetDownloadProps) {
  return (
    <aside className="border border-brand bg-blush p-6 md:p-8 my-8">
      <div className="flex items-start gap-4 flex-wrap md:flex-nowrap">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-3">
            ✦ Worksheet
          </p>
          <p className="font-heading text-xl md:text-2xl leading-heading">
            {title}
          </p>
          <p className="mt-2 text-warmgray text-sm leading-body">
            Download the companion PDF to put this lesson into practice.
          </p>
        </div>
        <a
          href={href}
          download
          className="inline-flex items-center justify-center px-6 py-3 text-xs font-medium uppercase tracking-button bg-charcoal text-cream hover:bg-gold transition-colors whitespace-nowrap"
        >
          Download PDF →
        </a>
      </div>
    </aside>
  );
}
