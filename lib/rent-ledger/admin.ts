import { supabase } from "@/lib/supabase";
import type { SnapshotRow } from "./benchmarks";

// Caitlyn's admin data: every host with the newest snapshot of each of
// their houses, addresses included. Server-only; callers must check
// isAdminEmail() first.

export interface AdminUser {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  city: string | null;
  state: string | null;
  metro: string | null;
  operator_type: string | null;
  house_count: number | null;
  consent_contact: boolean | null;
  interest_selling: boolean | null;
  interest_buying: boolean | null;
  interest_partnering: boolean | null;
  interest_help: boolean | null;
  created_at: string;
}

export type AdminHouse = SnapshotRow & { house_address: string | null; snapshots: number };

export async function loadAdminData(metro?: string | null) {
  const [{ data: users, error: ue }, { data: snaps, error: se }] = await Promise.all([
    supabase.from("rl_users").select("*").order("created_at", { ascending: false }),
    supabase.from("rl_house_snapshots").select("*").order("created_at", { ascending: false }),
  ]);
  if (ue) throw ue;
  if (se) throw se;

  // Newest snapshot per house per user, with how many snapshots it has.
  const latest = new Map<string, AdminHouse>();
  for (const s of (snaps ?? []) as AdminHouse[]) {
    const k = `${s.user_id}|${s.house_hash}`;
    const cur = latest.get(k);
    if (cur) cur.snapshots++;
    else latest.set(k, { ...s, snapshots: 1 });
  }
  const houses = [...latest.values()].filter(
    (h) => !metro || (h.metro ?? "").toLowerCase() === metro.toLowerCase(),
  );
  const byUser = new Map<string, AdminHouse[]>();
  for (const h of houses) byUser.set(h.user_id, [...(byUser.get(h.user_id) ?? []), h]);

  const list = ((users ?? []) as AdminUser[])
    .filter((u) => !metro || byUser.has(u.id) || (u.metro ?? "").toLowerCase() === metro.toLowerCase())
    .map((u) => ({ user: u, houses: byUser.get(u.id) ?? [] }));
  const metros = [...new Set([...latest.values()].map((h) => h.metro).filter(Boolean) as string[])].sort();
  return { list, metros };
}

export const ADMIN_HOUSE_COLUMNS: Array<[string, string]> = [
  ["house_address", "Address"],
  ["metro", "Metro"],
  ["zip", "Zip"],
  ["rooms", "Rooms"],
  ["price_band", "Price band"],
  ["months_covered", "Months"],
  ["collected_per_house_month", "Collected / house-month"],
  ["collection_rate", "Collection rate"],
  ["breakage_rate", "Breakage rate"],
  ["breakage_per_house_month", "Breakage / house-month"],
  ["move_outs", "Move-outs"],
  ["left_owing_rate", "Left owing"],
  ["median_balance", "Median balance"],
  ["avg_stay_days", "Avg stay (days)"],
  ["acceptance_rate", "Acceptance"],
  ["occupancy_avg", "Occupancy"],
  ["true_room_rate", "True room rate"],
  ["months_to_stabilize", "Months to stabilize"],
  ["events_per_year", "Events / year"],
  ["created_at", "Snapshot"],
];
