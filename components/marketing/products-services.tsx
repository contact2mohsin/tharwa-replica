import { Button } from "@/components/ui/button";
import { Panel, Section } from "@/components/ui/section";
import { services } from "@/lib/content";

export function ProductsServices() {
  return (
    <Section
      id="services"
      tone="surface"
      label="What we offer"
      title="Products & Services"
      subtitle="Advanced financial products across vaults, credit, liquidity, and agents."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service) => (
          <Panel key={service.id} className="flex flex-col">
            <p className="text-[11px] tracking-[0.2em] text-gold uppercase">
              » {service.kicker}
            </p>
            <h3 className="mt-4 font-display text-3xl tracking-tight text-cream sm:text-4xl">
              {service.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted">{service.status}</p>
            <ul className="mt-6 flex-1 space-y-2 text-[15px] text-cream/90">
              {service.points.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                  {point}
                </li>
              ))}
            </ul>
            <Button href={service.href} className="mt-8 self-start">
              Learn more
            </Button>
          </Panel>
        ))}
      </div>
    </Section>
  );
}
