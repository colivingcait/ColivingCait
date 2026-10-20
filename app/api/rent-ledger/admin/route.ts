import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/helpers";
import { ADMIN_HOUSE_COLUMNS, loadAdminData } from "@/lib/rent-ledger/admin";
import { isAdminEmail, str } from "@/lib/rent-ledger/server";

// GET /api/rent-ledger/admin?metro=Atlanta -> CSV of every host's houses.
// Admins only (RENT_LEDGER_ADMIN_EMAILS).
export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || !isAdminEmail(user.email)) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const metro = str(req.nextUrl.searchParams.get("metro"), 60) || null;
  const { list } = await loadAdminData(metro);

  const head = [
    "First name", "Last name", "Email", "Operator type", "Houses (said)", "Contact OK",
    "Selling", "Buying", "Partnering", "Wants help", ...ADMIN_HOUSE_COLUMNS.map(([, l]) => l),
  ];
  const cell = (v: unknown) => {
    const s = v == null ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const yn = (v: boolean | null) => (v == null ? "" : v ? "yes" : "no");
  const lines = [head.map(cell).join(",")];
  for (const { user: u, houses } of list) {
    const base = [
      u.first_name, u.last_name, u.email, u.operator_type, u.house_count, yn(u.consent_contact),
      yn(u.interest_selling), yn(u.interest_buying), yn(u.interest_partnering), yn(u.interest_help),
    ];
    if (!houses.length) lines.push([...base, ...ADMIN_HOUSE_COLUMNS.map(() => "")].map(cell).join(","));
    for (const h of houses) lines.push([...base, ...ADMIN_HOUSE_COLUMNS.map(([k]) => h[k])].map(cell).join(","));
  }
  return new NextResponse(lines.join("\n") + "\n", {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="rent-ledger-hosts${metro ? `-${metro.replace(/\W+/g, "-")}` : ""}.csv"`,
    },
  });
}
