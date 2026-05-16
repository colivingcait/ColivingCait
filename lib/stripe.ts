import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-04-22.dahlia",
});

// Map course slugs to Stripe Price IDs.
export const COURSE_PRICES: Record<string, string> = {
  "coliving-101": "price_1TWTezJXTgKEkUxDyNOZBo2b",
  "house-hacking-101": "price_1TWTekJXTgKEkUxDcgmi0bL8",
  "real-estate-101": "price_1TWTeSJXTgKEkUxDJdx40aUD",
};

// Bundle: all three courses
export const BUNDLE_PRICE_ID = "price_1TWTfPJXTgKEkUxDVfgpElFA";
export const BUNDLE_SLUGS = [
  "coliving-101",
  "house-hacking-101",
  "real-estate-101",
];

// Coaching & consulting
export const BUILDER_PRICE_ID = "price_1TXrkGJXTgKEkUxDUy2yuZlG";
export const OPERATOR_PRICE_ID = "price_1TXrlAJXTgKEkUxD5MLYpa2Q";
