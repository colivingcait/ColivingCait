import { notFound, redirect } from "next/navigation";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import { getCurrentUser } from "@/lib/auth/helpers";
import { ADMIN_HOUSE_COLUMNS, loadAdminData } from "@/lib/rent-ledger/admin";
import { isAdminEmail } from "@/lib/rent-ledger/server";

export const metadata = {
  title: "Rent Ledger Hosts",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

const pct = (v: unknown) => (v == null ? "–" : `${(Number(v) * 100).toFixed(1)}%`);
const money = (v: unknown) => (v == null ? "–" : `$${Math.round(Number(v)).toLocaleString()}`);
const FORMAT: Record<string, (v: unknown) => string> = {
  collection_rate: pct,
  breakage_rate: pct,
  left_owing_rate: pct,
  acceptance_rate: pct,
  occupancy_avg: pct,
  collected_per_house_month: money,
  breakage_per_house_month: money,
  median_balance: money,
  true_room_rate: money,
  avg_stay_days: (v) => (v == null ? "–" : String(Math.round(Number(v)))),
  created_at: (v) => String(v ?? "").slice(0, 10),
};
const show = (k: string, v: unknown) => (FORMAT[k] ? FORMAT[k](v) : v == null || v === "" ? "–" : String(v));

// Caitlyn's view of every host who unlocked a report: who they are, what
// they said they're interested in, and each house's address and numbers.
export default async function RentLedgerAdminPage({ searchParams }: { searchParams: { metro?: string } }) {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/signin?callbackUrl=/tools/rent-ledger/admin");
  if (!isAdminEmail(user.email)) notFound();

  const metro = searchParams.metro?.trim() || null;
  const { list, metros } = await loadAdminData(metro);
  const houseTotal = list.reduce((a, x) => a + x.houses.length, 0);

  return (
    <Section tone="cream">
      <p className="eyebrow">Admin · Read your rent ledger</p>
      <Heading level={1} size="md" className="text-charcoal mb-6">
        Hosts and their houses.
      </Heading>
      <form className="flex flex-wrap items-center gap-3 mb-6 text-sm">
        <select name="metro" defaultValue={metro ?? ""} className="border border-brand bg-white px-2 py-1.5">
          <option value="">All metros</option>
          {metros.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <button type="submit" className="btn-outline !py-2 !px-4">Filter</button>
        <a href={`/api/rent-ledger/admin${metro ? `?metro=${encodeURIComponent(metro)}` : ""}`} className="text-gold-dark underline underline-offset-4">
          Download CSV
        </a>
        <span className="text-warmgray">{list.length} hosts · {houseTotal} houses</span>
      </form>
      <div className="space-y-6">
        {list.map(({ user: u, houses }) => {
          const interests = (
            [
              ["Selling", u.interest_selling],
              ["Buying", u.interest_buying],
              ["Partnering", u.interest_partnering],
              ["Wants help", u.interest_help],
            ] as const
          ).filter(([, v]) => v).map(([l]) => l);
          return (
            <div key={u.id} className="border border-brand bg-white p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-heading text-2xl text-charcoal">
                  {[u.first_name, u.last_name].filter(Boolean).join(" ") || u.email}
                </p>
                <p className="text-sm text-warmgray">
                  <a href={`mailto:${u.email}`} className="underline">{u.email}</a> · {u.metro ?? u.city ?? "–"} ·{" "}
                  {u.operator_type ?? "–"} · {u.house_count ?? "?"} houses · contact {u.consent_contact ? "OK" : "not OK"}
                  {interests.length ? ` · ${interests.join(", ")}` : ""}
                </p>
              </div>
              {houses.length ? (
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-brand text-left text-warmgray">
                        {ADMIN_HOUSE_COLUMNS.map(([k, l]) => (
                          <th key={k} className="px-2 py-1.5 font-medium whitespace-nowrap">{l}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {houses.map((h) => (
                        <tr key={h.house_hash} className="border-b border-soft">
                          {ADMIN_HOUSE_COLUMNS.map(([k]) => (
                            <td key={k} className="px-2 py-1.5 text-charcoal whitespace-nowrap tabular-nums">
                              {show(k, h[k])}
                              {k === "created_at" && h.snapshots > 1 ? ` (${h.snapshots})` : ""}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="mt-3 text-sm text-warmgray">No houses saved yet (unlocked but hasn&apos;t opened the report).</p>
              )}
            </div>
          );
        })}
        {!list.length && <p className="text-warmgray">No hosts yet.</p>}
      </div>
    </Section>
  );
}
