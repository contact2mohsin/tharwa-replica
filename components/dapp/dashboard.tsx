"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, Info } from "lucide-react";
import { AllocationPanel } from "@/components/dapp/allocation";
import { DemoDialog } from "@/components/dapp/demo-dialog";
import { PriceChart } from "@/components/dapp/price-chart";
import { Skeleton } from "@/components/dapp/states";
import { TokenMark } from "@/components/dapp/token-mark";
import {
  demoActions,
  demoHoldings,
  getChartSeries,
  protocolMeters,
  protocolPrice,
  protocolStats,
} from "@/lib/dapp/fixtures";
import { formatPct, formatTokenAmount, formatUsd } from "@/lib/dapp/format";
import type {
  ChartRangeId,
  ChartTokenId,
  DemoAction,
  DemoActionId,
  TokenHolding,
} from "@/lib/dapp/types";
import { cn } from "@/lib/cn";

const actionGlyphs: Record<DemoActionId, string> = {
  deposit: "M12 4v10M8 10l4 4 4-4M5 18h14",
  swap: "M7 7h11M18 7l-3-3M18 7l-3 3M17 17H6M6 17l3-3M6 17l3 3",
  stake: "M4 8h16v10H4zM8 8V6h8v2",
  earn: "M12 4v16M7 9l5-5 5 5",
  bridge: "M5 12h6M13 12h6M7 9v6M17 9v6",
};

export function Dashboard() {
  const [hidden, setHidden] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [chartToken, setChartToken] = useState<ChartTokenId>("TRWA");
  const [chartRange, setChartRange] = useState<ChartRangeId>("30D");
  const [chartLoading, setChartLoading] = useState(true);
  const [chartTick, setChartTick] = useState(0);
  const [infoToken, setInfoToken] = useState<TokenHolding | null>(null);
  const [dialog, setDialog] = useState<DemoAction | null>(null);

  const holdings = demoHoldings;
  const portfolio = holdings.reduce((sum, token) => sum + token.balanceUsd, 0);
  const series = useMemo(
    () => getChartSeries(chartToken, chartRange),
    [chartToken, chartRange, chartTick],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => setHydrated(true), 480);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    setChartLoading(true);
    const timer = window.setTimeout(() => setChartLoading(false), 420);
    return () => window.clearTimeout(timer);
  }, [chartToken, chartRange, chartTick]);

  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[10px] tracking-[0.28em] text-gold uppercase">
            Overview
          </p>
          <h1 className="mt-2 font-display text-4xl tracking-tight text-cream sm:text-[2.75rem]">
            Total Portfolio Value
          </h1>
          <p className="portfolio-figure mt-4 font-num text-6xl sm:text-7xl">
            {hydrated ? formatUsd(portfolio) : "—"}
          </p>
        </div>
        <div className="flex items-start gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8fba7a]" />
          <div>
            <p className="text-[12px] tracking-[0.18em] text-[#8fba7a] uppercase">
              Status: Active
            </p>
            <p className="mt-1 text-sm text-muted">System Operating Normally</p>
          </div>
        </div>
      </section>

      <div>
        <button
          type="button"
          onClick={() => setHidden((value) => !value)}
          className="flex items-center gap-2 text-[13px] tracking-[0.04em] text-gold"
        >
          {hidden ? "Show Wallet Balances" : "Hide Wallet Balances"}
          <ChevronDown
            className={cn("h-4 w-4 transition", !hidden && "rotate-180")}
          />
        </button>

        {hidden ? null : !hydrated ? (
          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="token-card p-5">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="mt-6 h-8 w-24" />
                <Skeleton className="mt-4 h-3 w-28" />
              </div>
            ))}
          </div>
        ) : (
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {holdings.map((token) => (
              <li key={token.id} className="token-card p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <TokenMark id={token.id} />
                    <p className="text-sm tracking-[0.12em] text-cream">
                      {token.name}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label={`Info about ${token.name}`}
                    onClick={() => setInfoToken(token)}
                    className="grid h-6 w-6 place-items-center text-muted transition hover:text-cream"
                  >
                    <Info className="h-3.5 w-3.5" />
                  </button>
                </div>
                <p className="mt-6 font-num text-4xl text-cream">
                  {formatUsd(token.balanceUsd)}
                </p>
                <p className="mt-1 font-num text-[13px] text-muted">
                  {formatTokenAmount(token.balanceToken)} {token.id}
                </p>
                <p className="mt-5 text-[11px] tracking-[0.14em] text-muted/80 uppercase">
                  » {token.role}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1.45fr)_minmax(16rem,0.7fr)]">
        <div className="dapp-panel p-5 sm:p-6">
          <p className="font-display text-3xl text-cream">Protocol stats</p>
          <p className="mt-1 text-sm text-muted">
            Live performance and system-wide indicators.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <TokenMark id="thUSD" size={52} />
            <div>
              <p className="font-display text-4xl text-cream">thUSD</p>
              <p className="text-sm text-muted">
                {formatUsd(protocolPrice.usd)}{" "}
                <span className="text-gold">
                  {formatPct(protocolPrice.changePct)}
                </span>
              </p>
            </div>
          </div>
          <div className="mt-8 flex gap-[3px]">
            {protocolMeters.flatMap((meter) => {
              const cells = Math.max(1, Math.round((meter.percent ?? 1) / 3.4));
              return Array.from({ length: cells }).map((_, i) => (
                <span
                  key={`${meter.id}-${i}`}
                  className={cn(
                    "h-3.5 flex-1",
                    meter.tone === "gold"
                      ? "bg-gold/85"
                      : meter.tone === "cream"
                        ? "bg-cream/40"
                        : "bg-white/12",
                  )}
                  title={`${meter.label} ${meter.valueLabel}`}
                />
              ));
            })}
          </div>
          <dl className="mt-6 grid gap-4 sm:grid-cols-3">
            {protocolMeters.map((meter) => (
              <div key={meter.id}>
                <dt className="flex items-center gap-2 text-[11px] tracking-[0.18em] text-muted uppercase">
                  <span
                    className={cn(
                      "h-2.5 w-2.5",
                      meter.tone === "gold"
                        ? "bg-gold/85"
                        : meter.tone === "cream"
                          ? "bg-cream/40"
                          : "bg-white/12",
                    )}
                  />
                  {meter.label}
                </dt>
                <dd className="mt-1 font-num text-3xl text-cream">
                  {meter.valueLabel}
                </dd>
                <p className="font-num text-sm text-muted">
                  {meter.percent == null ? "—" : `${meter.percent}%`}
                </p>
              </div>
            ))}
          </dl>
        </div>

        <div className="grid gap-3">
          {protocolStats.map((stat) => (
            <div key={stat.id} className="dapp-panel p-5">
              <p className="text-[11px] tracking-[0.18em] text-muted uppercase">
                {stat.label}
              </p>
              <p className="mt-2 font-num text-3xl text-cream">
                {stat.value}
              </p>
              {stat.note ? (
                <p className="mt-2 text-[12px] text-muted">{stat.note}</p>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section>
        <p className="font-display text-3xl text-cream">Take Action</p>
        <p className="mt-1 text-sm text-muted">
          All essential actions to grow and manage your portfolio.
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {demoActions.map((action) => {
            const inner = (
              <>
                <span className="grid h-10 w-10 place-items-center border border-gold/25 bg-gold/8 text-gold">
                  <ActionGlyph d={actionGlyphs[action.id]} />
                </span>
                <span className="mt-4 font-display text-2xl">{action.title}</span>
                <span className="mt-2 text-sm leading-5 text-muted">
                  {action.body}
                </span>
                {action.kind === "disabled" ? (
                  <span className="mt-3 text-[11px] tracking-[0.18em] text-gold uppercase">
                    Coming soon
                  </span>
                ) : null}
              </>
            );

            return (
              <li key={action.id}>
                {action.kind === "route" && action.href ? (
                  <Link href={action.href} className="dapp-action">
                    {inner}
                  </Link>
                ) : (
                  <button
                    type="button"
                    disabled={action.kind === "disabled"}
                    onClick={() =>
                      action.kind === "dialog" ? setDialog(action) : undefined
                    }
                    className={cn(
                      "dapp-action w-full text-left",
                      action.kind === "disabled" &&
                        "cursor-not-allowed opacity-45",
                    )}
                  >
                    {inner}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <div className="grid gap-4 xl:grid-cols-[1.35fr_0.85fr]">
        <PriceChart
          series={series}
          token={chartToken}
          range={chartRange}
          loading={chartLoading}
          onToken={setChartToken}
          onRange={setChartRange}
          onRetry={() => setChartTick((value) => value + 1)}
        />
        <AllocationPanel />
      </div>

      {infoToken ? (
        <DemoDialog
          title={infoToken.name}
          body={infoToken.blurb}
          onClose={() => setInfoToken(null)}
        />
      ) : null}
      {dialog ? (
        <DemoDialog
          title={dialog.dialogTitle ?? dialog.title}
          body={dialog.dialogBody ?? dialog.body}
          onClose={() => setDialog(null)}
        />
      ) : null}
    </div>
  );
}

function ActionGlyph({ d }: { d: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}
