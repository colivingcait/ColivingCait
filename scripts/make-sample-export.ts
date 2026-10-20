// Builds a fake PadSplit earnings export (made-up houses, names and IDs) so
// visitors can try the rent-ledger tool without their own file, and so the
// tests have an end-to-end fixture that's safe to commit.
//
//   npx tsx scripts/make-sample-export.ts
//
// writes public/samples/rent-ledger-sample.zip. Output is deterministic.

import JSZip from "jszip";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const DAY = 86_400_000;
const START = Date.UTC(2025, 0, 1) / DAY;
const END = Date.UTC(2026, 9, 20) / DAY;
const IN_FLIGHT = "2026-10";

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const iso = (day: number) => new Date(day * DAY).toISOString().slice(0, 10);
const month = (day: number) => iso(day).slice(0, 7);
const stamp = (day: number, r: () => number) =>
  `${iso(day)} ${String(8 + Math.floor(r() * 12)).padStart(2, "0")}:${String(Math.floor(r() * 60)).padStart(2, "0")}:00`;
const r2 = (n: number) => Math.round(n * 100) / 100;

const FIRST = ["Avery", "Jordan", "Riley", "Morgan", "Casey", "Quinn", "Reese", "Skyler", "Dakota", "Rowan", "Emerson", "Parker", "Hayden", "Sage", "Jules", "Marlow", "Kendall", "Tatum", "Lane", "Remy", "Shay", "Blair", "Ellis", "Noel"];
const LAST = ["Holloway", "Prescott", "Vance", "Whitaker", "Calloway", "Beckett", "Sterling", "Ashby", "Merritt", "Langley", "Thornton", "Kingsley", "Fairbanks", "Winslow", "Hartley", "Lockwood", "Pembrook", "Radley", "Sutton", "Garrison"];

interface HouseDef {
  psid: string;
  street: string;
  city: string;
  zip: string;
  rooms: number;
  basePrice: number;
  startDay: number;
  shockDay?: number;
}

const HOUSES: HouseDef[] = [
  { psid: "90411", street: "1412 Magnolia Bend Dr", city: "Decatur", zip: "30032", rooms: 7, basePrice: 205, startDay: START },
  { psid: "90527", street: "88 Willow Crest Ln", city: "Stone Mountain", zip: "30083", rooms: 6, basePrice: 190, startDay: START, shockDay: Date.UTC(2026, 4, 4) / DAY },
  { psid: "90688", street: "2730 Pecan Hollow Ct", city: "Lithonia", zip: "30058", rooms: 8, basePrice: 180, startDay: START },
  { psid: "91032", street: "415 Juniper Ridge Way", city: "Tucker", zip: "30084", rooms: 6, basePrice: 220, startDay: Date.UTC(2025, 5, 2) / DAY },
];

type Billed = Record<string, string | number>;
type Collected = Record<string, string | number>;

export function buildSampleFiles(seed = 7): Record<string, string> {
  const r = rng(seed);
  const pick = <T,>(xs: T[]) => xs[Math.floor(r() * xs.length)];
  const between = (a: number, b: number) => a + Math.floor(r() * (b - a + 1));

  const billed: Billed[] = [];
  const collected: Collected[] = [];
  let billSeq = 500000;
  let damaged = false;
  let memberSeq = 70000;

  const SERVICE = 0.1;
  const TXN = 0.01;

  for (const h of HOUSES) {
    const base = {
      street: h.street,
      market: "Atlanta",
    };
    const bill = (
      day: number,
      p: { pid: string; roomId: string; room: string; mid: string; first: string; last: string },
      amount: number,
      type: string,
      reason: string,
    ) => {
      const id = `${++billSeq}`;
      billed.push({
        "Bill ID": id,
        Created: stamp(day, r),
        "Street 1": base.street,
        "Street 2": "",
        "Room Number": p.room,
        "Property ID": p.pid,
        "Room ID": p.roomId,
        "Member ID": p.mid,
        "PadSplit Market": base.market,
        "Member First Name": p.first,
        "Member Last Name": p.last,
        Amount: r2(amount).toFixed(2),
        "Transaction Type": type,
        "Transaction Reason": reason,
        Comments: "",
        Category: type === "concession" ? "Concession" : type === "fine" ? "Fine" : "Fee",
        "Gross Collected": "",
        "Booking Fee Amount": "",
        "Service Fee Rate": SERVICE,
        "Booking Fee Days": 7,
        "Transaction Fee Rate": TXN,
      });
      return id;
    };
    const pay = (
      day: number,
      p: { pid: string; roomId: string; room: string; mid: string; first: string; last: string },
      billId: string,
      billType: string,
      gross: number,
      bookingFee = 0,
    ) => {
      const service = r2(gross * SERVICE);
      const txn = r2(gross * TXN);
      const m = month(day);
      collected.push({
        Created: stamp(day, r),
        "Payout Month": m === IN_FLIGHT ? "" : m,
        "Property ID": p.pid,
        "Street 1": base.street,
        "Street 2": "",
        "Room Number": p.room,
        "Room ID": p.roomId,
        "Member ID": p.mid,
        "PadSplit Market": base.market,
        "Member First Name": p.first,
        "Member Last Name": p.last,
        "Booking Fee Days": 7,
        "Service Fee Rate": SERVICE,
        "Transaction Fee Rate": TXN,
        "Bill ID": billId,
        "Bill Type": billType,
        "Gross Collected": r2(gross).toFixed(2),
        "Booking Fee Amount": r2(bookingFee).toFixed(2),
        "Collections Net of Booking Fees": r2(gross - bookingFee).toFixed(2),
        "Service Fees": service.toFixed(2),
        "Txn Fees": txn.toFixed(2),
        "Total Fees": r2(bookingFee + service + txn).toFixed(2),
        "Host Earnings": r2(gross - bookingFee - service - txn).toFixed(2),
        Category: "collected",
      });
    };

    for (let room = 1; room <= h.rooms; room++) {
      const roomId = `${h.psid}${String(room).padStart(2, "0")}`;
      const price = h.basePrice + between(-3, 5) * 5;
      // Running houses start full; the new house fills over its first weeks.
      let day = h.startDay === START ? START - between(20, 200) : h.startDay + between(0, 55);
      let firstStay = h.startDay === START;

      while (day <= END) {
        const person = () => ({
          pid: h.psid,
          roomId,
          room: String(room),
          mid: `${++memberSeq}`,
          first: pick(FIRST),
          last: pick(LAST),
        });

        // Declined or cancelled booking requests before the move-in.
        if (!firstStay) {
          const declined = r() < 0.55 ? between(1, 2) : 0;
          for (let i = 0; i < declined; i++) {
            const d = day - between(1, 6);
            if (d <= START) continue;
            const p = person();
            const id = bill(d, p, -price, "fee", "membership_dues");
            pay(d, p, id, "Membership Dues", price);
            const refund = Math.min(END, d + between(1, 3));
            bill(refund, p, price, "concession", "waiving_membership_dues");
            pay(refund, p, id, "Membership Dues", -price);
          }
        }

        const p = person();
        const kind = r() < 0.55 ? "good" : r() < 0.7 ? "sloppy" : "bad";
        let stay = Math.round(Math.exp(4 + r() * 1.9)); // ~55 to ~365 days
        if (r() < 0.1) stay = between(8, 28);
        let end = day + stay;
        let shocked = false;
        if (h.shockDay && day < h.shockDay && end > h.shockDay && room <= 5) {
          end = h.shockDay + (room - 1) * 5 + between(0, 2);
          shocked = true;
        }

        if (end < START + 7) {
          // Left before the export window.
          firstStay = h.startDay === START;
          day = end + between(3, 24);
          continue;
        }
        const moveIn = Math.max(day, START);
        const billStart = firstStay ? START + ((moveIn - day) % 7) : moveIn;
        let lateRun = 0;
        let lastBill = billStart;
        const defaultFrom = kind === "bad" ? end - between(10, 35) : Infinity;
        let rewarded = false;
        let w = 0;
        const movesOut = end <= END;
        const waiveLast = movesOut && kind !== "bad" && r() < 0.15;

        for (let d = billStart; d <= Math.min(end, END); d += 7, w++) {
          lastBill = d;
          const prorate = w === 0 && !firstStay && r() < 0.5 ? r2(price * between(3, 6) / 7) : price;
          const id = bill(d, p, -prorate, "fee", "membership_dues");
          if (w < 2 && !firstStay && r() < 0.12) {
            const promoId = bill(d, p, r2(prorate * 0.1), "concession", "promo_room_discount");
            void promoId;
          }
          const booking = w === 0 && !firstStay ? r2(prorate * 0.5) : 0;
          const isLast = d + 7 > Math.min(end, END);
          if ((isLast && waiveLast) || (w > 0 && kind !== "bad" && r() < 0.015)) {
            // Waived dues: credited back, never paid.
            bill(Math.min(d + between(0, 4), END), p, prorate, "concession", "waiving_membership_dues");
            continue;
          }
          if (d >= defaultFrom) {
            // Stopped paying: weekly late fees until they leave.
            lateRun++;
            if (d + 7 <= Math.min(end, END)) bill(d + 7, p, -25, "fine", "overdue_balance");
            continue;
          }
          let payDay = d + (kind === "good" ? between(0, 1) : r() < 0.7 ? between(0, 2) : between(4, 12));
          if (payDay > END) continue;
          if (payDay - d > 7) {
            const fee = bill(d + 7, p, -25, "fine", "overdue_balance");
            pay(payDay, p, fee, "Late Fees", 25);
            lateRun++;
          } else lateRun = 0;
          if (kind !== "good" && r() < 0.12 && payDay + 4 <= END) {
            const half = r2(prorate / 2);
            pay(payDay, p, id, "Membership Dues", half, booking);
            pay(payDay + 4, p, id, "Membership Dues", r2(prorate - half));
          } else {
            pay(payDay, p, id, "Membership Dues", prorate, booking);
          }
          if (!rewarded && d - moveIn >= 175 && kind !== "bad" && r() < 0.6) {
            bill(d, p, price, "concession", "stay_reward");
            rewarded = true;
          }
        }

        if (movesOut) {
          // Moved out.
          if (kind === "bad" && h.psid === "90688" && !damaged && lastBill > Date.UTC(2026, 0, 1) / DAY) {
            // One big unpaid damage bill: the sample's balance outlier.
            bill(lastBill, p, -1850, "fine", "property_damage");
            damaged = true;
          }
          if (kind !== "bad" && r() < 0.3) bill(lastBill, p, 40, "concession", "good_move_out_discount");
          if (end - moveIn < 60 && r() < 0.6) {
            const penalty = bill(lastBill, p, -150, "fine", "commitment_break_penalty_v2_host");
            if (kind === "good") pay(Math.min(END, lastBill + 1), p, penalty, "Fines - Other", 150);
          }
          if (kind === "bad" && r() < 0.25 && lastBill + 30 <= END) {
            // Paid a little after leaving.
            const owed = billed.filter((b) => b["Member ID"] === p.mid && b["Transaction Reason"] === "membership_dues").slice(-1)[0];
            if (owed) pay(lastBill + between(20, 30), p, String(owed["Bill ID"]), "Membership Dues", r2(price / 2));
          }
        }

        firstStay = false;
        day = end + (shocked ? between(35, 60) : between(3, 24));
      }
    }
  }

  // Unallocated PadSplit credits (blank Property ID).
  for (const [d, amt] of [[Date.UTC(2026, 0, 15), 250], [Date.UTC(2026, 6, 15), 250], [Date.UTC(2026, 7, 15), 500]] as const) {
    const day = d / DAY;
    collected.push({
      Created: `${iso(day)} 12:00:00`,
      "Payout Month": month(day),
      "Property ID": "",
      "Bill Type": "",
      "Gross Collected": amt.toFixed(2),
      "Host Earnings": amt.toFixed(2),
      Category: "adjustment",
    });
  }

  billed.sort((a, b) => String(a.Created).localeCompare(String(b.Created)));
  collected.sort((a, b) => String(a.Created).localeCompare(String(b.Created)));

  // summary.csv: one row per house per earnings month, built from collected.
  const summary: Array<Record<string, string | number>> = [];
  const months: string[] = [];
  for (let m = month(START); m <= month(END); ) {
    months.push(m);
    const [y, mo] = m.split("-").map(Number);
    m = mo === 12 ? `${y + 1}-01` : `${y}-${String(mo + 1).padStart(2, "0")}`;
  }
  const em = (c: Collected) => String(c["Payout Month"] || String(c.Created).slice(0, 7));
  const earnings: Array<Record<string, string | number>> = [];
  for (const m of months) {
    let tc = 0, te = 0, ta = 0, tp = 0;
    for (const h of HOUSES) {
      const rows = collected.filter((c) => c.Category === "collected" && c["Property ID"] === h.psid && em(c) === m);
      if (!rows.length) continue;
      const s = (k: string) => r2(rows.reduce((a, c) => a + Number(c[k] || 0), 0));
      const gross = s("Gross Collected");
      const booking = s("Booking Fee Amount");
      const service = s("Service Fees");
      const txn = s("Txn Fees");
      const host = r2(gross - booking - service - txn);
      summary.push({
        "Earnings Month": m,
        "Payout Month": m,
        PSID: h.psid,
        Address: `${h.street}, ${h.city}, GA ${h.zip}`,
        State: "GA",
        "Collection Detail Host": "Sample Host LLC",
        "Gross Collected": gross.toFixed(2),
        "Booking Fees Amount": booking.toFixed(2),
        "Collections Net of Booking Fees": r2(gross - booking).toFixed(2),
        "Transaction Fee": txn.toFixed(2),
        "Service Fees": service.toFixed(2),
        "Host Earnings": host.toFixed(2),
        Adjustments: "0.00",
        "Total Payout": host.toFixed(2),
        "Payout Account": "****0000",
      });
      tc += gross;
      te += booking + service + txn;
      tp += host;
    }
    const unalloc = collected
      .filter((c) => c.Category === "adjustment" && em(c) === m)
      .reduce((a, c) => a + Number(c["Gross Collected"]), 0);
    ta += unalloc;
    tp += unalloc;
    earnings.push({
      row_type: "month",
      month: `${m}-01`,
      is_in_flight: m === IN_FLIGHT ? "True" : "False",
      total_collections: r2(tc).toFixed(2),
      total_expenses: r2(te).toFixed(2),
      total_adjustments: r2(ta).toFixed(2),
      total_payout: r2(tp).toFixed(2),
    });
  }
  const ytd = (k: string) => r2(earnings.reduce((a, e) => a + Number(e[k]), 0)).toFixed(2);
  earnings.push({
    row_type: "year_to_date", month: "", is_in_flight: "",
    total_collections: ytd("total_collections"), total_expenses: ytd("total_expenses"),
    total_adjustments: ytd("total_adjustments"), total_payout: ytd("total_payout"),
  });

  const BILLED_HEADERS = ["Bill ID", "Created", "Street 1", "Street 2", "Room Number", "Property ID", "Room ID", "Member ID", "PadSplit Market", "Member First Name", "Member Last Name", "Amount", "Transaction Type", "Transaction Reason", "Comments", "Category", "Gross Collected", "Booking Fee Amount", "Service Fee Rate", "Booking Fee Days", "Transaction Fee Rate"];
  const COLLECTED_HEADERS = ["Created", "Payout Month", "Property ID", "Street 1", "Street 2", "Room Number", "Room ID", "Member ID", "PadSplit Market", "Member First Name", "Member Last Name", "Booking Fee Days", "Service Fee Rate", "Transaction Fee Rate", "Bill ID", "Bill Type", "Gross Collected", "Booking Fee Amount", "Collections Net of Booking Fees", "Service Fees", "Txn Fees", "Total Fees", "Host Earnings", "Category"];
  const SUMMARY_HEADERS = ["Earnings Month", "Payout Month", "PSID", "Address", "State", "Collection Detail Host", "Gross Collected", "Booking Fees Amount", "Collections Net of Booking Fees", "Transaction Fee", "Service Fees", "Host Earnings", "Adjustments", "Total Payout", "Payout Account"];
  const EARNINGS_HEADERS = ["row_type", "month", "is_in_flight", "total_collections", "total_expenses", "total_adjustments", "total_payout"];

  const csv = (headers: string[], rows: Array<Record<string, string | number>>, padHeaders = false) => {
    const cell = (v: unknown) => {
      const s = v == null ? "" : String(v);
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    // PadSplit's collected.csv has stray spaces around some headers.
    const head = headers.map((h, i) => (padHeaders && i % 5 === 1 ? ` ${h} ` : h));
    return [head.map(cell).join(","), ...rows.map((r) => headers.map((h) => cell(r[h])).join(","))].join("\n") + "\n";
  };

  return {
    "summary.csv": csv(SUMMARY_HEADERS, summary),
    "billed.csv": csv(BILLED_HEADERS, billed),
    "collected.csv": csv(COLLECTED_HEADERS, collected, true),
    "earnings_table.csv": csv(EARNINGS_HEADERS, earnings),
  };
}

export async function buildSampleZip(seed = 7): Promise<Uint8Array> {
  const zip = new JSZip();
  const folder = zip.folder("earning_details_2025-01-01_2026-10-20")!;
  for (const [name, text] of Object.entries(buildSampleFiles(seed))) folder.file(name, text);
  return zip.generateAsync({ type: "uint8array", compression: "DEFLATE" });
}

if (process.argv[1] && /make-sample-export/.test(process.argv[1])) {
  const out = join(process.cwd(), "public/samples/rent-ledger-sample.zip");
  buildSampleZip().then((bytes) => {
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, bytes);
    console.log(`Wrote ${out} (${bytes.length.toLocaleString()} bytes)`);
  });
}
