import { NextResponse } from "next/server";
import { CK_TAGS, subscribeToConvertKit } from "@/lib/convertkit";

// Contact form endpoint. Maps the form's topic dropdown to a specific
// ConvertKit tag, subscribes the visitor, and (TODO) sends an email
// notification to colivingcait@gmail.com via Resend once that key lands.
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

    const result = await subscribeToConvertKit({
      email,
      firstName,
      tagName,
      fields: {
        last_name: lastName,
        phone: phone ?? "",
        contact_topic: topic,
        last_message: message?.slice(0, 500), // bounded
      },
    });

    // Also add to community for nurture sequence
    await subscribeToConvertKit({
      email,
      firstName,
      tagName: CK_TAGS.COMMUNITY,
    });

    if (!result.ok) {
      // Don't fail the user even if CK errors — log and continue, since
      // we still want the message itself to land in Caitlyn's inbox.
      console.warn("[contact] CK subscribe failed", result.error);
    }

    // TODO: Email notification to colivingcait@gmail.com via Resend.
    console.log("[contact]", {
      firstName,
      lastName,
      email,
      phone,
      topic,
      message,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
