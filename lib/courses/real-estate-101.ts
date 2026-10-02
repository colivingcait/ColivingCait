import type { Course } from "./types";

// Real Estate Investing 101 — six modules, twenty-eight self-paced
// lessons, five module-end quizzes (Modules 1-5; Module 6 has no quiz).
// Content sourced from the canonical course markdown
// (Real_Estate_Investing_101_Complete_Course_FINAL.md).
//
// 34 total entries: 1 welcome + 28 lessons + 5 module quizzes.

export const realEstate101: Course = {
  slug: "real-estate-101",
  title: "Real Estate Investing 101",
  tagline: "Start smart. Start now.",
  description:
    "Six modules. Twenty-eight lessons. Every major residential strategy, how to choose yours, and your first move.",
  longDescription:
    "A self-paced foundation in residential real estate. Six modules cover why real estate works, every major strategy, how to pick yours, the fundamentals every investor needs, the costliest mistakes, and your first move. Twenty-eight lessons. Five module quizzes. Lifetime access.",
  price: 99,
  originalPrice: 149,
  status: "available",
  symbol: "$",
  outcomes: [
    "Understand the 5 simultaneous channels real estate uses to build wealth — cashflow, appreciation, principal paydown, tax benefits, leverage",
    "Compare all 8 major residential strategies — house hacking, traditional rental, coliving, STR, BRRRR, fix & flip, lease arbitrage, passive",
    "Pick the right strategy for your capital, time, risk tolerance, and goals — and stack strategies over time",
    "Evaluate any deal with the 3 essential questions and the 4 metrics that matter (cashflow, CoC, DSCR, ROI)",
    "Avoid the 7 most expensive mistakes first-time investors make — analysis paralysis, emotion-buying, underestimating expenses, skipping DD, going solo, casual operations, market-timing",
    "Build a clear next-step plan even if you're not ready to buy today",
  ],
  audience: [
    "Anyone considering real estate as their first investment",
    "Investors deciding which strategy to commit to",
    "Folks who want a high-level overview before going deep on a single strategy",
    "Future house hackers, coliving operators, and passive investors who need a foundation",
  ],
  modules: [
    {
      number: 1,
      slug: "why-real-estate",
      title: "Why real estate? And why now?",
      summary:
        "Why real estate is the best wealth-building tool. The 5 simultaneous channels. Addressing the objections. The myths.",
    },
    {
      number: 2,
      slug: "the-strategies",
      title: "Every way to invest in residential real estate",
      summary:
        "House hacking. Traditional rental. Coliving. STR. BRRRR. Fix & flip. Lease arbitrage. Passive investing.",
    },
    {
      number: 3,
      slug: "which-strategy-fits",
      title: "Which strategy fits your life?",
      summary:
        "The 4 decision factors. The decision matrix. Strategy stacking over time.",
    },
    {
      number: 4,
      slug: "the-fundamentals",
      title: "The fundamentals every investor needs to know",
      summary:
        "Evaluate any deal in 3 questions. Cashflow & CoC. DSCR & ROI. Financing. Due diligence basics.",
    },
    {
      number: 5,
      slug: "the-mistakes",
      title: "The mistakes that cost first-time investors the most",
      summary:
        "Analysis paralysis. Emotion-buying. Underestimating expenses. Skipping DD. Going solo. Market-timing.",
    },
    {
      number: 6,
      slug: "your-first-move",
      title: "Your first move",
      summary:
        "The decision framework. What to do if you're not ready yet. Your next step.",
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
      title: "Welcome to Real Estate Investing 101",
      description:
        "What you'll learn, how the course is scoped, the Atlanta-but-universal note, the disclaimers, and how this course pairs with the others.",
      duration: "5 min",
      sections: [
        {
          type: "paragraph",
          content:
            "Welcome to Real Estate Investing 101! I'm excited you're here.",
        },
        {
          type: "paragraph",
          content:
            "Real estate is one of the most powerful wealth-building tools available to everyday people — and it has been for generations. But getting started can feel overwhelming. There are dozens of strategies, endless opinions, and more information online than any one person can sort through.",
        },
        {
          type: "paragraph",
          content:
            "This course is designed to cut through the noise and give you a clear, honest foundation — so you can make informed decisions and take action with confidence.",
        },
        { type: "heading", content: "What we'll work through" },
        {
          type: "bullets",
          items: [
            "Module 1 — Why real estate is the best wealth-building tool, how it builds wealth through 5 channels simultaneously, and why now is still a great time to start",
            "Module 2 — Every major residential real estate strategy — house hacking, traditional rentals, coliving, short-term rentals, BRRRR, fix & flip, lease arbitrage, and passive investing",
            "Module 3 — How to choose the right strategy for your capital, time, risk tolerance, and goals — plus how to stack strategies over time",
            "Module 4 — The fundamentals — how to evaluate any deal, the four metrics that matter, financing options, and due diligence basics",
            "Module 5 — The most expensive mistakes first-time investors make — and how to avoid them",
            "Module 6 — Your first move — a decision framework for where you are right now, and what to do if you're not ready yet",
          ],
        },
        { type: "heading", content: "Before you dive in — a few notes" },
        {
          type: "subheading",
          content: "1. This course covers residential real estate strategies only",
        },
        {
          type: "paragraph",
          content:
            "We're focused on strategies for residential properties — single family homes, small multifamily (2–4 units), and room-by-room models. Commercial real estate, REITs, syndications, and note investing are all valid strategies — but they're beyond the scope of this course.",
        },
        {
          type: "subheading",
          content: "2. Some examples are Atlanta-specific, but the principles are universal",
        },
        {
          type: "paragraph",
          content:
            "I'm based in Atlanta, Georgia — and while some of the specific numbers and property examples will be Atlanta-based, every strategy and principle in this course works in any market:",
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
            "The fundamentals don't change. The numbers do.",
        },
        {
          type: "subheading",
          content: "3. This course pairs with two others for the most comprehensive education",
        },
        {
          type: "paragraph",
          content:
            "If house hacking interests you, House Hacking 101 goes deep on the strategy, financing, property selection, and operations. If coliving interests you, Coliving 101 covers the entire model from math to operations.",
        },
        {
          type: "paragraph",
          content:
            "I recommend pairing all three courses together for the most complete foundation.",
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
            "This course is designed to be actionable. Every module includes key takeaway cards, real-world context, and a quiz to reinforce what you learned. By the time you finish, you won't just understand real estate investing — you'll know which strategy fits your life and exactly what your next step looks like.",
        },
        {
          type: "key-takeaway",
          title: "Let's get into it",
          body: "Mark this welcome complete and head into Module 1 — Why real estate, and why now.",
        },
      ],
      quiz: [],
    },

    /* ====================================================================
     * MODULE 1 — WHY REAL ESTATE? AND WHY NOW?
     * ==================================================================*/
    {
      slug: "why-real-estate-best",
      number: 2,
      moduleNumber: 1,
      moduleTitle: "Why real estate? And why now?",
      moduleLessonNumber: 1,
      title: "Why real estate is the best wealth-building tool",
      description:
        "Other people's money. An appreciating asset. Income. Tenants paying it off. Tax benefits. No other asset class does all five.",
      duration: "5 min",
      sections: [
        {
          type: "paragraph",
          content:
            "There are a lot of ways to build wealth. Stocks, bonds, crypto, starting a business, saving aggressively. All of them work to varying degrees.",
        },
        {
          type: "card",
          tone: "charcoal",
          title: "But real estate has something none of the others do.",
          paragraphs: [
            "It lets you use other people's money to buy an appreciating asset that generates income while someone else pays it off for you.",
            "Read that again.",
          ],
        },
        {
          type: "paragraph",
          content:
            "You put down 5–20% of the purchase price. The bank lends you the rest. Your tenants pay the mortgage every month. The property appreciates over time. And you get tax benefits on top of all of it.",
        },
        {
          type: "paragraph",
          content:
            "No other asset class does all of those things simultaneously.",
        },
        { type: "divider" },
        {
          type: "compare",
          items: [
            {
              eyebrow: "Stocks",
              paragraphs: [
                "Can appreciate — but don't generate monthly cashflow unless you sell.",
              ],
            },
            {
              eyebrow: "A business",
              paragraphs: [
                "Can generate income — but requires your time every single day.",
              ],
            },
            {
              eyebrow: "Crypto",
              paragraphs: [
                "Can grow — but can also drop 50% overnight, and produces no income.",
              ],
            },
          ],
        },
        {
          type: "paragraph",
          content:
            "Real estate isn't perfect. It requires education, capital, and effort. But for everyday people who want to build real, lasting, generational wealth — it's the most proven vehicle we have.",
        },
        {
          type: "key-takeaway",
          title: "No other asset class does all five at the same time",
          body: "Use other people's money (the bank's). Buy an appreciating asset. Generate monthly income. Have someone else pay it off (tenants). Get tax benefits on top of it all.",
        },
      ],
      quiz: [],
    },

    {
      slug: "five-wealth-channels",
      number: 3,
      moduleNumber: 1,
      moduleTitle: "Why real estate? And why now?",
      moduleLessonNumber: 2,
      title: "The 5 ways real estate builds wealth simultaneously",
      description:
        "Cashflow, appreciation, principal paydown, tax benefits, leverage. All working at the same time.",
      duration: "8 min",
      sections: [
        {
          type: "paragraph",
          content:
            "Most people think real estate is about cashflow — collecting rent and keeping what's left after expenses. Cashflow matters. But it's only one of five wealth-building channels that work simultaneously in real estate.",
        },
        {
          type: "card",
          eyebrow: "Channel 1",
          title: "Cashflow",
          paragraphs: [
            "The money left over each month after all expenses are paid. This is income that hits your bank account — real, spendable money. Not every property cashflows from day one (especially in today's market), but the right strategy and the right property can generate meaningful monthly income.",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Channel 2",
          title: "Appreciation",
          paragraphs: [
            "Real estate has historically appreciated 3–5% annually over time. On a $300,000 property, 3% annual appreciation is $9,000 in year one — and it compounds. You didn't do anything to earn that. The asset just grows in value while you own it.",
            "There are no guarantees — markets fluctuate short-term. But over 5, 10, 20 years, real estate has consistently appreciated across nearly every market in the country.",
          ],
        },
        {
          type: "card",
          eyebrow: "Channel 3",
          title: "Principal paydown",
          paragraphs: [
            "Every month your tenants pay rent, a portion of that payment goes toward paying down your mortgage balance. You're not paying it — they are. Over time, you owe less and less on an asset that's worth more and more. This is wealth building on autopilot.",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Channel 4",
          title: "Tax benefits",
          paragraphs: [
            "Real estate comes with significant tax advantages that most other investments don't offer. Depreciation, mortgage interest deductions, operating expense deductions, and in some cases the ability to create a paper loss that offsets other income — all while the property is actually making you money.",
            "Tax benefits are real and meaningful — but they depend on your specific situation. Talk to your CPA.",
          ],
        },
        {
          type: "card",
          tone: "charcoal",
          eyebrow: "Channel 5 — the underestimated one",
          title: "Leverage",
          paragraphs: [
            "When you buy a $300,000 property with $15,000 down, you're controlling a $300,000 asset with $15,000 of your own money. If that property appreciates 3% — that's $9,000 of appreciation on a $15,000 investment. That's a 60% return on your cash — from appreciation alone.",
            "Leverage amplifies every other channel. It's what makes real estate returns dramatically higher than almost any other asset class when measured against the actual cash you invested.",
          ],
        },
        {
          type: "compare",
          items: [
            {
              eyebrow: "$15K in the stock market",
              title: "10% growth = $1,500 gain",
              paragraphs: ["That's it. One channel."],
            },
            {
              eyebrow: "$15K as a down payment",
              title: "$300K property at 3% = $9,000 gain",
              paragraphs: [
                "Plus cashflow. Plus principal paydown. Plus tax benefits. Plus leverage.",
              ],
            },
          ],
        },
        {
          type: "fascination",
          body: "That's leverage. That's why real estate wins.",
        },
        {
          type: "key-takeaway",
          title: "5 wealth-building channels — all working at the same time",
          body: "1) Cashflow — monthly income. 2) Appreciation — the asset grows. 3) Principal paydown — tenants pay your mortgage. 4) Tax benefits — talk to your CPA. 5) Leverage — control a large asset with a small investment. No other investment does all five simultaneously.",
        },
      ],
      quiz: [],
    },

    {
      slug: "why-now",
      number: 4,
      moduleNumber: 1,
      moduleTitle: "Why real estate? And why now?",
      moduleLessonNumber: 3,
      title: "Why now — addressing the objections",
      description:
        "But rates are high. But prices are too expensive. But the market is about to crash. But it's not the right time. All four — answered.",
      duration: "8 min",
      sections: [
        {
          type: "paragraph",
          content:
            "\"But interest rates are high.\" \"But home prices are too expensive.\" \"But the market is about to crash.\" \"But it's not the right time.\"",
        },
        {
          type: "paragraph",
          content:
            "You've heard all of these. You've probably said some of them. Let's address each one honestly.",
        },
        { type: "heading", content: "\"Interest rates are too high.\"" },
        {
          type: "paragraph",
          content:
            "Interest rates are higher than they were in 2020–2021. That's true. But those rates were historically abnormal — the lowest in recorded history. Comparing today's rates to a once-in-a-generation anomaly isn't useful.",
        },
        {
          type: "paragraph",
          content:
            "The long-term historical average for mortgage rates is 7–8%. If you're getting a rate in that range — you're getting a historically normal rate.",
        },
        {
          type: "card",
          tone: "blush",
          title: "Marry the house. Date the rate.",
          paragraphs: [
            "You can refinance later if rates drop. You can't go back in time and buy the property at today's price if prices keep rising. Buy the right property now. Refinance the rate later.",
          ],
        },
        { type: "heading", content: "\"Home prices are too expensive.\"" },
        {
          type: "paragraph",
          content:
            "In some markets, they are. In others, they're still very accessible. And in almost all markets, there are strategies that work at today's prices — house hacking, coliving, small multifamily — if you know where to look and how to run the numbers.",
        },
        {
          type: "card",
          eyebrow: "The inconvenient truth",
          paragraphs: [
            "The people who waited for prices to drop in 2018 are still waiting. The people who bought in 2018 have hundreds of thousands in equity.",
            "Prices may dip in some markets. They may not. But over any 10-year period in modern American history, real estate prices have gone up. Timing the market is a losing game.",
          ],
        },
        { type: "heading", content: "\"The market is about to crash.\"" },
        {
          type: "paragraph",
          content:
            "People have been saying this every single year since 2015. Some of them will eventually be right — but they'll have missed a decade of wealth building while they waited.",
        },
        {
          type: "paragraph",
          content:
            "The 2008 crash was caused by very specific conditions — subprime lending, no-documentation loans, wildly overleveraged banks. Those conditions don't exist today. Lending standards are significantly tighter.",
        },
        {
          type: "paragraph",
          content:
            "Could prices soften? Sure. Could there be a correction in some markets? Absolutely. But waiting for a crash that may never come — or may be a 5% dip, not a 40% collapse — is not a strategy.",
        },
        { type: "heading", content: "\"It's not the right time.\"" },
        {
          type: "card",
          tone: "charcoal",
          title: "The right time to start was 10 years ago. The second best time is now.",
          paragraphs: [
            "Every year you wait, prices are likely higher, rents are likely higher, and you're one year further from the compounding effects of equity, appreciation, and cashflow.",
            "The investors who build the most wealth aren't the ones who timed the market perfectly. They're the ones who bought the right property with the right strategy and held it long enough for compounding to do its work.",
          ],
        },
        {
          type: "key-takeaway",
          title: "Every objection answered",
          body: "Rates are high → marry the house, date the rate. Prices are high → they've been saying that since 2015. The market will crash → waiting for a crash isn't a strategy. It's not the right time → the right time was 10 years ago. The second best time is now.",
        },
      ],
      quiz: [],
    },

    {
      slug: "the-myths",
      number: 5,
      moduleNumber: 1,
      moduleTitle: "Why real estate? And why now?",
      moduleLessonNumber: 4,
      title: "The myths holding people back",
      description:
        "Need a lot of money. Need to know everything. Too risky. Need to be handy. Too late. Five excuses disguised as logic.",
      duration: "8 min",
      sections: [
        {
          type: "paragraph",
          content:
            "Beyond the market-timing objections, there are deeper myths that keep people from ever getting started. Let's clear them out.",
        },
        {
          type: "card",
          eyebrow: "Myth #1",
          title: "\"You need a lot of money to get started.\"",
          paragraphs: [
            "If you're house hacking — you need as little as 3.5% down with an FHA loan. On a $300,000 property that's $10,500. Is that nothing? No. But it's not the $60,000–$75,000 most people think they need.",
            "Even for traditional investment properties at 20% down, there are creative financing strategies, partnerships, and programs that can reduce or eliminate the cash you need out of pocket.",
            "The money barrier is real — but it's not nearly as high as most people think.",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Myth #2",
          title: "\"You need to know everything before you start.\"",
          paragraphs: [
            "You don't. You need to know enough to make an informed decision on your first deal. That's it. Everything after that you learn by doing.",
            "The investors with the biggest portfolios will all tell you the same thing: they knew the least on their first deal. They learned by doing. Waiting until you feel \"ready\" is just another word for waiting forever.",
          ],
        },
        {
          type: "card",
          eyebrow: "Myth #3",
          title: "\"Real estate is too risky.\"",
          paragraphs: [
            "All investments carry risk. But real estate has some built-in risk mitigation that other investments don't:",
          ],
          bullets: [
            "It's a tangible asset — it can't go to zero like a stock",
            "People always need housing — demand doesn't disappear",
            "You have control — you can improve the property, raise rents, change strategy",
            "Multiple income streams (in coliving or multifamily) diversify your risk",
            "Insurance protects against catastrophic loss",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Myth #4",
          title: "\"You need to be handy / fix things yourself.\"",
          paragraphs: [
            "You don't. You need a phone and a list of reliable contractors. The best investors aren't the ones swinging hammers — they're the ones managing the people who swing hammers.",
          ],
        },
        {
          type: "card",
          eyebrow: "Myth #5",
          title: "\"It's too late to start.\"",
          paragraphs: [
            "It's never too late. People start investing in real estate in their 20s, 30s, 40s, 50s, and beyond. The strategy might look different at different life stages — but the fundamentals work at any age.",
            "The only version of \"too late\" that's real is the one where you never start at all.",
          ],
        },
        {
          type: "key-takeaway",
          title: "Excuses disguised as logic",
          body: "Need a lot of money → 3.5% down exists. Need to know everything → you learn by doing. Too risky → tangible asset, built-in protections. Need to be handy → hire the right people. Too late → the only too late is never. None of these are reasons to wait.",
        },
        { type: "heading", content: "Module 1 recap" },
        {
          type: "bullets",
          items: [
            "Real estate lets you use leverage, other people's money, and tenants' rent to build wealth",
            "5 channels work simultaneously: cashflow, appreciation, principal paydown, tax benefits, and leverage",
            "Rates, prices, and market timing are not reasons to wait",
            "The myths holding people back are excuses disguised as logic",
            "The best time to start was 10 years ago. The second best time is now.",
          ],
        },
        {
          type: "callout",
          tone: "gold",
          body: "Up next — the Module 1 quiz. Five questions to lock in the why behind real estate.",
        },
      ],
      quiz: [],
    },

    /* ==================== MODULE 1 QUIZ ==================== */
    {
      slug: "module-1-quiz",
      number: 6,
      moduleNumber: 1,
      moduleTitle: "Why real estate? And why now?",
      moduleLessonNumber: 5,
      kind: "module-quiz",
      title: "Module 1 Quiz",
      description:
        "Five questions on why real estate works, marrying the house, leverage, the financing reality, and waiting for the right time.",
      duration: "5 min",
      sections: [],
      quiz: [
        {
          question:
            "What makes real estate unique compared to other investments like stocks or crypto?",
          options: [
            "It's the only investment that never loses value",
            "It builds wealth through 5 channels simultaneously — cashflow, appreciation, principal paydown, tax benefits, and leverage",
            "It requires no money to get started",
            "It's completely passive with no management required",
          ],
          correctIndex: 1,
          explanation:
            "No other asset class generates monthly income, appreciates over time, gets paid off by someone else, provides tax advantages, and amplifies returns through leverage — all at the same time.",
        },
        {
          question: "What does \"marry the house, date the rate\" mean?",
          options: [
            "Always buy the cheapest house you can find",
            "Buy the right property now and refinance to a lower rate later if rates drop",
            "Only invest when interest rates are below 4%",
            "Rates don't matter in real estate",
          ],
          correctIndex: 1,
          explanation:
            "The property you buy is permanent — the interest rate is not. If you find the right deal at today's rates, you can always refinance later. You can't go back and buy at today's price if prices keep rising.",
        },
        {
          question: "What is leverage in real estate?",
          options: [
            "Borrowing money from friends and family",
            "Controlling a large asset with a small amount of your own money — amplifying your returns",
            "Buying multiple properties at the same time",
            "Using credit cards to fund renovations",
          ],
          correctIndex: 1,
          explanation:
            "When you put 5% down on a $300,000 property, you're controlling $300,000 with $15,000. If the property appreciates 3%, that's $9,000 of gain on $15,000 invested — a 60% return on your cash from appreciation alone.",
        },
        {
          question:
            "How much money do you actually need to get started in real estate?",
          options: [
            "At least $100,000",
            "At least $50,000",
            "As little as 3.5% down with an FHA loan — or 0% with a VA loan",
            "Real estate requires no money at all",
          ],
          correctIndex: 2,
          explanation:
            "Owner-occupied financing through FHA (3.5%), conventional (3–5%), or VA (0%) makes real estate accessible with far less cash than most people think.",
        },
        {
          question:
            "What is the biggest risk of waiting for the \"right time\" to invest?",
          options: [
            "Interest rates might go up",
            "You'll miss the bottom of the market",
            "Every year you wait, you lose the compounding effects of equity, appreciation, and cashflow — and prices are likely higher when you finally start",
            "There is no risk to waiting",
          ],
          correctIndex: 2,
          explanation:
            "Time in the market beats timing the market. The compounding effects of ownership start the day you buy. Every year you wait is a year of lost compounding.",
        },
      ],
    },

    /* ====================================================================
     * MODULE 2 — THE STRATEGIES
     * ==================================================================*/
    {
      slug: "house-hacking",
      number: 7,
      moduleNumber: 2,
      moduleTitle: "Every way to invest in residential real estate",
      moduleLessonNumber: 1,
      title: "House hacking",
      description:
        "Buy a property, live in part of it, rent out the rest. The best first move for most people.",
      duration: "6 min",
      sections: [
        {
          type: "paragraph",
          content:
            "Before we dive into each strategy, a quick note: there's no single \"best\" strategy. Each one has trade-offs. The right one depends on your capital, your time, your risk tolerance, and your goals. We'll cover how to choose in Module 3 — for now, just understand what each strategy is and how it works.",
        },
        {
          type: "card",
          tone: "charcoal",
          eyebrow: "Strategy 1 of 8",
          title: "House hacking",
          paragraphs: [
            "Buy a property, live in part of it, rent out the rest.",
          ],
        },
        {
          type: "paragraph",
          content:
            "You purchase a home with owner-occupied financing (3.5–5% down), live in it, and rent out spare bedrooms, a basement unit, or additional units in a multifamily property. Your tenants offset or eliminate your housing costs.",
        },
        {
          type: "card",
          eyebrow: "Cash to close on a $300K property",
          bullets: [
            "FHA down payment: $10,500",
            "Closing costs (~3%): $9,000",
            "Total cash to close: $19,500",
          ],
          paragraphs: [
            "Seller concessions can often cover part or all of your closing costs — FHA allows up to 6%. On $300K, that's up to $18,000 the seller could cover. An investor-friendly agent knows how to negotiate this for you.",
          ],
        },
        {
          type: "compare",
          items: [
            { eyebrow: "Capital", title: "Low", paragraphs: ["3.5% FHA, 0% VA"] },
            { eyebrow: "Time", title: "Low–moderate", paragraphs: ["Depends on type"] },
            { eyebrow: "Risk", title: "Low", paragraphs: ["You need a place to live anyway"] },
            { eyebrow: "Return", title: "Moderate", paragraphs: ["Reduced housing + equity"] },
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "The honest take",
          paragraphs: [
            "House hacking is the best first move in real estate for most people. The financing advantage alone makes it worth it. You're going to pay for housing anyway — you might as well build wealth while you do it.",
            "If this strategy interests you, House Hacking 101 covers everything in detail — financing, property selection, numbers, operations, and exit strategies.",
          ],
        },
        {
          type: "key-takeaway",
          title: "House hacking — the best first move for most people",
          body: "Live in it, rent out the rest. 3.5% down with FHA. Lowest barrier to entry. Best for first-time investors and anyone currently paying rent.",
        },
      ],
      quiz: [],
    },

    {
      slug: "traditional-rental",
      number: 8,
      moduleNumber: 2,
      moduleTitle: "Every way to invest in residential real estate",
      moduleLessonNumber: 2,
      title: "Traditional long-term rental",
      description:
        "Buy a property, rent it on a 12-month lease, hold it. Simple, proven, often thin on cashflow today.",
      duration: "5 min",
      sections: [
        {
          type: "card",
          tone: "charcoal",
          eyebrow: "Strategy 2 of 8",
          title: "Traditional long-term rental",
          paragraphs: [
            "Buy a property and rent it to a tenant on a 12-month lease.",
          ],
        },
        {
          type: "paragraph",
          content:
            "You purchase a single family home or small multifamily, find a tenant, sign a lease, and collect rent every month. The tenant handles their own living situation — you handle the property.",
        },
        {
          type: "compare",
          items: [
            { eyebrow: "Capital", title: "High", paragraphs: ["20–25% down typical"] },
            { eyebrow: "Time", title: "Low", paragraphs: ["Mostly passive once placed"] },
            { eyebrow: "Risk", title: "Moderate", paragraphs: ["1 tenant = 1 income stream"] },
            { eyebrow: "Return", title: "Moderate", paragraphs: ["Cashflow often thin"] },
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "The honest take",
          paragraphs: [
            "Traditional long-term rentals are the strategy most people think of when they hear \"real estate investing.\" They're simple, proven, and relatively passive.",
            "But in today's market — with elevated prices and interest rates — many single family rentals don't cashflow. You may be relying on appreciation and principal paydown rather than monthly income. The math works best when you buy right and hold long.",
          ],
        },
        {
          type: "key-takeaway",
          title: "Buy it. Rent it. Hold it.",
          body: "20–25% down. Simple and passive. Cashflow is often thin in today's market — wealth is built through appreciation and principal paydown over time.",
        },
      ],
      quiz: [],
    },

    {
      slug: "coliving-strategy",
      number: 9,
      moduleNumber: 2,
      moduleTitle: "Every way to invest in residential real estate",
      moduleLessonNumber: 3,
      title: "Coliving",
      description:
        "Rent-by-the-room. 6–10 income streams from one property. 2–3x the revenue of a traditional rental.",
      duration: "6 min",
      sections: [
        {
          type: "card",
          tone: "charcoal",
          eyebrow: "Strategy 3 of 8",
          title: "Coliving",
          paragraphs: [
            "Rent-by-the-room in a larger shared home. Each resident signs their own individual lease.",
          ],
        },
        {
          type: "paragraph",
          content:
            "You purchase a single family home (or lease one), convert additional spaces into bedrooms, furnish each room, and rent them individually. Instead of one tenant paying $2,000/month, you have 6–10 residents paying $750–$1,000 each.",
        },
        {
          type: "compare",
          items: [
            { eyebrow: "Capital", title: "Moderate–high", paragraphs: ["20% down + reno + furnish"] },
            { eyebrow: "Time", title: "Moderate", paragraphs: ["More than rental, less than STR"] },
            { eyebrow: "Risk", title: "Low–moderate", paragraphs: ["Multiple income streams"] },
            { eyebrow: "Return", title: "High", paragraphs: ["2–3x traditional rental"] },
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "The honest take",
          paragraphs: [
            "Coliving is one of the most powerful strategies in today's market. It solves the cashflow problem that traditional rentals can't — by generating multiple income streams from a single property. It also solves a real housing problem — providing affordable, quality housing for working adults who can't afford to rent alone.",
            "The trade-off is operational complexity. You're managing 6–10 individual residents instead of one tenant. But the cashflow and risk diversification make it worth it for operators who are willing to build systems.",
            "If this strategy interests you, Coliving 101 covers the entire model — math, property selection, setup, and operations.",
          ],
        },
        {
          type: "key-takeaway",
          title: "2–3x revenue. Solves cashflow AND affordability.",
          body: "Rent-by-the-room with individual leases. 6–10 income streams per property. More operational than a traditional rental, but the cashflow is dramatically stronger.",
        },
      ],
      quiz: [],
    },

    {
      slug: "short-term-rental",
      number: 10,
      moduleNumber: 2,
      moduleTitle: "Every way to invest in residential real estate",
      moduleLessonNumber: 4,
      title: "Short-term rental (Airbnb)",
      description:
        "Highest per-night revenue. Highest operational load. Heavy regulatory risk — check local STR laws first.",
      duration: "6 min",
      sections: [
        {
          type: "card",
          tone: "charcoal",
          eyebrow: "Strategy 4 of 8",
          title: "Short-term rental (Airbnb)",
          paragraphs: [
            "Rent a property (or rooms) on a nightly or weekly basis to short-term guests.",
          ],
        },
        {
          type: "paragraph",
          content:
            "You furnish and list a property on platforms like Airbnb or VRBO. Guests book stays of 1–30 days. You handle turnover, cleaning, guest communication, and pricing between each stay.",
        },
        {
          type: "compare",
          items: [
            { eyebrow: "Capital", title: "Moderate–high", paragraphs: ["20% down + furnish + setup"] },
            { eyebrow: "Time", title: "High", paragraphs: ["Constant turnover, comms, pricing"] },
            { eyebrow: "Risk", title: "Moderate–high", paragraphs: ["Seasonal + regulatory"] },
            { eyebrow: "Return", title: "High", paragraphs: ["Highest per-night revenue"] },
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "The honest take",
          paragraphs: [
            "Short-term rentals can generate incredible income — when they work. The problem is that they don't always work. Income is seasonal. Occupancy fluctuates. And the regulatory landscape is changing fast — many cities are restricting or outright banning short-term rentals.",
            "Before going this route, research your local STR regulations thoroughly. A property that generates $5,000/month on Airbnb is worth nothing if the city shuts you down.",
          ],
        },
        {
          type: "callout",
          tone: "gold",
          body: "This is a hospitality business, not a passive investment. Cleaning between guests, managing reviews, adjusting pricing, handling guest issues — the operational load is real.",
        },
        {
          type: "key-takeaway",
          title: "Highest revenue. Highest operational load.",
          body: "Seasonal and inconsistent income. Heavy operational load. Heavy regulatory risk — check local STR laws first. Best in high-tourism / high-demand areas.",
        },
      ],
      quiz: [],
    },

    {
      slug: "brrrr",
      number: 11,
      moduleNumber: 2,
      moduleTitle: "Every way to invest in residential real estate",
      moduleLessonNumber: 5,
      title: "BRRRR",
      description:
        "Buy, Rehab, Rent, Refinance, Repeat. Pull your cash back out and recycle it. Powerful — and not for beginners.",
      duration: "6 min",
      sections: [
        {
          type: "card",
          tone: "charcoal",
          eyebrow: "Strategy 5 of 8",
          title: "BRRRR",
          paragraphs: [
            "Buy, Rehab, Rent, Refinance, Repeat.",
          ],
        },
        {
          type: "paragraph",
          content:
            "You buy a distressed property below market value, renovate it to increase its value, rent it out to stabilize the income, refinance based on the new (higher) appraised value to pull your cash back out, and use that cash to do it again.",
        },
        {
          type: "compare",
          items: [
            { eyebrow: "Capital", title: "Moderate", paragraphs: ["Cash or hard money for the buy + rehab"] },
            { eyebrow: "Time", title: "High", paragraphs: ["Especially during rehab"] },
            { eyebrow: "Risk", title: "Moderate–high", paragraphs: ["Reno, appraisal, refi all have to land"] },
            { eyebrow: "Return", title: "High", paragraphs: ["When executed well"] },
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "The honest take",
          paragraphs: [
            "BRRRR is a powerful strategy — but it's not for beginners. The execution risk is real. Renovation budgets blow up. Timelines stretch. Appraisals come in low. Refinance terms change.",
            "When it works, it's magic — you own a cash-flowing property with almost none of your own money left in it. When it doesn't work, you're stuck with a property that cost more than planned and an appraisal that doesn't support the refinance you were counting on.",
            "If you're interested in BRRRR, get experience first. House hack, buy a traditional rental, learn renovation on a smaller scale — then graduate to BRRRR when you have the skills and the relationships to execute.",
          ],
        },
        {
          type: "key-takeaway",
          title: "High return potential. Not for beginners.",
          body: "Goal: pull your cash out and recycle it. Three things have to go right — renovation, appraisal, and refinance. Get experience first.",
        },
      ],
      quiz: [],
    },

    {
      slug: "fix-and-flip",
      number: 12,
      moduleNumber: 2,
      moduleTitle: "Every way to invest in residential real estate",
      moduleLessonNumber: 6,
      title: "Fix & flip",
      description:
        "Buy, renovate, sell. Lump-sum profits — but it's a job, not passive income. Best used to fund buy-and-hold strategies.",
      duration: "6 min",
      sections: [
        {
          type: "card",
          tone: "charcoal",
          eyebrow: "Strategy 6 of 8",
          title: "Fix & flip",
          paragraphs: [
            "Buy a distressed property, renovate it, and sell it for a profit.",
          ],
        },
        {
          type: "paragraph",
          content:
            "You purchase a property below market value, renovate it to increase its value, and sell it at the new higher price. Your profit is the difference between your all-in cost (purchase + renovation + holding costs + selling costs) and the sale price.",
        },
        {
          type: "compare",
          items: [
            { eyebrow: "Capital", title: "High", paragraphs: ["Buy + reno + holding"] },
            { eyebrow: "Time", title: "Very high", paragraphs: ["Active project mgmt throughout"] },
            { eyebrow: "Risk", title: "High", paragraphs: ["Market, reno, timeline, selling"] },
            { eyebrow: "Return", title: "High per deal", paragraphs: ["But it's a job, not passive"] },
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "The honest take",
          paragraphs: [
            "Fix and flip gets all the TV attention. It looks exciting. And the profits can be real — $30,000, $50,000, $100,000+ on a single deal.",
            "But it's not investing. It's a job. When you stop flipping, the income stops. There's no cashflow, no appreciation, no principal paydown — just a lump sum when you sell. And you pay short-term capital gains tax on the profit, which takes a bigger bite than you'd expect.",
            "Flipping can be a great way to generate capital for other strategies — buy-and-hold rentals, coliving, or your next house hack. But building a business entirely on flipping means you're always one deal away from your last paycheck.",
          ],
        },
        {
          type: "key-takeaway",
          title: "It's a job — not passive income",
          body: "High per-deal returns. No cashflow, no appreciation, no passive income. Short-term capital gains tax. Best used to generate capital for buy-and-hold strategies.",
        },
      ],
      quiz: [],
    },

    {
      slug: "lease-arbitrage",
      number: 13,
      moduleNumber: 2,
      moduleTitle: "Every way to invest in residential real estate",
      moduleLessonNumber: 7,
      title: "Lease arbitrage",
      description:
        "Lease a property, sublease the rooms. Cashflow without ownership. Best as a stepping stone to acquisition.",
      duration: "5 min",
      sections: [
        {
          type: "card",
          tone: "charcoal",
          eyebrow: "Strategy 7 of 8",
          title: "Lease arbitrage",
          paragraphs: [
            "Lease a property from the owner, then sublease it (rooms or the whole unit) for more than you pay in rent.",
          ],
        },
        {
          type: "paragraph",
          content:
            "You sign a master lease on a property — typically a single family home — at a set monthly rent. Then you furnish it and rent out the rooms individually at a higher total rate. The difference between what you pay the owner and what you collect from residents is your profit.",
        },
        {
          type: "compare",
          items: [
            { eyebrow: "Capital", title: "Low", paragraphs: ["No down payment, no mortgage"] },
            { eyebrow: "Time", title: "Moderate", paragraphs: ["Similar to coliving"] },
            { eyebrow: "Risk", title: "Moderate", paragraphs: ["You owe rent regardless"] },
            { eyebrow: "Return", title: "Moderate", paragraphs: ["Cashflow without ownership"] },
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "The honest take",
          paragraphs: [
            "Lease arbitrage is a great way to get into coliving with minimal capital. No mortgage, no down payment, no closing costs. You can be operational in weeks instead of months.",
            "The downside: you're paying someone else's mortgage. You build cashflow but not equity. And you're dependent on the property owner continuing to lease to you — if they decide to sell or not renew, your business is disrupted.",
            "Arbitrage works best as a stepping stone — learn the model, generate cashflow, and use that income and experience to fund an acquisition when you're ready.",
          ],
        },
        {
          type: "key-takeaway",
          title: "Cashflow without ownership",
          body: "Lease a property, sublease the rooms. Low capital — no mortgage, no down payment. You build cashflow but not equity. Best as a stepping stone to acquisition.",
        },
      ],
      quiz: [],
    },

    {
      slug: "passive-investing",
      number: 14,
      moduleNumber: 2,
      moduleTitle: "Every way to invest in residential real estate",
      moduleLessonNumber: 8,
      title: "Passive investing",
      description:
        "You bring the capital. Someone else does everything. Returns depend entirely on the operator.",
      duration: "5 min",
      sections: [
        {
          type: "card",
          tone: "charcoal",
          eyebrow: "Strategy 8 of 8",
          title: "Passive investing",
          paragraphs: [
            "You invest capital with an active operator or in a fund. Someone else does the work. You earn returns.",
          ],
        },
        {
          type: "paragraph",
          content:
            "You partner with an experienced operator who sources, acquires, renovates, and manages properties. You provide capital — typically as a private money loan, equity partner, or fund investor. You earn returns based on the deal structure — interest payments, profit splits, or preferred returns.",
        },
        {
          type: "compare",
          items: [
            { eyebrow: "Capital", title: "Varies", paragraphs: ["Some at $25–50K, funds at $100K+"] },
            { eyebrow: "Time", title: "None", paragraphs: ["That's the point"] },
            { eyebrow: "Risk", title: "Moderate", paragraphs: ["Depends on the operator"] },
            { eyebrow: "Return", title: "Moderate", paragraphs: ["Typically 8–15% annually"] },
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "The honest take",
          paragraphs: [
            "Passive investing is real estate without the work. No tenants, no maintenance, no midnight calls. You write a check and someone else does the rest.",
            "The risk is in the operator. A great operator makes you money consistently. A bad operator loses your money. Due diligence on the person you're investing with is the most important step — more important than the deal itself.",
            "If passive investing interests you and you want to partner with an active operator in the Atlanta coliving market, that's something we should talk about.",
          ],
        },
        {
          type: "key-takeaway",
          title: "Due diligence on the OPERATOR is everything",
          body: "You invest capital, someone else operates. No tenants, no maintenance, no work. Returns depend on the operator. Best for capital-rich, time-poor investors.",
        },
        { type: "heading", content: "Module 2 recap" },
        {
          type: "bullets",
          items: [
            "8 residential strategies — each with different capital, time, risk, and return profiles",
            "House hacking is the best first move for most people",
            "Coliving solves the cashflow problem traditional rentals can't",
            "STRs generate high revenue but carry regulatory and operational risk",
            "BRRRR and flipping are powerful but not for beginners",
            "Arbitrage is a low-capital entry point",
            "Passive investing trades control for convenience",
          ],
        },
        {
          type: "callout",
          tone: "gold",
          body: "Up next — the Module 2 quiz. Five questions on the strategies.",
        },
      ],
      quiz: [],
    },

    /* ==================== MODULE 2 QUIZ ==================== */
    {
      slug: "module-2-quiz",
      number: 15,
      moduleNumber: 2,
      moduleTitle: "Every way to invest in residential real estate",
      moduleLessonNumber: 9,
      kind: "module-quiz",
      title: "Module 2 Quiz",
      description:
        "Five questions on capital requirements, what coliving does that traditional rentals can't, why flipping is a job, passive risk, and the stepping-stone strategy.",
      duration: "5 min",
      sections: [],
      quiz: [
        {
          question: "Which strategy requires the least capital to get started?",
          options: [
            "Traditional long-term rental",
            "BRRRR",
            "House hacking (FHA 3.5% down) or lease arbitrage (no mortgage)",
            "Fix & flip",
          ],
          correctIndex: 2,
          explanation:
            "House hacking with FHA requires just 3.5% down, and lease arbitrage requires no mortgage at all — just first month's rent, deposit, and furnishing.",
        },
        {
          question: "What is the key difference between coliving and a traditional rental?",
          options: [
            "Coliving properties are always newer construction",
            "Coliving rents rooms individually with separate leases, generating multiple income streams from one property",
            "Traditional rentals generate more income",
            "There is no difference — they're the same strategy",
          ],
          correctIndex: 1,
          explanation:
            "Coliving generates 6–10 individual income streams from one property instead of one. That's what makes the cashflow and risk diversification so much stronger than a traditional single-tenant rental.",
        },
        {
          question: "Why is fix & flip considered a job rather than an investment?",
          options: [
            "Because it requires a real estate license",
            "Because when you stop flipping, the income stops — there's no ongoing cashflow, appreciation, or principal paydown",
            "Because it's illegal in some states",
            "Because flippers don't make money",
          ],
          correctIndex: 1,
          explanation:
            "Flipping generates lump-sum profits — but no passive income. When you stop, the money stops. Compare that to a buy-and-hold rental that generates cashflow, appreciation, and equity every month whether you're working or not.",
        },
        {
          question: "What is the biggest risk in passive real estate investing?",
          options: [
            "Interest rates",
            "Property taxes",
            "The operator — your returns depend entirely on their performance and integrity",
            "The location of the property",
          ],
          correctIndex: 2,
          explanation:
            "In passive investing, you're betting on the person, not just the deal. Due diligence on the operator — their track record, their transparency, their experience — is the most important step you'll take.",
        },
        {
          question: "Which strategy is best described as \"a stepping stone to acquisition\"?",
          options: ["Fix & flip", "BRRRR", "Lease arbitrage", "Passive investing"],
          correctIndex: 2,
          explanation:
            "Lease arbitrage lets you learn the coliving model, generate cashflow, and gain experience — all without buying a property. It's a great stepping stone to acquisition when you're ready.",
        },
      ],
    },

    /* ====================================================================
     * MODULE 3 — WHICH STRATEGY FITS YOUR LIFE?
     * ==================================================================*/
    {
      slug: "four-decision-factors",
      number: 16,
      moduleNumber: 3,
      moduleTitle: "Which strategy fits your life?",
      moduleLessonNumber: 1,
      title: "The four decision factors",
      description:
        "Capital, time, risk tolerance, goals. Be honest about all four and the right strategy reveals itself.",
      duration: "8 min",
      sections: [
        {
          type: "paragraph",
          content:
            "There is no universally best real estate strategy. There's only the best strategy for you — right now, with the capital you have, the time you can commit, the risk you can tolerate, and the goals you're working toward.",
        },
        {
          type: "paragraph",
          content:
            "Here's how to think through it.",
        },
        {
          type: "card",
          eyebrow: "Factor 1",
          title: "Capital — how much do you have to invest?",
          paragraphs: [
            "Be honest about this number. Not how much you'd like to have. Not how much you'll have in a year. How much do you have right now that you can put toward real estate without putting yourself in a dangerous financial position?",
          ],
          bullets: [
            "Under $15K → House hacking (FHA) or lease arbitrage",
            "$15K–$50K → House hacking, arbitrage, or passive investing",
            "$50K–$100K → All strategies accessible",
            "$100K+ → Full flexibility — acquisition, BRRRR, multifamily, passive",
          ],
        },
        {
          type: "paragraph",
          content:
            "Capital doesn't determine whether you can invest. It determines which strategy you start with.",
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Factor 2",
          title: "Time — how many hours can you realistically commit?",
          paragraphs: [
            "Real estate is not fully passive — at least not at the beginning. Different strategies require very different time commitments. Be honest about what your life actually allows right now.",
          ],
          bullets: [
            "Less than 2 hrs/week → Passive investing",
            "2–5 hrs/week → Traditional rental or house hacking (steady state)",
            "5–15 hrs/week → Coliving, arbitrage, or house hacking (during launch)",
            "15+ hrs/week → BRRRR, fix & flip, or STR",
          ],
        },
        {
          type: "paragraph",
          content:
            "The strategies that generate the highest returns typically require the most time — especially at the beginning. That's the trade-off. Choose one that fits the life you actually have, not the life you wish you had.",
        },
        {
          type: "card",
          eyebrow: "Factor 3",
          title: "Risk tolerance — how much uncertainty can you handle?",
          paragraphs: [
            "Every investment carries risk. But some strategies carry more than others — and your personal comfort with risk should guide your choice.",
          ],
          bullets: [
            "Low risk tolerance → House hacking (you need a place to live anyway)",
            "Moderate → Traditional rental, coliving, passive investing",
            "Higher → BRRRR, arbitrage, STR",
            "Highest → Fix & flip",
          ],
        },
        {
          type: "paragraph",
          content:
            "There's no shame in being risk-averse. A house hack with an FHA loan is one of the lowest-risk investments you can make — you need a place to live regardless, and someone else is paying most of your mortgage. That's not timid. That's smart.",
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Factor 4 — the one most people skip",
          title: "Goals — what are you actually trying to accomplish?",
          bullets: [
            "\"I want to reduce my housing costs\" → house hacking",
            "\"I want monthly cashflow\" → coliving, traditional rental, arbitrage",
            "\"I want to build long-term equity and wealth\" → house hacking, traditional rental, coliving, BRRRR",
            "\"I want a lump sum of cash to fund my next move\" → fix & flip",
            "\"I want passive returns without operating\" → passive investing",
            "\"I want to build a real estate business\" → coliving, BRRRR, arbitrage",
            "\"I want to test real estate before going all in\" → house hacking or arbitrage",
          ],
          paragraphs: [
            "Your goal determines your strategy — not the other way around.",
          ],
        },
        {
          type: "key-takeaway",
          title: "Be honest about all four. The right strategy fits your life as it is.",
          body: "1) Capital — how much can you invest? 2) Time — how many hours can you commit? 3) Risk — how much uncertainty can you handle? 4) Goals — what are you actually trying to accomplish? Not as you wish your life were — as it is right now.",
        },
      ],
      quiz: [],
    },

    {
      slug: "decision-matrix",
      number: 17,
      moduleNumber: 3,
      moduleTitle: "Which strategy fits your life?",
      moduleLessonNumber: 2,
      title: "The decision matrix",
      description:
        "Every strategy mapped against capital, time, risk, and the situation it best fits. Find yours.",
      duration: "5 min",
      sections: [
        {
          type: "paragraph",
          content:
            "Here's every strategy mapped against the four factors — so you can see them all side by side.",
        },
        {
          type: "card",
          eyebrow: "House hacking",
          bullets: [
            "Capital: Low (3.5% FHA)",
            "Time: Low–moderate",
            "Risk: Low",
            "Best for: Best first move for most people",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Traditional rental",
          bullets: [
            "Capital: High (20%+)",
            "Time: Low",
            "Risk: Moderate",
            "Best for: Simplicity, long-term wealth",
          ],
        },
        {
          type: "card",
          eyebrow: "Coliving",
          bullets: [
            "Capital: Moderate–high",
            "Time: Moderate",
            "Risk: Low–moderate",
            "Best for: Strong cashflow, impact",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Short-term rental",
          bullets: [
            "Capital: Moderate–high",
            "Time: High",
            "Risk: Moderate–high",
            "Best for: High-tourism areas, active operators",
          ],
        },
        {
          type: "card",
          eyebrow: "BRRRR",
          bullets: [
            "Capital: Moderate",
            "Time: High",
            "Risk: Moderate–high",
            "Best for: Scaling quickly with recycled capital",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Fix & flip",
          bullets: [
            "Capital: High",
            "Time: Very high",
            "Risk: High",
            "Best for: Generating lump-sum capital",
          ],
        },
        {
          type: "card",
          eyebrow: "Lease arbitrage",
          bullets: [
            "Capital: Low",
            "Time: Moderate",
            "Risk: Moderate",
            "Best for: Testing coliving without buying",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Passive investing",
          bullets: [
            "Capital: Varies",
            "Time: None",
            "Risk: Moderate",
            "Best for: Capital-rich, time-poor",
          ],
        },
        { type: "heading", content: "Reading the matrix" },
        {
          type: "bullets",
          items: [
            "Low capital and low time → house hacking is your answer",
            "Moderate capital and want strong cashflow → coliving",
            "High capital but no time → passive investing",
            "Experience and want to scale fast → BRRRR",
            "Need a lump sum to fund your next strategy → one flip, then buy and hold",
          ],
        },
        {
          type: "key-takeaway",
          title: "Find your situation. Pick your strategy.",
          body: "Low capital, first deal → house hacking. Want cashflow → coliving. Want simplicity → traditional rental. Have capital, no time → passive investing. Want to test → arbitrage. Want to scale fast → BRRRR. Need capital → one flip.",
        },
      ],
      quiz: [],
    },

    {
      slug: "strategy-stacking",
      number: 18,
      moduleNumber: 3,
      moduleTitle: "Which strategy fits your life?",
      moduleLessonNumber: 3,
      title: "Strategy stacking — combining strategies over time",
      description:
        "The best investors don't pick one strategy. They stack them. Each one funds the next.",
      duration: "7 min",
      sections: [
        {
          type: "card",
          tone: "charcoal",
          title: "You don't have to pick one strategy and stick with it forever.",
          paragraphs: [
            "The most successful real estate investors stack strategies over time — using each one to fund, enable, or accelerate the next.",
          ],
        },
        {
          type: "card",
          eyebrow: "Stack #1",
          title: "House hacker → coliving operator",
          bullets: [
            "Year 1: House hack — FHA, 3.5% down, rent out spare rooms",
            "Year 2: Move out, convert to full rental or coliving, house hack again",
            "Year 3: Now you own 2 properties. First one is cashflowing. Second one's mortgage is covered by tenants.",
            "Year 4: Use equity from property #1 to fund a coliving acquisition",
            "Year 5: 3 properties, 15+ rooms, $3,000+/month in cashflow",
          ],
          paragraphs: [
            "Started with $12,000. Built a portfolio worth $900,000+ in 5 years.",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Stack #2",
          title: "Flipper → buy-and-hold investor",
          bullets: [
            "Year 1: Flip a property — net $40,000 profit",
            "Year 2: Use $40,000 as down payment on a coliving property",
            "Year 3: Coliving property cashflows $1,200/month",
            "Year 4: Flip another property — use profits for property #2",
            "Year 5: 2 cashflowing properties funded entirely by flipping profits",
          ],
          paragraphs: [
            "Used active income (flipping) to build passive income (buy and hold).",
          ],
        },
        {
          type: "card",
          eyebrow: "Stack #3",
          title: "Passive → active transition",
          bullets: [
            "Year 1: Invest $50,000 passively with an experienced operator — learn from the inside",
            "Year 2: Earn returns, study the operator's process, build confidence",
            "Year 3: Use passive returns + savings to house hack your first property",
            "Year 4: Transition from passive investor to active operator with real experience",
          ],
          paragraphs: [
            "Used someone else's expertise to get educated before going active.",
          ],
        },
        {
          type: "fascination",
          body: "The best investors don't pick one strategy. They stack them. House hack → coliving → acquisition. Flip → buy and hold → scale. Passive → education → active. Each strategy funds the next. Each deal builds on the last.",
        },
        {
          type: "key-takeaway",
          title: "Your first strategy doesn't have to be your last",
          body: "Start with what fits your life now. Use what you build — cashflow, equity, experience, capital — to fund your next move. The best portfolios aren't built with one strategy. They're built by stacking them over time.",
        },
        { type: "heading", content: "Module 3 recap" },
        {
          type: "bullets",
          items: [
            "Four factors determine your right strategy: capital, time, risk, and goals",
            "The decision matrix maps every strategy against these factors",
            "There's a strategy for every situation — whatever your life looks like",
            "Strategy stacking lets you use each move to fund and enable the next",
            "Your first strategy doesn't have to be your last — start where you are",
          ],
        },
        {
          type: "callout",
          tone: "gold",
          body: "Up next — the Module 3 quiz. Five questions on choosing your strategy.",
        },
      ],
      quiz: [],
    },

    /* ==================== MODULE 3 QUIZ ==================== */
    {
      slug: "module-3-quiz",
      number: 19,
      moduleNumber: 3,
      moduleTitle: "Which strategy fits your life?",
      moduleLessonNumber: 4,
      kind: "module-quiz",
      title: "Module 3 Quiz",
      description:
        "Five questions on the four decision factors, picking strategies for different situations, and what stacking means.",
      duration: "5 min",
      sections: [],
      quiz: [
        {
          question:
            "What are the four factors that determine which real estate strategy is right for you?",
          options: [
            "Location, property type, tenant quality, and market timing",
            "Capital, time, risk tolerance, and goals",
            "Credit score, income, savings, and age",
            "Interest rates, home prices, inventory, and competition",
          ],
          correctIndex: 1,
          explanation:
            "Your available capital, the time you can commit, your comfort with risk, and what you're actually trying to accomplish — these four factors point you to the right strategy for your life right now.",
        },
        {
          question:
            "You have limited capital ($10,000) and want to get started as soon as possible. Which strategy is your best first move?",
          options: ["Fix & flip", "BRRRR", "House hacking with an FHA loan", "Passive investing"],
          correctIndex: 2,
          explanation:
            "FHA requires just 3.5% down — on a $280,000 property that's about $10,000. House hacking is the most accessible entry point for people with limited capital.",
        },
        {
          question:
            "You have $75,000 in capital but work 60 hours a week and have no time for property management. Which strategy fits best?",
          options: ["Short-term rental", "Fix & flip", "Passive investing", "Coliving"],
          correctIndex: 2,
          explanation:
            "Passive investing lets you put capital to work without any operational involvement. You invest with an experienced operator and earn returns without managing tenants, maintenance, or day-to-day operations.",
        },
        {
          question: "What is \"strategy stacking\"?",
          options: [
            "Buying multiple properties on the same day",
            "Using one strategy to fund, enable, or accelerate the next — building your portfolio over time",
            "Only investing in one strategy forever",
            "Combining all 8 strategies into a single property",
          ],
          correctIndex: 1,
          explanation:
            "The best investors don't pick one strategy and stop. They start where they are, build equity and experience, and use what they've built to fund their next move. Each strategy enables the next.",
        },
        {
          question:
            "Your goal is strong monthly cashflow from day one. Which strategy is best suited for that?",
          options: [
            "Fix & flip",
            "Traditional long-term rental",
            "Coliving",
            "Passive investing",
          ],
          correctIndex: 2,
          explanation:
            "Coliving generates 2–3x the revenue of a traditional rental on the same property — making it one of the strongest cashflow strategies available in today's market.",
        },
      ],
    },

    /* ====================================================================
     * MODULE 4 — THE FUNDAMENTALS
     * ==================================================================*/
    {
      slug: "three-questions",
      number: 20,
      moduleNumber: 4,
      moduleTitle: "The fundamentals every investor needs to know",
      moduleLessonNumber: 1,
      title: "How to evaluate any deal — the 3 questions",
      description:
        "Cost to get in. What it earns. Cost to operate. Master these three and you can evaluate any deal in any market.",
      duration: "6 min",
      sections: [
        {
          type: "paragraph",
          content:
            "Every real estate deal — no matter the strategy — comes down to three questions. If you can answer these three questions clearly, you can evaluate any deal in any market.",
        },
        {
          type: "card",
          eyebrow: "Question 1",
          title: "What does it cost to get in?",
          paragraphs: [
            "This is your total cash invested — everything you need to spend before the property generates a single dollar of income.",
          ],
          bullets: [
            "Down payment",
            "Closing costs (~3% — though seller concessions can often cover part or all, especially with FHA)",
            "Renovation (if any)",
            "Furnishing (if applicable)",
            "Any other upfront costs",
          ],
        },
        {
          type: "paragraph",
          content:
            "This number tells you whether the deal is accessible to you right now — and it's the denominator in your return calculations. The lower your cash in, the higher your return on every dollar you invested.",
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Question 2",
          title: "What does it earn?",
          paragraphs: [
            "This is your income — the money the property generates each month.",
          ],
          bullets: [
            "Rental income (by room, by unit, or whole-house)",
            "Adjusted for realistic occupancy (85% for coliving, factor vacancy for traditional)",
            "Any other income sources",
          ],
        },
        {
          type: "paragraph",
          content:
            "This is your top line. It's the starting point — but it's not what you keep. That's determined by question 3.",
        },
        {
          type: "card",
          eyebrow: "Question 3",
          title: "What does it cost to operate?",
          paragraphs: [
            "This is everything that comes out of your income each month.",
          ],
          bullets: [
            "Mortgage payment",
            "Property taxes",
            "Insurance",
            "Utilities (if you're covering them)",
            "Mortgage insurance (if less than 20% down)",
            "Platform fees (PadSplit, Airbnb, etc.)",
            "Maintenance reserve",
            "Vacancy allowance",
            "Property management (if hiring one)",
          ],
        },
        {
          type: "paragraph",
          content:
            "What's left after all operating costs is your net cashflow — the money that actually hits your bank account.",
        },
        {
          type: "card",
          tone: "charcoal",
          title: "That's it. Three questions.",
          paragraphs: [
            "Earn − Operate = Cashflow. Cashflow ÷ Cost to get in = Your return. Every spreadsheet, every calculator, every underwriting template in the world is just a fancy way of answering these three questions.",
          ],
        },
        {
          type: "key-takeaway",
          title: "Three questions evaluate any deal in any market",
          body: "1) What does it cost to get in? (total cash invested) 2) What does it earn? (income at realistic occupancy) 3) What does it cost to operate? (all monthly expenses) Earn − Operate = Cashflow. Cashflow ÷ Cost to get in = Your return.",
        },
      ],
      quiz: [],
    },

    {
      slug: "cashflow-and-coc",
      number: 21,
      moduleNumber: 4,
      moduleTitle: "The fundamentals every investor needs to know",
      moduleLessonNumber: 2,
      title: "Net cashflow & cash-on-cash return",
      description:
        "The two metrics you'll use most. Cashflow tells you the dollar amount. CoC tells you whether that dollar amount is a good return.",
      duration: "6 min",
      sections: [
        {
          type: "paragraph",
          content:
            "These are the two metrics you'll use most often as a real estate investor. If you only learn two metrics from this entire course — make it these two.",
        },
        {
          type: "card",
          eyebrow: "Metric 1",
          title: "Net cashflow",
          paragraphs: [
            "What it tells you: how much money you actually keep each month after every expense is paid.",
            "Why it matters: this is the most fundamental number in real estate investing — especially early in your investing career. For most new investors, cashflow is the metric that matters most because it tells you whether the property is making or losing money every single month.",
          ],
          bullets: [
            "Monthly rental income − Monthly operating expenses = Net cashflow",
            "Example: $4,250 income − $3,400 expenses = $850/month net cashflow",
          ],
        },
        {
          type: "paragraph",
          content:
            "As you grow and gain experience, you'll meet seasoned investors who buy properties that barely cashflow — or even go slightly negative — because they're investing for appreciation, tax benefits, or equity positioning. That's a valid strategy for experienced investors. But when you're getting started, cashflow is king. A property that cashflows gives you stability, confidence, and the foundation to grow from.",
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "What's good",
          paragraphs: [
            "Positive is the goal. How much positive depends on your strategy, your market, and your goals. Some investors are happy with $200/month on a property that's appreciating and building equity. Others won't touch a deal that doesn't cashflow $1,000+. There's no universal right answer — but if you're negative, something needs to change.",
          ],
        },
        { type: "divider" },
        {
          type: "card",
          eyebrow: "Metric 2",
          title: "Cash-on-cash return (CoC)",
          paragraphs: [
            "What it tells you: how hard your actual invested dollars are working for you each year.",
            "Why it matters: cashflow tells you the monthly number. CoC tells you whether that number is a good return relative to the money you put in. A property cashflowing $200/month sounds okay — but if you invested $150,000 to get it, that's a 1.6% return. Your money is barely working.",
          ],
          bullets: [
            "Annual net cashflow ÷ Total cash invested = CoC",
            "Example: $10,200 annual ÷ $85,000 invested = 12% CoC",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "What's good",
          paragraphs: [
            "Most investors look for 8–12%+. This varies by market and strategy — but if your CoC is under 5%, you should ask yourself whether your money could be working harder somewhere else.",
          ],
        },
        {
          type: "key-takeaway",
          title: "Cashflow tells the dollar amount. CoC tells you if that's a good return.",
          body: "Net cashflow: monthly income − monthly expenses = what you keep. Cash-on-cash: annual cashflow ÷ cash invested = how hard your money is working.",
        },
      ],
      quiz: [],
    },

    {
      slug: "dscr-and-roi",
      number: 22,
      moduleNumber: 4,
      moduleTitle: "The fundamentals every investor needs to know",
      moduleLessonNumber: 3,
      title: "DSCR & ROI",
      description:
        "Two more metrics — one that lenders care about (DSCR), one that shows your full return (ROI).",
      duration: "5 min",
      sections: [
        {
          type: "paragraph",
          content:
            "These two metrics come up less often in day-to-day investing — but understanding them gives you a more complete picture and prepares you for conversations with lenders and other investors.",
        },
        {
          type: "card",
          eyebrow: "Metric 3",
          title: "Debt Service Coverage Ratio (DSCR)",
          paragraphs: [
            "What it tells you: whether the property generates enough income to cover its mortgage and debt payments.",
            "Why it matters: lenders use this to decide whether to give you a loan. If the property doesn't earn enough to comfortably cover the mortgage — the lender won't fund it.",
          ],
          bullets: [
            "Net operating income ÷ Annual debt payments = DSCR",
            "Example: $24,000 NOI ÷ $20,000 annual mortgage = 1.2 DSCR",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "What's good",
          paragraphs: [
            "Most lenders require 1.25 or higher. Above 1.0 means the property covers its debt. Below 1.0 means it doesn't — a red flag.",
            "When you'll encounter this: if you're applying for a DSCR loan (a loan product specifically designed for investment properties that qualifies based on the property's income rather than your personal income), this is the number that matters most.",
          ],
        },
        { type: "divider" },
        {
          type: "card",
          eyebrow: "Metric 4",
          title: "Return on Investment (ROI)",
          paragraphs: [
            "What it tells you: your total return — including not just cashflow but also equity paydown, appreciation, and tax benefits — relative to what you invested.",
            "Why it matters: cashflow and CoC only measure the cash coming in each month. But real estate builds wealth in multiple ways simultaneously. ROI gives you the full picture of what your investment is actually doing for you over time.",
          ],
          bullets: [
            "(Annual cashflow + Equity paydown + Appreciation) ÷ Total cash invested = ROI",
            "Example: ($10,200 + $3,600 + $12,000) ÷ $85,000 = 30.4% ROI",
          ],
        },
        {
          type: "card",
          tone: "charcoal",
          title: "This is why real estate is so powerful.",
          paragraphs: [
            "Your CoC might be 12% — but your total ROI when you factor in equity paydown and appreciation can be 25–35%+. No other asset class does this consistently.",
          ],
        },
        {
          type: "key-takeaway",
          title: "CoC = how your cash is working. ROI = how the whole investment is.",
          body: "DSCR: NOI ÷ debt payments. Lenders want 1.25+. ROI: (cashflow + paydown + appreciation) ÷ cash invested. Your total return — not just cashflow.",
        },
      ],
      quiz: [],
    },

    {
      slug: "financing-fundamentals",
      number: 23,
      moduleNumber: 4,
      moduleTitle: "The fundamentals every investor needs to know",
      moduleLessonNumber: 4,
      title: "Financing fundamentals — owner-occupied vs investor loans",
      description:
        "FHA, conventional, VA. Conventional investment, DSCR, hard money, portfolio. The gap between owner-occupied and investor financing is massive.",
      duration: "6 min",
      sections: [
        {
          type: "paragraph",
          content:
            "We covered owner-occupied financing in detail in the house hacking sections — but here's the full picture of how financing works across all strategies.",
        },
        { type: "heading", content: "Owner-occupied loans" },
        {
          type: "compare",
          items: [
            {
              eyebrow: "FHA",
              title: "3.5% down",
              paragraphs: ["580+ credit. 1–4 units. Mortgage insurance required."],
            },
            {
              eyebrow: "Conventional",
              title: "3–5% down",
              paragraphs: ["620+ credit. 1–4 units. PMI drops at 20% equity."],
            },
            {
              eyebrow: "VA",
              title: "0% down",
              paragraphs: ["Veterans / military only. 1–4 units. No mortgage insurance."],
            },
          ],
        },
        {
          type: "paragraph",
          content:
            "These are only available when you live in the property as your primary residence. This is what makes house hacking so powerful — you get investor-level returns with homeowner-level financing.",
        },
        { type: "heading", content: "Investor loans" },
        {
          type: "card",
          eyebrow: "Investor · 1",
          title: "Conventional investment",
          paragraphs: [
            "20–25% down, 680+ credit typically, higher interest rates than owner-occupied.",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Investor · 2",
          title: "DSCR loans",
          paragraphs: [
            "Qualify based on the property's income, not your personal income. 20–25% down. Popular with investors who have multiple properties or non-traditional income.",
          ],
        },
        {
          type: "card",
          eyebrow: "Investor · 3",
          title: "Hard money / private money",
          paragraphs: [
            "Short-term loans (6–18 months) at higher rates. Used for BRRRR and fix & flip when you need to close fast or the property doesn't qualify for traditional financing. You refinance out of these into a permanent loan.",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Investor · 4",
          title: "Portfolio loans",
          paragraphs: [
            "Offered by local banks and credit unions, held in-house (not sold to Fannie/Freddie). More flexible underwriting. Good for investors with complex situations.",
          ],
        },
        { type: "heading", content: "The gap" },
        {
          type: "compare",
          items: [
            {
              eyebrow: "Owner-occupied",
              title: "3.5–5% down",
              bullets: [
                "Lower rates",
                "Easier qualification",
                "PMI / MIP under 20%",
              ],
            },
            {
              eyebrow: "Investor",
              title: "20–25% down",
              bullets: [
                "Higher rates",
                "Stricter qualification",
                "No mortgage insurance",
              ],
            },
          ],
        },
        {
          type: "paragraph",
          content:
            "This is why house hacking is the best first move. You get the investor returns with the homeowner financing. Once you move out after 12 months, you keep those favorable loan terms — and you can house hack again with a new property.",
        },
        {
          type: "callout",
          tone: "gold",
          body: "Important note: Interest rates change constantly. Always get quotes from multiple lenders. Run your numbers with your actual rate, not an example rate from a course or a YouTube video.",
        },
        {
          type: "key-takeaway",
          title: "The gap is why house hacking is the best first move",
          body: "Owner-occupied: FHA 3.5% / Conventional 3–5% / VA 0%. Lower rates, easier qualification. Investor: Conventional 20–25% / DSCR / hard money. Higher rates, stricter qualification. Always get quotes from multiple lenders.",
        },
      ],
      quiz: [],
    },

    {
      slug: "due-diligence",
      number: 24,
      moduleNumber: 4,
      moduleTitle: "The fundamentals every investor needs to know",
      moduleLessonNumber: 5,
      title: "Due diligence basics",
      description:
        "Inspection. Numbers. Title. Neighborhood. Exit. The work between finding a deal and closing on it that protects you from the most expensive mistakes.",
      duration: "7 min",
      sections: [
        {
          type: "paragraph",
          content:
            "Due diligence is everything you do between finding a deal and closing on it to make sure the property is what you think it is and the numbers actually work.",
        },
        {
          type: "paragraph",
          content:
            "Skipping due diligence is one of the most expensive mistakes you can make — and it's covered in detail in Module 5. But here's what every investor should know going in.",
        },
        {
          type: "card",
          eyebrow: "DD · 1",
          title: "The inspection",
          paragraphs: [
            "Get a professional home inspection on every property. No exceptions. Even if you're experienced. Even if the property looks perfect.",
            "The inspection reveals problems you can't see — structural issues, plumbing problems, electrical hazards, roof condition, HVAC age, foundation concerns. Any one of these can cost thousands to fix if you discover them after closing.",
            "If you're planning a coliving conversion or high-occupancy use — consider getting specialized inspections for plumbing capacity, electrical panel capacity, and HVAC sizing on top of the standard inspection.",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "DD · 2",
          title: "The numbers",
          paragraphs: [
            "Run your own numbers. Don't trust the seller's numbers. Don't trust the agent's numbers. Don't trust anyone's projections but your own.",
          ],
          bullets: [
            "Verify comparable rents — what are similar rooms or units actually renting for in this area?",
            "Verify expenses — get real quotes for insurance, verify tax amounts, confirm utility costs",
            "Run the deal at 85% occupancy — not 100%",
            "Include ALL expenses — mortgage, taxes, insurance, utilities, maintenance, vacancy, platform fees, mortgage insurance",
            "If the deal only works with optimistic assumptions — it doesn't work",
          ],
        },
        {
          type: "card",
          eyebrow: "DD · 3",
          title: "The title",
          paragraphs: [
            "Make sure the title is clean — no liens, no encumbrances, no ownership disputes. Your lender and title company will handle this, but understand what it means and ask questions if anything comes up.",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "DD · 4",
          title: "The neighborhood",
          paragraphs: [
            "Drive the neighborhood. At different times of day. On weekdays and weekends. Talk to neighbors if you can. Look at what's happening around the property — not just the property itself.",
            "Google the address. Check for flood zones, crime data, planned development, and anything else that could affect the property's value or your tenants' experience.",
          ],
        },
        {
          type: "card",
          eyebrow: "DD · 5",
          title: "The exit",
          paragraphs: [
            "Before you buy, know how you'd get out. What if the deal doesn't work? What if the market shifts? What if your life changes?",
          ],
          bullets: [
            "Could you sell and break even?",
            "Could you rent the whole thing traditionally?",
            "Could you convert the strategy?",
            "Is there more than one way this property can work for you?",
          ],
        },
        {
          type: "paragraph",
          content:
            "The best deals have multiple exit options. A deal that only works under one specific scenario is fragile.",
        },
        {
          type: "key-takeaway",
          title: "Due diligence is the most expensive shortcut in real estate",
          body: "Professional inspection — no exceptions. Run YOUR numbers — don't trust anyone else's projections. Clean title. Drive the neighborhood multiple times. Know your exit before you buy.",
        },
        { type: "heading", content: "Module 4 recap" },
        {
          type: "bullets",
          items: [
            "Three questions evaluate any deal: cost to get in, what it earns, cost to operate",
            "Net cashflow and CoC are your two essential metrics",
            "DSCR matters for lenders; ROI shows your total return",
            "Owner-occupied financing is dramatically better than investor financing",
            "Due diligence is non-negotiable — inspect, verify, drive the neighborhood, know your exit",
          ],
        },
        {
          type: "callout",
          tone: "gold",
          body: "Up next — the Module 4 quiz. Five questions on the fundamentals.",
        },
      ],
      quiz: [],
    },

    /* ==================== MODULE 4 QUIZ ==================== */
    {
      slug: "module-4-quiz",
      number: 25,
      moduleNumber: 4,
      moduleTitle: "The fundamentals every investor needs to know",
      moduleLessonNumber: 6,
      kind: "module-quiz",
      title: "Module 4 Quiz",
      description:
        "Five questions on the three deal questions, cashflow vs CoC, DSCR signals, the financing gap, and exit planning.",
      duration: "5 min",
      sections: [],
      quiz: [
        {
          question:
            "What are the three questions that evaluate any real estate deal?",
          options: [
            "Where is it, how old is it, and how big is it",
            "What does it cost to get in, what does it earn, and what does it cost to operate",
            "What's the interest rate, what's the down payment, and what's the appreciation",
            "What's the neighborhood, what's the school district, and what's the walkability score",
          ],
          correctIndex: 1,
          explanation:
            "Every deal comes down to these three questions. Master them and you can evaluate any property in any market with any strategy.",
        },
        {
          question:
            "What's the difference between net cashflow and cash-on-cash return?",
          options: [
            "They're the same thing",
            "Net cashflow is the dollar amount you keep each month; CoC tells you whether that dollar amount is a good return relative to what you invested",
            "CoC is always higher than cashflow",
            "Net cashflow includes appreciation; CoC does not",
          ],
          correctIndex: 1,
          explanation:
            "A property cashflowing $200/month sounds decent — until you realize you invested $150,000 to get it (1.6% CoC). Cashflow is the dollar amount. CoC puts that amount in context.",
        },
        {
          question: "A property has a DSCR of 0.9. What does that mean?",
          options: [
            "The property is generating strong returns",
            "The property's income doesn't cover its debt payments — a red flag",
            "The property is overpriced",
            "The property needs renovation",
          ],
          correctIndex: 1,
          explanation:
            "A DSCR below 1.0 means the property doesn't generate enough income to cover its own mortgage. Most lenders require 1.25 or higher. Below 1.0 is a deal that doesn't work as structured.",
        },
        {
          question:
            "Why is the gap between owner-occupied and investor financing so important?",
          options: [
            "There is no gap — they're the same",
            "Owner-occupied financing lets you get in with 3.5–5% down instead of 20–25% — dramatically lowering the barrier to entry",
            "Investor financing is always better",
            "The gap only matters for multifamily properties",
          ],
          correctIndex: 1,
          explanation:
            "The down payment difference alone — $10,500 vs $60,000+ on a $300,000 property — is why house hacking is the best first move.",
        },
        {
          question: "Why should you \"know your exit\" before buying a property?",
          options: [
            "So you can sell it immediately for a profit",
            "So you have options if the deal doesn't work, the market shifts, or your life changes",
            "Because every property should be flipped within 2 years",
            "Exit planning is only important for commercial properties",
          ],
          correctIndex: 1,
          explanation:
            "The best deals have multiple exit options — sell, rent traditionally, convert the strategy, refinance. A deal that only works under one specific scenario is fragile.",
        },
      ],
    },

    /* ====================================================================
     * MODULE 5 — THE MISTAKES
     * ==================================================================*/
    {
      slug: "analysis-paralysis",
      number: 26,
      moduleNumber: 5,
      moduleTitle: "The mistakes that cost first-time investors the most",
      moduleLessonNumber: 1,
      title: "Analysis paralysis — the most expensive mistake",
      description:
        "The mistake that costs more than all the others combined — because it costs you everything you would have built.",
      duration: "6 min",
      sections: [
        {
          type: "paragraph",
          content:
            "Every investor makes mistakes. Every single one. The goal isn't perfection. The goal is to avoid the expensive, preventable mistakes that derail people before they ever get momentum. These are the ones I see most often.",
        },
        {
          type: "card",
          tone: "charcoal",
          title: "This is the mistake that costs more than all the others combined.",
          paragraphs: [
            "Because it costs you everything you would have built if you'd just started.",
          ],
        },
        {
          type: "paragraph",
          content:
            "Analysis paralysis is the state of researching, analyzing, planning, and preparing endlessly without ever actually making a move. You read one more book. Watch one more YouTube video. Run the numbers one more time. Wait for the market to shift. Wait until you feel \"ready.\"",
        },
        {
          type: "paragraph",
          content:
            "The problem is that \"ready\" never comes. There's always another reason to wait. Another objection. Another question. And while you're analyzing — prices are rising, rents are increasing, and other investors are building the wealth you're still planning for.",
        },
        {
          type: "card",
          eyebrow: "Why it happens",
          bullets: [
            "Fear of making a mistake — so you make the biggest one by doing nothing",
            "Information overload — too many strategies, too many opinions, too many scenarios",
            "Perfectionism — waiting for the \"perfect\" deal that doesn't exist",
            "Lack of confidence — feeling like you don't know enough (you know more than you think)",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "How to break through it",
          bullets: [
            "Accept that your first deal won't be perfect — and it doesn't need to be",
            "Set a deadline — \"I will make an offer on a property by [date]\"",
            "Stop consuming and start doing — you learn more from one deal than from 100 videos",
            "Talk to someone who's done it — a conversation with an experienced investor cuts through months of overthinking",
            "Remember: the cost of inaction is the wealth you never built",
          ],
        },
        {
          type: "fascination",
          body: "The most expensive mistake in real estate isn't buying the wrong property. It's never buying one at all. Every year you wait is a year of cashflow, equity, appreciation, and tax benefits you'll never get back. Done is better than perfect. Started is better than ready.",
        },
      ],
      quiz: [],
    },

    {
      slug: "buying-on-emotion",
      number: 27,
      moduleNumber: 5,
      moduleTitle: "The mistakes that cost first-time investors the most",
      moduleLessonNumber: 2,
      title: "Buying on emotion instead of numbers",
      description:
        "The kitchen is beautiful. The neighborhood is charming. You can see yourself living there. Then the numbers don't work — and you rationalize.",
      duration: "5 min",
      sections: [
        {
          type: "paragraph",
          content:
            "This is the second most common mistake — and it's the one that turns a good investor into a stressed one.",
        },
        {
          type: "paragraph",
          content:
            "It happens like this: you walk into a property and it feels right. The kitchen is beautiful. The neighborhood is charming. You can see yourself living there. You start getting attached before you've run a single number.",
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Then what happens",
          paragraphs: [
            "You run the numbers — and they don't work. But by now you're emotionally invested. So you start rationalizing. \"The rent might be a little higher than comps suggest.\" \"The maintenance probably won't be that bad.\" \"The market is going up so appreciation will cover it.\"",
            "This is how people buy bad deals. Not because they don't know how to run numbers — but because they ran the numbers after they'd already decided to buy.",
          ],
        },
        { type: "heading", content: "How to avoid it" },
        {
          type: "bullets",
          items: [
            "Run the numbers FIRST — before you ever see the property in person if possible",
            "Use conservative assumptions — 85% occupancy, realistic rents, full expense picture",
            "If the numbers don't work on paper, they won't work in real life — no matter how nice the kitchen is",
            "Have a set of criteria and stick to them — don't adjust your criteria to fit the property you want",
            "Remember: you're buying an investment, not a home. The property's job is to make money.",
          ],
        },
        {
          type: "key-takeaway",
          title: "A beautiful kitchen doesn't pay your mortgage. Cashflow does.",
          body: "The property's job is to make money. If the numbers don't work on paper, they won't work in real life. Run the numbers before you fall in love.",
        },
      ],
      quiz: [],
    },

    {
      slug: "underestimating-expenses",
      number: 28,
      moduleNumber: 5,
      moduleTitle: "The mistakes that cost first-time investors the most",
      moduleLessonNumber: 3,
      title: "Underestimating expenses",
      description:
        "The deal that looks great on paper but loses money in reality? It's almost always underestimated expenses.",
      duration: "6 min",
      sections: [
        {
          type: "paragraph",
          content:
            "This mistake turns what looked like a great deal on paper into a monthly loss in reality.",
        },
        {
          type: "paragraph",
          content:
            "It happens because new investors tend to think about income optimistically and expenses minimally. They project full occupancy. They forget about mortgage insurance. They don't budget for maintenance. They underestimate utilities. They don't account for vacancy or turnover.",
        },
        {
          type: "card",
          tone: "blush",
          title: "Then reality hits.",
          paragraphs: [
            "The deal that was supposed to cashflow $800/month is actually breaking even. Or losing money.",
          ],
        },
        {
          type: "card",
          eyebrow: "The expenses people forget most often",
          bullets: [
            "Mortgage insurance — if you put less than 20% down, this adds $100–$300+/month",
            "Vacancy — even a well-run property has gaps between tenants",
            "Turnover costs — cleaning, touch-ups, re-listing time, lost rent between residents",
            "Maintenance — things break. Budget 5–10% of gross income.",
            "Utilities — if you're covering them for tenants, this adds up fast",
            "Platform fees — PadSplit, Airbnb, property management — these are real costs",
            "Capital expenditures — roof, HVAC, water heater. These are when, not if.",
            "Insurance increases — insurance costs have risen significantly in many markets",
          ],
        },
        { type: "heading", content: "How to avoid it" },
        {
          type: "bullets",
          items: [
            "Include EVERY expense in your projections — use the full checklist from Module 4",
            "Project at 85% occupancy — never 100%",
            "Add a buffer — if your numbers only work perfectly, they don't work",
            "Talk to other investors in your market — what are their actual expenses?",
            "When in doubt, estimate higher, not lower",
          ],
        },
        {
          type: "key-takeaway",
          title: "If the deal only works perfectly — it doesn't work",
          body: "It's almost always underestimated expenses. Mortgage insurance. Vacancy. Turnover. Maintenance. Utilities. Platform fees. Capital expenditures. Insurance increases. Include everything. Project at 85%. Add a buffer.",
        },
      ],
      quiz: [],
    },

    {
      slug: "skipping-dd-and-going-solo",
      number: 29,
      moduleNumber: 5,
      moduleTitle: "The mistakes that cost first-time investors the most",
      moduleLessonNumber: 4,
      title: "Skipping due diligence & going it alone",
      description:
        "Two separate mistakes that often happen together. Both rooted in overconfidence or impatience. Both expensive.",
      duration: "7 min",
      sections: [
        {
          type: "paragraph",
          content:
            "These are two separate mistakes — but they often happen together and they're both rooted in the same thing: overconfidence or impatience.",
        },
        { type: "heading", content: "Skipping due diligence" },
        {
          type: "paragraph",
          content:
            "We covered due diligence in Module 4 — but it bears repeating here because this is where it shows up as a costly mistake.",
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "What this looks like",
          paragraphs: [
            "Skipping or rushing due diligence is how investors end up with:",
          ],
          bullets: [
            "A plumbing system that can't handle high-occupancy use — $10,000+ to fix",
            "A roof that needs replacing 6 months after closing — $8,000–$15,000",
            "A foundation issue that wasn't caught — $20,000+",
            "A title lien that delays or kills the deal",
            "A property in a flood zone they didn't know about",
            "Rents significantly lower than projected because comps weren't verified",
          ],
        },
        {
          type: "paragraph",
          content:
            "Every one of these is preventable. Get the inspection. Verify the numbers. Drive the neighborhood. Check the title. Do the work before you close — because after you close, it's your problem.",
        },
        { type: "heading", content: "Going it alone" },
        {
          type: "card",
          tone: "charcoal",
          title: "Real estate is a team sport.",
          paragraphs: [
            "The investors who move fastest and make the fewest mistakes are the ones who have experienced people in their corner.",
          ],
        },
        {
          type: "card",
          eyebrow: "Your team",
          bullets: [
            "An investor-friendly real estate agent — not your cousin who sells houses on the side",
            "A lender who understands investment properties — not just the first bank you walk into",
            "A CPA who knows real estate — not a general tax preparer",
            "An attorney — for entity setup, leases, and anything legal",
            "A mentor or coach — someone who's already done what you're trying to do",
            "A contractor you trust — for renovations and repairs",
            "An insurance agent who understands rental activity — not just homeowner's policies",
          ],
        },
        {
          type: "paragraph",
          content:
            "You don't need all of these on day one. But you need to start building this team before you make your first offer. Going it alone is how expensive mistakes happen — and it's how solvable problems become costly ones.",
        },
        {
          type: "key-takeaway",
          title: "The fastest investors aren't solo",
          body: "Due diligence is not optional. Going it alone is not a badge of honor. Get the inspection. Verify the numbers. Drive the neighborhood. Build your team. The fastest investors have the right people around them.",
        },
      ],
      quiz: [],
    },

    {
      slug: "business-and-market-timing",
      number: 30,
      moduleNumber: 5,
      moduleTitle: "The mistakes that cost first-time investors the most",
      moduleLessonNumber: 5,
      title: "Not treating it like a business & trying to time the market",
      description:
        "Run it like a business from day one. And stop trying to time the market — people have been waiting since 2015.",
      duration: "7 min",
      sections: [
        { type: "heading", content: "Not treating it like a business" },
        {
          type: "paragraph",
          content:
            "We covered this in House Hacking 101 — but it applies to every strategy.",
        },
        {
          type: "card",
          eyebrow: "Real estate investing is a business",
          bullets: [
            "Separate bank accounts",
            "Expense tracking",
            "Record keeping",
            "Professionalism with tenants",
            "Proactive maintenance",
            "Intentional decision-making",
          ],
        },
        {
          type: "compare",
          items: [
            {
              eyebrow: "Casual approach",
              title: "Get overwhelmed, burn out",
              paragraphs: [
                "Mixing personal and rental finances. Skipping documentation. Reacting instead of planning.",
              ],
            },
            {
              eyebrow: "Business approach",
              title: "Scale, build systems, create wealth",
              paragraphs: [
                "Treating real estate like a business from day one — even on your first property.",
              ],
            },
          ],
        },
        { type: "heading", content: "Trying to time the market" },
        {
          type: "paragraph",
          content:
            "We addressed the market-timing objections in Module 1. But it shows up here as a recurring mistake because it's the excuse that prevents more people from starting than any other.",
        },
        {
          type: "paragraph",
          content:
            "\"I'll wait until rates drop.\" \"I'll wait until prices dip.\" \"I'll wait until the market stabilizes.\"",
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "What actually happens",
          bullets: [
            "2018: \"Prices are too high.\" People who bought anyway are sitting on massive equity.",
            "2019: \"The market has to cool off.\" Prices kept rising.",
            "2020: \"There's a pandemic — everything will crash.\" Prices exploded.",
            "2021: \"This can't be sustainable.\" Prices kept rising.",
            "2022: \"Rates are up — the crash is coming.\" Prices held or softened slightly.",
            "2023–2025: \"I'm waiting for the right time.\" Still waiting.",
          ],
        },
        {
          type: "paragraph",
          content:
            "Meanwhile, the people who bought in any of those years — with the right strategy and the right property — are building wealth. They refinanced when rates dipped. They held through the uncertainty. And they're years ahead of the people still waiting.",
        },
        {
          type: "card",
          tone: "charcoal",
          title: "Time in the market beats timing the market. Every time.",
        },
        {
          type: "key-takeaway",
          title: "Run it like a business. Stop timing the market.",
          body: "Separate finances. Track everything. Be professional. Plan, don't react. People have been 'waiting' since 2015. The people who bought are wealthy. The people who waited are still waiting.",
        },
        { type: "heading", content: "Module 5 recap" },
        {
          type: "bullets",
          items: [
            "Analysis paralysis is the most expensive mistake — inaction costs more than imperfection",
            "Run the numbers before you fall in love with a property",
            "Underestimating expenses turns good deals into bad ones",
            "Due diligence is non-negotiable",
            "Going it alone is not a strategy — build your team",
            "Treat real estate like a business from property #1",
            "Stop trying to time the market — time in the market wins",
          ],
        },
        {
          type: "callout",
          tone: "gold",
          body: "Up next — the Module 5 quiz. Five questions on the costliest mistakes.",
        },
      ],
      quiz: [],
    },

    /* ==================== MODULE 5 QUIZ ==================== */
    {
      slug: "module-5-quiz",
      number: 31,
      moduleNumber: 5,
      moduleTitle: "The mistakes that cost first-time investors the most",
      moduleLessonNumber: 6,
      kind: "module-quiz",
      title: "Module 5 Quiz",
      description:
        "Five questions on the most expensive mistake, emotion-buying, expense estimating, going solo, and market timing.",
      duration: "5 min",
      sections: [],
      quiz: [
        {
          question:
            "What is the most expensive mistake a first-time real estate investor can make?",
          options: [
            "Buying in the wrong neighborhood",
            "Overpaying for a property",
            "Never buying at all — analysis paralysis",
            "Choosing the wrong strategy",
          ],
          correctIndex: 2,
          explanation:
            "Every year you spend researching instead of acting is a year of cashflow, equity, appreciation, and tax benefits you'll never get back. The cost of inaction is the wealth you never built.",
        },
        {
          question:
            "You find a property you love — beautiful kitchen, great neighborhood, feels right. What should you do BEFORE making an offer?",
          options: [
            "Make an offer immediately before someone else does",
            "Run the numbers with conservative assumptions and make sure it pencils as an investment",
            "Ask your friends and family what they think",
            "Wait 6 months to see if the price drops",
          ],
          correctIndex: 1,
          explanation:
            "Run the numbers first — before you get emotionally invested. If the deal doesn't work on paper with conservative assumptions, it won't work in real life no matter how nice the kitchen is.",
        },
        {
          question:
            "A deal looks great on paper — $1,000/month cashflow. But you projected 100% occupancy and didn't include maintenance, vacancy, or mortgage insurance. What's likely to happen?",
          options: [
            "It will cashflow even more than projected",
            "The actual cashflow will be significantly lower — possibly negative — because real expenses were left out",
            "Expenses don't matter as long as income is high",
            "The property will appreciate enough to cover the gap",
          ],
          correctIndex: 1,
          explanation:
            "Underestimating expenses is how 'great deals' turn into monthly losses. Include every expense, project at 85% occupancy, and add a buffer.",
        },
        {
          question: "Why is \"going it alone\" listed as a costly mistake?",
          options: [
            "Because real estate requires a license",
            "Because experienced team members — agents, lenders, CPAs, mentors — help you avoid expensive mistakes and move faster",
            "Because you're legally required to have a partner",
            "Because banks won't lend to solo investors",
          ],
          correctIndex: 1,
          explanation:
            "Real estate is a team sport. An investor-friendly agent, a real estate-savvy lender, a CPA who knows real estate, and a mentor who's already done it — these people save you time, money, and mistakes.",
        },
        {
          question:
            "People have been saying \"the market is about to crash\" since 2015. What has actually happened since then?",
          options: [
            "Prices have crashed multiple times",
            "Prices have been flat",
            "Prices have generally continued to rise, and people who bought in any of those years are significantly wealthier than people who waited",
            "The market crashed in 2022 and hasn't recovered",
          ],
          correctIndex: 2,
          explanation:
            "Time in the market beats timing the market. The people who bought — with the right strategy and the right property — are building wealth. The people who waited are still waiting.",
        },
      ],
    },

    /* ====================================================================
     * MODULE 6 — YOUR FIRST MOVE
     * ==================================================================*/
    {
      slug: "decision-framework",
      number: 32,
      moduleNumber: 6,
      moduleTitle: "Your first move",
      moduleLessonNumber: 1,
      title: "The decision framework — where are you right now?",
      description:
        "Where you live, your capital, your credit, your time, and what's pulling you. Answer these honestly and your first move becomes obvious.",
      duration: "8 min",
      sections: [
        {
          type: "paragraph",
          content:
            "You've made it to the final module. You understand why real estate works, you know all 8 residential strategies, you know which one fits your life, you understand the fundamentals, and you know the mistakes to avoid.",
        },
        {
          type: "card",
          tone: "charcoal",
          title: "Now it's time to figure out your specific starting point.",
          paragraphs: [
            "Because your first move depends entirely on where you are right now.",
          ],
        },
        { type: "heading", content: "Where do you live?" },
        {
          type: "compare",
          items: [
            {
              eyebrow: "Currently renting",
              paragraphs: [
                "House hacking is almost certainly your best first move. You're paying for housing anyway — redirect that money into building equity.",
              ],
            },
            {
              eyebrow: "Own your home",
              paragraphs: [
                "You have options. Rent a room or convert a basement to house hack your current property. Buy an investment property. Partner with an operator passively. Your home's equity may also fund your first deal.",
              ],
            },
            {
              eyebrow: "With family / no housing cost",
              paragraphs: [
                "You're in an incredible position. Low expenses mean more savings. Use this window to stack capital for your first purchase.",
              ],
            },
          ],
        },
        { type: "heading", content: "What's your capital situation?" },
        {
          type: "card",
          eyebrow: "Capital tiers",
          bullets: [
            "Under $10K → lease arbitrage or continue saving toward a house hack. You're closer than you think — FHA is 3.5% down.",
            "$10K–$25K → house hacking is within reach. FHA on a $250K–$300K property. Start talking to lenders and agents.",
            "$25K–$75K → house hacking, arbitrage, or passive investing are all accessible. You have options.",
            "$75K+ → full flexibility. Acquisition, coliving, multifamily, passive investing — any strategy is available.",
          ],
        },
        { type: "heading", content: "What's your credit situation?" },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Credit tiers",
          bullets: [
            "580+ → FHA eligible (3.5% down)",
            "620+ → Conventional eligible (3–5% down)",
            "680+ → Most investor loans accessible",
            "Below 580 → Focus on credit repair first — this is your priority before anything else",
          ],
          paragraphs: [
            "If your credit needs work — that's okay. It's fixable. And the time you spend improving it now will save you tens of thousands in interest over the life of your loans.",
          ],
        },
        { type: "heading", content: "What's your time situation?" },
        {
          type: "card",
          eyebrow: "Time tiers",
          bullets: [
            "Full-time job, limited free time → house hacking (steady state is 2–5 hrs/week) or passive investing",
            "Side hustle flexibility → coliving, arbitrage, or house hacking with a more active rental strategy",
            "Full-time available → any strategy including BRRRR and fix & flip",
          ],
        },
        { type: "heading", content: "What's pulling you?" },
        {
          type: "paragraph",
          content:
            "Be honest. After everything you've learned in this course — which strategy are you most drawn to?",
        },
        {
          type: "bullets",
          items: [
            "\"I want to reduce my housing costs and get started with minimal risk\" → house hacking",
            "\"I want strong cashflow from day one\" → coliving",
            "\"I want simplicity and long-term wealth\" → traditional rental",
            "\"I want returns without operating\" → passive investing",
            "\"I want to build a real estate business\" → coliving or BRRRR",
            "\"I'm not sure yet\" → that's okay — your next step is a conversation, not a commitment",
          ],
        },
        {
          type: "key-takeaway",
          title: "Answer these honestly and your first move becomes obvious",
          body: "Where do you live? How much capital do you have? What's your credit situation? How much time can you commit? What strategy is pulling you?",
        },
      ],
      quiz: [],
    },

    {
      slug: "not-ready-yet",
      number: 33,
      moduleNumber: 6,
      moduleTitle: "Your first move",
      moduleLessonNumber: 2,
      title: "Not ready yet? Here's what to do now.",
      description:
        "Credit repair. Capital plans. Education. And what to do in the meantime so you're ready to act fast when the time comes.",
      duration: "7 min",
      sections: [
        {
          type: "paragraph",
          content:
            "If you went through the decision framework and realized you're not quite ready to buy — that's okay. Knowing where you stand is progress. And the gap between where you are and where you need to be is almost always smaller than you think.",
        },
        {
          type: "paragraph",
          content:
            "Here's what to focus on.",
        },
        {
          type: "card",
          eyebrow: "If your credit needs work",
          bullets: [
            "Pull your credit report — you get one free from each bureau annually at annualcreditreport.com",
            "Dispute any errors — this alone can boost your score",
            "Pay down credit card balances — utilization under 30% is good, under 10% is great",
            "Don't open new accounts or close old ones — both can temporarily lower your score",
            "Set up autopay on everything — one missed payment can drop your score significantly",
            "Give it time — credit repair isn't overnight, but meaningful improvement can happen in 3–6 months",
          ],
          paragraphs: [
            "The target: 580+ for FHA, 620+ for conventional. If you're close — a few months of intentional effort can get you there.",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "If your capital needs work",
          bullets: [
            "Set a specific savings target — \"I need $15,000 for an FHA house hack\" is more motivating than \"I need to save more\"",
            "Automate your savings — set up an automatic transfer on payday",
            "Cut one major expense — temporarily. This isn't forever. It's for your first deal.",
            "Pick up additional income — side hustle, overtime, freelance. Every dollar goes toward your down payment.",
            "Look into down payment assistance programs — many states and cities offer grants or forgivable loans for first-time buyers",
          ],
          paragraphs: [
            "The math: $15,000 saved over 12 months is $1,250/month. Over 18 months it's $833/month. Over 24 months it's $625/month. Pick a timeline that's aggressive but realistic.",
          ],
        },
        {
          type: "card",
          eyebrow: "If you need more education",
          bullets: [
            "House Hacking 101 — if house hacking is your first move, this course goes deep on financing, property selection, numbers, operations, and exit strategies. $99.",
            "Coliving 101 — if coliving interests you, this course covers the full model from math to operations. $99.",
            "Bundle all three courses — $149.",
          ],
        },
        { type: "heading", content: "While you're getting ready — do this now" },
        {
          type: "bullets",
          items: [
            "Start driving neighborhoods — get to know the areas you're interested in",
            "Start watching listings — see what's available, what things cost, how long properties sit",
            "Talk to a lender — get pre-qualified so you know exactly what you can afford. This is free and it gives you a clear target.",
            "Connect with an agent — start the relationship now so you're ready to move when the time comes",
            "Join a community — surround yourself with people who are doing what you want to do",
          ],
        },
        {
          type: "key-takeaway",
          title: "The gap is smaller than you think",
          body: "Not being ready to buy today doesn't mean you're not making progress. Everything on this list moves you closer to your first deal — and when the time comes, you'll be ready to act fast.",
        },
      ],
      quiz: [],
    },

    {
      slug: "your-next-step",
      number: 34,
      moduleNumber: 6,
      moduleTitle: "Your first move",
      moduleLessonNumber: 3,
      title: "Your next step",
      description:
        "Realtor services, deeper courses, coaching, partnership, calculators, and community. Pick the next move that fits.",
      duration: "5 min",
      sections: [
        {
          type: "paragraph",
          content:
            "You've finished Real Estate Investing 101. You understand why real estate works, you know every major residential strategy, you know which one fits your life, you understand the fundamentals, you know the mistakes to avoid, and you have a clear picture of where you are right now.",
        },
        {
          type: "card",
          tone: "charcoal",
          title: "The only thing left is action.",
        },
        { type: "heading", content: "Need help finding the right property" },
        {
          type: "card",
          eyebrow: "Atlanta Metro · Keller Williams",
          title: "Work with me as your Realtor",
          paragraphs: [
            "I specialize in investment properties, house hacks, and coliving conversions.",
          ],
        },
        {
          type: "card",
          tone: "blush",
          eyebrow: "Outside Atlanta",
          title: "Get connected with an investor-friendly agent",
          paragraphs: [
            "I'll connect you with someone who understands investing in your market.",
          ],
        },
        { type: "heading", content: "Want to go deeper on a specific strategy" },
        {
          type: "bullets",
          items: [
            "House Hacking 101 — the complete guide to your best first move. $99.",
            "Coliving 101 — the complete coliving model from math to operations. $99.",
            "Bundle all three courses — $149.",
          ],
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
          body: "Partner With Me — let's have a conversation about passive coliving investment in the Atlanta market.",
        },
        { type: "heading", content: "Run the numbers on your own deal" },
        {
          type: "bullets",
          items: [
            "House Hacking Calculator — colivingcait.com/calculator/house-hacking",
            "Coliving Conversion Calculator — colivingcait.com/calculator/coliving",
          ],
        },
        { type: "heading", content: "Join the community" },
        {
          type: "bullets",
          items: [
            "She Leads Coliving — free online community for women building wealth through coliving",
            "Atlanta House Hackers — free Facebook group for house hackers across metro Atlanta",
            "Atlanta Women Investors — monthly in-person meetup, last Tuesday of every month. Free.",
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
            "Your first move depends on where you are right now — capital, credit, time, and what's pulling you",
            "If you're not ready to buy — get your credit ready, stack capital, and start driving neighborhoods",
            "The gap between where you are and where you need to be is smaller than you think",
            "Your next step is a conversation — not more research",
          ],
        },
        {
          type: "quote",
          content:
            "The investors who build the most wealth aren't the ones who know the most. They're the ones who take action with what they know.",
          attribution: "Caitlyn Verdugo",
        },
        {
          type: "card",
          tone: "charcoal",
          eyebrow: "End of course",
          title: "Your next step is a conversation.",
          paragraphs: [
            "About your market. About your situation. About the right first move for you.",
          ],
        },
      ],
      quiz: [],
    },
  ],
};
