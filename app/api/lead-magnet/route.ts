import { NextResponse } from "next/server";
import { submitToCrm } from "@/lib/crm";

// Lead-magnet endpoint. Used by LeadMagnetForm + the calculator email
// gate. Forwards to the CRM, applying the tag passed in the request body.
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, email, tag } = body ?? {};

    if (!email || !tag) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const result = await submitToCrm("lead_magnet", { email, firstName, tags: [tag] });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
