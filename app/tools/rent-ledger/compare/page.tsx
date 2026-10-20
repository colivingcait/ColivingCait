import { redirect } from "next/navigation";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import ReportApp from "@/components/rent-ledger/ReportApp";
import { getCurrentUser } from "@/lib/auth/helpers";

export const metadata = {
  title: "Compare Your Houses",
  robots: { index: false, follow: false },
};

// The Compare tab on its own URL: the host's houses against their metro,
// every metro, or a metro they pick.
export default async function RentLedgerComparePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/signin?callbackUrl=/tools/rent-ledger/compare");
  return (
    <Section tone="cream">
      <p className="eyebrow">Read your rent ledger</p>
      <Heading level={1} size="md" className="text-charcoal mb-8">
        Compare your houses.
      </Heading>
      <ReportApp initialTab="compare" />
    </Section>
  );
}
