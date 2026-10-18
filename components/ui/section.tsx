import { ChevronsRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

export function Section({
  id,
  label,
  title,
  subtitle,
  children,
  className,
  tone = "canvas",
}: {
  id: string;
  label: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  tone?: "canvas" | "surface";
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 border-t border-line py-20 sm:py-24",
        tone === "surface" ? "bg-surface" : "bg-canvas",
        className,
      )}
    >
      <Container>
        <div className="max-w-3xl">
          <p className="flex items-center gap-2 text-[11px] font-medium tracking-[0.22em] text-gold uppercase">
            <ChevronsRight className="h-3.5 w-3.5" />
            {label}
          </p>
          <h2 className="mt-4 font-display text-4xl leading-[0.95] tracking-tight text-cream sm:text-6xl">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-muted">{subtitle}</p>
          ) : null}
        </div>
        <div className="mt-12">{children}</div>
      </Container>
    </section>
  );
}

export function Panel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border border-line bg-raised/80 p-6 sm:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
