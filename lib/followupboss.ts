/**
 * Follow Up Boss API integration
 *
 * Uses the Events endpoint (POST /v1/events) for creating/updating contacts
 * because it:
 *   - Avoids duplicates automatically
 *   - Triggers action plans and automations
 *   - Notifies agents
 *   - Records events in contact timeline
 *
 * Uses People endpoint for adding tags to existing contacts.
 */

const FUB_API_URL = "https://api.followupboss.com/v1";
const FUB_API_KEY = process.env.FUB_API_KEY || "";
const FUB_SYSTEM = "ColivingCait";
const FUB_SYSTEM_KEY = "colivingcait-website";

function authHeader(): string {
  return "Basic " + Buffer.from(FUB_API_KEY + ":").toString("base64");
}

// ── Tag constants ──
export const FUB_TAGS = {
  // Source tags
  MEETUP_ATLANTA: "meetup-atlanta",
  COMMUNITY: "community",
  SHE_LEADS: "she-leads-coliving",
  WCS_ATTENDEE: "wcs-attendee",

  // Course tags
  COURSE_BUYER: "course-buyer",
  COLIVING_101: "coliving-101",
  HOUSE_HACKING_101: "house-hacking-101",
  REAL_ESTATE_101: "real-estate-101",
  EXPLORER_BUNDLE: "explorer-bundle",

  // Lead tags
  LEAD_MAGNET: "lead-magnet",
  CONTACT_FORM: "contact-form",
  PARTNER_INQUIRY: "partner-inquiry",
  BUYER_LEAD: "buyer-lead",
  SELLER_LEAD: "seller-lead",
  COACHING_INTERESTED: "coaching-interested",
  PASSIVE_INVESTOR: "passive-investor",
} as const;

// ── Create or update a contact via Events endpoint ──
type CreateContactParams = {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  tags?: string[];
  source?: string;
  message?: string;
};

export async function createOrUpdateContact({
  email,
  firstName,
  lastName,
  phone,
  tags,
  source,
  message,
}: CreateContactParams) {
  try {
    const person: Record<string, any> = {
      emails: [{ value: email }],
    };
    if (firstName) person.firstName = firstName;
    if (lastName) person.lastName = lastName;
    if (phone) person.phones = [{ value: phone }];
    if (tags && tags.length > 0) person.tags = tags;

    const body: Record<string, any> = {
      source: source || "ColivingCait.com",
      system: FUB_SYSTEM,
      type: "Registration",
      person,
    };

    if (message) {
      body.message = message;
    }

    const res = await fetch(`${FUB_API_URL}/events`, {
      method: "POST",
      headers: {
        Authorization: authHeader(),
        "Content-Type": "application/json",
        "X-System": FUB_SYSTEM,
        "X-System-Key": FUB_SYSTEM_KEY,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`[fub] Error creating contact: ${res.status}`, text);
      return null;
    }

    const data = await res.json();
    console.log(`[fub] Contact created/updated: ${email}`, data?.id);
    return data;
  } catch (err) {
    console.error(`[fub] Failed to create contact: ${email}`, err);
    return null;
  }
}

// ── Add tags to an existing contact by email ──
export async function addTagsByEmail(email: string, tags: string[]) {
  try {
    // First find the person by email
    const searchRes = await fetch(
      `${FUB_API_URL}/people?email=${encodeURIComponent(email)}`,
      {
        headers: {
          Authorization: authHeader(),
          "X-System": FUB_SYSTEM,
          "X-System-Key": FUB_SYSTEM_KEY,
        },
      }
    );

    if (!searchRes.ok) {
      console.error(`[fub] Error searching for ${email}: ${searchRes.status}`);
      return null;
    }

    const searchData = await searchRes.json();
    const person = searchData?.people?.[0];

    if (!person) {
      console.log(`[fub] Person not found for ${email}, creating via event`);
      return createOrUpdateContact({ email, tags });
    }

    // Merge new tags with existing
    const existingTags: string[] = person.tags || [];
    const allTags = [...new Set([...existingTags, ...tags])];

    const updateRes = await fetch(`${FUB_API_URL}/people/${person.id}`, {
      method: "PUT",
      headers: {
        Authorization: authHeader(),
        "Content-Type": "application/json",
        "X-System": FUB_SYSTEM,
        "X-System-Key": FUB_SYSTEM_KEY,
      },
      body: JSON.stringify({ tags: allTags }),
    });

    if (!updateRes.ok) {
      const text = await updateRes.text();
      console.error(`[fub] Error adding tags to ${email}: ${updateRes.status}`, text);
      return null;
    }

    console.log(`[fub] Tags added to ${email}:`, tags);
    return await updateRes.json();
  } catch (err) {
    console.error(`[fub] Failed to add tags to ${email}`, err);
    return null;
  }
}
