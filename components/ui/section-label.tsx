import { ChevronsRight } from "lucide-react";
import { cn } from "@/lib/cn";

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center justify-center gap-2 text-[12px] font-medium tracking-[0.18em] text-white/45 uppercase",
        className,
      )}
    >
      <ChevronsRight className="h-3.5 w-3.5" />
      {children}
    </p>
  );
}
