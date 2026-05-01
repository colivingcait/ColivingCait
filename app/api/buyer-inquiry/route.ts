import { NextResponse } from "next/server";

// Buyer / investor inquiry endpoint. Will fan out to:
//   1. Follow Up Boss via Zapier webhook (CRM) — env: ZAPIER_BUYER_HOOK
//   2. ConvertKit with tag `buyer-lead` — env: CONVERTKIT_API_KEY
// Until those keys land, the endpoint just logs the submission so we can
// verify the form posts end-to-end.
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

    // TODO: when ZAPIER_BUYER_HOOK is set, POST to that webhook with the
    // full payload to land in Follow Up Boss.
    // TODO: when CONVERTKIT_API_KEY is set, tag this email as `buyer-lead`
    // to trigger the buyer email sequence.
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
