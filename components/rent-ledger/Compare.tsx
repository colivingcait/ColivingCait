"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import {
  BENCH_METRICS,
  verdict,
  type BenchmarkGroup,
  type MetricKind,
  type MetroCount,
  type Verdict,
} from "@/lib/rent-ledger/benchmarks";
import { fmtMoney, fmtPct } from "@/lib/rent-ledger/metrics";
import { RULES } from "@/lib/rent-ledger/rules";
import { mean } from "@/lib/rent-ledger/stats";
import type { HouseSummary } from "@/lib/rent-ledger/summary";
import { DataTable, Notice, Panel } from "./ui";

// Compare: the host's houses against their metro, every metro, or a metro
// they pick. The server returns aggregates only (averages and quartiles from
// 5+ operators), so no other host's numbers can be seen here.

type Scope = { kind: "mine" } | { kind: "all" } | { kind: "pick"; metro: string };

function fmt(kind: MetricKind, v: number | null | undefined) {
  if (v == null || !Number.isFinite(v)) return "–";
  if (kind === "money") return fmtMoney(v);
  if (kind === "pct") return fmtPct(v, 0);
  if (kind === "days") return `${Math.round(v)} days`;
  if (kind === "months") return v.toFixed(1);
  return v.toFixed(2);
}

const VERDICT: Record<Verdict, { label: string; icon: string; cls: string }> = {
  better: { label: "Better", icon: "▲", cls: "border-[#008300] text-[#006300]" },
  average: { label: "Average", icon: "●", cls: "border-warmgray-light text-warmgray" },
  worse: { label: "Worse", icon: "▼", cls: "border-red-700 text-red-800" },
};

function VerdictChip({ v }: { v: Verdict | null }) {
  if (!v) return <span className="text-warmgray">–</span>;
  const s = VERDICT[v];
  return (
    <span className={cn("inline-flex items-center gap-1 border px-2 py-0.5 text-[11px] uppercase tracking-button", s.cls)}>
      <span aria-hidden>{s.icon}</span>
      {s.label}
    </span>
  );
}

/** The metro most of the host's houses are in. */
export function mainMetro(summaries: HouseSummary[]): string | null {
  const counts = new Map<string, number>();
  for (const s of summaries) if (s.metro) counts.set(s.metro, (counts.get(s.metro) ?? 0) + 1);
  return [...counts].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
}

export default function Compare({
  summaries,
  names,
}: {
  summaries: HouseSummary[];
  names: Record<string, string>;
}) {
  const myMetro = mainMetro(summaries);
  const [scope, setScope] = useState<Scope>(myMetro ? { kind: "mine" } : { kind: "all" });
  const [house, setHouse] = useState<string>("all");
  const [metros, setMetros] = useState<MetroCount[]>([]);
  const [group, setGroup] = useState<BenchmarkGroup | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/rent-ledger/benchmarks?list=metros")
      .then((r) => r.json())
      .then((j) => setMetros(j.metros ?? []))
      .catch(() => {});
  }, []);

  const metro = scope.kind === "mine" ? myMetro : scope.kind === "pick" ? scope.metro : null;
  useEffect(() => {
    let live = true;
    setGroup(null);
    setError(null);
    const q = metro ? `metro=${encodeURIComponent(metro)}` : "scope=all";
    fetch(`/api/rent-ledger/benchmarks?${q}`)
      .then(async (r) => {
        const j = await r.json();
        if (!r.ok) throw new Error(j.error ?? "Benchmarks are unavailable.");
        if (live) setGroup(j.group);
      })
      .catch((e) => live && setError(e.message));
    return () => {
      live = false;
    };
  }, [metro]);

  // "You": one house, or the average across the host's houses.
  const mine = useMemo(() => {
    const picked = house === "all" ? summaries : summaries.filter((s) => s.psid === house);
    const out: Record<string, number | null> = {};
    for (const m of BENCH_METRICS) {
      const vals = picked
        .map((s) => s[m.key as keyof HouseSummary])
        .filter((v): v is number => typeof v === "number" && Number.isFinite(v));
      out[m.key] = mean(vals);
    }
    return out;
  }, [summaries, house]);

  const rows = group?.enough ? BENCH_METRICS.filter((m) => group.metrics[m.key]?.n) : [];
  const verdicts = rows.map((m) => verdict(mine[m.key], group!.metrics[m.key], m.better));
  const tally = (v: Verdict) => verdicts.filter((x) => x === v).length;

  return (
    <div className="space-y-6">
      <Notice>
        Every host who unlocks a report adds their houses to these benchmarks. Other hosts only ever see averages from
        groups of {RULES.benchmarkMinUsers}+ operators and {RULES.benchmarkMinHouses}+ houses, never anyone&apos;s
        individual numbers, names or addresses. Caitlyn can see each host&apos;s house-level numbers. Nobody ever sees your
        residents: that data never leaves your browser.
      </Notice>

      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex border border-brand">
          {myMetro && (
            <ScopeButton active={scope.kind === "mine"} onClick={() => setScope({ kind: "mine" })}>
              My metro · {myMetro}
            </ScopeButton>
          )}
          <ScopeButton active={scope.kind === "all"} onClick={() => setScope({ kind: "all" })}>
            All metros
          </ScopeButton>
        </div>
        <label className="flex items-center gap-2 text-sm text-charcoal">
          <span className="text-[10px] uppercase tracking-eyebrow text-warmgray">Or pick a metro</span>
          <select
            className="border border-brand bg-white px-2 py-1"
            value={scope.kind === "pick" ? scope.metro : ""}
            onChange={(e) => setScope(e.target.value ? { kind: "pick", metro: e.target.value } : { kind: "all" })}
          >
            <option value="">Choose…</option>
            {metros.map((m) => (
              <option key={m.metro} value={m.metro}>
                {m.metro} ({m.houses} house{m.houses === 1 ? "" : "s"}
                {m.enough ? "" : ", not enough yet"})
              </option>
            ))}
          </select>
        </label>
        {summaries.length > 1 && (
          <label className="flex items-center gap-2 text-sm text-charcoal">
            <span className="text-[10px] uppercase tracking-eyebrow text-warmgray">Compare</span>
            <select className="border border-brand bg-white px-2 py-1" value={house} onChange={(e) => setHouse(e.target.value)}>
              <option value="all">My houses (average)</option>
              {summaries.map((s) => (
                <option key={s.psid} value={s.psid}>
                  {names[s.psid] ?? "House"}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      {error ? (
        <Notice tone="warn">{error}</Notice>
      ) : !group ? (
        <p className="text-warmgray">Loading benchmarks…</p>
      ) : !group.enough ? (
        <Notice>
          Not enough houses in {group.label} yet. You&apos;re one of {group.houses} house{group.houses === 1 ? "" : "s"} from{" "}
          {group.users} operator{group.users === 1 ? "" : "s"}; numbers show once there are {RULES.benchmarkMinUsers}+
          operators and {RULES.benchmarkMinHouses}+ houses. Try All metros.
        </Notice>
      ) : (
        <Panel title={`${house === "all" ? "Your houses" : names[house]} vs ${group.label}`}>
          <p className="text-sm text-warmgray mb-4">
            {group.houses} houses from {group.users} operators. Better on {tally("better")}, average on {tally("average")},
            worse on {tally("worse")}. Average means inside the middle half of houses (25th to 75th percentile).
          </p>
          <DataTable
            rows={rows}
            columns={[
              { key: "m", label: "Metric", render: (m) => m.label },
              { key: "y", label: "You", align: "right", render: (m) => fmt(m.kind, mine[m.key]) },
              { key: "a", label: `${group.label} average`, align: "right", render: (m) => fmt(m.kind, group.metrics[m.key].mean) },
              {
                key: "r",
                label: "Middle half",
                align: "right",
                render: (m) => `${fmt(m.kind, group.metrics[m.key].q1)}–${fmt(m.kind, group.metrics[m.key].q3)}`,
              },
              { key: "v", label: "", render: (m) => <VerdictChip v={verdict(mine[m.key], group.metrics[m.key], m.better)} /> },
            ]}
          />
        </Panel>
      )}
    </div>
  );
}

function ScopeButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-4 py-2 text-[11px] uppercase tracking-button",
        active ? "bg-charcoal text-white" : "bg-white text-charcoal hover:bg-cream",
      )}
    >
      {children}
    </button>
  );
}
