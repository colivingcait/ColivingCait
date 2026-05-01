import { NextResponse } from "next/server";
import { CK_TAGS, subscribeToConvertKit } from "@/lib/convertkit";

// Buyer / investor inquiry endpoint. Two side effects:
//   1. ConvertKit subscribe with `buyer-lead` tag (live now via lib)
//   2. Forward to Follow Up Boss via Zapier webhook (TODO — needs
//      ZAPIER_BUYER_HOOK env var)
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

    // First name from full name (best-effort split; Caitlyn can clean
    // these up in CK if needed)
    const firstName = name.split(/\s+/)[0];

    const ck = await subscribeToConvertKit({
      email,
      firstName,
      tagName: CK_TAGS.BUYER_LEAD,
      fields: {
        full_name: name,
        phone,
        looking_for: lookingFor,
        price_range: priceRange,
      },
    });

    if (!ck.ok) {
      console.warn("[buyer-inquiry] CK subscribe failed", ck.error);
    }

    // TODO: forward to Follow Up Boss via Zapier hook.
    const zapHook = process.env.ZAPIER_BUYER_HOOK;
    if (zapHook) {
      try {
        await fetch(zapHook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            phone,
            lookingFor,
            priceRange,
          }),
        });
      } catch (err) {
        console.warn("[buyer-inquiry] Zapier forward failed", err);
      }
    }

    console.log("[buyer-inquiry]", {
      name,
      email,
      phone,
      lookingFor,
      priceRange,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
