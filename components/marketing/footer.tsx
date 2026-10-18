import { Container } from "@/components/ui/container";
import { Wordmark } from "@/components/marketing/wordmark";
import { footerColumns, site } from "@/lib/content";

export function MarketingFooter() {
  return (
    <footer className="border-t border-line bg-canvas pb-12 pt-16 text-cream">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <Wordmark />
            <p className="mt-6 max-w-sm text-sm leading-6 text-muted">
              Making financial abundance stable, intelligent, and accessible.
            </p>
          </div>
          <div className="grid gap-10 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-[11px] tracking-[0.2em] text-gold uppercase">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-cream/80 transition hover:text-gold"
                        {...(link.href.startsWith("http")
                          ? { target: "_blank", rel: "noreferrer" }
                          : {})}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 border-t border-line pt-8">
          <h3 className="text-[11px] tracking-[0.2em] text-gold uppercase">
            Important disclaimer
          </h3>
          <p className="mt-4 max-w-4xl text-xs leading-5 text-muted">
            Digital assets are volatile. Yields are variable and not guaranteed.
            Nothing here is investment, legal, or tax advice. We will never ask
            for a seed phrase or private key. Official documents:{" "}
            <a className="text-cream underline hover:text-gold" href={site.docs}>
              documentation
            </a>
            ,{" "}
            <a className="text-cream underline hover:text-gold" href="/terms-of-service">
              Terms of Service
            </a>
            , and{" "}
            <a className="text-cream underline hover:text-gold" href="/risk-disclosures">
              Risk Disclosures
            </a>
            .
          </p>
          <p className="mt-6 text-xs text-muted">
            © 2026 Tharwa Global Holdings Ltd. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
