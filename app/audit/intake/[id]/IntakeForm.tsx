"use client";

import { useEffect, useRef, useState } from "react";
import { analytics } from "@/lib/analytics";
import s from "./intake.module.css";

export type IntakeLead = {
  id: string;
  name: string;
  email: string;
  housesLabel: string;
  payment: string;
  completed: boolean;
};

type Kind = "pnl" | "outside" | "padsplit";
type Upload = {
  key: string;
  kind: Kind;
  name: string;
  size: number;
  progress: number;
  status: "uploading" | "done" | "error";
  path?: string;
  error?: string;
  file: File;
};

const ACCEPT = ".pdf,.xlsx,.xls,.csv,.zip";
const ALLOWED = ["pdf", "xlsx", "xls", "csv", "zip"];
const MAX_BYTES = 50 * 1024 * 1024;
const PROXY_MAX = 4 * 1024 * 1024;
const PADSPLIT_EMAIL = "ColivingCait@gmail.com";

const ext = (n: string) => (n.toLowerCase().match(/\.([a-z0-9]+)$/) ?? [])[1] ?? "";
const fmt = (b: number) => (b >= 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`);
const first = (n: string) => n.trim().split(/\s+/)[0] || n;

/** PUT a file to a signed storage URL, reporting progress. */
function putFile(url: string, file: File, onProgress: (p: number) => void) {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", url);
    xhr.setRequestHeader("x-upsert", "false");
    xhr.upload.onprogress = (e) => e.lengthComputable && onProgress(e.loaded / e.total);
    xhr.onload = () => (xhr.status >= 200 && xhr.status < 300 ? resolve() : reject(new Error(`status ${xhr.status}`)));
    xhr.onerror = () => reject(new Error("network"));
    const body = new FormData();
    body.append("cacheControl", "3600");
    body.append("", file);
    xhr.send(body);
  });
}

function FileDrop({
kind,
label,
uploads,
onAdd,
onRetry,
onRemove,
}: {
kind: Kind;
label: string;
uploads: Upload[];
onAdd: (kind: Kind, files: FileList | null) => void;
onRetry: (u: Upload) => void;
onRemove: (key: string) => void;
}) {
  const [over, setOver] = useState(false);
  const mine = uploads.filter((u) => u.kind === kind);
  return (
    <>
      <label
        className={`${s.drop} ${over ? s.dropOver : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          onAdd(kind, e.dataTransfer.files);
        }}
      >
        <b>{label}</b>
        <small>PDF, Excel or CSV{kind === "padsplit" ? " or ZIP" : ", or a ZIP"} · up to 50 MB each</small>
        <input
          type="file"
          multiple={kind !== "padsplit"}
          accept={ACCEPT}
          style={{ position: "absolute", width: 1, height: 1, opacity: 0 }}
          onChange={(e) => {
            onAdd(kind, e.target.files);
            e.target.value = "";
          }}
        />
      </label>
      {mine.length > 0 && (
        <ul className={s.files}>
          {mine.map((u) => (
            <li key={u.key} className={s.file}>
              <div className={s.fileName}>
                {u.name}
                {u.status === "uploading" && (
                  <div className={s.bar}>
                    <i style={{ width: `${Math.round(u.progress * 100)}%` }} />
                  </div>
                )}
              </div>
              {u.status === "uploading" && <span className={s.fileState}>{Math.round(u.progress * 100)}%</span>}
              {u.status === "done" && <span className={`${s.fileState} ${s.fileDone}`}>✓ {fmt(u.size)}</span>}
              {u.status === "error" && (
                <>
                  <span className={`${s.fileState} ${s.fileErr}`} title={u.error}>
                    {u.error}
                  </span>
                  <button type="button" className={s.link} onClick={() => onRetry(u)}>
                    Retry
                  </button>
                </>
              )}
              {u.status !== "uploading" && (
                <button
                  type="button"
                  className={s.link}
                  aria-label={`Remove ${u.name}`}
                  onClick={() => onRemove(u.key)}
                >
                  Remove
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function Done({ lead, name }: { lead: IntakeLead; name: string }) {
  return (
    <div className={`${s.page} ${s.done}`}>
      <div className={s.wrap}>
        <div className={s.hero}>
          <div className={s.kicker}>Coliving portfolio audit</div>
          <h1>You&rsquo;re all set, {first(name)}!</h1>
          <p>Your files and answers are in.</p>
        </div>
        <div className={s.card}>
          <p>
            Your audit starts as soon as your payment lands. In about 5 business days, I&rsquo;ll reach out to book
            your 45-minute walkthrough, where we&rsquo;ll go through your plan to plug the leaks, house by house.
          </p>
          <div className={s.pay}>
            <b>Haven&rsquo;t paid yet?</b> {lead.payment}
          </div>
          <p style={{ marginTop: 14, marginBottom: 0 }}>
            Need to send me something else? Just reply to my email.
            <br />
            Caitlyn
          </p>
        </div>
      </div>
    </div>
  );
}

export default function IntakeForm({ lead }: { lead: IntakeLead }) {
  const [name, setName] = useState(lead.name);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(lead.email);
  const [manager, setManager] = useState<"" | "self" | "pm">("");
  const [pmFee, setPmFee] = useState("");
  const [pmTenure, setPmTenure] = useState("");
  const [bugging, setBugging] = useState("");
  const [outsidePl, setOutsidePl] = useState("");
  const [anythingElse, setAnythingElse] = useState("");
  const [padsplit, setPadsplit] = useState<"" | "access" | "zip">("");
  const [padsplitDone, setPadsplitDone] = useState(false);
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(lead.completed);
  const errorsRef = useRef<HTMLDivElement>(null);

  // Tie this visit to the lead (same person as their /audit form submit).
  useEffect(() => {
    const ph = analytics();
    ph?.identify(lead.email, { email: lead.email, name: lead.name });
    ph?.capture("audit_intake_opened", { houses: lead.housesLabel, already_completed: lead.completed });
  }, [lead.email, lead.name, lead.housesLabel, lead.completed]);

  if (done) return <Done lead={lead} name={name} />;

  const patch = (key: string, p: Partial<Upload>) =>
    setUploads((list) => list.map((u) => (u.key === key ? { ...u, ...p } : u)));

  async function upload(u: Upload) {
    patch(u.key, { status: "uploading", progress: 0, error: undefined });
    try {
      const r = await fetch("/api/audit-intake/upload-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: lead.id, kind: u.kind, name: u.name, size: u.size }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || "Upload failed. Please try again.");
      try {
        await putFile(j.url, u.file, (p) => patch(u.key, { progress: p }));
      } catch (direct) {
        // Backup route for small files if the direct upload is blocked.
        if (u.size > PROXY_MAX) throw direct;
        const fd = new FormData();
        fd.append("id", lead.id);
        fd.append("path", j.path);
        fd.append("file", u.file);
        const pr = await fetch("/api/audit-intake/upload", { method: "POST", body: fd });
        if (!pr.ok) throw new Error((await pr.json().catch(() => ({}))).error || "Upload failed.");
      }
      patch(u.key, { status: "done", progress: 1, path: j.path });
      analytics()?.capture("audit_intake_file_uploaded", { kind: u.kind, size_kb: Math.round(u.size / 1024) });
    } catch (err) {
      const msg = err instanceof Error && err.message && !/^(status|network)/.test(err.message) ? err.message : "Upload failed.";
      patch(u.key, { status: "error", error: msg });
    }
  }

  function addFiles(kind: Kind, list: FileList | null) {
    if (!list) return;
    const added: Upload[] = [];
    const rejected: string[] = [];
    for (const file of Array.from(list)) {
      if (!ALLOWED.includes(ext(file.name))) rejected.push(`${file.name}: only PDF, Excel (XLSX, XLS), CSV or ZIP files.`);
      else if (file.size > MAX_BYTES) rejected.push(`${file.name} is larger than 50 MB.`);
      else if (file.size === 0) rejected.push(`${file.name} is empty.`);
      else
        added.push({
          key: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          kind,
          name: file.name,
          size: file.size,
          progress: 0,
          status: "uploading",
          file,
        });
    }
    setErrors(rejected);
    setUploads((u) => [...u, ...added]);
    added.forEach(upload);
  }

  const dropProps = {
    uploads,
    onAdd: addFiles,
    onRetry: upload,
    onRemove: (key: string) => setUploads((l) => l.filter((x) => x.key !== key)),
  };
  const busy = uploads.some((u) => u.status === "uploading");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const problems: string[] = [];
    const ok = (k: Kind) => uploads.some((u) => u.kind === k && u.status === "done");
    if (!name.trim()) problems.push("Add your name.");
    if (phone.replace(/\D/g, "").length < 10) problems.push("Add a phone number I can reach you on.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) problems.push("Add a valid email.");
    if (!manager) problems.push("Tell me who manages your houses.");
    if (manager === "pm" && (!pmFee.trim() || !pmTenure.trim()))
      problems.push("Add your property manager's fee and how long they've managed your houses.");
    if (!bugging.trim()) problems.push("Tell me what's bugging you most about your portfolio.");
    if (!ok("pnl")) problems.push("Upload at least one P&L.");
    if (!padsplit) problems.push("Choose how you'll share your PadSplit data.");
    if (padsplit === "access" && !padsplitDone) problems.push('Tick "Done" once you\'ve added me to your PadSplit account.');
    if (padsplit === "zip" && !ok("padsplit")) problems.push("Upload your PadSplit earnings export.");
    if (uploads.some((u) => u.status === "error")) problems.push("Retry or remove the files that didn't upload.");
    setErrors(problems);
    if (problems.length) {
      errorsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSending(true);
    try {
      const files = uploads
        .filter((u) => u.status === "done" && (u.kind !== "padsplit" || padsplit === "zip"))
        .map((u) => ({ kind: u.kind, path: u.path, name: u.name }));
      const r = await fetch("/api/audit-intake/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: lead.id,
          name,
          phone,
          email,
          manager,
          pmFee: manager === "pm" ? pmFee : "",
          pmTenure: manager === "pm" ? pmTenure : "",
          bugging,
          outsidePl,
          anythingElse,
          padsplit,
          padsplitDone,
          files,
        }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || "Something went wrong. Please try again.");
      analytics()?.capture("audit_intake_completed", {
        houses: lead.housesLabel,
        files: files.length,
        padsplit: padsplit === "access" ? "account access" : "earnings export",
        manager: manager === "pm" ? "property manager" : "self-managed",
      });
      setDone(true);
      // Scroll once the shorter "all set" screen has rendered.
      requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }));
    } catch (err) {
      setErrors([err instanceof Error ? err.message : "Something went wrong. Please try again."]);
      errorsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className={s.page}>
      <form className={s.wrap} onSubmit={submit} noValidate>
        <div className={s.hero}>
          <div className={s.kicker}>Your audit intake · {lead.housesLabel}</div>
          <h1>Let&rsquo;s find your leaks</h1>
          <p>About 5 minutes. Answer a few questions, upload your P&amp;Ls and share your PadSplit data.</p>
        </div>

        <section className={s.card}>
          <h2>
            <span className={s.num}>1</span>About you
          </h2>
          <label className={s.field}>
            Name
            <input className={s.input} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
          </label>
          <label className={s.field}>
            Best phone
            <input
              className={s.input}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
            />
          </label>
          <label className={s.field}>
            Email
            <input
              className={s.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              inputMode="email"
              autoComplete="email"
              required
            />
          </label>
        </section>

        <section className={s.card}>
          <h2>
            <span className={s.num}>2</span>Who manages your houses?
          </h2>
          <div className={s.choices} role="radiogroup">
            {(
              [
                ["self", "I manage them myself"],
                ["pm", "A property manager"],
              ] as const
            ).map(([v, label]) => (
              <label key={v} className={`${s.choice} ${manager === v ? s.choiceOn : ""}`}>
                <input type="radio" name="manager" checked={manager === v} onChange={() => setManager(v)} />
                {label}
              </label>
            ))}
          </div>
          {manager === "pm" && (
            <div className={s.sub}>
              <label className={s.field}>
                What&rsquo;s their fee?
                <input
                  className={s.input}
                  value={pmFee}
                  onChange={(e) => setPmFee(e.target.value)}
                  placeholder="e.g. 10% of collected rent"
                />
              </label>
              <label className={s.field}>
                How long have they managed your properties?
                <input
                  className={s.input}
                  value={pmTenure}
                  onChange={(e) => setPmTenure(e.target.value)}
                  placeholder="e.g. 2 years"
                />
              </label>
            </div>
          )}
        </section>

        <section className={s.card}>
          <h2>
            <span className={s.num}>3</span>What&rsquo;s bugging you most about your portfolio?
          </h2>
          <textarea
            className={s.textarea}
            value={bugging}
            onChange={(e) => setBugging(e.target.value)}
            placeholder="e.g. The houses are full but I'm barely breaking even"
            aria-label="What's bugging you most about your portfolio?"
          />
        </section>

        <section className={s.card}>
          <h2>
            <span className={s.num}>4</span>Is anything paid outside your P&amp;L?
          </h2>
          <p className={s.hint}>
            That could be the mortgage, taxes, insurance, a home warranty, or expenses your PM pays for you
            (maintenance, utilities, etc.). If so, list the monthly amounts or upload those statements.
          </p>
          <textarea
            className={s.textarea}
            value={outsidePl}
            onChange={(e) => setOutsidePl(e.target.value)}
            placeholder="e.g. Mortgage $1,600/mo, insurance $250/mo, paid from my own account"
            aria-label="Anything paid outside your P&L"
          />
          <FileDrop kind="outside" label="Upload statements (optional)" {...dropProps} />
        </section>

        <section className={s.card}>
          <h2>
            <span className={s.num}>5</span>Anything else I should know?
          </h2>
          <p className={s.hint}>
            For example, a recent purchase, sale, refinance, property management change or renovation.
          </p>
          <textarea
            className={s.textarea}
            value={anythingElse}
            onChange={(e) => setAnythingElse(e.target.value)}
            aria-label="Anything else I should know"
          />
        </section>

        <section className={s.card}>
          <h2>
            <span className={s.num}>6</span>Your P&amp;Ls
          </h2>
          <p className={s.hint}>
            12 months for each house, or as many months as you have. PDF, Excel or CSV; multiple files are fine. Make
            sure they show the detail at the transaction level, not just the annual summary figures.
          </p>
          <FileDrop kind="pnl" label="Upload your P&Ls" {...dropProps} />
        </section>

        <section className={s.card}>
          <h2>
            <span className={s.num}>7</span>Your PadSplit data
          </h2>
          <p className={s.hint}>Choose one:</p>
          <div className={s.choices} role="radiogroup">
            <label className={`${s.choice} ${padsplit === "access" ? s.choiceOn : ""}`}>
              <input type="radio" name="padsplit" checked={padsplit === "access"} onChange={() => setPadsplit("access")} />
              <span>
                Add me to your PadSplit account (preferred)
                <small>Lets me review your listings, photos, descriptions and settings for a more thorough analysis.</small>
              </span>
            </label>
            <label className={`${s.choice} ${padsplit === "zip" ? s.choiceOn : ""}`}>
              <input type="radio" name="padsplit" checked={padsplit === "zip"} onChange={() => setPadsplit("zip")} />
              <span>
                Upload your PadSplit earnings export
                <small>Your earnings data only.</small>
              </span>
            </label>
          </div>
          {padsplit === "access" && (
            <div className={s.sub}>
              <ol className={s.steps}>
                <li>Sign in to your PadSplit host account.</li>
                <li>
                  Click your profile icon, then <b>Team</b>, then <b>Invite</b>.
                </li>
                <li>
                  Enter <span className={s.email}>{PADSPLIT_EMAIL}</span>, select all the properties you want analyzed,
                  choose <b>Property Admin</b>, and click <b>Send Invites</b>.
                </li>
              </ol>
              <label className={s.check}>
                <input type="checkbox" checked={padsplitDone} onChange={(e) => setPadsplitDone(e.target.checked)} />
                Done, I&rsquo;ve sent the invite
              </label>
              <p className={s.hint} style={{ marginTop: 8, marginBottom: 0 }}>
                No need to upload your earnings export with this option.
              </p>
            </div>
          )}
          {padsplit === "zip" && (
            <div className={s.sub}>
              <ol className={s.steps}>
                <li>
                  In your PadSplit dashboard, go to <b>Earnings</b>.
                </li>
                <li>
                  Select the dates and properties, then click <b>Export CSV</b>.
                </li>
                <li>Upload the file exactly as it downloads. Don&rsquo;t unzip or change it.</li>
              </ol>
              <FileDrop kind="padsplit" label="Upload your earnings export" {...dropProps} />
            </div>
          )}
        </section>

        <div ref={errorsRef}>
          {errors.length > 0 && (
            <div className={s.errors} role="alert">
              {errors.length === 1 ? (
                errors[0]
              ) : (
                <>
                  Almost there:
                  <ul style={{ margin: "6px 0 0", paddingLeft: 20 }}>
                    {errors.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}
        </div>
        <button type="submit" className={s.submit} disabled={sending || busy}>
          {sending ? "Sending…" : busy ? "Uploading files…" : "Find My Money!"}
        </button>
        <p className={s.fine}>Your files are stored privately and only Caitlyn can see them.</p>
      </form>
    </div>
  );
}
