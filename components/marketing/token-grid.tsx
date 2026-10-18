"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel, Section } from "@/components/ui/section";
import { StatusBadge } from "@/components/ui/status-badge";
import { tokens } from "@/lib/content";
import { cn } from "@/lib/cn";

export function TokenGrid() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? tokens : tokens.slice(0, 3);

  return (
    <Section
      id="tokens"
      label="Core Tokens"
      title={
        <>
          The foundation
          <span className="block text-muted">of the ecosystem.</span>
        </>
      }
      subtitle="Six core tokens across the treasury, yield, and governance stack."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((token) => (
          <Panel key={token.id} className="flex min-h-[320px] flex-col">
            <p className="text-[11px] tracking-[0.2em] text-gold uppercase">
              » {token.kicker}
            </p>
            <h3 className="mt-4 font-display text-4xl tracking-tight text-cream">
              {token.name}
            </h3>
            <p className="mt-3 text-sm text-muted">{token.meta}</p>
            <ul className="mt-6 flex-1 space-y-2 text-[15px] text-cream/90">
              {token.points.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center justify-between gap-4">
              <StatusBadge status={token.status} />
              <Button href={token.href} withChevron={false} className="h-10 text-xs">
                Open
              </Button>
            </div>
          </Panel>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className={cn(
            "inline-flex items-center gap-2 border border-line px-4 py-2 text-sm text-cream transition hover:border-gold",
          )}
          aria-expanded={expanded}
        >
          {expanded ? "Show less" : "Load more tokens"}
          <ChevronDown className={cn("h-4 w-4 transition", expanded && "rotate-180")} />
        </button>
      </div>
    </Section>
  );
}
