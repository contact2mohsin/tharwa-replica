import type { Metadata } from "next";
import { DappShell } from "@/components/dapp/shell";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Overview, swap, staking, and card desks.",
};

export default function DappLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DappShell>{children}</DappShell>;
}
