import { NextResponse } from "next/server";

// Placeholder lead-magnet endpoint. Logs the submission to the server
// console so we can verify forms are wiring up end-to-end before ConvertKit
// keys are added. Once CONVERTKIT_API_KEY is in the env, this will tag the
// subscriber with `tag` and trigger the matching email sequence.
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

    // TODO: Replace with ConvertKit API call once keys are configured.
    // Example shape:
    //   await fetch(`https://api.convertkit.com/v3/tags/${tagId}/subscribe`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       api_key: process.env.CONVERTKIT_API_KEY,
    //       email,
    //       first_name: firstName,
    //     }),
    //   });
    console.log("[lead-magnet]", { firstName, email, tag });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
