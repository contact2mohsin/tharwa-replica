import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal-page";

export const metadata: Metadata = { title: "Risk Disclosures" };

export default function RiskPage() {
  return (
    <LegalPage title="Risk Disclosures" updated="October 2026">
      <p>
        Digital assets can lose all value. Yields are variable and may be zero.
        Redemption at a target value is an objective, not a promise. Fixed-term
        products can lock assets and apply early-exit penalties. Smart contracts
        may contain vulnerabilities. Blockchain transactions cannot be reversed.
      </p>
      <p>
        Nothing on this site is investment, legal, or tax advice. Product names
        and narratives describe the protocol; they are not an offer of those
        products.
      </p>
      <p>
        Read the official disclosures before using any live product:{" "}
        <a
          className="underline"
          href="https://www.tharwa.finance/risk-disclosures"
        >
          tharwa.finance/risk-disclosures
        </a>
        .
      </p>
    </LegalPage>
  );
}
