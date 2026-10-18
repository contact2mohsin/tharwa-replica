import { partners } from "@/lib/content";

export function PartnerMarquee() {
  const row = [...partners, ...partners, ...partners];

  return (
    <section
      aria-label="Partners"
      className="relative overflow-hidden border-y border-line bg-surface py-8"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface to-transparent" />
      <div className="marquee flex w-max gap-16 pr-16">
        {row.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="font-display text-2xl tracking-tight text-cream/80 sm:text-3xl"
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
