"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

// /hello — the destination of the QR code on Caitlyn's business card.
// Mobile-first, fullscreen, no chrome (Nav/Footer hide themselves on this route).
// Animation:
//   1. dark charcoal page opens with a small gold spot at center
//   2. spot blooms outward into a soft radial glow
//   3. eyebrow / headline / sub / CTA fade up in sequence
//   4. faint gold particles drift the entire time
//   5. cursor (or touch) nudges the bloom — feels alive
const particles = Array.from({ length: 14 }).map((_, i) => ({
  id: i,
  size: 2 + (i % 4),
  left: (i * 73) % 100,
  top: (i * 41 + 17) % 100,
  delay: (i % 7) * 0.4,
  duration: 9 + (i % 5) * 2,
  drift: 30 + (i % 6) * 10,
}));

export default function HelloPage() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

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
    () => ({
      left: `${coords.x * 100}%`,
      top: `${coords.y * 100}%`,
    }),
    [coords],
  );

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <div className="fixed inset-0 bg-charcoal text-white overflow-hidden">
      {/* Spotlight bloom — anchored to cursor / touch (defaults to center) */}
      <motion.div
        aria-hidden
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: mounted ? 1 : 0, opacity: mounted ? 1 : 0 }}
        transition={{ duration: 2.2, ease }}
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          ...bloomStyle,
          width: "min(120vmin, 1100px)",
          height: "min(120vmin, 1100px)",
          background:
            "radial-gradient(circle, rgba(196,149,90,0.42) 0%, rgba(196,149,90,0.18) 28%, rgba(196,149,90,0.05) 52%, transparent 72%)",
          filter: "blur(28px)",
          transition: "left 1.6s cubic-bezier(0.16,1,0.3,1), top 1.6s cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      {/* Secondary bloom — slower, lighter, gives depth */}
      <motion.div
        aria-hidden
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: mounted ? 1 : 0, opacity: mounted ? 0.7 : 0 }}
        transition={{ duration: 3.2, ease, delay: 0.3 }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "min(160vmin, 1500px)",
          height: "min(160vmin, 1500px)",
          background:
            "radial-gradient(circle, rgba(232,213,181,0.10) 0%, rgba(232,213,181,0.04) 35%, transparent 65%)",
          filter: "blur(50px)",
        }}
      />

      {/* Vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Drifting gold particles */}
      {!reduced &&
        particles.map((p) => (
          <motion.span
            key={p.id}
            aria-hidden
            className="pointer-events-none absolute rounded-full bg-gold-light"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              boxShadow: "0 0 8px rgba(232,213,181,0.6)",
            }}
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: mounted ? [0, 0.7, 0.7, 0] : 0,
              y: mounted ? [0, -p.drift, -p.drift * 1.6] : 0,
              x: mounted ? [0, p.drift / 3, -p.drift / 4] : 0,
            }}
            transition={{
              duration: p.duration,
              delay: 1 + p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center">
        {/* Ornament */}
        <motion.span
          aria-hidden
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease, delay: 0.4 }}
          className="mb-10 inline-block text-gold"
          style={{ fontSize: 12, letterSpacing: "0.4em" }}
        >
          ✦
        </motion.span>

        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.9 }}
          className="mb-7 text-[10px] font-medium uppercase tracking-[0.32em] text-gold-light/80"
        >
          So glad you scanned
        </motion.span>

        {/* Headline — word by word */}
        <h1
          className="font-heading font-light text-white leading-[1.05] tracking-[-0.02em]"
          style={{ fontSize: "clamp(56px, 12vw, 132px)" }}
        >
          {["Hello,", "I'm", "Caitlyn."].map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.1, ease, delay: 1.2 + i * 0.25 }}
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
          transition={{ duration: 1.4, ease, delay: 2.1 }}
          className="mt-9 block h-px w-24 origin-center bg-gold/60"
        />

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 2.4 }}
          className="mt-9 max-w-[440px] text-[15px] leading-[1.85] text-warmgray-light"
        >
          Realtor, coliving investor, and your seat at the table.
          I help women build wealth through intentional coliving — and I&apos;m
          so glad we crossed paths.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 2.8 }}
          className="mt-11"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-4 border border-gold/40 bg-transparent px-9 py-[18px] text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-all duration-500 hover:border-gold hover:bg-gold hover:text-charcoal hover:shadow-[0_16px_40px_rgba(196,149,90,0.35)]"
          >
            Book a Discovery Call
            <span className="relative inline-block h-px w-8 bg-gold-light transition-all duration-500 group-hover:w-12 group-hover:bg-charcoal">
              <span className="absolute -top-[3px] right-0 h-[7px] w-[7px] rotate-45 border-r border-t border-gold-light transition-colors duration-500 group-hover:border-charcoal" />
            </span>
          </Link>
        </motion.div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease, delay: 3.3 }}
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
    </div>
  );
}
