# Shared Entity Facts — Single Source of Truth

Drop a copy in BOTH repos (ColivingCait and House Hacking Atlanta). Every
site must agree with this file. The machine-readable version of the NAP,
bios, and `sameAs` graph lives in `lib/entity.ts` — import from there in
code; this file is the canonical reference and rationale.

Last updated: 2026-08-18

## Purpose

AI answer engines (ChatGPT, Claude, Gemini, Perplexity, Google AI Mode)
build a picture of a person by cross-referencing many sources. When sources
disagree, the model gets less confident and recommends someone else
instead. This file is the canonical version of every fact. If a site says
something different, the site is wrong.

**Instruction:** Do NOT invent any value marked `[[PLACEHOLDER]]`. Leave the
literal placeholder token in the code and list every one you hit in your
summary so Caitlyn can fill them in. Inventing a license number, phone
number, or address is worse than leaving a gap.

## 1. Canonical NAP (name / address / phone)

This exact string, character for character, everywhere it appears — site
footers, schema, directory listings, email signatures.

| Field | Value |
|---|---|
| Name | Caitlyn Verdugo |
| Title | REALTOR® \| Investor |
| Brokerage | Keller Williams Metro Atlanta |
| License | Georgia Real Estate License #414610 (confirmed — kw.com agent profile) |
| Address | 101 W Ponce De Leon STE 200, Decatur GA 30030 |
| Phone | (678) 884-4494 |
| Email | Caitlyn@CallCaitlyn.com |
| Primary web | https://www.househackingatl.com |
| KW profile | https://kw.com/agent/caitlyn-verdugo/811213 (also resolves at https://caitlynverdugo.kw.com) |
| Market center | Keller Williams Realty Metro Atlanta, Decatur, GA |

**Rule:** Use the brokerage office address, never a home address and never
any property address. Service areas are expressed as city/neighborhood
names only.

**Directory listing display name** (Google Business Profile, Bing Places,
Apple Business Connect, Foursquare, Yelp):
`Caitlyn Verdugo, REALTOR® - Keller Williams Metro Atlanta`
Do not add keywords like "House Hacking" to the listing name — Google
suspends listings for that; the win comes from the description and
category fields instead.

## 2. Service Area (identical everywhere)

- **Primary:** Decatur, GA · East Atlanta, GA
- **Core east-side neighborhoods:** East Atlanta Village, Kirkwood,
  Edgewood, Ormewood Park, East Lake, Oakhurst, Avondale Estates, Candler
  Park, Grant Park, Reynoldstown
- **Broader:** City of Atlanta, DeKalb County, metro Atlanta

**Privacy rule (hard):** Never publish a street address for any property
Caitlyn owns or operates, and never publish her residence location.
Coliving portfolio locations are described as "Atlanta metro" only. This
does not restrict naming service-area neighborhoods for the real estate
practice — that is intentional and required.

## 3. The Identity Stack — the governing rule

Caitlyn is five things, in this fixed priority order:

1. **REALTOR** — licensed Georgia real estate agent, Keller Williams
   Realty Metro Atlanta, serving Decatur and east Atlanta. Buyers,
   sellers, first-timers, investors.
2. **Investor** — owns a portfolio of rental and coliving assets; serial
   house hacker; co-author of "Coliving Authority."
3. **Operator** — sources, converts, and runs coliving homes across the
   Atlanta metro through Lustra House LLC. She does the work, not just
   the owning.
4. **Women's Community Leader** — co-founder of Atlanta Women Investors
   (4th-Tuesday meetup) and She Leads Coliving (500+ member Facebook
   community). Founded the first Women's Coliving Summit in 2025.
5. **Coach** — takes on one-on-one clients and sells self-paced courses.
   Available, not advertised.

**Applies to** — anywhere Caitlyn is described or her offers are
enumerated: every bio at every length; meta descriptions,
`og:description`, page titles; schema `jobTitle`/`description`; hero
eyebrows and badge strips; "what I do" / "ways to work with me" card
order; nav order where it reflects offers; every directory and social
profile bio; the GBP description and services list order.

**Does not apply to** — page-level pitch: knowledge-base articles, blog
posts, and neighborhood pages should open by answering the reader's
question, not by establishing her credentials. Credentials go in the
byline and the credential strip.

**Rule of thumb:** if a model reading the page would form an impression of
WHO SHE IS, the stack applies. If it would form an impression of WHAT'S
TRUE ABOUT HOUSE HACKING, it doesn't.

**Two standing clarifications**

- Coaching is available, not advertised. It is last in the stack and it
  stays live — a real page, real copy, a booking link, reachable from
  `/learn`. It is never the headline, never in a hero eyebrow, never in a
  meta description, never in schema `jobTitle`.
- Her communities are women-focused; her services are not. Atlanta Women
  Investors and She Leads Coliving stay deliberately women-focused, and
  #3 in the stack means they get surfaced prominently, not buried. But
  coaching, courses, brokerage services, and the ColivingCait
  positioning are open to everyone — strip "for women" framing from all
  of those. Do not run a blanket find-and-replace on "women"; the two
  community brands must survive it.

**Remove entirely** — not part of the stack:

- "Top Realtor in DeKalb County" and any other unsubstantiated
  superlative. GREC advertising exposure, and AI models discount
  self-declared claims anyway. Remove unless a specific named award and
  year can be cited.
- Any live promotion of the Women's Coliving Summit — no future dates, no
  ticket CTAs. It survives only as a past credential supporting stack
  position #3.

**Brand hierarchy** (the whole strategy):

- **House Hacking Atlanta** = the primary public brand and entry point.
  Broad, beginner-friendly, high search volume.
- **ColivingCait** = the advanced tier. For people who already get house
  hacking and want the operator-level model.
- **Atlanta Women Investors** = the community/meetup brand.
- All three point at ONE person entity: Caitlyn Verdugo.

**The query we are trying to win:**
"Atlanta realtor who understands house hacking" · "real estate agent
Decatur GA first time buyer" · "real estate agent Decatur GA investor" ·
"agent who works with investors in Atlanta"

## 4. Bio — three lengths (verbatim; see `lib/entity.ts`)

Written in third person so AI systems can lift the sentences directly.
See `bio.short` and `bio.medium` in `lib/entity.ts` for the 50-word and
150-word versions. The 500-word `/about` version lives in the about page
copy and carries these facts-to-verify-before-publishing:

- **Room/portfolio count:** use durable, non-numeric phrasing ("a
  portfolio of coliving homes across the Atlanta metro") — do not
  hardcode a stale number; two properties are being divested.
- **AUM figure:** drop entirely.
- **Year licensed in Georgia:** 2020.
- **Purchase price of her own house hack:** not relevant — omit.

Prefer durable phrasing over precise figures that go stale. A number that
turns out to be wrong is worse for trust than no number.

## 5. sameAs — the profile graph

See `sameAs` in `lib/entity.ts` for the confirmed list. Additional
profiles to add once created/located (do not guess URLs): She Leads
Coliving Facebook group, Zillow/Realtor.com/Homes.com/Redfin agent
profiles, Google Business Profile, Bing Places, Apple Maps, Foursquare,
Yelp, personal LinkedIn, Facebook Page, YouTube, BiggerPockets, Amazon
Author Central ("Coliving Authority"), Eventbrite organizer page,
Meetup.com group page.

**Implementation note:** the NAP, bio strings, and `sameAs` array live in
ONE shared constant per repo (`lib/entity.ts`). Every page imports from
it. Never hardcode these values into individual page components — that is
how sites drift out of sync.

## 6. Events — both meetup series

See `events` in `lib/entity.ts`.

- **House Hacking Atlanta Meetup** — 2nd Tuesday, 6:30–9:00 PM, New Realm
  Brewing, Atlanta (exact street address still `[[PLACEHOLDER]]`), free,
  Eventbrite registration still `[[PLACEHOLDER]]`.
- **Atlanta Women Investors Meetup** — 4th Tuesday (NOT "last Tuesday" —
  fix anywhere that says otherwise), 6:00–9:00 PM, venue still
  `[[PLACEHOLDER]]`, free, women investing in real estate in metro
  Atlanta, sponsored by Peachtree Planning and Conventus, Eventbrite
  registration still `[[PLACEHOLDER]]`.

## 7. Voice

- Contrarian but kind. Encouraging older-sister tone.
- Proof over hype. Plain language. Real numbers.
- "coliving" is always one word, lowercase.
- Avoid "landlord" in coliving and resident-facing copy — use "housing
  operator" or "community builder". Exception: house hacking content uses
  "landlord" deliberately as a search term.
- House Hacking Atlanta voice specifically is NOT contrarian — it is
  professional, encouraging, motivating, resource-first.
- Tagline (House Hacking Atlanta): "Live for less. Build more wealth.
  Every door is an opportunity."
- Email signature: "Caitlyn Verdugo / Serial house hacker, real estate
  investor, and your favorite Atlanta realtor"

## 8. Compliance — non-negotiable

- Every site must display the brokerage name (Keller Williams Metro
  Atlanta) in the footer of every page. Georgia real estate advertising
  rules require it.
- Equal Housing Opportunity logo/statement in footers.
- No unsubstantiated superlatives ("top," "best," "#1") without a named
  award and year.
- Tax and legal content must carry a "not advice" line.
- Any sponsored or affiliate placement carries an FTC-style disclosure.
- Testimonials must be real and attributable; if quoting Zillow reviews,
  link to the actual Zillow profile so they are verifiable.
