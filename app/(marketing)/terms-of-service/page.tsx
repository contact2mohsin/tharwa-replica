import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal-page";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="October 2026">
      <p>
        These pages describe the public layout of the product. They do not create
        a customer relationship on their own and do not constitute an offer of
        tokens.
      </p>
      <p>
        Digital assets are volatile. Yields are variable and not guaranteed.
        Nothing here is investment, legal, or tax advice. We will never ask for
        a seed phrase or private key.
      </p>
      <p>
        The original terms remain authoritative at{" "}
        <a
          className="underline"
          href="https://www.tharwa.finance/terms-of-service"
        >
          tharwa.finance/terms-of-service
        </a>
        .
      </p>
    </LegalPage>
  );
}
