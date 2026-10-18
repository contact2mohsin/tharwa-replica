"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DemoDialog } from "@/components/dapp/demo-dialog";

export function DemoDesk({
  kicker,
  title,
  body,
  actionLabel,
}: {
  kicker: string;
  title: string;
  body: string;
  actionLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");

  return (
    <section className="dapp-panel mx-auto max-w-xl p-6 sm:p-8">
      <p className="text-[10px] tracking-[0.28em] text-gold uppercase">
        {kicker}
      </p>
      <h1 className="mt-3 font-display text-4xl tracking-tight text-cream">
        {title}
      </h1>
      <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
      <label className="mt-8 block text-[11px] tracking-[0.18em] text-muted uppercase">
        Amount
        <input
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          inputMode="decimal"
          placeholder="0.00"
          className="mt-2 h-12 w-full border border-line bg-black/40 px-4 text-cream outline-none focus:border-gold"
        />
      </label>
      <Button
        type="button"
        className="mt-6"
        onClick={() => setOpen(true)}
      >
        {actionLabel}
      </Button>
      {open ? (
        <DemoDialog
          title="Connect wallet"
          body="Choose a wallet to continue."
          onClose={() => setOpen(false)}
        />
      ) : null}
    </section>
  );
}
