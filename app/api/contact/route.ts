import { NextResponse } from "next/server";
import { createOrUpdateContact, FUB_TAGS } from "@/lib/followupboss";

const TOPIC_TO_TAGS: Record<string, string[]> = {
  general: ["contact-form"],
  coaching: ["coaching-interested"],
  partnership: ["passive-investor", "partner-inquiry"],
  "buy-sell": ["buyer-lead"],
  "house-hacking": ["contact-form"],
  speaking: ["contact-form"],
  wcs: ["wcs-interested"],
  "she-leads": ["she-leads-coliving"],
  other: ["contact-form"],
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

    const tags = [
      ...(TOPIC_TO_TAGS[topic] ?? ["contact-form"]),
      FUB_TAGS.COMMUNITY,
    ];

    createOrUpdateContact({
      email,
      firstName,
      lastName,
      phone,
      tags,
      source: "ColivingCait.com - Contact Form",
      message: `Topic: ${topic}\n\n${message}`,
    });

    console.log("[contact]", { firstName, lastName, email, phone, topic, message });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
