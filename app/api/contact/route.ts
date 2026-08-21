import { NextResponse } from "next/server";
import { CK_TAGS } from "@/lib/convertkit";
import { submitToCrm } from "@/lib/crm";

// Contact form endpoint. Maps the form's topic dropdown to a tag (still
// named after the old ConvertKit taxonomy - CRM tags are just names, so
// reusing it keeps everyone's segment filters meaningful without a
// separate rename pass) and forwards straight to Caitlyn's CRM.
const TOPIC_TO_TAG: Record<string, string> = {
  general: CK_TAGS.CONTACT_FORM_SUBMITTED,
  coaching: CK_TAGS.COACHING_INTERESTED,
  partnership: CK_TAGS.PASSIVE_INVESTOR,
  "buy-sell": CK_TAGS.BUYER_LEAD,
  "house-hacking": CK_TAGS.HOUSE_HACKER_LEAD,
  speaking: CK_TAGS.MEDIA_INQUIRY,
  wcs: CK_TAGS.WCS_INTERESTED,
  "she-leads": CK_TAGS.SHE_LEADS_INTERESTED,
  other: CK_TAGS.CONTACT_FORM_SUBMITTED,
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, topic, message } = body ?? {};

    if (!firstName || !lastName || !email || !topic || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const tagName = TOPIC_TO_TAG[topic] ?? CK_TAGS.CONTACT_FORM_SUBMITTED;

    const result = await submitToCrm("contact", {
      email,
      firstName,
      lastName,
      phone,
      message,
      tags: [tagName],
      fields: { topic },
    });

    if (!result.ok) {
      console.warn("[contact] CRM submission failed", result.error);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
