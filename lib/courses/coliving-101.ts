import type { Course } from "./types";

// Coliving 101 — six modules, twenty-three self-paced lessons, five
// module-end quizzes. Content sourced from the canonical course markdown
// (Coliving_101_Complete_Course_FINAL.md, May 2026 edition).
//
// PHASE 1 status: Module 1 (4 lessons + 5-question quiz on the final
// lesson) is fully written. Modules 2–6 are stubbed with metadata only —
// they appear on the course landing page so module groupings render
// correctly, but their lessons array is empty. Phase 2 fills them in.

const placeholderWorksheet = {
  title: "Coliving 101 Worksheet (placeholder)",
  href: "/downloads/coliving-101-worksheet.pdf",
};

export const coliving101: Course = {
  slug: "coliving-101",
  title: "Coliving 101",
  tagline: "The model, the math, the move.",
  description:
    "Six modules. Twenty-three lessons. Everything you need to understand the coliving model — from how it works to whether it's right for you.",
  longDescription:
    "A self-paced introduction to general workforce housing coliving. Six modules cover what coliving is, why it's growing, the math that makes it work, how to find and evaluate a property, how to set it up and launch, the day-to-day operations, and the three paths into coliving. Twenty-three lessons. Five module quizzes. Lifetime access.",
  price: 99,
  status: "available",
  symbol: "◈",
  outcomes: [
    "Understand the coliving model end-to-end — what it is, who it serves, and how it's different from a traditional rental",
    "Run the full math on any property — gross revenue, operating expenses, net cashflow, and 5-year wealth projection",
    "Spot the three non-negotiables of a great coliving property before you sign a contract",
    "See rooms that don't exist yet — dining rooms, basements, bonus rooms, offices",
    "Launch a property: renovation order, furnishing, tech stack, listing, screening, and move-in",
    "Operate without burning out — systems, resident issues, turnover, and community",
    "Pick the path that fits where you actually are — active operator, arbitrage, or passive investor",
  ],
  audience: [
    "Women considering their first coliving deal",
    "Investors transitioning from traditional rentals because the math no longer pencils",
    "House hackers thinking about scaling into coliving",
    "Anyone curious about coliving before booking a coaching call",
  ],
  modules: [
    {
      number: 1,
      slug: "what-is-coliving",
      title: "What is coliving & why it's having its moment",
      summary:
        "Coliving defined. Why now. Who actually lives in coliving. How it stacks up against a traditional rental.",
    },
    {
      number: 2,
      slug: "the-math",
      title: "The math that makes coliving impossible to ignore",
      summary:
        "Revenue, expenses, occupancy, cashflow, risk diversification, and the 5-year wealth picture.",
    },
    {
      number: 3,
      slug: "finding-evaluating",
      title: "Finding & evaluating a coliving property",
      summary:
        "The three non-negotiables. Floorplans that work. Seeing rooms that don't exist yet.",
    },
    {
      number: 4,
      slug: "setup-launch",
      title: "Setting up & launching your coliving property",
      summary:
        "Renovation order. Furnishing. Tech stack. Photography. Listing, screening, and house rules.",
    },
    {
      number: 5,
      slug: "operations",
      title: "Operations — the questions every new operator asks",
      summary:
        "How much time it really takes. Resident issues. Turnover and maintenance. Pricing and community.",
    },
    {
      number: 6,
      slug: "is-coliving-right",
      title: "Is coliving right for you?",
      summary:
        "Three paths into coliving. How to choose. Your next step.",
    },
  ],
  lessons: [
    /* ====================================================================
     * MODULE 1 — WHAT IS COLIVING & WHY IT'S HAVING ITS MOMENT
     * ==================================================================*/
    {
      slug: "what-is-coliving",
      number: 1,
      moduleNumber: 1,
      moduleTitle: "What is coliving & why it's having its moment",
      moduleLessonNumber: 1,
      title: "What is coliving?",
      description:
        "Coliving defined. How long residents stay. Where it sits in the rental landscape.",
      duration: "8 min",
      sections: [
        {
          type: "paragraph",
          content:
            "Coliving is rent-by-the-room — where residents rent a private bedroom in a larger shared home, with access to common areas like the kitchen, living room, and bathrooms.",
        },
        {
          type: "paragraph",
          content:
            "Each resident signs their own individual lease. They're only responsible for their own rent. They didn't cosign anything with their housemates. They can come and go independently.",
        },
        {
          type: "paragraph",
          content:
            "It's not a new concept. Boarding houses, rooming houses, shared housing — people have been living this way for centuries. What's new is the moment we're in right now.",
        },
        {
          type: "key-takeaway",
          title: "What coliving is",
          body: "Coliving = private bedroom + shared common spaces + individual lease per resident.",
        },
        { type: "heading", content: "How long do residents actually stay?" },
        {
          type: "paragraph",
          content:
            "This is one of the first questions everyone asks. The answer is: it depends on the operator and the market — but most coliving operators focus on mid-term residents, people looking to stay 3–6 months.",
        },
        {
          type: "paragraph",
          content:
            "Some residents stay longer. Some stay shorter. But the sweet spot for most coliving operators is that 3–6 month window. These are people who need more than a hotel room or an Airbnb but aren't ready or willing to commit to a 12-month apartment lease.",
        },
        { type: "subheading", content: "How the rental world breaks down by length of stay" },
        {
          type: "bullets",
          items: [
            "Short-term (1–30 days) — Airbnb, VRBO, hotels. Highest revenue per night, constant turnover, heavy regulation. This is a hospitality business.",
            "Mid-term (1–6 months) — where most coliving lives. Furnished rooms, flexible terms, weekly or monthly billing. Travelers, professionals, people in transition. Less turnover than short-term, higher rates than long-term.",
            "Long-term (6–12+ months) — traditional leasing. Most stable, lowest turnover, lowest per-unit revenue, least flexibility for both sides.",
          ],
        },
        {
          type: "paragraph",
          content:
            "Most coliving operators — including myself — operate in the mid-term space. It hits the sweet spot between strong revenue, manageable turnover, and the flexibility that attracts quality residents.",
        },
        { type: "heading", content: "Coliving vs other types of housing" },
        {
          type: "paragraph",
          content:
            "Coliving is one model within a larger housing ecosystem. Here's where it sits relative to the other options:",
        },
        {
          type: "bullets",
          items: [
            "Traditional single family rental (SFR) — one tenant or family rents the entire house on a long-term lease. One lease, one income stream, one risk.",
            "Coliving (rent-by-the-room) — multiple residents share a larger home. Each rents their own private bedroom. Individual leases, multiple income streams, typically furnished.",
            "Accessory dwelling unit (ADU) / basement apartment — a separate living space within or attached to a larger property. One tenant with their own entrance, kitchen, and bathroom. Often used in house hacking.",
            "Studio / efficiency apartment — a small self-contained unit. One person or couple. No shared spaces.",
            "Small multifamily (duplex, triplex, quadplex) — 2–4 separate self-contained units, each with its own kitchen, bathroom, and entrance.",
          ],
        },
        {
          type: "key-takeaway",
          title: "Where coliving lives",
          body: "Mid-term, rent-by-the-room, shared common spaces, individual leases. That's what makes it unique.",
        },
      ],
      quiz: [],
      worksheet: placeholderWorksheet,
    },

    {
      slug: "why-its-having-its-moment",
      number: 2,
      moduleNumber: 1,
      moduleTitle: "What is coliving & why it's having its moment",
      moduleLessonNumber: 2,
      title: "Why it's having its moment",
      description:
        "Three forces driving coliving's growth: housing costs, broken alternatives, and the loneliness epidemic.",
      duration: "11 min",
      sections: [
        {
          type: "paragraph",
          content:
            "Coliving isn't new — but the conditions driving its growth right now are. Three things are happening simultaneously that have created the perfect storm for coliving to take off.",
        },
        { type: "heading", content: "1. Housing costs have exploded" },
        {
          type: "paragraph",
          content:
            "The median home price in the US has more than doubled in the last decade. Rents have followed — and in many markets they've outpaced wage growth by a wide margin.",
        },
        {
          type: "paragraph",
          content:
            "Let's put numbers on it. The average one-bedroom apartment in Atlanta rents for roughly $1,500–$1,800/month. Most landlords require tenants to earn 3x the monthly rent to qualify. That means a single person needs to earn $54,000–$64,800/year just to qualify for a basic one-bedroom apartment. The median individual income in Atlanta? Around $40,000.",
        },
        {
          type: "paragraph",
          content:
            "That math doesn't work. And it's not just Atlanta — this gap exists in nearly every major metro. It's the reason millions of working adults are doubling up with roommates, moving back in with family, or commuting hours from affordable areas.",
        },
        {
          type: "paragraph",
          content:
            "The people being squeezed aren't unemployed. They're not on assistance. They're working full-time jobs — nurses, teachers, bus drivers, warehouse workers, restaurant staff, mechanics — and they still can't afford a safe, stable place to live on their own.",
        },
        {
          type: "fascination",
          body: "The people keeping our communities running — nurses, teachers, bus drivers, mechanics — are being priced out of safe, stable housing in the cities where they work. This isn't a fringe issue. This is a housing crisis affecting the people our communities depend on most.",
        },
        { type: "subheading", content: "Who are these people?" },
        {
          type: "paragraph",
          content:
            "They're not who you might expect. The typical coliving resident is a working adult between 25–45 who values quality, flexibility, and community over square footage.",
        },
        {
          type: "bullets",
          items: [
            "Working adults who need affordable housing — the biggest segment. Earning $30,000–$50,000/year, can't qualify for a one-bedroom alone, and need a safe, clean, stable place that doesn't eat their entire paycheck.",
            "Working professionals new to a city — relocated for a job, don't know anyone yet, need a quality place to land fast without a 12-month commitment.",
            "Travel nurses and healthcare workers on 3–6 month assignments — they need furnished housing near the hospital, not a hotel room.",
            "People going through a life transition — divorce, relocation, career change, fresh start — who need flexibility and affordability while they figure out their next move.",
            "Young professionals who want to save money — could stretch for a studio, but would rather pay less for a nicer home with built-in community.",
            "Anyone who values connection over isolation — people who would rather come home to a shared house with other adults than an empty apartment.",
          ],
        },
        {
          type: "paragraph",
          content:
            "What they all have in common: they need housing that's affordable, quality, move-in ready, and flexible — and coliving delivers all four.",
        },
        {
          type: "key-takeaway",
          title: "The #1 reason people choose coliving",
          body: "Affordability. A private furnished room for $750–$1,000/month in a market where a one-bedroom apartment costs $1,500+. That's not a compromise. That's a better deal. They are not a last resort population. They are your neighbors — and they are choosing coliving because it works.",
        },
        { type: "heading", content: "2. The traditional options aren't working" },
        {
          type: "paragraph",
          content:
            "For someone earning $35,000–$50,000/year in a city where a one-bedroom apartment costs $1,500+, here are the current options:",
        },
        {
          type: "bullets",
          items: [
            "Rent alone — needs 3x income, solid credit, first month + deposit, 12-month commitment. For many working adults this combination is simply out of reach.",
            "Find a roommate and cosign — now legally responsible for the full rent. If your roommate stops paying, you owe everything. Not just a roommate — their financial risk.",
            "Move somewhere cheaper — longer commute, fewer jobs, worse schools. For many people, moving isn't an option.",
            "Move back home — works for some, but isn't available to everyone and isn't sustainable long-term.",
          ],
        },
        {
          type: "paragraph",
          content:
            "None of these options solve the core problem: there isn't enough affordable, quality, flexible housing for working adults who want to live independently in the cities where they work. Coliving does.",
        },
        { type: "heading", content: "3. People are lonelier than ever" },
        {
          type: "paragraph",
          content:
            "In 2023 the US Surgeon General declared loneliness a public health epidemic. Not a trend. Not a concern. An epidemic.",
        },
        {
          type: "paragraph",
          content:
            "And it makes sense. More people live alone than at any point in American history. Remote work has reduced daily social interaction for millions. Social media creates the illusion of connection while often deepening isolation.",
        },
        {
          type: "paragraph",
          content:
            "For a lot of people — especially people in their 20s, 30s, and 40s who are new to a city, recently divorced, or starting over — the hardest part of their day isn't the work. It's coming home to an empty apartment with no one to talk to.",
        },
        {
          type: "paragraph",
          content:
            "Coliving addresses this in a way that no apartment complex amenity room or co-working space ever could. When you share a home with other people — a real home, not a hotel — you naturally build the kind of daily organic connection that most adults are missing. It's not forced community. It's proximity — and proximity creates connection in a way that nothing else can replicate.",
        },
        {
          type: "fascination",
          body: "Coliving doesn't just solve a housing problem. It solves three problems simultaneously: affordability — quality housing at a fraction of renting alone; flexibility — no long-term lease trap; isolation — built-in community through shared living. No other housing model does all three.",
        },
        { type: "heading", content: "What this means for investors" },
        {
          type: "paragraph",
          content:
            "Demand for coliving is not a trend — it's a structural shift. As long as housing costs outpace wages, as long as traditional rental options fail working adults, and as long as people crave genuine connection — the demand for quality coliving housing will continue to grow.",
        },
        {
          type: "paragraph",
          content:
            "And the investors who position themselves to meet that demand? They're building wealth while solving one of the most pressing problems in their communities. That's the moment we're in. And that's why you're here.",
        },
      ],
      quiz: [],
      worksheet: placeholderWorksheet,
    },

    {
      slug: "why-investors-love-it",
      number: 3,
      moduleNumber: 1,
      moduleTitle: "What is coliving & why it's having its moment",
      moduleLessonNumber: 3,
      title: "Why investors are loving this model",
      description:
        "The cashflow problem coliving solves. Multiple income streams. Creative problem-solving. Doing well AND doing good.",
      duration: "9 min",
      sections: [
        {
          type: "paragraph",
          content:
            "We just talked about why coliving works for residents. Now let's flip it — because the investor side of this equation is just as compelling.",
        },
        { type: "heading", content: "Social impact IS the business model" },
        {
          type: "paragraph",
          content:
            "Every coliving home you operate is one more option for someone in your community who needs safe, stable, affordable housing. You're not just building wealth — you're expanding the affordable housing supply without a single dollar of government funding.",
        },
        {
          type: "paragraph",
          content:
            "But here's what most people miss: the social impact IS the business model. You're not choosing between doing good and making money. The same thing that makes coliving valuable to residents — affordable, flexible, quality housing — is exactly what makes it profitable for investors. The demand isn't going away.",
        },
        { type: "heading", content: "The cashflow problem coliving solves" },
        {
          type: "paragraph",
          content:
            "If you've looked at buying a traditional rental property lately, you already know — the math is brutal right now. Interest rates have climbed. Home prices are elevated. Insurance and property taxes keep rising. Run the numbers on renting a single family home to one tenant at market rate — you're breaking even at best. More likely you're negative.",
        },
        {
          type: "paragraph",
          content:
            "This is the reality for millions of real estate investors right now. They own properties that don't cashflow. Or they're sitting on the sidelines because they can't find a deal that makes sense.",
        },
        {
          type: "paragraph",
          content:
            "Coliving changes the equation entirely. The same property that loses money as a traditional rental can generate $1,000+ per month as a coliving property. Not because the house changed — because the strategy did.",
        },
        { type: "heading", content: "Multiple income streams from one property" },
        {
          type: "paragraph",
          content:
            "With a traditional rental, you have one tenant. One lease. One check every month. If that tenant stops paying, you have zero income and a mortgage that's still due.",
        },
        {
          type: "paragraph",
          content:
            "With coliving, a single property generates 6, 8, even 10 individual income streams — each from a separate resident on their own lease. If one resident stops paying, the other 5–9 are still covering your expenses.",
        },
        {
          type: "paragraph",
          content:
            "This isn't just better cashflow. It's fundamentally better risk management. You're not dependent on one person's paycheck to cover your mortgage. That's the kind of resilience most real estate investors only get by owning multiple properties — and coliving gives it to you from property one.",
        },
        { type: "heading", content: "The creative problem-solving angle" },
        {
          type: "paragraph",
          content:
            "We have an affordable housing crisis. Politicians talk about it constantly. And the solution that always gets thrown around is \"we just need to build more houses.\" The thing is — building new housing takes years. Sometimes decades. Permits, zoning, construction, financing — it's a slow, expensive, politically complicated process.",
        },
        {
          type: "paragraph",
          content:
            "But we already have houses. Millions of them. They're just being underutilized. A 4-bedroom single family home rented to one tenant is housing one household. That same home reconfigured as a coliving property is housing 6–8 working adults — in their own private rooms, with quality furnishings, flexible terms, and built-in community.",
        },
        {
          type: "paragraph",
          content:
            "We didn't build a new house. We didn't wait for a politician to fund anything. We took what already existed and made it work better for the people who need it most.",
        },
        {
          type: "fascination",
          body: "We don't need to wait decades for new housing to be built. We can reconfigure the housing we ALREADY HAVE to better serve the people who need it right now. That's not just a housing strategy. That's coliving.",
        },
        { type: "heading", content: "You can be a good investor AND do good" },
        {
          type: "paragraph",
          content:
            "In most real estate strategies, you're optimizing for returns. Period. The tenant is a means to an end. The community impact is, at best, neutral.",
        },
        {
          type: "paragraph",
          content:
            "Coliving is different. The better you run your coliving property — the cleaner the rooms, the more responsive you are, the higher quality the furnishings, the more intentional the community — the more your residents benefit AND the more profitable your business becomes.",
        },
        {
          type: "paragraph",
          content:
            "Happy residents stay longer. Lower turnover means lower costs. Quality housing attracts quality residents. And every home you operate well is genuine, tangible impact in your community. You don't have to choose between building wealth and making a difference. With coliving, they're the same thing.",
        },
        {
          type: "key-takeaway",
          title: "Why investors are loving coliving right now",
          body: "Social impact IS the business model — demand isn't going away. Solves the cashflow problem — makes single family homes profitable again. Multiple income streams — 6–10 per property instead of 1. Creative problem-solving — reconfigure existing housing instead of waiting for new construction. Do well AND do good — better operations = happier residents = more profitable business.",
        },
      ],
      quiz: [],
      worksheet: placeholderWorksheet,
    },

    {
      slug: "coliving-vs-traditional",
      number: 4,
      moduleNumber: 1,
      moduleTitle: "What is coliving & why it's having its moment",
      moduleLessonNumber: 4,
      title: "Coliving vs traditional rental",
      description:
        "Side-by-side comparison of the two models. Same house, same mortgage, completely different returns.",
      duration: "6 min",
      sections: [
        {
          type: "paragraph",
          content:
            "Now that you understand what coliving is, why it's growing, and why investors are paying attention — let's put it side by side with a traditional rental so you can see exactly how different the two models are.",
        },
        { type: "subheading", content: "Lease structure" },
        {
          type: "bullets",
          items: [
            "Traditional rental: one lease, one tenant",
            "Coliving: individual leases per room",
          ],
        },
        { type: "subheading", content: "Furnishing & move-in" },
        {
          type: "bullets",
          items: [
            "Traditional rental: rarely furnished, move-in in weeks, 12-month minimum lease",
            "Coliving: typically furnished, move-in in days, mid-term (3–6 months typical)",
          ],
        },
        { type: "subheading", content: "Income & risk" },
        {
          type: "bullets",
          items: [
            "Traditional rental: one income stream per property; if the tenant stops paying, $0 income",
            "Coliving: 6–10 income streams per property; if one resident stops paying, the rest are still paying",
          ],
        },
        { type: "subheading", content: "Affordability for the resident" },
        {
          type: "bullets",
          items: [
            "Traditional 1BR apartment: $1,500+/month",
            "Coliving private room: $750–$1,000/month",
          ],
        },
        { type: "subheading", content: "Community" },
        {
          type: "bullets",
          items: [
            "Traditional rental: none built in",
            "Coliving: built into the model",
          ],
        },
        { type: "subheading", content: "Cashflow in today's market" },
        {
          type: "bullets",
          items: [
            "Traditional rental: often negative",
            "Coliving: $1,000+/month potential",
          ],
        },
        {
          type: "key-takeaway",
          title: "Same house. Same mortgage. Same neighborhood.",
          body: "Traditional rental: 1 tenant, 1 income stream, often negative cashflow. Coliving: 6–10 residents, 6–10 income streams, strong cashflow potential. The house didn't change. The strategy did.",
        },
        { type: "heading", content: "Module 1 recap" },
        {
          type: "bullets",
          items: [
            "Coliving is rent-by-the-room with individual leases per resident",
            "Most coliving operates in the mid-term space — residents staying 3–6 months",
            "It's having its moment because housing costs have exploded, traditional options aren't working, and people are lonelier than ever",
            "The #1 reason residents choose coliving is affordability",
            "Investors are loving coliving because it solves the cashflow problem, diversifies risk, and lets you do well and do good at the same time",
            "It's fundamentally different from traditional rentals in every way that matters",
          ],
        },
      ],
      quiz: [
        {
          question:
            "In coliving, who is responsible for the rent if one resident stops paying?",
          options: [
            "All residents equally",
            "The property owner absorbs the loss",
            "Only the resident who stopped paying",
            "The property manager",
          ],
          correctIndex: 2,
          explanation:
            "Each resident signs their own individual lease and is only responsible for their own rent. This is one of coliving's biggest advantages over traditional shared housing.",
        },
        {
          question:
            "Which of the following best describes why coliving is growing right now?",
          options: [
            "Interest rates are low making it easy to buy",
            "Housing costs have risen while traditional options have failed to keep up",
            "There is a surplus of large homes on the market",
            "Government programs are funding coliving development",
          ],
          correctIndex: 1,
          explanation:
            "The combination of rising housing costs, inadequate traditional options, and the loneliness epidemic has created the perfect conditions for coliving.",
        },
        {
          question: "What is the primary reason most residents choose coliving?",
          options: [
            "They want a luxury living experience",
            "They're looking for short-term vacation housing",
            "Affordability — a quality private room for a fraction of renting alone",
            "They can't find any other housing at all",
          ],
          correctIndex: 2,
          explanation:
            "The #1 reason people choose coliving is affordability. A private furnished room for $750–$1,000/month in a market where a one-bedroom apartment costs $1,500+ is a better deal — not a compromise.",
        },
        {
          question: "Where does coliving fall on the rental timeline?",
          options: [
            "Short-term (1–30 days) like Airbnb",
            "Mid-term (3–6 months) — flexible, furnished, individual leases",
            "Long-term (12+ months) like a traditional apartment lease",
            "It only works as a week-to-week rental",
          ],
          correctIndex: 1,
          explanation:
            "Most coliving operators focus on mid-term residents — people staying 3–6 months. This hits the sweet spot between strong revenue, manageable turnover, and the flexibility that attracts quality residents.",
        },
        {
          question:
            "What makes coliving unique for investors compared to other real estate strategies?",
          options: [
            "It requires no capital to get started",
            "It only works in large cities",
            "It generates multiple income streams from one property while providing affordable housing",
            "It eliminates all risk from real estate investing",
          ],
          correctIndex: 2,
          explanation:
            "Coliving is one of the only strategies where doing well for yourself and doing good for your community happen at the same time — strong cashflow from multiple income streams while expanding affordable housing supply.",
        },
      ],
      worksheet: placeholderWorksheet,
    },

    /* Modules 2–6 will be filled in during Phase 2. They appear in the
     * `modules` array above so the course landing page can render the
     * module-by-module structure ("coming soon" empty states for now). */
  ],
};
