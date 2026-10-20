"use client";

import { monthLabel } from "@/lib/rent-ledger/parse";

// Small SVG charts for the report. Thin marks, recessive axes, one y-axis,
// a native tooltip on every mark, and a table view in the ChartCard around
// each one. Single-series marks use the brand's dark gold; multi-series
// charts use a fixed categorical order validated for color-vision deficiency.

const INK = "#1C1917";
const MUTED = "#6B6560";
const GRID = "rgba(28,25,23,0.08)";
const MARK = "#8B6535";
const MARK_SOFT = "#E8D5B5";
export const SERIES = ["#2a78d6", "#eb6834", "#1baf7a", "#eda100", "#e87ba4", "#008300", "#6250d6", "#e34948"];

const W = 640;

/** Horizontal bars with an optional reference line (base rate) and "without" tick. */
export function HBars({
  rows,
  format,
  max,
  reference,
  referenceLabel,
}: {
  rows: Array<{ label: string; value: number | null; tick?: number | null; tooltip: string; muted?: boolean }>;
  format: (v: number) => string;
  max?: number;
  reference?: number | null;
  referenceLabel?: string;
}) {
  const LABEL = 230;
  const ROW = 30;
  const top = reference != null ? 22 : 6;
  const H = top + rows.length * ROW + 6;
  const hi = max ?? Math.max(1e-9, ...rows.map((r) => Math.max(r.value ?? 0, r.tick ?? 0)), reference ?? 0);
  const x = (v: number) => LABEL + (v / hi) * (W - LABEL - 60);
  return (
    <div className="overflow-x-auto">
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-w-[820px] min-w-[560px]" role="img">
      {reference != null && (
        <g>
          <line x1={x(reference)} x2={x(reference)} y1={top - 6} y2={H - 4} stroke={INK} strokeDasharray="3 3" strokeWidth={1} />
          <text x={x(reference)} y={12} textAnchor="middle" fontSize={10} fill={MUTED}>
            {referenceLabel ?? "Base"} {format(reference)}
          </text>
        </g>
      )}
      {rows.map((r, i) => {
        const y = top + i * ROW;
        const v = r.value ?? 0;
        return (
          <g key={r.label}>
            <title>{r.tooltip}</title>
            <rect x={0} y={y} width={W} height={ROW} fill="transparent" />
            <text x={LABEL - 10} y={y + ROW / 2 + 4} textAnchor="end" fontSize={11.5} fill={INK}>
              {r.label}
            </text>
            <rect x={LABEL} y={y + 8} width={Math.max(2, x(v) - LABEL)} height={ROW - 16} rx={3} fill={r.muted ? MARK_SOFT : MARK} />
            {r.tick != null && (
              <line x1={x(r.tick)} x2={x(r.tick)} y1={y + 4} y2={y + ROW - 4} stroke={INK} strokeWidth={2} />
            )}
            <text x={x(Math.max(v, r.tick ?? 0)) + 6} y={y + ROW / 2 + 4} fontSize={11} fill={MUTED}>
              {r.value == null ? "–" : format(v)}
            </text>
          </g>
        );
      })}
    </svg>
    </div>
  );
}

/** Min / median / max per row. */
export function RangeBars({
  rows,
  format,
}: {
  rows: Array<{ label: string; min: number | null; median: number | null; max: number | null }>;
  format: (v: number) => string;
}) {
  const LABEL = 170;
  const ROW = 32;
  const H = rows.length * ROW + 24;
  const vals = rows.flatMap((r) => [r.min ?? 0, r.max ?? 0]);
  const lo = Math.min(0, ...vals);
  const hi = Math.max(1, ...vals);
  const x = (v: number) => LABEL + ((v - lo) / (hi - lo)) * (W - LABEL - 70);
  return (
    <div className="overflow-x-auto">
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-w-[820px] min-w-[560px]" role="img">
      <line x1={x(0)} x2={x(0)} y1={0} y2={H - 20} stroke={GRID} />
      <text x={x(0)} y={H - 6} fontSize={10} fill={MUTED} textAnchor="middle">$0</text>
      {rows.map((r, i) => {
        const y = i * ROW + ROW / 2;
        if (r.min == null || r.max == null || r.median == null)
          return (
            <text key={r.label} x={LABEL - 10} y={y + 4} textAnchor="end" fontSize={11.5} fill={INK}>{r.label}</text>
          );
        return (
          <g key={r.label}>
            <title>{`${r.label}: min ${format(r.min)}, median ${format(r.median)}, max ${format(r.max)} per house-month`}</title>
            <rect x={0} y={y - ROW / 2} width={W} height={ROW} fill="transparent" />
            <text x={LABEL - 10} y={y + 4} textAnchor="end" fontSize={11.5} fill={INK}>{r.label}</text>
            <line x1={x(r.min)} x2={x(r.max)} y1={y} y2={y} stroke={MARK_SOFT} strokeWidth={8} strokeLinecap="round" />
            <circle cx={x(r.median)} cy={y} r={5} fill={MARK} stroke="#fff" strokeWidth={2} />
            <text x={x(r.max) + 8} y={y + 4} fontSize={11} fill={MUTED}>
              {format(r.median)} median
            </text>
          </g>
        );
      })}
    </svg>
    </div>
  );
}

/** A monthly line with shaded spans (destabilization events). */
export function TrendLine({
  points,
  shaded = [],
  format,
  height = 170,
}: {
  points: Array<{ month: string; value: number | null; dashed?: boolean }>;
  shaded?: Array<{ start: string; end: string; label: string }>;
  format: (v: number) => string;
  height?: number;
}) {
  const L = 56;
  const R = 28;
  const T = 10;
  const B = 24;
  const vals = points.map((p) => p.value ?? 0);
  const hi = Math.max(1, ...vals) * 1.08;
  const n = Math.max(1, points.length - 1);
  const x = (i: number) => L + (i / n) * (W - L - R);
  const y = (v: number) => T + (1 - v / hi) * (height - T - B);
  const idx = new Map(points.map((p, i) => [p.month, i]));
  const solid = points.filter((p) => !p.dashed && p.value != null);
  const path = solid.map((p, i) => `${i ? "L" : "M"}${x(idx.get(p.month)!)},${y(p.value!)}`).join(" ");
  const ticks = [0, hi / 2, hi].map((v) => Math.round(v));
  const every = Math.ceil(points.length / 8);
  return (
    <svg viewBox={`0 0 ${W} ${height}`} className="w-full h-auto max-w-[820px]" role="img">
      {shaded.map((s) => {
        const a = idx.get(s.start);
        const b = idx.get(s.end);
        if (a == null || b == null) return null;
        const half = (W - L - R) / n / 2;
        return (
          <rect key={s.start} x={x(a) - half} y={T} width={x(b) - x(a) + 2 * half} height={height - T - B} fill="#C4955A" opacity={0.14}>
            <title>{s.label}</title>
          </rect>
        );
      })}
      {ticks.map((t) => (
        <g key={t}>
          <line x1={L} x2={W - R} y1={y(t)} y2={y(t)} stroke={GRID} />
          <text x={L - 6} y={y(t) + 3} textAnchor="end" fontSize={10} fill={MUTED}>{format(t)}</text>
        </g>
      ))}
      <path d={path} fill="none" stroke={MARK} strokeWidth={2} />
      {points.map((p, i) => (
        <g key={p.month}>
          {p.value != null && (
            <circle cx={x(i)} cy={y(p.value)} r={p.dashed ? 3 : 2.5} fill={p.dashed ? "#fff" : MARK} stroke={MARK} strokeWidth={1.5}>
              <title>{`${monthLabel(p.month)}: ${format(p.value)}${p.dashed ? " (still collecting)" : ""}`}</title>
            </circle>
          )}
          <rect x={x(i) - 8} y={T} width={16} height={height - T - B} fill="transparent">
            <title>{`${monthLabel(p.month)}: ${p.value == null ? "–" : format(p.value)}${p.dashed ? " (still collecting)" : ""}`}</title>
          </rect>
          {i % every === 0 && (
            <text x={x(i)} y={height - 6} textAnchor="middle" fontSize={10} fill={MUTED}>{monthLabel(p.month)}</text>
          )}
        </g>
      ))}
    </svg>
  );
}

/** Columns grouped by category, one color per series in fixed order. */
export function GroupedColumns({
  categories,
  series,
  format,
  height = 200,
}: {
  categories: string[];
  series: Array<{ label: string; values: Array<number | null>; color?: string }>;
  format: (v: number) => string;
  height?: number;
}) {
  const L = 44;
  const T = 10;
  const B = 26;
  const vals = series.flatMap((s) => s.values.map((v) => v ?? 0));
  const hi = Math.max(1e-9, ...vals) * 1.08;
  const groupW = (W - L - 8) / Math.max(1, categories.length);
  const barW = Math.max(2, Math.min(18, (groupW - 6) / series.length - 2));
  const y = (v: number) => T + (1 - v / hi) * (height - T - B);
  const every = Math.ceil(categories.length / 10);
  return (
    <div>
      {series.length > 1 && (
        <div className="flex flex-wrap gap-x-4 gap-y-1 mb-2 text-xs text-warmgray">
          {series.map((s, i) => (
            <span key={s.label} className="inline-flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: s.color ?? SERIES[i % SERIES.length] }} />
              {s.label}
            </span>
          ))}
        </div>
      )}
      <svg viewBox={`0 0 ${W} ${height}`} className="w-full h-auto max-w-[820px]" role="img">
        {[0, hi / 2, hi].map((t) => (
          <g key={t}>
            <line x1={L} x2={W - 4} y1={y(t)} y2={y(t)} stroke={GRID} />
            <text x={L - 6} y={y(t) + 3} textAnchor="end" fontSize={10} fill={MUTED}>{format(t)}</text>
          </g>
        ))}
        {categories.map((c, ci) => {
          const gx = L + 4 + ci * groupW + (groupW - series.length * (barW + 2)) / 2;
          return (
            <g key={c}>
              {series.map((s, si) => {
                const v = s.values[ci];
                if (v == null) return null;
                return (
                  <rect key={s.label} x={gx + si * (barW + 2)} y={y(v)} width={barW} height={Math.max(0, y(0) - y(v))} rx={2} fill={s.color ?? SERIES[si % SERIES.length]}>
                    <title>{`${s.label}, ${c}: ${format(v)}`}</title>
                  </rect>
                );
              })}
              {ci % every === 0 && (
                <text x={L + 4 + ci * groupW + groupW / 2} y={height - 8} textAnchor="middle" fontSize={10} fill={MUTED}>{c}</text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
