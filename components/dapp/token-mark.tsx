import type { MarkId } from "@/lib/dapp/types";
import { cn } from "@/lib/cn";

const coins: Record<
  MarkId,
  { ring: string; core: string; glyph: string; steel?: boolean }
> = {
  TRWA: { ring: "#c9a46a", core: "#1a1510", glyph: "T" },
  sTRWA: { ring: "#d4b483", core: "#16120e", glyph: "s" },
  thUSD: { ring: "#c9a46a", core: "#1a1510", glyph: "th" },
  sthUSD: { ring: "#c9a46a", core: "#14110e", glyph: "s" },
  wthUSD: { ring: "#a1a8c4", core: "#101218", glyph: "w", steel: true },
  USDT: { ring: "#c9a46a", core: "#16120e", glyph: "T" },
  USDC: { ring: "#a1a8c4", core: "#101218", glyph: "C", steel: true },
  DAI: { ring: "#d4b483", core: "#16120e", glyph: "D" },
};

export function TokenMark({
  id,
  size = 36,
}: {
  id: MarkId;
  size?: number;
}) {
  const coin = coins[id];

  return (
    <span
      className="relative grid place-items-center overflow-hidden rounded-full"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.28), transparent 42%), radial-gradient(circle at 70% 78%, rgba(0,0,0,0.55), transparent 50%), ${coin.core}`,
          boxShadow: `inset 0 0 0 1.5px ${coin.ring}, inset 0 -6px 10px rgba(0,0,0,0.45), 0 4px 10px rgba(0,0,0,0.35)`,
        }}
      />
      <span
        className={cn(
          "relative z-[1] font-display leading-none",
          coin.steel ? "text-[#c9d0e6]" : "text-gold",
        )}
        style={{ fontSize: size * (coin.glyph.length > 1 ? 0.28 : 0.42) }}
      >
        {coin.glyph}
      </span>
    </span>
  );
}
