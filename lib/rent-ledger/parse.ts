import Papa from "papaparse";

// Parses the PadSplit earnings export (the zip or its four CSVs) into typed
// rows. Runs in the browser; nothing here touches the network. Dates are
// stored as whole UTC day numbers so day math never crosses a time zone.

export type FileKind = "summary" | "billed" | "collected" | "earnings";

export const FILE_LABELS: Record<FileKind, string> = {
  summary: "summary.csv",
  billed: "billed.csv",
  collected: "collected.csv",
  earnings: "earnings_table.csv",
};

export type RawFiles = Partial<Record<FileKind, string>>;

export interface BilledRow {
  billId: string;
  day: number;
  street1: string;
  roomNumber: string;
  propertyId: string;
  roomId: string;
  memberId: string;
  market: string;
  firstName: string;
  lastName: string;
  amount: number;
  type: string;
  reason: string;
  category: string;
}

export interface CollectedRow {
  day: number;
  earningsMonth: string;
  propertyId: string;
  street1: string;
  roomId: string;
  memberId: string;
  billId: string;
  billType: string;
  gross: number;
  bookingFee: number;
  netOfBooking: number;
  serviceFees: number;
  txnFees: number;
  totalFees: number;
  hostEarnings: number;
  category: string;
}

export interface SummaryRow {
  earningsMonth: string;
  psid: string;
  address: string;
  state: string;
  gross: number;
  bookingFees: number;
  netOfBooking: number;
  transactionFee: number;
  serviceFees: number;
  hostEarnings: number;
  adjustments: number;
  totalPayout: number;
}

export interface EarningsRow {
  month: string;
  inFlight: boolean;
  totalCollections: number;
  totalExpenses: number;
  totalAdjustments: number;
  totalPayout: number;
}

export interface LedgerData {
  billed: BilledRow[];
  collected: CollectedRow[];
  summary: SummaryRow[];
  earnings: EarningsRow[];
}

export interface ParseResult {
  data: LedgerData | null;
  /** Plain-language problems that stop the report (check 1). */
  errors: string[];
  /** Rows we could not read a date from, per file. */
  badDates: Partial<Record<FileKind, number>>;
}

// Columns each file must carry (after trimming). Matching ignores case and
// repeated spaces, since collected.csv headers carry stray spaces.
const REQUIRED: Record<FileKind, string[]> = {
  summary: [
    "Earnings Month", "PSID", "Address", "Gross Collected", "Booking Fees Amount",
    "Transaction Fee", "Service Fees", "Host Earnings", "Adjustments", "Total Payout",
  ],
  billed: [
    "Bill ID", "Created", "Property ID", "Member ID", "Amount",
    "Transaction Type", "Transaction Reason",
  ],
  collected: [
    "Created", "Payout Month", "Property ID", "Member ID", "Bill ID", "Bill Type",
    "Gross Collected", "Host Earnings", "Category",
  ],
  earnings: [
    "row_type", "month", "is_in_flight", "total_collections", "total_adjustments", "total_payout",
  ],
};

const norm = (h: string) => h.trim().replace(/\s+/g, " ").toLowerCase();

// ---------------------------------------------------------------- dates

const MONTHS: Record<string, number> = {
  jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
  jul: 7, aug: 8, sep: 9, sept: 9, oct: 10, nov: 11, dec: 12,
};

export function ymdToDay(y: number, m: number, d: number): number {
  return Math.floor(Date.UTC(y, m - 1, d) / 86_400_000);
}

export function dayToISO(day: number): string {
  return new Date(day * 86_400_000).toISOString().slice(0, 10);
}

export function dayToMonth(day: number): string {
  return dayToISO(day).slice(0, 7);
}

export function monthStartDay(month: string): number {
  const [y, m] = month.split("-").map(Number);
  return ymdToDay(y, m, 1);
}

export function addMonths(month: string, n: number): string {
  const [y, m] = month.split("-").map(Number);
  const idx = y * 12 + (m - 1) + n;
  return `${Math.floor(idx / 12)}-${String((idx % 12) + 1).padStart(2, "0")}`;
}

export function monthsBetween(a: string, b: string): number {
  const [ya, ma] = a.split("-").map(Number);
  const [yb, mb] = b.split("-").map(Number);
  return (yb - ya) * 12 + (mb - ma);
}

export function monthLabel(month: string): string {
  const [y, m] = month.split("-").map(Number);
  const names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${names[m - 1]} ${y}`;
}

const fullYear = (y: number) => (y < 100 ? 2000 + y : y);

/** Reads the date formats exports and spreadsheets produce. NaN if unreadable. */
export function parseDay(raw: string | undefined | null): number {
  const s = (raw ?? "").trim();
  if (!s) return NaN;
  let m = s.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
  if (m) return ymdToDay(+m[1], +m[2], +m[3]);
  m = s.match(/^(\d{4})-(\d{1,2})$/);
  if (m) return ymdToDay(+m[1], +m[2], 1);
  m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})/);
  if (m) return ymdToDay(fullYear(+m[3]), +m[1], +m[2]);
  m = s.match(/^(\d{1,2})\/(\d{4})$/);
  if (m) return ymdToDay(+m[2], +m[1], 1);
  // "Oct 20, 2026", "October 2026", "Jan-25", "20 Oct 2026"
  m = s.match(/^([A-Za-z]{3,9})[\s-]+(\d{1,2}),?\s+(\d{4})/);
  if (m && MONTHS[m[1].slice(0, 3).toLowerCase()])
    return ymdToDay(+m[3], MONTHS[m[1].slice(0, 3).toLowerCase()], +m[2]);
  m = s.match(/^([A-Za-z]{3,9})[\s-]+(\d{2}|\d{4})$/);
  if (m && MONTHS[m[1].slice(0, 3).toLowerCase()])
    return ymdToDay(fullYear(+m[2]), MONTHS[m[1].slice(0, 3).toLowerCase()], 1);
  m = s.match(/^(\d{1,2})\s+([A-Za-z]{3,9})\s+(\d{4})/);
  if (m && MONTHS[m[2].slice(0, 3).toLowerCase()])
    return ymdToDay(+m[3], MONTHS[m[2].slice(0, 3).toLowerCase()], +m[1]);
  return NaN;
}

export function parseMonth(raw: string | undefined | null): string {
  const d = parseDay(raw);
  return Number.isFinite(d) ? dayToMonth(d) : "";
}

// ---------------------------------------------------------------- values

export function parseMoney(raw: string | undefined | null): number {
  let s = (raw ?? "").trim();
  if (!s) return 0;
  let neg = false;
  if (/^\(.*\)$/.test(s)) {
    neg = true;
    s = s.slice(1, -1);
  }
  s = s.replace(/[$,\s]/g, "");
  if (s.startsWith("-")) {
    neg = !neg;
    s = s.slice(1);
  }
  const n = Number(s);
  if (!Number.isFinite(n)) return 0;
  return neg ? -n : n;
}

export function parseBool(raw: string | undefined | null): boolean {
  return /^(true|t|yes|y|1)$/i.test((raw ?? "").trim());
}

/** IDs sometimes come through a spreadsheet as "12345.0". */
export function cleanId(raw: string | undefined | null): string {
  return (raw ?? "").trim().replace(/\.0+$/, "");
}

// ---------------------------------------------------------------- CSV

type Table = { headers: string[]; rows: Record<string, string>[] };

function readCsv(text: string): Table {
  const out = Papa.parse<string[]>(text.replace(/^﻿/, ""), {
    skipEmptyLines: "greedy",
  });
  const [head = [], ...body] = out.data;
  const headers = head.map(norm);
  const rows = body.map((cells) => {
    const r: Record<string, string> = {};
    headers.forEach((h, i) => {
      // Keep the first column when a header repeats.
      if (!(h in r)) r[h] = cells[i] ?? "";
    });
    return r;
  });
  return { headers, rows };
}

/** Works out which of the four files a CSV is from its headers. */
export function detectKind(text: string): FileKind | null {
  const firstLine = text.replace(/^﻿/, "").split(/\r?\n/, 1)[0] ?? "";
  const headers = (Papa.parse<string[]>(firstLine).data[0] ?? []).map(norm);
  const has = (h: string) => headers.includes(norm(h));
  if (has("row_type") && has("total_payout")) return "earnings";
  if (has("PSID") && has("Earnings Month")) return "summary";
  if (has("Transaction Reason") && has("Bill ID")) return "billed";
  if (has("Bill Type") && has("Member ID")) return "collected";
  return null;
}

/** Sorts named CSV texts (from a zip or a multi-file drop) into the four files. */
export function sortFiles(files: Array<{ name: string; text: string }>): RawFiles {
  const raw: RawFiles = {};
  for (const f of files) {
    if (!/\.csv$/i.test(f.name)) continue;
    const kind = detectKind(f.text);
    if (kind && !raw[kind]) raw[kind] = f.text;
  }
  return raw;
}

/** Unzips the PadSplit export. Accepts a Blob, ArrayBuffer or Uint8Array. */
export async function readZip(data: Blob | ArrayBuffer | Uint8Array): Promise<RawFiles> {
  const JSZip = (await import("jszip")).default;
  const zip = await JSZip.loadAsync(data);
  const files: Array<{ name: string; text: string }> = [];
  for (const entry of Object.values(zip.files)) {
    if (entry.dir || entry.name.startsWith("__MACOSX")) continue;
    files.push({ name: entry.name, text: await entry.async("string") });
  }
  return sortFiles(files);
}

// ---------------------------------------------------------------- export

export function parseExport(raw: RawFiles): ParseResult {
  const errors: string[] = [];
  const badDates: ParseResult["badDates"] = {};
  const tables: Partial<Record<FileKind, Table>> = {};

  for (const kind of Object.keys(REQUIRED) as FileKind[]) {
    const text = raw[kind];
    if (!text) {
      errors.push(`${FILE_LABELS[kind]} is missing from the upload.`);
      continue;
    }
    const table = readCsv(text);
    const missing = REQUIRED[kind].filter((h) => !table.headers.includes(norm(h)));
    if (missing.length) {
      errors.push(`${FILE_LABELS[kind]} is missing these columns: ${missing.join(", ")}.`);
      continue;
    }
    tables[kind] = table;
  }
  if (errors.length) return { data: null, errors, badDates };

  const g = (r: Record<string, string>, h: string) => r[norm(h)] ?? "";

  const billed: BilledRow[] = tables.billed!.rows.map((r) => ({
    billId: cleanId(g(r, "Bill ID")),
    day: parseDay(g(r, "Created")),
    street1: g(r, "Street 1").trim(),
    roomNumber: g(r, "Room Number").trim(),
    propertyId: cleanId(g(r, "Property ID")),
    roomId: cleanId(g(r, "Room ID")),
    memberId: cleanId(g(r, "Member ID")),
    market: g(r, "PadSplit Market").trim(),
    firstName: g(r, "Member First Name").trim(),
    lastName: g(r, "Member Last Name").trim(),
    amount: parseMoney(g(r, "Amount")),
    type: g(r, "Transaction Type").trim().toLowerCase(),
    reason: g(r, "Transaction Reason").trim().toLowerCase(),
    category: g(r, "Category").trim(),
  }));
  const billedBad = billed.filter((b) => !Number.isFinite(b.day)).length;
  if (billedBad) badDates.billed = billedBad;

  const collected: CollectedRow[] = tables.collected!.rows.map((r) => {
    const day = parseDay(g(r, "Created"));
    // "Payout Month" is really the earnings month; blank for the current month.
    const earningsMonth =
      parseMonth(g(r, "Payout Month")) || (Number.isFinite(day) ? dayToMonth(day) : "");
    return {
      day,
      earningsMonth,
      propertyId: cleanId(g(r, "Property ID")),
      street1: g(r, "Street 1").trim(),
      roomId: cleanId(g(r, "Room ID")),
      memberId: cleanId(g(r, "Member ID")),
      billId: cleanId(g(r, "Bill ID")),
      billType: g(r, "Bill Type").trim(),
      gross: parseMoney(g(r, "Gross Collected")),
      bookingFee: parseMoney(g(r, "Booking Fee Amount")),
      netOfBooking: parseMoney(g(r, "Collections Net of Booking Fees")),
      serviceFees: parseMoney(g(r, "Service Fees")),
      txnFees: parseMoney(g(r, "Txn Fees")),
      totalFees: parseMoney(g(r, "Total Fees")),
      hostEarnings: parseMoney(g(r, "Host Earnings")),
      category: g(r, "Category").trim().toLowerCase(),
    };
  });
  const collectedBad = collected.filter((c) => !Number.isFinite(c.day)).length;
  if (collectedBad) badDates.collected = collectedBad;

  const summary: SummaryRow[] = tables.summary!.rows
    .map((r) => ({
      earningsMonth: parseMonth(g(r, "Earnings Month")),
      psid: cleanId(g(r, "PSID")),
      address: g(r, "Address").trim(),
      state: g(r, "State").trim(),
      gross: parseMoney(g(r, "Gross Collected")),
      bookingFees: parseMoney(g(r, "Booking Fees Amount")),
      netOfBooking: parseMoney(g(r, "Collections Net of Booking Fees")),
      transactionFee: parseMoney(g(r, "Transaction Fee")),
      serviceFees: parseMoney(g(r, "Service Fees")),
      hostEarnings: parseMoney(g(r, "Host Earnings")),
      adjustments: parseMoney(g(r, "Adjustments")),
      totalPayout: parseMoney(g(r, "Total Payout")),
    }))
    .filter((s) => s.psid || s.address);
  const summaryBad = summary.filter((s) => !s.earningsMonth).length;
  if (summaryBad) badDates.summary = summaryBad;

  const earnings: EarningsRow[] = tables.earnings!.rows
    .filter((r) => g(r, "row_type").trim().toLowerCase() === "month")
    .map((r) => ({
      month: parseMonth(g(r, "month")),
      inFlight: parseBool(g(r, "is_in_flight")),
      totalCollections: parseMoney(g(r, "total_collections")),
      totalExpenses: parseMoney(g(r, "total_expenses")),
      totalAdjustments: parseMoney(g(r, "total_adjustments")),
      totalPayout: parseMoney(g(r, "total_payout")),
    }));
  const earningsBad = earnings.filter((e) => !e.month).length;
  if (earningsBad) badDates.earnings = earningsBad;

  if (!billed.some((b) => Number.isFinite(b.day))) {
    errors.push("billed.csv has no rows with a readable Created date.");
  }
  if (summaryBad || earningsBad) {
    errors.push("Some months in summary.csv or earnings_table.csv could not be read.");
  }
  if (errors.length) return { data: null, errors, badDates };

  return { data: { billed, collected, summary, earnings }, errors, badDates };
}
