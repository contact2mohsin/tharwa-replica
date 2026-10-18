export const site = {
  name: "tharwa",
  tagline: "Institutional-grade treasury infrastructure for global and Islamic finance markets",
  description:
    "Institutional-grade treasury infrastructure for global and Islamic finance markets.",
  appHref: "/app",
  discord: "https://discord.com/invite/GwwvB3m7",
  twitter: "https://x.com/TharwaUAE",
  linkedin: "https://www.linkedin.com/company/tharwa-uae/",
  github: "https://github.com/tharwa-finance",
  docs: "https://tharwa.gitbook.io/tharwa",
  audits: "https://github.com/tharwa-finance/contracts-v0/tree/main/audits",
} as const;

export const navSections = [
  { href: "#product", label: "Product" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#tokens", label: "Tokens" },
  { href: "#services", label: "Services" },
  { href: "#technology", label: "Infrastructure" },
  { href: "#security", label: "Security" },
  { href: "#team", label: "Team" },
] as const;

export const partners = [
  "Gate",
  "DeFa",
  "MEV Capital",
  "PrismSec",
  "MEXC",
  "LayerZero",
  "Pendle",
] as const;

export const yieldMetrics = [
  {
    id: "sthusd",
    value: "—",
    label: "sthUSD Variable APY",
    note: "",
  },
  {
    id: "vault",
    value: "—",
    label: "Top Fixed Vault APY",
    note: "",
  },
  {
    id: "wsthusd",
    value: "Coming Soon",
    label: "wsthUSD Variable APY",
    note: "In development",
  },
  {
    id: "strwa",
    value: "Coming Soon",
    label: "sTRWA APY",
    note: "In development",
  },
] as const;

export const faithLane = {
  kicker: "Faith-Aligned Lane",
  title: "thUSD",
  backedBy: [
    "Sukuk (Islamic bonds)",
    "Real estate",
    "Gold",
    "Shariah-compliant asset selection",
  ],
  audience:
    "For faith-conscious investors, Islamic institutions, family offices, halal-focused funds",
  cta: "Explore Faith-Aligned Products",
  href: "#tokens",
} as const;

export const globalLane = {
  kicker: "Global Markets Lane",
  title: "wthUSD",
  backedBy: [
    "Shariah-compliant assets (Sukuk, Real estate, Gold, Oil)",
    "Plus T-Bills and conventional fixed income instruments",
    "Full portfolio access for maximum yield optimization",
    "No restrictions — institutional-grade diversification",
  ],
  audience:
    "For institutional investors, DeFi protocols, global retail investors, hedge funds, DAOs",
  cta: "Explore Global Products",
  href: "#tokens",
} as const;

export const howItWorksSteps = [
  {
    id: "mint",
    title: "Mint thUSD",
    body: "Deposit supported stablecoins through designated minting channels. Instant minting targets 1:1 issuance — an objective, not a guarantee.",
  },
  {
    id: "deploy",
    title: "Protocol Deploys to RWAs",
    body: "Capital is allocated across diversified real-world assets: Sukuk, real estate, gold, oil, and T-Bills (wthUSD only), described as managed by the Confluence Engine.",
  },
  {
    id: "earn",
    title: "Earn Real Yield",
    body: "Yield-bearing positions such as sthUSD are described as distributing variable RWA yield. Displayed figures on the original interface are indicative and not a promise.",
  },
] as const;

export type TokenStatus = "live" | "development";

export type TokenCard = {
  id: string;
  kicker: string;
  name: string;
  meta: string;
  points: string[];
  status: TokenStatus;
  href: string;
};

export const tokens: TokenCard[] = [
  {
    id: "trwa",
    kicker: "Governance Token",
    name: "TRWA",
    meta: "Listed On: Uniswap, Gate.com, MEXC.com",
    points: [
      "Protocol governance rights",
      "Enhanced vault access",
      "Yield multipliers",
    ],
    status: "live",
    href: "/app",
  },
  {
    id: "thusd",
    kicker: "Smart Stablecoin",
    name: "thUSD",
    meta: "Market Access: Islamic Faith-Aligned",
    points: [
      "RWA-backed stability",
      "Dynamic portfolio management",
      "LayerZero cross-chain compatible",
      "Instant liquidity",
    ],
    status: "live",
    href: "/app",
  },
  {
    id: "wthusd",
    kicker: "Global Market Stablecoin",
    name: "wthUSD",
    meta: "Market Access: Global",
    points: [
      "Conventional finance lane",
      "Exposure to T-Bills and global markets",
      "Full portfolio access (non-Shariah assets included)",
      "Institutional focused",
    ],
    status: "live",
    href: "/app",
  },
  {
    id: "strwa",
    kicker: "Staked Governance",
    name: "sTRWA",
    meta: "Yield: Coming Soon",
    points: [
      "Stake TRWA for rewards",
      "Enhanced governance rights",
      "Yield multipliers",
    ],
    status: "development",
    href: "/app",
  },
  {
    id: "sthusd",
    kicker: "Yield-Bearing Token",
    name: "sthUSD",
    meta: "Current APY: Variable (based on RWA yields)",
    points: [
      "Instant liquidity",
      "Zero entry/exit fees",
      "Real RWA yield distribution",
      "Composable across DeFi",
    ],
    status: "live",
    href: "/app",
  },
  {
    id: "wsthusd",
    kicker: "Wrapped Yield Token",
    name: "wsthUSD",
    meta: "Yield: Coming Soon",
    points: [
      "Global markets staked version",
      "Compounding yield over time",
      "Full portfolio exposure (including T-Bills)",
      "Enhanced yield strategies",
    ],
    status: "development",
    href: "/app",
  },
];

export const services = [
  {
    id: "vaults",
    kicker: "Fixed-Term Yield Strategies",
    title: "Vaults",
    status: "Contracts reviewed by third parties.",
    points: [
      "Multiple fixed-term strategies (90–360 days)",
      "Tradeable ERC-1155 NFTs",
      "Early exit options",
      "Fixed-term structures",
    ],
    href: "/app",
  },
  {
    id: "lending",
    kicker: "Structured Credit",
    title: "Faith-Aligned Lending",
    status: "In development.",
    points: [
      "Faith-aligned credit structures",
      "Asset-backed origination narrative",
      "Separate from the global-markets lane",
      "Access intended for institutions and family offices",
    ],
    href: "#product",
  },
  {
    id: "otc",
    kicker: "Secondary Liquidity",
    title: "OTC Marketplace",
    status: "Upcoming.",
    points: [
      "Vault certificates described as transferable",
      "Peer quotes instead of AMM curves",
      "Optional early liquidity path",
      "No guarantee of a buyer or price",
    ],
    href: "#services",
  },
  {
    id: "gold",
    kicker: "AI Agent Series",
    title: "Gold Agent",
    status: "Part of the agent roadmap.",
    points: [
      "Gold-market research assistant",
      "Macro and metals briefing style",
      "Companion to the treasury narrative",
      "Not investment advice",
    ],
    href: "#technology",
  },
] as const;

export const technologyTabs = [
  {
    id: "confluence",
    title: "The Confluence Engine",
    body: "An AI-assisted allocation engine that reviews macro conditions, rebalances across uncorrelated real-world assets, and emphasizes tail-risk methods such as CVaR.",
  },
  {
    id: "rwa",
    title: "Diversified RWA Backing",
    body: "Unlike single-asset protocols, the portfolio stays balanced across uncorrelated assets. Dual-lane architecture provides access to both faith-aligned and conventional instruments.",
  },
  {
    id: "risk",
    title: "Institutional-Grade Risk Management",
    body: "Circuit breakers, collateral monitoring, and segregated asset lanes designed for institutional-grade risk control.",
  },
] as const;

export const securityItems = [
  {
    index: "01",
    title: "Continuously Audited",
    body: "Third-party review materials, including PrismSec reports on public repositories. Additional reviews are planned.",
  },
  {
    index: "02",
    title: "Fully Collateralised",
    body: "Mint thUSD with stablecoins and convert them into diversified RWAs, with on-chain verification as a design goal. Redemption at any target value is an objective, not a promise.",
  },
  {
    index: "03",
    title: "On-chain verification",
    body: "Positions, minting, and vault certificates are described as settling on public Ethereum contracts. Blockchain transactions cannot be reversed.",
  },
] as const;

export const leadership = [
  {
    name: "Saeed Al Fahim",
    role: "Co-Founder",
    body: "Saeed brings extensive experience in overseeing large-scale operations and a deep understanding of how traditional asset markets intersect with emerging on-chain systems. His network enables direct engagement with asset originators, institutional partners, and legal advisors.",
    href: "https://www.linkedin.com/in/saeed-al-fahim-549038297/",
  },
  {
    name: "Multidisciplinary Professionals",
    role: "Our Team",
    body: "Over a dozen professionals across engineering, protocol design, security, business development, and marketing, working together to deliver a robust, transparent, and forward-looking RWA ecosystem.",
  },
  {
    name: "British Virgin Islands",
    role: "Registered Office",
    body: "Tharwa Global Holdings Ltd, having its registered office at Keyway Chambers, 3rd floor, Quastisky building, Road Town, Tortola, British Virgin Islands.",
  },
] as const;

export const footerColumns = [
  {
    title: "Products",
    links: [
      { label: "thUSD Stablecoin", href: "/app" },
      { label: "sthUSD Yield Token", href: "/app" },
      { label: "Tharwa Bonds", href: "/app" },
      { label: "TRWA Governance", href: "/app" },
      { label: "wthUSD", href: "/app" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "https://tharwa.gitbook.io/tharwa" },
      { label: "Whitepaper", href: "https://tharwa.gitbook.io/tharwa" },
      { label: "Audit Reports", href: "https://github.com/tharwa-finance/contracts-v0/tree/main/audits" },
      { label: "Developer Portal", href: "https://tharwa.gitbook.io/tharwa" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms Of Service", href: "/terms-of-service" },
      { label: "Risk Disclosures", href: "/risk-disclosures" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Discord", href: "https://discord.com/invite/GwwvB3m7" },
      { label: "Twitter (X)", href: "https://x.com/TharwaUAE" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/tharwa-uae/" },
      { label: "GitHub", href: "https://github.com/tharwa-finance" },
    ],
  },
] as const;
