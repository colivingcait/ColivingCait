// Posts a form submission straight to Caitlyn's CRM (the shared
// /api/webhooks/site-form endpoint - see that route in the callcaitlyn
// repo for the full contract). Called server-to-server from this site's
// own API routes, so it can pass richer `tags` than a browser-facing
// caller normally would.
// CRM_ORIGIN matches the override next.config.mjs uses for the CRM rewrites.
export const CRM_WEBHOOK_URL = `${process.env.CRM_ORIGIN ?? "https://crm.callcaitlyn.com"}/api/webhooks/site-form`;

export type CrmSubmitInput = {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  message?: string;
  tags?: string[];
  fields?: Record<string, string | number | undefined>;
};

// `status` and `body` (the start of the CRM's reply) are kept for logging,
// since a 2xx reply can still carry a message saying the lead was skipped.
export type CrmSubmitResult =
  | { ok: true; status: number; body: string }
  | { ok: false; error: string; body?: string };

export async function submitToCrm(form: string, input: CrmSubmitInput): Promise<CrmSubmitResult> {
  try {
    const res = await fetch(CRM_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ site: "colivingcait", form, ...input }),
    });
    const body = (await res.text().catch(() => "")).slice(0, 300);
    if (!res.ok) return { ok: false, error: `CRM responded ${res.status}`, body };
    return { ok: true, status: res.status, body };
  } catch (err) {
    return { ok: false, error: `Network error: ${err instanceof Error ? err.message : String(err)}` };
  }
}
