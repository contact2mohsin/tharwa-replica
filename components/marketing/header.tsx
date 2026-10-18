"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/marketing/wordmark";
import { navSections, site } from "@/lib/content";
import { cn } from "@/lib/cn";

function MenuMark({ open }: { open: boolean }) {
  return (
    <span className="relative grid h-11 w-11 place-items-center">
      <span
        className={cn(
          "absolute inset-0 rounded-full border transition duration-300",
          open ? "border-gold/70 scale-100" : "border-white/20 scale-100",
        )}
      />
      {open ? (
        <X className="h-4 w-4 text-cream" strokeWidth={1.4} />
      ) : (
        <span className="flex flex-col gap-[5px]">
          <span className="block h-px w-4 bg-cream" />
          <span className="block h-px w-4 bg-cream" />
        </span>
      )}
    </span>
  );
}

export function MarketingHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-[background,border-color] duration-300",
          scrolled || open
            ? "border-b border-gold/20 bg-canvas/95 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="relative mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:h-[84px] sm:px-8 lg:px-10">
          <Wordmark />
          <button
            type="button"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-3 md:flex"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="text-[10px] tracking-[0.32em] text-gold/80 uppercase">
              {open ? "Close" : "Index"}
            </span>
            <MenuMark open={open} />
          </button>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex">
              <Button href={site.appHref}>Launch App</Button>
            </span>
            <button
              type="button"
              className="md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              <MenuMark open={open} />
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <>
          <button
            type="button"
            aria-label="Dismiss menu"
            className="fixed inset-x-0 top-[72px] bottom-0 z-30 bg-[#0b0a09]/45 backdrop-blur-[2px] sm:top-[84px]"
            onClick={() => setOpen(false)}
          />
          <div
            className="nav-rail fixed inset-x-0 top-[72px] z-[35] sm:top-[84px]"
            role="dialog"
            aria-label="Site index"
          >
            <div className="nav-rail-inner">
              <nav aria-label="Primary" className="nav-rail-scroller">
                <ul className="flex min-w-max md:w-full">
                  {navSections.map((item, index) => (
                    <li
                      key={item.href}
                      className="nav-rail-item md:flex-1"
                      style={{ animationDelay: `${70 + index * 45}ms` }}
                    >
                      <a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="group relative flex h-[118px] min-w-[148px] flex-col justify-center gap-2 px-6 md:min-w-0 md:px-5 lg:px-7"
                      >
                        <span className="font-mono text-[10px] tracking-[0.28em] text-gold/70">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-[1.35rem] leading-none tracking-tight text-cream transition group-hover:text-white sm:text-[1.55rem]">
                          {item.label}
                        </span>
                        <span className="absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-gold transition duration-300 group-hover:scale-x-100 sm:inset-x-7" />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="flex h-12 items-center justify-between border-t border-white/[0.06] px-5 sm:hidden">
                <Button href={site.appHref} className="h-9 text-[12px]">
                  Launch App
                </Button>
                <a
                  href="/privacy"
                  onClick={() => setOpen(false)}
                  className="text-[11px] tracking-[0.22em] text-muted uppercase"
                >
                  Privacy
                </a>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
