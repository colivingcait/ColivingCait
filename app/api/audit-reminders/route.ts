import { NextResponse } from "next/server";
import { sendReminder } from "@/lib/audit/emails";
import { getLead, listLeadIds, saveLead } from "@/lib/audit/store";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Daily sweep (Vercel Cron, see vercel.json): emails ONE reminder to each
// lead whose intake still isn't finished 48 hours after they submitted the
// form. A lead is marked once reminded, so running this again (or more often)
// never sends a second reminder.

const AFTER_MS = 48 * 60 * 60 * 1000;

export async function GET(request: Request) {
  // Vercel sends "Authorization: Bearer $CRON_SECRET" when CRON_SECRET is set.
  const secret = process.env.CRON_SECRET;
  if (secret && request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = Date.now();
  const result = { checked: 0, reminded: [] as string[], failed: [] as string[] };
  for (const id of await listLeadIds()) {
    const lead = await getLead(id);
    if (!lead) continue;
    result.checked++;
    if (lead.intakeCompletedAt || lead.reminderSentAt) continue;
    if (now - Date.parse(lead.createdAt) < AFTER_MS) continue;
    try {
      // Mark first, so a failure later can never cause a second reminder.
      await saveLead({ ...lead, reminderSentAt: new Date().toISOString() });
      if (await sendReminder(lead)) result.reminded.push(lead.email);
      else result.failed.push(`${lead.email} (email not configured)`);
    } catch (err) {
      result.failed.push(`${lead.email} (${err instanceof Error ? err.message : String(err)})`);
    }
  }
  console.log(`[audit-reminders] checked ${result.checked} | reminded ${result.reminded.length} | failed ${result.failed.length}`, result.failed);
  return NextResponse.json(result);
}
