import { createHmac } from "crypto";
import { SITE, absoluteUrl } from "@/lib/site";
import { sendMail } from "@/lib/mail";
import {
  PRICE_PER_HOUSE,
  ZELLE_TO,
  auditTotal,
  billableHouses,
  housesLabel,
  money,
  zelleMemo,
} from "./pricing";
import type { Lead, StoredFile } from "./store";

// Emails for the audit funnel: the lead's confirmation and one reminder
// (both from "Caitlyn", replies to her Gmail), and Caitlyn's notification
// when a lead completes intake.

const FROM_NAME = "Caitlyn";
const TEAL = "#16302f";
const GOLD = "#e2a94f";

export const firstName = (name: string) => name.trim().split(/\s+/)[0] || name;
export const intakeUrl = (lead: Pick<Lead, "id">) => absoluteUrl(`/audit/intake/${lead.id}`);

/** Caitlyn's private, non-expiring link to a lead's files (signed per lead). */
export function filesPageUrl(id: string) {
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  const sig = createHmac("sha256", secret).update(`audit-files:${id}`).digest("base64url").slice(0, 32);
  return absoluteUrl(`/api/audit-intake/files?id=${id}&sig=${sig}`);
}

export function verifyFilesSig(id: string, sig: string) {
  const expected = new URL(filesPageUrl(id)).searchParams.get("sig");
  return Boolean(sig) && sig === expected;
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function button(href: string, label: string) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:14px 0 10px"><tr><td style="background:${GOLD};border-radius:8px">
<a href="${href}" style="display:inline-block;padding:14px 26px;font:bold 16px Arial,Helvetica,sans-serif;color:${TEAL};text-decoration:none">${label}</a>
</td></tr></table>`;
}

function wrap(inner: string) {
  return `<!doctype html><html><body style="margin:0;padding:0;background:#f4f8f7">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f8f7"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px">
<tr><td style="padding:28px 28px 24px;font:16px/1.55 Arial,Helvetica,sans-serif;color:#1d2a2e">${inner}</td></tr>
</table></td></tr></table></body></html>`;
}

/** Step 2 wording, which depends on the house count. */
function paymentLines(lead: Lead) {
  const total = auditTotal(lead.houses);
  const memo = zelleMemo(lead.name);
  if (total === null) {
    return {
      text: `Larger portfolios get a custom quote, so I'll email yours within a day. Once you have it, pay by Zelle to ${ZELLE_TO}\nMemo: ${memo}`,
      html: `Larger portfolios get a custom quote, so I&rsquo;ll email yours within a day. Once you have it, pay by Zelle to <b>${ZELLE_TO}</b><br>Memo: <b>${esc(memo)}</b>`,
    };
  }
  const n = billableHouses(lead.houses);
  const note = lead.houses === "6-10" ? ` (${n} × ${money(PRICE_PER_HOUSE)}; the final price depends on your exact house count)` : "";
  return {
    text: `${money(total)}${note} by Zelle to ${ZELLE_TO}\nMemo: ${memo}`,
    html: `<b>${money(total)}</b>${esc(note)} by Zelle to <b>${ZELLE_TO}</b><br>Memo: <b>${esc(memo)}</b>`,
  };
}

export function sendConfirmation(lead: Lead, withIntake: boolean) {
  const first = firstName(lead.name);
  const link = intakeUrl(lead);
  const pay = paymentLines(lead);
  const step1Text = withIntake
    ? `Step 1: Start your intake (about 5 minutes)\nStart your intake: ${link}\nUpload your P&Ls, connect your PadSplit data, and answer a few quick questions.`
    : `Step 1: Send me your numbers\nJust reply to this email with your P&Ls and your PadSplit earnings export, and I'll take it from there.`;
  const step1Html = withIntake
    ? `<h3 style="margin:22px 0 4px;font-size:17px;color:${TEAL}">Step 1: Start your intake (about 5 minutes)</h3>
${button(link, "Start your intake &rarr;")}
<p style="margin:0">Upload your P&amp;Ls, connect your PadSplit data, and answer a few quick questions.</p>`
    : `<h3 style="margin:22px 0 4px;font-size:17px;color:${TEAL}">Step 1: Send me your numbers</h3>
<p style="margin:0">Just reply to this email with your P&amp;Ls and your PadSplit earnings export, and I&rsquo;ll take it from there.</p>`;

  const text = `Hi ${first},

Thanks for booking your Coliving Portfolio Performance Audit for ${housesLabel(lead.houses)}. Let's find your leaks.

${step1Text}

Step 2: Payment
${pay.text}
Your audit starts as soon as payment lands. Your report arrives in about 5 business days, and then we'll book your 45-minute walkthrough call.

My guarantee: if I don't find at least $500 a year in savings per house, you get your money back.

Questions? Just reply to this email.
Caitlyn`;

  const html = wrap(`<p style="margin:0 0 12px">Hi ${esc(first)},</p>
<p style="margin:0">Thanks for booking your Coliving Portfolio Performance Audit for ${housesLabel(lead.houses)}. Let&rsquo;s find your leaks.</p>
${step1Html}
<h3 style="margin:26px 0 6px;font-size:17px;color:${TEAL}">Step 2: Payment</h3>
<p style="margin:0">${pay.html}</p>
<p style="margin:10px 0 0">Your audit starts as soon as payment lands. Your report arrives in about 5 business days, and then we&rsquo;ll book your 45-minute walkthrough call.</p>
<div style="margin:22px 0;border:2px solid ${GOLD};background:#fdf6ea;border-radius:10px;padding:12px 16px;color:${TEAL}"><b>My guarantee:</b> if I don&rsquo;t find at least $500 a year in savings per house, you get your money back.</div>
<p style="margin:0">Questions? Just reply to this email.<br>Caitlyn</p>`);

  return sendMail({
    to: lead.email,
    replyTo: SITE.email,
    fromName: FROM_NAME,
    subject: "You're in! Here's your 5-minute intake",
    text,
    html,
  });
}

export function sendReminder(lead: Lead) {
  const first = firstName(lead.name);
  const link = intakeUrl(lead);
  const text = `Hi ${first},

Quick nudge: your audit intake is still waiting. It takes about 5 minutes, and it's how I find your leaks.

Start your intake: ${link}

Questions? Just reply to this email.
Caitlyn`;
  const html = wrap(`<p style="margin:0 0 12px">Hi ${esc(first)},</p>
<p style="margin:0">Quick nudge: your audit intake is still waiting. It takes about 5 minutes, and it&rsquo;s how I find your leaks.</p>
${button(link, "Start your intake &rarr;")}
<p style="margin:0">Questions? Just reply to this email.<br>Caitlyn</p>`);
  return sendMail({
    to: lead.email,
    replyTo: SITE.email,
    fromName: FROM_NAME,
    subject: "Your audit intake is waiting (5 minutes)",
    text,
    html,
  });
}

const KIND_LABEL: Record<StoredFile["kind"], string> = {
  pnl: "P&Ls",
  outside: "Paid outside the P&L",
  padsplit: "PadSplit earnings export",
};

const size = (b: number) => (b >= 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`);

/** Caitlyn's "[Name] completed intake" email, with answers and file links. */
export function sendIntakeComplete(lead: Lead, links: { file: StoredFile; url: string }[]) {
  const a = lead.intake!;
  const total = auditTotal(lead.houses);
  const rows: [string, string][] = [
    ["Name", a.name],
    ["Phone", a.phone],
    ["Email", a.email],
    ["Houses", `${housesLabel(lead.houses)} (${total === null ? "custom quote" : `${money(total)} quoted`})`],
    ["Who manages the houses", a.manager === "pm" ? "Property manager" : "Self-managed"],
    ...(a.manager === "pm"
      ? ([
          ["PM fee", a.pmFee],
          ["PM has managed them for", a.pmTenure],
        ] as [string, string][])
      : []),
    ["What's bugging them most", a.bugging],
    ["Paid outside the P&L", a.outsidePl || "(nothing listed)"],
    ["Anything else", a.anythingElse || "(nothing)"],
    [
      "PadSplit data",
      a.padsplit === "access"
        ? `Added you to their PadSplit account (Team > Invite, Property Admin). Check for the invite.`
        : `Uploaded their earnings export`,
    ],
  ];
  const files = links.length
    ? links.map((l) => `- ${KIND_LABEL[l.file.kind]}: ${l.file.name} (${size(l.file.size)})\n  ${l.url}`).join("\n")
    : "(none)";
  const filesPage = filesPageUrl(lead.id);

  const text = `${a.name} completed intake: ${housesLabel(lead.houses)}

${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}

Files (download links expire in 7 days):
${files}

All their files, any time (private link, don't share): ${filesPage}

Their audit starts once their Zelle payment lands (memo "${zelleMemo(lead.name)}").`;

  const html = wrap(`<h2 style="margin:0 0 14px;font-size:20px;color:${TEAL}">${esc(a.name)} completed intake: ${housesLabel(lead.houses)}</h2>
<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse">
${rows
  .map(
    ([k, v]) =>
      `<tr><td style="padding:7px 10px 7px 0;border-bottom:1px solid #e2e7e8;vertical-align:top;font-weight:bold;color:${TEAL};width:38%">${esc(k)}</td><td style="padding:7px 0;border-bottom:1px solid #e2e7e8;white-space:pre-wrap">${esc(v)}</td></tr>`,
  )
  .join("\n")}
</table>
<h3 style="margin:22px 0 6px;font-size:17px;color:${TEAL}">Files</h3>
<p style="margin:0 0 8px;font-size:13px;color:#5d686b">Download links expire in 7 days.</p>
${
  links.length
    ? `<ul style="margin:0;padding-left:18px">${links
        .map((l) => `<li style="margin-bottom:6px">${KIND_LABEL[l.file.kind]}: <a href="${l.url}">${esc(l.file.name)}</a> (${size(l.file.size)})</li>`)
        .join("")}</ul>`
    : "<p style=\"margin:0\">(none)</p>"
}
${button(filesPage, "Open their files (link never expires)")}
<p style="margin:0;font-size:13px;color:#5d686b">That link is private to you; don&rsquo;t forward it. Their audit starts once their Zelle payment lands (memo &ldquo;${esc(zelleMemo(lead.name))}&rdquo;).</p>`);

  return sendMail({
    to: SITE.email,
    replyTo: a.email,
    subject: `${a.name} completed intake: ${housesLabel(lead.houses)}`,
    text,
    html,
  });
}
