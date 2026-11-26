// The Audit Terms leads agree to on the intake page. Bump TERMS_VERSION
// whenever the wording changes: each lead record stores the version and
// time they agreed.

export const TERMS_VERSION = "2026-11-26";

export const AUDIT_TERMS: { title: string; body: string }[] = [
  {
    title: "What this is",
    body: "The Coliving Portfolio Performance Audit is an operational review of the data you provide. Findings and recommendations are for informational purposes only. They are not legal, tax, accounting, lending, insurance or investment advice. Talk to the right professional before acting on anything that needs one.",
  },
  {
    title: "Your decisions",
    body: "You decide whether and how to act on any recommendation, including changes to vendors, property managers, pricing, financing or ownership. Estimated savings are projections based on your historical data, not guarantees of future results.",
  },
  {
    title: "Your data",
    body: "The audit relies on the information you provide. You confirm you have the right to share it. Results may be incomplete or inaccurate if the data is.",
  },
  {
    title: "PadSplit access",
    body: "If you add me to your PadSplit account, I'll only view data needed for the audit and won't make changes. You can remove my access anytime, and I recommend doing so once your report is delivered.",
  },
  {
    title: "Privacy",
    body: "Your files are stored privately and are used only to prepare your audit. I won't share your personal information, addresses or member information. I may use anonymized findings (no names, addresses or other identifying details) in examples and educational content.",
  },
  {
    title: "Money-back guarantee",
    body: "If the audit doesn't identify at least $500 a year in potential savings per house, you can request a full refund of the audit fee within 30 days of receiving your report. The refund is the only remedy under the guarantee.",
  },
  {
    title: "Limit of liability",
    body: "To the extent allowed by law, my total liability for anything related to the audit is limited to the fee you paid for it.",
  },
];
