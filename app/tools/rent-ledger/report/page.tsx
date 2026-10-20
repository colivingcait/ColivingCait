import { redirect } from "next/navigation";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import ReportApp from "@/components/rent-ledger/ReportApp";
import { getCurrentUser } from "@/lib/auth/helpers";

export const metadata = {
  title: "Your Rent Ledger Report",
  robots: { index: false, follow: false },
};

export default async function RentLedgerReportPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/signin?callbackUrl=/tools/rent-ledger/report");
  return (
    <Section tone="cream">
      <p className="eyebrow">Read your rent ledger</p>
      <Heading level={1} size="md" className="text-charcoal mb-8">
        Your full report.
      </Heading>
      <ReportApp />
    </Section>
  );
}
