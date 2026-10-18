"use client";

import { useState } from "react";
import { Panel, Section } from "@/components/ui/section";
import { howItWorksSteps } from "@/lib/content";
import { cn } from "@/lib/cn";

export function HowItWorks() {
  const [active, setActive] = useState<(typeof howItWorksSteps)[number]["id"]>(
    howItWorksSteps[1].id,
  );
  const current =
    howItWorksSteps.find((step) => step.id === active) ?? howItWorksSteps[1];

  return (
    <Section
      id="how-it-works"
      tone="surface"
      label="How it works"
      title={
        <>
          Start earning
          <span className="block text-muted">in three steps.</span>
        </>
      }
      subtitle="Your capital is described as deploying across diversified real-world assets. Redemption at parity is an objective, not a promise."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {howItWorksSteps.map((step, index) => (
          <button
            key={step.id}
            type="button"
            onClick={() => setActive(step.id)}
            className={cn(
              "border p-6 text-left transition",
              active === step.id
                ? "border-gold bg-raised text-cream"
                : "border-line bg-canvas text-muted hover:border-gold/50 hover:text-cream",
            )}
          >
            <p className="font-sans text-[11px] tracking-[0.22em] text-gold uppercase">
              Step {index + 1}
            </p>
            <p className="mt-4 font-display text-2xl tracking-tight text-cream">
              {step.title}
            </p>
          </button>
        ))}
      </div>
      <Panel className="mt-4">
        <p className="text-[11px] tracking-[0.2em] text-gold uppercase">
          Currently selected
        </p>
        <h3 className="mt-3 font-display text-3xl text-cream">{current.title}</h3>
        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-muted">
          {current.body}
        </p>
      </Panel>
    </Section>
  );
}
