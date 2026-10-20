"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import type { Rate } from "@/lib/rent-ledger/metrics";
import { fmtMoney, fmtPct } from "@/lib/rent-ledger/metrics";

// Shared presentation pieces for the rent-ledger tool.

export function Stat({
  label,
  value,
  sub,
  title,
  className,
}: {
  label: string;
  value: React.ReactNode;
  sub?: React.ReactNode;
  title?: string;
  className?: string;
}) {
  return (
    <div className={cn("border border-brand bg-white p-5", className)} title={title}>
      <p className="text-[10px] uppercase tracking-eyebrow text-warmgray">{label}</p>
      <p className="mt-2 font-heading text-3xl text-charcoal leading-none">{value}</p>
      {sub && <p className="mt-2 text-xs text-warmgray leading-snug">{sub}</p>}
    </div>
  );
}

export function SmallSample() {
  return (
    <span
      className="ml-1 inline-block border border-warmgray-light px-1 text-[9px] uppercase tracking-eyebrow text-warmgray align-middle"
      title="Built from too few residents or months to lean on"
    >
      small sample
    </span>
  );
}

/** A rate with its denominator on hover ("31 of 78 move-outs"). */
export function RateText({ rate, unit, digits = 1 }: { rate: Rate; unit: string; digits?: number }) {
  return (
    <span title={`${rate.n} of ${rate.d} ${unit}`} className="cursor-help underline decoration-dotted decoration-warmgray-light underline-offset-4">
      {fmtPct(rate.value, digits)}
      {rate.small && <SmallSample />}
    </span>
  );
}

export function Money({ value, digits = 0, title }: { value: number | null | undefined; digits?: number; title?: string }) {
  return <span title={title}>{fmtMoney(value, digits)}</span>;
}

export interface Column<T> {
  key: string;
  label: string;
  render: (row: T) => React.ReactNode;
  align?: "left" | "right";
}

export function DataTable<T>({ columns, rows, empty = "Nothing to show." }: { columns: Column<T>[]; rows: T[]; empty?: string }) {
  if (!rows.length) return <p className="text-sm text-warmgray py-4">{empty}</p>;
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-brand">
            {columns.map((c) => (
              <th
                key={c.key}
                className={cn(
                  "px-2 py-2 text-[10px] font-medium uppercase tracking-eyebrow text-warmgray whitespace-nowrap",
                  c.align === "right" ? "text-right" : "text-left",
                )}
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-soft">
              {columns.map((c) => (
                <td
                  key={c.key}
                  className={cn(
                    "px-2 py-2 text-charcoal tabular-nums",
                    c.align === "right" ? "text-right whitespace-nowrap" : "text-left",
                  )}
                >
                  {c.render(r)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Every chart: a one-line finding as its title, and a table view. */
export function ChartCard({
  title,
  note,
  chart,
  table,
}: {
  title: string;
  note?: React.ReactNode;
  chart: React.ReactNode;
  table: React.ReactNode;
}) {
  const [showTable, setShowTable] = useState(false);
  return (
    <figure className="border border-brand bg-white p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <figcaption className="font-heading text-xl md:text-2xl text-charcoal leading-snug max-w-3xl">{title}</figcaption>
        <button
          type="button"
          onClick={() => setShowTable((v) => !v)}
          className="text-[10px] uppercase tracking-eyebrow text-gold-dark border border-brand px-3 py-1.5 hover:border-gold"
        >
          {showTable ? "Show chart" : "Show table"}
        </button>
      </div>
      {showTable ? table : chart}
      {note && <p className="mt-3 text-xs text-warmgray leading-relaxed">{note}</p>}
    </figure>
  );
}

export function Panel({ title, children, className }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("border border-brand bg-white p-5 md:p-6", className)}>
      {title && <h3 className="font-heading text-xl md:text-2xl text-charcoal mb-4">{title}</h3>}
      {children}
    </section>
  );
}

export function Notice({ tone = "info", children }: { tone?: "info" | "warn" | "fail"; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "border px-4 py-3 text-sm leading-relaxed",
        tone === "fail" && "border-red-300 bg-red-50 text-red-900",
        tone === "warn" && "border-gold bg-gold/[0.06] text-charcoal",
        tone === "info" && "border-brand bg-cream text-charcoal",
      )}
    >
      {children}
    </div>
  );
}

export const inputClass =
  "w-full border border-brand bg-white px-3 py-2.5 text-charcoal placeholder:text-warmgray-light focus:border-gold focus:outline-none";

export const labelClass = "block text-[10px] uppercase tracking-eyebrow text-warmgray mb-1.5";
