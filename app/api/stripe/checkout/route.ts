import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import { stripe, COURSE_PRICES, BUNDLE_PRICE_ID, BUNDLE_SLUGS } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { courseSlug } = await req.json();

  // Determine if this is a bundle or single course purchase
  const isBundle = courseSlug === "bundle";
  const priceId = isBundle ? BUNDLE_PRICE_ID : COURSE_PRICES[courseSlug];

  if (!priceId || priceId === "REPLACE_WITH_STRIPE_PRICE_ID" || priceId === "REPLACE_WITH_STRIPE_BUNDLE_PRICE_ID") {
    return NextResponse.json(
      { error: "Course not configured for purchase yet" },
      { status: 400 },
    );
  }

  const userId = (session.user as any).id;
  const origin = req.headers.get("origin") || process.env.NEXTAUTH_URL;

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    allow_promotion_codes: true,
    customer_email: session.user.email,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/courses/${isBundle ? "coliving-101" : courseSlug}/overview?purchased=1`,
    cancel_url: `${origin}/courses/${isBundle ? "" : courseSlug}?cancelled=1`,
    metadata: {
      user_id: userId,
      course_slug: courseSlug,
      // For bundles, store all course slugs so the webhook can grant access to all
      course_slugs: isBundle ? BUNDLE_SLUGS.join(",") : courseSlug,
    },
  });

  return NextResponse.json({ url: checkoutSession.url });
}
