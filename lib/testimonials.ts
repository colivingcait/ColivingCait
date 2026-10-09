// Zillow reviews shown on the homepage, About, and Buy & Sell pages.
// Quotes are contiguous sentences copied from Caitlyn's Zillow profile.
// https://www.zillow.com/profile/caitlynverdugo — 5.0 from 18 reviews.
export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  rating: number;
  source: string;
  /** Review date from Zillow, ISO 8601. Used in JSON-LD only. */
  published: string;
};

export const ZILLOW_PROFILE_URL = "https://www.zillow.com/profile/caitlynverdugo";
export const ZILLOW_RATING = "5.0";
export const ZILLOW_REVIEW_COUNT = 18;

export const zillowTestimonials: Testimonial[] = 
[
  {
    "quote": "Caitlyn was absolutely fantastic to work with while I was searching for an investment property in Atlanta. She is incredibly personable, easy to talk to, and made the process feel seamless from start to finish. As an investor, I really appreciated how knowledgeable she is about the market and how thoughtful her guidance was when evaluating opportunities.",
    "author": "Ariana S.",
    "role": "Investor",
    "rating": 5,
    "source": "Zillow",
    "published": "2026-01-17"
  },
  {
    "quote": "Caitlyn is hands down one of the best agents I’ve ever worked with. I’m on my second purchase with her. She knows her stuff when it comes to negotiations. She saved us on a broken sewer pipe, helping us get the owner to do repairs before closing. One thing that’s been huge for us is how well she understands repair costs. She can walk through a property and tell you almost exactly what things are going to cost to fix, which has saved our butts like in the sewer situation.",
    "author": "BurkeCapital",
    "role": "Repair costs & negotiation",
    "rating": 5,
    "source": "Zillow",
    "published": "2026-01-12"
  },
  {
    "quote": "I highly recommend Caitlyn, we had been trying to sell an investment property on our own for months and we’re about to give up when Caitlyn came and offered her services. I’m so grateful that we chose to work with her because she was able to use her expertise and get in sold. Working with her was a great experience!",
    "author": "Malika D.",
    "role": "Sold an investment property",
    "rating": 5,
    "source": "Zillow",
    "published": "2026-01-17"
  },
  {
    "quote": "Good service, fast document handling, solid negotiations, good network of contractors, good construction knowledge. We were able to walk the property together and quickly identify what was needed for goals in mind and how we would proceed to project completion.",
    "author": "David W.",
    "role": "Contractors & construction",
    "rating": 5,
    "source": "Zillow",
    "published": "2024-04-15"
  },
  {
    "quote": "Once we finally arrived at a house to close on, Caitlyn made the process as easy as possible for me, a first time homebuyer. During price negotiations with the seller, Caitlyn was very patient with the back and forth between me and the seller, ultimately achieving a very hefty concession from the seller. She's undoubtedly my go to realtor for my next property. She is prompt, professional, and cordial!",
    "author": "Kevin F.",
    "role": "First-time buyer",
    "rating": 5,
    "source": "Zillow",
    "published": "2024-06-05"
  },
  {
    "quote": "Caitlyn was amazing. She’s a process and organization QUEEN!!! So organized and clear with her communication as well as very responsive. She has a great sellers binder with the process and all the docs we need so we can stay organized. I love how she has a buyers binder with a lot of info for the home and neighborhood to help make our home’s buyers’ life easier.",
    "author": "Adam U.",
    "role": "Buyer",
    "rating": 5,
    "source": "Zillow",
    "published": "2024-04-11"
  },
  {
    "quote": "Our experience with Caitlyn was amazing. She is responsive, professional, diligent, trustworthy and really knows her stuff. She provided all of the knowledge, confidence and education that we could have hoped for throughout our home purchase. We couldn’t be happier with our new home, and we will be sure to recommend Caitlyn to all of our family and friends when they need to buy or sell! 10/10 would recommend and will use again!",
    "author": "Trammell K.",
    "role": "Buyer",
    "rating": 5,
    "source": "Zillow",
    "published": "2022-12-22"
  },
  {
    "quote": "After dealing with many real estate agents I have found the one who gets it done. Caitlyn Verdugo helped me buy my first house in an insane Market. Working with her made the whole transaction go very smoothly. Hands down the Best Real Estate Agent to work with.",
    "author": "Vladimir T.",
    "role": "First-time buyer",
    "rating": 5,
    "source": "Zillow",
    "published": "2021-08-16"
  },
  {
    "quote": "Caitlyn Verdugo is the best realtor we have ever dealt with. After dealing with several other realtors in the past and being disappointed, We felt extremely lucky to find her. Caitlyn really cared about us and understood our needs throughout the entire process. Caitlyn was extremely communicative and was always available to answer our questions. Very professional, experienced, and absolutely wonderful to work with. Highly recommend.",
    "author": "Kelly M.",
    "role": "Buyer",
    "rating": 5,
    "source": "Zillow",
    "published": "2021-05-11"
  },
  {
    "quote": "Caitlyn was extremely patient with this first time home buyer. She answered all my questions and, if for some reason she couldn’t, she found the answer for me. She was quick to respond whenever I reached out to her. Caitlyn was especially helpful during the inspection period. She did some great negotiating, always remaining professional. Well done, Caitlyn. Thank you for finding me a perfect fit!",
    "author": "theernataylor",
    "role": "First-time buyer",
    "rating": 5,
    "source": "Zillow",
    "published": "2021-01-01"
  }
]
;
