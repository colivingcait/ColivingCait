import { NextResponse } from "next/server";
import { CRM_WEBHOOK_URL, submitToCrm } from "@/lib/crm";
import { mailConfigured, sendMail } from "@/lib/mail";

export const dynamic = "force-dynamic";
import { SITE } from "@/lib/site";

// "Ready to get audited?" form at the bottom of the static /audit page.
// Forwards the lead to Caitlyn's CRM the same way the contact form does,
// tagged "audit lead" with the house count and biggest issue as fields,
// and emails Caitlyn a notification she can reply to directly.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HOUSES = ["1", "2", "3", "4", "5", "6-10", "11+"];
const ISSUES = [
  "Cash flow",
  "Turnover",
  "Unpaid balances",
  "My property manager",
  "Not sure, just want a checkup",
];

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

// Mirrors the price shown on step 2 of the form.
function quote(houses: string) {
  if (houses === "11+") return "Custom quote (11+ houses): email them within a day";
  if (houses === "6-10") return "$3,000 quoted (6 x $500); final price depends on house count";
  const n = Number(houses);
  return `$${(n * 500).toLocaleString("en-US")} (${n} x $500)`;
}

async function notifyCaitlyn(lead: {
  firstName: string;
  email: string;
  phone: string;
  houses: string;
  issue: string;
  suspect: boolean;
}) {
  return sendMail({
    to: SITE.email,
    replyTo: lead.email,
    subject: `${lead.suspect ? "[Possible spam] " : ""}New audit lead: ${lead.firstName}, ${lead.houses} house${lead.houses === "1" ? "" : "s"}`,
    text: `New portfolio audit lead from colivingcait.com/audit

Name: ${lead.firstName}
Email: ${lead.email}
Phone: ${lead.phone || "(not given)"}
PadSplit houses: ${lead.houses}
Biggest issue: ${lead.issue || "(not given)"}
Price shown: ${quote(lead.houses)}

They were told to pay by Zelle with the memo "${lead.firstName} Audit". Reply to this email to answer them directly.`,
  });
}

// Status check: open /api/audit-lead in a browser. Sends nothing and creates
// no lead; reports whether email is configured and whether the CRM answers.
export async function GET() {
  let crm: string;
  try {
    const res = await fetch(CRM_WEBHOOK_URL, { method: "GET", cache: "no-store" });
    crm = `reachable (answered ${res.status} to a test request)`;
  } catch (err) {
    crm = `NOT reachable: ${err instanceof Error ? err.message : String(err)}`;
  }
  return NextResponse.json({
    version: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "unknown",
    email: mailConfigured()
      ? `configured (notifications go to ${SITE.email})`
      : "NOT configured: add EMAIL_SERVER and EMAIL_FROM in Vercel, then redeploy",
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

  // Honeypot: a hidden field real visitors never fill in. Browser autofill
  // has filled it before, so flag the lead instead of dropping it.
  const suspect = Boolean(body.company);

  // The slideshow form sends one "name" field; split it for the CRM.
  // Older callers send firstName, so accept that too.
  const fullName = clean(body.name, 120) || clean(body.firstName, 80);
  const [firstName = "", ...rest] = fullName.split(/\s+/);
  const lastName = rest.join(" ");
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 40);
  const houses = clean(body.houses, 10);
  const issue = clean(body.issue, 60);

  if (!firstName || !EMAIL_RE.test(email) || !HOUSES.includes(houses)) {
    return NextResponse.json(
      { error: "Please fill in your name, email and how many houses you have." },
      { status: 400 },
    );
  }
  const biggestIssue = ISSUES.includes(issue) ? issue : "";

  const result = await submitToCrm("contact", {
    email,
    firstName,
    lastName: lastName || undefined,
    phone: phone || undefined,
    message: `Portfolio audit request: ${houses} PadSplit house${houses === "1" ? "" : "s"}${
      biggestIssue ? `. Biggest issue: ${biggestIssue}` : ""
    }.`,
    tags: suspect ? ["audit lead", "possible spam"] : ["audit lead"],
    fields: { houses, biggest_issue: biggestIssue || undefined },
  });

  let notified = false;
  let emailOutcome = "not configured (EMAIL_SERVER / EMAIL_FROM missing)";
  try {
    notified = await notifyCaitlyn({ firstName: fullName, email, phone, houses, issue: biggestIssue, suspect });
    if (notified) emailOutcome = `sent to ${SITE.email}`;
  } catch (err) {
    emailOutcome = `failed: ${err instanceof Error ? err.message : String(err)}`;
  }

  // One line per submission so Vercel's logs show exactly what happened.
  console.log(
    `[audit-lead] ${email} (${houses} houses)${suspect ? " [spam trap filled]" : ""} | CRM: ${
      result.ok ? `accepted ${result.status} ${result.body}` : `FAILED ${result.error} ${result.body ?? ""}`
    } | email: ${emailOutcome}`,
  );

  // Either channel is enough to keep the lead; only fail if both did.
  if (!result.ok && !notified) {
    return NextResponse.json(
      { error: "Something went wrong. Please try again, or email ColivingCait@gmail.com." },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
