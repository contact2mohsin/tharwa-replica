import { cn } from "@/lib/cn";

export function Monogram({
  label,
  className,
  variant = "warm",
}: {
  label: string;
  className?: string;
  variant?: "warm" | "cool";
}) {
  return (
    <div
      className={cn(
        "relative grid aspect-square w-28 place-items-center rounded-full sm:w-36",
        variant === "warm"
          ? "bg-[radial-gradient(circle_at_50%_40%,rgba(212,175,125,0.18),transparent_62%)]"
          : "bg-[radial-gradient(circle_at_50%_40%,rgba(180,196,210,0.16),transparent_62%)]",
        className,
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "absolute inset-[8%] rounded-full border",
          variant === "warm" ? "border-amber-200/35" : "border-slate-300/30",
        )}
      />
      <div
        className={cn(
          "absolute inset-[18%] rounded-full border",
          variant === "warm" ? "border-amber-100/20" : "border-slate-200/15",
        )}
      />
      <span
        className={cn(
          "font-display text-5xl tracking-[-0.06em] sm:text-6xl",
          variant === "warm" ? "text-amber-100/90" : "text-slate-100/85",
        )}
      >
        {label}
      </span>
    </div>
  );
}
