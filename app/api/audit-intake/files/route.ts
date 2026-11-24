import { verifyFilesSig } from "@/lib/audit/emails";
import { housesLabel } from "@/lib/audit/pricing";
import { downloadUrl, getLead } from "@/lib/audit/store";

export const dynamic = "force-dynamic";

// Caitlyn's private files page for one lead, linked from her "completed
// intake" email. The link carries a signature only the server can make, so
// it works only for that lead. Every visit makes fresh download links that
// expire after 7 days.

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const HEADERS = {
  "Content-Type": "text/html; charset=utf-8",
  "Cache-Control": "private, no-store",
  "X-Robots-Tag": "noindex, nofollow",
  "Referrer-Policy": "no-referrer",
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id") ?? "";
  const sig = url.searchParams.get("sig") ?? "";
  const lead = verifyFilesSig(id, sig) ? await getLead(id) : null;
  if (!lead) return new Response("Not found", { status: 404, headers: { ...HEADERS, "Content-Type": "text/plain" } });

  const files = lead.files ?? [];
  const links = await Promise.all(files.map(async (f) => ({ f, url: await downloadUrl(f.path) })));
  const label = { pnl: "P&Ls", outside: "Paid outside the P&L", padsplit: "PadSplit earnings export" } as const;

  const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>Audit files: ${esc(lead.name)}</title>
<style>body{margin:0;background:#f4f8f7;font:16px/1.5 Arial,Helvetica,sans-serif;color:#1d2a2e}main{max-width:640px;margin:0 auto;padding:28px 16px}
h1{font-size:22px;color:#16302f;margin:0 0 4px}p{margin:0 0 16px;color:#5d686b}ul{list-style:none;padding:0;margin:0}
li{background:#fff;border-radius:10px;padding:12px 14px;margin-bottom:8px}li small{display:block;color:#5d686b}a{color:#1f7a72;font-weight:bold;word-break:break-word}</style></head>
<body><main><h1>${esc(lead.name)}: ${housesLabel(lead.houses)}</h1>
<p>${lead.intakeCompletedAt ? `Intake completed ${new Date(lead.intakeCompletedAt).toLocaleString("en-US", { timeZone: "America/New_York" })} ET` : "Intake not completed yet"} &middot; ${esc(lead.email)}</p>
${links.length ? `<ul>${links.map(({ f, url }) => `<li><a href="${url}">${esc(f.name)}</a><small>${label[f.kind]}</small></li>`).join("")}</ul>` : "<p>No files yet.</p>"}
</main></body></html>`;
  return new Response(html, { headers: HEADERS });
}
