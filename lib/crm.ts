// Posts a form submission straight to Caitlyn's CRM (the shared
// /api/webhooks/site-form endpoint - see that route in the callcaitlyn
// repo for the full contract). Called server-to-server from this site's
// own API routes, so it can pass richer `tags` than a browser-facing
// caller normally would.
const CRM_WEBHOOK_URL = "https://crm.callcaitlyn.com/api/webhooks/site-form";

export type CrmSubmitInput = {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  message?: string;
  tags?: string[];
  fields?: Record<string, string | number | undefined>;
};

export type CrmSubmitResult = { ok: true } | { ok: false; error: string };

export async function submitToCrm(form: string, input: CrmSubmitInput): Promise<CrmSubmitResult> {
  try {
    const res = await fetch(CRM_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ site: "colivingcait", form, ...input }),
    });
    if (!res.ok) return { ok: false, error: `CRM responded ${res.status}` };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: "Network error" };
  }
}
