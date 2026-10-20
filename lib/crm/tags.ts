// Tag rules for rent-ledger leads (build spec section 13). "Above the city
// median" is measured against the host's metro.

export type OperatorType = "owner" | "arbitrage" | "both" | "pm";

export interface TagInput {
  city?: string;
  metro?: string;
  operatorType?: string;
  houseCount?: number;
  consentContact: boolean;
  interests: { selling?: boolean; buying?: boolean; partnering?: boolean; help?: boolean };
  breakagePerHouseMonth?: number | null;
  turnover?: number | null;
  /** Metro medians, when the metro has enough houses to show a benchmark. */
  cityMedian?: { breakagePerHouseMonth?: number | null; turnover?: number | null } | null;
}

export const slug = (s: string) =>
  s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function leadTags(t: TagInput): string[] {
  const tags = new Set<string>(["rent-ledger-user"]);
  const houses = t.houseCount ?? 0;
  const aboveCity = (mine?: number | null, city?: number | null) =>
    mine != null && city != null && mine > city;
  const breakageAbove = aboveCity(t.breakagePerHouseMonth, t.cityMedian?.breakagePerHouseMonth);
  const turnoverAbove = aboveCity(t.turnover, t.cityMedian?.turnover);

  if (t.consentContact) {
    if (t.interests.selling || (houses >= 3 && breakageAbove)) tags.add("seller-lead");
    if (t.interests.buying) tags.add("buyer-lead");
    if (t.interests.partnering || houses >= 5) tags.add("partner-lead");
  }
  if (t.interests.help || breakageAbove || turnoverAbove) tags.add("coaching-lead");

  if (t.operatorType === "owner") tags.add("owner");
  if (t.operatorType === "arbitrage") tags.add("arbitrage");
  if (t.operatorType === "both") {
    tags.add("owner");
    tags.add("arbitrage");
  }
  if (t.operatorType === "pm") tags.add("pm");
  if (t.city && slug(t.city)) tags.add(`city-${slug(t.city)}`);
  if (t.metro && slug(t.metro)) tags.add(`metro-${slug(t.metro)}`);
  return [...tags];
}
