import type { Metadata } from "next";
import { SwapDesk } from "@/components/dapp/swap-desk";

export const metadata: Metadata = {
  title: "Swap",
  description: "Mint, redeem, and provide liquidity.",
};

export default function SwapPage() {
  return <SwapDesk />;
}
