import type { Course } from "./types";

// Coliving 101 — six self-paced lessons. Content here is the structured
// outline + worked placeholder copy. Caitlyn fills in the full essays in
// a later pass. Quiz questions and worksheets are real and shippable.

export const coliving101: Course = {
  slug: "coliving-101",
  title: "Coliving 101",
  tagline: "The model, the math, the move.",
  description:
    "Six lessons. The full coliving model walk-through — built for women seriously considering coliving as their next move.",
  longDescription:
    "A self-paced introduction to the coliving model — what it is, why it works right now, how the math actually pencils, what to look for in a property, how to launch, how to operate, and which path fits you. Six lessons, ~90 minutes total. Worksheets and a knowledge-check quiz with every lesson. Lifetime access.",
  price: 27,
  status: "available",
  symbol: "◈",
  outcomes: [
    "Understand the coliving model end-to-end",
    "Run the math on any property in under 5 minutes",
    "Spot the 3 non-negotiables of a great coliving home",
    "Know what to look for, what to avoid, and what to ask",
    "Pick the path that fits where you actually are right now",
  ],
  audience: [
    "Women considering their first coliving deal",
    "Investors transitioning from traditional rentals",
    "House hackers thinking about scaling into coliving",
    "Anyone curious about the model before booking a coaching call",
  ],
  lessons: [
    /* -------- LESSON 1 -------- */
    {
      slug: "what-is-coliving",
      number: 1,
      title: "What is coliving & why it's having its moment",
      description:
        "Coliving defined. Why now. The dual mission. Who actually lives in coliving.",
      duration: "12 min",
      sections: [
        { type: "video" },
        {
          type: "paragraph",
          content:
            "Coliving is rent-by-the-room housing — a single home with six or more private bedrooms and shared common spaces. Residents lease their own room individually, on flexible terms, in a fully furnished space with utilities and internet included. It's not a hostel, not a boarding house, not a group rental. It's the most efficient way to house working professionals in the kind of homes they want to live in — and the rare investment strategy where the math actually works in 2026.",
        },
        { type: "heading", content: "Why coliving is having its moment" },
        {
          type: "paragraph",
          content:
            "Three forces converged at once. First: rents have outpaced wages for over a decade. Single-family rentals stopped pencilling for working people years ago. Second: the traditional path of \"rent alone or cosign\" is increasingly out of reach. A 3x income requirement on a $1,800 apartment is a wall most people can't climb. Third: there's a quiet loneliness epidemic. People want their own space — but they also want neighbors.",
        },
        {
          type: "paragraph",
          content:
            "Coliving solves all three at once. Lower per-room rent. Flexible lease. Built-in community for those who want it.",
        },
        {
          type: "key-takeaway",
          title: "The dual mission",
          body: "Coliving is one of the most powerful tools we have right now to accomplish two missions at once: solving the affordable housing crisis AND helping everyday women build real wealth through real estate.",
        },
        { type: "heading", content: "Who actually lives in coliving" },
        {
          type: "paragraph",
          content:
            "The stereotypes about who lives in shared housing are out of date. Today's coliving residents are working professionals — often well-paid ones — choosing flexibility and affordability over a single-family lease.",
        },
        {
          type: "bullets",
          items: [
            "Travel nurses on 13-week assignments",
            "Software engineers, consultants, and remote workers in transition",
            "Recent graduates entering the workforce",
            "People going through a divorce or relationship change",
            "Folks relocating for a new job before signing a long-term lease",
            "Anyone for whom 12 months and a 3x income hurdle isn't a fit",
          ],
        },
        {
          type: "fascination",
          body: "Travel nurses alone make up 15–25% of residents in well-marketed coliving homes near major hospital systems.",
        },
        { type: "heading", content: "Coliving vs. traditional rental" },
        {
          type: "paragraph",
          content:
            "A traditional single-family rental has one tenant, one rent payment, one lease, one income stream. A coliving home has six to eight tenants, six to eight rent payments, six to eight individual leases, and a diversified income stream. When one room turns over, you don't lose 100% of your revenue — you lose 12-15%.",
        },
      ],
      quiz: [
        {
          question: "What is the core definition of coliving?",
          options: [
            "A type of vacation rental",
            "Rent-by-the-room housing where multiple unrelated residents share a single home with their own private bedrooms",
            "Cohousing intentional communities",
            "A short-term rental on Airbnb",
          ],
          correctIndex: 1,
          explanation:
            "Coliving is rent-by-the-room — a single home divided into private bedrooms with shared common spaces. Each resident has their own lease.",
        },
        {
          question: "Why is coliving 'having its moment' right now?",
          options: [
            "New construction has solved the housing shortage",
            "Most people prefer to live alone",
            "Rents have outpaced wages for a decade, traditional options are broken for working people, and there's a real desire for community",
            "The government mandates it",
          ],
          correctIndex: 2,
          explanation:
            "Three forces converged: rising rents, broken traditional rental access (3x income, long leases), and a real demand for connection.",
        },
        {
          question: "What is the dual mission of coliving?",
          options: [
            "Make a quick profit and exit",
            "Solve the affordable housing crisis AND help everyday women build real wealth through real estate",
            "Disrupt traditional real estate",
            "Replace single-family homes",
          ],
          correctIndex: 1,
          explanation:
            "Coliving uniquely accomplishes both missions at once — investor wealth + community housing supply.",
        },
        {
          question: "Who typically lives in coliving?",
          options: [
            "College students only",
            "Tourists and vacationers",
            "Working professionals, travel nurses, recent grads, and people in life transitions",
            "Families with young children",
          ],
          correctIndex: 2,
          explanation:
            "Coliving residents are overwhelmingly working professionals choosing flexibility and affordability.",
        },
        {
          question: "Which of the following is NOT a core feature of coliving?",
          options: [
            "Furnished private bedroom",
            "Shared common spaces",
            "All-inclusive monthly pricing",
            "Mandatory 12-month lease minimum",
          ],
          correctIndex: 3,
          explanation:
            "Coliving leases are typically month-to-month or weekly — flexibility is a defining feature, not a 12-month lock-in.",
        },
      ],
      worksheet: {
        title: "Coliving 101 Glossary + Market Assessment Checklist",
        href: "/downloads/coliving-101-lesson-1-worksheet.pdf",
      },
    },

    /* -------- LESSON 2 -------- */
    {
      slug: "the-math",
      number: 2,
      title: "The math that makes coliving impossible to ignore",
      description:
        "Why traditional rentals don't pencil anymore. The room-by-room revenue model. Real example: same property, different strategy.",
      duration: "15 min",
      sections: [
        { type: "video" },
        {
          type: "paragraph",
          content:
            "If there's one lesson that turns coliving-curious into coliving-committed, it's this one. The math doesn't lie. And once you've seen the math, the strategy becomes obvious.",
        },
        { type: "heading", content: "Why traditional rentals don't cashflow" },
        {
          type: "paragraph",
          content:
            "A traditional single-family rental in most metros today: $1,800–$2,200 in gross rent. After mortgage, taxes, insurance, and maintenance, that's break-even at best — often negative cashflow. The numbers stopped working for traditional rentals a long time ago. Investors have been holding for appreciation only.",
        },
        { type: "heading", content: "The room-by-room revenue model" },
        {
          type: "paragraph",
          content:
            "In coliving, you stop renting the property as a unit and start renting the bedrooms as individual products. Each room is its own line of revenue. Most converted homes produce six to eight rooms.",
        },
        {
          type: "key-takeaway",
          title: "Standard room rates",
          body: "Shared bathroom rooms rent for around $750/mo. Private bathroom (ensuite) rooms rent for around $1,000/mo. Always project at 85% occupancy — never 100% — because real-world turnover happens.",
        },
        { type: "heading", content: "Same property, different strategy" },
        {
          type: "paragraph",
          content:
            "Take a $325,000 home in the Atlanta metro. As a traditional rental, it leases for $1,950/mo. After expenses, you're cashflowing maybe $100/mo. Maybe.",
        },
        {
          type: "paragraph",
          content:
            "The same home, converted to a 7-room coliving (3 ensuite + 4 shared bath), grosses $5,800/mo. After all expenses — mortgage, taxes, insurance, utilities, platform fees, maintenance, and turnover — you're netting $1,200+/mo. The same property, with the same loan, producing 12x the cashflow.",
        },
        { type: "heading", content: "The full expense picture" },
        {
          type: "paragraph",
          content:
            "Coliving has more expenses than a traditional rental. You cover utilities, internet, common-area cleaning, more maintenance (more people = more wear), and a platform fee if you're using one. Here's what to model:",
        },
        {
          type: "bullets",
          items: [
            "Mortgage (P&I) — based on purchase price, down payment, rate, and term",
            "Property taxes — typically 1.2% of purchase price annually",
            "Insurance — about $250/mo flat for a coliving-rated landlord/dwelling fire policy",
            "Utilities + internet — about $150/mo per room",
            "Platform fee — 8% of gross revenue if using PadSplit",
            "Maintenance reserve — 10% of gross revenue",
            "Turnover allowance — about $100/mo at steady state",
          ],
        },
        {
          type: "fascination",
          body: "On a 7-room property at 85% occupancy, you're collecting roughly $4,930 in effective gross rent — enough to cover all operating expenses and still cashflow $1,000+ in most metros.",
        },
        {
          type: "padsplit",
          body: "PadSplit is the platform I use to list and fill rooms across my portfolio. As a host you also get access to room-rate data by zip code, occupancy benchmarks, and furnishing guidelines.",
          bullets: [
            "Average room rates by zip code",
            "Occupancy rates by market",
            "Furnishing guidelines",
            "Affordable housing newsletters",
          ],
        },
      ],
      quiz: [
        {
          question:
            "What is the standard occupancy assumption when projecting coliving revenue?",
          options: ["100%", "95%", "85%", "75%"],
          correctIndex: 2,
          explanation:
            "Always project at 85% — real-world turnover happens, and pretending it doesn't will burn you.",
        },
        {
          question: "What is the typical rate for a shared-bathroom room?",
          options: ["$500", "$750", "$1,000", "$1,500"],
          correctIndex: 1,
          explanation:
            "Shared-bath rooms typically rent at around $750/mo. Adjust by market.",
        },
        {
          question: "What is the typical rate for a private (ensuite) bathroom room?",
          options: ["$500", "$750", "$1,000", "$1,500"],
          correctIndex: 2,
          explanation:
            "Private-bath rooms command roughly $250/mo more than shared — about $1,000/mo.",
        },
        {
          question: "Why don't traditional single-family rentals cashflow well in 2026?",
          options: [
            "Tenants don't pay rent anymore",
            "Property values have dropped",
            "Mortgage costs and operating expenses outpace single-tenant rent in most metros",
            "Rental laws prohibit profit",
          ],
          correctIndex: 2,
          explanation:
            "Costs went up faster than rents. Single-tenant rent doesn't cover the operating budget anymore.",
        },
        {
          question: "Which of these is NOT a typical coliving operating expense?",
          options: [
            "Mortgage, taxes, insurance",
            "Utilities + internet",
            "Platform fee + maintenance reserve",
            "HOA dues",
          ],
          correctIndex: 3,
          explanation:
            "Coliving operators avoid HOA properties — HOA restrictions almost always conflict with rent-by-the-room operations.",
        },
      ],
      worksheet: {
        title: "Deal Analysis Template",
        href: "/downloads/coliving-101-lesson-2-worksheet.pdf",
      },
    },

    /* -------- LESSON 3 -------- */
    {
      slug: "finding-properties",
      number: 3,
      title: "Finding & evaluating coliving properties",
      description:
        "The sweet spot. Parking. HOA red flags. The extra rooms hiding in plain sight.",
      duration: "14 min",
      sections: [
        { type: "video" },
        {
          type: "paragraph",
          content:
            "Property selection is the single biggest determinant of whether your coliving deal works. Get this part right and operations becomes a manageable challenge. Get it wrong and no amount of operational excellence will save you.",
        },
        { type: "heading", content: "The sweet spot" },
        {
          type: "paragraph",
          content:
            "Coliving works best at six or more rooms — and really shines at eight or more. The sweet spot is an 8-bedroom (or expandable-to-8-bedroom) home with 3-4 bathrooms and 2,000+ sqft of livable space. Multi-zone or tri-level layouts beat open-concept and single-story every time.",
        },
        {
          type: "key-takeaway",
          title: "Three non-negotiables",
          body: "1) No HOA. 2) Parking for at least 60% of room count. 3) A floorplan that supports privacy — not an open-concept layout. Break any of these three and the property is a hard pass, regardless of the price.",
        },
        { type: "heading", content: "Parking — the hidden constraint" },
        {
          type: "paragraph",
          content:
            "In Atlanta, the rule of thumb is parking for at least 60% of your rooms. Less than that and neighbors get loud. Less than 40% and you risk shutdown by the city. Count driveway, garage, and on-street spots that residents can actually use.",
        },
        { type: "heading", content: "HOAs — instant walk away" },
        {
          type: "paragraph",
          content:
            "Even when an HOA technically allows rentals, almost every HOA's covenants conflict with the realities of coliving — overnight guest restrictions, maximum unrelated occupants, parking rules, common-area enforcement. We strongly advise against coliving in HOA communities, period.",
        },
        {
          type: "fascination",
          body: "More than half of properties listed as 'investor-friendly' in metro Atlanta are actually in HOAs. Always check.",
        },
        { type: "heading", content: "Extra rooms hiding in plain sight" },
        {
          type: "paragraph",
          content:
            "A 4-bedroom home isn't a 4-room coliving. It's potentially a 6, 7, or 8-room coliving, depending on the layout. Look for:",
        },
        {
          type: "bullets",
          items: [
            "Formal dining room — easy bedroom conversion (+1 room)",
            "Finished basement — +1 to +2 rooms depending on entrance",
            "Sunroom / four-season room — +1 room with HVAC",
            "Bonus room or loft — +1 room",
            "Home office — often already a small room",
            "In-law suite or ADU — +1 to +2 rooms, sometimes already plumbed",
          ],
        },
        {
          type: "callout",
          tone: "blush",
          body: "✦ One closet decision can make or cost you $40,000+ over the hold period. Closets — or thoughtful clothing-rack alternatives — separate a comfortable room from a regrettable one.",
        },
        { type: "heading", content: "What you can't see in photos" },
        {
          type: "paragraph",
          content:
            "Online listings hide the things that matter most. Plumbing capacity, electrical capacity, HVAC capacity for added rooms — none of that shows up in MLS photos. That's why a good walk-through is non-negotiable. There's a $15,000 problem hiding in almost every coliving conversion, and it's not the one you expected.",
        },
      ],
      quiz: [
        {
          question:
            "What's the sweet spot for a coliving property?",
          options: [
            "2BR/1BA, 800 sqft",
            "4BR/2BA, 1,500 sqft single-story",
            "8BR/3-4BA, 2,000+ sqft, multi-zone or tri-level",
            "10BR/5BA, 4,000 sqft, fully open concept",
          ],
          correctIndex: 2,
          explanation:
            "The 8-bedroom (or convertible-to-8) tri-level / multi-zone home is the gold standard.",
        },
        {
          question: "What's the parking rule of thumb in Atlanta?",
          options: [
            "One spot per house",
            "At least 60% of room count",
            "100% of room count",
            "Parking doesn't matter",
          ],
          correctIndex: 1,
          explanation:
            "Less than 60% causes neighbor friction. Less than 40% can lead to shutdown.",
        },
        {
          question: "If a property is in an HOA…",
          options: [
            "It's the best option for coliving",
            "It depends on rental rules",
            "Walk away — instant Low confidence regardless of other factors",
            "It increases the income",
          ],
          correctIndex: 2,
          explanation:
            "HOA covenants almost always conflict with coliving operations. We strongly advise against HOA properties, period.",
        },
        {
          question: "Which floorplan style is BEST for coliving?",
          options: [
            "Wide-open concept with no doors",
            "Studio apartment",
            "Multi-zone or tri-level with separated bedroom wings",
            "Single-story open layout",
          ],
          correctIndex: 2,
          explanation:
            "Coliving rewards privacy. Multi-zone homes give residents space and quiet.",
        },
        {
          question: "Which of these is an extra room 'hiding in plain sight'?",
          options: [
            "The kitchen",
            "The dining room, basement, or bonus room",
            "The garage roof",
            "The front porch",
          ],
          correctIndex: 1,
          explanation:
            "Formal dining rooms, finished basements, sunrooms, and bonus rooms are the four most common 'hidden' rooms.",
        },
      ],
      worksheet: {
        title: "Property Evaluation Checklist",
        href: "/downloads/coliving-101-lesson-3-worksheet.pdf",
      },
    },

    /* -------- LESSON 4 -------- */
    {
      slug: "setting-up-and-launching",
      number: 4,
      title: "Setting up & launching your coliving property",
      description:
        "The launch sequence. The non-negotiable tech stack. Listing platforms. Lease structure.",
      duration: "16 min",
      sections: [
        { type: "video" },
        {
          type: "paragraph",
          content:
            "Buying the right property is half the battle. Launching it correctly is the other half. The order in which you do things matters more than most operators realize — get the sequence wrong and you'll pay for it twice.",
        },
        { type: "heading", content: "The launch sequence" },
        {
          type: "paragraph",
          content:
            "Every coliving launch follows the same six-step sequence. Out-of-order steps mean rework, delays, and money left on the table.",
        },
        {
          type: "numbered",
          items: [
            "Renovation — bedrooms, bathrooms, common spaces",
            "Furnishing — beds, desks, dressers, common-area furniture",
            "Tech — locks, internet, cameras, platform setup",
            "Listing — photos, copy, marketing across platforms",
            "Screening — applications, references, court records",
            "Move-in — orientation, house rules, community building",
          ],
        },
        { type: "heading", content: "The non-negotiable tech stack" },
        {
          type: "paragraph",
          content:
            "Three tech investments are non-negotiable for any coliving operation. Skip any of them and you'll regret it within the first sixty days.",
        },
        {
          type: "key-takeaway",
          title: "The three non-negotiables",
          body: "Smart locks on every bedroom and exterior door (no keys, ever). High-speed business-grade internet (residents work from home). Exterior cameras at all entry points (security and accountability).",
        },
        { type: "heading", content: "Listing platforms" },
        {
          type: "paragraph",
          content:
            "You don't pick one platform. You list on multiple — different residents find rooms in different places.",
        },
        {
          type: "bullets",
          items: [
            "PadSplit — purpose-built for coliving, integrated screening",
            "Facebook Marketplace — high traffic, low cost-per-lead",
            "Furnished Finder — strong for travel nurses",
            "Roomies — for the more traditional roommate market",
          ],
        },
        { type: "heading", content: "Lease structure" },
        {
          type: "paragraph",
          content:
            "Each room is leased individually. Don't let multiple residents go on a single shared lease — when one person stops paying, you don't want the other six holding the bag (or vice versa).",
        },
        {
          type: "bullets",
          items: [
            "Individual lease per room — never group leases",
            "Month-to-month or weekly terms",
            "Room-specific (lease ties to the specific bedroom, not generic 'a room')",
            "House rules attached as an addendum",
          ],
        },
        {
          type: "fascination",
          body: "A single-phase renovation can affect your refinancing options by $25,000+ depending on how the appraiser values 'completed' vs 'in-progress' work.",
        },
        { type: "heading", content: "Furnishing strategy" },
        {
          type: "paragraph",
          content:
            "Operators choose between fully-furnished, partially-furnished, or unfurnished depending on market and strategy. If you furnish, budget $1,500–$2,500 per room. Standardize the furniture across all your properties — easier to reorder, replace, and inventory.",
        },
      ],
      quiz: [
        {
          question: "What's the correct sequence of launching a coliving property?",
          options: [
            "Listing → Screening → Renovation → Move-in",
            "Renovation → Furnishing → Tech → Listing → Screening → Move-in",
            "Move-in → Renovation → Listing",
            "Tech → Screening → Renovation → Listing",
          ],
          correctIndex: 1,
          explanation:
            "Out-of-order means rework. Always: renovation → furnishing → tech → listing → screening → move-in.",
        },
        {
          question: "Which is part of the non-negotiable tech stack?",
          options: [
            "Smart TV in every bedroom",
            "Smart locks and high-speed business-grade internet",
            "Surround sound in the living room",
            "A doorbell camera only",
          ],
          correctIndex: 1,
          explanation:
            "Smart locks + business-grade internet + exterior cameras are the three non-negotiables.",
        },
        {
          question: "Which platform is purpose-built for coliving rooms?",
          options: [
            "Zillow only",
            "PadSplit",
            "LinkedIn",
            "Google Maps",
          ],
          correctIndex: 1,
          explanation:
            "PadSplit is the dominant coliving-specific platform — but list on Facebook Marketplace, Furnished Finder, and Roomies too.",
        },
        {
          question: "What lease structure works best for coliving?",
          options: [
            "One annual lease for the whole property",
            "Individual leases per room, month-to-month or weekly",
            "No lease at all — handshake deals",
            "Verbal agreements with deposits only",
          ],
          correctIndex: 1,
          explanation:
            "Individual leases per room protect every party. Group leases create messy shared liability.",
        },
        {
          question: "Why do operators standardize furniture across their portfolio?",
          options: [
            "To get a discount from one vendor",
            "Easier to reorder, replace, and inventory across multiple properties",
            "Because it's required by law",
            "To match Pinterest aesthetics",
          ],
          correctIndex: 1,
          explanation:
            "Standardization saves operational time and turns furnishing from a project into a process.",
        },
      ],
      worksheet: {
        title: "Coliving Launch Checklist",
        href: "/downloads/coliving-101-lesson-4-worksheet.pdf",
      },
    },

    /* -------- LESSON 5 -------- */
    {
      slug: "operations",
      number: 5,
      title: "Operations — the questions every new operator asks",
      description:
        "Time commitment. Resident issues. Maintenance. Community. Legal basics.",
      duration: "14 min",
      sections: [
        { type: "video" },
        {
          type: "paragraph",
          content:
            "Once the property is launched, the real work begins — and it's not what most new operators expect. Operations is part property management, part HR, part hospitality. Done well, it's the difference between a property that runs itself and one that runs you.",
        },
        { type: "heading", content: "Time commitment" },
        {
          type: "paragraph",
          content:
            "Plan on 10–15 hours per week during the launch and stabilization phase (first 90 days). Once the property is full and the systems are running, that drops to 2–5 hours per week per property. The work compresses dramatically once your screening, communication, and maintenance systems are in place.",
        },
        { type: "heading", content: "When a resident is late on rent" },
        {
          type: "key-takeaway",
          title: "Address it day 1, not day 5",
          body: "The single biggest mistake new operators make is letting non-payment slide. Every day past due is harder to recover. Friendly reminder day 1. Direct text day 3. Written notice day 7. Formal eviction process day 30+. The script doesn't change. The kindness doesn't change. The deadline doesn't change.",
        },
        { type: "heading", content: "When residents conflict" },
        {
          type: "paragraph",
          content:
            "Resident-on-resident conflicts are inevitable. Your job isn't to take sides. Your job is to listen, identify the behavior in question, and refer everyone back to the house rules. The rules do the work. You enforce them.",
        },
        { type: "heading", content: "Maintenance" },
        {
          type: "paragraph",
          content:
            "Coliving has more maintenance than a single-family rental — more bodies, more wear, more shared appliance use. The fix is preventive maintenance on a calendar, not reactive maintenance on a panic.",
        },
        {
          type: "bullets",
          items: [
            "HVAC filter changes every 90 days",
            "Quarterly plumbing inspection (drains, leaks, water pressure)",
            "Smoke detector testing every 6 months",
            "Common-area cleaning weekly (hire it out)",
            "Exterior maintenance seasonally",
          ],
        },
        {
          type: "fascination",
          body: "The #1 maintenance issue that sends residents packing is, surprisingly, slow internet. The second is unaddressed bathroom plumbing.",
        },
        { type: "heading", content: "Community — responsive, not forced" },
        {
          type: "paragraph",
          content:
            "Coliving residents come for the affordability and stay for the quality of the home. The community is a bonus, not a requirement. Don't force events. Don't mandate participation. Be responsive when residents want connection, intentional with the spaces they share, and respectful when they want privacy. The intentionality is what separates coliving from a boarding house.",
        },
        { type: "heading", content: "Legal basics" },
        {
          type: "paragraph",
          content:
            "Three legal essentials for any coliving operation:",
        },
        {
          type: "bullets",
          items: [
            "Operating entity — LLC at minimum, separate from your personal name",
            "Insurance — landlord/dwelling fire policy plus liability coverage rated for the use case",
            "Local permits — check city and county rental registration / inspection requirements",
          ],
        },
        {
          type: "callout",
          tone: "cream",
          body: "✦ Talk to a CPA and a real estate attorney before your first property launches. Both are deductible business expenses, and both will save you a multiple of what they cost.",
        },
      ],
      quiz: [
        {
          question:
            "What's the typical time commitment after stabilization?",
          options: [
            "40+ hrs/week per property",
            "20–30 hrs/week per property",
            "10–15 hrs/week at launch, 2–5 hrs/week at steady state",
            "Zero hours — coliving is fully passive",
          ],
          correctIndex: 2,
          explanation:
            "Plan for 10–15 hrs/wk during launch. Drops to 2–5 hrs/wk per property once systems are running.",
        },
        {
          question: "When a resident is late on rent, the right move is:",
          options: [
            "Wait a week before saying anything",
            "Address it day 1 — not day 5, not day 15",
            "Immediately file for eviction",
            "Forgive the payment",
          ],
          correctIndex: 1,
          explanation:
            "Friendly reminder day 1. Direct text day 3. Written notice day 7. Don't let it slide.",
        },
        {
          question:
            "What's the right operator move when two residents are in conflict?",
          options: [
            "Pick a side immediately",
            "Listen, identify the behavior in question, and refer everyone back to the house rules",
            "Evict both residents",
            "Ignore it and hope it goes away",
          ],
          correctIndex: 1,
          explanation:
            "The rules do the work. Your job is to enforce them consistently and listen well.",
        },
        {
          question:
            "What entity structure is recommended for a coliving operation?",
          options: [
            "Sole proprietorship under your own name",
            "LLC plus appropriate insurance and local rental permits",
            "Verbal partnership without paperwork",
            "C-corp",
          ],
          correctIndex: 1,
          explanation:
            "LLC at minimum, plus the right insurance policy and any local rental registration requirements.",
        },
        {
          question: "The community in a coliving home should be:",
          options: [
            "Mandatory and forced",
            "Responsive and intentional, not forced",
            "Non-existent — operators should be invisible",
            "Run entirely by the residents themselves",
          ],
          correctIndex: 1,
          explanation:
            "Be responsive when residents want connection, intentional with the spaces, and respectful of privacy.",
        },
      ],
      worksheet: {
        title: "Operations Quick Reference Guide",
        href: "/downloads/coliving-101-lesson-5-worksheet.pdf",
      },
    },

    /* -------- LESSON 6 -------- */
    {
      slug: "is-coliving-right-for-you",
      number: 6,
      title: "Is coliving right for you? Your next steps",
      description:
        "The three paths in. Common mistakes. What to do next.",
      duration: "10 min",
      sections: [
        { type: "video" },
        {
          type: "paragraph",
          content:
            "By now you've seen the model, run the math, evaluated properties on paper, mapped out a launch, and understood the operations. The last question: which path is right for you?",
        },
        { type: "heading", content: "Three paths into coliving" },
        {
          type: "paragraph",
          content:
            "There's no single right way to participate in coliving. There are three — and the right one for you depends on capital, time, experience, and where you are in your life.",
        },
        {
          type: "key-takeaway",
          title: "Path 01 — Active operator",
          body: "You buy the property, convert it, and operate it yourself. Highest control, highest upside, highest time commitment. The right path for women who want to build a real portfolio and learn the model deeply.",
        },
        {
          type: "key-takeaway",
          title: "Path 02 — Arbitrage operator",
          body: "You don't buy. You lease properties from other owners and operate them as coliving. Lower capital requirement, faster to scale, but margins are tighter and you don't capture appreciation. Best for women with operations experience but limited capital.",
        },
        {
          type: "key-takeaway",
          title: "Path 03 — Passive investor",
          body: "You provide capital. Someone else does the work. You earn returns from a real cashflowing asset without operational responsibility. The right path for women with capital but limited time or limited interest in operations.",
        },
        { type: "heading", content: "Common mistakes" },
        {
          type: "paragraph",
          content:
            "Across hundreds of conversations with first-time operators, a few mistakes show up over and over:",
        },
        {
          type: "bullets",
          items: [
            "Underestimating renovation costs by 20–30%",
            "Skipping due diligence on plumbing, electrical, or HVAC capacity",
            "Going it alone — not finding a coach, mentor, or community",
            "Not treating it like a business — no entity, no books, no systems",
            "Trying to time the market instead of starting where they are",
            "Waiting for the perfect deal instead of getting good at evaluating any deal",
          ],
        },
        { type: "heading", content: "Your next steps" },
        {
          type: "paragraph",
          content:
            "Whatever path you chose — there's something to do this week to move it forward. Pick one. Then take the next one.",
        },
        {
          type: "callout",
          tone: "gold",
          body: "✦ The 1:1 Coaching Program ($3,000 · 8 weeks) is designed for women starting from scratch — building the roadmap, sourcing the deal, running the underwriting, walking through the conversion, and standing it up together. It's the fastest path from coliving-curious to coliving-operating.",
        },
        {
          type: "callout",
          tone: "blush",
          body: "✦ The Advisory Retainer ($1,500/mo · month-to-month) is for women already operating who need a thinking partner — someone to bring the messy questions to. Deal reviews, ops troubleshooting, accountability.",
        },
        {
          type: "callout",
          tone: "cream",
          body: "✦ Need a Realtor in Atlanta? I'm a working coliving operator AND a Keller Williams agent. I find investor-grade properties and I run the same numbers for your deal that I run for my own. Book a buy-and-sell discovery call.",
        },
        {
          type: "callout",
          tone: "cream",
          body: "✦ Want to invest passively? I take on a small number of partners per year — private money lending, equity partnerships, or property arbitrage. Book a partnership discovery call.",
        },
        {
          type: "callout",
          tone: "blush",
          body: "✦ Just want the community? She Leads Coliving is a free private Facebook group for women in coliving — at every stage. Join us.",
        },
        {
          type: "quote",
          content:
            "Every coliving home any of us opens is one more option for someone in our community who needs a safe, stable, clean, high quality and affordable place to land.",
          attribution: "Caitlyn Verdugo · Coliving Cait",
        },
      ],
      quiz: [
        {
          question: "The three paths into coliving are:",
          options: [
            "Buy, sell, hold",
            "Active operator, arbitrage operator, passive investor",
            "Realtor, mortgage broker, contractor",
            "Investor, lender, agent",
          ],
          correctIndex: 1,
          explanation:
            "Active (own and operate), arbitrage (lease and operate), and passive (provide capital).",
        },
        {
          question: "What's a common mistake first-time operators make?",
          options: [
            "Doing too much research before buying",
            "Underestimating renovation costs and skipping due diligence",
            "Spending too little on furnishings",
            "Hiring help too early in the process",
          ],
          correctIndex: 1,
          explanation:
            "Underestimating costs by 20–30% and skipping due diligence on plumbing/electrical/HVAC are the two most common.",
        },
        {
          question: "What is the price of Caitlyn's 1:1 coaching program?",
          options: ["$500", "$1,500", "$3,000", "$10,000"],
          correctIndex: 2,
          explanation: "The Coaching Program is $3,000 for 8 weeks, 1:1.",
        },
        {
          question: "What is the price of Caitlyn's monthly advisory retainer?",
          options: ["$500/mo", "$1,500/mo", "$3,000/mo", "Free"],
          correctIndex: 1,
          explanation:
            "The Advisory Retainer is $1,500/mo, month-to-month, for women already operating.",
        },
        {
          question: "What is She Leads Coliving?",
          options: [
            "A paid mastermind",
            "A free private community for women in coliving",
            "A blog",
            "A podcast",
          ],
          correctIndex: 1,
          explanation:
            "She Leads Coliving is a free private Facebook group for women at every stage of the coliving journey.",
        },
      ],
      worksheet: {
        title: "Which Coliving Path Self-Assessment",
        href: "/downloads/coliving-101-lesson-6-worksheet.pdf",
      },
    },
  ],
};
