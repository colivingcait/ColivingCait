"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { analyze, type Analysis } from "@/lib/rent-ledger";
import { GROUP_LABELS, type Ledger, type Resident, type ResidentGroup } from "@/lib/rent-ledger/classify";
import { blockingFailures } from "@/lib/rent-ledger/checks";
import { computeReport, fmtMoney, fmtPct, type Report } from "@/lib/rent-ledger/metrics";
import { dayToISO, monthLabel, type RawFiles } from "@/lib/rent-ledger/parse";
import { buildFeedback } from "@/lib/rent-ledger/summary";
import { BROKERAGE_DISCLOSURE } from "@/lib/rent-ledger/copy";
import { METROS, houseMetros } from "@/lib/rent-ledger/metros";
import ChecksList from "./ChecksList";
import Uploader from "./Uploader";
import { patchState, saveState, type LeadAnswers } from "./store";
import { Notice, RateText, Stat, inputClass, labelClass } from "./ui";

type Step = "upload" | "review" | "preview";

export const REPORT_PATH = "/tools/rent-ledger/report";

export function reportStats(report: Report) {
  const p = report.portfolio;
  return {
    houses: report.houses.length,
    breakageRate: p.breakageRate.value ?? 0,
    breakagePerHouseMonth: p.breakagePerHouseMonth.value ?? 0,
    collectionRate: p.collectionRate.value ?? 0,
    turnover: p.turnover.value ?? undefined,
  };
}

export default function RentLedgerTool() {
  const [step, setStep] = useState<Step>("upload");
  const [files, setFiles] = useState<{ raw: RawFiles; name: string } | null>(null);
  const analysis = useMemo<Analysis | null>(() => (files ? analyze(files.raw) : null), [files]);
  const report = useMemo(
    () => (analysis?.ledger && !analysis.blocked ? computeReport(analysis.ledger) : null),
    [analysis],
  );

  function onFiles(raw: RawFiles, name: string) {
    setFiles({ raw, name });
    setStep("review");
    saveState({ files: raw, sourceName: name, savedAt: new Date().toISOString() });
  }

  return (
    <div className="space-y-8">
      {step === "upload" || !analysis ? (
        <div>
          <p className="eyebrow">Step 1 · Upload</p>
          <Uploader onFiles={onFiles} />
        </div>
      ) : analysis.blocked ? (
        <Blocked analysis={analysis} onReset={() => setStep("upload")} />
      ) : step === "review" ? (
        <Review analysis={analysis} report={report!} onConfirm={() => setStep("preview")} onReset={() => setStep("upload")} />
      ) : (
        <>
          <Preview analysis={analysis} report={report!} />
          <UnlockForm report={report!} ledger={analysis.ledger!} />
        </>
      )}
    </div>
  );
}

function Blocked({ analysis, onReset }: { analysis: Analysis; onReset: () => void }) {
  const failed = blockingFailures(analysis.checks);
  return (
    <div className="space-y-5">
      <Notice tone="fail">
        <p className="font-medium">We stopped before building a report, because the numbers wouldn&apos;t be trustworthy.</p>
        <ul className="mt-2 list-disc pl-5 space-y-1">
          {failed.map((c) => (
            <li key={c.id}>{c.detail}</li>
          ))}
        </ul>
      </Notice>
      <ChecksList checks={analysis.checks} />
      <button type="button" onClick={onReset} className="btn-primary">
        Try another file
      </button>
    </div>
  );
}

const ORDER: ResidentGroup[] = ["never", "movedOut", "living", "unclassified"];

function Review({
  analysis,
  report,
  onConfirm,
  onReset,
}: {
  analysis: Analysis;
  report: Report;
  onConfirm: () => void;
  onReset: () => void;
}) {
  const [showNames, setShowNames] = useState(false);
  const [sent, setSent] = useState(false);
  const ledger = analysis.ledger!;
  const sample = (g: ResidentGroup) => ledger.residents.filter((r) => r.group === g).slice(0, 5);
  const warnings = analysis.checks.filter((c) => c.status !== "pass");

  async function lookOff() {
    setSent(true);
    await fetch("/api/rent-ledger/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildFeedback(ledger, report, analysis.checks)),
    }).catch(() => {});
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Step 2 · Does this look right?</p>
        <h2 className="font-heading text-3xl md:text-4xl text-charcoal">Here&apos;s how we sorted your residents.</h2>
        <p className="mt-3 text-warmgray max-w-2xl">
          {ledger.houses.length} houses, {dayToISO(ledger.exportStart)} to {dayToISO(ledger.exportEnd)}. Every
          resident at each house lands in exactly one group. A booking request that was refunded in full counts as
          never moved in.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {ORDER.map((g) => (
          <Stat key={g} label={GROUP_LABELS[g]} value={report.groups[g]} />
        ))}
      </div>
      <div className="flex items-center gap-2 text-sm text-warmgray">
        <input id="names-review" type="checkbox" checked={showNames} onChange={(e) => setShowNames(e.target.checked)} />
        <label htmlFor="names-review">Show names (they stay in this browser either way)</label>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {(["never", "movedOut"] as const).map((g) => (
          <SampleTable key={g} title={`${GROUP_LABELS[g]}: 5 examples`} rows={sample(g)} showNames={showNames} ledger={ledger} />
        ))}
      </div>
      {warnings.length > 0 && (
        <div>
          <p className="text-sm text-charcoal mb-2">A few things worth knowing (the report still runs):</p>
          <ChecksList checks={warnings} showNames={showNames} />
        </div>
      )}
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={onConfirm} className="btn-primary">
          Yes, looks right →
        </button>
        <button type="button" onClick={lookOff} disabled={sent} className="btn-outline">
          {sent ? "Thanks, we'll look into it" : "Something looks off"}
        </button>
        <button type="button" onClick={onReset} className="text-sm text-warmgray underline underline-offset-4">
          Use a different file
        </button>
      </div>
      {sent && (
        <p className="text-xs text-warmgray">
          We sent the group counts, check results and date range only. No names, rows or files. You can keep going.
        </p>
      )}
    </div>
  );
}

function SampleTable({
  title,
  rows,
  showNames,
  ledger,
}: {
  title: string;
  rows: Resident[];
  showNames: boolean;
  ledger: NonNullable<Analysis["ledger"]>;
}) {
  return (
    <div className="border border-brand bg-white p-4">
      <p className="text-[10px] uppercase tracking-eyebrow text-warmgray mb-2">{title}</p>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[10px] uppercase tracking-eyebrow text-warmgray">
            <th className="py-1 font-medium">Resident</th>
            <th className="py-1 font-medium">House</th>
            <th className="py-1 font-medium">Dates</th>
            <th className="py-1 font-medium text-right">Paid</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.key} className="border-t border-soft">
              <td className="py-1.5 text-charcoal">{showNames ? r.name : `Resident ${i + 1}`}</td>
              <td className="py-1.5 text-warmgray">{ledger.houseById.get(r.houseId)?.name}</td>
              <td className="py-1.5 text-warmgray whitespace-nowrap">
                {dayToISO(r.firstDay).slice(5)} → {dayToISO(r.lastDay).slice(5)}
              </td>
              <td className="py-1.5 text-right tabular-nums">{fmtMoney(r.netCollected)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Preview({ analysis, report }: { analysis: Analysis; report: Report }) {
  const p = report.portfolio;
  const months = report.months;
  return (
    <div className="space-y-5">
      <div>
        <p className="eyebrow">Step 3 · Your free preview</p>
        <h2 className="font-heading text-3xl md:text-4xl text-charcoal">The headline numbers.</h2>
        <p className="mt-3 text-warmgray max-w-2xl">
          {months.length ? `${monthLabel(months[0])} to ${monthLabel(months[months.length - 1])}.` : ""} Breakage is the
          money residents left without paying when they moved out.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <Stat label="Houses" value={analysis.ledger!.houses.length} />
        <Stat label="Months covered" value={months.length} />
        <Stat
          label="Collection rate"
          value={fmtPct(p.collectionRate.value)}
          sub="Collected ÷ (collected + breakage)"
          title={`${fmtMoney(p.collected)} of ${fmtMoney(p.collectionRate.den)}`}
        />
        <Stat
          label="Breakage rate"
          value={fmtPct(p.breakageRate.value)}
          sub={`${fmtMoney(p.breakage)} left unpaid`}
        />
        <Stat
          label="Breakage per house-month"
          value={fmtMoney(p.breakagePerHouseMonth.value)}
          sub={`Over ${p.houseMonths} house-months`}
        />
      </div>
      {report.outliers.list.length > 0 && (
        <p className="text-sm text-warmgray">
          One-off balances are left out of these rates ({report.outliers.list.length} outlier
          {report.outliers.list.length > 1 ? "s" : ""}, {fmtMoney(report.outliers.list.reduce((a, o) => a + o.balance, 0))}).
          The full report shows both.
        </p>
      )}
      <p className="text-sm text-warmgray">
        {p.leftOwing.n} of {p.moveOuts} move-outs left owing (<RateText rate={p.leftOwing} unit="move-outs" />). The
        full report has warning signs, a watch list of current residents, booking requests, stays, credits, pricing, and
        ramp-up for each house.
      </p>
    </div>
  );
}

function UnlockForm({ report, ledger }: { report: Report; ledger: Ledger }) {
  // Metro per house starts from the export's "PadSplit Market" column.
  const detected = useMemo(() => houseMetros(ledger), [ledger]);
  const counts = new Map<string, number>();
  for (const m of Object.values(detected)) counts.set(m, (counts.get(m) ?? 0) + 1);
  const defaultMetro = [...counts].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "";
  const router = useRouter();
  const { data: session } = useSession();
  const [form, setForm] = useState<LeadAnswers>({
    firstName: "",
    lastName: "",
    email: session?.user?.email ?? "",
    city: "",
    state: "",
    zips: {},
    metro: defaultMetro,
    metros: Object.fromEntries(report.houses.map((h) => [h.id, detected[h.id] ?? defaultMetro])),
    operatorType: "",
    houseCount: String(report.houses.length),
    consentReport: false,
    consentContact: false,
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);
  const set = <K extends keyof LeadAnswers>(k: K, v: LeadAnswers[K]) => setForm((f) => ({ ...f, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.consentReport) {
      setError("Tick the box so we can email you your report.");
      return;
    }
    setStatus("sending");
    const res = await fetch("/api/rent-ledger/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "unlock",
        lead: { ...form, houseCount: Number(form.houseCount) || undefined },
        stats: reportStats(report),
      }),
    }).catch(() => null);
    if (res && !res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j.error ?? "Something went wrong. Try again.");
      setStatus("idle");
      return;
    }
    await patchState({ lead: form, profileSaved: false });
    if (session?.user?.email && session.user.email.toLowerCase() === form.email.trim().toLowerCase()) {
      router.push(REPORT_PATH);
      return;
    }
    await signIn("email", { email: form.email.trim(), callbackUrl: REPORT_PATH, redirect: false });
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="border border-gold bg-gold/[0.06] p-6 md:p-8">
        <p className="font-heading text-2xl text-charcoal">Check your email ✦</p>
        <p className="mt-2 text-warmgray leading-body">
          We sent a sign-in link to <strong className="text-charcoal">{form.email}</strong>. Open it in this browser and
          your full report will be waiting; your file stays here on this device.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="border border-brand bg-cream p-6 md:p-10 space-y-5">
      <div>
        <p className="eyebrow">Step 4 · Unlock the full report</p>
        <h2 className="font-heading text-3xl md:text-4xl text-charcoal">Free. Just tell me where to send it.</h2>
        <p className="mt-2 text-warmgray">We&apos;ll email you a sign-in link. No password, no paywall.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="First name" value={form.firstName} onChange={(v) => set("firstName", v)} required />
        <Field label="Last name" value={form.lastName} onChange={(v) => set("lastName", v)} required />
        <Field label="Email" type="email" value={form.email} onChange={(v) => set("email", v)} required />
        <div className="grid grid-cols-[1fr_90px] gap-3">
          <Field label="City" value={form.city} onChange={(v) => set("city", v)} required />
          <Field label="State" value={form.state} onChange={(v) => set("state", v.toUpperCase().slice(0, 2))} required />
        </div>
        <div>
          <label className={labelClass} htmlFor="rl-operator">I&apos;m a…</label>
          <select id="rl-operator" required className={inputClass} value={form.operatorType} onChange={(e) => set("operatorType", e.target.value)}>
            <option value="">Choose one</option>
            <option value="owner">Owner</option>
            <option value="arbitrage">Lease arbitrage</option>
            <option value="both">Both</option>
            <option value="pm">Property manager</option>
          </select>
        </div>
        <Field label="Number of houses" type="number" value={form.houseCount} onChange={(v) => set("houseCount", v)} required />
        <MetroField
          id="rl-metro"
          label="Metro (for benchmarks)"
          value={form.metro}
          onChange={(v) => setForm((f) => ({ ...f, metro: v, metros: Object.fromEntries(report.houses.map((h) => [h.id, v])) }))}
        />
      </div>
      <details className="text-sm text-warmgray">
        <summary className="cursor-pointer">Houses in different metros? Set a metro and zip per house (zip optional)</summary>
        <div className="mt-3 space-y-3">
          {report.houses.map((h) => (
            <div key={h.id} className="grid md:grid-cols-[1fr_1fr_120px] gap-3 items-end">
              <p className="text-charcoal pb-2.5">{h.name}</p>
              <MetroField
                id={`rl-metro-${h.id}`}
                label="Metro"
                value={form.metros[h.id] ?? form.metro}
                onChange={(v) => set("metros", { ...form.metros, [h.id]: v })}
              />
              <Field
                id={`rl-zip-${h.id}`}
                label="Zip"
                value={form.zips[h.id] ?? ""}
                onChange={(v) => set("zips", { ...form.zips, [h.id]: v.replace(/\D/g, "").slice(0, 5) })}
              />
            </div>
          ))}
        </div>
      </details>
      <div className="border-l-2 border-gold pl-4 text-sm text-charcoal leading-relaxed">
        <p className="font-medium">Unlocking adds your houses to the benchmarks.</p>
        <p className="mt-1 text-warmgray">
          That&apos;s how every host gets to see how they compare with their metro. Other hosts only ever see anonymous
          averages from groups of 5+ operators, never your numbers, name or addresses. Caitlyn can see your house-level
          numbers. Your file and your residents&apos; names never leave this browser.
        </p>
      </div>
      <label className="flex items-start gap-3 text-sm text-charcoal">
        <input type="checkbox" className="mt-1" checked={form.consentReport} onChange={(e) => set("consentReport", e.target.checked)} required />
        <span>Email me my report and occasional coliving tips.</span>
      </label>
      <label className="flex items-start gap-3 text-sm text-charcoal">
        <input type="checkbox" className="mt-1" checked={form.consentContact} onChange={(e) => set("consentContact", e.target.checked)} />
        <span>
          Contact me about buying, selling, or partnering on coliving houses.
          <span className="block text-xs text-warmgray mt-1">{BROKERAGE_DISCLOSURE}</span>
        </span>
      </label>
      {error && <p className="text-sm text-red-700">{error}</p>}
      <button type="submit" disabled={status === "sending"} className="btn-primary disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Send my report link →"}
      </button>
      <p className="text-xs text-warmgray">
        We save your answers and each house&apos;s headline numbers (like breakage rate), never your file or anything
        about your residents.
      </p>
    </form>
  );
}

function Field({
  id: idProp,
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  id?: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  const id = idProp ?? `rl-${label.toLowerCase().replace(/\W+/g, "-")}`;
  return (
    <div>
      <label htmlFor={id} className={labelClass}>{label}</label>
      <input id={id} type={type} required={required} value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} min={type === "number" ? 1 : undefined} />
    </div>
  );
}

function MetroField({ id, label, value, onChange }: { id: string; label: string; value: string; onChange: (v: string) => void }) {
  const known = (METROS as readonly string[]).includes(value);
  const [other, setOther] = useState(!known && !!value);
  return (
    <div>
      <label htmlFor={id} className={labelClass}>{label}</label>
      {other ? (
        <div className="flex gap-2">
          <input id={id} required value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} placeholder="Metro name" />
          <button type="button" className="text-xs text-gold-dark underline" onClick={() => { setOther(false); onChange(""); }}>
            List
          </button>
        </div>
      ) : (
        <select
          id={id}
          required
          className={inputClass}
          value={known ? value : ""}
          onChange={(e) => (e.target.value === "__other" ? setOther(true) : onChange(e.target.value))}
        >
          <option value="">Choose one</option>
          {METROS.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
          <option value="__other">Other…</option>
        </select>
      )}
    </div>
  );
}
