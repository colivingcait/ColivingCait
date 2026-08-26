// Tag-name constants. Formerly drove a live ConvertKit integration (now
// replaced by Caitlyn's CRM - see lib/crm.ts); kept as plain strings here
// since every form/tracker on the site still reference these names as CRM
// tags, and renaming them would mean re-teaching Caitlyn's existing CRM
// tag-based sequences under new names for no real benefit.

export const CK_TAGS = {
  // Lead magnets
  COLIVING_STARTER_GUIDE_DOWNLOADED: "coliving-starter-guide-downloaded",
  COLIVING_CHECKLIST_DOWNLOADED: "coliving-checklist-downloaded",
  COLIVING_MISTAKES_DOWNLOADED: "coliving-mistakes-downloaded",
  HOUSE_HACKING_PLAYBOOK_DOWNLOADED: "house-hacking-playbook-downloaded",
  ATLANTA_GUIDE_DOWNLOADED: "atlanta-guide-downloaded",

  // Page visits — tagged when a known subscriber lands on a page
  COACHING_PAGE_VISITED: "coaching-page-visited",
  PARTNER_PAGE_VISITED: "partner-page-visited",
  BUY_SELL_PAGE_VISITED: "buy-sell-page-visited",
  WHAT_IS_COLIVING_VISITED: "what-is-coliving-visited",

  // Audience signals
  COACHING_INTERESTED: "coaching-interested",
  PASSIVE_INVESTOR: "passive-investor",
  BUYER_LEAD: "buyer-lead",
  SELLER_LEAD: "seller-lead",
  HOUSE_HACKER_LEAD: "house-hacker-lead",
  COMMUNITY_MEMBER: "community-member",
  CONTACT_FORM_SUBMITTED: "contact-form-submitted",
  MEETUP_INTERESTED: "meetup-interested",
  SHE_LEADS_INTERESTED: "she-leads-interested",
  MEDIA_INQUIRY: "media-inquiry",

  // Calculator
  COLIVING_CALCULATOR_USED: "coliving-calculator-used",
  HOUSE_HACKING_CALCULATOR_USED: "house-hacking-calculator-used",
  DSCR_CALCULATOR_USED: "dscr-calculator-used",
  COLIVING_DEAL_STRONG: "coliving-deal-strong",
  COLIVING_DEAL_MARGINAL: "coliving-deal-marginal",
  COLIVING_DEAL_WEAK: "coliving-deal-weak",

  // Course purchases / completions (forward-looking; wired with Stripe)
  COLIVING_101_PURCHASED: "coliving-101-purchased",
  COLIVING_101_COMPLETED: "coliving-101-completed",
  HOUSE_HACKING_101_PURCHASED: "house-hacking-101-purchased",
  HOUSE_HACKING_101_COMPLETED: "house-hacking-101-completed",
  REAL_ESTATE_101_PURCHASED: "real-estate-101-purchased",
  REAL_ESTATE_101_COMPLETED: "real-estate-101-completed",
} as const;

export type CKTagName = (typeof CK_TAGS)[keyof typeof CK_TAGS];
