import { NextResponse } from "next/server";
import { CRM_WEBHOOK_URL, submitToCrm } from "@/lib/crm";
import { mailConfigured, sendMail } from "@/lib/mail";
import { SITE } from "@/lib/site";
import { intakeUrl, sendConfirmation } from "@/lib/audit/emails";
import { auditTotal, housesLabel, isHouseCount, money, zelleMemo } from "@/lib/audit/pricing";
import { ensureBucket, newLeadId, saveLead, type Lead } from "@/lib/audit/store";

export const dynamic = "force-dynamic";

// The lead form on the last slide of /audit. On submit it:
// 1. saves the lead (private storage) so they get their own intake page,
// 2. emails them the confirmation with their "Start your intake" link,
// 3. tags them "audit lead" in Caitlyn's CRM,
// 4. emails Caitlyn a "New audit lead" notification.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const errText = (err: unknown) => (err instanceof Error ? err.message : String(err));

function notifyCaitlyn(lead: Lead, suspect: boolean, intakeLink: string | null) {
  const total = auditTotal(lead.houses);
  return sendMail({
    to: SITE.email,
    replyTo: lead.email,
    subject: `${suspect ? "[Possible spam] " : ""}New audit lead: ${lead.name}, ${housesLabel(lead.houses)}`,
    text: `New portfolio audit lead from colivingcait.com/audit

Name: ${lead.name}
Email: ${lead.email}
Houses: ${housesLabel(lead.houses)}
Price shown: ${total === null ? "custom quote (email them within a day)" : money(total)}
Zelle memo: "${zelleMemo(lead.name)}"

${
  suspect
    ? `The spam trap was filled, so no confirmation email went out. If they look real, forward them their intake link: ${intakeLink ?? "(not created)"}`
    : intakeLink
      ? "They've been emailed their intake link. You'll get another email when they finish it."
      : "Their intake page couldn't be created, so their confirmation asked them to reply with their files instead."
}

Reply to this email to answer them directly.`,
  });
}

// Status check: open /api/audit-lead in a browser. Sends nothing and creates
// no lead; reports whether email, storage and the CRM are working.
export async function GET() {
  let crm: string;
  try {
    const res = await fetch(CRM_WEBHOOK_URL, { method: "GET", cache: "no-store" });
    crm = `reachable (answered ${res.status} to a test request)`;
  } catch (err) {
    crm = `NOT reachable: ${errText(err)}`;
  }
  let storage: string;
  try {
    await ensureBucket();
    storage = "ready (private bucket audit-intake)";
  } catch (err) {
    storage = `NOT working: ${errText(err)}`;
  }
  return NextResponse.json({
    version: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "unknown",
    email: mailConfigured()
      ? `configured (notifications go to ${SITE.email})`
      : "NOT configured: add EMAIL_SERVER and EMAIL_FROM in Vercel, then redeploy",
    storage,
    crm,
  });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  // Honeypot: a hidden field real visitors never fill in. Flag rather than
  // drop, but don't email the address (bots use this to send spam).
  const suspect = Boolean(body.company);

  const name = (clean(body.name, 120) || clean(body.firstName, 80)).replace(/\s+/g, " ");
  const [firstName = "", ...rest] = name.split(" ");
  const email = clean(body.email, 200);
  const houses = clean(body.houses, 10);
  if (!firstName || !EMAIL_RE.test(email) || !isHouseCount(houses)) {
    return NextResponse.json(
      { error: "Please fill in your name, email and how many houses you have." },
      { status: 400 },
    );
  }

  const lead: Lead = { id: newLeadId(), name, email, houses, createdAt: new Date().toISOString() };
  const log: string[] = [];

  let stored = false;
  try {
    await saveLead(lead);
    stored = true;
    log.push("stored");
  } catch (err) {
    log.push(`storage FAILED: ${errText(err)}`);
  }

  let confirmed = false;
  if (suspect) {
    log.push("confirmation skipped (spam trap)");
  } else {
    try {
      confirmed = await sendConfirmation(lead, stored);
      log.push(confirmed ? "confirmation sent" : "confirmation NOT sent (email not configured)");
    } catch (err) {
      log.push(`confirmation FAILED: ${errText(err)}`);
    }
  }

  const crm = await submitToCrm("contact", {
    email,
    firstName,
    lastName: rest.join(" ") || undefined,
    message: `Portfolio audit request: ${housesLabel(lead.houses)}.`,
    tags: suspect ? ["audit lead", "possible spam"] : ["audit lead"],
    fields: { houses },
  });
  log.push(crm.ok ? `CRM accepted ${crm.status} ${crm.body}` : `CRM FAILED ${crm.error} ${crm.body ?? ""}`);

  let notified = false;
  try {
    notified = await notifyCaitlyn(lead, suspect, stored ? intakeUrl(lead) : null);
    log.push(notified ? `notified ${SITE.email}` : "notification NOT sent (email not configured)");
  } catch (err) {
    log.push(`notification FAILED: ${errText(err)}`);
  }

  // One line per submission so Vercel's logs show exactly what happened.
  console.log(`[audit-lead] ${email} (${houses} houses)${suspect ? " [spam trap filled]" : ""} | ${log.join(" | ")}`);

  // Keep the lead if any channel worked; only fail if all of them did.
  if (!stored && !crm.ok && !notified) {
    return NextResponse.json(
      { error: "Something went wrong. Please try again, or email ColivingCait@gmail.com." },
      { status: 502 },
    );
  }
  // The page sends them straight on to their intake (not for spam-trap hits).
  return NextResponse.json({
    ok: true,
    emailed: confirmed,
    intakeUrl: stored && !suspect ? `/audit/intake/${lead.id}` : null,
  });
}
