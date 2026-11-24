import { NextResponse } from "next/server";
import { submitToCrm } from "@/lib/crm";
import { sendMail } from "@/lib/mail";
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
}) {
  return sendMail({
    to: SITE.email,
    replyTo: lead.email,
    subject: `New audit lead: ${lead.firstName}, ${lead.houses} house${lead.houses === "1" ? "" : "s"}`,
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

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  // Honeypot: a hidden field real visitors never fill in.
  if (body.company) {
    console.warn("[audit-lead] honeypot filled; submission dropped", { email: body.email });
    return NextResponse.json({ ok: true });
  }

  const firstName = clean(body.firstName, 80);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 40);
  const houses = clean(body.houses, 10);
  const issue = clean(body.issue, 60);

  if (!firstName || !EMAIL_RE.test(email) || !HOUSES.includes(houses)) {
    return NextResponse.json(
      { error: "Please fill in your first name, email and number of houses." },
      { status: 400 },
    );
  }
  const biggestIssue = ISSUES.includes(issue) ? issue : "";

  const result = await submitToCrm("contact", {
    email,
    firstName,
    phone: phone || undefined,
    message: `Portfolio audit request: ${houses} PadSplit house${houses === "1" ? "" : "s"}${
      biggestIssue ? `. Biggest issue: ${biggestIssue}` : ""
    }.`,
    tags: ["audit lead"],
    fields: { houses, biggest_issue: biggestIssue || undefined },
  });

  if (!result.ok) console.warn("[audit-lead] CRM submission failed", result.error);

  let notified = false;
  try {
    notified = await notifyCaitlyn({ firstName, email, phone, houses, issue: biggestIssue });
  } catch (err) {
    console.warn("[audit-lead] notification email failed", err);
  }

  // Either channel is enough to keep the lead; only fail if both did.
  if (!result.ok && !notified) {
    return NextResponse.json(
      { error: "Something went wrong. Please try again, or email ColivingCait@gmail.com." },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
