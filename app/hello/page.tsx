"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import CalendlyModal from "@/components/CalendlyModal";

// /hello — destination of the QR code on Caitlyn's business card.
// Fullscreen, chrome-free, celebratory. The show starts the instant the
// page mounts: bloom + firework burst + sparkle field + light rays +
// confetti ribbons + word-by-word headline pop. Cursor / touch nudges
// the spotlight so it feels alive.

const BURST = Array.from({ length: 36 }).map((_, i) => {
  const angle = (i / 36) * Math.PI * 2;
  const distance = 220 + ((i * 53) % 180);
  return {
    id: i,
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    size: 3 + (i % 4),
    delay: (i % 6) * 0.04,
  };
});

const TWINKLES = Array.from({ length: 38 }).map((_, i) => ({
  id: i,
  left: (i * 67 + 13) % 100,
  top: (i * 41 + 7) % 100,
  size: 2 + (i % 3),
  delay: (i % 10) * 0.25,
  duration: 1.6 + (i % 5) * 0.4,
}));

const RIBBONS = Array.from({ length: 22 }).map((_, i) => ({
  id: i,
  left: (i * 47 + 9) % 100,
  rotate: -45 + ((i * 31) % 90),
  delay: (i % 8) * 0.18,
  duration: 4 + (i % 5) * 0.6,
  color: i % 3 === 0 ? "#E8D5B5" : i % 3 === 1 ? "#C4955A" : "#FAF7F2",
  width: 2,
  height: 10 + (i % 4) * 4,
}));

const RAYS = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  rotate: (i * 30),
  delay: i * 0.06,
}));

const DRIFTERS = Array.from({ length: 18 }).map((_, i) => ({
  id: i,
  left: (i * 73 + 11) % 100,
  top: 60 + ((i * 17) % 40),
  size: 2 + (i % 3),
  delay: (i % 7) * 0.5,
  duration: 8 + (i % 5) * 1.6,
  drift: 40 + (i % 6) * 14,
}));

export default function HelloPage() {
  const reduced = useReducedMotion();
  const [coords, setCoords] = useState({ x: 0.5, y: 0.5 });
  const [bookingOpen, setBookingOpen] = useState(false);
  const [diveOpen, setDiveOpen] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      setCoords({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

  const bloomStyle = useMemo(
    () => ({ left: `${coords.x * 100}%`, top: `${coords.y * 100}%` }),
    [coords],
  );

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <div className="fixed inset-0 bg-charcoal text-white overflow-hidden">
      {/* ===== BACKDROP LAYER ===== */}

      {/* Primary spotlight — anchored to cursor / touch */}
      <motion.div
        aria-hidden
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease }}
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          ...bloomStyle,
          width: "min(120vmin, 1100px)",
          height: "min(120vmin, 1100px)",
          background:
            "radial-gradient(circle, rgba(196,149,90,0.45) 0%, rgba(196,149,90,0.18) 28%, rgba(196,149,90,0.05) 52%, transparent 72%)",
          filter: "blur(28px)",
          transition: "left 1.6s cubic-bezier(0.16,1,0.3,1), top 1.6s cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      {/* Secondary halo */}
      <motion.div
        aria-hidden
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.7 }}
        transition={{ duration: 2.4, ease, delay: 0.1 }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "min(170vmin, 1600px)",
          height: "min(170vmin, 1600px)",
          background:
            "radial-gradient(circle, rgba(232,213,181,0.12) 0%, rgba(232,213,181,0.04) 35%, transparent 65%)",
          filter: "blur(50px)",
        }}
      />

      {/* Light rays */}
      {!reduced && (
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {RAYS.map((r) => (
            <motion.span
              key={r.id}
              aria-hidden
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: [0, 1, 0.7], opacity: [0, 0.5, 0.15] }}
              transition={{ duration: 1.6, ease, delay: r.delay }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 origin-top"
              style={{
                width: 2,
                height: "55vmax",
                transform: `translate(-50%, 0) rotate(${r.rotate}deg)`,
                transformOrigin: "top center",
                background:
                  "linear-gradient(to bottom, rgba(232,213,181,0.55) 0%, rgba(196,149,90,0.15) 50%, transparent 100%)",
                filter: "blur(1px)",
              }}
            />
          ))}
        </div>
      )}

      {/* Firework burst from center */}
      {!reduced && (
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

      {/* Second smaller burst — delayed */}
      {!reduced && (
        <div className="pointer-events-none absolute left-1/2 top-1/2">
          {BURST.slice(0, 20).map((p) => (
            <motion.span
              key={p.id}
              aria-hidden
              className="absolute rounded-full bg-gold"
              style={{
                left: 0,
                top: 0,
                width: p.size,
                height: p.size,
                boxShadow: "0 0 10px rgba(196,149,90,0.9)",
              }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={{
                x: [0, p.x * 0.5, p.x * 0.8],
                y: [0, p.y * 0.5, p.y * 0.8 + 80],
                opacity: [0, 1, 0],
                scale: [0, 1, 0.3],
              }}
              transition={{ duration: 1.8, ease, delay: 1.2 + p.delay }}
            />
          ))}
        </div>
      )}

      {/* Confetti ribbons — falling, rotating */}
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
              delay: 0.3 + r.delay,
              repeat: Infinity,
              repeatDelay: 6,
              ease: "easeIn",
            }}
          />
        ))}

      {/* Twinkling star field */}
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
              boxShadow: "0 0 6px rgba(255,255,255,0.9), 0 0 12px rgba(232,213,181,0.5)",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0] }}
            transition={{
              duration: t.duration,
              delay: 0.2 + t.delay,
              repeat: Infinity,
              repeatDelay: 1 + (t.id % 4),
              ease: "easeInOut",
            }}
          />
        ))}

      {/* Slow drifters — rising embers */}
      {!reduced &&
        DRIFTERS.map((p) => (
          <motion.span
            key={p.id}
            aria-hidden
            className="pointer-events-none absolute rounded-full bg-gold-light"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              boxShadow: "0 0 8px rgba(232,213,181,0.7)",
            }}
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: [0, 0.7, 0.7, 0],
              y: [0, -p.drift, -p.drift * 1.6],
              x: [0, p.drift / 3, -p.drift / 4],
            }}
            transition={{
              duration: p.duration,
              delay: 1.5 + p.delay,
              repeat: Infinity,
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

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center">
        {/* Ornament */}
        <motion.span
          aria-hidden
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.2 }}
          className="mb-8 inline-block text-gold"
          style={{ fontSize: 14, letterSpacing: "0.4em", textShadow: "0 0 20px rgba(196,149,90,0.6)" }}
        >
          ✦
        </motion.span>

        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.4 }}
          className="mb-7 text-[11px] font-medium uppercase tracking-[0.32em] text-gold-light"
          style={{ textShadow: "0 0 16px rgba(232,213,181,0.4)" }}
        >
          It&apos;s nice to meet you!
        </motion.span>

        {/* Headline — word-by-word pop */}
        <h1
          className="font-heading font-light text-white leading-[1.05] tracking-[-0.02em]"
          style={{ fontSize: "clamp(56px, 12vw, 132px)", textShadow: "0 0 40px rgba(196,149,90,0.25)" }}
        >
          {["Hi,", "I'm", "Caitlyn!"].map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.7, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={{
                duration: 0.9,
                ease,
                delay: 0.6 + i * 0.18,
              }}
              className={`inline-block mr-[0.25em] ${i === 2 ? "italic text-gold" : ""}`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Underline draw */}
        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease, delay: 1.4 }}
          className="mt-9 block h-px w-24 origin-center bg-gold"
          style={{ boxShadow: "0 0 12px rgba(196,149,90,0.7)" }}
        />

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 1.6 }}
          className="mt-9 max-w-[440px] text-[15px] leading-[1.85] text-warmgray-light"
        >
          Realtor, coliving investor, and your seat at the table.
          I help women build wealth through intentional coliving — and I&apos;m
          so glad we crossed paths.
        </motion.p>

        {/* Primary CTA — opens Calendly modal */}
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease, delay: 1.9 }}
          className="mt-11"
        >
          <button
            type="button"
            onClick={() => setBookingOpen(true)}
            className="group relative inline-flex items-center gap-4 border border-gold/40 bg-transparent px-9 py-[18px] text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-all duration-500 hover:border-gold hover:bg-gold hover:text-charcoal hover:shadow-[0_16px_40px_rgba(196,149,90,0.45)]"
          >
            <motion.span
              aria-hidden
              className="absolute inset-0 -z-10"
              animate={{
                boxShadow: [
                  "0 0 0 rgba(196,149,90,0)",
                  "0 0 32px rgba(196,149,90,0.35)",
                  "0 0 0 rgba(196,149,90,0)",
                ],
              }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 2.4 }}
            />
            Continue the Conversation
            <span className="relative inline-block h-px w-8 bg-gold-light transition-all duration-500 group-hover:w-12 group-hover:bg-charcoal">
              <span className="absolute -top-[3px] right-0 h-[7px] w-[7px] rotate-45 border-r border-t border-gold-light transition-colors duration-500 group-hover:border-charcoal" />
            </span>
          </button>
        </motion.div>

        {/* Secondary options */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 2.15 }}
          className="mt-7 flex flex-col items-center gap-3"
        >
          {/* Dive deeper — inline disclosure */}
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => setDiveOpen((v) => !v)}
              aria-expanded={diveOpen}
              aria-controls="dive-deeper-options"
              className="group inline-flex items-center gap-2 text-[12px] tracking-[0.06em] text-warmgray-light hover:text-gold-light transition-colors duration-300"
            >
              Dive deeper
              <span
                aria-hidden
                className={`transition-transform duration-300 ${diveOpen ? "rotate-180" : ""}`}
              >
                ↓
              </span>
            </button>

            <AnimatePresence initial={false}>
              {diveOpen && (
                <motion.ul
                  id="dive-deeper-options"
                  initial={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
                  animate={reduced ? { opacity: 1 } : { opacity: 1, height: "auto" }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease }}
                  className="mt-4 flex flex-col items-center gap-3 overflow-hidden"
                >
                  {[
                    { label: "All things coliving", href: "/courses/coliving-101" },
                    { label: "House hacking handbook", href: "/courses/house-hacking-101" },
                    { label: "Real estate roadmap", href: "/courses/real-estate-101" },
                  ].map((opt, i) => (
                    <motion.li
                      key={opt.href}
                      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease, delay: 0.08 + i * 0.08 }}
                    >
                      <Link
                        href={opt.href}
                        className="group inline-flex items-center gap-2 text-[12px] tracking-[0.06em] text-warmgray-light hover:text-gold-light transition-colors duration-300"
                      >
                        <span aria-hidden className="text-gold/50">·</span>
                        {opt.label}
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Save vCard */}
          <a
            href="/caitlyn-verdugo.vcf"
            download="caitlyn-verdugo.vcf"
            className="group inline-flex items-center gap-2 text-[12px] tracking-[0.06em] text-warmgray-light hover:text-gold-light transition-colors duration-300"
          >
            Save my contact info
            <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
          </a>
        </motion.div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease, delay: 2.4 }}
          className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-2"
        >
          <span className="font-heading italic text-gold-light/80 text-lg">
            Caitlyn Verdugo
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-warmgray-light/60">
            Coliving · Cait
          </span>
        </motion.div>
      </div>

      <CalendlyModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
