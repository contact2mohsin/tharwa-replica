import type {
  AllocationLane,
  ChartRangeId,
  ChartSeries,
  ChartTokenId,
  DemoAction,
  OhlcvPoint,
  ProtocolMeter,
  ProtocolStat,
  CardBenefit,
  CardChoice,
  StakingPool,
  SwapPayAsset,
  SwapQuoteInfo,
  TokenHolding,
} from "@/lib/dapp/types";

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function series(
  token: ChartTokenId,
  range: ChartRangeId,
  count: number,
  start: number,
  drift: number,
  vol: number,
  seed: number,
): OhlcvPoint[] {
  const rand = seeded(seed);
  const points: OhlcvPoint[] = [];
  let price = start;
  const now = Date.UTC(2026, 9, 18);
  const stepMs =
    range === "7D"
      ? 6 * 60 * 60 * 1000
      : range === "30D"
        ? 24 * 60 * 60 * 1000
        : range === "90D"
          ? 3 * 24 * 60 * 60 * 1000
          : 7 * 24 * 60 * 60 * 1000;

  for (let i = 0; i < count; i += 1) {
    const change = (rand() - 0.46) * vol + drift;
    const o = price;
    const c = Math.max(0.01, o * (1 + change));
    const h = Math.max(o, c) * (1 + rand() * vol * 0.35);
    const l = Math.min(o, c) * (1 - rand() * vol * 0.35);
    points.push({
      t: new Date(now - (count - i) * stepMs).toISOString(),
      o: Number(o.toFixed(4)),
      h: Number(h.toFixed(4)),
      l: Number(l.toFixed(4)),
      c: Number(c.toFixed(4)),
    });
    price = c;
  }
  return points;
}

export const demoHoldings: readonly TokenHolding[] = [
  {
    id: "TRWA",
    name: "TRWA",
    role: "Governance Token",
    blurb: "Protocol governance rights.",
    balanceUsd: 1840,
    balanceToken: 12850,
    status: "live",
  },
  {
    id: "sTRWA",
    name: "sTRWA",
    role: "Staked Governance",
    blurb: "Staked TRWA is in development.",
    balanceUsd: 0,
    balanceToken: 0,
    status: "in-development",
  },
  {
    id: "thUSD",
    name: "thUSD",
    role: "Smart Stablecoin",
    blurb: "Faith-aligned stablecoin lane.",
    balanceUsd: 4250,
    balanceToken: 4250,
    status: "live",
  },
  {
    id: "sthUSD",
    name: "sthUSD",
    role: "Yield-Bearing Token",
    blurb: "Yield-bearing wrap of thUSD.",
    balanceUsd: 2100,
    balanceToken: 2100,
    status: "live",
  },
  {
    id: "wthUSD",
    name: "wthUSD",
    role: "Global Market Stablecoin",
    blurb: "Global-markets lane. Separate from the faith-aligned books.",
    balanceUsd: 0,
    balanceToken: 0,
    status: "in-development",
  },
] as const;

export const emptyHoldings: readonly TokenHolding[] = demoHoldings.map(
  (token) => ({
    ...token,
    balanceUsd: 0,
    balanceToken: 0,
  }),
);

export const protocolPrice = {
  token: "thUSD" as const,
  usd: 1,
  changePct: 0.02,
  caption: "",
};

export const protocolMeters: readonly ProtocolMeter[] = [
  {
    id: "minted",
    label: "Minted",
    valueLabel: "1.19M",
    percent: 33,
    tone: "gold",
  },
  {
    id: "staked",
    label: "Staked",
    valueLabel: "96.62K",
    percent: 3,
    tone: "cream",
  },
  {
    id: "mintable",
    label: "Mintable",
    valueLabel: "2.36M",
    percent: 67,
    tone: "muted",
  },
] as const;

export const protocolStats: readonly ProtocolStat[] = [
  {
    id: "tvl",
    label: "TVL",
    value: "224.90K LP",
    note: null,
  },
  {
    id: "mcap",
    label: "$TRWA MKT CAP",
    value: "$1.44M",
    note: null,
  },
  {
    id: "holders",
    label: "Holders",
    value: "—",
    note: null,
  },
] as const;

export const allocationLanes: readonly AllocationLane[] = [
  {
    id: "faith",
    label: "Faith-Aligned",
    percent: 70,
    description: "Sukuk, real estate, and gold as described for the thUSD lane.",
    assets: [
      { id: "sukuk", label: "Sukuk", percentOfLane: 42 },
      { id: "real-estate", label: "Real estate", percentOfLane: 33 },
      { id: "gold", label: "Gold", percentOfLane: 25 },
    ],
  },
  {
    id: "global",
    label: "Global Markets",
    percent: 30,
    description: "T-Bills and broader instruments described for the wthUSD lane.",
    assets: [
      { id: "tbills", label: "T-Bills", percentOfLane: 40 },
      { id: "gold-g", label: "Gold", percentOfLane: 35 },
      { id: "equities", label: "Halal equities", percentOfLane: 25 },
    ],
  },
] as const;

const trwa7 = series("TRWA", "7D", 28, 0.142, 0.0012, 0.035, 11);
const trwa30 = series("TRWA", "30D", 30, 0.128, 0.0008, 0.04, 23);
const trwa90 = series("TRWA", "90D", 30, 0.11, 0.0006, 0.045, 41);
const thusd7 = series("thUSD", "7D", 28, 1.0, 0, 0.0012, 7);
const thusd30 = series("thUSD", "30D", 30, 0.999, 0, 0.001, 9);
const thusd90 = series("thUSD", "90D", 30, 0.998, 0, 0.0014, 13);

export const chartCatalog: readonly ChartSeries[] = [
  {
    token: "TRWA",
    range: "7D",
    status: "ok",
    caption: "TRWA 7-day price (6-hour candles)",
    errorMessage: null,
    points: trwa7,
  },
  {
    token: "TRWA",
    range: "30D",
    status: "ok",
    caption: "TRWA 30-day price (daily candles)",
    errorMessage: null,
    points: trwa30,
  },
  {
    token: "TRWA",
    range: "90D",
    status: "ok",
    caption: "TRWA 90-day price (3-day candles)",
    errorMessage: null,
    points: trwa90,
  },
  {
    token: "TRWA",
    range: "1Y",
    status: "unavailable",
    caption: "TRWA 1-year price",
    errorMessage: "Series unavailable for this range.",
    points: [],
  },
  {
    token: "thUSD",
    range: "7D",
    status: "ok",
    caption: "thUSD 7-day price (parity target)",
    errorMessage: null,
    points: thusd7,
  },
  {
    token: "thUSD",
    range: "30D",
    status: "ok",
    caption: "thUSD 30-day price (parity target)",
    errorMessage: null,
    points: thusd30,
  },
  {
    token: "thUSD",
    range: "90D",
    status: "ok",
    caption: "thUSD 90-day price (parity target)",
    errorMessage: null,
    points: thusd90,
  },
  {
    token: "thUSD",
    range: "1Y",
    status: "empty",
    caption: "thUSD 1-year price",
    errorMessage: null,
    points: [],
  },
] as const;

export function getChartSeries(
  token: ChartTokenId,
  range: ChartRangeId,
): ChartSeries {
  const found = chartCatalog.find(
    (item) => item.token === token && item.range === range,
  );
  if (!found) {
    return {
      token,
      range,
      status: "unavailable",
      caption: `${token} ${range}`,
      errorMessage: "No series registered for this view.",
      points: [],
    };
  }
  return found;
}

export const demoActions: readonly DemoAction[] = [
  {
    id: "deposit",
    title: "Deposit",
    body: "Mint thUSD from listed stablecoins.",
    kind: "dialog",
    dialogTitle: "Deposit",
    dialogBody: "Choose a wallet to continue.",
  },
  {
    id: "swap",
    title: "Swap",
    body: "Exchange between listed tokens.",
    kind: "route",
    href: "/app/swap",
  },
  {
    id: "stake",
    title: "Stake",
    body: "Lock thUSD and earn from the pool.",
    kind: "route",
    href: "/app/staking",
  },
  {
    id: "earn",
    title: "Earn boosted yield",
    body: "Access boosted yield strategies.",
    kind: "dialog",
    dialogTitle: "Earn boosted yield",
    dialogBody: "Choose a wallet to continue.",
  },
  {
    id: "bridge",
    title: "Bridge",
    body: "Move assets across chains.",
    kind: "disabled",
  },
] as const;

export const navItems = [
  { href: "/app", label: "Overview", icon: "overview" },
  { href: "/app/swap", label: "Swap", icon: "swap" },
  { href: "/app/staking", label: "Staking", icon: "staking" },
  { href: "/app/card", label: "Card", icon: "card" },
] as const;

export const updateLinks = [
  { href: "/app/changelog", label: "Changelog" },
] as const;

export const swapPayAssets: readonly SwapPayAsset[] = [
  { id: "USDT", name: "USDT", balance: 2500 },
  { id: "USDC", name: "USDC", balance: 800 },
  { id: "DAI", name: "DAI", balance: 0 },
] as const;

export const swapQuote: SwapQuoteInfo = {
  rate: 1,
  priceImpact: "Low",
  mintableRemaining: 2361100.895,
  mintableNote: "",
};

export const LIQUIDITY_POOL_URL =
  "https://www.curve.finance/dex/ethereum/pools/factory-stable-ng-502/deposit/";

export const stakingPool: StakingPool = {
  token: "thUSD",
  locked: 96622.1717,
  stakingApy: "—",
  lockingApyPct: 0,
  enterFeePct: 0,
  exitFeePct: 3,
  poolSizeLabel: "$96.62K",
  totalStakers: "—",
  cooldown: "—",
  vesting: "30 Days",
  caption: "",
};

export const cardBenefits: readonly CardBenefit[] = [
  {
    id: "cashback",
    title: "Up to 8% cashback in TRWA",
    body: "Every swipe earns native TRWA. No points, no expiry.",
    note: "",
  },
  {
    id: "global",
    title: "Spend thUSD globally",
    body: "Pay in 150+ countries with auto-conversion at zero FX markup.",
    note: "",
  },
  {
    id: "fees",
    title: "0% FX & no monthly fee",
    body: "Transparent on-chain settlement. What you spend is what you pay.",
    note: "",
  },
  {
    id: "drops",
    title: "Founder Drops & airdrops",
    body: "Card holders get priority access to vault drops and partner perks.",
    note: "",
  },
] as const;

export const cardSpending: readonly CardChoice[] = [
  { id: "u1k", label: "Under $1,000" },
  { id: "1to5", label: "$1,000 – $5,000" },
  { id: "5to10", label: "$5,000 – $10,000" },
  { id: "10to25", label: "$10,000 – $25,000" },
  { id: "25p", label: "$25,000+" },
] as const;

export const cardPreferences: readonly CardChoice[] = [
  { id: "metal", label: "Physical metal" },
  { id: "virtual", label: "Virtual" },
  { id: "both", label: "Both" },
] as const;

export const cardUseCases: readonly CardChoice[] = [
  { id: "daily", label: "Daily essentials" },
  { id: "travel", label: "Travel & dining" },
  { id: "online", label: "Online & subs" },
  { id: "business", label: "Business" },
  { id: "luxury", label: "Luxury & lifestyle" },
  { id: "crypto", label: "Crypto on/off-ramp" },
] as const;
