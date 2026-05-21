import { NextResponse } from "next/server";
import { subscribeToConvertKit } from "@/lib/convertkit";

// Unified ConvertKit subscribe endpoint. Every form across the site can
// post to this route with { email, first_name?, tag_name } and get a
// consistent response.
//
// Falls back to a dev stub when CONVERTKIT_API_KEY isn't set so forms
// keep working in local development.

type Body = {
  email?: string;
  first_name?: string;
  tag_name?: string;
  fields?: Record<string, string | number | undefined>;
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch (err) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { email, first_name: firstName, tag_name: tagName, fields } = body;

  if (!email || !tagName) {
    return NextResponse.json(
      { error: "Missing email or tag_name" },
      { status: 400 },
    );
  }

  // Basic email shape check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 },
    );
  }

  const result = await subscribeToConvertKit({
    email,
    firstName,
    tagName,
    fields,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 502 });
  }

  return NextResponse.json({ ok: true, mode: result.mode });
}
