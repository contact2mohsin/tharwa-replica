export const TOKEN_IDS = [
  "TRWA",
  "sTRWA",
  "thUSD",
  "sthUSD",
  "wthUSD",
] as const;

export type TokenId = (typeof TOKEN_IDS)[number];

export const CHART_TOKEN_IDS = ["TRWA", "thUSD"] as const;
export type ChartTokenId = (typeof CHART_TOKEN_IDS)[number];

export const CHART_RANGES = ["7D", "30D", "90D", "1Y"] as const;
export type ChartRangeId = (typeof CHART_RANGES)[number];

export type DemoStatus = "ok" | "empty" | "unavailable";

export type TokenHolding = {
  id: TokenId;
  name: string;
  role: string;
  blurb: string;
  balanceUsd: number;
  balanceToken: number;
  status: "live" | "in-development";
};

export type ProtocolMeter = {
  id: string;
  label: string;
  valueLabel: string;
  percent: number | null;
  tone: "gold" | "cream" | "muted";
};

export type ProtocolStat = {
  id: string;
  label: string;
  value: string;
  note: string | null;
};

export type OhlcvPoint = {
  t: string;
  o: number;
  h: number;
  l: number;
  c: number;
};

export type ChartSeries = {
  token: ChartTokenId;
  range: ChartRangeId;
  status: DemoStatus;
  caption: string;
  errorMessage: string | null;
  points: OhlcvPoint[];
};

export type AllocationAsset = {
  id: string;
  label: string;
  percentOfLane: number;
};

export type AllocationLane = {
  id: "faith" | "global";
  label: string;
  percent: number;
  description: string;
  assets: AllocationAsset[];
};

export const STABLE_IDS = ["USDT", "USDC", "DAI"] as const;
export type StableId = (typeof STABLE_IDS)[number];

export type MarkId = TokenId | StableId;

export const SWAP_TABS = ["swap", "wrap"] as const;
export type SwapTabId = (typeof SWAP_TABS)[number];

export const SWAP_PERCENTS = [25, 50, 75, 100] as const;
export type SwapPercent = (typeof SWAP_PERCENTS)[number];

export type SwapPayAsset = {
  id: StableId;
  name: string;
  balance: number;
};

export type SwapQuoteInfo = {
  rate: number;
  priceImpact: "Low" | "Medium" | "High";
  mintableRemaining: number;
  mintableNote: string;
};

export type StakingPool = {
  token: "thUSD";
  locked: number;
  stakingApy: string;
  lockingApyPct: number;
  enterFeePct: number;
  exitFeePct: number;
  poolSizeLabel: string;
  totalStakers: string;
  cooldown: string;
  vesting: string;
  caption: string;
};

export type CardBenefit = {
  id: string;
  title: string;
  body: string;
  note: string;
};

export type CardChoice = {
  id: string;
  label: string;
};

export type DemoActionId = "deposit" | "swap" | "stake" | "earn" | "bridge";

export type DemoAction = {
  id: DemoActionId;
  title: string;
  body: string;
  kind: "route" | "dialog" | "disabled";
  href?: string;
  dialogTitle?: string;
  dialogBody?: string;
};
