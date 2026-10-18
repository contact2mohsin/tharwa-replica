"use client";

import { useState } from "react";
import { ChevronsRight } from "lucide-react";
import { TokenMark } from "@/components/dapp/token-mark";
import { demoHoldings, stakingPool } from "@/lib/dapp/fixtures";
import { formatPrecise } from "@/lib/dapp/format";
import { cn } from "@/lib/cn";

function parseAmount(raw: string): number {
  const value = Number.parseFloat(raw.replace(/,/g, ""));
  return Number.isFinite(value) ? value : 0;
}

function sanitizeAmount(raw: string): string {
  const cleaned = raw.replace(/[^\d.]/g, "");
  const [whole, ...rest] = cleaned.split(".");
  if (rest.length === 0) return whole;
  return `${whole}.${rest.join("").slice(0, 6)}`;
}

export function StakingDesk() {
  const [amount, setAmount] = useState("");
  const balance =
    demoHoldings.find((token) => token.id === "thUSD")?.balanceToken ?? 0;
  const deposit = parseAmount(amount);
  const receive = deposit * (1 - stakingPool.enterFeePct / 100);
  const overBalance = deposit > balance + 1e-9;

  return (
    <div className="flex w-full flex-col gap-8">
      <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="font-display text-4xl tracking-tight text-cream sm:text-5xl">
            Staking & Yield
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
            Put your assets to work and earn passive income from real utility.
          </p>
        </div>
      </header>

      <section className="stake-hero grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="flex items-center gap-4">
          <TokenMark id="thUSD" size={48} />
          <div>
            <p className="text-[13px] text-muted">Your thUSD Balance</p>
            <p className="mt-1 font-num text-4xl text-cream">
              {formatPrecise(balance, 2)}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 lg:text-right">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8fba7a] lg:hidden" />
          <div>
            <p className="text-[13px] tracking-[0.14em] text-[#8fba7a] uppercase">
              Staking: Available
            </p>
            <p className="mt-1 text-sm text-muted">Start earning below</p>
          </div>
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <section className="dapp-panel p-5 sm:p-7">
          <h2 className="font-display text-3xl text-cream">Amount to Stake</h2>
          <div className="mt-8 space-y-6">
            <div className="stake-field">
              <div className="flex items-end justify-between gap-4">
                <label className="min-w-0 flex-1">
                  <span className="text-[13px] text-muted">You deposit</span>
                  <input
                    value={amount}
                    onChange={(event) =>
                      setAmount(sanitizeAmount(event.target.value))
                    }
                    inputMode="decimal"
                    placeholder="0.00"
                    className="mt-2 w-full bg-transparent font-num text-4xl text-cream outline-none placeholder:text-cream/35"
                  />
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setAmount(formatPrecise(balance, 6).replace(/,/g, ""))
                  }
                  disabled={balance <= 0}
                  className="mb-1 text-[12px] tracking-[0.16em] text-gold uppercase transition hover:text-cream disabled:cursor-not-allowed disabled:opacity-35"
                >
                  Max
                </button>
              </div>
            </div>

            <div className="stake-field">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[13px] text-muted">You Receive</p>
                  <p className="mt-2 font-num text-4xl text-cream">
                    {deposit === 0 ? "0.00" : formatPrecise(receive, 2)}
                  </p>
                </div>
                <span className="mb-1 inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/30 px-3 py-1.5">
                  <TokenMark id="thUSD" size={22} />
                  <span className="text-sm text-cream">thUSD</span>
                </span>
              </div>
            </div>
          </div>

          {overBalance ? (
            <p className="mt-5 text-sm text-red-300/90">
              Not enough balance. You only have {formatPrecise(balance, 2)}{" "}
              thUSD.
            </p>
          ) : null}

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              Your Earnings Per Day:{" "}
              <span className="font-num text-[#8fba7a]">+0.00</span>
            </p>
            <DisabledCta label="Stake" />
          </div>
        </section>

        <section className="stake-pool p-5 sm:p-7">
          <h2 className="font-display text-3xl text-cream">
            Staking Pool Overview
          </h2>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-center gap-4">
              <TokenMark id="thUSD" size={44} />
              <div>
                <p className="text-[13px] text-muted">Currently Locked</p>
                <p className="mt-1 font-num text-4xl text-cream">
                  {formatPrecise(stakingPool.locked, 4)}
                </p>
              </div>
            </div>
            <DisabledCta label="Unstake" />
          </div>

          <dl className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <Metric
              label="Staking APY"
              value={stakingPool.stakingApy}
              unpublished={stakingPool.stakingApy === "—"}
            />
            <Metric
              label="Pool Size"
              value={stakingPool.poolSizeLabel}
            />
            <Metric
              label="Locking APY"
              value={`${stakingPool.lockingApyPct}%`}
            />
            <Metric
              label="Total Stakers"
              value={stakingPool.totalStakers}
              unpublished={stakingPool.totalStakers === "—"}
            />
            <Metric
              label="Enter Fee"
              value={`${stakingPool.enterFeePct.toFixed(2)}%`}
            />
            <Metric
              label="Cooldown Period"
              value={stakingPool.cooldown}
              unpublished={stakingPool.cooldown === "—"}
            />
            <Metric
              label="Exit Fee"
              value={`${stakingPool.exitFeePct.toFixed(2)}%`}
            />
            <Metric label="Vesting Period" value={stakingPool.vesting} />
          </dl>
        </section>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  unpublished,
}: {
  label: string;
  value: string;
  unpublished?: boolean;
}) {
  return (
    <div>
      <dt className="text-[12px] text-muted">{label}:</dt>
      <dd
        className={cn(
          "mt-1 text-sm tracking-wide text-cream",
          unpublished && "text-muted",
        )}
      >
        {value}
      </dd>
    </div>
  );
}

function DisabledCta({ label }: { label: string }) {
  return (
    <button
      type="button"
      disabled
      className="inline-flex h-11 cursor-not-allowed items-stretch overflow-hidden border border-line text-[13px] tracking-wide text-cream/45"
    >
      <span className="grid w-11 shrink-0 place-items-center border-r border-current/20">
        <ChevronsRight className="h-4 w-4" />
      </span>
      <span className="flex items-center px-4">{label}</span>
    </button>
  );
}
