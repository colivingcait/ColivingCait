"use client";

import { useEffect, useState } from "react";
import { BENCH_METRICS, type BenchmarkGroup } from "@/lib/rent-ledger/benchmarks";
import { fmtMoney, fmtPct } from "@/lib/rent-ledger/metrics";
import type { HouseSummary } from "@/lib/rent-ledger/summary";
import { DataTable, Notice, Panel } from "./ui";

// Compare tab: where each of the user's houses sits against the anonymous
// benchmark groups. The server returns medians and quartiles only.

function fmt(kind: string, v: number | null | undefined) {
  if (v == null || !Number.isFinite(v)) return "–";
  if (kind === "money") return fmtMoney(v);
  if (kind === "pct") return fmtPct(v, 0);
  if (kind === "days") return `${Math.round(v)} days`;
  if (kind === "months") return v.toFixed(1);
  return v.toFixed(2);
}

function where(v: number | null | undefined, q1: number | null, q3: number | null) {
  if (v == null || q1 == null || q3 == null) return "–";
  if (v < q1) return "Below the middle half";
  if (v > q3) return "Above the middle half";
  return "In the middle half";
}

export default function Compare({
  summaries,
  names,
}: {
  summaries: HouseSummary[];
  names: Record<string, string>;
}) {
  const [data, setData] = useState<Record<string, BenchmarkGroup[]>>({});
  const [error, setError] = useState<string | null>(null);
  const key = summaries.map((s) => `${s.psid}:${s.zip}:${s.price_band}:${s.rooms}`).join("|");

  useEffect(() => {
    let live = true;
    Promise.all(
      summaries.map(async (s) => {
        const q = new URLSearchParams();
        if (s.city) q.set("city", s.city);
        if (s.state) q.set("state", s.state);
        if (s.zip) q.set("zip", s.zip);
        if (s.price_band) q.set("priceBand", s.price_band);
        if (s.rooms) q.set("rooms", String(s.rooms));
        const res = await fetch(`/api/rent-ledger/benchmarks?${q}`);
        const j = await res.json();
        if (!res.ok) throw new Error(j.error ?? "Benchmarks are unavailable.");
        return [s.psid, j.groups as BenchmarkGroup[]] as const;
      }),
    )
      .then((pairs) => live && setData(Object.fromEntries(pairs)))
      .catch((e) => live && setError(e.message));
    return () => {
      live = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  if (error) return <Notice tone="warn">{error}</Notice>;
  if (!Object.keys(data).length) return <p className="text-warmgray">Loading benchmarks…</p>;

  return (
    <div className="space-y-6">
      <Notice>
        Benchmarks use the newest anonymous snapshot of each house that opted in. A group shows once it has 5 or more
        operators and 5 or more houses. “Middle half” is the range from the 25th to the 75th percentile.
      </Notice>
      {summaries.map((s) => (
        <Panel key={s.psid} title={names[s.psid] ?? "House"}>
          <div className="space-y-5">
            {(data[s.psid] ?? []).map((g) =>
              g.enough ? (
                <div key={g.id}>
                  <p className="text-[10px] uppercase tracking-eyebrow text-warmgray mb-2">
                    {g.label} · {g.houses} houses, {g.users} operators
                  </p>
                  <DataTable
                    rows={BENCH_METRICS.filter((m) => g.metrics[m.key]?.n)}
                    columns={[
                      { key: "m", label: "Metric", render: (m) => m.label },
                      { key: "y", label: "Yours", align: "right", render: (m) => fmt(m.kind, s[m.key as keyof HouseSummary] as number | null) },
                      { key: "md", label: "Median", align: "right", render: (m) => fmt(m.kind, g.metrics[m.key].median) },
                      {
                        key: "r",
                        label: "Middle half",
                        align: "right",
                        render: (m) => `${fmt(m.kind, g.metrics[m.key].q1)}–${fmt(m.kind, g.metrics[m.key].q3)}`,
                      },
                      {
                        key: "w",
                        label: "You",
                        render: (m) => where(s[m.key as keyof HouseSummary] as number | null, g.metrics[m.key].q1, g.metrics[m.key].q3),
                      },
                    ]}
                  />
                </div>
              ) : (
                <p key={g.id} className="text-sm text-warmgray">
                  Not enough houses in {g.label} yet. You&apos;re one of {g.houses}.
                </p>
              ),
            )}
          </div>
        </Panel>
      ))}
    </div>
  );
}
