import Link from "next/link";
import { cn } from "@/lib/cn";

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "font-sans text-[1.35rem] font-medium tracking-[-0.045em] text-white sm:text-[1.5rem]",
        className,
      )}
      aria-label="tharwa home"
    >
      tharwa
    </Link>
  );
}
