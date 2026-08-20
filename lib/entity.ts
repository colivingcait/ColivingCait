// Single source of truth for Caitlyn Verdugo's name/address/phone, bios,
// service area, identity stack, and profile graph (sameAs). Sourced from
// the SHARED ENTITY FACTS doc (see ENTITY-FACTS.md at the repo root).
// Every page should import from here rather than hardcoding these values —
// that's how the site and its sister site (House Hacking Atlanta) stay in
// sync with each other and with third-party listings (KW, Google, Zillow…).
//
// [[PLACEHOLDER]] values below are copied verbatim from the source doc and
// must not be invented. See ENTITY-FACTS.md for the full placeholder list.

export const nap = {
  name: "Caitlyn Verdugo",
  title: "REALTOR® | Investor",
  brokerage: "Keller Williams Metro Atlanta",
  marketCenter: "Keller Williams Realty Metro Atlanta, Decatur, GA",
  license: "Georgia Real Estate License #414610",
  address: "101 W Ponce De Leon STE 200, Decatur GA 30030",
  phone: "(678) 884-4494",
  email: "Caitlyn@CallCaitlyn.com",
  primaryWeb: "https://www.househackingatl.com",
  kwProfile: "https://kw.com/agent/caitlyn-verdugo/811213",
  kwProfileAlt: "https://caitlynverdugo.kw.com",
} as const;

// Directory-listing display name (Google Business Profile, Bing Places,
// Apple Business Connect, Foursquare, Yelp). Do not add keywords like
// "House Hacking" to this — it risks listing suspension.
export const directoryDisplayName = "Caitlyn Verdugo, REALTOR® - Keller Williams Metro Atlanta";

export const serviceArea = {
  primary: ["Decatur, GA", "East Atlanta, GA"],
  coreNeighborhoods: [
    "East Atlanta Village",
    "Kirkwood",
    "Edgewood",
    "Ormewood Park",
    "East Lake",
    "Oakhurst",
    "Avondale Estates",
    "Candler Park",
    "Grant Park",
    "Reynoldstown",
  ],
  broader: ["City of Atlanta", "DeKalb County", "metro Atlanta"],
} as const;

// The identity stack — fixed priority order. Applies to bios, meta
// descriptions, schema jobTitle/description, hero eyebrows, badge strips,
// and "ways to work with me" card ordering. Does NOT apply to knowledge-base
// articles / blog posts / neighborhood pages, which should lead with the
// answer to the reader's question, not with credentials.
export const identityStack = [
  "REALTOR",
  "Investor",
  "Operator",
  "Women's Community Leader",
  "Coach",
] as const;

// Bios — third person, written verbatim from the source doc.
export const bio = {
  short:
    "Caitlyn Verdugo is a licensed Georgia REALTOR® with Keller Williams Realty Metro Atlanta serving Decatur and Atlanta, GA. She also owns and operates coliving homes across the metro, co-founds women's real estate communities, and invests in rental property. She specializes in house hacking, coliving and small multifamily.",
  medium:
    "Caitlyn Verdugo is a licensed Georgia REALTOR® with Keller Williams Realty Metro Atlanta, serving buyers and sellers throughout Decatur and east Atlanta. She works with first-time buyers, move-up sellers, and investors, and specializes in house hacking, small multifamily, and rent-by-the-room conversions.\n\nShe is also a coliving operator, sourcing, converting, and running a portfolio of shared homes across the Atlanta metro through Lustra House LLC. She co-founded Atlanta Women Investors, a monthly meetup for women building wealth through real estate, and She Leads Coliving, a community of more than 500 women; she also founded the first Women's Coliving Summit in 2025.\n\nCaitlyn bought her first house hack in 2022, co-authored \"Coliving Authority,\" and founded House Hacking Atlanta. She hosts two free monthly real estate meetups in Atlanta and takes on a small number of one-on-one coaching clients.",
} as const;

export const emailSignature =
  "Caitlyn Verdugo / Serial house hacker, real estate investor, and your favorite Atlanta realtor";

// sameAs — the profile graph. Only URLs that resolve belong here; a 404 or
// placeholder actively hurts. Add entries from the TO-ADD list in
// ENTITY-FACTS.md once each profile is created/located — never guess a URL.
export const sameAs = [
  "https://kw.com/agent/caitlyn-verdugo/811213",
  "https://caitlynverdugo.kw.com",
  "https://www.facebook.com/caitlynverdugorealtor",
  "https://www.linkedin.com/in/caitlyn-verdugo-realtor/",
  "https://www.instagram.com/colivingcait/",
  "https://www.househackingatl.com",
  "https://www.colivingcait.com",
  "https://www.atlantawomeninvestors.com",
  "https://facebook.com/groups/househackingatl",
] as const;

// Events — both meetup series.
export const events = {
  houseHackingAtlanta: {
    name: "House Hacking Atlanta Meetup",
    cadence: "2nd Tuesday of every month",
    time: "6:30 PM – 9:00 PM",
    venue: "New Realm Brewing, Atlanta",
    // [[PLACEHOLDER]] exact venue street address for Event schema
    venueAddress: "[[PLACEHOLDER]]",
    cost: "Free to attend",
    // [[PLACEHOLDER]] Eventbrite URL
    registrationUrl: "[[PLACEHOLDER]]",
  },
  atlantaWomenInvestors: {
    name: "Atlanta Women Investors Meetup",
    cadence: "4th Tuesday of every month",
    time: "6:00 PM – 9:00 PM",
    // [[PLACEHOLDER]] venue + address
    venue: "[[PLACEHOLDER]]",
    cost: "Free to attend",
    audience: "Women investing in real estate in metro Atlanta",
    sponsors: ["Peachtree Planning", "Conventus"],
    // [[PLACEHOLDER]] Eventbrite URL
    registrationUrl: "[[PLACEHOLDER]]",
  },
} as const;

export const brands = {
  houseHackingAtlanta: "House Hacking Atlanta",
  colivingCait: "ColivingCait",
  atlantaWomenInvestors: "Atlanta Women Investors",
} as const;
