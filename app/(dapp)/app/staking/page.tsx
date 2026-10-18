import type { Metadata } from "next";
import { StakingDesk } from "@/components/dapp/staking-desk";

export const metadata: Metadata = {
  title: "Staking",
  description: "Stake thUSD and review the staking pool.",
};

export default function StakingPage() {
  return <StakingDesk />;
}
