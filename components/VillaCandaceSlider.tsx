"use client";

import { useEffect, useRef, useState } from "react";

// Before/after floorplan slider for the Villa Candace case study on
// /what-is-coliving. Mirrors the IntersectionObserver + drag handle behavior
// from the v2 HTML design. Images are loaded from /public/images/villa-candace
// when available; until then, gradient placeholders fill the same aspect.
//
// Drop final images at:
//   /public/images/villacandace-before.png  (5BR/3BA original)
//   /public/images/villacandace-after.png   (8 rooms after conversion)
const BEFORE_SRC = "/images/villacandace-before.png";
const AFTER_SRC = "/images/villacandace-after.png";

export default function VillaCandaceSlider() {
  const [position, setPosition] = useState(50);
  const [hasBefore, setHasBefore] = useState(true);
  const [hasAfter, setHasAfter] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);

  const setFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    let pct = ((clientX - rect.left) / rect.width) * 100;
    pct = Math.max(2, Math.min(98, pct));
    setPosition(pct);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (dragging.current) setFromClientX(e.clientX);
    };
    const onMouseUp = () => {
      dragging.current = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (dragging.current && e.touches[0]) setFromClientX(e.touches[0].clientX);
    };
    const onTouchEnd = () => {
      dragging.current = false;
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="reveal relative max-w-[1100px] mx-auto overflow-hidden border border-soft select-none cursor-col-resize"
        onMouseDown={(e) => {
          dragging.current = true;
          setFromClientX(e.clientX);
          e.preventDefault();
        }}
        onTouchStart={(e) => {
          dragging.current = true;
          if (e.touches[0]) setFromClientX(e.touches[0].clientX);
        }}
      >
        {/* Base layer — BEFORE */}
        {hasBefore ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={BEFORE_SRC}
            alt="Villa C — Original 5BR/3BA floorplan"
            draggable={false}
            onError={() => setHasBefore(false)}
            className="w-full h-auto block pointer-events-none"
          />
        ) : (
          <div
            className="w-full flex items-center justify-center text-warmgray-light text-sm"
            style={{
              aspectRatio: "16 / 9",
              background:
                "linear-gradient(135deg, #FAF7F2 0%, #F0E8E0 100%)",
            }}
          >
            Original 5BR / 3BA — floorplan placeholder
          </div>
        )}

        {/* Overlay layer — AFTER */}
        <div
          className="absolute top-0 left-0 h-full overflow-hidden"
          style={{ width: `${position}%` }}
        >
          {hasAfter ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={AFTER_SRC}
              alt="Villa C — Coliving conversion 8 rooms"
              draggable={false}
              onError={() => setHasAfter(false)}
              className="absolute top-0 left-0 h-full w-auto min-w-full object-cover pointer-events-none"
            />
          ) : (
            <div
              className="absolute top-0 left-0 h-full w-full flex items-center justify-center text-cream/80 text-sm"
              style={{
                background:
                  "linear-gradient(135deg, #1C1917 0%, #2A2725 100%)",
              }}
            >
              Coliving conversion — 8 rooms
            </div>
          )}
        </div>

        {/* Handle */}
        <div
          className="absolute inset-y-0 w-1 bg-gold z-10 -translate-x-1/2 cursor-col-resize"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gold shadow-[0_4px_20px_rgba(196,149,90,0.35)] flex items-center justify-center">
            <span className="text-white text-sm font-medium tracking-[4px] whitespace-nowrap">
              ⟨ ⟩
            </span>
          </div>
        </div>
      </div>

      <div className="reveal flex flex-col lg:flex-row">
        <div className="flex-1 px-8 py-6 lg:px-8 bg-cream">
          <span className="block mb-3 text-[10px] font-medium uppercase tracking-[0.15em] text-warmgray-light">
            Before — Traditional Rental
          </span>
          <div className="flex gap-7 items-baseline">
            <div>
              <div className="font-heading font-medium text-[32px] leading-none text-warmgray">
                $1,800
              </div>
              <span className="text-[13px] text-warmgray-light">1 tenant</span>
            </div>
          </div>
          <span className="block mt-1 text-[13px] text-warmgray-light">
            gross monthly revenue
          </span>
          <div
            className="font-heading font-medium text-xl mt-3 inline-block pt-2.5 border-t"
            style={{ color: "#C07070", borderTopColor: "rgba(192,112,112,0.2)" }}
          >
            −$200/mo cashflow
          </div>
        </div>

        <div className="flex-1 px-8 py-6 lg:px-8 bg-charcoal">
          <span className="block mb-3 text-[10px] font-medium uppercase tracking-[0.15em] text-gold">
            After — Coliving on PadSplit
          </span>
          <div className="flex gap-7 items-baseline">
            <div>
              <div className="font-heading font-medium text-[32px] leading-none text-white">
                $6,000
              </div>
              <span className="text-[13px] text-warmgray-light">8 rooms</span>
            </div>
          </div>
          <span className="block mt-1 text-[13px] text-warmgray-light">
            gross monthly revenue · same property
          </span>
          <div
            className="font-heading font-medium text-xl mt-3 text-gold-light inline-block pt-2.5 border-t"
            style={{ borderTopColor: "rgba(232,213,181,0.2)" }}
          >
            +$1,500/mo cashflow
          </div>
        </div>
      </div>
    </>
  );
}
