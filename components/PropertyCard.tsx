"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

// Single property card with built-in image carousel: main image swaps via
// thumbnails or left/right arrows. Falls back to a gradient placeholder
// when no images are supplied yet.

export type PropertyCardProps = {
  name: string;
  location: string;
  original: string;
  converted: string;
  gross: string;
  strategy: string;
  /** First image is the default; remaining ones become carousel slides. */
  images?: string[];
  /** Reveal cascade delay slot (1–5). */
  delay?: 1 | 2 | 3 | 4 | 5;
  children: React.ReactNode;
};

export default function PropertyCard({
  name,
  location,
  original,
  converted,
  gross,
  strategy,
  images = [],
  delay,
  children,
}: PropertyCardProps) {
  const [index, setIndex] = useState(0);
  const hasImages = images.length > 0;
  const total = images.length;

  function prev() {
    setIndex((i) => (i - 1 + total) % total);
  }
  function next() {
    setIndex((i) => (i + 1) % total);
  }

  return (
    <div
      className={cn(
        "reveal bg-white border border-soft mb-6 transition-all duration-500 hover:border-brand hover:shadow-card",
        delay && `reveal-d${delay}`,
      )}
    >
      <div className="grid lg:grid-cols-2">
        {/* Image / carousel */}
        <div
          className="relative w-full flex items-center justify-center text-sm text-warmgray-light overflow-hidden bg-blush"
          style={{ aspectRatio: "16 / 10" }}
        >
          <span className="absolute top-4 left-4 z-20 text-[10px] font-medium uppercase tracking-[0.12em] text-white bg-charcoal px-3 py-1.5">
            Active
          </span>

          {hasImages ? (
            <>
              <Image
                key={images[index]}
                src={images[index]}
                alt={`${name} — photo ${index + 1} of ${total}`}
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />

              {total > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Previous photo"
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white/85 hover:bg-white text-charcoal text-lg leading-none shadow-card transition-colors"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    aria-label="Next photo"
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white/85 hover:bg-white text-charcoal text-lg leading-none shadow-card transition-colors"
                  >
                    ›
                  </button>
                  <span className="absolute bottom-3 right-3 z-10 text-[10px] font-medium uppercase tracking-[0.1em] text-white bg-charcoal/80 px-2.5 py-1">
                    {index + 1} / {total}
                  </span>
                </>
              )}
            </>
          ) : (
            "Property overview photo"
          )}
        </div>

        {/* Details */}
        <div className="p-10 lg:p-11 flex flex-col justify-center">
          <div className="font-heading font-medium text-[28px] text-charcoal mb-1">
            {name}
          </div>
          <div className="text-[13px] text-warmgray-light tracking-[0.04em] mb-6">
            {location}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            {[
              ["Original", original],
              ["Converted", converted],
              ["Avg Monthly Gross", gross],
              ["Strategy", strategy],
            ].map(([label, val]) => (
              <div key={label}>
                <span className="block text-[10px] font-medium uppercase tracking-[0.12em] text-gold mb-1">
                  {label}
                </span>
                <span className="font-heading font-medium text-[22px] text-charcoal">
                  {val}
                </span>
              </div>
            ))}
          </div>
          <div className="text-sm text-warmgray leading-[1.75] pt-5 border-t border-soft">
            {children}
          </div>
        </div>
      </div>

      {/* Thumbnails / footer */}
      <div className="flex items-center justify-between gap-4 px-10 lg:px-11 py-4 border-t border-soft">
        {hasImages ? (
          <div className="hidden sm:flex gap-2 flex-wrap">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "relative w-14 h-10 bg-blush border overflow-hidden cursor-pointer transition-all",
                  i === index ? "border-gold ring-1 ring-gold" : "border-soft hover:border-brand",
                )}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        ) : (
          <div className="hidden sm:flex gap-2">
            {["Main", "Before", "After", "Rooms"].map((label, i) => (
              <div
                key={label}
                className={cn(
                  "w-14 h-10 bg-blush border flex items-center justify-center text-[9px] text-warmgray-light",
                  i === 0 ? "border-gold" : "border-soft",
                )}
              >
                {label}
              </div>
            ))}
          </div>
        )}
        <a
          href="#"
          className="group inline-flex items-center gap-2 text-xs font-medium tracking-[0.08em] uppercase text-gold-dark hover:text-gold hover:gap-3 transition-all duration-300"
        >
          View all photos →
        </a>
      </div>
    </div>
  );
}
