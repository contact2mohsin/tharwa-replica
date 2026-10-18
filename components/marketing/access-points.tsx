import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { faithLane, globalLane } from "@/lib/content";
import { cn } from "@/lib/cn";

type Lane = typeof faithLane | typeof globalLane;

function LaneCard({
  lane,
  variant,
  index,
  illustration,
}: {
  lane: Lane;
  variant: "gold" | "steel";
  index: string;
  illustration: { src: string; alt: string };
}) {
  const gold = variant === "gold";

  return (
    <article
      className={cn(
        "lane-card flex h-full flex-col border",
        gold ? "lane-gold" : "lane-steel",
      )}
    >
      <div
        className={cn(
          "relative isolate flex min-h-[280px] items-center justify-center overflow-hidden sm:min-h-[340px]",
          gold ? "lane-stage-gold" : "lane-stage-steel",
        )}
      >
        <span className="lane-sheen" />
        <span className="lane-corner lane-corner-tl" />
        <span className="lane-corner lane-corner-tr" />
        <span className="lane-corner lane-corner-bl" />
        <span className="lane-corner lane-corner-br" />
        <p
          className={cn(
            "absolute top-6 inset-x-0 z-[2] text-center font-sans text-[11px] tracking-[0.32em] uppercase",
            gold ? "text-gold/70" : "text-[#a1a8c4]/80",
          )}
        >
          {index}
        </p>
        <Image
          src={illustration.src}
          alt={illustration.alt}
          width={400}
          height={329}
          unoptimized
          className="relative z-[1] h-auto w-[78%] max-w-[360px] drop-shadow-[0_24px_50px_rgba(0,0,0,0.45)]"
        />
      </div>

      <div className="flex flex-1 flex-col px-7 py-8 sm:px-9 sm:py-10">
        <p
          className={cn(
            "text-[11px] tracking-[0.22em] uppercase",
            gold ? "text-gold" : "text-[#b4bed6]",
          )}
        >
          » {lane.kicker}
        </p>
        <h3 className="mt-3 font-display text-5xl tracking-tight text-cream sm:text-6xl">
          {lane.title}
        </h3>
        <div
          className={cn(
            "mt-7 h-px w-16",
            gold ? "bg-gold/50" : "bg-[#a1a8c4]/50",
          )}
        />
        <p className="mt-7 text-[11px] tracking-[0.22em] text-muted uppercase">
          Backed by
        </p>
        <ul className="mt-4 space-y-2.5 text-[15px] leading-6 text-cream/90">
          {lane.backedBy.map((item) => (
            <li key={item} className="flex gap-3">
              <span
                className={cn(
                  "mt-2 h-1.5 w-1.5 shrink-0 rotate-45",
                  gold ? "bg-gold" : "bg-[#a1a8c4]",
                )}
              />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-7 text-sm leading-6 text-muted">{lane.audience}</p>
        <Button
          href={lane.href}
          className={cn(
            "mt-9 self-start",
            gold ? "hover:border-gold" : "hover:border-[#a1a8c4]",
          )}
          tone="on-dark"
        >
          {lane.cta}
        </Button>
      </div>
    </article>
  );
}

export function AccessPoints() {
  return (
    <Section
      id="product"
      label="Our Product"
      title={
        <>
          One protocol.
          <span className="block text-muted">Two access points.</span>
        </>
      }
      subtitle="Same security model, separate asset lanes. Choose the lane that matches your investment principles."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <LaneCard
          lane={faithLane}
          variant="gold"
          index="Lane 01"
          illustration={{
            src: "/illustrations/thusd.svg",
            alt: "thUSD mark",
          }}
        />
        <LaneCard
          lane={globalLane}
          variant="steel"
          index="Lane 02"
          illustration={{
            src: "/illustrations/wthusd.svg",
            alt: "wthUSD mark",
          }}
        />
      </div>
    </Section>
  );
}
