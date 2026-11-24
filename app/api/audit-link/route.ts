import { NextResponse } from "next/server";
import { CK_TAGS } from "@/lib/convertkit";
import { submitToCrm } from "@/lib/crm";
import { sendMail } from "@/lib/mail";
import { SITE, absoluteUrl } from "@/lib/site";

// "Email it to yourself" form on the static /audit page. Sends the lead to
// Caitlyn's CRM and emails the visitor a link to the sample audit, using the
// same SMTP server NextAuth uses for sign-in links.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );
}

async function sendAuditLink(email: string, firstName: string) {
  const url = absoluteUrl("/audit");
  const name = escapeHtml(firstName);
  return sendMail({
    to: email,
    replyTo: SITE.email,
    subject: "Your sample coliving portfolio audit",
    text: `Hi ${firstName},

Here's the sample coliving portfolio audit you asked for. It's laid out like a report, so it reads best on a computer:

${url}

If you'd like one for your own houses, just reply to this email.

Caitlyn Verdugo
Coliving Cait`,
    html: `<p>Hi ${name},</p>
<p>Here's the sample coliving portfolio audit you asked for. It's laid out like a report, so it reads best on a computer:</p>
<p><a href="${url}">${url}</a></p>
<p>If you'd like one for your own houses, just reply to this email.</p>
<p>Caitlyn Verdugo<br>Coliving Cait</p>`,
  });
}

export async function POST(request: Request) {
  let body: { firstName?: unknown; email?: unknown; company?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  // Honeypot: a hidden field real visitors never fill in.
  if (body.company) return NextResponse.json({ ok: true, emailed: true });

  const firstName = typeof body.firstName === "string" ? body.firstName.trim().slice(0, 80) : "";
  const email = typeof body.email === "string" ? body.email.trim().slice(0, 200) : "";
  if (!firstName || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter your first name and a valid email." }, { status: 400 });
  }

  const crm = await submitToCrm("lead_magnet", {
    email,
    firstName,
    tags: [CK_TAGS.PORTFOLIO_AUDIT_SAMPLE_REQUESTED],
  });
  if (!crm.ok) console.warn("[audit-link] CRM submission failed", crm.error);

  let emailed = false;
  try {
    emailed = await sendAuditLink(email, firstName);
  } catch (err) {
    console.warn("[audit-link] email failed", err);
  }

  if (!crm.ok && !emailed) {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 502 });
  }
  return NextResponse.json({ ok: true, emailed });
}
