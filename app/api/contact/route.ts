import { NextResponse } from "next/server";

// Generic contact endpoint. Will:
//   1. Tag the subscriber in ConvertKit using the topic-derived tag
//   2. Send an email notification to colivingcait@gmail.com via Resend
//      (or whichever transactional email provider Caitlyn picks)
//
// Until those keys land, the endpoint just logs the submission so we can
// verify the form posts end-to-end.
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

    // TODO: ConvertKit tag — map `topic` value to a tag and subscribe.
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
