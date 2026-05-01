import { NextResponse } from "next/server";
import { subscribeToConvertKit } from "@/lib/convertkit";

// Lead-magnet endpoint. Used by every LeadMagnetForm + the calculator
// email gate. Posts directly to ConvertKit via the shared helper —
// applies the tag passed in the request body.
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

    const result = await subscribeToConvertKit({
      email,
      firstName,
      tagName: tag,
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 502 });
    }

    return NextResponse.json({ ok: true, mode: result.mode });
  } catch (err) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
