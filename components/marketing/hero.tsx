import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { site, yieldMetrics } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative">
      <div className="relative isolate h-[100svh] min-h-[640px] overflow-hidden">
        <Image
          src="/images/hero-dawn.jpg"
          alt="Dawn light over sculpted desert dunes and distant mountains"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_32%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

        <Container className="relative flex h-full flex-col justify-between pb-10 pt-28 sm:pb-14 sm:pt-32">
          <div className="flex flex-1 items-center">
            <h1 className="max-w-[11ch] font-display text-[clamp(2.75rem,7.2vw,7.25rem)] leading-[0.88] tracking-[-0.045em] text-white">
              <span className="block text-white/82">Two Financial Systems.</span>
              <span className="hero-glow mt-1 block">One Protocol.</span>
            </h1>
          </div>
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <p className="max-w-[22rem] text-[15px] leading-6 text-white sm:text-base">
              Institutional-grade treasury infrastructure for global and Islamic
              finance markets
            </p>
            <p className="hidden max-w-md text-sm leading-6 text-white/70 lg:block lg:justify-self-end lg:text-right">
              Deploy capital across stablecoins, fixed-term vaults, yield products, and
              structured lending. Choose between conventional strategies or
              faith-aligned approaches — both powered by the same infrastructure.
            </p>
          </div>
        </Container>
      </div>

      <div className="relative overflow-hidden">
        <Image
          src="/images/hero-dawn.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_78%]"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-[#0d0b0a]/80 to-[#0d0b0a]" />
        <Container className="relative py-14 sm:py-20">
          <p className="mb-8 max-w-md text-sm leading-6 text-white/70 lg:hidden">
            Deploy capital across stablecoins, fixed-term vaults, yield products, and
            structured lending. Choose between conventional strategies or
            faith-aligned approaches — both powered by the same infrastructure.
          </p>
          <Button href={site.appHref} tone="on-light" className="mb-12 shadow-xl">
            Launch App
          </Button>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {yieldMetrics.map((metric) => (
              <div key={metric.id}>
                <p
                  className={
                    metric.value === "Coming Soon"
                      ? "font-display text-3xl tracking-tight text-white/90 sm:text-4xl"
                      : "font-display text-6xl tracking-[-0.06em] text-white sm:text-7xl"
                  }
                >
                  {metric.value}
                </p>
                <p className="mt-2 text-sm text-white/55">{metric.label}</p>
                {metric.note ? (
                  <p className="mt-1 text-[11px] tracking-wide text-white/35 uppercase">
                    {metric.note}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
