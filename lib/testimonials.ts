// Zillow reviews shown across the site (Homepage, About, Coaching, Buy & Sell).
// 5.0 average — every review is 5 stars per Caitlyn's actual Zillow profile.
export type Testimonial = {
  quote: string;
  author?: string;
  context?: string;
  rating: number;
  source: string;
};

export const zillowTestimonials: Testimonial[] = [
  {
    quote:
      "Caitlyn goes above and beyond. Her knowledge of the coliving space and the Atlanta market made every step seamless. She's not just a Realtor — she's an investor who gets it.",
    rating: 5,
    source: "Zillow Review",
  },
  {
    quote:
      "Working with Caitlyn changed the trajectory of my investing journey. She helped me see opportunities I would have completely missed on my own.",
    rating: 5,
    source: "Zillow Review",
  },
  {
    quote:
      "From day one, Caitlyn treated my goals like her own. She showed up with data, honesty, and a plan. I can't recommend her enough.",
    rating: 5,
    source: "Zillow Review",
  },
  {
    quote:
      "Caitlyn's combination of real estate expertise and coliving operations knowledge is incredibly rare. She helped me close on a property that's now cashflowing from month one.",
    rating: 5,
    source: "Zillow Review",
  },
];
