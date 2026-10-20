// Tiny hand-written exports for rule tests. Summary and earnings_table rows
// are derived from the collected rows so the tie check passes by default.

import type { RawFiles } from "@/lib/rent-ledger/parse";

export interface B {
  id: string;
  day: string;
  mid: string;
  amount: number;
  type: "fee" | "fine" | "concession";
  reason: string;
  pid?: string;
  room?: string;
}

export interface C {
  day: string;
  bill: string;
  mid: string;
  gross: number;
  pid?: string;
  billType?: string;
  room?: string;
}

const cell = (v: unknown) => {
  const s = String(v ?? "");
  return /[",]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const csv = (headers: string[], rows: Array<Record<string, string | number>>) =>
  [headers.join(","), ...rows.map((r) => headers.map((h) => cell(r[h])).join(","))].join("\n");

export const PID = "1001";

/** Weekly dues paid on time from `start` for `weeks` weeks. */
export function steadyResident(mid: string, start: string, weeks: number, price = 200, pid = PID) {
  const billed: B[] = [];
  const collected: C[] = [];
  const d0 = Date.parse(start);
  for (let w = 0; w < weeks; w++) {
    const day = new Date(d0 + w * 7 * 86_400_000).toISOString().slice(0, 10);
    const id = `${mid}-${w}`;
    billed.push({ id, day, mid, amount: -price, type: "fee", reason: "membership_dues", pid });
    collected.push({ day, bill: id, mid, gross: price, pid });
  }
  return { billed, collected };
}

export function buildExport(
  billed: B[],
  collected: C[],
  opts: { inFlight?: string; tamperPayout?: number } = {},
): RawFiles {
  const billedRows = billed.map((b) => ({
    "Bill ID": b.id,
    Created: b.day,
    "Street 1": `${b.pid ?? PID} Test St`,
    "Room Number": b.room ?? "1",
    "Property ID": b.pid ?? PID,
    "Room ID": `${b.pid ?? PID}-${b.room ?? "1"}`,
    "Member ID": b.mid,
    "Member First Name": `First${b.mid}`,
    "Member Last Name": "Test",
    Amount: b.amount,
    "Transaction Type": b.type,
    "Transaction Reason": b.reason,
  }));
  const collectedRows = collected.map((c) => ({
    Created: c.day,
    "Payout Month": c.day.slice(0, 7),
    "Property ID": c.pid ?? PID,
    "Room ID": `${c.pid ?? PID}-${c.room ?? "1"}`,
    "Member ID": c.mid,
    "Bill ID": c.bill,
    "Bill Type": c.billType ?? "Membership Dues",
    "Gross Collected": c.gross,
    "Host Earnings": c.gross,
    Category: "collected",
  }));

  const byHM = new Map<string, number>();
  for (const c of collectedRows) {
    const k = `${c["Property ID"]}|${c["Payout Month"]}`;
    byHM.set(k, (byHM.get(k) ?? 0) + Number(c["Gross Collected"]));
  }
  const summary = [...byHM].map(([k, g]) => {
    const [pid, m] = k.split("|");
    return {
      "Earnings Month": m,
      PSID: pid,
      Address: `${pid} Test St, Atlanta, GA`,
      State: "GA",
      "Gross Collected": g,
      "Booking Fees Amount": 0,
      "Transaction Fee": 0,
      "Service Fees": 0,
      "Host Earnings": g,
      Adjustments: 0,
      "Total Payout": g,
    };
  });
  const months = [...new Set(summary.map((s) => s["Earnings Month"]))].sort();
  const inFlight = opts.inFlight ?? months[months.length - 1];
  const earnings = months.map((m) => {
    const g = summary.filter((s) => s["Earnings Month"] === m).reduce((a, s) => a + s["Gross Collected"], 0);
    return {
      row_type: "month",
      month: m,
      is_in_flight: m === inFlight ? "True" : "False",
      total_collections: g,
      total_expenses: 0,
      total_adjustments: 0,
      total_payout: g + (opts.tamperPayout && m === months[0] ? opts.tamperPayout : 0),
    };
  });

  return {
    billed: csv(
      ["Bill ID", "Created", "Street 1", "Room Number", "Property ID", "Room ID", "Member ID", "Member First Name", "Member Last Name", "Amount", "Transaction Type", "Transaction Reason"],
      billedRows,
    ),
    collected: csv(
      // Stray spaces, like PadSplit's real headers.
      [" Created", "Payout Month ", "Property ID", "Room ID", "Member ID", "Bill ID", " Bill Type ", "Gross Collected", "Host Earnings", "Category"],
      collectedRows.map((r) => ({ ...r, " Created": r.Created, "Payout Month ": r["Payout Month"], " Bill Type ": r["Bill Type"] })),
    ),
    summary: csv(
      ["Earnings Month", "PSID", "Address", "State", "Gross Collected", "Booking Fees Amount", "Transaction Fee", "Service Fees", "Host Earnings", "Adjustments", "Total Payout"],
      summary,
    ),
    earnings: csv(
      ["row_type", "month", "is_in_flight", "total_collections", "total_expenses", "total_adjustments", "total_payout"],
      earnings,
    ),
  };
}
