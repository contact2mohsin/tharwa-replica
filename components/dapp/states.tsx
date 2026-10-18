import { cn } from "@/lib/cn";

export function Skeleton({ className }: { className?: string }) {
  return (
    <span
      className={cn("dapp-skel inline-block rounded-sm bg-white/6", className)}
    />
  );
}

export function EmptyState({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="flex min-h-[180px] flex-col items-center justify-center border border-dashed border-line px-6 text-center">
      <p className="font-display text-2xl text-cream">{title}</p>
      <p className="mt-2 max-w-sm text-sm leading-6 text-muted">{body}</p>
    </div>
  );
}

export function ErrorState({
  title,
  body,
  onRetry,
}: {
  title: string;
  body: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex min-h-[180px] flex-col items-center justify-center border border-red-500/25 bg-red-500/5 px-6 text-center">
      <p className="text-[10px] tracking-[0.28em] text-red-300/80 uppercase">
        Error
      </p>
      <p className="mt-2 font-display text-2xl text-cream">{title}</p>
      <p className="mt-2 max-w-sm text-sm leading-6 text-muted">{body}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 border border-line px-4 py-2 text-[12px] tracking-[0.18em] text-cream uppercase transition hover:border-gold"
        >
          Retry
        </button>
      ) : null}
    </div>
  );
}
