import type { Course } from "./types";

// House Hacking 101 — six modules, twenty-one self-paced lessons, five
// module-end quizzes (modules 1-5; module 6 has no quiz). Content
// sourced from the canonical course markdown
// (House_Hacking_101_Complete_Course_FINAL.md).
//
// Numbering: welcome=1, lessons run 2-23 across the 6 modules, with
// module quizzes at 6, 10, 14, 19, 24. Module 6 has no quiz, so the
// course ends at lesson 27.

export const houseHacking101: Course = {
  slug: "house-hacking-101",
  title: "House Hacking 101",
  tagline: "The cheat code for first-time investors.",
  description:
    "Six modules. Twenty-one lessons. The complete strategy for buying a property, living in part of it, and renting out the rest — your first investment property and the foundation of your portfolio.",
  longDescription:
    "A self-paced introduction to the most powerful first move in real estate. Six modules cover what house hacking is, the four types, owner-occupied financing (FHA / conventional / VA), how to find the right property, how to run the numbers, how to operate with tenants under your own roof, and how to scale into a portfolio. Twenty-one lessons. Five module quizzes. Lifetime access.",
  price: 99,
  status: "available",
  symbol: "⌂",
  outcomes: [
    "Understand the four house-hack types end-to-end — spare bedroom, basement / ADU, coliving, small multifamily",
    "Know which loan product fits — FHA (3.5%), conventional (3-5%), VA (0%) — and the multifamily financing bonus",
    "Find a property that pencils: location criteria, property criteria by type, and how to spot conversion potential",
    "Run the full math — effective monthly housing cost, income by rental strategy, expenses, and the 5-year wealth picture",
    "Operate with tenants under your roof without burning out — screening, the vibe check, house rules, friendly-not-friends",
    "Plan your exit: the 1-year rule, full rental conversion, house stacking, transitioning to coliving, or using your equity",
  ],
  audience: [
    "First-time buyers exploring owner-occupied investing",
    "Anyone tired of paying someone else's mortgage who wants to flip the equation",
    "Investors deciding which house-hack type fits their life and goals",
    "Future portfolio builders who want to start with property #1",
  ],
  modules: [
    {
      number: 1,
      slug: "what-is-house-hacking",
      title: "What is house hacking & why it's the best first move",
      summary:
        "House hacking defined. Why it's the best first move. The four types. The mindset and what you're trading.",
    },
    {
      number: 2,
      slug: "financing",
      title: "The owner-occupied financing advantage",
      summary:
        "Why financing makes house hacking so powerful. FHA, conventional, VA. The multifamily financing bonus.",
    },
    {
      number: 3,
      slug: "finding-the-property",
      title: "Finding the right property",
      summary:
        "Location criteria. Property criteria by house hack type. Working with the right agent.",
    },
    {
      number: 4,
      slug: "running-the-numbers",
      title: "Running the numbers",
      summary:
        "Effective monthly housing cost. Income by type. Expenses. A real example. The 5-year wealth picture.",
    },
    {
      number: 5,
      slug: "operations",
      title: "Operations & living with your tenants",
      summary:
        "Treat it like a business. Screening + the vibe check + house rules. When things go wrong. Friendly, not friends.",
    },
    {
      number: 6,
      slug: "house-hack-to-portfolio",
      title: "From house hack to portfolio",
      summary:
        "The 1-year rule. Your four exit paths. The mindset. Your next step.",
    },
  ],
  lessons: [
    /* ====================================================================
     * COURSE WELCOME
     * ==================================================================*/
    {
      slug: "welcome",
      number: 1,
      moduleNumber: 0,
      moduleTitle: "Welcome",
      moduleLessonNumber: 1,
      title: "Welcome to House Hacking 101",
      description:
        "What you'll learn, how the course is scoped, why the Atlanta examples are universal, and the disclaimers worth reading first.",
      duration: "5 min",
      sections: [
        {
          type: "paragraph",
          content:
            "Welcome to House Hacking 101! I'm excited you're here.",
        },
        {
          type: "paragraph",
          content:
            "House hacking is one of the most powerful first moves in real estate — and one of the most misunderstood. This course is going to change that. By the time you finish, you'll understand exactly what house hacking is, how it works, how to find the right property, how to run the numbers, and how to decide if it's the right strategy for you.",
        },
        { type: "heading", content: "What we'll work through" },
        {
          type: "bullets",
          items: [
            "Module 1 — What house hacking is, why it's the best first move, the four types, and the mindset it takes",
            "Module 2 — Owner-occupied financing — why house hacking gives you access to loan products most investors can't touch",
            "Module 3 — Finding the right property — location criteria, property criteria by house hack type, and working with the right agent",
            "Module 4 — Running the numbers — effective monthly housing cost, income by type, expenses, a real example, and the 5-year wealth picture",
            "Module 5 — Operations — treating the house like a business, screening, house rules, handling problems, and maintaining boundaries",
            "Module 6 — From house hack to portfolio — the 1-year rule, your exit paths, and your next step",
          ],
        },
        { type: "heading", content: "Before you dive in — a few notes" },
        {
          type: "subheading",
          content: "1. This course covers residential house hacking",
        },
        {
          type: "paragraph",
          content:
            "There are creative variations and special use cases of house hacking that go beyond the scope of this course. We're focused on the core strategy — buying a property with owner-occupied financing, living in it, and renting out part of it to offset your housing costs. This is the model that works for the widest range of people and the one we can teach with confidence.",
        },
        {
          type: "subheading",
          content: "2. Some examples are Atlanta-specific, but the principles are universal",
        },
        {
          type: "paragraph",
          content:
            "I'm based in Atlanta, Georgia — and while much of what we cover applies to any market, some of the specific numbers, neighborhoods, and property examples will be Atlanta-based. That said, house hacking works everywhere — anywhere there's a gap between what working people earn and what housing costs:",
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
            "The strategy is the same. The specific numbers will vary by your market.",
        },
        {
          type: "subheading",
          content: "3. This course pairs with two others for the most comprehensive education",
        },
        {
          type: "paragraph",
          content:
            "Some terms we'll use — especially around financing, deal analysis, and investment metrics — are covered in more depth in Real Estate Investing 101. And if coliving interests you as a house hacking strategy or a next step after your house hack, Coliving 101 covers the model in full detail.",
        },
        {
          type: "paragraph",
          content:
            "I recommend pairing all three courses together for the most complete foundation. Together they give you everything you need to understand the landscape, choose your strategy, and take your first step.",
        },
        { type: "subheading", content: "4. Important disclaimers" },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Read before you start",
          paragraphs: [
            "This course is educational in nature. I am not your attorney, CPA, or financial advisor. Always consult licensed professionals before making investment, legal, or tax decisions.",
            "Interest rates, property values, rental rates, and financial projections used throughout this course are illustrative examples based on real experience. Your actual numbers will depend on your specific market, property, and current conditions.",
            "Results vary. Real estate investing carries risk — educate yourself, do your due diligence, and make informed decisions.",
          ],
        },
        { type: "heading", content: "One more thing" },
        {
          type: "paragraph",
          content:
            "This course is designed to be actionable. Every module includes key takeaway cards, real-world examples, and a quiz to reinforce what you learned. By the time you finish, you won't just understand house hacking — you'll know whether it's right for you and exactly what your next step looks like.",
        },
        {
          type: "key-takeaway",
          title: "Let's get into it",
          body: "Mark this welcome complete and head into Module 1 — What house hacking is and why it's the best first move.",
        },
      ],
      quiz: [],
    },

    /* ====================================================================
     * MODULE 1 — WHAT IS HOUSE HACKING & WHY IT'S THE BEST FIRST MOVE
     * ==================================================================*/
    {
      slug: "what-is-house-hacking",
      number: 2,
      moduleNumber: 1,
      moduleTitle: "What is house hacking & why it's the best first move",
      moduleLessonNumber: 1,
      title: "What is house hacking?",
      description:
        "House hacking defined. Tenants pay your mortgage while you live in the same property.",
      duration: "5 min",
      sections: [
        {
          type: "paragraph",
          content:
            "House hacking is simple: you buy a property, live in part of it, and rent out the rest to offset or eliminate your housing costs.",
        },
        {
          type: "paragraph",
          content:
            "Your tenants pay your mortgage — or at least most of it — while you live in the same property. You're building equity, gaining real estate experience, and reducing your largest monthly expense all at the same time.",
        },
        { type: "divider" },
        {
          type: "paragraph",
          content:
            "It's not a new concept. People have been renting out spare bedrooms, basement apartments, and extra units for decades. What's new is that investors are now doing it intentionally — as a strategy — to build wealth from day one instead of waiting until they can afford a \"real\" investment property.",
        },
        {
          type: "paragraph",
          content:
            "House hacking is how a lot of investors get started — including myself. But you don't have to go as far as I did. House hacking works on its own — even if you never buy a second property. The simple act of having someone else pay your mortgage while you live in the same house is one of the most powerful financial moves you can make.",
        },
        {
          type: "key-takeaway",
          title: "Buy a property. Live in part. Rent out the rest.",
          body: "Your tenants pay your mortgage. You build equity. You gain experience. You reduce your biggest monthly expense. All from your first property.",
        },
      ],
      quiz: [],
    },

    {
      slug: "best-first-move",
      number: 3,
      moduleNumber: 1,
      moduleTitle: "What is house hacking & why it's the best first move",
      moduleLessonNumber: 2,
      title: "Why it's the best first move in real estate",
      description:
        "Owner-occupied financing. Learning from the inside. Reducing your biggest expense. Building equity from day one.",
      duration: "8 min",
      sections: [
        {
          type: "paragraph",
          content:
            "Most people think their first real estate investment needs to be a rental property they buy with 20–25% down. That's $50,000–$75,000+ in cash before closing costs, renovation, or anything else.",
        },
        {
          type: "card",
          tone: "charcoal",
          title: "House hacking flips that completely.",
        },
        { type: "heading", content: "Owner-occupied financing" },
        {
          type: "paragraph",
          content:
            "Because you're living in the property, you qualify for owner-occupied loan products — FHA, conventional, and VA loans. These require dramatically less money down than investor loans:",
        },
        {
          type: "card",
          eyebrow: "Down payment by loan type",
          bullets: [
            "FHA — 3.5% down (credit score 580+)",
            "Conventional — 3–5% down (credit score 620+)",
            "VA — 0% down (veterans / active military)",
            "Investor — 20–25% down",
          ],
        },
        {
          type: "compare",
          items: [
            {
              eyebrow: "FHA on a $300K property",
              title: "$10,500 down",
              paragraphs: [
                "Plus closing costs. The seller can cover up to 6% of those in concessions.",
              ],
            },
            {
              eyebrow: "Investor loan on the same property",
              title: "$60,000–$75,000 down",
              paragraphs: [
                "Plus closing costs. No seller concessions. Higher interest rate.",
              ],
            },
          ],
        },
        {
          type: "paragraph",
          content:
            "That's $50,000–$65,000 less cash you need to get started. This is the single biggest advantage of house hacking — and it's available to you right now on your very first property. We'll go deeper into financing in Module 2.",
        },
        { type: "heading", content: "You learn from the inside" },
        {
          type: "paragraph",
          content:
            "There is no better real estate education than living in your own investment property. You learn how to screen tenants, handle maintenance, manage relationships, set expectations, and run the numbers — all while living under the same roof.",
        },
        {
          type: "paragraph",
          content:
            "By the time you're ready for your second property, you won't be guessing. You'll have real experience.",
        },
        { type: "heading", content: "You reduce or eliminate your biggest expense" },
        {
          type: "paragraph",
          content:
            "For most people, housing is their single largest monthly expense — 30–50% of their income. House hacking can cut that to near zero.",
        },
        {
          type: "paragraph",
          content:
            "When your tenants are covering most or all of your mortgage, that money you used to spend on rent is now available for savings, investing, paying down debt, or funding your next deal.",
        },
        { type: "heading", content: "You build equity from day one" },
        {
          type: "paragraph",
          content:
            "Every mortgage payment your tenants help you make is paying down your loan balance. You're building equity — real wealth — from the month you move in. You didn't need to wait until you could afford a \"real\" investment property. Your home IS your first investment property.",
        },
        {
          type: "fascination",
          body: "Most people wait years to 'save enough' for their first investment property. House hackers skip the line. 3.5% down. Owner-occupied financing. Tenants paying your mortgage from month one. Your first home IS your first investment.",
        },
        {
          type: "key-takeaway",
          title: "Why house hacking is the best first move",
          body: "Owner-occupied financing — 3.5% down instead of 20–25%. Learning from the inside — real experience before your second property. Reduce or eliminate your housing cost. Build equity from day one.",
        },
      ],
      quiz: [],
    },

    {
      slug: "four-types",
      number: 4,
      moduleNumber: 1,
      moduleTitle: "What is house hacking & why it's the best first move",
      moduleLessonNumber: 3,
      title: "The four types of house hacking",
      description:
        "Spare bedroom. Basement / ADU. Coliving house hack. Small multifamily. Each one works — pick what fits your life.",
      duration: "9 min",
      sections: [
        {
          type: "paragraph",
          content:
            "Not all house hacks look the same. There are four main types — each with different levels of income potential, privacy, investment, and operational involvement.",
        },
        {
          type: "card",
          eyebrow: "Type 1",
          title: "Spare Bedroom",
          paragraphs: [
            "The simplest house hack. You rent out one or more extra bedrooms in your home to roommates.",
          ],
          bullets: [
            "Lowest barrier to entry — you may already have a spare room",
            "Minimal or no renovation needed",
            "Income: $500–$1,000/room depending on market",
            "Least privacy — you're sharing all common spaces",
            "Best for: people who want to start immediately with minimal investment",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Type 2",
          title: "Basement / ADU",
          paragraphs: [
            "You rent out a separate living space within your property — a finished basement, garage apartment, or detached accessory dwelling unit (ADU).",
          ],
          bullets: [
            "More privacy for both you and your tenant — separate entrance ideal",
            "Higher rent potential than a spare bedroom",
            "May require renovation to create a livable space",
            "Income: $800–$1,500+ depending on market and finish level",
            "Best for: people who want rental income with more separation from their tenant",
          ],
        },
        {
          type: "paragraph",
          content:
            "This is how I got started — I converted my basement into a studio apartment and rented it out. That one decision changed everything. From there I discovered coliving and scaled to 6 coliving houses and 50+ rooms in the first 18 months.",
        },
        {
          type: "card",
          eyebrow: "Type 3",
          title: "Coliving House Hack",
          paragraphs: [
            "You live in one room and rent out the remaining rooms as coliving — individual leases, furnished rooms, shared common areas.",
          ],
          bullets: [
            "Highest income potential of any house hack type",
            "Most operational involvement — you're an operator, not just a homeowner with a roommate",
            "Multiple income streams from one property",
            "Income: $3,000–$6,000+/month depending on room count and market",
            "Best for: people who want maximum cashflow and are willing to operate",
          ],
        },
        {
          type: "paragraph",
          content:
            "If you want to go deeper on the coliving model, Coliving 101 covers everything in detail.",
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Type 4",
          title: "Small Multifamily (Duplex / Triplex / Quadplex)",
          paragraphs: [
            "You buy a 2–4 unit property, live in one unit, and rent out the others.",
          ],
          bullets: [
            "Most separation from tenants — everyone has their own unit with their own kitchen, bathroom, and entrance",
            "Still qualifies for owner-occupied financing (up to 4 units)",
            "Higher purchase price but also higher income potential",
            "Income: varies widely by market and unit count",
            "Best for: people who want the most separation from tenants while still house hacking",
          ],
        },
        {
          type: "key-takeaway",
          title: "Each one works. Pick what fits.",
          body: "1) Spare bedroom — simplest, lowest barrier. 2) Basement/ADU — more privacy, higher rent. 3) Coliving — highest income, most operational. 4) Small multifamily — most separation, best scale. The right one depends on your budget, your comfort level, and how much income you want to generate.",
        },
        { type: "heading", content: "Each type can vary by how you rent" },
        {
          type: "paragraph",
          content:
            "Furnished vs unfurnished, and short / mid / long-term — these change your income meaningfully.",
        },
        {
          type: "compare",
          items: [
            {
              eyebrow: "Short-term · 1–30 days",
              title: "Airbnb-style",
              paragraphs: [
                "Highest per-night revenue but constant turnover, cleaning, and active management. Check your local short-term rental regulations before going this route — many cities require permits or restrict STRs entirely.",
              ],
            },
            {
              eyebrow: "Mid-term · 1–6 months",
              title: "Furnished, flexible",
              paragraphs: [
                "Travel nurses, relocating professionals, people in transition. Strong income with less turnover than short-term.",
              ],
            },
            {
              eyebrow: "Long-term · 6–12+ months",
              title: "Traditional lease",
              paragraphs: [
                "Most stable, least work, lowest per-unit income.",
              ],
            },
          ],
        },
        {
          type: "fascination",
          body: "A spare bedroom rented long-term at $800/month is a good house hack. That same bedroom furnished and rented mid-term at $1,100/month is a great house hack. How you rent matters as much as what you rent.",
        },
      ],
      quiz: [],
    },

    {
      slug: "the-mindset",
      number: 5,
      moduleNumber: 1,
      moduleTitle: "What is house hacking & why it's the best first move",
      moduleLessonNumber: 4,
      title: "The mindset — what you're trading and why it's worth it",
      description:
        "What you give up vs what you get. The trade is temporary. The wealth is permanent. House hacking with a partner.",
      duration: "9 min",
      sections: [
        {
          type: "paragraph",
          content:
            "Let's be honest about something: house hacking requires sacrifice.",
        },
        {
          type: "paragraph",
          content:
            "You're sharing your home with other people. You might hear them in the hallway. You might have to negotiate shared kitchen time. You might have a tenant who's a little too loud on a Tuesday night.",
        },
        {
          type: "paragraph",
          content:
            "This is real. And if you go into house hacking expecting it to feel like living alone in your dream home — you're going to be disappointed.",
        },
        {
          type: "card",
          tone: "charcoal",
          title: "But here's what you're trading that sacrifice for.",
        },
        {
          type: "compare",
          items: [
            {
              eyebrow: "What you give up (temporarily)",
              bullets: [
                "Some privacy — you're sharing your home with tenants",
                "Some control — you can't walk around in your underwear whenever you want",
                "Some comfort — your home is also a business",
                "Some peace — things will come up that you have to deal with",
              ],
            },
            {
              eyebrow: "What you get",
              bullets: [
                "Your mortgage paid by someone else — or close to it",
                "Equity building from month one — real wealth, not just a roof",
                "Real-world real estate experience",
                "Financial freedom years sooner than people who wait to 'save enough'",
                "A foundation to build your entire real estate portfolio on",
                "Tax benefits — talk to your CPA about depreciation, mortgage interest, repairs, and operating expenses on the rented portion",
              ],
            },
          ],
        },
        { type: "heading", content: "The trade is temporary. The wealth is permanent." },
        {
          type: "paragraph",
          content:
            "Most house hackers do it for 1–3 years. Some do it for 12 months and move on. Some do it over and over again — we call those badass wealth builders House Stackers.",
        },
        {
          type: "paragraph",
          content:
            "The sacrifice has an end date of your choosing — but the equity you built, the experience you gained, and the financial position you put yourself in lasts forever.",
        },
        { type: "divider" },
        {
          type: "paragraph",
          content:
            "The people who never start are still paying someone else's mortgage 5 years from now. The people who house hack for 12–24 months own an asset, have real experience, and are already working on property #2.",
        },
        { type: "heading", content: "The pros and cons — honestly" },
        {
          type: "compare",
          items: [
            {
              eyebrow: "Pros",
              bullets: [
                "Dramatically lower housing costs",
                "Owner-occupied financing (3.5% down vs 20%+)",
                "Build equity and wealth from day one",
                "Learn real estate from inside your own property",
                "Rental income on your tax return creates future opportunities",
                "Sets up your entire investing career",
              ],
            },
            {
              eyebrow: "Cons",
              bullets: [
                "Less privacy than living alone",
                "You're responsible for maintenance and tenant issues",
                "Your home is also your business — the line gets blurry",
                "Not every partner or spouse is on board immediately",
                "It requires intentionality and boundaries",
              ],
            },
          ],
        },
        { type: "heading", content: "House hacking with a partner or spouse" },
        {
          type: "paragraph",
          content:
            "This is worth addressing directly because it's one of the most common concerns. Not everyone's partner is immediately excited about the idea of sharing their home with tenants. That's normal. Here's how to approach it:",
        },
        {
          type: "bullets",
          items: [
            "Have the conversation early — don't surprise them with a listing. Talk about the why first — the financial goals, the timeline, the endgame.",
            "Choose the right type — a duplex where you have your own separate unit is a very different conversation than renting out the spare bedroom down the hall. Match the house hack type to your relationship's comfort level.",
            "Set the end date — \"We're doing this for 12–18 months, then we reassess.\" Knowing it's temporary makes it much easier to commit.",
            "Involve them in the process — screening tenants, setting house rules, making decisions together. This is a team effort.",
          ],
        },
        {
          type: "key-takeaway",
          title: "The trade is temporary. The wealth is permanent.",
          body: "What you give up: some privacy, some comfort, some control. What you get: mortgage paid by tenants, equity from day one, real experience, financial freedom years sooner, tax benefits, a foundation for your portfolio. The people who never start are still paying someone else's mortgage 5 years from now.",
        },
        { type: "heading", content: "Module 1 recap" },
        {
          type: "bullets",
          items: [
            "House hacking = buy, live in part, rent out the rest",
            "Best first move because of owner-occupied financing, built-in education, and reduced housing costs",
            "Four types: spare bedroom, basement/ADU, coliving, small multifamily",
            "Each type can be furnished/unfurnished and rented short/mid/long-term",
            "House hacking requires sacrifice — but the sacrifice is temporary and the wealth is permanent",
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

    /* ==================== MODULE 1 QUIZ ==================== */
    {
      slug: "module-1-quiz",
      number: 6,
      moduleNumber: 1,
      moduleTitle: "What is house hacking & why it's the best first move",
      moduleLessonNumber: 5,
      kind: "module-quiz",
      title: "Module 1 Quiz",
      description:
        "Five questions on what house hacking is, the financing advantage, the four types, and the mindset.",
      duration: "5 min",
      sections: [],
      quiz: [
        {
          question: "What is house hacking?",
          options: [
            "Buying a rental property with no money down",
            "Buying a property, living in part of it, and renting out the rest",
            "Flipping a house while living in it",
            "Renting a room on Airbnb while you're on vacation",
          ],
          correctIndex: 1,
          explanation:
            "House hacking is buying a property, living in it, and renting out part of it to offset or eliminate your housing costs.",
        },
        {
          question: "What is the single biggest financial advantage of house hacking?",
          options: [
            "You don't need insurance",
            "You qualify for owner-occupied financing — 3.5% down instead of 20–25%",
            "You don't pay property taxes",
            "Rental income is tax-free",
          ],
          correctIndex: 1,
          explanation:
            "Owner-occupied financing lets you get into a property with a fraction of the down payment required for an investment property — dramatically lowering the barrier to entry.",
        },
        {
          question: "Which house hack type offers the most income potential?",
          options: [
            "Spare bedroom",
            "Basement/ADU",
            "Coliving house hack",
            "All types generate the same income",
          ],
          correctIndex: 2,
          explanation:
            "A coliving house hack generates multiple income streams from individual room rentals — the highest income potential of any house hack type, though it also requires the most operational involvement.",
        },
        {
          question: "Which house hack type offers the most separation from your tenants?",
          options: [
            "Spare bedroom",
            "Coliving",
            "Basement/ADU",
            "Small multifamily (duplex/triplex/quad)",
          ],
          correctIndex: 3,
          explanation:
            "With a small multifamily, everyone has their own separate unit — their own kitchen, bathroom, and entrance. Maximum separation while still qualifying for owner-occupied financing.",
        },
        {
          question:
            "House hacking requires some sacrifice. Why is it still worth it?",
          options: [
            "Because it's fun to live with strangers",
            "Because the sacrifice is temporary but the equity, experience, and financial position you build lasts permanently",
            "Because there's no other way to invest in real estate",
            "Because you save money on groceries",
          ],
          correctIndex: 1,
          explanation:
            "Most house hackers do it for 1–3 years. The sacrifice has an end date — but the wealth you built and the experience you gained set up your entire investing career.",
        },
      ],
    },

    /* ====================================================================
     * MODULE 2 — THE OWNER-OCCUPIED FINANCING ADVANTAGE
     * ==================================================================*/
    {
      slug: "why-financing-matters",
      number: 7,
      moduleNumber: 2,
      moduleTitle: "The owner-occupied financing advantage",
      moduleLessonNumber: 1,
      title: "Why financing is what makes house hacking so powerful",
      description:
        "The down payment is the biggest barrier. Owner-occupied financing eliminates it.",
      duration: "5 min",
      sections: [
        {
          type: "paragraph",
          content:
            "Here's the truth about real estate investing that most people don't realize: the biggest barrier to entry isn't knowledge. It isn't finding a deal. It isn't even the market.",
        },
        {
          type: "card",
          tone: "charcoal",
          title: "It's the down payment.",
        },
        {
          type: "paragraph",
          content:
            "A traditional investment property requires 20–25% down. On a $300,000 property that's $60,000–$75,000 in cash — before closing costs, before renovation, before anything else. For most people, that number alone keeps them on the sidelines for years.",
        },
        { type: "divider" },
        {
          type: "paragraph",
          content:
            "House hacking eliminates that barrier. Because you're living in the property, you qualify for owner-occupied loan products. These are designed for primary residences — not investors — and they come with dramatically lower down payment requirements, better interest rates, and more flexible qualification criteria.",
        },
        {
          type: "paragraph",
          content:
            "This is not a loophole. This is exactly how these loan products are designed to work. You're buying a home to live in. You're also renting out part of it. Both are completely legitimate.",
        },
        {
          type: "fascination",
          body: "The difference between getting started in real estate this year and waiting another 5 years? For most people, it's not knowledge. It's not the market. It's not timing. It's the down payment. House hacking solves that problem on day one.",
        },
      ],
      quiz: [],
    },

    {
      slug: "fha-conventional-va",
      number: 8,
      moduleNumber: 2,
      moduleTitle: "The owner-occupied financing advantage",
      moduleLessonNumber: 2,
      title: "FHA, conventional, and VA — what you qualify for",
      description:
        "Three loan products that make house hacking possible. Down payments, credit scores, and the trade-offs.",
      duration: "8 min",
      sections: [
        {
          type: "paragraph",
          content:
            "Three main loan products make house hacking possible. Here's what you need to know about each:",
        },
        {
          type: "compare",
          items: [
            {
              eyebrow: "FHA Loan",
              title: "3.5% down · 580+ credit",
              bullets: [
                "Can be used on 1–4 unit properties",
                "Requires mortgage insurance (MIP) — adds to your monthly payment",
                "Must be your primary residence",
              ],
            },
            {
              eyebrow: "Conventional Loan",
              title: "3–5% down · 620+ credit",
              bullets: [
                "Can be used on 1–4 unit properties",
                "Private mortgage insurance (PMI) required under 20% down — drops off at 20% equity",
                "Must be your primary residence",
              ],
            },
            {
              eyebrow: "VA Loan",
              title: "0% down · veterans / military",
              bullets: [
                "Available to veterans, active duty, and eligible surviving spouses",
                "No mortgage insurance",
                "Can be used on 1–4 unit properties",
                "Must be your primary residence",
              ],
            },
          ],
        },
        { type: "heading", content: "What that looks like on a $300K property" },
        {
          type: "compare",
          items: [
            {
              eyebrow: "FHA",
              title: "$10,500 down",
              paragraphs: [
                "vs investor down payment of $60,000–$75,000. Cash you didn't need: $49,500–$64,500.",
              ],
            },
            {
              eyebrow: "Conventional · 5%",
              title: "$15,000 down",
              paragraphs: [
                "vs investor down payment of $60,000–$75,000. Cash you didn't need: $45,000–$60,000.",
              ],
            },
            {
              eyebrow: "VA",
              title: "$0 down",
              paragraphs: [
                "vs investor down payment of $60,000–$75,000. Cash you didn't need: $60,000–$75,000.",
              ],
            },
          ],
        },
        { type: "heading", content: "The honest read on each" },
        {
          type: "card",
          eyebrow: "FHA",
          paragraphs: [
            "The most accessible option for first-time house hackers. The credit score requirement is lower than conventional, and 3.5% down makes it realistic for people who don't have six figures sitting in savings. The trade-off is mortgage insurance — an additional monthly cost that stays on the loan until you refinance. Factor this into your numbers.",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "FHA pro tip",
          paragraphs: [
            "FHA allows up to 6% in seller concessions — meaning the seller can agree to cover part or all of your closing costs as part of the negotiation. On a $300,000 property, that's up to $18,000 the seller could pay toward your closing costs. In many markets — especially when properties have been sitting — this is very negotiable. An investor-friendly agent knows how to ask for this.",
          ],
        },
        {
          type: "card",
          eyebrow: "Conventional",
          paragraphs: [
            "Typically offers slightly better interest rates than FHA and the mortgage insurance drops off once you build enough equity — unlike FHA where it stays for the life of the loan unless you refinance.",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "VA",
          paragraphs: [
            "If you're eligible for a VA loan, this is the single most powerful financing tool in real estate. Zero down, no mortgage insurance, competitive rates. House hacking with a VA loan is as close to a cheat code as real estate gets.",
          ],
        },
        {
          type: "callout",
          tone: "gold",
          body: "Important note on interest rates: rates change constantly and affect your monthly payment significantly. The specific rate available to you depends on your credit score, the loan type, the lender, and current market conditions. Always get quotes from multiple lenders and run the numbers with your actual rate — not a rate you saw online or in an example.",
        },
        {
          type: "key-takeaway",
          title: "Three loan products that make house hacking possible",
          body: "FHA: 3.5% down, 580+ credit. Conventional: 3–5% down, 620+ credit. VA: 0% down, veterans / military only. All three require owner-occupancy. All three work on 1–4 unit properties. All three get you into real estate for a fraction of what investors pay.",
        },
      ],
      quiz: [],
    },

    {
      slug: "multifamily-financing-bonus",
      number: 9,
      moduleNumber: 2,
      moduleTitle: "The owner-occupied financing advantage",
      moduleLessonNumber: 3,
      title: "The multifamily financing bonus",
      description:
        "Lenders count rental income from the other units toward your qualifying income — meaning you may qualify for more.",
      duration: "5 min",
      sections: [
        {
          type: "paragraph",
          content:
            "Here's something most first-time buyers don't know: when you buy a 2–4 unit property with owner-occupied financing, lenders will count a portion of the rental income from the other units toward your qualifying income.",
        },
        {
          type: "paragraph",
          content:
            "This means you may qualify for a larger loan than you would on a single family home — because the bank sees the rental income as part of what will cover the mortgage.",
        },
        {
          type: "card",
          eyebrow: "How it works",
          title: "$350K duplex · live in one unit, rent the other",
          paragraphs: [
            "You're renting the other unit for $1,500/month. The lender will typically count 75% of the projected rental income — $1,125/month — toward your qualifying income. That additional $1,125/month of income can significantly increase the loan amount you qualify for.",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "The trade-off",
          paragraphs: [
            "Multifamily properties cost more than single family homes. A duplex in the same neighborhood as a $300,000 single family home might cost $400,000–$450,000. Your down payment is a percentage of a higher number — so even at 3.5% FHA, you're putting down more cash.",
            "But you're also generating more income from day one. Run the numbers both ways — single family house hack vs small multifamily house hack — and see which pencils better in your market.",
          ],
        },
        {
          type: "key-takeaway",
          title: "You may qualify for MORE than you would on a single family home",
          body: "Lenders count ~75% of projected rental income toward your qualifying income on 2–4 unit properties. Higher purchase price, higher income from day one. Run the numbers both ways.",
        },
        {
          type: "callout",
          tone: "gold",
          body: "Important note on insurance — Insurance for a property you're renting out — even partially — is different from standard homeowner's insurance. Make sure your insurance agent knows you're house hacking. You need a policy that covers rental activity, not just owner-occupied use. Getting this wrong can result in a denied claim when you need it most.",
        },
        { type: "heading", content: "Module 2 recap" },
        {
          type: "bullets",
          items: [
            "The down payment is the biggest barrier to getting started — house hacking eliminates it",
            "FHA (3.5%), conventional (3–5%), and VA (0%) all work for house hacking",
            "All three loan types work on 1–4 units",
            "Multifamily properties let lenders count rental income toward your qualification",
            "Always get quotes from multiple lenders",
            "Make sure your insurance covers rental activity",
          ],
        },
        {
          type: "callout",
          tone: "gold",
          body: "Up next — the Module 2 quiz. Five questions on the financing advantage.",
        },
      ],
      quiz: [],
    },

    /* ==================== MODULE 2 QUIZ ==================== */
    {
      slug: "module-2-quiz",
      number: 10,
      moduleNumber: 2,
      moduleTitle: "The owner-occupied financing advantage",
      moduleLessonNumber: 4,
      kind: "module-quiz",
      title: "Module 2 Quiz",
      description:
        "Five questions on FHA, VA, owner-occupied limits, the multifamily financing bonus, and insurance.",
      duration: "5 min",
      sections: [],
      quiz: [
        {
          question: "What is the minimum down payment for an FHA loan?",
          options: ["0%", "3.5%", "5%", "20%"],
          correctIndex: 1,
          explanation:
            "FHA loans require just 3.5% down with a credit score of 580+. This is what makes house hacking accessible to most first-time buyers.",
        },
        {
          question: "Which loan type requires zero down payment?",
          options: ["FHA", "Conventional", "VA", "All of the above"],
          correctIndex: 2,
          explanation:
            "VA loans are available to veterans, active duty military, and eligible surviving spouses with zero down payment and no mortgage insurance.",
        },
        {
          question: "Up to how many units can you purchase with owner-occupied financing?",
          options: ["1 unit only", "2 units", "4 units", "10 units"],
          correctIndex: 2,
          explanation:
            "FHA, conventional, and VA loans all allow owner-occupied financing on properties with up to 4 units — as long as you live in one of them.",
        },
        {
          question:
            "When buying a multifamily property, what is the \"financing bonus\"?",
          options: [
            "The government gives you a grant for buying multifamily",
            "Lenders count a portion of the projected rental income toward your qualifying income",
            "You get a lower interest rate on multifamily properties",
            "You don't need a down payment on multifamily",
          ],
          correctIndex: 1,
          explanation:
            "Lenders typically count about 75% of projected rental income toward your qualifying income — meaning you may qualify for a larger loan than on a single family home.",
        },
        {
          question:
            "Why is it important to tell your insurance agent you're house hacking?",
          options: [
            "So they can give you a discount",
            "Standard homeowner's insurance doesn't cover rental activity — you need a policy that does",
            "It's required by your lender",
            "So they can insure your tenants' belongings",
          ],
          correctIndex: 1,
          explanation:
            "Getting your insurance wrong can mean a denied claim when you need it most. Make sure your policy covers rental activity — not just owner-occupied use.",
        },
      ],
    },

    /* ====================================================================
     * MODULE 3 — FINDING THE RIGHT PROPERTY
     * ==================================================================*/
    {
      slug: "location-criteria",
      number: 11,
      moduleNumber: 3,
      moduleTitle: "Finding the right property",
      moduleLessonNumber: 1,
      title: "Location criteria — what to look for",
      description:
        "Employment centers. Transit. Neighborhood trajectory. Rental demand. Walkability. Plus what to do when your market is too expensive.",
      duration: "8 min",
      sections: [
        {
          type: "paragraph",
          content:
            "The property you choose determines everything — your tenant pool, your rental income, your appreciation potential, and your day-to-day experience as a house hacker living in the property.",
        },
        {
          type: "paragraph",
          content:
            "And since you're living there too, this isn't just an investment decision. It's a lifestyle decision.",
        },
        { type: "heading", content: "Employment centers" },
        {
          type: "paragraph",
          content:
            "Your tenants need jobs. Properties near major employment centers — hospitals, universities, corporate campuses, downtown districts, military bases — attract a steady pool of working renters. The closer you are to where people work, the easier your rooms or units fill.",
        },
        { type: "heading", content: "Transit access" },
        {
          type: "paragraph",
          content:
            "Proximity to public transit, major highways, and commuting routes matters — both for your tenants and for your property value. In Atlanta, being near a MARTA station is a meaningful advantage. In your market, look for whatever transit infrastructure people actually use.",
        },
        { type: "heading", content: "Neighborhood trajectory" },
        {
          type: "paragraph",
          content:
            "You want a neighborhood that's stable or improving — not declining. Look for:",
        },
        {
          type: "bullets",
          items: [
            "New businesses opening — coffee shops, restaurants, retail",
            "Rising (but still affordable) home values",
            "Active development or renovation activity",
            "Decreasing crime trends",
            "City or county investment in infrastructure",
          ],
        },
        {
          type: "paragraph",
          content:
            "You don't need to buy in the most expensive neighborhood. Some of the best house hack deals are in neighborhoods that are a few years behind the trendy ones — where prices are still accessible but the trajectory is clearly positive.",
        },
        { type: "heading", content: "Rental demand" },
        {
          type: "paragraph",
          content:
            "Check whether people actually want to rent in this area:",
        },
        {
          type: "bullets",
          items: [
            "How quickly do comparable rentals lease up?",
            "What's the vacancy rate?",
            "What are rooms and units renting for?",
            "Are there other house hackers or investors in the area? (That's a good sign — it means the numbers work.)",
          ],
        },
        { type: "heading", content: "Walkability and amenities" },
        {
          type: "paragraph",
          content:
            "Tenants — especially younger professionals and mid-term renters — value walkability. Proximity to grocery stores, restaurants, gyms, parks, and nightlife makes your property more attractive and supports higher rents.",
        },
        { type: "heading", content: "What if my market is too expensive?" },
        {
          type: "paragraph",
          content:
            "This is one of the most common concerns. If you're in a high-cost market where even a house hack feels out of reach, you have a few options:",
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Options when the math doesn't pencil",
          bullets: [
            "Look at adjacent neighborhoods — the next zip code over might be 20–30% cheaper with similar rental demand",
            "Consider small multifamily — the rental income from additional units can offset a higher purchase price",
            "Expand your radius — a 20-minute commute to a more affordable area might be worth it for the right deal",
            "Use the VA loan if eligible — 0% down makes expensive markets much more accessible",
            "Consider a different market entirely — house hacking doesn't have to happen where you currently live",
          ],
        },
        {
          type: "key-takeaway",
          title: "Location checklist",
          body: "Near employment centers. Transit access. Neighborhood trajectory — stable or improving. Strong rental demand. Walkability and amenities. You're living here too — make sure it works for your life AND the numbers.",
        },
      ],
      quiz: [],
    },

    {
      slug: "property-criteria",
      number: 12,
      moduleNumber: 3,
      moduleTitle: "Finding the right property",
      moduleLessonNumber: 2,
      title: "Property criteria by house hack type",
      description:
        "Spare bedroom, basement/ADU, coliving, multifamily — what to look for in each. And why convertibility matters.",
      duration: "8 min",
      sections: [
        {
          type: "paragraph",
          content:
            "The right property depends on which type of house hack you're pursuing. Here's what to look for based on your strategy:",
        },
        {
          type: "card",
          eyebrow: "Spare Bedroom House Hack",
          bullets: [
            "3+ bedrooms minimum — you need at least one to live in and one to rent",
            "Ideally bedrooms are separated — not all sharing one wall",
            "At least 2 bathrooms — sharing a single bathroom with a tenant gets old fast",
            "Good common areas — kitchen and living room that feel comfortable for shared use",
            "Parking — at least one spot per person",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Basement / ADU House Hack",
          bullets: [
            "Finished basement with or without separate entrance — separate entrance is ideal",
            "Enough space for a full living area — bedroom, bathroom, kitchenette at minimum",
            "Adequate ceiling height in basement (most codes require 7 feet minimum)",
            "Plumbing and electrical access for a bathroom/kitchenette if not already built out",
            "Check local zoning — some areas have specific ADU regulations",
            "If it needs renovation — factor that into your total investment",
          ],
        },
        {
          type: "card",
          eyebrow: "Coliving House Hack",
          bullets: [
            "Everything from the Coliving 101 property criteria applies — no HOA, parking for 60%, minimum 6 rooms potential (8+ sweet spot)",
            "Multi-zone floorplan — not open concept",
            "At least 1 bathroom per 3 rooms",
            "Conversion potential — dining rooms, bonus rooms, basements, offices",
            "This is a more intensive strategy — make sure you're prepared to operate, not just rent a room",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Small Multifamily House Hack",
          bullets: [
            "2–4 units — all qualify for owner-occupied financing",
            "Each unit should be self-contained — own kitchen, bathroom, entrance",
            "Look at the condition of ALL units, not just the one you'll live in",
            "Review current rents if occupied — are they at market rate or below?",
            "Factor in the higher purchase price — but also the higher income",
            "Separate utility meters are a big plus — lets you bill tenants directly or include utilities with clarity on actual cost",
          ],
        },
        { type: "heading", content: "For all types — convertibility matters" },
        {
          type: "paragraph",
          content:
            "No matter which type of house hack you're doing, think about the property's future potential:",
        },
        {
          type: "bullets",
          items: [
            "Could you add a room later?",
            "Could you convert from a spare bedroom house hack to a coliving house hack over time?",
            "Could you finish the basement and add another unit?",
            "Could this property grow with your strategy?",
          ],
        },
        {
          type: "paragraph",
          content:
            "The best house hack properties are the ones that give you options — not just for today, but for where you want to be in 2–3 years.",
        },
        {
          type: "key-takeaway",
          title: "Match your property to your strategy",
          body: "Spare bedroom → 3+ BR, separated rooms, 2+ bath. Basement/ADU → separate entrance, full living space. Coliving → 6+ rooms potential, multi-zone, no HOA. Multifamily → 2–4 self-contained units. Always think about convertibility — the best properties give you options for today AND for 2–3 years from now.",
        },
      ],
      quiz: [],
    },

    {
      slug: "the-right-agent",
      number: 13,
      moduleNumber: 3,
      moduleTitle: "Finding the right property",
      moduleLessonNumber: 3,
      title: "Working with the right agent",
      description:
        "Most agents don't understand house hacking. The right one saves you tens of thousands. How to find them.",
      duration: "6 min",
      sections: [
        {
          type: "paragraph",
          content:
            "This might be the most important lesson in this module — and the one most house hackers skip.",
        },
        {
          type: "card",
          tone: "charcoal",
          title: "Most real estate agents don't understand house hacking.",
          paragraphs: [
            "They're trained to help people find homes to live in — not investment properties they'll also live in. The difference matters.",
          ],
        },
        {
          type: "compare",
          items: [
            {
              eyebrow: "Why a regular agent isn't enough",
              bullets: [
                "They're evaluating properties for livability — not for income potential",
                "They don't know how to assess conversion potential, room count, or rental demand",
                "They may not understand owner-occupied financing strategies or how to structure an offer on a multifamily",
                "They'll show you the best kitchen — not the best floorplan for renting rooms",
              ],
            },
            {
              eyebrow: "What an investor-friendly agent brings",
              bullets: [
                "They evaluate properties through an investor lens — cashflow, room count, conversion potential, rental comps",
                "They understand FHA, conventional, and VA loan requirements",
                "They know which neighborhoods have strong rental demand",
                "They can help you run the numbers before you make an offer",
                "They've worked with house hackers before and understand what you're trying to accomplish",
              ],
            },
          ],
        },
        { type: "heading", content: "How to find the right agent" },
        {
          type: "bullets",
          items: [
            "Ask specifically: \"Have you worked with house hackers or real estate investors before?\"",
            "Look for agents who invest themselves — they think differently",
            "Ask how they would evaluate a property for house hacking vs traditional homebuying",
            "If they don't know what house hacking is — keep looking",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "If you're in Atlanta",
          paragraphs: [
            "I'm a licensed Realtor at Keller Williams Metro Atlanta and I specialize in investment properties, house hacks, and coliving conversions. This is literally what I do every day.",
          ],
        },
        {
          type: "card",
          eyebrow: "If you're outside Atlanta",
          paragraphs: [
            "I can connect you with an investor-friendly agent in your market. Having the right person in your corner makes a massive difference — especially on your first deal.",
          ],
        },
        {
          type: "key-takeaway",
          title: "The right agent on your first deal can save you tens of thousands",
          body: "The right agent evaluates properties for income potential — not just curb appeal. Find someone who invests themselves and has worked with house hackers before. The right agent on your first deal can save you tens of thousands in mistakes you didn't know to avoid.",
        },
        { type: "heading", content: "Module 3 recap" },
        {
          type: "bullets",
          items: [
            "Location matters — employment, transit, trajectory, rental demand, walkability",
            "Match your property criteria to your house hack type",
            "Always think about convertibility — can this property grow with your strategy?",
            "Most agents don't understand house hacking — find one who does",
            "The right agent on your first deal is one of the most valuable investments you can make",
          ],
        },
        {
          type: "callout",
          tone: "gold",
          body: "Up next — the Module 3 quiz. Five questions on finding the right property.",
        },
      ],
      quiz: [],
    },

    /* ==================== MODULE 3 QUIZ ==================== */
    {
      slug: "module-3-quiz",
      number: 14,
      moduleNumber: 3,
      moduleTitle: "Finding the right property",
      moduleLessonNumber: 4,
      kind: "module-quiz",
      title: "Module 3 Quiz",
      description:
        "Five questions on location, property criteria, convertibility, working with the right agent, and high-cost markets.",
      duration: "5 min",
      sections: [],
      quiz: [
        {
          question:
            "You're looking for a house hack property. Which of the following is NOT a key location factor?",
          options: [
            "Proximity to employment centers",
            "Strong rental demand",
            "Neighborhood has the best school district in the state",
            "Transit access",
          ],
          correctIndex: 2,
          explanation:
            "School districts matter for families buying homes — but most house hack tenants are working adults, travel professionals, or people in transition. Employment, transit, rental demand, and trajectory matter more for your tenant pool.",
        },
        {
          question:
            "You're planning a basement/ADU house hack. What's the most important feature to look for?",
          options: [
            "Granite countertops",
            "A separate entrance with enough space for a full living area",
            "A two-car garage",
            "A large backyard",
          ],
          correctIndex: 1,
          explanation:
            "A separate entrance with a full living space — bedroom, bathroom, kitchenette — gives your tenant privacy and independence, which supports higher rent and better retention.",
        },
        {
          question:
            "Why should you think about \"convertibility\" when choosing a house hack property?",
          options: [
            "So you can flip the house later",
            "So the property can grow with your strategy — adding rooms, units, or transitioning to coliving over time",
            "So you can tear it down and rebuild",
            "Convertibility doesn't matter for house hacking",
          ],
          correctIndex: 1,
          explanation:
            "The best house hack properties give you options for today and for 2–3 years from now. A property with conversion potential means your investment can grow as your experience and ambition grow.",
        },
        {
          question:
            "Why is working with a regular real estate agent a risk for house hackers?",
          options: [
            "Regular agents charge higher fees",
            "They evaluate properties for livability, not income potential — and may miss the factors that matter most for your house hack",
            "Regular agents can't show you multifamily properties",
            "There's no risk — any agent will do",
          ],
          correctIndex: 1,
          explanation:
            "Most agents are trained to find homes to live in — not investment properties you'll also live in. An investor-friendly agent evaluates cashflow, room count, conversion potential, and rental comps. That difference can save you tens of thousands.",
        },
        {
          question:
            "Your market feels too expensive for house hacking. What should you do?",
          options: [
            "Give up on house hacking",
            "Only consider luxury properties",
            "Look at adjacent neighborhoods, expand your radius, consider multifamily for the income offset, or explore a different market",
            "Wait until prices drop",
          ],
          correctIndex: 2,
          explanation:
            "High-cost markets require creativity — adjacent neighborhoods, multifamily for the rental income offset, expanding your search radius, or even considering a different market. Waiting for prices to drop is not a strategy.",
        },
      ],
    },

    /* ====================================================================
     * MODULE 4 — RUNNING THE NUMBERS
     * ==================================================================*/
    {
      slug: "effective-housing-cost",
      number: 15,
      moduleNumber: 4,
      moduleTitle: "Running the numbers",
      moduleLessonNumber: 1,
      title: "The key metric — effective monthly housing cost",
      description:
        "What you actually pay to live there each month, after your tenants' rent is applied. The most important number in house hacking.",
      duration: "5 min",
      sections: [
        {
          type: "paragraph",
          content:
            "Every house hack comes down to one number: what does it actually cost you to live there each month after your tenants' rent is applied?",
        },
        {
          type: "card",
          tone: "charcoal",
          eyebrow: "The formula",
          title: "Total expenses − Rental income = Effective monthly housing cost",
        },
        { type: "heading", content: "What different numbers mean" },
        {
          type: "compare",
          items: [
            {
              eyebrow: "$0",
              title: "Living for free",
              paragraphs: [
                "Your tenants are covering your entire housing cost.",
              ],
            },
            {
              eyebrow: "Negative",
              title: "Getting paid to live there",
              paragraphs: [
                "Your tenants are paying more than it costs to own the property.",
              ],
            },
            {
              eyebrow: "$500",
              title: "Still winning",
              paragraphs: [
                "You were probably paying $1,500–$2,000/month in rent before. Now you're paying $500 — AND building equity, gaining experience, and getting tax benefits.",
              ],
            },
          ],
        },
        { type: "divider" },
        {
          type: "paragraph",
          content:
            "The goal isn't necessarily $0. The goal is a number that's dramatically lower than what you'd be paying otherwise — while building wealth at the same time.",
        },
        {
          type: "key-takeaway",
          title: "The house hacking metric that matters",
          body: "Total expenses − Rental income = Effective monthly housing cost. $0 = living for free. Negative = getting paid to live there. $500 = still better than $1,800 in rent and you're building equity. Dramatically lower housing costs while building real wealth.",
        },
      ],
      quiz: [],
    },

    {
      slug: "income-by-type",
      number: 16,
      moduleNumber: 4,
      moduleTitle: "Running the numbers",
      moduleLessonNumber: 2,
      title: "Income by type + short / mid / long-term comparison",
      description:
        "What you can earn by house hack type. How rental strategy (short / mid / long-term) changes the income.",
      duration: "7 min",
      sections: [
        {
          type: "paragraph",
          content:
            "Your rental income depends on two things: what type of house hack you're doing, and how you choose to rent.",
        },
        { type: "heading", content: "Income by house hack type" },
        {
          type: "card",
          eyebrow: "Estimated monthly income by type",
          bullets: [
            "Spare bedroom (1 room): $500–$1,000",
            "Spare bedrooms (2 rooms): $1,000–$2,000",
            "Basement / ADU: $800–$1,500+",
            "Coliving (5–7 rooms): $3,000–$5,500+",
            "Duplex (1 unit): $1,000–$2,000+",
            "Triplex (2 units): $2,000–$4,000+",
            "Quadplex (3 units): $3,000–$6,000+",
          ],
          paragraphs: [
            "These are estimates — your actual income depends on your market, your property, and what comparable rooms or units rent for in your area.",
          ],
        },
        { type: "heading", content: "How you rent matters as much as what you rent" },
        {
          type: "compare",
          items: [
            {
              eyebrow: "Short-term · 1–30 days",
              title: "Airbnb-style",
              bullets: [
                "Highest per-night revenue",
                "Constant turnover, cleaning between guests, active management",
                "Seasonal fluctuations — income isn't consistent",
                "Check local regulations — many cities require permits or restrict STRs entirely",
                "Best for: spare rooms or ADUs in high-tourism or high-demand areas",
              ],
            },
            {
              eyebrow: "Mid-term · 1–6 months",
              title: "Furnished, flexible",
              bullets: [
                "Strong revenue — higher than long-term, lower than short-term",
                "Less turnover and less management than Airbnb",
                "Attracts travel nurses, relocating professionals, people in transition",
                "Typically falls outside short-term rental regulations",
                "Best for: most house hack types in most markets",
              ],
            },
            {
              eyebrow: "Long-term · 6–12+ months",
              title: "Traditional lease",
              bullets: [
                "Most stable and predictable income",
                "Least management and least turnover",
                "Lowest per-unit revenue",
                "Best for: people who want simplicity and stability over maximum income",
              ],
            },
          ],
        },
        {
          type: "key-takeaway",
          title: "Same room. Different strategy. Different income.",
          body: "Spare bedroom long-term: ~$800/month. Mid-term furnished: ~$1,100/month. Short-term Airbnb: ~$1,400/month. More effort = more income. Choose what fits your life.",
        },
      ],
      quiz: [],
    },

    {
      slug: "the-expenses",
      number: 17,
      moduleNumber: 4,
      moduleTitle: "Running the numbers",
      moduleLessonNumber: 3,
      title: "The full expense picture",
      description:
        "Mortgage, mortgage insurance, utilities, internet, maintenance reserve, vacancy, closing costs.",
      duration: "7 min",
      sections: [
        {
          type: "paragraph",
          content:
            "Before you can calculate your effective monthly housing cost, you need to know what it actually costs to own and operate the property each month.",
        },
        {
          type: "card",
          eyebrow: "Expense · 1",
          title: "Mortgage payment (PITI)",
          paragraphs: [
            "Principal, interest, taxes, and insurance are often bundled into one monthly payment by your lender. This is your single largest expense. The amount depends on your purchase price, down payment, interest rate, and loan term.",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Expense · 2",
          title: "Mortgage insurance",
          paragraphs: [
            "If you put less than 20% down (which most house hackers do), you'll pay mortgage insurance. FHA calls it MIP. Conventional calls it PMI. This adds $100–$300+/month depending on your loan amount. Factor this in — it's easy to forget.",
          ],
        },
        {
          type: "card",
          eyebrow: "Expense · 3",
          title: "Utilities",
          paragraphs: [
            "If you're sharing the home (spare bedroom, coliving), you're typically covering utilities. If you have a separate unit (basement, duplex), you may be able to have the tenant pay their own. Clarify this upfront and factor it into your numbers either way.",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Expense · 4",
          title: "Internet",
          paragraphs: [
            "Budget for high-speed internet, especially if you're sharing the home with tenants. This is typically on you.",
          ],
        },
        {
          type: "card",
          eyebrow: "Expense · 5",
          title: "Maintenance reserve",
          paragraphs: [
            "Things break. Budget 5–10% of your gross rental income for ongoing maintenance and repairs. Pro tip: get a home warranty. I swear by American Home Shield — it saves me thousands in maintenance costs every year.",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Expense · 6",
          title: "Vacancy allowance",
          paragraphs: [
            "Not every room or unit will be occupied every day of the year. Budget for some vacancy — even a well-run house hack will have gaps between tenants.",
          ],
        },
        {
          type: "card",
          eyebrow: "Expense · 7 (one-time)",
          title: "Closing costs",
          paragraphs: [
            "Not a monthly expense, but don't forget them. Budget approximately 3% of purchase price for closing costs when calculating your total cash invested. That said — seller concessions can often cover part or all of these costs. FHA allows up to 6% in seller concessions. This is one of the most underutilized negotiation tools for first-time buyers. Ask your agent.",
          ],
        },
        { type: "heading", content: "What most first-time house hackers forget" },
        {
          type: "bullets",
          items: [
            "Mortgage insurance — it adds up",
            "Utilities when you're covering them for tenants",
            "Maintenance — the first time something breaks, you'll be glad you budgeted for it",
            "The cost of vacancy between tenants — even one month empty is real money",
          ],
        },
        {
          type: "key-takeaway",
          title: "Run ALL expenses before you decide if a deal works",
          body: "Mortgage (PITI), mortgage insurance (MIP/PMI), utilities (if covering for tenants), internet, maintenance reserve (5–10%), vacancy allowance, closing costs (3% upfront). No surprises.",
        },
      ],
      quiz: [],
    },

    {
      slug: "real-example",
      number: 18,
      moduleNumber: 4,
      moduleTitle: "Running the numbers",
      moduleLessonNumber: 4,
      title: "Real example + 5-year wealth build",
      description:
        "A 3-bedroom Decatur house hack, line by line. $20,800 in. $1,300/month effective cost. ~$97,000 in wealth over 5 years.",
      duration: "9 min",
      sections: [
        {
          type: "paragraph",
          content:
            "Let's put it all together with a real example.",
        },
        {
          type: "card",
          eyebrow: "The property",
          bullets: [
            "3-bedroom home in Decatur, GA",
            "Purchase price: $320,000",
            "FHA loan — 3.5% down",
            "You live in the master bedroom, rent out the other 2 rooms",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Total cash to get in",
          bullets: [
            "Down payment (3.5%): $11,200",
            "Closing costs (~3%): $9,600",
            "Total cash invested: $20,800",
          ],
        },
        { type: "heading", content: "The monthly numbers" },
        {
          type: "compare",
          items: [
            {
              eyebrow: "Monthly expenses",
              bullets: [
                "Mortgage + taxes + insurance: $2,650",
                "Mortgage insurance (MIP): $200",
                "Utilities + internet: $350",
                "Maintenance reserve: $100",
                "Total monthly expenses: $3,300",
              ],
            },
            {
              eyebrow: "Rental income",
              bullets: [
                "Room 1 (furnished, mid-term): $1,000",
                "Room 2 (furnished, mid-term): $1,000",
                "Total rental income: $2,000",
              ],
            },
          ],
        },
        {
          type: "card",
          tone: "charcoal",
          eyebrow: "Effective monthly housing cost",
          title: "$1,300/month",
          paragraphs: [
            "Total expenses $3,300 minus rental income $2,000.",
          ],
        },
        {
          type: "paragraph",
          content:
            "You were paying $1,800/month in rent before. Now you're paying $1,300 — and that $1,300 isn't going to someone else. It's going toward your own mortgage. You're building equity with every payment.",
        },
        {
          type: "card",
          eyebrow: "Annual savings vs renting",
          bullets: [
            "Previous rent: $1,800/month",
            "Current effective cost: $1,300/month",
            "Monthly savings: $500",
            "Annual savings: $6,000",
          ],
        },
        { type: "heading", content: "The 5-year wealth picture" },
        {
          type: "paragraph",
          content:
            "Your house hack isn't just saving you money on housing. It's building wealth through three channels simultaneously:",
        },
        {
          type: "card",
          tone: "charcoal",
          eyebrow: "5-year wealth projection",
          title: "~$97,000 in total wealth created",
          bullets: [
            "Savings vs renting (5 yr): $30,000 ($500/month × 60 months)",
            "Principal paydown (5 yr): ~$18,000 (your tenants are paying down your mortgage)",
            "Appreciation at 3%/yr (5 yr): ~$49,000 ($320K property)",
          ],
        },
        {
          type: "paragraph",
          content:
            "$97,000 in wealth created on $20,800 invested — over 5 years. And you still own the asset. It's still appreciating. Your tenants are still paying down your mortgage.",
        },
        { type: "divider" },
        {
          type: "compare",
          items: [
            {
              eyebrow: "House hacking 5 years",
              title: "$97,000 in wealth created",
              paragraphs: [
                "$20,800 invested. Still own the asset.",
              ],
            },
            {
              eyebrow: "Renting 5 years",
              title: "$0 in wealth built",
              paragraphs: [
                "$108,000 spent ($1,800 × 60 months). Nothing to show for it.",
              ],
            },
          ],
        },
        { type: "heading", content: "A note on tax benefits" },
        {
          type: "paragraph",
          content:
            "House hacking comes with some real tax advantages. The portion of your home that you rent out may qualify for deductions including depreciation, mortgage interest, repairs, maintenance, utilities, and insurance — all on the rental portion of the property.",
        },
        {
          type: "paragraph",
          content:
            "These deductions can significantly reduce your taxable rental income — and in some cases create a paper loss that offsets other income.",
        },
        {
          type: "callout",
          tone: "gold",
          body: "This is a conversation to have with your CPA. The tax benefits of house hacking are real and meaningful — but they depend on your specific situation, and tax law changes. Get professional advice.",
        },
        {
          type: "fascination",
          body: "$20,800 invested. $97,000 in wealth created over 5 years. Still own the asset. Compare to renting: $108,000 spent. $0 in wealth built. That's the difference one decision makes.",
        },
        {
          type: "key-takeaway",
          title: "The 5-year house hacking wealth build",
          body: "Lower housing costs → real savings. Principal paydown → equity you didn't earn. Appreciation → the asset grows on its own. Tax benefits → talk to your CPA. All three channels work simultaneously. All from one property. All starting with $20,800.",
        },
        {
          type: "callout",
          tone: "cream",
          body: "House Hacking Calculator — plug in your property details and see your effective monthly housing cost, savings vs renting, and 5-year wealth projection instantly. colivingcait.com/calculator/house-hacking",
        },
        { type: "heading", content: "Module 4 recap" },
        {
          type: "bullets",
          items: [
            "Effective monthly housing cost is the key metric — total expenses minus rental income",
            "Income varies by house hack type and how you rent (short / mid / long-term)",
            "The full expense picture includes mortgage, mortgage insurance, utilities, maintenance, and vacancy",
            "A real 3BR house hack in Decatur: $20,800 in, $1,300/month effective cost, ~$97,000 in wealth over 5 years",
            "Tax benefits are real — talk to your CPA",
          ],
        },
        {
          type: "callout",
          tone: "gold",
          body: "Up next — the Module 4 quiz. Five questions on running the numbers.",
        },
      ],
      quiz: [],
    },

    /* ==================== MODULE 4 QUIZ ==================== */
    {
      slug: "module-4-quiz",
      number: 19,
      moduleNumber: 4,
      moduleTitle: "Running the numbers",
      moduleLessonNumber: 5,
      kind: "module-quiz",
      title: "Module 4 Quiz",
      description:
        "Five questions on the key metric, rental strategy, expenses, the wealth-building math, and tax benefits.",
      duration: "5 min",
      sections: [],
      quiz: [
        {
          question: "What is the most important metric in house hacking?",
          options: [
            "Cash-on-cash return",
            "Gross rental income",
            "Effective monthly housing cost — total expenses minus rental income",
            "The purchase price of the property",
          ],
          correctIndex: 2,
          explanation:
            "Your effective monthly housing cost tells you what it actually costs you to live there after your tenants' rent is applied. That's the number that determines whether your house hack is working.",
        },
        {
          question: "Which rental strategy generates the highest per-unit income?",
          options: [
            "Long-term (12-month lease)",
            "Mid-term (1–6 months furnished)",
            "Short-term (Airbnb-style, 1–30 days)",
            "All generate the same income",
          ],
          correctIndex: 2,
          explanation:
            "Short-term rentals generate the highest per-night revenue — but they also come with the most turnover, cleaning, management, and regulatory risk. Higher income requires more effort.",
        },
        {
          question:
            "What monthly expense do most first-time house hackers forget to include?",
          options: [
            "The mortgage payment",
            "Mortgage insurance (MIP/PMI)",
            "The purchase price",
            "The down payment",
          ],
          correctIndex: 1,
          explanation:
            "If you put less than 20% down — which most house hackers do — you'll pay mortgage insurance. FHA calls it MIP, conventional calls it PMI. It can add $100–$300+ per month and is easy to overlook when running numbers.",
        },
        {
          question:
            "You're comparing renting at $1,800/month vs house hacking at an effective cost of $500/month. Beyond the monthly savings, what else is house hacking doing for you that renting isn't?",
          options: [
            "Nothing — it's just cheaper",
            "Building equity through principal paydown, gaining appreciation, and generating tax benefits — all simultaneously",
            "Guaranteeing your property will double in value",
            "Eliminating all financial risk",
          ],
          correctIndex: 1,
          explanation:
            "House hacking builds wealth through multiple channels at once — monthly savings, equity through principal paydown, property appreciation, and tax benefits. Renting builds none of those. That's the difference one decision makes.",
        },
        {
          question:
            "Why should house hackers talk to a CPA about their tax situation?",
          options: [
            "Because house hacking is illegal without a CPA",
            "Because the rental portion of your property may qualify for significant tax deductions including depreciation, mortgage interest, and operating expenses",
            "Because CPAs can help you avoid paying your mortgage",
            "Because tax benefits only apply to multifamily properties",
          ],
          correctIndex: 1,
          explanation:
            "The tax benefits of house hacking are real and meaningful — depreciation, mortgage interest, repairs, maintenance, and more can be deducted on the rental portion. But the specifics depend on your situation, so get professional advice.",
        },
      ],
    },

    /* ====================================================================
     * MODULE 5 — OPERATIONS & LIVING WITH YOUR TENANTS
     * ==================================================================*/
    {
      slug: "treat-it-like-a-business",
      number: 20,
      moduleNumber: 5,
      moduleTitle: "Operations & living with your tenants",
      moduleLessonNumber: 1,
      title: "Treat this like a business from day one",
      description:
        "Separate bank account. Expense tracking. Documentation. The habits that carry you through your entire investing career.",
      duration: "4 min",
      sections: [
        {
          type: "paragraph",
          content:
            "Before we talk about screening, tenants, or house rules — let's set the foundation. Your house hack is a business. Even though you live there, the rental side needs to be operated like one.",
        },
        {
          type: "card",
          eyebrow: "Foundation · 1",
          title: "Separate bank account",
          paragraphs: [
            "Open a dedicated checking account for all rental income and expenses. Don't mix rental money with your personal finances. This makes bookkeeping clean, tax time easier, and keeps you thinking like an operator.",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Foundation · 2",
          title: "Expense tracking",
          paragraphs: [
            "Track every dollar that comes in and goes out on the rental side. Mortgage payments, insurance, utilities, repairs, furnishings — all of it. Your CPA will thank you. So will your future self when you're trying to figure out your actual returns.",
          ],
        },
        {
          type: "card",
          eyebrow: "Foundation · 3",
          title: "Document everything",
          paragraphs: [
            "Keep records — leases, communications, receipts, move-in condition photos, maintenance requests. If it happened, document it.",
          ],
        },
        {
          type: "paragraph",
          content:
            "This isn't overkill. This is how you build a real estate business — and it starts with property #1.",
        },
        {
          type: "key-takeaway",
          title: "Your house hack is a business. Treat it like one from day one.",
          body: "Separate bank account. Track every expense. Document everything. These habits don't just help you on property #1. They carry you through your entire investing career.",
        },
      ],
      quiz: [],
    },

    {
      slug: "screening-vibe-check-rules",
      number: 21,
      moduleNumber: 5,
      moduleTitle: "Operations & living with your tenants",
      moduleLessonNumber: 2,
      title: "Screening, the vibe check & house rules",
      description:
        "Standard screening + the vibe check. House rules that work for YOUR life, not just your tenants'.",
      duration: "8 min",
      sections: [
        {
          type: "paragraph",
          content:
            "House hacking is an investment strategy — but it's also your life. You're living with or next to the people you're renting to. That means tenant selection isn't just a financial decision. It's a lifestyle decision.",
        },
        { type: "heading", content: "Screening" },
        {
          type: "paragraph",
          content:
            "The basics are the same as any rental:",
        },
        {
          type: "bullets",
          items: [
            "Background check (criminal history, eviction history)",
            "Income verification",
            "ID verification",
            "References from previous housing",
            "Check your county's free public court records — free, takes 2 minutes, shows evictions and criminal charges",
          ],
        },
        {
          type: "callout",
          tone: "gold",
          body: "Important: Make sure you understand Fair Housing laws before you screen anyone. These are federal rules that protect tenants from discrimination and apply to most rental situations. (And while you're at it — google the Mrs. Murphy Exemption. Do with that what you will.)",
        },
        { type: "heading", content: "The vibe check" },
        {
          type: "paragraph",
          content:
            "This is the part that's unique to house hacking. With a traditional rental, you don't have to like your tenant. You just need them to pay on time and not destroy the property.",
        },
        {
          type: "card",
          tone: "blush",
          title: "With house hacking — you're sharing a kitchen with this person.",
          paragraphs: [
            "You're running into them in the hallway. You're hearing them through the walls. The vibe matters.",
          ],
        },
        {
          type: "paragraph",
          content:
            "Before you approve anyone, have a real conversation:",
        },
        {
          type: "bullets",
          items: [
            "What's their schedule like? (Night shift nurse and early morning person under the same roof = friction)",
            "What are they like to live with? Ask directly.",
            "Do they have a lot of guests? (This matters for your house rules)",
            "What are they looking for in a living situation?",
            "Does your gut say yes or no? Trust it.",
          ],
        },
        {
          type: "paragraph",
          content:
            "You're not just screening for reliability. You're screening for compatibility.",
        },
        {
          type: "key-takeaway",
          title: "House hack screening = standard screening + the vibe check",
          body: "Background check: are they reliable? Vibe check: can you live with them? Both matter. Don't skip either one.",
        },
        { type: "heading", content: "House rules" },
        {
          type: "paragraph",
          content:
            "Just like in coliving, your house rules set the tone for everything. The difference with house hacking is that you're living under the same rules — which means you need rules that work for both you and your tenants.",
        },
        {
          type: "paragraph",
          content:
            "Set them before anyone moves in. Put them in writing. Go over them before the lease is signed.",
        },
        {
          type: "card",
          eyebrow: "Common house hack house rules",
          bullets: [
            "Quiet hours",
            "Guest policy — be specific",
            "Common area cleanliness expectations",
            "Kitchen usage and food storage",
            "Parking assignments",
            "Laundry schedule or guidelines",
            "Smoking policy",
            "Pet policy",
            "Shared supply contributions (toilet paper, cleaning products, etc.)",
          ],
        },
        {
          type: "paragraph",
          content:
            "Your rules are your rules. Some house hackers are flexible. Some are strict. What matters is that they're clear and enforced consistently.",
        },
        {
          type: "key-takeaway",
          title: "You live here too — your rules need to work for YOUR life",
          body: "Set them before anyone moves in. Put them in writing. Enforce them consistently.",
        },
      ],
      quiz: [],
    },

    {
      slug: "when-things-go-wrong",
      number: 22,
      moduleNumber: 5,
      moduleTitle: "Operations & living with your tenants",
      moduleLessonNumber: 3,
      title: "When things go wrong",
      description:
        "Non-payment, disruption, early departure, and the most-common-not-talked-about issue: blurred boundaries.",
      duration: "8 min",
      sections: [
        {
          type: "paragraph",
          content:
            "Things will go wrong. Not because you did something wrong — but because you're dealing with people, and people are unpredictable. Here's how to handle the most common situations:",
        },
        { type: "heading", content: "A tenant stops paying" },
        {
          type: "paragraph",
          content:
            "Same principles as any rental situation. Don't let it drag on. Here's a general timeline:",
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
            "More direct follow-up. Ask what's going on. Listen.",
          ],
        },
        {
          type: "card",
          eyebrow: "Day 7 past due",
          paragraphs: [
            "Written notice. Document the amount owed and the deadline. If they don't communicate or make payment, begin your state's formal process.",
          ],
        },
        {
          type: "card",
          tone: "charcoal",
          title: "The house hacking wrinkle: you live with this person.",
          paragraphs: [
            "That makes the conversation more awkward — but it doesn't change the timeline. Don't let the fact that you see them every day prevent you from addressing non-payment professionally and promptly.",
          ],
        },
        { type: "heading", content: "A tenant is disruptive" },
        {
          type: "paragraph",
          content:
            "Loud music. Frequent guests. Messy common areas. These are quality-of-life issues — and they matter more in a house hack because it's your home too.",
        },
        {
          type: "bullets",
          items: [
            "Address it directly and early — don't let resentment build",
            "Refer to the house rules — this is why they exist",
            "Be professional, not emotional — you're the operator",
            "Document the issue in case it escalates",
          ],
        },
        {
          type: "paragraph",
          content:
            "If a direct conversation doesn't resolve it, follow up in writing. If the behavior continues after written warnings — you may need to consider ending the lease. Living with a disruptive tenant isn't sustainable for you or for your other tenants (if you have them).",
        },
        { type: "heading", content: "A tenant wants to leave early" },
        {
          type: "card",
          tone: "blush",
          title: "Let them go.",
          paragraphs: [
            "A tenant who wants to leave but feels trapped will make your life miserable. A cooperative departure gives you the chance to find someone better. Focus your energy on filling the room or unit quickly — not on keeping someone who doesn't want to be there.",
          ],
        },
        { type: "heading", content: "Personal boundaries get blurred" },
        {
          type: "paragraph",
          content:
            "This is the most common house hacking challenge that nobody talks about. When you live with your tenants, the line between \"we're roommates\" and \"I'm your housing operator\" gets blurry.",
        },
        {
          type: "bullets",
          items: [
            "They ask you to hang out — are you their friend or their operator?",
            "They come to you with personal problems — are you their therapist or their housing operator?",
            "They push back on a rule — are they negotiating with a buddy or pushing back on a business policy?",
          ],
        },
        {
          type: "paragraph",
          content:
            "Set the boundary early and maintain it. You can be warm, friendly, and approachable — but you're the operator. That distinction protects both of you.",
        },
        {
          type: "key-takeaway",
          title: "When things go wrong — address early, be professional, document everything",
          body: "Non-payment → address day 1, escalate weekly. Disruption → direct conversation, house rules, document. Early departure → let them go, fill fast. Blurred boundaries → friendly, not friends. You live here — which makes it harder. But the principles don't change.",
        },
      ],
      quiz: [],
    },

    {
      slug: "friendly-not-friends",
      number: 23,
      moduleNumber: 5,
      moduleTitle: "Operations & living with your tenants",
      moduleLessonNumber: 4,
      title: "The relationship — friendly, not friends",
      description:
        "The most important boundary in house hacking. And what to do about renting to friends and family.",
      duration: "5 min",
      sections: [
        {
          type: "card",
          tone: "charcoal",
          title: "Your tenant is not your friend.",
          paragraphs: [
            "They're your tenant. You can have a great relationship with them — warm, respectful, enjoyable — without crossing the line into friendship.",
          ],
        },
        { type: "heading", content: "Why this matters" },
        {
          type: "card",
          eyebrow: "Reason · 1",
          title: "Friends don't pay friends rent on time",
          paragraphs: [
            "When the relationship becomes personal, the business obligation softens. \"Hey can I be a few days late this month?\" hits different when it's your buddy asking.",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Reason · 2",
          title: "Friends don't enforce rules on friends",
          paragraphs: [
            "Noise complaints, guest policies, cleanliness expectations — all of these become harder to enforce when you've blurred the line.",
          ],
        },
        {
          type: "card",
          eyebrow: "Reason · 3",
          title: "Friends don't evict friends",
          paragraphs: [
            "And if it ever comes to that, you need to be able to act as an operator, not as someone who feels guilty about ending a friendship.",
          ],
        },
        { type: "heading", content: "How to maintain the boundary" },
        {
          type: "bullets",
          items: [
            "Be accessible and responsive — but you don't have to hang out",
            "Be warm and respectful — but business conversations stay professional",
            "Handle issues promptly — don't avoid hard conversations because you like the person",
            "Remember why you're doing this — you're building wealth. This is a business.",
          ],
        },
        {
          type: "paragraph",
          content:
            "Some of the best tenant relationships are the ones where both sides understand the dynamic. You're their housing operator. You provide a great living experience. They pay on time and respect the space. Everyone wins.",
        },
        { type: "heading", content: "A note on renting to friends and family" },
        {
          type: "compare",
          items: [
            {
              eyebrow: "The cautionary view",
              paragraphs: [
                "Many experienced investors will tell you they're the worst tenants — rent is always late, rules are always flexible, and the personal relationship makes it nearly impossible to enforce boundaries or have hard conversations.",
              ],
            },
            {
              eyebrow: "The opposite view",
              paragraphs: [
                "Plenty of people will tell you their best years were house hacking with college friends or close buddies. They had a blast, built wealth together, and wouldn't trade it for anything.",
              ],
            },
          ],
        },
        {
          type: "paragraph",
          content:
            "Both experiences are real. There's no universal right answer here. Whatever you decide, just do it intentionally — and take heed of the advice of people who have come before you. Go in with clear expectations, a real lease, and the understanding that the business side doesn't stop just because you're friends.",
        },
        {
          type: "key-takeaway",
          title: "Friendly, not friends",
          body: "You can be warm, respectful, and enjoyable to live with — without crossing into friendship. Friends don't pay rent on time. Friends don't follow house rules. Friends don't get evicted. Renting to friends and family? Some swear by it. Some swear against it. Whatever you do — do it intentionally and with clear expectations.",
        },
        { type: "heading", content: "Module 5 recap" },
        {
          type: "bullets",
          items: [
            "Treat your house hack like a business — separate bank account, expense tracking, documentation",
            "Screening = standard background check + the vibe check",
            "House rules set the tone — write them down, enforce them consistently",
            "When things go wrong — address early, be professional, document everything",
            "Friendly, not friends — maintain the boundary between operator and roommate",
          ],
        },
        {
          type: "callout",
          tone: "gold",
          body: "Up next — the Module 5 quiz. Five questions on operating with tenants under your roof.",
        },
      ],
      quiz: [],
    },

    /* ==================== MODULE 5 QUIZ ==================== */
    {
      slug: "module-5-quiz",
      number: 24,
      moduleNumber: 5,
      moduleTitle: "Operations & living with your tenants",
      moduleLessonNumber: 5,
      kind: "module-quiz",
      title: "Module 5 Quiz",
      description:
        "Five questions on running it like a business, the vibe check, non-payment, the friendly-not-friends boundary, and expense tracking.",
      duration: "5 min",
      sections: [],
      quiz: [
        {
          question:
            "What's the first thing you should set up before your first tenant moves in?",
          options: [
            "A group chat",
            "A separate bank account for rental income and expenses",
            "A cleaning schedule",
            "A shared grocery list",
          ],
          correctIndex: 1,
          explanation:
            "Treating your house hack like a business starts with separating your finances. A dedicated checking account for all rental income and expenses keeps your bookkeeping clean, makes tax time easier, and sets the right foundation from day one.",
        },
        {
          question: "What is the \"vibe check\" in house hacking screening?",
          options: [
            "Checking if the tenant has good taste in music",
            "Assessing whether you can actually live with this person — schedule compatibility, communication style, lifestyle fit",
            "Seeing if they pass a personality test",
            "Making sure they have the same hobbies as you",
          ],
          correctIndex: 1,
          explanation:
            "In a traditional rental you just need a reliable tenant. In a house hack, you're sharing your home — so screening for compatibility is just as important as screening for reliability.",
        },
        {
          question:
            "Your tenant is 5 days late on rent. You see them every morning in the kitchen. What's the biggest mistake you can make?",
          options: [
            "Having a direct conversation about it",
            "Avoiding the conversation because it's awkward and hoping it resolves itself",
            "Offering a payment plan",
            "Texting them instead of talking in person",
          ],
          correctIndex: 1,
          explanation:
            "Living with your tenant makes the conversation more awkward — but avoiding it only makes things worse. Address non-payment early, directly, and professionally. Don't let proximity prevent you from running your business.",
        },
        {
          question:
            "Why is \"friendly, not friends\" the most important boundary in house hacking?",
          options: [
            "Because friends never pay rent",
            "Because when the relationship becomes personal, the business obligations — paying on time, following rules, respecting boundaries — soften and become harder to enforce",
            "Because you should never talk to your tenants",
            "Because it's illegal to be friends with your tenants",
          ],
          correctIndex: 1,
          explanation:
            "You can have a great, warm, respectful relationship with your tenant without crossing into friendship. The boundary protects both of you — and ensures the business side stays professional when it needs to.",
        },
        {
          question: "Why should you track every expense related to your house hack?",
          options: [
            "It's required by your lender",
            "Your CPA needs it for tax deductions, and you need it to understand your actual returns and run your house hack like a real business",
            "So you can post about it on social media",
            "Expense tracking is only important for multifamily properties",
          ],
          correctIndex: 1,
          explanation:
            "Every dollar in and out needs to be tracked — for tax deductions, for understanding your real returns, and for building the habits that will carry you through your entire real estate investing career. It starts with property #1.",
        },
      ],
    },

    /* ====================================================================
     * MODULE 6 — FROM HOUSE HACK TO PORTFOLIO
     * ==================================================================*/
    {
      slug: "one-year-rule-and-exits",
      number: 25,
      moduleNumber: 6,
      moduleTitle: "From house hack to portfolio",
      moduleLessonNumber: 1,
      title: "The 1-year rule & your four exit paths",
      description:
        "The 1-year rule is non-negotiable. After 12 months — full rental, house stack, transition to coliving, or use your equity.",
      duration: "8 min",
      sections: [
        {
          type: "paragraph",
          content:
            "Imagine it's a year from now: you've been house hacking for a while. The systems are working. The tenants are paying. The equity is building. Now what?",
        },
        {
          type: "paragraph",
          content:
            "First — the most important rule:",
        },
        {
          type: "card",
          tone: "charcoal",
          eyebrow: "Non-negotiable",
          title: "The 1-year rule",
          paragraphs: [
            "If you purchased your property with owner-occupied financing (FHA, conventional, or VA), you are required to live in the property as your primary residence for at least 12 months.",
            "This is not a suggestion. This is a condition of your loan. Violating it is mortgage fraud — a federal offense.",
            "Live in the property for 12 months. After that, your options open up.",
          ],
        },
        { type: "heading", content: "Your four exit paths" },
        {
          type: "paragraph",
          content:
            "Once you've satisfied the 1-year occupancy requirement, you have four paths forward:",
        },
        {
          type: "card",
          eyebrow: "Path 1",
          title: "Move out and convert to a full rental",
          paragraphs: [
            "You move out and the property becomes a full-time rental. Every room or unit now generates income — including the one you were living in.",
          ],
          bullets: [
            "Your cashflow increases — you're no longer occupying a revenue-generating space",
            "You keep the owner-occupied financing terms — your low rate and low down payment stay locked in",
            "You now own a rental property that's already stabilized with tenants in place",
          ],
        },
        {
          type: "callout",
          tone: "gold",
          body: "Important: When you move out, switch your insurance from a homeowner's policy to a landlord or dwelling fire policy. Standard homeowner's insurance does not cover a property you no longer live in. Get this wrong and a claim could be denied.",
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Path 2",
          title: "House hack again (aka \"House Stacking\")",
          paragraphs: [
            "Buy a new primary residence — with owner-occupied financing again — and keep your first property as a rental. Now you have two properties.",
            "Do it every 12–24 months and you're building a portfolio faster than most investors who save for years between purchases.",
          ],
          bullets: [
            "Your first property is now a full rental generating income",
            "Your new property is your next house hack — tenants covering your new mortgage",
            "You used owner-occupied financing both times — 3.5–5% down each time",
            "You can use the rental income from property #1 to help qualify for property #2",
          ],
        },
        {
          type: "fascination",
          body: "House stacking: buy a house hack, live in it for 12–24 months, move out, keep it as a rental, buy another one. Repeat every 1–2 years. This is how everyday people build real estate portfolios without ever needing 20% down.",
        },
        {
          type: "card",
          eyebrow: "Path 3",
          title: "Transition into coliving",
          paragraphs: [
            "If your property has the right bones — enough rooms, good floorplan, no HOA, adequate parking — you can convert your house hack into a full coliving property. Every bedroom becomes an individually leased room. Revenue goes up significantly.",
            "If coliving interests you, Coliving 101 covers the entire model — from the math to property selection to operations.",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Path 4",
          title: "Use your equity",
          paragraphs: [
            "After 12+ months of ownership, appreciation, and principal paydown, you may have built some equity in the property — especially if you've done renovations in the meantime. You may be able to access some of that equity to fund your next deal.",
          ],
        },
        {
          type: "compare",
          items: [
            {
              eyebrow: "Cash-out refinance",
              paragraphs: [
                "Replace your current mortgage with a larger one and pocket the difference. Use the cash for a down payment on your next property.",
              ],
            },
            {
              eyebrow: "HELOC",
              paragraphs: [
                "Home Equity Line of Credit — borrow against your equity as a line of credit. Flexible: you only pay interest on what you draw. Good for funding renovations or down payments.",
              ],
            },
          ],
        },
        {
          type: "paragraph",
          content:
            "Both options let you use the wealth your house hack has already built to accelerate into your next investment — without saving from scratch.",
        },
        {
          type: "key-takeaway",
          title: "Four paths after your 1-year occupancy",
          body: "1) Move out → full rental (more cashflow). 2) House hack again → house stacking (portfolio building). 3) Transition to coliving → higher revenue. 4) Use your equity → cash-out refi or HELOC to fund your next deal. You don't have to pick just one. Many investors combine them.",
        },
      ],
      quiz: [],
    },

    {
      slug: "house-hacking-mindset",
      number: 26,
      moduleNumber: 6,
      moduleTitle: "From house hack to portfolio",
      moduleLessonNumber: 2,
      title: "The house hacking mindset",
      description:
        "Your home is an asset, not just a place to live. The sacrifice is temporary. The wealth is permanent.",
      duration: "5 min",
      sections: [
        {
          type: "paragraph",
          content:
            "House hacking isn't just a strategy. It's a mindset shift — and it's the mindset that separates people who build wealth from people who spend their entire lives paying someone else's mortgage.",
        },
        { type: "heading", content: "Your home is an asset — not just a place to live" },
        {
          type: "paragraph",
          content:
            "Most people think of their home as an asset, but they're wrong. Anyone who's read Rich Dad, Poor Dad knows that most people's homes are a liability — they don't generate any income. It's just a bill they pay every month. A place to sleep and store their stuff. (Side note: if you have not read Rich Dad, Poor Dad by Robert Kiyosaki, I'd HIGHLY recommend. It will change your view on money and wealth.)",
        },
        {
          type: "card",
          tone: "blush",
          title: "House hackers think differently.",
          paragraphs: [
            "Your home is your first investment property. It's building equity. It's generating income. It's appreciating. It's providing tax benefits. It's educating you in real-time on how real estate works.",
            "That shift in thinking — from 'my home is a cost' to 'my home is an asset' — changes everything.",
          ],
        },
        { type: "heading", content: "The sacrifice is temporary. The wealth is permanent." },
        {
          type: "paragraph",
          content:
            "We talked about this in Module 1, but it's worth repeating as you near the end of this course.",
        },
        {
          type: "paragraph",
          content:
            "You're giving up some privacy. Some comfort. Some control. That's real, and it's okay to acknowledge it.",
        },
        { type: "divider" },
        {
          type: "paragraph",
          content:
            "But you're doing it with intention. You have an end date. And when that end date comes — whether it's 12 months or 3 years — you'll own an asset, have real experience, and be in a financial position that most people your age can't touch.",
        },
        {
          type: "card",
          tone: "charcoal",
          title: "The people who never start? They're still paying someone else's mortgage.",
          paragraphs: [
            "Still building someone else's wealth. Still waiting for the 'right time' to invest. You didn't wait. You started. And that one decision will compound for the rest of your life.",
          ],
        },
        { type: "heading", content: "This is just the beginning" },
        {
          type: "paragraph",
          content:
            "House hacking is a first move — not a final destination. Whether you house stack into a portfolio, transition into coliving, use your equity to fund bigger deals, or simply keep your first property as a long-term rental — you've started something most people only talk about.",
        },
        {
          type: "paragraph",
          content:
            "The hardest part is behind you. The first deal is always the hardest. Everything after this is easier because you've done it once.",
        },
        {
          type: "key-takeaway",
          title: "You started. That's the hardest part. Now keep going.",
          body: "Your home is an asset — not just a place to live. The sacrifice is temporary — the wealth is permanent. You're building the foundation of your entire investing career. The first deal is the hardest — everything after this is easier.",
        },
      ],
      quiz: [],
    },

    {
      slug: "your-next-step",
      number: 27,
      moduleNumber: 6,
      moduleTitle: "From house hack to portfolio",
      moduleLessonNumber: 3,
      title: "Your next step",
      description:
        "Realtor services, coaching, partnership, more learning, and community. Pick the next move that fits.",
      duration: "5 min",
      sections: [
        {
          type: "paragraph",
          content:
            "You've finished House Hacking 101. You understand the strategy, the financing, how to find the right property, how to run the numbers, how to manage tenants, and where to go from here.",
        },
        {
          type: "paragraph",
          content:
            "Now it's time to take action.",
        },
        { type: "heading", content: "Need help finding the right property" },
        {
          type: "card",
          eyebrow: "Atlanta Metro · Keller Williams",
          title: "Work with me as your Realtor",
          paragraphs: [
            "I specialize in investment properties, house hacks, and coliving conversions. This is what I do every day.",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Outside Atlanta",
          title: "Get connected with an investor-friendly agent",
          paragraphs: [
            "I'll connect you with someone who understands house hacking in your market.",
          ],
        },
        { type: "heading", content: "Want to explore coliving as a house hack or next step" },
        {
          type: "callout",
          tone: "cream",
          body: "Coliving 101 — the complete coliving model from math to operations. $99. colivingcait.com/courses/coliving-101",
        },
        { type: "heading", content: "Want hands-on guidance" },
        {
          type: "card",
          eyebrow: "Coaching · The Builder",
          title: "$4,500 · 3 months",
          paragraphs: [
            "Hands-on, 1:1 training for building your portfolio from the ground up.",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Coaching · The Operator",
          title: "$1,000/month",
          paragraphs: [
            "Ongoing consulting for active operators scaling their portfolio.",
          ],
        },
        { type: "heading", content: "Want to invest passively" },
        {
          type: "callout",
          tone: "blush",
          body: "Partner With Me — let's have a conversation about passive coliving investment.",
        },
        { type: "heading", content: "Want to keep learning" },
        {
          type: "bullets",
          items: [
            "Real Estate Investing 101 — the fundamentals, 8 residential strategies compared, and how to evaluate any deal. $99.",
            "Bundle all three courses — $149.",
          ],
        },
        {
          type: "callout",
          tone: "cream",
          body: "House Hacking Calculator — plug in your property details and see your effective monthly housing cost, savings vs renting, and 5-year wealth projection. colivingcait.com/calculator/house-hacking",
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
            "The 1-year rule is non-negotiable — live in the property for 12 months minimum",
            "Four exit paths: full rental, house stack, transition to coliving, use your equity",
            "House stacking every 12–24 months is how everyday people build portfolios",
            "Your home is an asset — not just a place to live",
            "The sacrifice is temporary — the wealth is permanent",
            "The first deal is the hardest — everything after this is easier",
          ],
        },
        {
          type: "card",
          tone: "charcoal",
          eyebrow: "End of course",
          title: "The hardest part is behind you — making the decision to start.",
          paragraphs: [
            "Everything after that is execution. Your next step is a conversation — about your specific situation, your market, and the right property for your first house hack.",
          ],
        },
      ],
      quiz: [],
    },
  ],
};
