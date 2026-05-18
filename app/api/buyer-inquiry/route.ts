import { NextResponse } from "next/server";
import { createOrUpdateContact, FUB_TAGS } from "@/lib/followupboss";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, lookingFor, priceRange } = body ?? {};

    if (!name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const [firstName, ...rest] = name.split(" ");
    const lastName = rest.join(" ") || undefined;

    const tags = [FUB_TAGS.BUYER_LEAD, FUB_TAGS.COMMUNITY];

    createOrUpdateContact({
      email,
      firstName,
      lastName,
      phone,
      tags,
      source: "ColivingCait.com - Buyer Inquiry",
      message: `Looking for: ${lookingFor || "Not specified"}\nPrice range: ${priceRange || "Not specified"}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
