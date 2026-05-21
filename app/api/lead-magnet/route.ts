import { NextResponse } from "next/server";
import { createOrUpdateContact, FUB_TAGS } from "@/lib/followupboss";

export async function POST(request: Request) {
  try {
    const { email, firstName, tag } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const tags = [tag || "lead-magnet", FUB_TAGS.COMMUNITY];

    createOrUpdateContact({
      email,
      firstName,
      tags,
      source: "ColivingCait.com - Lead Magnet",
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
