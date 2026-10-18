import { MarketingFooter } from "@/components/marketing/footer";
import { MarketingHeader } from "@/components/marketing/header";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-svh bg-canvas text-cream">
      <MarketingHeader />
      <main className="bg-canvas text-cream">{children}</main>
      <MarketingFooter />
    </div>
  );
}
