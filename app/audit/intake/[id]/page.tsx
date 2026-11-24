import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { auditTotal, housesLabel, money, zelleMemo, ZELLE_TO } from "@/lib/audit/pricing";
import { getLead } from "@/lib/audit/store";
import IntakeForm, { type IntakeLead } from "./IntakeForm";

// A lead's private intake page, linked from their confirmation email.
// Never indexed, never cached, and 404s for any ID that isn't a real lead.
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Your audit intake",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  referrer: "no-referrer",
};

export default async function IntakePage({ params }: { params: { id: string } }) {
  const lead = await getLead(params.id).catch(() => null);
  if (!lead) notFound();

  const total = auditTotal(lead.houses);
  const props: IntakeLead = {
    id: lead.id,
    name: lead.name,
    email: lead.email,
    housesLabel: housesLabel(lead.houses),
    payment:
      total === null
        ? `I'll email your custom quote within a day. Once you have it, pay by Zelle to ${ZELLE_TO}, memo: ${zelleMemo(lead.name)}.`
        : `${money(total)} by Zelle to ${ZELLE_TO}, memo: ${zelleMemo(lead.name)}.`,
    completed: Boolean(lead.intakeCompletedAt),
  };
  return <IntakeForm lead={props} />;
}
