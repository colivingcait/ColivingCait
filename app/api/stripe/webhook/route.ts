import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { supabase } from "@/lib/supabase";
import { createOrUpdateContact, FUB_TAGS } from "@/lib/followupboss";
import { sendWelcomeEmail } from "@/lib/emails/welcome";

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
    const courseSlugs = session.metadata?.course_slugs;
    const customerEmail = session.customer_details?.email || session.customer_email;

    if (!courseSlugs || !customerEmail) {
      console.error("Missing metadata or email on checkout session:", session.id);
      return NextResponse.json({ received: true });
    }

    // Find or create the user
    let userId = session.metadata?.user_id;

    if (!userId) {
      // Check if user already exists by email
      const { data: existingUser } = await supabase
        .from("users")
        .select("id")
        .eq("email", customerEmail)
        .single();

      if (existingUser) {
        userId = existingUser.id;
      } else {
        // Create new user from Stripe checkout email
        const { data: newUser, error: createError } = await supabase
          .from("users")
          .insert({
            email: customerEmail,
            name: session.customer_details?.name || null,
            email_verified: new Date().toISOString(),
          })
          .select()
          .single();

        if (createError) {
          console.error("Failed to create user:", createError);
          return NextResponse.json({ received: true });
        }
        userId = newUser.id;
      }
    }

    // Grant access to each course
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

    // Tag in Follow Up Boss (fire and forget)
    const firstName = session.customer_details?.name?.split(" ")[0] || undefined;
    const lastName = session.customer_details?.name?.split(" ").slice(1).join(" ") || undefined;
    const isBundle = courseSlugs.includes(",");

    // Build tags array
    const tags: string[] = [FUB_TAGS.COURSE_BUYER];

    for (const slug of slugs) {
      const tagMap: Record<string, string> = {
        "coliving-101": FUB_TAGS.COLIVING_101,
        "house-hacking-101": FUB_TAGS.HOUSE_HACKING_101,
        "real-estate-101": FUB_TAGS.REAL_ESTATE_101,
      };
      const tag = tagMap[slug.trim()];
      if (tag) tags.push(tag);
    }

    if (isBundle) {
      tags.push(FUB_TAGS.EXPLORER_BUNDLE);
    }

    createOrUpdateContact({
      email: customerEmail,
      firstName,
      lastName,
      tags,
      source: "ColivingCait.com - Course Purchase",
      message: `Purchased: ${isBundle ? "Explorer Bundle" : slugs.join(", ")}`,
    });

    // Send welcome email via Resend
    const courseNameMap: Record<string, string> = {
      "coliving-101": "Coliving 101",
      "house-hacking-101": "House Hacking 101",
      "real-estate-101": "Real Estate Investing 101",
      "builder": "The Builder",
      "operator": "The Operator",
    };
    const purchasedCourseName = isBundle
      ? "Explorer Bundle"
      : courseNameMap[slugs[0]?.trim()] || "your course";

    const origin = process.env.NEXTAUTH_URL || "https://www.colivingcait.com";
    sendWelcomeEmail({
      to: customerEmail,
      firstName,
      courseName: purchasedCourseName,
      isBundle,
      siteUrl: origin,
    });

    console.log(`[webhook] Purchase complete: ${customerEmail} → ${courseSlugs}`);
  }

  return NextResponse.json({ received: true });
}
