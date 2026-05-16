import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import { stripe, COURSE_PRICES, BUNDLE_PRICE_ID, BUNDLE_SLUGS } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
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

  const origin = req.headers.get("origin") || process.env.NEXTAUTH_URL;

  // If user is signed in, pre-fill their email and attach user_id
  const userId = session?.user ? (session.user as any).id : undefined;
  const customerEmail = session?.user?.email || undefined;

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    allow_promotion_codes: true,
    ...(customerEmail ? { customer_email: customerEmail } : {}),
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/purchase/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/${isBundle ? "learn" : `courses/${courseSlug}`}?cancelled=1`,
    metadata: {
      ...(userId ? { user_id: userId } : {}),
      course_slug: courseSlug,
      course_slugs: isBundle ? BUNDLE_SLUGS.join(",") : courseSlug,
    },
  });

  return NextResponse.json({ url: checkoutSession.url });
}
