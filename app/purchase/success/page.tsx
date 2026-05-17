import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/helpers";
import { stripe } from "@/lib/stripe";
import PixelPurchase from "@/components/PixelPurchase";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Purchase Complete — Coliving Cait",
};

export default async function PurchaseSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const user = await getCurrentUser();

  // Try to get course info from the Stripe session
  let courseName = "your course";
  let customerEmail = "";
  let purchaseAmount = 0;
  if (session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      customerEmail =
        session.customer_details?.email || session.customer_email || "";
      purchaseAmount = (session.amount_total ?? 0) / 100;
      const slugs = session.metadata?.course_slugs || "";
      if (slugs.includes(",")) {
        courseName = "the Explorer Bundle";
      } else if (slugs) {
        const names: Record<string, string> = {
          "coliving-101": "Coliving 101",
          "house-hacking-101": "House Hacking 101",
          "real-estate-101": "Real Estate Investing 101",
        };
        courseName = names[slugs] || courseName;
      }
    } catch (e) {
      // Stripe session might have expired, that's fine
    }
  }

  // If already signed in, send them straight to the dashboard
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <PixelPurchase value={purchaseAmount} contentName={courseName} />
      <div className="w-full max-w-lg text-center">
        <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-4">
          ✦ Purchase complete
        </p>
        <h1 className="font-heading text-4xl md:text-5xl leading-heading text-charcoal mb-4">
          You&apos;re in!
        </h1>
        <p className="text-warmgray leading-body mb-8">
          Your purchase of {courseName} is confirmed. Sign in with{" "}
          {customerEmail ? (
            <strong>{customerEmail}</strong>
          ) : (
            "the email you used at checkout"
          )}{" "}
          to access your course.
        </p>

        <Link
          href={`/auth/signin${customerEmail ? `?email=${encodeURIComponent(customerEmail)}` : ""}`}
          className="inline-block bg-charcoal text-cream px-8 py-3 text-sm uppercase tracking-eyebrow hover:bg-charcoal/90 transition-colors"
        >
          Sign in to start learning →
        </Link>

        <p className="mt-6 text-sm text-warmgray/60">
          A confirmation email has also been sent to your inbox.
        </p>
      </div>
    </div>
  );
}
