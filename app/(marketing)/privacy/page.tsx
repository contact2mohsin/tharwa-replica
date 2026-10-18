import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal-page";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="October 2026">
      <p>
        This website does not process identity-verification, biometric, or
        production analytics data, and does not sell personal data.
      </p>
      <p>
        If you connect a wallet, only public addresses needed to render the
        interface would be read from the network you choose. We will never ask
        for seed phrases or private keys.
      </p>
      <p>
        For the official controller, contact details, cookie notice, and rights
        process, use the original policy at{" "}
        <a className="underline" href="https://www.tharwa.finance/privacy">
          tharwa.finance/privacy
        </a>
        .
      </p>
    </LegalPage>
  );
}
