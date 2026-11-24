// House-count options on the /audit form, and the price wording shared by
// the "You're in" screen, emails and notifications.

export const HOUSE_OPTIONS = ["1", "2", "3", "4", "5", "6-10", "11+"] as const;
export type HouseCount = (typeof HOUSE_OPTIONS)[number];

export const PRICE_PER_HOUSE = 500;
export const ZELLE_TO = "velloraconsulting@gmail.com";

export const isHouseCount = (v: string): v is HouseCount =>
  (HOUSE_OPTIONS as readonly string[]).includes(v);

/** "1 house", "3 houses", "6–10 houses", "11+ houses". */
export function housesLabel(h: HouseCount) {
  if (h === "1") return "1 house";
  return `${h.replace("-", "–")} houses`;
}

/** Billable house count: 6–10 quotes the low end, 11+ is a custom quote (0). */
export function billableHouses(h: HouseCount) {
  if (h === "11+") return 0;
  if (h === "6-10") return 6;
  return Number(h);
}

export const money = (n: number) => `$${n.toLocaleString("en-US")}`;

/** Total in dollars, or null for a custom quote. */
export function auditTotal(h: HouseCount) {
  const n = billableHouses(h);
  return n ? n * PRICE_PER_HOUSE : null;
}

export const zelleMemo = (name: string) => `${name} Audit`;
