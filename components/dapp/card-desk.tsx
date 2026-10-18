"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DemoDialog } from "@/components/dapp/demo-dialog";
import {
  cardBenefits,
  cardPreferences,
  cardSpending,
  cardUseCases,
} from "@/lib/dapp/fixtures";
import type { CardChoice } from "@/lib/dapp/types";
import { cn } from "@/lib/cn";

export function CardDesk() {
  const [spending, setSpending] = useState<string | null>(null);
  const [preference, setPreference] = useState<string | null>(null);
  const [useCase, setUseCase] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="flex flex-col gap-16 pb-10">
      <header>
        <h1 className="font-display text-4xl tracking-tight text-cream sm:text-5xl">
          Tharwa Black Card
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
          The card that earns TRWA on every spend. Reserve your founder slot.
        </p>
      </header>

      <section className="grid items-center gap-10 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <MetalCard />
        <div>
          <p className="text-[10px] tracking-[0.32em] text-gold uppercase">
            Tharwa Black · Limited beta
          </p>
          <h2 className="mt-4 font-display text-4xl leading-[1.12] tracking-tight text-cream sm:text-5xl">
            Spend on-chain.
            <br />
            Earn in TRWA. Live like an owner.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-muted">
            The Tharwa Black Card turns everyday spending into protocol equity.
            Pay anywhere with thUSD, settle on-chain, and earn TRWA on every
            transaction. Reserve your spot. Early founders get the deepest
            rewards and lifetime fee waivers.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {cardBenefits.map((benefit) => (
              <li key={benefit.id} className="card-perk">
                <p className="font-display text-xl text-cream">{benefit.title}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{benefit.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-xl text-[12px] leading-5 text-muted">
            Card issuance is subject to regulatory approval and full KYC. The
            limited beta will be offered first to existing TRWA / thUSD holders
            before public rollout.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl">
        <h2 className="font-display text-4xl tracking-tight text-cream">
          Reserve your spot
        </h2>

        <div className="card-eligibility mt-8">
          <p className="text-sm text-cream">
            Connect your wallet to check eligibility
          </p>
          <p className="mt-1 text-sm text-muted">
            The limited beta is open to wallets holding TRWA / thUSD / sthUSD.
          </p>
        </div>

        <ChoiceRow
          legend="Expected monthly spending (USD)"
          options={cardSpending}
          value={spending}
          onChange={setSpending}
        />
        <ChoiceRow
          legend="Card preference"
          options={cardPreferences}
          value={preference}
          onChange={setPreference}
        />
        <ChoiceRow
          legend="Main use case"
          options={cardUseCases}
          value={useCase}
          onChange={setUseCase}
        />

        <label className="mt-8 block">
          <span className="text-sm text-cream">Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@domain.com"
            className="mt-2 h-12 w-full border-0 border-b border-white/15 bg-transparent px-0 text-cream outline-none placeholder:text-muted/50 focus:border-gold"
          />
        </label>

        <label className="mt-8 block">
          <span className="text-sm text-cream">Anything else? (optional)</span>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Country, preferred limits, custom benefits…"
            rows={3}
            className="mt-2 w-full resize-y border-0 border-b border-white/15 bg-transparent px-0 py-2 text-cream outline-none placeholder:text-muted/50 focus:border-gold"
          />
        </label>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-md text-[12px] leading-5 text-muted">
            Your wallet address is your spot. Issuance pending regulatory
            approval and KYC.
          </p>
          <Button type="button" tone="on-light" onClick={() => setDialogOpen(true)}>
            Connect wallet to reserve
          </Button>
        </div>
      </section>

      {dialogOpen ? (
        <DemoDialog
          title="Connect wallet"
          body="Choose a wallet to continue."
          onClose={() => setDialogOpen(false)}
        />
      ) : null}
    </div>
  );
}

function ChoiceRow({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: readonly CardChoice[];
  value: string | null;
  onChange: (id: string) => void;
}) {
  return (
    <fieldset className="mt-8">
      <legend className="text-sm text-cream">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = value === option.id;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option.id)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-[13px] transition",
                selected
                  ? "border-gold bg-gold/12 text-cream"
                  : "border-white/15 text-muted hover:border-gold/40 hover:text-cream",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function MetalCard() {
  return (
    <div className="black-card-stage">
      <div className="black-card" aria-hidden>
        <span className="black-card-sheen" />
        <span className="black-card-chip" />
        <span className="black-card-wave" />
        <p className="black-card-mark">tharwa</p>
        <p className="black-card-label">Black</p>
        <p className="black-card-pan">•••• •••• •••• 0000</p>
      </div>
    </div>
  );
}
