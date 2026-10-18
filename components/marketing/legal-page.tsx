import { Container } from "@/components/ui/container";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <article className="bg-canvas pb-24 pt-32 text-cream sm:pt-40">
      <Container className="max-w-3xl">
        <p className="text-[11px] tracking-[0.2em] text-gold uppercase">{updated}</p>
        <h1 className="mt-4 font-display text-5xl tracking-tight text-cream">{title}</h1>
        <div className="mt-10 space-y-6 text-[15px] leading-7 text-muted [&_a]:text-cream [&_a]:underline">
          {children}
        </div>
      </Container>
    </article>
  );
}
