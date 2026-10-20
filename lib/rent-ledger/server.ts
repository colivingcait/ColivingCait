import { createHash } from "node:crypto";
import { supabase } from "@/lib/supabase";
import { latestPerHouse, type SnapshotRow } from "./benchmarks";
import { RULES, RULES_VERSION } from "./rules";
import { median } from "./stats";

// Server-only helpers for the rent-ledger API routes. Never import from a
// client component: this pulls in the service-role Supabase client.

/** SHA-256 of the PSID with a server-side salt, so houses dedupe without storing the PSID. */
export function houseHash(psid: string): string {
  const salt = process.env.RENT_LEDGER_HASH_SALT;
  if (!salt) throw new Error("RENT_LEDGER_HASH_SALT is not set");
  return createHash("sha256").update(`${psid.trim()}|${salt}`).digest("hex");
}

export async function loadSnapshots(): Promise<SnapshotRow[]> {
  const { data, error } = await supabase.from("rl_house_snapshots").select("*");
  if (error) throw error;
  return latestPerHouse((data ?? []) as SnapshotRow[], RULES_VERSION);
}

/** City medians used for lead tags, only when the city meets the benchmark minimum. */
export async function cityMedians(city?: string, state?: string) {
  if (!city) return null;
  try {
    const rows = (await loadSnapshots()).filter(
      (r) =>
        (r.city ?? "").trim().toLowerCase() === city.trim().toLowerCase() &&
        (!state || (r.state ?? "").trim().toLowerCase() === state.trim().toLowerCase()),
    );
    const users = new Set(rows.map((r) => r.user_id)).size;
    if (users < RULES.benchmarkMinUsers || rows.length < RULES.benchmarkMinHouses) return null;
    const col = (k: string) => rows.map((r) => Number(r[k])).filter(Number.isFinite);
    const turnover = rows
      .map((r) => Number(r.move_outs) / Number(r.months_covered))
      .filter(Number.isFinite);
    return {
      breakagePerHouseMonth: median(col("breakage_per_house_month")),
      turnover: median(turnover),
    };
  } catch (err) {
    console.error("[rent-ledger] city medians unavailable", err);
    return null;
  }
}

export const str = (v: unknown, max = 120) =>
  typeof v === "string" ? v.trim().slice(0, max) : undefined;

export const num = (v: unknown) => {
  const n = typeof v === "number" ? v : typeof v === "string" ? Number(v) : NaN;
  return Number.isFinite(n) ? n : undefined;
};

export const bool = (v: unknown) => (typeof v === "boolean" ? v : undefined);
