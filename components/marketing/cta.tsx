import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/content";

export function Cta() {
  return (
    <section className="border-t border-line bg-surface py-24">
      <Container className="border border-line bg-raised px-6 py-16 text-center sm:px-12">
        <p className="text-[11px] tracking-[0.22em] text-gold uppercase">Get started</p>
        <h2 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight text-cream sm:text-7xl">
          Start earning
          <span className="block text-muted">real yield.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-[15px] leading-7 text-muted">
          Earn yield from a diversified portfolio of real-world assets.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href={site.appHref} tone="on-light">
            Launch App
          </Button>
          <Button href={site.discord} tone="inverse">
            Join Discord
          </Button>
        </div>
      </Container>
    </section>
  );
}
