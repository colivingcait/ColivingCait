import { NextResponse } from "next/server";
import { submitToCrm } from "@/lib/crm";
import { sendIntakeComplete } from "@/lib/audit/emails";
import {
  FILE_KINDS,
  downloadUrl,
  getLead,
  listFiles,
  saveLead,
  type FileKind,
  type IntakeAnswers,
  type StoredFile,
} from "@/lib/audit/store";

export const dynamic = "force-dynamic";

// Final step of the intake page: checks the answers and that the files the
// page reports are really in this lead's folder, saves everything, emails
// Caitlyn (answers + signed download links), and tags the CRM.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const bad = (error: string) => NextResponse.json({ error }, { status: 400 });

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return bad("Bad request");
  }

  const lead = await getLead(clean(body.id, 40));
  if (!lead) return NextResponse.json({ error: "This intake link isn't valid." }, { status: 404 });

  const answers: IntakeAnswers = {
    name: clean(body.name, 120).replace(/\s+/g, " "),
    phone: clean(body.phone, 40),
    email: clean(body.email, 200),
    referredBy: clean(body.referredBy, 200),
    manager: body.manager === "pm" ? "pm" : "self",
    pmFee: clean(body.pmFee, 200),
    pmTenure: clean(body.pmTenure, 200),
    bugging: clean(body.bugging, 4000),
    outsidePl: clean(body.outsidePl, 4000),
    anythingElse: clean(body.anythingElse, 4000),
    padsplit: body.padsplit === "zip" ? "zip" : "access",
  };

  if (!answers.name) return bad("Please add your name.");
  if (answers.phone.replace(/\D/g, "").length < 10) return bad("Please add a phone number I can reach you on.");
  if (!EMAIL_RE.test(answers.email)) return bad("Please add a valid email.");
  if (body.manager !== "self" && body.manager !== "pm") return bad("Please tell me who manages your houses.");
  if (answers.manager === "pm" && (!answers.pmFee || !answers.pmTenure)) {
    return bad("Please add your property manager's fee and how long they've managed your houses.");
  }
  if (!answers.bugging) return bad("Please tell me what's bugging you most about your portfolio.");
  if (body.padsplit !== "access" && body.padsplit !== "zip") return bad("Please choose how you'll share your PadSplit data.");
  if (answers.padsplit === "access" && body.padsplitDone !== true) {
    return bad("Please tick \"Done\" once you've added me to your PadSplit account.");
  }

  // Only accept files that really are in this lead's folder.
  const claimed = Array.isArray(body.files) ? body.files.slice(0, 100) : [];
  const files: StoredFile[] = [];
  try {
    const present = new Map<FileKind, Map<string, number>>();
    for (const kind of FILE_KINDS) present.set(kind, await listFiles(lead.id, kind));
    for (const f of claimed) {
      const kind = f?.kind as FileKind;
      const path = typeof f?.path === "string" ? f.path : "";
      const size = present.get(kind)?.get(path);
      if (FILE_KINDS.includes(kind) && size !== undefined && !files.some((x) => x.path === path)) {
        files.push({ kind, path, name: clean(f.name, 200) || path.split("/").pop()!, size });
      }
    }
  } catch (err) {
    console.error("[audit-intake] file check failed", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 502 });
  }

  if (!files.some((f) => f.kind === "pnl")) return bad("Please upload at least one P&L.");
  if (answers.padsplit === "zip" && !files.some((f) => f.kind === "padsplit")) {
    return bad("Please upload your PadSplit earnings export, or choose to add me to your account instead.");
  }

  const completed: typeof lead = {
    ...lead,
    intakeCompletedAt: new Date().toISOString(),
    intake: answers,
    files,
  };
  try {
    await saveLead(completed);
  } catch (err) {
    console.error("[audit-intake] save failed", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 502 });
  }

  const log: string[] = [`${files.length} files`];
  try {
    const links = await Promise.all(files.map(async (file) => ({ file, url: await downloadUrl(file.path) })));
    const sent = await sendIntakeComplete(completed, links);
    log.push(sent ? "Caitlyn notified" : "notification NOT sent (email not configured)");
  } catch (err) {
    log.push(`notification FAILED: ${err instanceof Error ? err.message : String(err)}`);
  }

  const [firstName = "", ...rest] = answers.name.split(" ");
  const crm = await submitToCrm("contact", {
    email: answers.email,
    firstName,
    lastName: rest.join(" ") || undefined,
    phone: answers.phone,
    message: `Portfolio audit intake complete (${files.length} files). Biggest concern: ${answers.bugging.slice(0, 300)}`,
    tags: ["audit lead", "intake complete"],
    fields: {
      houses: lead.houses,
      padsplit: answers.padsplit === "access" ? "account access" : "earnings export",
      referred_by: answers.referredBy || undefined,
    },
  });
  log.push(crm.ok ? `CRM accepted ${crm.status} ${crm.body}` : `CRM FAILED ${crm.error} ${crm.body ?? ""}`);

  console.log(`[audit-intake] ${lead.id} ${answers.email} | ${log.join(" | ")}`);
  return NextResponse.json({ ok: true });
}
