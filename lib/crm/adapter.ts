import { createHmac } from "node:crypto";

// CRM adapter for rent-ledger leads. The default WebhookCrmAdapter posts to
// CRM_WEBHOOK_URL, or to the CRM's shared site-form webhook (see lib/crm.ts)
// when that isn't set, signing the body with CRM_WEBHOOK_SECRET when present.
// Swap in a native adapter in getCrmAdapter() if the CRM changes. Leads carry
// portfolio-level stats only; never resident-level data.

export interface CrmLead {
  email: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  operatorType?: string;
  houseCount?: number;
  consentContact: boolean;
  interests: { selling?: boolean; buying?: boolean; partnering?: boolean; help?: boolean };
  tags: string[];
  stats: {
    houses: number;
    breakageRate: number;
    breakagePerHouseMonth: number;
    collectionRate: number;
    vsCityMedian?: number;
  };
  source: "rent-ledger";
}

export interface CrmAdapter {
  upsertLead(lead: CrmLead): Promise<void>;
}

const SITE_FORM_URL = "https://crm.callcaitlyn.com/api/webhooks/site-form";

export class WebhookCrmAdapter implements CrmAdapter {
  constructor(
    private url = process.env.CRM_WEBHOOK_URL || SITE_FORM_URL,
    private secret = process.env.CRM_WEBHOOK_SECRET,
    private attempts = 3,
  ) {}

  async upsertLead(lead: CrmLead): Promise<void> {
    // Shaped for the site-form contract (site, form, email, names, tags,
    // fields) with the full lead alongside for adapters that want it.
    const body = JSON.stringify({
      site: "colivingcait",
      form: "rent_ledger",
      email: lead.email,
      firstName: lead.firstName,
      lastName: lead.lastName,
      tags: lead.tags,
      fields: {
        city: lead.city,
        state: lead.state,
        operatorType: lead.operatorType,
        houseCount: lead.houseCount,
        consentContact: lead.consentContact ? "yes" : "no",
        interestSelling: flag(lead.interests.selling),
        interestBuying: flag(lead.interests.buying),
        interestPartnering: flag(lead.interests.partnering),
        interestHelp: flag(lead.interests.help),
        houses: lead.stats.houses,
        breakageRate: lead.stats.breakageRate,
        breakagePerHouseMonth: lead.stats.breakagePerHouseMonth,
        collectionRate: lead.stats.collectionRate,
        vsCityMedian: lead.stats.vsCityMedian,
      },
      lead,
    });
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (this.secret) headers["X-Signature"] = createHmac("sha256", this.secret).update(body).digest("hex");

    let lastError = "";
    for (let i = 0; i < this.attempts; i++) {
      try {
        const res = await fetch(this.url, { method: "POST", headers, body, signal: AbortSignal.timeout(5000) });
        if (res.ok) return;
        lastError = `CRM responded ${res.status}`;
        if (res.status < 500 && res.status !== 429) break;
      } catch (err) {
        lastError = err instanceof Error ? err.message : "Network error";
      }
      await new Promise((r) => setTimeout(r, 400 * 2 ** i));
    }
    throw new Error(lastError);
  }
}

const flag = (v: boolean | undefined) => (v == null ? undefined : v ? "yes" : "no");

export function getCrmAdapter(): CrmAdapter {
  return new WebhookCrmAdapter();
}

/** Sends a lead; failures are logged and never block the user's report. */
export async function sendLead(lead: CrmLead): Promise<boolean> {
  try {
    await getCrmAdapter().upsertLead(lead);
    return true;
  } catch (err) {
    console.error("[rent-ledger] CRM upsert failed", lead.email, err);
    return false;
  }
}
