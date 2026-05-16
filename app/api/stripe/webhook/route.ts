import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { supabase } from "@/lib/supabase";

// Stripe sends the raw body, so we need to disable Next.js body parsing
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.user_id;
    const courseSlugs = session.metadata?.course_slugs;

    if (!userId || !courseSlugs) {
      console.error("Missing metadata on checkout session:", session.id);
      return NextResponse.json({ received: true });
    }

    // Grant access to each course (handles both single and bundle)
    const slugs = courseSlugs.split(",");
    for (const slug of slugs) {
      const { error } = await supabase.from("purchases").upsert(
        {
          user_id: userId,
          course_slug: slug.trim(),
          stripe_session_id: session.id,
          stripe_customer_id: session.customer as string,
          amount_paid: session.amount_total ?? 0,
        },
        { onConflict: "user_id,course_slug" },
      );
      if (error) {
        console.error(`Failed to record purchase for ${slug}:`, error);
      }
    }
  }

  return NextResponse.json({ received: true });
}
