import { NextResponse } from "next/server";
import { CK_TAGS } from "@/lib/convertkit";
import { submitToCrm } from "@/lib/crm";

// Buyer / investor inquiry endpoint. Forwards to Caitlyn's CRM, tagged
// buyer-lead and marked as a buyer contact.
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, lookingFor, priceRange } = body ?? {};

    if (!name || !email || !phone || !lookingFor || !priceRange) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const result = await submitToCrm("buyer_inquiry", {
      email,
      firstName: name.split(/\s+/)[0],
      phone,
      tags: [CK_TAGS.BUYER_LEAD],
      fields: { "Looking for": lookingFor, "Price range": priceRange },
    });

    if (!result.ok) {
      console.warn("[buyer-inquiry] CRM submission failed", result.error);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
