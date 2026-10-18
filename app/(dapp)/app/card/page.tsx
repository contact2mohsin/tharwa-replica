import type { Metadata } from "next";
import { CardDesk } from "@/components/dapp/card-desk";

export const metadata: Metadata = {
  title: "Card",
  description: "Reserve a Tharwa Black Card founder slot.",
};

export default function CardPage() {
  return <CardDesk />;
}
