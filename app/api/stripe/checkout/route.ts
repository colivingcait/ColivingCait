import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import { stripe, COURSE_PRICES, BUNDLE_PRICE_ID, BUNDLE_SLUGS, BUILDER_PRICE_ID, OPERATOR_PRICE_ID } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const { courseSlug } = await req.json();

  // Determine price ID and checkout mode
  const isBundle = courseSlug === "bundle";
  const isBuilder = courseSlug === "builder";
  const isOperator = courseSlug === "operator";
  const isSubscription = isOperator;

  let priceId: string | undefined;
  if (isBundle) priceId = BUNDLE_PRICE_ID;
  else if (isBuilder) priceId = BUILDER_PRICE_ID;
  else if (isOperator) priceId = OPERATOR_PRICE_ID;
  else priceId = COURSE_PRICES[courseSlug];

  if (!priceId) {
    return NextResponse.json(
      { error: "Product not configured for purchase yet" },
      { status: 400 },
    );
  }

  const origin = req.headers.get("origin") || process.env.NEXTAUTH_URL;

  // If user is signed in, pre-fill their email and attach user_id
  const userId = session?.user ? (session.user as any).id : undefined;
  const customerEmail = session?.user?.email || undefined;

  // Determine cancel URL
  let cancelUrl = `${origin}/learn?cancelled=1`;
  if (!isBundle && !isBuilder && !isOperator) {
    cancelUrl = `${origin}/courses/${courseSlug}?cancelled=1`;
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: isSubscription ? "subscription" : "payment",
    payment_method_types: ["card"],
    allow_promotion_codes: true,
    ...(customerEmail ? { customer_email: customerEmail } : {}),
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/purchase/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: cancelUrl,
    metadata: {
      ...(userId ? { user_id: userId } : {}),
      course_slug: courseSlug,
      course_slugs: isBundle ? BUNDLE_SLUGS.join(",") : courseSlug,
    },
  });

  return NextResponse.json({ url: checkoutSession.url });
}
