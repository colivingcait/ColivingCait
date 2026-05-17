import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-04-22.dahlia",
});

// Map course slugs to Stripe Price IDs.
export const COURSE_PRICES: Record<string, string> = {
  "coliving-101": "price_1TY5k4JXTgKEkUxDK1cT5w3D",
  "house-hacking-101": "price_1TY5kzJXTgKEkUxDWvnSMFfH",
  "real-estate-101": "price_1TY5lbJXTgKEkUxDDPoZpQdq",
};

// Bundle: all three courses
export const BUNDLE_PRICE_ID = "price_1TY5j5JXTgKEkUxDUPdWbtYz";
export const BUNDLE_SLUGS = [
  "coliving-101",
  "house-hacking-101",
  "real-estate-101",
];

// Coaching & consulting
export const BUILDER_PRICE_ID = "price_1TXrkGJXTgKEkUxDUy2yuZlG";
export const OPERATOR_PRICE_ID = "price_1TXrlAJXTgKEkUxD5MLYpa2Q";
