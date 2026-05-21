import { NextResponse } from "next/server";
import { createOrUpdateContact, FUB_TAGS } from "@/lib/followupboss";

export async function POST(request: Request) {
  try {
    const { email, firstName } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    createOrUpdateContact({
      email,
      firstName,
      tags: [FUB_TAGS.COMMUNITY],
      source: "ColivingCait.com - Newsletter Signup",
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
