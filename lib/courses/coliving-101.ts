import type { Course } from "./types";

// Coliving 101 — six modules, twenty-three self-paced lessons, five
// module-end quizzes. Content sourced from the canonical course markdown
// (Coliving_101_Complete_Course_FINAL.md, May 2026 edition).
//
// All 6 modules are now fully written — 1 welcome lesson + 23 module
// lessons + 5 standalone module quizzes = 29 total entries.

export const coliving101: Course = {
  slug: "coliving-101",
  title: "Coliving 101",
  tagline: "More rooms. More revenue.",
  description:
    "Six modules. Twenty-three lessons. Everything you need to understand the coliving model — from how it works to whether it's right for you.",
  longDescription:
    "A self-paced introduction to general workforce housing coliving. Six modules cover what coliving is, why it's growing, the math that makes it work, how to find and evaluate a property, how to set it up and launch, the day-to-day operations, and the three paths into coliving. Twenty-three lessons. Five module quizzes. Lifetime access.",
  price: 99,
  originalPrice: 149,
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
    "Anyone considering their first coliving deal",
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
     * COURSE WELCOME — sits before Module 1. moduleNumber: 0 marks it as
     * the course intro; the lesson chrome and course landing render it
     * differently from regular module lessons.
     * ==================================================================*/
    {
      slug: "welcome",
      number: 1,
      moduleNumber: 0,
      moduleTitle: "Welcome",
      moduleLessonNumber: 1,
      title: "Welcome to Coliving 101",
      description:
        "What you'll learn, how the course is scoped, why the Atlanta examples are universal, and the disclaimers worth reading first.",
      duration: "5 min",
      sections: [
        {
          type: "paragraph",
          content:
            "Welcome to Coliving 101! I'm excited you're here and taking the first step toward learning about this investment strategy.",
        },
        {
          type: "paragraph",
          content:
            "Coliving is having its moment right now — and for good reason. As housing costs climb and traditional single family rentals struggle to cashflow, investors across the country are discovering that rent-by-the-room is one of the most powerful strategies available in today's market. It's solving the affordable housing crisis while generating returns that traditional rentals simply can't match anymore.",
        },
        { type: "heading", content: "What we'll work through" },
        {
          type: "bullets",
          items: [
            "Module 1 — What coliving is, why it's growing, who it serves, and how it's different from a traditional rental",
            "Module 2 — The math behind coliving — revenue, expenses, risk diversification, and why the numbers are so compelling right now",
            "Module 3 — How to find and evaluate a coliving property — the non-negotiables, what to look for, and the costly mistakes to avoid before you make an offer",
            "Module 4 — Setting up and launching — renovation, furnishing, tech, listing, screening, and move-in day",
            "Module 5 — Operations — the day-to-day reality of running a coliving property, the most common questions new operators ask, and how to build a community people want to stay in",
            "Module 6 — Is coliving right for you? The three paths into coliving and how to choose the right one for your situation",
          ],
        },
        { type: "heading", content: "Before you dive in — a few notes" },
        { type: "subheading", content: "1. This course covers general workforce housing coliving only" },
        {
          type: "paragraph",
          content:
            "Coliving takes many forms. There are special purpose coliving models — group homes, sober living facilities, assisted living, transitional housing, and more. These are valuable housing solutions and important parts of the shared housing ecosystem. But they come with their own licensing requirements, regulations, liability considerations, and operational nuances that are beyond the scope of this course.",
        },
        {
          type: "paragraph",
          content:
            "Coliving 101 focuses exclusively on general workforce housing coliving — market rate, rent-by-the-room homes for working adults. This is the model we know best, operate every day, and can teach with confidence. If you're interested in special purpose coliving — that's a conversation worth having, but it's not what we cover here.",
        },
        { type: "subheading", content: "2. Some examples are Atlanta-specific, but the principles are universal" },
        {
          type: "paragraph",
          content:
            "I'm based in Atlanta, Georgia — and while much of what we cover applies to any market, Atlanta has some unique characteristics that make it an especially strong coliving market right now. The price-to-wage ratio creates strong demand for affordable housing. The housing stock — particularly tri-level homes and homes with finished basements — lends itself exceptionally well to coliving conversions. And purchase prices still support strong underwriting and cashflow in today's interest rate environment.",
        },
        {
          type: "paragraph",
          content:
            "That said, Atlanta is far from the only market where coliving is thriving. Markets across the country are seeing strong growth — anywhere there's a gap between what working people earn and what housing costs:",
        },
        {
          type: "bullets",
          items: [
            "Charlotte and Raleigh, NC",
            "Dallas and Houston, TX",
            "Orlando and Jacksonville, FL",
            "Phoenix, AZ",
            "Kansas City, KS",
            "Indianapolis, IN",
            "Columbus, OH",
            "Nashville, TN",
            "Denver, CO",
            "Los Angeles, CA",
          ],
        },
        {
          type: "paragraph",
          content:
            "The strategies in this course work everywhere. The specific numbers will vary by your market. Use the frameworks, adapt the numbers.",
        },
        { type: "subheading", content: "3. This course pairs with two others for the most comprehensive education" },
        {
          type: "paragraph",
          content:
            "Some terms we'll use — especially when discussing underwriting, financing, and deal analysis — may not be fully explained in this course alone. They're covered in more detail in the Real Estate Investing 101 mini course, which breaks down every major investing strategy, the key financial metrics, and how to evaluate any deal.",
        },
        {
          type: "paragraph",
          content:
            "I highly recommend pairing this course with Real Estate Investing 101 and House Hacking 101 for the most complete foundation. Together they give you everything you need to understand the landscape, choose your strategy, and take your first step — no matter where you're starting from.",
        },
        { type: "subheading", content: "4. A note on PadSplit" },
        {
          type: "padsplit",
          body: "Throughout this course you'll hear me reference PadSplit. PadSplit is a platform and marketplace for coliving — similar to what Airbnb is for short-term rentals. It connects coliving operators with residents looking for affordable, furnished, rent-by-the-room housing. I use PadSplit to list and fill rooms across my own portfolio and it's the platform I recommend to most new operators. You don't have to use PadSplit to do coliving — but it's the tool I know best and the one I'll reference most often in this course.",
        },
        { type: "subheading", content: "5. Important disclaimers" },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Read before you start",
          paragraphs: [
            "This course is educational in nature. I am not your attorney, CPA, or financial advisor. Always consult licensed professionals before making investment decisions.",
            "Interest rates, room rates, property values, and financial projections used throughout this course are illustrative examples based on real experience. Your actual numbers will depend on your specific market, property, and current market conditions.",
            "Results vary. The numbers and projections in this course are based on real operational experience but are not guarantees of future performance. Real estate investing carries risk — educate yourself, do your due diligence, and make informed decisions.",
          ],
        },
        { type: "heading", content: "One more thing" },
        {
          type: "paragraph",
          content:
            "This course is designed to be actionable — not theoretical. Every module includes key takeaway cards, real-world examples, and a quiz to reinforce what you learned. By the time you finish all six modules, you won't just understand coliving — you'll know whether it's right for you and exactly what your next step looks like.",
        },
        {
          type: "key-takeaway",
          title: "Let's get into it",
          body: "Mark this welcome complete and head into Module 1 — What is coliving & why it's having its moment.",
        },
      ],
      quiz: [],
    },

    /* ====================================================================
     * MODULE 1 — WHAT IS COLIVING & WHY IT'S HAVING ITS MOMENT
     * ==================================================================*/
    {
      slug: "what-is-coliving",
      number: 2,
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
        { type: "divider" },
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
    },

    {
      slug: "why-its-having-its-moment",
      number: 3,
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
          type: "card",
          eyebrow: "Atlanta example",
          title: "The math doesn't work.",
          paragraphs: [
            "The average one-bedroom apartment in Atlanta rents for roughly $1,500–$1,800/month. Most landlords require tenants to earn 3x the monthly rent to qualify.",
            "That means a single person needs to earn $54,000–$64,800/year just to qualify for a basic one-bedroom apartment. The median individual income in Atlanta? Around $40,000.",
          ],
        },
        {
          type: "paragraph",
          content:
            "And it's not just Atlanta — this gap exists in nearly every major metro. It's the reason millions of working adults are doubling up with roommates, moving back in with family, or commuting hours from affordable areas.",
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
        { type: "divider" },
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
    },

    {
      slug: "why-investors-love-it",
      number: 4,
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
          type: "card",
          eyebrow: "Today's reality",
          paragraphs: [
            "This is the situation for millions of real estate investors right now. They own properties that don't cashflow. Or they're sitting on the sidelines because they can't find a deal that makes sense.",
          ],
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
          type: "card",
          tone: "blush",
          title: "6–10 income streams. Not 1.",
          paragraphs: [
            "With coliving, a single property generates 6, 8, even 10 individual income streams — each from a separate resident on their own lease. If one resident stops paying, the other 5–9 are still covering your expenses.",
          ],
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
        { type: "divider" },
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
        { type: "divider" },
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
    },

    {
      slug: "coliving-vs-traditional",
      number: 5,
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
          type: "compare",
          items: [
            {
              eyebrow: "Traditional rental",
              paragraphs: ["One lease. One tenant."],
            },
            {
              eyebrow: "Coliving",
              paragraphs: ["Individual leases — one per room."],
            },
          ],
        },
        { type: "subheading", content: "Furnishing & move-in" },
        {
          type: "compare",
          items: [
            {
              eyebrow: "Traditional rental",
              paragraphs: [
                "Rarely furnished. Move-in in weeks. 12-month minimum lease.",
              ],
            },
            {
              eyebrow: "Coliving",
              paragraphs: [
                "Typically furnished. Move-in in days. Mid-term (3–6 months typical).",
              ],
            },
          ],
        },
        { type: "subheading", content: "Income & risk" },
        {
          type: "compare",
          items: [
            {
              eyebrow: "Traditional rental",
              paragraphs: [
                "One income stream per property. If the tenant stops paying — $0 income.",
              ],
            },
            {
              eyebrow: "Coliving",
              paragraphs: [
                "6–10 income streams per property. If one resident stops paying, the rest are still paying.",
              ],
            },
          ],
        },
        { type: "subheading", content: "Affordability for the resident" },
        {
          type: "compare",
          items: [
            {
              eyebrow: "Traditional 1BR apartment",
              paragraphs: ["$1,500+/month"],
            },
            {
              eyebrow: "Coliving private room",
              paragraphs: ["$750–$1,000/month"],
            },
          ],
        },
        { type: "subheading", content: "Community" },
        {
          type: "compare",
          items: [
            {
              eyebrow: "Traditional rental",
              paragraphs: ["None built in."],
            },
            {
              eyebrow: "Coliving",
              paragraphs: ["Built into the model."],
            },
          ],
        },
        { type: "subheading", content: "Cashflow in today's market" },
        {
          type: "compare",
          items: [
            {
              eyebrow: "Traditional rental",
              paragraphs: ["Often negative."],
            },
            {
              eyebrow: "Coliving",
              paragraphs: ["$1,000+/month potential."],
            },
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
        {
          type: "callout",
          tone: "gold",
          body: "Up next — the Module 1 quiz. Five quick questions to lock in what you just learned.",
        },
      ],
      quiz: [],
    },

    /* ==================== MODULE 1 QUIZ — STANDALONE ==================== */
    {
      slug: "module-1-quiz",
      number: 6,
      moduleNumber: 1,
      moduleTitle: "What is coliving & why it's having its moment",
      moduleLessonNumber: 5,
      kind: "module-quiz",
      title: "Module 1 Quiz",
      description:
        "Five questions on what coliving is, why it's growing, and why investors are paying attention.",
      duration: "5 min",
      sections: [],
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
    },

    /* ====================================================================
     * MODULE 2 — THE MATH THAT MAKES COLIVING IMPOSSIBLE TO IGNORE
     * ==================================================================*/
    {
      slug: "understanding-the-numbers",
      number: 7,
      moduleNumber: 2,
      moduleTitle: "The math that makes coliving impossible to ignore",
      moduleLessonNumber: 1,
      title: "Understanding the numbers",
      description:
        "The terms you need to know — gross revenue, expenses, occupancy, effective gross income, cash-on-cash. A real example.",
      duration: "10 min",
      sections: [
        {
          type: "paragraph",
          content:
            "In Module 1 we talked about why investors are struggling right now — interest rates are up, home prices are elevated, and traditional single family rentals are barely breaking even (if they're cashflowing at all). One tenant. One lease. One income stream. One risk.",
        },
        {
          type: "paragraph",
          content:
            "That model is broken in today's market. Coliving fixes it. Same property, same mortgage — completely different returns.",
        },
        { type: "heading", content: "The terms you need to know" },
        {
          type: "paragraph",
          content:
            "Before we dive into the math, let's make sure we're speaking the same language. These are the basic terms you'll see throughout this module — and throughout your investing career.",
        },
        {
          type: "card",
          eyebrow: "Term 1",
          title: "Gross revenue (or gross rent)",
          paragraphs: [
            "The total rent collected before any expenses are subtracted. If you have 6 rooms renting for $750/month each, your gross revenue is $4,500/month. This is the top-line number — not what you actually keep.",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Term 2",
          title: "Operating expenses",
          paragraphs: [
            "Everything it costs to run the property each month — mortgage payment, property taxes, insurance, utilities, platform fees, maintenance, turnover costs.",
          ],
        },
        {
          type: "card",
          eyebrow: "Term 3",
          title: "Net cashflow",
          paragraphs: [
            "What's left after you subtract all operating expenses from your gross revenue. This is the number that matters most — it's what actually hits your bank account each month.",
            "Gross revenue − operating expenses = net cashflow.",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Term 4",
          title: "Occupancy rate",
          paragraphs: [
            "The percentage of your rooms that are actually occupied and paying rent at any given time. We always project at 85% — never 100%. No property stays fully occupied every single day of the year.",
          ],
        },
        {
          type: "card",
          eyebrow: "Term 5",
          title: "Effective gross income",
          paragraphs: [
            "Your gross revenue adjusted for occupancy. If your gross revenue is $5,000/month at 100% occupancy, your effective gross income at 85% is $4,250. This is the realistic income number you should use for all projections.",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Term 6",
          title: "Cash-on-cash return (CoC)",
          paragraphs: [
            "Your annual net cashflow divided by the total cash you invested. Tells you how hard your actual dollars are working. If you invested $100,000 and your property cashflows $10,000/year, your cash-on-cash return is 10%.",
          ],
        },
        {
          type: "key-takeaway",
          title: "Gross revenue − expenses = cashflow. That's the whole game.",
          body: "Gross revenue is total rent collected. Operating expenses are total costs to run it. Net cashflow is what you actually keep. Occupancy is the % of rooms paying — use 85%. Effective gross is revenue adjusted for occupancy. Cash-on-cash is annual cashflow ÷ cash invested.",
        },
        { type: "heading", content: "Run the numbers on a real property" },
        {
          type: "paragraph",
          content:
            "Same 4-bedroom house, two strategies. Take that same property and convert the dining room, bonus room, basement, and office into additional bedrooms for a total of 8 rooms. (Don't worry about how to do the conversion yet — that's Module 3.)",
        },
        {
          type: "compare",
          items: [
            {
              eyebrow: "As a traditional rental",
              title: "One tenant, one lease",
              bullets: [
                "Gross rent: $2,000/month",
                "Mortgage + taxes + insurance + maintenance: $2,200/month",
                "Net cashflow: −$200/month",
                "Risk: tenant stops paying → $0 income, you still owe $2,200/month",
              ],
            },
            {
              eyebrow: "As coliving — 8 rooms",
              title: "8 residents, 8 individual leases",
              bullets: [
                "7 shared bath rooms × $750/month = $5,250",
                "1 private bath room × $1,000/month = $1,000",
                "Gross revenue: $6,250/month",
                "At 85% occupancy: $5,312/month effective gross income",
                "Operating expenses: ~$3,800/month",
                "Net cashflow: ~$1,500/month",
                "Risk: one resident stops paying → seven still paying",
              ],
            },
          ],
        },
        {
          type: "fascination",
          body: "A single family home that loses $200/month as a traditional rental can generate $1,500+ per month as a coliving property. The house didn't change. The strategy did.",
        },
      ],
      quiz: [],
    },

    {
      slug: "room-rents",
      number: 8,
      moduleNumber: 2,
      moduleTitle: "The math that makes coliving impossible to ignore",
      moduleLessonNumber: 2,
      title: "How to determine your room rents",
      description:
        "Bathroom situation, local market, room features. How to research. The pricing sweet spot.",
      duration: "9 min",
      sections: [
        {
          type: "paragraph",
          content:
            "Setting the right room rate is one of the most important decisions you'll make as a coliving operator. Price too high and your rooms sit empty. Price too low and you leave money on the table.",
        },
        { type: "heading", content: "The two factors that determine room rate" },
        { type: "subheading", content: "1. Bathroom situation — shared vs private" },
        {
          type: "paragraph",
          content:
            "This is the single biggest factor in what you can charge for a room. A room with its own private bathroom (ensuite) will always command a meaningful premium over a room where residents share a bathroom with others.",
        },
        {
          type: "card",
          eyebrow: "Atlanta baseline",
          title: "Shared vs private bath",
          bullets: [
            "Shared bathroom rooms: ~$750/month",
            "Private bathroom rooms: ~$1,000/month",
          ],
          paragraphs: [
            "Your market may be higher or lower — but the principle is universal: private bath always commands more than shared bath.",
          ],
        },
        { type: "subheading", content: "2. Your local market" },
        {
          type: "paragraph",
          content:
            "Room rates vary significantly by city, neighborhood, and even zip code. What works in Atlanta won't be the same in Dallas or Los Angeles or Columbus.",
        },
        { type: "heading", content: "How to research your market" },
        {
          type: "padsplit",
          body: "If you're using PadSplit, your host account gives you access to average room rates and occupancy data by zip code. This is the most coliving-specific data you'll find.",
        },
        {
          type: "bullets",
          items: [
            "Facebook Marketplace — search 'room for rent' in your target area",
            "Furnished Finder — current furnished room listings",
            "Roomies — another platform to compare room rental rates",
            "Local apartment rents — coliving rooms should be significantly less than renting alone",
          ],
        },
        {
          type: "paragraph",
          content:
            "If a 1BR apartment is $1,500/month and you're charging $750 for a furnished private room with utilities included, that's a compelling deal.",
        },
        { type: "heading", content: "Other factors that affect what you can charge" },
        {
          type: "bullets",
          items: [
            "Room size — larger rooms can command slightly more than smaller rooms in the same house",
            "Natural light — rooms with good windows are more desirable",
            "Closet space — a built-out closet or walk-in adds value vs a clothing rack",
            "Location within the house — basement rooms may rent for slightly less; private rooms away from common areas can command more",
            "Furnishing quality — a queen bed, solid dresser, desk, and TV feels different than a twin mattress on the floor",
            "What's included — most operators include utilities, internet, and furnishings in the room rate",
          ],
        },
        { type: "heading", content: "The pricing sweet spot" },
        {
          type: "compare",
          items: [
            {
              eyebrow: "For the resident",
              paragraphs: [
                "Meaningfully cheaper than renting a one-bedroom in the same area, while offering a quality, furnished, move-in ready experience. If the savings aren't significant, they'll just rent their own place.",
              ],
            },
            {
              eyebrow: "For you the operator",
              paragraphs: [
                "Enough total revenue across all rooms (at 85% occupancy) to cover all expenses and produce positive cashflow. If individual rates are too low, the deal doesn't pencil no matter how many rooms you have.",
              ],
            },
          ],
        },
        {
          type: "key-takeaway",
          title: "Research your market. Price competitively. Fill rooms fast.",
          body: "Bathroom situation determines the floor and ceiling. Local market sets the band. Room features fine-tune within it. The sweet spot: residents feel like they're getting a great deal AND your property cashflows.",
        },
      ],
      quiz: [],
    },

    {
      slug: "expenses",
      number: 9,
      moduleNumber: 2,
      moduleTitle: "The math that makes coliving impossible to ignore",
      moduleLessonNumber: 3,
      title: "The full expense picture",
      description:
        "Fixed and variable expenses, line by line. Mortgage, taxes, insurance, utilities, platform fees, turnover, maintenance.",
      duration: "8 min",
      sections: [
        {
          type: "paragraph",
          content:
            "You know how the money comes in. Now let's look at how it goes out. Here's what coliving operators actually pay every month — no surprises, no hidden costs, just the real numbers.",
        },
        { type: "heading", content: "Fixed expenses" },
        {
          type: "paragraph",
          content:
            "These don't change month to month. Set them up once and they run on autopilot.",
        },
        {
          type: "card",
          eyebrow: "Fixed · 1",
          title: "Mortgage payment",
          paragraphs: [
            "Depends on your purchase price, down payment, and interest rate. For our example property ($275K, 20% down, 7.5% rate, 30-year), the payment is approximately $1,538/month.",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Fixed · 2",
          title: "Property taxes",
          paragraphs: [
            "Varies by state and county. In Atlanta we estimate ~1.2% of purchase price annually, divided by 12. On a $275K property: roughly $275/month.",
          ],
        },
        {
          type: "card",
          eyebrow: "Fixed · 3",
          title: "Insurance",
          paragraphs: [
            "You need a landlord or dwelling fire policy, not standard homeowner's insurance. Budget approximately $250/month. Talk to your insurance agent about the right coverage for your strategy.",
          ],
        },
        { type: "heading", content: "Variable expenses" },
        {
          type: "paragraph",
          content:
            "These fluctuate with operations — occupancy, turnover, and how busy the property is in any given month.",
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Variable · 1",
          title: "Utilities + internet",
          paragraphs: [
            "Coliving operators typically cover all utilities and internet for residents. Budget $700/month for an 8-room property.",
          ],
        },
        {
          type: "card",
          eyebrow: "Variable · 2",
          title: "PadSplit fee",
          paragraphs: [
            "8% of gross rent collected, plus the first 10 days of each new booking. A significant operating expense — but PadSplit handles screening, rent collection, and a lot of the operational infrastructure in exchange.",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Variable · 3",
          title: "Turnover",
          paragraphs: [
            "Estimate approximately 1 turnover per month once stabilized. A few days of vacancy plus cleaning and touch-up costs between residents.",
          ],
        },
        {
          type: "card",
          eyebrow: "Variable · 4",
          title: "Maintenance reserve",
          paragraphs: [
            "Budget 10% of gross revenue. Things break. Appliances fail. Plumbing clogs. This reserve keeps you from scrambling.",
          ],
        },
        {
          type: "key-takeaway",
          title: "Know your expenses before you buy. No surprises.",
          body: "Fixed: mortgage + property taxes (~1.2% of price ÷ 12) + insurance (~$250/mo). Variable: utilities & internet ($700/mo for 8 rooms) + PadSplit fee (8% gross + first 10 days of each new booking) + turnover (~1/mo stabilized) + maintenance reserve (10% of gross).",
        },
      ],
      quiz: [],
    },

    {
      slug: "full-picture",
      number: 10,
      moduleNumber: 2,
      moduleTitle: "The math that makes coliving impossible to ignore",
      moduleLessonNumber: 4,
      title: "The full picture — putting income and expenses together",
      description:
        "An 8-room Atlanta property, line by line. Effective gross income. Total expenses. Net cashflow. Annual cashflow.",
      duration: "8 min",
      sections: [
        {
          type: "paragraph",
          content:
            "Let's take our 8-room Atlanta property and lay out the complete financial picture — income on top, expenses below, cashflow at the bottom.",
        },
        {
          type: "card",
          eyebrow: "The property",
          bullets: [
            "Purchase price: $275,000",
            "4 bedrooms + 4 converted spaces = 8 coliving rooms",
            "7 shared bath rooms × $750/month",
            "1 private bath room × $1,000/month",
            "20% down payment, 7.5% interest rate, 30-year loan",
          ],
        },
        { type: "heading", content: "Monthly income" },
        {
          type: "card",
          tone: "blush",
          bullets: [
            "Gross revenue (100%): $6,250 — 7 shared × $750 + 1 private × $1,000",
            "Occupancy adjustment (85%): −$937",
            "Effective gross income: $5,313",
          ],
        },
        { type: "heading", content: "Monthly expenses" },
        {
          type: "card",
          bullets: [
            "Mortgage: $1,538",
            "Property taxes: $275",
            "Insurance: $250",
            "Utilities + internet: $700",
            "PadSplit fee (8% of collected): $425",
            "Turnover allowance: $250",
            "Maintenance reserve (10%): $531",
            "Total expenses: $3,969",
          ],
        },
        { type: "heading", content: "The bottom line" },
        {
          type: "card",
          tone: "charcoal",
          eyebrow: "Net cashflow",
          title: "$1,344/month · $16,128/year",
          paragraphs: [
            "Effective gross income $5,313 minus total expenses $3,969. On a single property. With conservative assumptions and every real expense accounted for.",
          ],
        },
        {
          type: "paragraph",
          content:
            "And this is at 85% occupancy — not 100%. With PadSplit fees included. With a 10% maintenance reserve. With turnover baked in. These are real, honest numbers.",
        },
        { type: "divider" },
        {
          type: "paragraph",
          content:
            "This is why property selection matters so much. The room rates didn't change. The strategy didn't change. The purchase price and the room count are what made this deal work.",
        },
        {
          type: "fascination",
          body: "The difference between a coliving property that barely breaks even and one that cashflows $1,300+/month is almost never the room rates. It's the purchase price. It's the room count. It's knowing what to look for before you make an offer.",
        },
        {
          type: "key-takeaway",
          title: "Always run the FULL expense picture",
          body: "Gross revenue looks exciting. Net cashflow is what pays your bills. If it cashflows after ALL expenses at 85% occupancy — you have a deal. If it only works at 100% occupancy or with expenses missing — keep looking.",
        },
      ],
      quiz: [],
    },

    {
      slug: "risk-and-wealth",
      number: 11,
      moduleNumber: 2,
      moduleTitle: "The math that makes coliving impossible to ignore",
      moduleLessonNumber: 5,
      title: "Risk diversification & the 5-year wealth picture",
      description:
        "Why one bad resident is a problem, not a crisis. Cashflow + principal paydown + appreciation across 5 years.",
      duration: "10 min",
      sections: [
        { type: "heading", content: "Risk diversification" },
        {
          type: "paragraph",
          content:
            "Even when the cashflow numbers are close, coliving wins on risk every single time. Let's compare what happens when a tenant stops paying.",
        },
        {
          type: "compare",
          items: [
            {
              eyebrow: "Traditional rental",
              title: "1 tenant stops paying.",
              paragraphs: [
                "$0 income. You still owe $2,200/month in expenses. You're bleeding $2,200/month until resolved.",
              ],
            },
            {
              eyebrow: "Coliving",
              title: "1 of 8 residents stops paying.",
              paragraphs: [
                "7 others still paying. You lose $750–$1,000/month. Your other 7 residents are still covering the vast majority of your expenses.",
              ],
            },
          ],
        },
        {
          type: "paragraph",
          content:
            "This is risk diversification — and it's one of the most underrated advantages of the coliving model. With a traditional rental, one bad tenant can break your entire financial picture. You're not just losing income — you're hemorrhaging money every month while you navigate the eviction process, which in many states takes 30–90 days or longer.",
        },
        { type: "divider" },
        {
          type: "paragraph",
          content:
            "With coliving, one bad resident is a problem — not a crisis. You address it, you work through the process, and the other 7 income streams keep your mortgage paid and your business running while you do.",
        },
        {
          type: "paragraph",
          content:
            "This is the same principle behind why financial advisors tell you not to put all your money in one stock. Diversification protects you from any single point of failure. Most real estate investors don't get this kind of risk protection until they own multiple properties. Coliving gives it to you from property one.",
        },
        {
          type: "key-takeaway",
          title: "One bad resident is a problem. Not a crisis.",
          body: "Traditional rental: 1 tenant stops paying = $0 income. Coliving: 1 of 8 stops paying = 7 still covering your expenses. That's the difference.",
        },
        { type: "heading", content: "The 5-year wealth picture" },
        {
          type: "paragraph",
          content:
            "Cashflow is only one piece of the wealth-building story. Real estate builds wealth through three channels simultaneously — and most people only think about the first one.",
        },
        {
          type: "numbered",
          items: [
            "Monthly cashflow — the money that hits your bank account every month after all expenses. On our 8-room property that's $1,344/month or $16,128/year.",
            "Principal paydown — every month your residents are paying your mortgage. A portion goes toward paying down your loan balance. You're not paying it. They are. Over 5 years that's roughly $15,000–$18,000 in equity you didn't have to earn or save.",
            "Appreciation — real estate has historically appreciated 3–5% annually. On a $275,000 property at 3%, that's roughly $8,250 in year one — compounding each year after.",
          ],
        },
        {
          type: "card",
          tone: "charcoal",
          eyebrow: "5-year wealth projection",
          title: "~$139,640 in total wealth created.",
          bullets: [
            "Total cashflow (5 yr): $80,640",
            "Principal paydown (5 yr): ~$16,500",
            "Appreciation at 3%/yr (5 yr): ~$42,500",
          ],
        },
        {
          type: "card",
          eyebrow: "Total cash invested to get into this deal",
          bullets: [
            "Down payment (20%): $55,000",
            "Closing costs (~3%): $8,250",
            "Renovation (estimate): $25,000",
            "Furnishing (8 rooms × $1,400): $11,200",
            "Total cash invested: $99,450",
          ],
        },
        {
          type: "paragraph",
          content:
            "$139,640 in wealth created on ~$100,000 invested over 5 years — and you still own the asset. It's still cashflowing. It's still appreciating. And your residents are still paying down your mortgage.",
        },
        {
          type: "key-takeaway",
          title: "Real estate builds wealth three ways at the same time",
          body: "1) Cashflow — money in your pocket monthly. 2) Principal paydown — residents pay your mortgage, you build equity. 3) Appreciation — the asset grows in value whether you think about it or not. Coliving amplifies all three because the cashflow is stronger from day one.",
        },
        { type: "heading", content: "Module 2 recap" },
        {
          type: "bullets",
          items: [
            "The key terms: gross revenue, operating expenses, net cashflow, occupancy, effective gross income, cash-on-cash return",
            "Room rates are determined by bathroom situation, local market, and room features",
            "Always project at 85% occupancy — never 100%",
            "The full expense picture: mortgage, taxes, insurance, utilities, platform fees, turnover, maintenance reserve",
            "Purchase price and room count determine whether a deal cashflows — not just room rates",
            "Risk is diversified across 8 income streams instead of 1",
            "Wealth builds through three channels: cashflow + principal paydown + appreciation",
          ],
        },
        {
          type: "callout",
          tone: "gold",
          body: "Up next — the Module 2 quiz. Five questions on the math behind coliving.",
        },
      ],
      quiz: [],
    },

    /* ==================== MODULE 2 QUIZ ==================== */
    {
      slug: "module-2-quiz",
      number: 12,
      moduleNumber: 2,
      moduleTitle: "The math that makes coliving impossible to ignore",
      moduleLessonNumber: 6,
      kind: "module-quiz",
      title: "Module 2 Quiz",
      description:
        "Five questions on the math — terms, rates, occupancy, what makes a deal work, and the three wealth channels.",
      duration: "5 min",
      sections: [],
      quiz: [
        {
          question: "What does \"effective gross income\" mean?",
          options: [
            "The total rent you charge before any adjustments",
            "Your gross revenue adjusted for realistic occupancy",
            "Your net cashflow after all expenses",
            "The amount PadSplit deposits into your account",
          ],
          correctIndex: 1,
          explanation:
            "Effective gross income is your gross revenue adjusted for occupancy. At 85% occupancy, a property with $6,250 in gross revenue has an effective gross income of $5,313.",
        },
        {
          question:
            "What are the two primary factors that determine coliving room rates?",
          options: [
            "Property age and square footage",
            "Bathroom situation (shared vs private) and local market conditions",
            "Number of rooms and purchase price",
            "Platform fees and occupancy rate",
          ],
          correctIndex: 1,
          explanation:
            "Whether a room has a private bathroom or shared bathroom is the biggest factor. After that, your local market — comparable rooms and apartment rents — determines where your rates should land.",
        },
        {
          question:
            "What occupancy rate should you use when projecting coliving revenue?",
          options: ["100%", "95%", "85%", "70%"],
          correctIndex: 2,
          explanation:
            "Even well-run coliving properties experience turnover and vacancy gaps. Projecting at 85% gives you a realistic and conservative picture of actual income.",
        },
        {
          question:
            "Which of the following has the biggest impact on whether a coliving property cashflows?",
          options: [
            "The color you paint the rooms",
            "The purchase price and room count",
            "Whether you use PadSplit or Facebook Marketplace",
            "The neighborhood's walkability score",
          ],
          correctIndex: 1,
          explanation:
            "The purchase price determines your mortgage payment — your single largest expense. The room count determines your revenue. Getting both right is what makes a deal work.",
        },
        {
          question:
            "Real estate builds wealth through which three channels simultaneously?",
          options: [
            "Cashflow, tax deductions, and rental increases",
            "Cashflow, principal paydown, and appreciation",
            "Appreciation, leverage, and inflation hedging",
            "Rental income, flipping profits, and equity partnerships",
          ],
          correctIndex: 1,
          explanation:
            "Monthly cashflow puts money in your pocket. Your residents' rent payments pay down your mortgage. And the property grows in value over time. Coliving amplifies all three because the cashflow is stronger from day one.",
        },
      ],
    },

    /* ====================================================================
     * MODULE 3 — FINDING & EVALUATING A COLIVING PROPERTY
     * ==================================================================*/
    {
      slug: "property-selection-importance",
      number: 13,
      moduleNumber: 3,
      moduleTitle: "Finding & evaluating a coliving property",
      moduleLessonNumber: 1,
      title: "Why property selection is everything",
      description:
        "The biggest mistakes in coliving don't happen during operations — they happen before you ever make an offer.",
      duration: "4 min",
      sections: [
        {
          type: "paragraph",
          content:
            "Here's the truth most coliving educators won't tell you: the biggest mistakes in coliving don't happen during operations. They don't happen during renovation. They don't happen when you're screening residents.",
        },
        {
          type: "card",
          tone: "charcoal",
          title: "They happen before you ever make an offer.",
          paragraphs: [
            "The property you choose determines almost everything — your room count, your revenue potential, your renovation budget, your resident experience, and ultimately whether this deal makes money or drains it.",
          ],
        },
        {
          type: "key-takeaway",
          title: "The most important coliving decision happens before you sign a contract",
          body: "Choose the wrong property and no amount of great operations will save you.",
        },
      ],
      quiz: [],
    },

    {
      slug: "non-negotiables",
      number: 14,
      moduleNumber: 3,
      moduleTitle: "Finding & evaluating a coliving property",
      moduleLessonNumber: 2,
      title: "The non-negotiables",
      description:
        "Three filters that come before everything else: no HOA, parking for 60% of residents, minimum 6 rooms potential.",
      duration: "8 min",
      sections: [
        {
          type: "paragraph",
          content:
            "Before you look at anything else, a coliving property must pass these three tests. If it fails any one of them — walk away.",
        },
        { type: "heading", content: "Non-negotiable #1 · No HOA" },
        {
          type: "card",
          tone: "blush",
          title: "Even if an HOA says rentals are allowed — walk away.",
          paragraphs: [
            "This is the most important rule in coliving property selection.",
          ],
        },
        {
          type: "paragraph",
          content:
            "HOAs can change their rules. HOAs can selectively enforce policies against you. HOAs can make your residents' lives miserable with noise complaints, parking rules, and guest restrictions. HOAs can fine you into negative cashflow.",
        },
        {
          type: "paragraph",
          content:
            "We do not do coliving in HOA communities. Full stop.",
        },
        {
          type: "fascination",
          body: "An HOA that 'allows rentals' today can vote to restrict them tomorrow. Don't build your business on a foundation someone else can pull out from under you.",
        },
        { type: "heading", content: "Non-negotiable #2 · Parking" },
        {
          type: "paragraph",
          content:
            "Residents need a place to park their car. This sounds obvious until you find a property you love and realize it only has a 2-car driveway for 8 residents.",
        },
        {
          type: "paragraph",
          content:
            "In Atlanta we use the 60% rule — plan for parking spots for about 60% of your residents. Not every resident will have a car. Many will take MARTA, Uber, Lyft, or work close enough to walk. Trying to provide 1 space per room is often unnecessary and sometimes impossible in Atlanta's denser neighborhoods.",
        },
        {
          type: "card",
          eyebrow: "The 60% rule",
          title: "Parking for 60% of your projected room count.",
          paragraphs: [
            "An 8-room property needs parking for roughly 5 cars. A 10-room property needs roughly 6.",
          ],
        },
        {
          type: "paragraph",
          content:
            "Cities and counties still have parking ordinances and neighbors will report you if cars are overflowing onto the street. A coliving house that gets shut down over parking is a nightmare scenario — and it happens more than you'd think.",
        },
        {
          type: "fascination",
          body: "Parking can get your coliving house shut down by the city — even when everything else about your operation is completely by the book.",
        },
        { type: "heading", content: "Non-negotiable #3 · Minimum 6 rooms potential" },
        {
          type: "paragraph",
          content:
            "Coliving works best with 6 or more rooms — and really starts to shine at 8+.",
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Important",
          paragraphs: [
            "This doesn't mean 6 existing bedrooms. It means 6 rooms after conversion — including bedrooms plus any additional spaces that can become rooms.",
            "If a property maxes out at 4 or 5 rooms after conversion, the math usually doesn't work.",
          ],
        },
        {
          type: "key-takeaway",
          title: "The three non-negotiables",
          body: "1) No HOA — ever. 2) Parking for 60% of residents. 3) Minimum 6 rooms potential (8+ sweet spot). Fail any one of these → walk away.",
        },
      ],
      quiz: [],
    },

    {
      slug: "floorplans-and-conversion",
      number: 15,
      moduleNumber: 3,
      moduleTitle: "Finding & evaluating a coliving property",
      moduleLessonNumber: 3,
      title: "Floorplans & conversion potential",
      description:
        "What makes a great coliving floorplan. Seeing rooms that don't exist yet — the conversion potential most agents miss.",
      duration: "9 min",
      sections: [
        { type: "heading", content: "What makes a great coliving floorplan" },
        {
          type: "paragraph",
          content:
            "Once a property passes the non-negotiables, the floorplan is your next most important consideration.",
        },
        {
          type: "card",
          eyebrow: "What you want",
          bullets: [
            "Multiple separate living zones — not open concept",
            "At least one bathroom per every 3 rooms (less is better!)",
            "Natural zones for privacy — tri-level or multi-zone layouts work best",
            "Separate entrance options for basement or in-law suite units",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "What to avoid",
          bullets: [
            "Fully open concept layouts — harder to convert",
            "Single story homes — rarely large enough to convert properly",
            "Homes with only one bathroom for 6+ potential rooms",
          ],
        },
        { type: "subheading", content: "The best coliving layouts in Atlanta" },
        {
          type: "bullets",
          items: [
            "Tri-level homes — natural separation between zones",
            "Split level homes — upper and lower living areas",
            "Homes with finished basements — separate entrance potential",
            "Larger ranch homes with bedroom wings on opposite ends",
          ],
        },
        { type: "heading", content: "Additional rooms hiding in plain sight" },
        {
          type: "paragraph",
          content:
            "This is where experienced coliving operators find their edge. The ability to look at a property and see rooms that don't exist yet.",
        },
        {
          type: "paragraph",
          content:
            "A listing might say \"4 bedrooms\" — but a coliving operator walks through and sees 7 or 8 rooms. The dining room nobody uses for dining. The bonus room upstairs. The finished basement with its own entrance. The oversized office that could easily fit a bed, dresser, and desk.",
        },
        {
          type: "card",
          eyebrow: "Where additional rooms come from",
          bullets: [
            "Formal dining room → +1 room (needs a door)",
            "Bonus / flex room → +1 room (often already has a door)",
            "Home office → +1 room (check for closet or add one)",
            "Sunroom → +1 room (check HVAC — may need work)",
            "Finished basement → +1–2 rooms (separate entrance = higher value)",
            "Unfinished basement → +1–2 rooms (higher renovation cost)",
            "In-law suite / ADU → +1–2 rooms (often already complete)",
            "Garage conversion → +1–2 rooms (check zoning first)",
          ],
        },
        {
          type: "paragraph",
          content:
            "Not every space will convert. Some dining rooms are too small. Some basements don't have the ceiling height. Some garages have zoning restrictions. But the ability to identify the potential before you make an offer is one of the most valuable skills you can develop as a coliving investor.",
        },
        {
          type: "fascination",
          body: "A listing says '4 bedrooms.' A coliving operator sees 8 rooms. The dining room. The bonus room. The basement. The office. Learning to see rooms that don't exist yet is one of the most valuable skills in coliving.",
        },
        { type: "heading", content: "Module 3 recap" },
        {
          type: "bullets",
          items: [
            "Property selection is the most important coliving decision you make",
            "The three non-negotiables: no HOA, parking for 60% of residents, minimum 6 rooms potential (8+ sweet spot)",
            "The best floorplans have multiple separate living zones — not open concept",
            "Tri-level, split-level, and multi-zone layouts work best",
            "The real skill is seeing rooms that don't exist yet — dining rooms, basements, bonus spaces, offices",
            "At least 1 bathroom per 3 rooms (less is better)",
          ],
        },
        {
          type: "callout",
          tone: "gold",
          body: "Up next — the Module 3 quiz. Five questions on what to look for in a coliving property.",
        },
      ],
      quiz: [],
    },

    /* ==================== MODULE 3 QUIZ ==================== */
    {
      slug: "module-3-quiz",
      number: 16,
      moduleNumber: 3,
      moduleTitle: "Finding & evaluating a coliving property",
      moduleLessonNumber: 4,
      kind: "module-quiz",
      title: "Module 3 Quiz",
      description:
        "Five questions on non-negotiables, parking, floorplans, room conversion, and the minimum room count.",
      duration: "5 min",
      sections: [],
      quiz: [
        {
          question:
            "A property you love has an HOA that currently allows rentals. What should you do?",
          options: [
            "Buy it — rentals are allowed so you're fine",
            "Buy it but get the rental policy in writing",
            "Walk away — we don't do coliving in HOA communities",
            "Ask the HOA for a special exemption",
          ],
          correctIndex: 2,
          explanation:
            "Even if an HOA currently allows rentals, they can change their rules at any time. We never do coliving in HOA communities — full stop.",
        },
        {
          question:
            "How many parking spots should you plan for on an 8-room coliving property in Atlanta?",
          options: [
            "2 — most residents can share or take the bus",
            "5 — parking for approximately 60% of residents",
            "8 — one spot per room",
            "Parking doesn't matter if the property is near MARTA",
          ],
          correctIndex: 1,
          explanation:
            "The 60% rule — plan for about 60% of residents to need a parking spot. On an 8-room property that's roughly 5 cars.",
        },
        {
          question: "Which floorplan is best suited for coliving?",
          options: [
            "Open concept single story with a great room",
            "Tri-level home with natural separation between zones",
            "Studio apartment building",
            "Small two-bedroom cottage",
          ],
          correctIndex: 1,
          explanation:
            "Tri-level and multi-zone layouts create natural privacy separation between residents — essential for a positive coliving experience.",
        },
        {
          question:
            "A listing says \"4 bedrooms.\" A coliving operator sees potential for 8 rooms. Where do the additional rooms come from?",
          options: [
            "Building an addition onto the house",
            "Converting spaces like the dining room, bonus room, basement, and office into bedrooms",
            "Splitting existing bedrooms in half",
            "Renting out the garage as living space without any conversion",
          ],
          correctIndex: 1,
          explanation:
            "Experienced coliving operators identify additional rooms hiding in plain sight — dining rooms, bonus rooms, finished basements, home offices, and other spaces that can be converted into private bedrooms.",
        },
        {
          question: "What is the minimum room count for coliving to work?",
          options: [
            "3 rooms",
            "4 rooms",
            "6 rooms — and it really starts to shine at 8+",
            "10 rooms minimum",
          ],
          correctIndex: 2,
          explanation:
            "Coliving works best with 6 or more rooms — and really starts to shine at 8+. Below 6 rooms the math usually doesn't work in today's market.",
        },
      ],
    },

    /* ====================================================================
     * MODULE 4 — SETTING UP & LAUNCHING YOUR COLIVING PROPERTY
     * ==================================================================*/
    {
      slug: "launch-sequence",
      number: 17,
      moduleNumber: 4,
      moduleTitle: "Setting up & launching your coliving property",
      moduleLessonNumber: 1,
      title: "The launch sequence & renovation basics",
      description:
        "What happens after closing. The order: renovation → furnishing → tech → photos → listing → screening → move-in.",
      duration: "8 min",
      sections: [
        { type: "heading", content: "You closed. Now what?" },
        {
          type: "paragraph",
          content:
            "Closing day is exciting. It's also the moment most first-time coliving operators realize they have no idea what happens next.",
        },
        {
          type: "paragraph",
          content:
            "The good news: there's a clear sequence. Do it in order and you'll have residents moving in within weeks of closing.",
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "The launch sequence",
          bullets: [
            "1. Renovation & conversion",
            "2. Furnishing & installation",
            "3. Tech stack setup",
            "4. Professional photography & virtual tour",
            "5. Listing creation",
            "6. Screening & lease signing",
            "7. Move-in day",
          ],
        },
        {
          type: "key-takeaway",
          title: "Have your plan ready before you close",
          body: "Every day between closing and your first resident moving in costs you money. Have your renovation plan, furnishing list, and listing ready to go before you close — not after.",
        },
        { type: "heading", content: "Renovation priorities — in this order" },
        {
          type: "card",
          eyebrow: "1 · Safety and systems first",
          paragraphs: [
            "Anything flagged in your home inspections — plumbing, electrical, HVAC. These get fixed before anything else. Non-negotiable before a single resident moves in.",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "2 · Bathrooms second",
          paragraphs: [
            "Private bath rooms command a meaningful premium over shared bath rooms. Your bathroom plan determines your entire conversion strategy and revenue projections — so figure this out early.",
          ],
        },
        {
          type: "card",
          eyebrow: "3 · Conversions third",
          paragraphs: [
            "Turn your identified spaces into rooms. This usually means adding a door, electrical outlets, and potentially a closet. For closets — you can build one out if space and budget allow, or use a quality freestanding wardrobe or clothing rack. Both work.",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "4 · Cosmetic last",
          paragraphs: [
            "Paint, flooring, fixtures, hardware. Make it clean, fresh, and move-in ready. Don't over-invest. A freshly painted room with quality furnishings will always outperform an over-renovated room.",
          ],
        },
        {
          type: "fascination",
          body: "Every day of renovation is a day you're paying a mortgage with no income. Move efficiently.",
        },
      ],
      quiz: [],
    },

    {
      slug: "furnishing",
      number: 18,
      moduleNumber: 4,
      moduleTitle: "Setting up & launching your coliving property",
      moduleLessonNumber: 2,
      title: "Furnishing your coliving property",
      description:
        "Fully furnished, partially, or unfurnished. Per-room budget. Where to buy. Why standardization wins.",
      duration: "6 min",
      sections: [
        {
          type: "paragraph",
          content:
            "One of the first decisions you'll make as a coliving operator is how you want to furnish your rooms.",
        },
        {
          type: "compare",
          items: [
            {
              eyebrow: "Option 1",
              title: "Fully furnished",
              paragraphs: [
                "Everything provided. Residents walk in with a suitcase. Commands higher rates, attracts a broader pool. This is what I do — and what most operators do.",
              ],
            },
            {
              eyebrow: "Option 2",
              title: "Partially furnished",
              paragraphs: [
                "Essentials provided (bed, dresser, desk), resident brings the rest. Lower upfront cost, slightly lower rent.",
              ],
            },
            {
              eyebrow: "Option 3",
              title: "Unfurnished",
              paragraphs: [
                "You provide the room, they bring everything. Lowest upfront cost, limits tenant pool, lower rates.",
              ],
            },
          ],
        },
        {
          type: "paragraph",
          content:
            "There's no universally right answer. Research your market and make an intentional choice.",
        },
        { type: "heading", content: "If you do furnish — budget per room" },
        {
          type: "card",
          tone: "charcoal",
          title: "$1,400 per room (my average)",
          bullets: [
            "Low estimate: $800",
            "High estimate: $2,500",
            "Budget midpoint: $1,400",
          ],
        },
        { type: "heading", content: "Where to buy" },
        {
          type: "bullets",
          items: [
            "Amazon — fast shipping, easy reordering. Many operators (myself included) build a standardized list and reorder the same tested items for every room.",
            "Wayfair — good quality, frequent sales",
            "IKEA — affordable, clean aesthetic",
            "Facebook Marketplace — accent pieces and one-off finds",
            "Costco — mattresses, bedding, bulk supplies",
          ],
        },
        {
          type: "key-takeaway",
          title: "Standardize your furnishing list",
          body: "Same items. Every room. Every property. Easy to reorder. Easy to replace. Consistent quality. No decision fatigue. Test your items once. Reorder forever.",
        },
      ],
      quiz: [],
    },

    {
      slug: "tech-and-photos",
      number: 19,
      moduleNumber: 4,
      moduleTitle: "Setting up & launching your coliving property",
      moduleLessonNumber: 3,
      title: "Tech stack, photography & virtual tours",
      description:
        "Smart locks, internet, thermostats, cameras. Why pro photos and a 3D walkthrough are non-negotiable.",
      duration: "8 min",
      sections: [
        { type: "heading", content: "Tech stack for coliving" },
        {
          type: "card",
          eyebrow: "Non-negotiable · 1",
          title: "Smart locks",
          paragraphs: [
            "Every room and every exterior door. Residents get their own code. Change codes remotely when someone moves out. No rekeying, no lockouts, no drama.",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Non-negotiable · 2",
          title: "High-speed internet",
          paragraphs: [
            "6–8 adults all streaming and working simultaneously. Budget for gigabit fiber if available. Get a router rated for 40+ devices.",
          ],
        },
        {
          type: "card",
          eyebrow: "Highly recommended",
          title: "Smart thermostat",
          paragraphs: [
            "Control heating and cooling from your phone, set schedules, and prevent residents from cranking the AC to 62 degrees in July. This saves you real money on utilities every month.",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Recommended",
          title: "Security cameras",
          paragraphs: [
            "Front door, back door, driveway. Depending on your preferences, can also be in the common areas (kitchen, laundry room). Cameras help cut down on conflict over dirty dishes in the sink, food stealing, arguments, etc.",
          ],
        },
        {
          type: "padsplit",
          body: "Property management software is optional. PadSplit handles most of it on their platform — resident screening, rent collection, communication, and listing management. If you're not using PadSplit, use GroupMe, Telegram, WhatsApp, or similar for house announcements, maintenance requests, and community building.",
        },
        {
          type: "fascination",
          body: "Smart locks are one of the best investments you'll make in your coliving property. No rekeying. No lockouts. No drama. Change a code remotely in 30 seconds.",
        },
        { type: "heading", content: "Photography & virtual tours — don't skip this" },
        {
          type: "paragraph",
          content:
            "Before you list anywhere, invest in professional photography and a 3D virtual walkthrough of your property. This is not optional — it's one of the best investments you'll make in filling your rooms.",
        },
        {
          type: "paragraph",
          content:
            "Hire a professional real estate photographer. They know how to light rooms, choose angles, and make your property look its best. Clean and stage every room before the shoot — beds made, surfaces cleared, blinds open, lights on.",
        },
        { type: "divider" },
        {
          type: "paragraph",
          content:
            "Get a 3D virtual walkthrough — Matterport or a video walkthrough at minimum. Your residents are often relocating from another city and may not be able to tour in person before signing a lease. And many coliving operators don't allow in-person tours before move-in at all — if you're listed on PadSplit, this is the case.",
        },
        {
          type: "card",
          tone: "blush",
          title: "Your photos and virtual tour ARE the tour.",
          paragraphs: [
            "Bad photos = empty rooms. Professional photos + a virtual tour = filled rooms. This is not where you cut corners.",
          ],
        },
      ],
      quiz: [],
    },

    {
      slug: "listing-screening-rules",
      number: 20,
      moduleNumber: 4,
      moduleTitle: "Setting up & launching your coliving property",
      moduleLessonNumber: 4,
      title: "Listing, screening & house rules",
      description:
        "Where to list. The screening process step by step. House rules and why consistent enforcement matters more than what they say.",
      duration: "11 min",
      sections: [
        { type: "heading", content: "Listing your rooms" },
        {
          type: "padsplit",
          body: "PadSplit — the dominant coliving platform in Atlanta. Pre-screened residents, automated rent collection, communication tools, and listing management. Takes 8% of gross rent + the first 10 days of each new booking. This is the platform I use across my portfolio.",
        },
        {
          type: "card",
          eyebrow: "Other platforms",
          bullets: [
            "Facebook Marketplace — large audience, free to list, direct communication. Great for supplementing PadSplit or as a standalone option.",
            "Furnished Finder — popular with travel nurses and healthcare workers on assignment.",
            "Roomies — growing platform for room rentals and shared housing.",
          ],
        },
        {
          type: "key-takeaway",
          title: "You don't have to pick just one",
          body: "PadSplit for hands-off management. Facebook Marketplace for direct control. Furnished Finder for healthcare workers. Roomies for young professionals.",
        },
        { type: "heading", content: "Screening residents" },
        {
          type: "paragraph",
          content:
            "Screening is one of the most important things you'll do as a coliving operator. The wrong resident can cost you thousands in damages, lost rent, and headaches. Take this seriously.",
        },
        { type: "subheading", content: "If you're using PadSplit" },
        {
          type: "paragraph",
          content:
            "PadSplit does a basic screening on all members before they can book a room — but this is a starting point, not the finish line. You should always do a secondary screening on top of what PadSplit provides.",
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "The PadSplit screening process",
          bullets: [
            "1. Booking request comes in from a PadSplit member",
            "2. Run a secondary screening — county court records, third-party background check, or both",
            "3. Phone call to make sure they're a good fit for your house and community",
            "4. Collect any additional documentation you need",
            "5. Approve and they can move in",
          ],
        },
        { type: "subheading", content: "If you're self-managing (no PadSplit)" },
        {
          type: "paragraph",
          content:
            "The entire screening process is on you. At minimum:",
        },
        {
          type: "bullets",
          items: [
            "Background check (criminal history, eviction history)",
            "Income verification",
            "ID verification",
            "References from previous housing",
            "Phone call to assess fit",
          ],
        },
        {
          type: "key-takeaway",
          title: "Never skip screening",
          body: "PadSplit does a basic screening — but always do your own secondary check. One bad resident can cost you thousands.",
        },
        { type: "heading", content: "House rules" },
        {
          type: "paragraph",
          content:
            "Your house rules are the foundation of your operations. They set expectations, prevent problems, and protect your property. Every resident agrees to them before signing their lease.",
        },
        {
          type: "paragraph",
          content:
            "There are no universal house rules in coliving — every operator decides what works for their property and their community. What matters is that your rules are clear, in writing, and communicated before anyone moves in.",
        },
        {
          type: "card",
          eyebrow: "An example — my house rules",
          bullets: [
            "No pets",
            "No guests at any time",
            "No smoking inside",
            "No food in the rooms",
            "One car per resident",
            "Quiet hours (9pm–9am)",
            "Common area cleanliness expectations",
            "Trash and recycling responsibilities",
          ],
        },
        {
          type: "paragraph",
          content:
            "Your rules may look different — and that's fine. Some operators allow pets with a deposit. Some allow guests with restrictions. Some don't have quiet hours. The point is that YOU decide what works for your property and your residents.",
        },
        { type: "divider" },
        {
          type: "card",
          tone: "blush",
          title: "Rules you don't enforce are worse than rules you don't have.",
          paragraphs: [
            "The most important thing about your house rules isn't what they say — it's that you enforce them consistently. Set your rules. Communicate them clearly. Enforce them every single time.",
          ],
        },
        { type: "heading", content: "Module 4 recap" },
        {
          type: "bullets",
          items: [
            "Follow the sequence — renovation, furnishing, tech, photos, listing, screening, move-in",
            "Renovation priorities: safety → bathrooms → conversions → cosmetic",
            "Furnishing is a business decision — fully, partially, or unfurnished. Budget $800–$2,500/room.",
            "Smart locks, high-speed internet, and a smart thermostat are non-negotiable",
            "Professional photos and a 3D walkthrough are not optional — they ARE the tour",
            "Always do your own secondary screening — even on PadSplit",
            "Set your rules. Communicate them. Enforce them.",
          ],
        },
        {
          type: "callout",
          tone: "gold",
          body: "Up next — the Module 4 quiz. Five questions on launch, screening, and house rules.",
        },
      ],
      quiz: [],
    },

    /* ==================== MODULE 4 QUIZ ==================== */
    {
      slug: "module-4-quiz",
      number: 21,
      moduleNumber: 4,
      moduleTitle: "Setting up & launching your coliving property",
      moduleLessonNumber: 5,
      kind: "module-quiz",
      title: "Module 4 Quiz",
      description:
        "Five questions on launch order, photos, screening, house rules, and furnishing budgets.",
      duration: "5 min",
      sections: [],
      quiz: [
        {
          question: "What is the correct order of operations after closing?",
          options: [
            "Furnishing → renovation → listing → screening",
            "Listing → renovation → furnishing → screening",
            "Renovation → furnishing → tech → photos → listing → screening → move-in",
            "Screening → renovation → furnishing → listing",
          ],
          correctIndex: 2,
          explanation:
            "Following the sequence in order ensures you're not listing rooms before they're ready.",
        },
        {
          question:
            "Why are professional photos and a 3D virtual walkthrough essential?",
          options: [
            "They make your listing look better than competitors",
            "Many residents — especially on PadSplit — won't tour in person before signing. Your photos and walkthrough ARE the tour.",
            "They're required by PadSplit",
            "They increase your property value",
          ],
          correctIndex: 1,
          explanation:
            "Many coliving residents are relocating from another city, and many operators don't allow in-person tours before move-in. Your listing photos and virtual walkthrough are often the only tour a resident gets before signing.",
        },
        {
          question:
            "If you're listed on PadSplit, do you still need to screen residents yourself?",
          options: [
            "No — PadSplit handles everything",
            "Yes — PadSplit does a basic screening but you should always do your own secondary check",
            "Only if the resident seems suspicious",
            "Only for residents staying longer than 6 months",
          ],
          correctIndex: 1,
          explanation:
            "PadSplit provides a basic screening, but you should always run your own secondary background check, have a phone call with the applicant, and collect additional documentation before approving a booking.",
        },
        {
          question: "What is the most important thing about your house rules?",
          options: [
            "Having as many rules as possible",
            "Making them identical to other operators",
            "That they're clear, in writing, and consistently enforced",
            "That residents help write them",
          ],
          correctIndex: 2,
          explanation:
            "Your rules are your rules — but rules that aren't enforced are worse than rules you don't have.",
        },
        {
          question: "What is a reasonable furnishing budget per coliving room?",
          options: ["$200–$500", "$800–$2,500", "$3,000–$5,000", "$5,000+"],
          correctIndex: 1,
          explanation:
            "Furnishing budgets range from $800 on the low end to $2,500 on the high end, with a midpoint around $1,400 per room.",
        },
      ],
    },

    /* ====================================================================
     * MODULE 5 — OPERATIONS
     * ==================================================================*/
    {
      slug: "time-commitment",
      number: 22,
      moduleNumber: 5,
      moduleTitle: "Operations — the questions every new operator asks",
      moduleLessonNumber: 1,
      title: "How much time does this actually take?",
      description:
        "10–15 hrs/wk at launch, 5–8 in stabilization, 2–5 at steady state. What a typical week looks like.",
      duration: "6 min",
      sections: [
        {
          type: "paragraph",
          content:
            "You found the property. You ran the numbers. You closed the deal. You renovated, furnished, listed, and filled the rooms. Now what?",
        },
        {
          type: "paragraph",
          content:
            "This is the part most coliving courses skip — the day-to-day reality of actually operating a coliving property. The questions that come up at 10pm on a Tuesday when a resident texts you about a clogged drain. The systems you build that determine whether this business runs you or you run it.",
        },
        {
          type: "key-takeaway",
          title: "The money is made in the acquisition. The money is kept (or lost) in the operations.",
          body: "Great operations = longer tenancies, fewer vacancies, lower costs, and a business that runs without consuming your life.",
        },
        { type: "heading", content: "The honest answer on time commitment" },
        {
          type: "card",
          eyebrow: "Month 1–3",
          title: "Launch phase · 10–15 hrs/week",
          paragraphs: [
            "You're filling rooms, onboarding residents, setting up systems, handling first-time issues, and learning what works in your specific property. This is the hardest phase — and it's temporary.",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Month 3–6",
          title: "Stabilization · 5–8 hrs/week",
          paragraphs: [
            "Your rooms are filled. Your systems are working. You're handling maintenance requests, occasional turnover, and resident communication. The rhythm settles in.",
          ],
        },
        {
          type: "card",
          tone: "charcoal",
          eyebrow: "Month 6+",
          title: "Steady state · 2–5 hrs/week",
          paragraphs: [
            "Mostly responding to maintenance requests, managing occasional turnover, and monitoring your systems. This is where coliving starts to feel passive — not fully passive, but manageable alongside a full-time job or other properties.",
          ],
        },
        { type: "heading", content: "What a typical week looks like at steady state" },
        {
          type: "bullets",
          items: [
            "Monday — check messages, respond to maintenance requests",
            "Tuesday — nothing",
            "Wednesday — 30 min: review financials, check platform listings",
            "Thursday — nothing",
            "Friday — handle any resident issues that came up during the week",
            "Saturday — nothing (unless turnover)",
            "Sunday — nothing",
          ],
        },
        {
          type: "fascination",
          body: "The operators who spend 20 hours/week on a single property aren't working harder than you. They're working without systems. Build the systems once. Maintain them forever. That's how coliving becomes passive.",
        },
      ],
      quiz: [],
    },

    {
      slug: "resident-issues",
      number: 23,
      moduleNumber: 5,
      moduleTitle: "Operations — the questions every new operator asks",
      moduleLessonNumber: 2,
      title: "Resident issues — the ones that actually come up",
      description:
        "Non-payment, conflicts, early lease breaks, unauthorized guests. How to handle each one without drama.",
      duration: "10 min",
      sections: [
        { type: "heading", content: "\"A resident stopped paying. What do I do?\"" },
        {
          type: "paragraph",
          content:
            "This will happen. Not if — when. Many operators have different opinions on this process, but here's mine:",
        },
        {
          type: "card",
          eyebrow: "Day 1 past due",
          paragraphs: [
            "Friendly text. \"Hey, just a reminder that rent was due yesterday. Everything okay?\"",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Day 3–5 past due",
          paragraphs: [
            "More direct follow-up. Ask what's going on. Listen. Most of the time there's a real reason and they'll make it right within the week.",
          ],
        },
        {
          type: "card",
          eyebrow: "Day 7 past due",
          paragraphs: [
            "Written notice. This is no longer casual — it's documentation. State the amount owed and the deadline to pay. If they don't communicate or make payment, post the 3-day notice and begin your state's formal notice process. In Georgia this starts with a written demand for possession.",
          ],
        },
        {
          type: "card",
          tone: "charcoal",
          title: "Don't let it drag on.",
          paragraphs: [
            "Every day you wait is another day of lost rent and increasing legal complexity. Empathy is important — but empathy doesn't pay your mortgage.",
          ],
        },
        {
          type: "paragraph",
          content:
            "The coliving advantage: if one of your 8 residents stops paying, you lose one income stream. The other 7 are still paying. In a traditional rental you'd have zero income. This is risk diversification in action — but it doesn't mean you ignore non-payment.",
        },
        { type: "heading", content: "\"Two residents don't get along. What do I do?\"" },
        {
          type: "paragraph",
          content:
            "This is more common than non-payment and often more stressful. Here's how to handle it:",
        },
        {
          type: "numbered",
          items: [
            "Listen to both sides separately. Don't take sides. Don't make assumptions. Hear each person out privately.",
            "Identify the actual issue. It's almost always one of three things — noise, cleanliness, or shared space usage. Rarely is it truly personal.",
            "Refer back to the house rules. This is why your house rules exist. Address the violation — not the personality conflict.",
            "Mediate if necessary. Sometimes a 15-minute conversation with both residents present resolves everything. Most adults just want to feel heard.",
            "Document everything. If the issue persists, you need a paper trail. This protects you if it escalates to a lease termination.",
          ],
        },
        { type: "heading", content: "\"A resident wants to break their lease early.\"" },
        {
          type: "card",
          tone: "blush",
          title: "Let them go gracefully.",
          paragraphs: [
            "How you handle this depends on your lease terms — but in general, a cooperative early departure is almost always better than a resentful resident staying because they feel trapped. Focus your energy on filling the room fast.",
          ],
        },
        { type: "heading", content: "\"A resident has unauthorized guests.\"" },
        {
          type: "paragraph",
          content:
            "Refer to your house rules. Whether you allow guests or not, the policy needs to be clear and enforced consistently.",
        },
        {
          type: "card",
          eyebrow: "Escalation ladder",
          bullets: [
            "1. Direct conversation — \"Our house rules are clear. This needs to be corrected immediately.\"",
            "2. If it continues — written warning referencing the lease terms",
            "3. If it still continues — lease violation notice",
          ],
        },
        {
          type: "paragraph",
          content:
            "This is one of the most common operational issues in coliving. Having a clear guest policy — whatever that policy is — and enforcing it consistently prevents 90% of these situations.",
        },
        {
          type: "key-takeaway",
          title: "None of these are emergencies if you have systems in place.",
          body: "Non-payment — address day 1, escalate weekly. Conflicts — listen, identify the behavior, refer to house rules. Early lease breaks — let them go gracefully, fill the room fast. Unauthorized guests — clear policy, consistent enforcement.",
        },
      ],
      quiz: [],
    },

    {
      slug: "turnover-and-maintenance",
      number: 24,
      moduleNumber: 5,
      moduleTitle: "Operations — the questions every new operator asks",
      moduleLessonNumber: 3,
      title: "Turnover & maintenance",
      description:
        "Why turnover is your most expensive cost. The preventive maintenance checklist. Why you should hire a cleaner.",
      duration: "8 min",
      sections: [
        { type: "heading", content: "Turnover" },
        {
          type: "card",
          tone: "blush",
          title: "The most expensive operational cost in coliving.",
          paragraphs: [
            "And the one most new operators underestimate.",
          ],
        },
        {
          type: "paragraph",
          content:
            "Every time a resident moves out you lose rent during the vacancy, you pay for cleaning and touch-up repairs, you spend time re-listing and screening, and you start the relationship-building process over with a new person.",
        },
        {
          type: "paragraph",
          content:
            "The real cost of turnover goes far beyond one month's lost rent. When you add up all the direct and indirect costs, a single turnover can cost you significantly more than most new operators expect.",
        },
        { type: "divider" },
        {
          type: "paragraph",
          content:
            "This is why resident retention matters more than almost anything else in your operations.",
        },
        { type: "subheading", content: "How to minimize turnover" },
        {
          type: "bullets",
          items: [
            "Be responsive. Answer maintenance requests within 24 hours. The #1 reason residents leave isn't the rent — it's feeling ignored when something breaks.",
            "Keep the property clean and well-maintained. Common areas should always look good.",
            "Set clear expectations from day one. Residents who know the rules and feel respected stay longer.",
            "Price fairly. A resident paying a fair rate stays for years. One who feels overcharged leaves the moment something better appears.",
            "Build community intentionally. Residents who feel connected to their housemates stay longer than residents who feel like strangers.",
          ],
        },
        {
          type: "fascination",
          body: "The #1 reason coliving residents leave isn't the price. It isn't the location. It isn't the room size. It's feeling ignored. Respond to every maintenance request within 24 hours. That one habit alone will save you more in turnover costs than almost any other operational decision you make.",
        },
        { type: "heading", content: "Maintenance" },
        {
          type: "card",
          eyebrow: "The mindset",
          title: "Prevent things from breaking. Don't just fix them.",
          paragraphs: [
            "The best coliving operators don't spend their time fixing things. They spend their time preventing things from breaking.",
          ],
        },
        { type: "subheading", content: "The preventive maintenance checklist (quarterly)" },
        {
          type: "bullets",
          items: [
            "HVAC filters — change every 3 months without exception. The single cheapest maintenance item and the one most commonly neglected.",
            "Plumbing check — run every faucet, flush every toilet, check under every sink for leaks. A small leak caught early is a $20 fix; ignored for 6 months it's a $2,000 fix.",
            "Smoke detectors and CO detectors — test monthly, replace batteries annually. Safety and liability — not optional.",
            "Exterior — check gutters, downspouts, grading around foundation. Water damage is expensive and preventable.",
            "Appliances — check that all appliances are functioning. A broken dishwasher or washer/dryer creates friction fast.",
            "Common area wear and tear — touch up paint, tighten cabinet hardware, replace worn items.",
          ],
        },
        { type: "heading", content: "Hire a cleaner" },
        {
          type: "card",
          tone: "blush",
          title: "Don't expect 6–8 adults to keep common areas spotless on their own. It won't happen.",
          paragraphs: [
            "Hire a cleaner for common areas on a regular schedule — weekly or biweekly depending on property size and number of residents. This is an operating expense, not a luxury. Budget $100–$200/month.",
            "Your residents are responsible for their own rooms. You are responsible for common areas looking and feeling like a high-quality home.",
          ],
        },
        {
          type: "key-takeaway",
          title: "Preventive maintenance saves you 10x what reactive maintenance costs",
          body: "Change the HVAC filters. Check the plumbing. Hire a cleaner. These three things alone will prevent the majority of your maintenance headaches.",
        },
      ],
      quiz: [],
    },

    {
      slug: "pricing-and-community",
      number: 25,
      moduleNumber: 5,
      moduleTitle: "Operations — the questions every new operator asks",
      moduleLessonNumber: 4,
      title: "Pricing & building community",
      description:
        "Keeping pricing right over time. How to build community without forcing it.",
      duration: "7 min",
      sections: [
        { type: "heading", content: "Pricing" },
        {
          type: "paragraph",
          content:
            "Setting the right room rate was covered in Module 2 — but keeping it right is an ongoing operational decision.",
        },
        {
          type: "bullets",
          items: [
            "Research comparable coliving rooms in your market regularly — PadSplit, Furnished Finder, Facebook Marketplace, Roomies — for current rates in your zip code",
            "Factor in your room's specific features — private bath commands a premium, larger rooms command more, natural light matters, closet space matters",
            "Start competitive, not greedy — better to fill rooms quickly at a fair rate than sit vacant at a premium rate. Every day vacant is lost revenue you never get back.",
            "Shared bath rooms ~$750/month, private bath rooms ~$1,000/month are good Atlanta baselines. Your market may be higher or lower.",
            "Never project revenue at 100% occupancy — always use 85%",
          ],
        },
        {
          type: "key-takeaway",
          title: "Price competitively. Fill rooms fast. Never project at 100%.",
          body: "When to raise rates, how much to raise, and what to do when a room sits empty — that's the tactical strategy we cover in the coaching program.",
        },
        { type: "heading", content: "Building community" },
        {
          type: "paragraph",
          content:
            "This is the part that most operators treat as optional. It's not.",
        },
        {
          type: "card",
          tone: "blush",
          title: "A boarding house is a building with rooms for rent. A coliving property is a community of people who share a home.",
          paragraphs: [
            "The difference is intentionality — and it shows up in your retention rate, your resident satisfaction, and ultimately your cashflow.",
          ],
        },
        { type: "subheading", content: "How to build community without being intrusive" },
        {
          type: "bullets",
          items: [
            "Welcome new residents personally. Walk them through the house. Introduce them to current residents. Make them feel like they belong — not like they're checking into a hotel.",
            "Create a group chat. Use it for announcements, maintenance updates, and low-key community building. Don't overuse it.",
            "Set the tone with your house rules. Rules aren't about control — they're about creating an environment where everyone feels respected and comfortable.",
            "Be responsive. Residents who feel heard stay. Residents who feel ignored leave.",
            "Handle problems early. A noise issue addressed on day 1 is a conversation. A noise issue ignored for 3 months is a reason someone moves out.",
            "Know when to step back. Your job is to create the conditions for community — not to force it.",
          ],
        },
        {
          type: "key-takeaway",
          title: "Community isn't forced. It's facilitated.",
          body: "Welcome people intentionally. Set clear expectations. Be responsive. Handle issues early. Keep the property at a high standard. Step back and let people live. Do those things consistently and your residents will stay longer, refer their friends, and treat your property like their home. Because it is.",
        },
        { type: "heading", content: "Module 5 recap" },
        {
          type: "bullets",
          items: [
            "Operations takes 10–15 hours/week at launch, drops to 2–5 at steady state",
            "Non-payment — address day 1, escalate weekly, don't let it drag",
            "Resident conflicts — listen, identify the behavior, refer to house rules",
            "Turnover is your most expensive cost — retention is your most valuable skill",
            "Preventive maintenance saves 10x what reactive maintenance costs",
            "Price competitively at 85% occupancy",
            "Community is built through responsiveness and intentionality — not forced",
          ],
        },
        {
          type: "callout",
          tone: "gold",
          body: "Up next — the Module 5 quiz. Five questions on operations.",
        },
      ],
      quiz: [],
    },

    /* ==================== MODULE 5 QUIZ ==================== */
    {
      slug: "module-5-quiz",
      number: 26,
      moduleNumber: 5,
      moduleTitle: "Operations — the questions every new operator asks",
      moduleLessonNumber: 5,
      kind: "module-quiz",
      title: "Module 5 Quiz",
      description:
        "Five questions on operations — time commitment, retention, non-payment, preventive maintenance, and consistent enforcement.",
      duration: "5 min",
      sections: [],
      quiz: [
        {
          question:
            "At steady state, how much time does a single coliving property typically require per week?",
          options: ["15–20 hours", "10–15 hours", "2–5 hours", "Less than 1 hour"],
          correctIndex: 2,
          explanation:
            "After launch and stabilization, a well-run coliving property typically requires 2–5 hours per week of your time.",
        },
        {
          question:
            "What is the single most important operational habit for reducing turnover?",
          options: [
            "Raising rent annually to keep up with the market",
            "Being responsive — acknowledging and addressing maintenance requests quickly",
            "Hosting monthly house events",
            "Offering move-in discounts",
          ],
          correctIndex: 1,
          explanation:
            "Responsiveness is the #1 retention tool. Residents who feel heard stay. Residents who feel ignored leave. Respond to every maintenance request within 24 hours.",
        },
        {
          question:
            "A resident stops paying rent. What's the biggest mistake an operator can make?",
          options: [
            "Addressing it too early",
            "Letting it drag on without documentation or escalation",
            "Having a direct conversation about it",
            "Offering a payment plan",
          ],
          correctIndex: 1,
          explanation:
            "The biggest mistake is waiting and hoping it resolves itself. Every day you let it drag is another day of lost rent and increasing legal complexity.",
        },
        {
          question:
            "Why is preventive maintenance more valuable than reactive maintenance?",
          options: [
            "It's easier to schedule",
            "Small problems caught early cost a fraction of what they cost when ignored",
            "Residents don't notice preventive maintenance",
            "It's required by law",
          ],
          correctIndex: 1,
          explanation:
            "A $20 leak fix today is a $2,000 water damage repair in 6 months. A $10 HVAC filter swap every 3 months prevents a $5,000 system failure.",
        },
        {
          question:
            "Why is it important to enforce your house rules consistently?",
          options: [
            "So residents know you're in charge",
            "Inconsistent enforcement creates confusion and resentment — and rules that aren't enforced are worse than rules you don't have",
            "Because you can be sued if you don't",
            "To make it easier to raise rent",
          ],
          correctIndex: 1,
          explanation:
            "Your house rules are only as good as your enforcement. Consistent enforcement creates a clear, respectful environment where everyone knows what to expect.",
        },
      ],
    },

    /* ====================================================================
     * MODULE 6 — IS COLIVING RIGHT FOR YOU?
     * ==================================================================*/
    {
      slug: "three-paths",
      number: 27,
      moduleNumber: 6,
      moduleTitle: "Is coliving right for you?",
      moduleLessonNumber: 1,
      title: "The three paths into coliving",
      description:
        "Active operator (acquisition), arbitrage operator (master lease), and passive investor. The honest truth about each.",
      duration: "7 min",
      sections: [
        {
          type: "paragraph",
          content:
            "You now know more about coliving than the vast majority of real estate investors out there. The only question left is: what's your path?",
        },
        {
          type: "key-takeaway",
          title: "There is no one-size-fits-all path into coliving",
          body: "The right path is the one that matches where you are right now.",
        },
        { type: "heading", content: "Path 1 · The Active Operator (Acquisition)" },
        {
          type: "card",
          eyebrow: "Path 1",
          title: "You buy it. You build it. You run it.",
          paragraphs: [
            "Full ownership, full control. This is the path that builds the most long-term wealth — and it's the path that requires the most upfront work.",
          ],
        },
        {
          type: "bullets",
          items: [
            "Who it's for — people who want to build their own portfolio, want maximum control, are willing to put in the work, want to build a business",
            "What it requires — capital for down payment + renovation + furnishing. Time, especially first 90 days. Willingness to learn. Right property in right market.",
            "The honest truth — active operating is not passive. It gets more passive as systems improve, but it's a business.",
          ],
        },
        { type: "heading", content: "Path 2 · The Arbitrage Operator" },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Path 2",
          title: "You lease it. You furnish it. You run it.",
          paragraphs: [
            "No ownership — you sign a master lease and sublease rooms. The fastest way into coliving with the least capital.",
          ],
        },
        {
          type: "bullets",
          items: [
            "Who it's for — people with less capital, want to test the model, markets where buying doesn't pencil",
            "The honest truth — you're responsible for rent whether rooms are filled or not. You build cashflow but not equity. You're paying someone else's mortgage.",
          ],
        },
        { type: "heading", content: "Path 3 · The Passive Investor" },
        {
          type: "card",
          eyebrow: "Path 3",
          title: "You bring the capital. Someone else does everything else.",
          paragraphs: [
            "Real estate returns without operating. Often the right move for busy professionals or anyone who wants to learn the model from the inside before going active.",
          ],
        },
        {
          type: "bullets",
          items: [
            "Who it's for — people with capital but limited time, want real estate returns without operating, want to learn from inside before going active",
          ],
        },
        {
          type: "fascination",
          body: "The investors building the most wealth through coliving aren't the ones waiting for the perfect moment. They're the ones who picked a path, committed to it, and figured it out as they went.",
        },
        {
          type: "key-takeaway",
          title: "Three paths. One coliving movement.",
          body: "Active operator — you own it and run it. Arbitrage operator — you lease it and run it. Passive investor — you fund it and collect. None is better than the others. The right one is the one that fits your life right now.",
        },
      ],
      quiz: [],
    },

    {
      slug: "choose-your-path",
      number: 28,
      moduleNumber: 6,
      moduleTitle: "Is coliving right for you?",
      moduleLessonNumber: 2,
      title: "How to choose your path",
      description:
        "Four quick questions to figure out which path fits — capital, time, primary goal, and where you are in your journey.",
      duration: "5 min",
      sections: [
        {
          type: "paragraph",
          content:
            "Four quick questions to figure out which path fits your life right now.",
        },
        {
          type: "card",
          eyebrow: "Question 1",
          title: "How much capital do you have?",
          bullets: [
            "Under $20K → Arbitrage most realistic",
            "$20K–$60K → Arbitrage accessible, acquisition possible",
            "$60K+ → All three paths available",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Question 2",
          title: "How much time can you commit?",
          bullets: [
            "Less than 5 hrs/wk → Passive investing",
            "5–15 hrs/wk → Arbitrage with good systems",
            "15+ hrs/wk at launch → Acquisition",
          ],
        },
        {
          type: "card",
          eyebrow: "Question 3",
          title: "What's your primary goal?",
          bullets: [
            "Build long-term equity → Acquisition",
            "Generate cashflow quickly → Arbitrage",
            "Earn passive returns → Passive investing",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Question 4",
          title: "Where are you in your journey?",
          bullets: [
            "Complete beginner → Arbitrage to learn, acquisition when ready",
            "Existing investor → Acquisition or arbitrage",
            "Busy professional → Passive investing",
          ],
        },
        {
          type: "key-takeaway",
          title: "Pick the path that fits you right now",
          body: "Not the one you'll grow into. Not the one that sounds most impressive. The one that fits the capital, time, and goals you actually have today.",
        },
      ],
      quiz: [],
    },

    {
      slug: "your-next-step",
      number: 29,
      moduleNumber: 6,
      moduleTitle: "Is coliving right for you?",
      moduleLessonNumber: 3,
      title: "Your next step",
      description:
        "Coaching, partnership, real estate services, more learning, and community. Pick the next move that fits.",
      duration: "5 min",
      sections: [
        {
          type: "paragraph",
          content:
            "You've finished Coliving 101. You understand the model, the math, how to find a property, how to set it up, and how to operate it. Now it's time to take action.",
        },
        { type: "heading", content: "Ready to build your own coliving portfolio" },
        {
          type: "card",
          eyebrow: "Coaching · The Builder",
          title: "$4,500 · 3 months",
          paragraphs: [
            "Hands-on, 1:1 training for women building their coliving portfolio from the ground up. Three months of personalized guidance, deal reviews, and direct access to someone actively operating right now.",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Coaching · The Operator",
          title: "$1,000/month",
          paragraphs: [
            "For women already operating who need ongoing consulting, deal reviews, and tactical support as they scale.",
          ],
        },
        { type: "heading", content: "Want to invest passively" },
        {
          type: "callout",
          tone: "blush",
          body: "Partner With Me — let's have a conversation about what passive coliving investment looks like.",
        },
        { type: "heading", content: "Want to find a coliving-ready property" },
        {
          type: "callout",
          tone: "cream",
          body: "Work With Me as Your Realtor — Atlanta Metro · Keller Williams. Outside Atlanta, I can connect you with an investor-friendly agent in my network.",
        },
        { type: "heading", content: "Want to keep learning" },
        {
          type: "bullets",
          items: [
            "Real Estate Investing 101 — the fundamentals, 8 residential strategies compared, and how to evaluate any deal. $99.",
            "House Hacking 101 — how to live for free while your tenants pay your mortgage. The best first move for most new investors. $99.",
            "Bundle all three courses — $149.",
          ],
        },
        { type: "heading", content: "Join the community" },
        {
          type: "bullets",
          items: [
            "She Leads Coliving — free online community for women building wealth through coliving",
            "Women's Coliving Summit — October 16–17, 2026 · Atlanta, GA. The first and only live coliving event built for and by women.",
            "Atlanta Monthly Meetup — last Tuesday of every month. Free. Real estate, coliving, and investing — in person.",
          ],
        },
        {
          type: "padsplit",
          body: "Create your free PadSplit host account — access market data, room rates, occupancy data, and listing tools.",
        },
        { type: "heading", content: "Module 6 recap" },
        {
          type: "bullets",
          items: [
            "Three paths into coliving: active operator, arbitrage, passive investor",
            "The right path depends on your capital, time, and goals",
            "You don't need to have it all figured out — you need to take the next step",
            "Your next step is a conversation — not more research",
          ],
        },
        {
          type: "quote",
          content:
            "The investors who move fastest aren't the ones who know the most. They're the ones who take action with what they know.",
          attribution: "Caitlyn Verdugo",
        },
        {
          type: "card",
          tone: "charcoal",
          eyebrow: "End of course",
          title: "Your next step is a conversation.",
          paragraphs: [
            "Not more research. Not another course. A real conversation about your specific situation.",
          ],
        },
      ],
      quiz: [],
    },
  ],
};
