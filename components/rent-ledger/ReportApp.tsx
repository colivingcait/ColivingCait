"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { analyze } from "@/lib/rent-ledger";
import { computeReport, type ReportOptions } from "@/lib/rent-ledger/metrics";
import { addMonths, dayToISO, monthLabel, type RawFiles } from "@/lib/rent-ledger/parse";
import { buildHouseSummaries, type HouseSummary } from "@/lib/rent-ledger/summary";
import Compare from "./Compare";
import ChecksList from "./ChecksList";
import { reportStats } from "./RentLedgerTool";
import {
  BreakageTab,
  CollectionsTab,
  CreditsTab,
  DataCheckTab,
  PricingTab,
  RampTab,
  RequestsTab,
  SignalsTab,
  StaysTab,
  SummaryTab,
  type TabProps,
} from "./ReportTabs";
import { loadState, patchState, saveState, type StoredState } from "./store";
import Uploader from "./Uploader";
import { DataTable, Notice, Panel } from "./ui";

// The full report (signed-in). Everything is computed from the export kept
// in this browser's IndexedDB; only lead answers and the per-house summaries
// (added to the benchmarks on first load) are sent to the server.

const TABS = [
  ["summary", "Summary"],
  ["requests", "Booking requests"],
  ["stays", "Stays"],
  ["collections", "Collections"],
  ["breakage", "Breakage"],
  ["credits", "Credits"],
  ["signals", "Warning signs"],
  ["ramp", "Ramp-up & stability"],
  ["pricing", "Pricing"],
  ["data", "Data check"],
  ["compare", "Compare"],
] as const;
type TabId = (typeof TABS)[number][0];

type Period = "all" | "12" | "custom";

interface Account {
  signedIn: boolean;
  email?: string;
  contributed?: boolean;
  profile?: { city?: string | null; state?: string | null; metro?: string | null } | null;
}

export default function ReportApp({ initialTab = "summary" }: { initialTab?: TabId }) {
  const [state, setState] = useState<StoredState | null | undefined>(undefined);
  const [account, setAccount] = useState<Account | null>(null);
  const [tab, setTab] = useState<TabId>(initialTab);
  const [period, setPeriod] = useState<Period>("all");
  const [custom, setCustom] = useState<{ start: string; end: string } | null>(null);
  const [includeOutliers, setIncludeOutliers] = useState(false);
  const [showNames, setShowNames] = useState(false);

  useEffect(() => {
    loadState().then(setState);
    fetch("/api/rent-ledger/save")
      .then((r) => r.json())
      .then(setAccount)
      .catch(() => setAccount({ signedIn: false }));
  }, []);

  const analysis = useMemo(() => (state ? analyze(state.files) : null), [state]);
  const ledger = analysis?.ledger ?? null;
  const rooms = useMemo(() => state?.rooms ?? {}, [state]);

  const allMonths = useMemo(() => (ledger ? computeReport(ledger).allMonths : []), [ledger]);
  const range: ReportOptions["range"] = useMemo(() => {
    if (!allMonths.length || period === "all") return null;
    const end = allMonths[allMonths.length - 1];
    if (period === "12") return { start: addMonths(end, -11), end };
    return custom ?? { start: allMonths[0], end };
  }, [allMonths, period, custom]);

  const report = useMemo(
    () => (ledger && !analysis?.blocked ? computeReport(ledger, { range, includeOutliers, rooms }) : null),
    [ledger, analysis, range, includeOutliers, rooms],
  );
  // Benchmarks and the CRM always use all months with outliers out.
  const baseReport = useMemo(
    () => (ledger && !analysis?.blocked ? computeReport(ledger, { rooms }) : null),
    [ledger, analysis, rooms],
  );

  // Save the unlock answers to the signed-in profile once.
  useEffect(() => {
    if (!state?.lead || state.profileSaved || !account?.signedIn || !baseReport) return;
    fetch("/api/rent-ledger/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "profile",
        lead: { ...state.lead, houseCount: Number(state.lead.houseCount) || undefined },
        stats: reportStats(baseReport),
      }),
    }).then((r) => {
      if (r.ok) patchState({ profileSaved: true });
    });
  }, [state, account, baseReport]);

  const order = useMemo(() => {
    const m = new Map<string, number>();
    ledger?.residents.forEach((r, i) => m.set(r.key, i + 1));
    return m;
  }, [ledger]);

  const location = {
    city: state?.lead?.city || account?.profile?.city || "",
    state: state?.lead?.state || account?.profile?.state || "",
    zips: state?.lead?.zips,
    metros: state?.lead?.metros,
  };
  const summaries = useMemo<HouseSummary[]>(
    () => (ledger && baseReport ? buildHouseSummaries(ledger, baseReport, location) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ledger, baseReport, location.city, location.state, JSON.stringify(location.zips ?? {}), JSON.stringify(location.metros ?? {})],
  );

  // Unlocking adds the houses to the benchmarks: one snapshot per upload.
  const [contribution, setContribution] = useState<"saving" | "saved" | "error" | null>(null);
  useEffect(() => {
    if (!account?.signedIn || !state || !baseReport || !summaries.length) return;
    if (state.contributedFor === state.savedAt || contribution === "saving") return;
    setContribution("saving");
    fetch("/api/rent-ledger/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "benchmark", houses: summaries, stats: reportStats(baseReport) }),
    })
      .then((r) => {
        if (!r.ok) throw new Error();
        patchState({ contributedFor: state.savedAt });
        setState((cur) => (cur ? { ...cur, contributedFor: cur.savedAt } : cur));
        setAccount((a) => (a ? { ...a, contributed: true } : a));
        setContribution("saved");
      })
      .catch(() => setContribution("error"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account?.signedIn, state?.savedAt, state?.contributedFor, baseReport, summaries]);

  function onFiles(raw: RawFiles, name: string) {
    const next: StoredState = {
      ...(state ?? {}),
      files: raw,
      sourceName: name,
      savedAt: new Date().toISOString(),
    };
    saveState(next);
    setState(next);
  }

  if (state === undefined) return <p className="text-warmgray">Loading your report…</p>;

  if (!state || !analysis) {
    return (
      <div className="space-y-5">
        <Notice>
          Your export lives only in the browser you uploaded it from, and this one doesn&apos;t have it. Drop the file
          again to rebuild your report.
        </Notice>
        <Uploader onFiles={onFiles} compact />
      </div>
    );
  }

  if (analysis.blocked || !report || !ledger) {
    return (
      <div className="space-y-5">
        <Notice tone="fail">This export didn&apos;t pass the checks, so there&apos;s no report for it.</Notice>
        <ChecksList checks={analysis.checks} />
        <Uploader onFiles={onFiles} compact />
      </div>
    );
  }

  const houseName = (id: string) => ledger.houseById.get(id)?.name ?? id;
  const props: TabProps = {
    report,
    analysis,
    showNames,
    name: (key, n) => (showNames ? n : `Resident ${order.get(key) ?? "?"}`),
    houseName,
    rooms,
    onRooms: (houseId, n) => {
      const next = { ...rooms, [houseId]: n > 0 ? n : 0 };
      patchState({ rooms: next });
      setState({ ...state, rooms: next });
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-warmgray">
            {state.sourceName} · {ledger.houses.length} houses · {dayToISO(ledger.exportStart)} to {dayToISO(ledger.exportEnd)}
          </p>
        </div>
        <details className="text-sm">
          <summary className="cursor-pointer text-gold-dark underline underline-offset-4">Upload a newer export</summary>
          <div className="mt-3 w-[min(90vw,420px)]">
            <Uploader onFiles={onFiles} compact />
          </div>
        </details>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border border-brand bg-cream px-4 py-3 text-sm text-charcoal">
        <label className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-eyebrow text-warmgray">Period</span>
          <select className="border border-brand bg-white px-2 py-1" value={period} onChange={(e) => setPeriod(e.target.value as Period)}>
            <option value="all">All months</option>
            <option value="12">Last 12 months</option>
            <option value="custom">Custom</option>
          </select>
        </label>
        {period === "custom" && (
          <span className="flex items-center gap-2">
            <MonthSelect months={allMonths} value={range?.start ?? allMonths[0]} onChange={(start) => setCustom({ start, end: range?.end ?? allMonths[allMonths.length - 1] })} />
            <span>to</span>
            <MonthSelect months={allMonths} value={range?.end ?? allMonths[allMonths.length - 1]} onChange={(end) => setCustom({ start: range?.start ?? allMonths[0], end })} />
          </span>
        )}
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={includeOutliers} onChange={(e) => setIncludeOutliers(e.target.checked)} />
          Include outliers
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={showNames} onChange={(e) => setShowNames(e.target.checked)} />
          Show names
        </label>
      </div>

      <nav className="-mx-1 overflow-x-auto">
        <ul className="flex min-w-max border-b border-brand">
          {TABS.map(([id, label]) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => setTab(id)}
                className={cn(
                  "px-3 py-2.5 text-[11px] uppercase tracking-button whitespace-nowrap border-b-2 -mb-px",
                  tab === id ? "border-gold text-charcoal" : "border-transparent text-warmgray hover:text-charcoal",
                )}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div>
        {tab === "summary" && <SummaryTab {...props} />}
        {tab === "requests" && <RequestsTab {...props} />}
        {tab === "stays" && <StaysTab {...props} />}
        {tab === "collections" && <CollectionsTab {...props} />}
        {tab === "breakage" && <BreakageTab {...props} />}
        {tab === "credits" && <CreditsTab {...props} />}
        {tab === "signals" && <SignalsTab {...props} />}
        {tab === "ramp" && <RampTab {...props} />}
        {tab === "pricing" && <PricingTab {...props} />}
        {tab === "data" && <DataCheckTab {...props} />}
        {tab === "compare" &&
          (account?.contributed ? (
            <Compare summaries={summaries} names={Object.fromEntries(ledger.houses.map((h) => [h.id, h.name]))} />
          ) : (
            <Notice>{contribution === "error" ? "We couldn't add your houses yet, so Compare isn't ready. Reload to try again." : "Adding your houses to the benchmark…"}</Notice>
          ))}
      </div>

      {account?.signedIn && baseReport && (
        <>
          <Questions state={state} stats={reportStats(baseReport)} onAnswer={(interests) => setState({ ...state, interests })} />
          <Contribution
            summaries={summaries}
            names={Object.fromEntries(ledger.houses.map((h) => [h.id, h.name]))}
            status={contribution}
          />
        </>
      )}
    </div>
  );
}

function MonthSelect({ months, value, onChange }: { months: string[]; value: string; onChange: (m: string) => void }) {
  return (
    <select className="border border-brand bg-white px-2 py-1" value={value} onChange={(e) => onChange(e.target.value)}>
      {months.map((m) => (
        <option key={m} value={m}>
          {monthLabel(m)}
        </option>
      ))}
    </select>
  );
}

const QUESTIONS = [
  ["selling", "Thinking about selling a house?"],
  ["buying", "Looking to buy an occupied coliving house?"],
  ["partnering", "Open to partnering or co-investing?"],
  ["help", "Want help improving these numbers?"],
] as const;

function Questions({
  state,
  stats,
  onAnswer,
}: {
  state: StoredState;
  stats: ReturnType<typeof reportStats>;
  onAnswer: (i: Record<string, boolean>) => void;
}) {
  const answers = state.interests ?? {};
  async function answer(k: string, v: boolean) {
    const next = { ...answers, [k]: v };
    onAnswer(next);
    patchState({ interests: next });
    await fetch("/api/rent-ledger/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "interests", interests: { [k]: v }, stats }),
    }).catch(() => {});
  }
  return (
    <Panel title="A few quick questions (optional)">
      <ul className="divide-y divide-soft">
        {QUESTIONS.map(([k, q]) => (
          <li key={k} className="flex flex-wrap items-center justify-between gap-3 py-3">
            <span className="text-charcoal">{q}</span>
            <span className="flex gap-2">
              {[true, false].map((v) => (
                <button
                  key={String(v)}
                  type="button"
                  onClick={() => answer(k, v)}
                  className={cn(
                    "px-4 py-1.5 text-xs uppercase tracking-button border",
                    answers[k] === v ? "border-charcoal bg-charcoal text-white" : "border-brand text-charcoal hover:border-gold",
                  )}
                >
                  {v ? "Yes" : "No"}
                </button>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function Contribution({
  summaries,
  names,
  status,
}: {
  summaries: HouseSummary[];
  names: Record<string, string>;
  status: "saving" | "saved" | "error" | null;
}) {
  return (
    <Panel title="Your houses in the benchmark">
      <p className="text-warmgray leading-relaxed">
        Unlocking your report adds your houses&apos; numbers to the benchmarks, which is how every host gets something to
        compare against. Other hosts only see averages from groups of 5+ operators, never your numbers, name or
        addresses. Caitlyn can see your house-level numbers. Your residents&apos; names and rows never leave this browser.
        Upload a newer export any month and your houses update.
      </p>
      {status && (
        <p className="mt-3 text-sm text-charcoal">
          {status === "saving" && "Adding your houses…"}
          {status === "saved" && "Your houses are in the benchmark."}
          {status === "error" && "We couldn't add your houses just now. We'll try again next time you open the report."}
        </p>
      )}
      <details className="mt-4">
        <summary className="cursor-pointer text-sm text-gold-dark underline underline-offset-4">
          Exactly what&apos;s saved ({summaries.length} house{summaries.length === 1 ? "" : "s"})
        </summary>
        <div className="mt-3">
          <DataTable
            rows={summaries}
            columns={[
              { key: "h", label: "House", render: (s) => names[s.psid] },
              { key: "mt", label: "Metro", render: (s) => s.metro ?? "–" },
              { key: "r", label: "Rooms", align: "right", render: (s) => s.rooms ?? "–" },
              { key: "b", label: "Price band", render: (s) => s.price_band ?? "–" },
              { key: "m", label: "Months", align: "right", render: (s) => s.months_covered },
              { key: "c", label: "Collection rate", align: "right", render: (s) => (s.collection_rate == null ? "–" : `${(s.collection_rate * 100).toFixed(1)}%`) },
              { key: "k", label: "Breakage / house-month", align: "right", render: (s) => (s.breakage_per_house_month == null ? "–" : `$${Math.round(s.breakage_per_house_month)}`) },
            ]}
          />
          <p className="mt-3 text-xs text-warmgray leading-relaxed">
            Each house also carries: collected per house-month, breakage rate, move-outs, left-owing rate, median balance,
            average stay, short and long stay shares, requests, acceptance rate, months to stabilize, events per year,
            average occupancy, true room rate, city, zip and the rules version. Its street address is kept for Caitlyn
            only. The PadSplit property ID is hashed and never stored. Never saved: resident names, member, room or bill
            IDs, payout account, any resident row, or the file.
          </p>
        </div>
      </details>
    </Panel>
  );
}
