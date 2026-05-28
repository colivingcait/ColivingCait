"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import CalendlyModal from "@/components/CalendlyModal";

// /chip — destination of the QR on Caitlyn's poker chips.
// Act 1: yellow chip tumbles in from above, lands face-up center.
// Act 2: a beat of "You're in." with the chip glowing.
// Act 3: chip ignites into a gold firework burst.
// Act 4: same celebratory welcome flow as /hello — eyebrow, headline,
//        sub, and the three equal-weight option buttons.

type Phase = "tumble" | "rest" | "ignite" | "welcome";

const PHASE_TIMES = {
  tumble: 2400, // chip falls and lands
  rest: 900, // pause showing the chip
  ignite: 700, // burst + chip fades
};

const BURST = Array.from({ length: 36 }).map((_, i) => {
  const angle = (i / 36) * Math.PI * 2;
  const distance = 220 + ((i * 53) % 180);
  return {
    id: i,
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    size: 3 + (i % 4),
    delay: (i % 6) * 0.03,
  };
});

const TWINKLES = Array.from({ length: 32 }).map((_, i) => ({
  id: i,
  left: (i * 67 + 13) % 100,
  top: (i * 41 + 7) % 100,
  size: 2 + (i % 3),
  delay: (i % 10) * 0.25,
  duration: 1.6 + (i % 5) * 0.4,
}));

const RIBBONS = Array.from({ length: 18 }).map((_, i) => ({
  id: i,
  left: (i * 47 + 9) % 100,
  rotate: -45 + ((i * 31) % 90),
  delay: (i % 8) * 0.18,
  duration: 4 + (i % 5) * 0.6,
  color: i % 3 === 0 ? "#E8D5B5" : i % 3 === 1 ? "#C4955A" : "#FAF7F2",
  width: 2,
  height: 10 + (i % 4) * 4,
}));

export default function ChipPage() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("tumble");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [diveOpen, setDiveOpen] = useState(false);

  useEffect(() => {
    if (reduced) {
      setPhase("welcome");
      return;
    }
    const t1 = setTimeout(() => setPhase("rest"), PHASE_TIMES.tumble);
    const t2 = setTimeout(
      () => setPhase("ignite"),
      PHASE_TIMES.tumble + PHASE_TIMES.rest,
    );
    const t3 = setTimeout(
      () => setPhase("welcome"),
      PHASE_TIMES.tumble + PHASE_TIMES.rest + PHASE_TIMES.ignite,
    );
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [reduced]);

  const ease = [0.16, 1, 0.3, 1] as const;
  const showChip = phase === "tumble" || phase === "rest" || phase === "ignite";
  const showWelcome = phase === "welcome";
  const showBurst = phase === "ignite" || phase === "welcome";

  return (
    <div className="fixed inset-0 bg-charcoal text-white overflow-hidden">
      {/* ===== ACT 1–3: CHIP ===== */}
      <AnimatePresence>
        {showChip && (
          <motion.div
            key="chip"
            className="absolute left-1/2 top-1/2 pointer-events-none"
            style={{
              width: 280,
              height: 280,
              marginLeft: -140,
              marginTop: -140,
              perspective: 1400,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="relative w-full h-full"
              style={{ transformStyle: "preserve-3d" }}
              initial={{ y: -800, rotateX: 0, scale: 0.5, opacity: 0 }}
              animate={
                phase === "tumble"
                  ? { y: 0, rotateX: 2160, scale: 1, opacity: 1 }
                  : phase === "rest"
                    ? { y: [0, -10, 0], rotateX: 2160, scale: 1, opacity: 1 }
                    : { y: 0, rotateX: 2160, scale: 1.7, opacity: 0 }
              }
              transition={
                phase === "tumble"
                  ? { duration: 2.4, ease: [0.34, 1.2, 0.32, 1] }
                  : phase === "rest"
                    ? { duration: 0.9, ease: "easeInOut" }
                    : { duration: 0.7, ease }
              }
            >
              <ChipFace face="front" />
              <ChipFace face="back" />
            </motion.div>

            {/* Chip glow */}
            <AnimatePresence>
              {(phase === "rest" || phase === "ignite") && (
                <motion.div
                  aria-hidden
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1.4 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease }}
                  className="absolute inset-0 -z-10 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(245,208,52,0.55) 0%, rgba(196,149,90,0.25) 35%, transparent 70%)",
                    filter: "blur(30px)",
                  }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* "You're in." — appears while chip rests */}
      <AnimatePresence>
        {phase === "rest" && (
          <motion.div
            key="rest-text"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            className="absolute left-1/2 top-[calc(50%+170px)] -translate-x-1/2 text-center pointer-events-none"
          >
            <span className="font-heading italic text-gold text-2xl sm:text-3xl">
              You&apos;re in.
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== ACT 3+: FIREWORK BURST (ignite onward) ===== */}
      {!reduced && showBurst && (
        <div className="pointer-events-none absolute left-1/2 top-1/2">
          {BURST.map((p) => (
            <motion.span
              key={p.id}
              aria-hidden
              className="absolute rounded-full bg-gold-light"
              style={{
                left: 0,
                top: 0,
                width: p.size,
                height: p.size,
                boxShadow: "0 0 12px rgba(232,213,181,0.9), 0 0 4px #fff",
              }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={{
                x: [0, p.x * 0.7, p.x],
                y: [0, p.y * 0.7, p.y + 120],
                opacity: [0, 1, 0],
                scale: [0, 1.2, 0.4],
              }}
              transition={{ duration: 1.6, ease, delay: p.delay }}
            />
          ))}
        </div>
      )}

      {/* ===== ACT 4: WELCOME ===== */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="absolute inset-0"
          >
            {/* Spotlight bloom */}
            <motion.div
              aria-hidden
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.4, ease }}
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: "min(120vmin, 1100px)",
                height: "min(120vmin, 1100px)",
                background:
                  "radial-gradient(circle, rgba(196,149,90,0.45) 0%, rgba(196,149,90,0.18) 28%, rgba(196,149,90,0.05) 52%, transparent 72%)",
                filter: "blur(28px)",
              }}
            />

            {/* Confetti ribbons */}
            {!reduced &&
              RIBBONS.map((r) => (
                <motion.span
                  key={r.id}
                  aria-hidden
                  className="pointer-events-none absolute"
                  style={{
                    left: `${r.left}%`,
                    top: -20,
                    width: r.width,
                    height: r.height,
                    background: r.color,
                    boxShadow: `0 0 8px ${r.color}80`,
                  }}
                  initial={{ y: -40, rotate: r.rotate, opacity: 0 }}
                  animate={{
                    y: ["-5vh", "110vh"],
                    rotate: [r.rotate, r.rotate + 360, r.rotate + 720],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: r.duration,
                    delay: r.delay,
                    repeat: Infinity,
                    repeatDelay: 6,
                    ease: "easeIn",
                  }}
                />
              ))}

            {/* Twinkling stars */}
            {!reduced &&
              TWINKLES.map((t) => (
                <motion.span
                  key={t.id}
                  aria-hidden
                  className="pointer-events-none absolute rounded-full bg-white"
                  style={{
                    left: `${t.left}%`,
                    top: `${t.top}%`,
                    width: t.size,
                    height: t.size,
                    boxShadow:
                      "0 0 6px rgba(255,255,255,0.9), 0 0 12px rgba(232,213,181,0.5)",
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0] }}
                  transition={{
                    duration: t.duration,
                    delay: t.delay,
                    repeat: Infinity,
                    repeatDelay: 1 + (t.id % 4),
                    ease: "easeInOut",
                  }}
                />
              ))}

            {/* Vignette */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
              }}
            />

            {/* Content */}
            <div className="relative z-10 flex h-full w-full flex-col items-center justify-center overflow-y-auto px-6 py-12 text-center">
              {/* Mini chip silhouette */}
              <motion.span
                aria-hidden
                initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.9, ease, delay: 0.2 }}
                className="mb-7 inline-flex h-8 w-8 items-center justify-center rounded-full"
                style={{
                  background: "radial-gradient(circle, #F5D034 60%, #C9A815 100%)",
                  boxShadow:
                    "0 0 16px rgba(245,208,52,0.55), inset 0 0 8px rgba(0,0,0,0.15)",
                }}
              >
                <span className="text-charcoal text-xs">✦</span>
              </motion.span>

              {/* Eyebrow */}
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.4 }}
                className="mb-7 text-[11px] font-medium uppercase tracking-[0.32em] text-gold-light"
                style={{ textShadow: "0 0 16px rgba(232,213,181,0.4)" }}
              >
                You picked up a chip
              </motion.span>

              {/* Headline */}
              <h1
                className="font-heading font-light text-white leading-[1.05] tracking-[-0.02em]"
                style={{
                  fontSize: "clamp(56px, 12vw, 132px)",
                  textShadow: "0 0 40px rgba(196,149,90,0.25)",
                }}
              >
                {["Welcome", "to", "the", "table."].map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 30, scale: 0.7, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.9, ease, delay: 0.6 + i * 0.15 }}
                    className={`inline-block mr-[0.25em] ${i === 3 ? "italic" : ""}`}
                    style={i === 3 ? { color: "#C4955A" } : undefined}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              {/* Underline */}
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, ease, delay: 1.5 }}
                className="mt-9 block h-px w-24 origin-center bg-gold"
                style={{ boxShadow: "0 0 12px rgba(196,149,90,0.7)" }}
              />

              {/* Sub */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 1.7 }}
                className="mt-9 max-w-[480px] text-[15px] leading-[1.85] text-warmgray-light"
              >
                Your chip is worth a{" "}
                <span className="text-gold-light">free 45-minute strategy
                session</span>{" "}
                with me. Bring your questions, your deals, your goals —
                we&apos;ll map your next move.
              </motion.p>

              {/* Offering detail */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease, delay: 1.85 }}
                className="mt-4 text-[10px] uppercase tracking-[0.32em] text-warmgray-light/70"
              >
                45 minutes · Free · One-on-one with Caitlyn
              </motion.span>

              {/* Three equal options */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 2.0 }}
                className="mt-11 grid w-full max-w-[760px] grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4"
              >
                <button
                  type="button"
                  onClick={() => setBookingOpen(true)}
                  className="group relative inline-flex items-center justify-center gap-3 border border-gold/40 bg-transparent px-6 py-[18px] text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-all duration-500 hover:border-gold hover:bg-gold hover:text-charcoal hover:shadow-[0_16px_40px_rgba(196,149,90,0.45)]"
                >
                  Claim Your Session
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setDiveOpen((v) => !v)}
                  aria-expanded={diveOpen}
                  aria-controls="chip-dive-options"
                  className="group relative inline-flex items-center justify-center gap-3 border border-gold/40 bg-transparent px-6 py-[18px] text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-all duration-500 hover:border-gold hover:bg-gold hover:text-charcoal hover:shadow-[0_16px_40px_rgba(196,149,90,0.45)]"
                >
                  Dive Deeper
                  <span
                    aria-hidden
                    className={`transition-transform duration-300 ${diveOpen ? "rotate-180" : ""}`}
                  >
                    ↓
                  </span>
                </button>

                <a
                  href="/caitlyn-verdugo.vcf"
                  download="caitlyn-verdugo.vcf"
                  className="group relative inline-flex items-center justify-center gap-3 border border-gold/40 bg-transparent px-6 py-[18px] text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-all duration-500 hover:border-gold hover:bg-gold hover:text-charcoal hover:shadow-[0_16px_40px_rgba(196,149,90,0.45)]"
                >
                  Save My Contact
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-y-0.5">
                    ↓
                  </span>
                </a>
              </motion.div>

              <AnimatePresence initial={false}>
                {diveOpen && (
                  <motion.ul
                    id="chip-dive-options"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease }}
                    className="mt-6 flex w-full max-w-[760px] flex-col items-center gap-3"
                  >
                    {[
                      { label: "All things coliving", href: "/courses/coliving-101" },
                      { label: "House hacking handbook", href: "/courses/house-hacking-101" },
                      { label: "Real estate roadmap", href: "/courses/real-estate-101" },
                    ].map((opt, i) => (
                      <motion.li
                        key={opt.href}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease, delay: 0.05 + i * 0.08 }}
                      >
                        <Link
                          href={opt.href}
                          className="group inline-flex items-center gap-2 text-[12px] tracking-[0.06em] text-warmgray-light hover:text-gold-light transition-colors duration-300"
                        >
                          <span aria-hidden className="text-gold/60">·</span>
                          {opt.label}
                          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CalendlyModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        url="https://calendly.com/colivingcait/strategy-session-chip"
        label="Claim your free 45-minute strategy session with Caitlyn"
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ChipFace — one side of the poker chip (SVG so the yellow ring,
// white edge notches, photo, and curved text all match the real chip).
// `face="front"` shows the photo + COLIVING CAIT; `face="back"` shows
// EDUCATION & COACHING · ✦ · REAL ESTATE SERVICES.
// ─────────────────────────────────────────────────────────────
function ChipFace({ face }: { face: "front" | "back" }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: face === "back" ? "rotateX(180deg)" : undefined,
      }}
    >
      <svg viewBox="0 0 280 280" className="w-full h-full drop-shadow-[0_24px_40px_rgba(0,0,0,0.55)]">
        <defs>
          <radialGradient id={`yellow-${face}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFE066" />
            <stop offset="55%" stopColor="#F5D034" />
            <stop offset="100%" stopColor="#C9A815" />
          </radialGradient>
          <radialGradient id={`black-${face}`} cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="#1A1A1A" />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>
          <clipPath id={`photo-clip-${face}`}>
            <circle cx="140" cy="138" r="64" />
          </clipPath>
          <path
            id={`curve-bottom-${face}`}
            d="M 75,190 A 72,72 0 0,0 205,190"
            fill="none"
          />
          <path
            id={`curve-top-${face}`}
            d="M 75,90 A 72,72 0 0,1 205,90"
            fill="none"
          />
        </defs>

        {/* Outer yellow ring */}
        <circle cx="140" cy="140" r="138" fill={`url(#yellow-${face})`} stroke="#A07F0F" strokeWidth="1.5" />

        {/* 8 white edge notches */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angleDeg = i * 45;
          return (
            <rect
              key={i}
              x={130}
              y={4}
              width={20}
              height={28}
              fill="white"
              rx={2}
              transform={`rotate(${angleDeg} 140 140)`}
            />
          );
        })}

        {/* Inner black circle */}
        <circle cx="140" cy="140" r="92" fill={`url(#black-${face})`} />

        {face === "front" ? (
          <>
            {/* Caitlyn headshot — bigger circle (r=64), slightly zoomed
                out, face centered. Source is 1080x1080; the 220px box
                gives a modest zoom so we see hair + face + shoulders
                rather than just the face. */}
            <image
              href="/images/caitlyn-yellow-blazer.jpg"
              x="30"
              y="74"
              width="220"
              height="220"
              clipPath={`url(#photo-clip-${face})`}
              preserveAspectRatio="xMidYMid slice"
            />
            {/* Thin white border around the photo, matching the
                physical chip's printed circle. */}
            <circle
              cx="140"
              cy="138"
              r="64"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              opacity="0.9"
            />
            {/* Two small alignment dots just outside the photo edge */}
            <circle cx="73" cy="138" r="2" fill="white" />
            <circle cx="207" cy="138" r="2" fill="white" />
            {/* COLIVING CAIT curved at bottom */}
            <text
              fill="white"
              fontSize="18"
              fontWeight="700"
              letterSpacing="3"
              textAnchor="middle"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              <textPath href={`#curve-bottom-${face}`} startOffset="50%">
                COLIVING CAIT
              </textPath>
            </text>
          </>
        ) : (
          <>
            {/* EDUCATION & COACHING curved at top */}
            <text
              fill="white"
              fontSize="16"
              fontWeight="700"
              letterSpacing="2"
              textAnchor="middle"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              <textPath href={`#curve-top-${face}`} startOffset="50%">
                EDUCATION &amp; COACHING
              </textPath>
            </text>

            {/* Inner white "sprinkle" disc — stand-in for the QR */}
            <circle cx="140" cy="140" r="50" fill="white" />
            {/* Subtle sprinkle marks (decorative dashes) */}
            {Array.from({ length: 18 }).map((_, i) => {
              const angle = (i / 18) * Math.PI * 2;
              const r = 40;
              const x1 = 140 + Math.cos(angle) * r;
              const y1 = 140 + Math.sin(angle) * r;
              const x2 = 140 + Math.cos(angle) * (r - 4);
              const y2 = 140 + Math.sin(angle) * (r - 4);
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#1A1A1A"
                  strokeWidth="1.5"
                  opacity={0.4}
                />
              );
            })}
            {/* Central monogram */}
            <text
              x="140"
              y="152"
              fill="#1A1A1A"
              fontSize="40"
              fontWeight="500"
              textAnchor="middle"
              style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic" }}
            >
              CC
            </text>

            {/* REAL ESTATE SERVICES curved at bottom */}
            <text
              fill="white"
              fontSize="16"
              fontWeight="700"
              letterSpacing="2"
              textAnchor="middle"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              <textPath href={`#curve-bottom-${face}`} startOffset="50%">
                REAL ESTATE SERVICES
              </textPath>
            </text>
          </>
        )}
      </svg>
    </div>
  );
}
