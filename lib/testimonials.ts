// Zillow reviews shown across the site (Homepage, About, Coaching, Buy & Sell).
// Replace these with the real review text + metadata once Caitlyn confirms.
// All testimonials should remain 5-star (5.0 average) per the brief.
export type Testimonial = {
  quote: string;
  author: string;
  context?: string;
  rating: number;
  source: string;
};

export const zillowTestimonials: Testimonial[] = [
  {
    quote:
      "Caitlyn knows this market inside and out. She helped us find an investment property that pencils — and she walked us through every number before we made an offer.",
    author: "M. Patel",
    context: "Investor · Decatur, GA",
    rating: 5,
    source: "Zillow Review",
  },
  {
    quote:
      "She doesn't just sell houses — she thinks like an investor. We bought our first house hack with Caitlyn and our tenants now cover 90% of our mortgage.",
    author: "J. & R. Thompson",
    context: "House Hackers · Atlanta, GA",
    rating: 5,
    source: "Zillow Review",
  },
  {
    quote:
      "I came in nervous and left confident. Caitlyn explained the coliving model clearly, ran the numbers honestly, and didn't push me into anything that wasn't right.",
    author: "S. Williams",
    context: "First-time Buyer · Stone Mountain, GA",
    rating: 5,
    source: "Zillow Review",
  },
  {
    quote:
      "Top to bottom the most knowledgeable agent I've worked with. She negotiated hard for us and her renovation insight saved us thousands.",
    author: "A. Garcia",
    context: "Seller · Snellville, GA",
    rating: 5,
    source: "Zillow Review",
  },
];
