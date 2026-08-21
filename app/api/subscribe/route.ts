import { NextResponse } from "next/server";
import { submitToCrm } from "@/lib/crm";

// Unified subscribe endpoint. Every form across the site (newsletter
// boxes, lead magnets, the calculator email-gate) posts here with
// { email, first_name?, tag_name } and gets a consistent response - the
// tag_name becomes a CRM tag, same segmenting role it played in ConvertKit.

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

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 },
    );
  }

  const result = await submitToCrm("newsletter", { email, firstName, tags: [tagName], fields });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
