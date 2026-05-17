// ConvertKit integration. Single point of truth for tag names, the
// subscribe API, and the dev-mode console-log fallback that runs when
// CONVERTKIT_API_KEY isn't set.
//
// Tag names below mirror the playbook taxonomy. They drive every email
// nurture sequence in ConvertKit.

export const CK_TAGS = {
  // Lead magnets
  COLIVING_STARTER_GUIDE_DOWNLOADED: "coliving-starter-guide-downloaded",
  COLIVING_CHECKLIST_DOWNLOADED: "coliving-checklist-downloaded",
  COLIVING_MISTAKES_DOWNLOADED: "coliving-mistakes-downloaded",
  HOUSE_HACKING_PLAYBOOK_DOWNLOADED: "house-hacking-playbook-downloaded",
  ATLANTA_GUIDE_DOWNLOADED: "atlanta-guide-downloaded",

  // Page visits — tagged when a known subscriber lands on a page
  COACHING_PAGE_VISITED: "coaching-page-visited",
  PARTNER_PAGE_VISITED: "partner-page-visited",
  BUY_SELL_PAGE_VISITED: "buy-sell-page-visited",
  WHAT_IS_COLIVING_VISITED: "what-is-coliving-visited",

  // Audience signals
  COACHING_INTERESTED: "coaching-interested",
  PASSIVE_INVESTOR: "passive-investor",
  BUYER_LEAD: "buyer-lead",
  SELLER_LEAD: "seller-lead",
  HOUSE_HACKER_LEAD: "house-hacker-lead",
  COMMUNITY_MEMBER: "community-member",
  COMMUNITY: "community",
  CONTACT_FORM_SUBMITTED: "contact-form-submitted",
  WCS_INTERESTED: "wcs-interested",
  SHE_LEADS_INTERESTED: "she-leads-interested",
  MEDIA_INQUIRY: "media-inquiry",

  // Calculator
  COLIVING_CALCULATOR_USED: "coliving-calculator-used",
  HOUSE_HACKING_CALCULATOR_USED: "house-hacking-calculator-used",
  DSCR_CALCULATOR_USED: "dscr-calculator-used",
  COLIVING_DEAL_STRONG: "coliving-deal-strong",
  COLIVING_DEAL_MARGINAL: "coliving-deal-marginal",
  COLIVING_DEAL_WEAK: "coliving-deal-weak",

  // Course purchases / completions
  COURSE_BUYER: "course-buyer",
  COLIVING_101_PURCHASED: "coliving-101",
  COLIVING_101_COMPLETED: "coliving-101-completed",
  HOUSE_HACKING_101_PURCHASED: "house-hacking-101",
  HOUSE_HACKING_101_COMPLETED: "house-hacking-101-completed",
  REAL_ESTATE_101_PURCHASED: "real-estate-101",
  REAL_ESTATE_101_COMPLETED: "real-estate-101-completed",
  EXPLORER_BUNDLE: "explorer-bundle",

  // Forms & inquiries
  LEAD_MAGNET: "lead-magnet",
  NEWSLETTER: "newsletter",
  PARTNER_INQUIRY: "partner-inquiry",
  BUYER_SELLER_INQUIRY: "buyer-seller-inquiry",

  // Events
  MEETUP_ATLANTA: "meetup-atlanta",
  WCS_ATTENDEE: "wcs-attendee",
  CONFERENCE: "conference",
} as const;

export type CKTagName = (typeof CK_TAGS)[keyof typeof CK_TAGS];

const CK_API_BASE = "https://api.convertkit.com/v3";

// Tag-id cache. ConvertKit's subscribe-with-tag endpoint requires the
// numeric tag id, not the name. We fetch the tag list once and cache it
// in module scope for the lifetime of the lambda (5 min TTL).
type TagCache = {
  byName: Map<string, number>;
  fetchedAt: number;
};
let tagCache: TagCache | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000;

async function getTagId(tagName: string): Promise<number | null> {
  const apiKey = process.env.CONVERTKIT_API_KEY;
  if (!apiKey) return null;

  if (
    tagCache &&
    Date.now() - tagCache.fetchedAt < CACHE_TTL_MS &&
    tagCache.byName.has(tagName)
  ) {
    return tagCache.byName.get(tagName) ?? null;
  }

  // Refresh cache
  try {
    const res = await fetch(
      `${CK_API_BASE}/tags?api_key=${encodeURIComponent(apiKey)}`,
      { cache: "no-store" },
    );
    if (!res.ok) {
      console.warn("[convertkit] failed to fetch tags", res.status);
      return null;
    }
    const data = (await res.json()) as { tags?: { id: number; name: string }[] };
    const byName = new Map<string, number>();
    for (const t of data.tags ?? []) byName.set(t.name, t.id);
    tagCache = { byName, fetchedAt: Date.now() };
    return byName.get(tagName) ?? null;
  } catch (err) {
    console.warn("[convertkit] tag fetch threw", err);
    return null;
  }
}

export type SubscribeInput = {
  email: string;
  firstName?: string;
  tagName: string;
  /** Additional custom fields to push to ConvertKit (optional). */
  fields?: Record<string, string | number | undefined>;
};

export type SubscribeResult =
  | { ok: true; mode: "live" | "dev-stub"; tagApplied: string }
  | { ok: false; error: string };

// Find-or-create-subscriber + apply tag. ConvertKit's tag/subscribe
// endpoint upserts the subscriber, so this is a single-call operation.
export async function subscribeToConvertKit(
  input: SubscribeInput,
): Promise<SubscribeResult> {
  const { email, firstName, tagName, fields } = input;

  if (!email || !tagName) {
    return { ok: false, error: "Missing email or tag" };
  }

  const apiKey = process.env.CONVERTKIT_API_KEY;

  // Dev stub — no API key set. Log the action so we can verify form
  // wiring end-to-end without a live ConvertKit account.
  if (!apiKey) {
    console.log("[convertkit:dev-stub]", { email, firstName, tagName, fields });
    return { ok: true, mode: "dev-stub", tagApplied: tagName };
  }

  const tagId = await getTagId(tagName);
  if (!tagId) {
    console.warn(
      `[convertkit] tag "${tagName}" not found in ConvertKit. Create it manually in the CK dashboard or via the API. Skipping.`,
    );
    return {
      ok: false,
      error: `Tag "${tagName}" not configured in ConvertKit`,
    };
  }

  try {
    const res = await fetch(`${CK_API_BASE}/tags/${tagId}/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: apiKey,
        email,
        first_name: firstName,
        fields,
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.warn("[convertkit] subscribe failed", res.status, text);
      return { ok: false, error: `ConvertKit responded ${res.status}` };
    }

    return { ok: true, mode: "live", tagApplied: tagName };
  } catch (err) {
    console.warn("[convertkit] subscribe threw", err);
    return { ok: false, error: "Network error" };
  }
}
