import type { Ledger } from "./classify";

// Metros for benchmarks. Each house's metro starts from the export's
// "PadSplit Market" column and the user can correct it on the unlock form.

export const METROS = [
  "Atlanta",
  "Austin",
  "Birmingham",
  "Charlotte",
  "Dallas–Fort Worth",
  "Houston",
  "Indianapolis",
  "Jacksonville",
  "Kansas City",
  "Las Vegas",
  "Memphis",
  "Nashville",
  "Orlando",
  "Phoenix",
  "San Antonio",
  "St. Louis",
  "Tampa",
] as const;

const ALIASES: Array<[RegExp, string]> = [
  [/dallas|fort worth|dfw/i, "Dallas–Fort Worth"],
  [/tampa|st\.? petersburg|clearwater/i, "Tampa"],
  [/saint louis|st\.? louis/i, "St. Louis"],
];

/** "atlanta, ga" -> "Atlanta"; unknown markets are title-cased as-is. */
export function normalizeMetro(raw: string | null | undefined): string | null {
  const s = (raw ?? "").trim();
  if (!s) return null;
  for (const [re, metro] of ALIASES) if (re.test(s)) return metro;
  const known = METROS.find((m) => s.toLowerCase().includes(m.toLowerCase()));
  if (known) return known;
  return s
    .split(",")[0]
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Most common PadSplit Market per house, normalized to a metro. */
export function houseMetros(ledger: Ledger): Record<string, string> {
  const counts = new Map<string, Map<string, number>>();
  for (const b of ledger.data.billed) {
    const metro = normalizeMetro(b.market);
    if (!metro) continue;
    const house = ledger.propertyToHouse.get(b.propertyId) ?? b.propertyId;
    const m = counts.get(house) ?? new Map<string, number>();
    m.set(metro, (m.get(metro) ?? 0) + 1);
    counts.set(house, m);
  }
  const out: Record<string, string> = {};
  for (const [house, m] of counts) out[house] = [...m].sort((a, b) => b[1] - a[1])[0][0];
  return out;
}
