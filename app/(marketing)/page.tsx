import { AccessPoints } from "@/components/marketing/access-points";
import { Cta } from "@/components/marketing/cta";
import { Hero } from "@/components/marketing/hero";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { Leadership } from "@/components/marketing/leadership";
import { PartnerMarquee } from "@/components/marketing/partner-marquee";
import { ProductsServices } from "@/components/marketing/products-services";
import { Security } from "@/components/marketing/security";
import { Technology } from "@/components/marketing/technology";
import { TokenGrid } from "@/components/marketing/token-grid";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PartnerMarquee />
      <AccessPoints />
      <HowItWorks />
      <TokenGrid />
      <ProductsServices />
      <Technology />
      <Security />
      <Leadership />
      <Cta />
    </>
  );
}
