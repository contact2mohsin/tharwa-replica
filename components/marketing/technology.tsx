"use client";

import { useState } from "react";
import { Panel, Section } from "@/components/ui/section";
import { technologyTabs } from "@/lib/content";
import { cn } from "@/lib/cn";

export function Technology() {
  const [active, setActive] = useState<(typeof technologyTabs)[number]["id"]>(
    technologyTabs[1].id,
  );
  const current =
    technologyTabs.find((tab) => tab.id === active) ?? technologyTabs[1];

  return (
    <Section
      id="technology"
      label="Infrastructure"
      title={
        <>
          Technology
          <span className="block text-muted">& infrastructure.</span>
        </>
      }
      subtitle="Institutional-grade systems for allocation, RWA backing, and risk."
    >
      <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div className="flex flex-col gap-2">
          {technologyTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={cn(
                "border px-4 py-4 text-left text-sm transition",
                active === tab.id
                  ? "border-gold bg-raised text-cream"
                  : "border-line bg-surface text-muted hover:text-cream",
              )}
            >
              {tab.title}
            </button>
          ))}
        </div>
        <Panel>
          <p className="text-[11px] tracking-[0.2em] text-gold uppercase">
            Multi-asset portfolio
          </p>
          <h3 className="mt-4 font-display text-3xl tracking-tight text-cream sm:text-4xl">
            {current.title}
          </h3>
          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-muted">
            {current.body}
          </p>
        </Panel>
      </div>
    </Section>
  );
}
