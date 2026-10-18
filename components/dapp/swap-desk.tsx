"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronsRight } from "lucide-react";
import { TokenMark } from "@/components/dapp/token-mark";
import { EmptyState } from "@/components/dapp/states";
import {
  LIQUIDITY_POOL_URL,
  demoHoldings,
  swapPayAssets,
  swapQuote,
} from "@/lib/dapp/fixtures";
import { formatPrecise } from "@/lib/dapp/format";
import { SWAP_PERCENTS, type StableId, type SwapTabId } from "@/lib/dapp/types";
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

export function SwapDesk() {
  const [tab, setTab] = useState<SwapTabId>("swap");
  const [payId, setPayId] = useState<StableId>("USDT");
  const [amount, setAmount] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [redeem, setRedeem] = useState(false);
  const [wrapAmount, setWrapAmount] = useState("");

  const payAsset =
    swapPayAssets.find((asset) => asset.id === payId) ?? swapPayAssets[0];
  const payValue = parseAmount(amount);
  const receiveValue = payValue * swapQuote.rate;
  const overBalance = payValue > (payAsset?.balance ?? 0) + 1e-9;
  const overMint = payValue > swapQuote.mintableRemaining;
  const thusdBalance =
    demoHoldings.find((token) => token.id === "thUSD")?.balanceToken ?? 0;
  const wrapValue = parseAmount(wrapAmount);
  const wrapOver = wrapValue > thusdBalance + 1e-9;

  const quoteLabel = useMemo(
    () => `1 ${payId} ≈ ${swapQuote.rate} thUSD`,
    [payId],
  );

  return (
    <div className="flex w-full flex-col">
      <h1 className="font-display text-4xl tracking-tight text-cream sm:text-5xl">
        Swap & Liquidity
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
        Mint, redeem, and provide liquidity with seamless on-chain conversions.
      </p>

      <div className="mx-auto mt-10 flex w-full max-w-lg flex-col">
      <div className="flex items-end gap-6 border-b border-white/8">
        <button
          type="button"
          onClick={() => {
            setTab("swap");
            setPickerOpen(false);
          }}
          className={cn(
            "pb-3 text-sm tracking-wide transition",
            tab === "swap"
              ? "border-b-2 border-gold text-cream"
              : "border-b-2 border-transparent text-muted hover:text-cream",
          )}
        >
          Swap
        </button>
        <a
          href={LIQUIDITY_POOL_URL}
          target="_blank"
          rel="noreferrer"
          className="pb-3 text-sm tracking-wide text-muted transition hover:text-cream"
        >
          Liquidity
        </a>
        <button
          type="button"
          onClick={() => {
            setTab("wrap");
            setPickerOpen(false);
          }}
          className={cn(
            "pb-3 text-sm tracking-wide transition",
            tab === "wrap"
              ? "border-b-2 border-gold text-cream"
              : "border-b-2 border-transparent text-muted hover:text-cream",
          )}
        >
          Wrap
        </button>
      </div>

      {tab === "swap" ? (
        <SwapForm
          payId={payId}
          amount={amount}
          pickerOpen={pickerOpen}
          redeem={redeem}
          payAsset={payAsset}
          payValue={payValue}
          receiveValue={receiveValue}
          overBalance={overBalance}
          overMint={overMint}
          quoteLabel={quoteLabel}
          onAmount={setAmount}
          onPayId={(id) => {
            setPayId(id);
            setPickerOpen(false);
          }}
          onPicker={setPickerOpen}
          onRedeem={() => setRedeem((value) => !value)}
        />
      ) : (
          <WrapForm
          amount={wrapAmount}
          balance={thusdBalance}
          over={wrapOver}
          onAmount={setWrapAmount}
        />
      )}
      </div>
    </div>
  );
}

function SwapForm({
  payId,
  amount,
  pickerOpen,
  redeem,
  payAsset,
  payValue,
  receiveValue,
  overBalance,
  overMint,
  quoteLabel,
  onAmount,
  onPayId,
  onPicker,
  onRedeem,
}: {
  payId: StableId;
  amount: string;
  pickerOpen: boolean;
  redeem: boolean;
  payAsset: { id: StableId; name: string; balance: number } | undefined;
  payValue: number;
  receiveValue: number;
  overBalance: boolean;
  overMint: boolean;
  quoteLabel: string;
  onAmount: (value: string) => void;
  onPayId: (id: StableId) => void;
  onPicker: (open: boolean) => void;
  onRedeem: () => void;
}) {
  const balance = payAsset?.balance ?? 0;

  return (
    <>
      <div className="relative mt-8">
        <div className="py-2">
          <p className="text-[13px] text-muted">You Pay</p>
          <div className="mt-2 flex items-start justify-between gap-4">
            <label className="min-w-0 flex-1">
              <span className="sr-only">Pay amount</span>
              <input
                value={amount}
                onChange={(event) => onAmount(sanitizeAmount(event.target.value))}
                inputMode="decimal"
                placeholder="0.00"
                disabled={redeem}
                className="w-full bg-transparent font-num text-5xl text-cream outline-none placeholder:text-cream/35 disabled:opacity-40"
              />
            </label>
            <TokenPicker
              value={payId}
              open={pickerOpen && !redeem}
              disabled={redeem}
              onOpen={onPicker}
              onSelect={onPayId}
            />
          </div>
          {redeem ? (
            <p className="mt-4 text-sm text-gold">Redeem coming soon</p>
          ) : (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[12px] text-muted">
              <p>
                Balance: {formatPrecise(balance, 2)} {payId}
              </p>
              <p>
                {formatPrecise(swapQuote.mintableRemaining, 3)} THUSD left to
                mint
              </p>
            </div>
          )}
          {redeem ? null : (
            <div className="mt-3 flex gap-2">
              {SWAP_PERCENTS.map((percent) => {
                const disabled = balance <= 0;
                return (
                  <button
                    key={percent}
                    type="button"
                    disabled={disabled}
                    onClick={() =>
                      onAmount(
                        formatPrecise((balance * percent) / 100, 6).replace(
                          /,/g,
                          "",
                        ),
                      )
                    }
                    className="border border-white/10 px-2.5 py-1 text-[12px] text-muted transition hover:border-gold/40 hover:text-cream disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    {percent}%
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="relative my-2 flex justify-center">
          <span className="absolute inset-x-0 top-1/2 h-px bg-white/8" />
          <button
            type="button"
            aria-label="Swap direction"
            onClick={onRedeem}
            className="relative grid h-10 w-10 place-items-center border border-white/12 bg-canvas text-cream transition hover:border-gold"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden
            >
              <path d="M8 7v10M8 17l-3-3M8 17l3-3M16 17V7M16 7l-3 3M16 7l3 3" />
            </svg>
          </button>
        </div>

        <div className="py-2">
          <p className="text-[13px] text-muted">You Receive</p>
          <div className="mt-2 flex items-center justify-between gap-4">
            <p className="font-num text-5xl text-cream">
              {redeem || payValue === 0 ? "0.00" : formatPrecise(receiveValue, 2)}
            </p>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/30 px-3 py-1.5">
              <TokenMark id="thUSD" size={22} />
              <span className="text-sm text-cream">thUSD</span>
            </span>
          </div>
        </div>
      </div>

      {redeem ? (
        <div className="mt-4">
          <EmptyState
            title="Redeem coming soon"
            body="Reverse conversion is not available yet."
          />
        </div>
      ) : overMint ? (
        <p className="mt-4 text-sm text-red-300/90">
          Amount exceeds the mint remaining of{" "}
          {formatPrecise(swapQuote.mintableRemaining, 3)} THUSD.
        </p>
      ) : overBalance && payValue > 0 ? (
        <p className="mt-4 text-sm text-red-300/90">
          Not enough balance. You only have {formatPrecise(balance, 2)} {payId}.
        </p>
      ) : null}

      <DisabledWalletCta />

      <section className="mt-10">
        <h2 className="text-lg text-cream">Rate & Swap Info</h2>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-muted">Rate:</dt>
            <dd className="text-cream">{quoteLabel}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-muted">Price Impact:</dt>
            <dd className="text-[#8fba7a]">{swapQuote.priceImpact}</dd>
          </div>
        </dl>
      </section>
    </>
  );
}

function WrapForm({
  amount,
  balance,
  over,
  onAmount,
}: {
  amount: string;
  balance: number;
  over: boolean;
  onAmount: (value: string) => void;
}) {
  const value = parseAmount(amount);

  return (
    <div className="mt-8">
      <p className="text-sm text-muted">Wrap (thUSD → wthUSD)</p>
      <div className="mt-4 flex items-start justify-between gap-4">
        <label className="min-w-0 flex-1">
          <span className="sr-only">Wrap amount</span>
          <input
            value={amount}
            onChange={(event) => onAmount(sanitizeAmount(event.target.value))}
            inputMode="decimal"
            placeholder="0.00"
            className="w-full bg-transparent font-num text-5xl text-cream outline-none placeholder:text-cream/35"
          />
        </label>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/30 px-3 py-1.5">
          <TokenMark id="thUSD" size={22} />
          <span className="text-sm text-cream">thUSD</span>
        </span>
      </div>
      <button
        type="button"
        onClick={() => onAmount(formatPrecise(balance, 6).replace(/,/g, ""))}
        disabled={balance <= 0}
        className="mt-4 text-[12px] text-muted transition hover:text-cream disabled:cursor-not-allowed disabled:opacity-35"
      >
        Balance: {formatPrecise(balance, 2)} thUSD
      </button>
      <p className="mt-6 flex items-center justify-between text-sm">
        <span className="text-muted">You receive</span>
        <span className="font-num text-cream">
          {value === 0 ? "0.00" : formatPrecise(value, 2)} wthUSD
        </span>
      </p>
      {over ? (
        <p className="mt-4 text-sm text-red-300/90">
          Not enough balance. You only have {formatPrecise(balance, 2)} thUSD.
        </p>
      ) : null}
      <DisabledWalletCta />
    </div>
  );
}

function TokenPicker({
  value,
  open,
  disabled,
  onOpen,
  onSelect,
}: {
  value: StableId;
  open: boolean;
  disabled?: boolean;
  onOpen: (open: boolean) => void;
  onSelect: (id: StableId) => void;
}) {
  return (
    <div className="relative shrink-0">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
        onClick={() => onOpen(!open)}
        className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/30 px-3 py-1.5 text-sm text-cream disabled:opacity-50"
      >
        <TokenMark id={value} size={22} />
        {value}
        <ChevronDown className={cn("h-3.5 w-3.5 text-muted", open && "rotate-180")} />
      </button>
      {open ? (
        <ul
          role="listbox"
          aria-label="Pay token"
          className="absolute top-[calc(100%+8px)] right-0 z-10 min-w-[148px] border border-white/12 bg-[#120f0c] py-1 shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
        >
          {swapPayAssets.map((asset) => (
            <li key={asset.id}>
              <button
                type="button"
                role="option"
                aria-selected={asset.id === value}
                onClick={() => onSelect(asset.id)}
                className={cn(
                  "flex w-full items-center gap-2 px-3 py-2 text-left text-sm",
                  asset.id === value
                    ? "bg-white/8 text-cream"
                    : "text-muted hover:bg-white/5 hover:text-cream",
                )}
              >
                <TokenMark id={asset.id} size={18} />
                {asset.name}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function DisabledWalletCta() {
  return (
    <div className="mt-8">
      <button
        type="button"
        disabled
        className="inline-flex h-12 w-full cursor-not-allowed items-stretch overflow-hidden border border-line text-[13px] tracking-wide text-cream/45"
      >
        <span className="grid w-12 shrink-0 place-items-center border-r border-current/20">
          <ChevronsRight className="h-4 w-4" />
        </span>
        <span className="flex flex-1 items-center justify-center px-5">
          Connect wallet
        </span>
      </button>
    </div>
  );
}
