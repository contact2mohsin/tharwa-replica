import { cn } from "@/lib/cn";
import type { TokenStatus } from "@/lib/content";

export function StatusBadge({ status }: { status: TokenStatus }) {
  const live = status === "live";
  return (
    <span
      className={cn(
        "text-[11px] font-medium tracking-[0.22em] uppercase",
        live ? "text-gold" : "text-muted",
      )}
    >
      {live ? "Live & Audited" : "In Development"}
    </span>
  );
}
