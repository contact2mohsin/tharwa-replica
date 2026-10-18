"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark } from "@/components/marketing/wordmark";
import { DemoDialog } from "@/components/dapp/demo-dialog";
import { site } from "@/lib/content";
import {
  navItems as dappNav,
  updateLinks as dappUpdates,
} from "@/lib/dapp/fixtures";
import { cn } from "@/lib/cn";

function Glyph({
  d,
  className,
}: {
  d: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-4 w-4", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}

const iconPaths: Record<(typeof dappNav)[number]["icon"], string> = {
  overview: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  swap: "M7 7h11M18 7l-3-3M18 7l-3 3M17 17H6M6 17l3-3M6 17l3 3",
  staking: "M4 7h16v10H4zM8 7V5h8v2",
  card: "M3 7h18v10H3zM3 11h18",
};

function NavIcon({ name }: { name: (typeof dappNav)[number]["icon"] }) {
  return <Glyph d={iconPaths[name]} />;
}

export function DappShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const crumbs = pathname === "/app" ? "Overview" : pathname.replace("/app/", "");

  return (
    <div className="flex min-h-svh bg-canvas text-cream">
      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-30 bg-black/55 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <aside
        className={cn(
          "dapp-sidebar fixed inset-y-0 left-0 z-40 flex flex-col border-r border-white/8 bg-[#100e0c] transition-[width,transform] duration-300",
          collapsed ? "w-[76px]" : "w-[248px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex h-[72px] items-center justify-between px-4">
          {collapsed ? (
            <Link href="/app" className="font-sans text-lg text-white" aria-label="tharwa home">
              t
            </Link>
          ) : (
            <Wordmark />
          )}
          <button
            type="button"
            className="hidden h-8 w-8 place-items-center border border-white/10 text-cream/70 lg:grid"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={() => setCollapsed((value) => !value)}
          >
            <Glyph
              d="M15 6l-6 6 6 6"
              className={cn("h-4 w-4 transition", collapsed && "rotate-180")}
            />
          </button>
        </div>

        <p
          className={cn(
            "px-5 pt-2 text-[10px] tracking-[0.28em] text-gold/70 uppercase",
            collapsed && "sr-only",
          )}
        >
          Menu:
        </p>
        <nav className="mt-3 flex-1 px-3" aria-label="Application">
          <ul className="space-y-1">
            {dappNav.map((item) => {
              const active =
                item.href === "/app"
                  ? pathname === "/app"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 text-[14px] transition",
                      active
                        ? "bg-white/[0.06] text-cream shadow-[inset_0_1px_0_0_rgba(201,164,106,0.9)]"
                        : "text-cream/60 hover:bg-white/[0.03] hover:text-cream",
                    )}
                  >
                    <NavIcon name={item.icon} />
                    <span className={cn(collapsed && "sr-only")}>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-white/8 px-4 py-5">
          <p
            className={cn(
              "text-[10px] tracking-[0.28em] text-muted uppercase",
              collapsed && "sr-only",
            )}
          >
            Follow us:
          </p>
          <div className={cn("mt-3 flex gap-2", collapsed && "flex-col")}>
            <SocialLink href={site.discord} label="Discord">
              <Glyph d="M7 8c2-2 8-2 10 0M8 16c.6 1.2 1.8 2 4 2s3.4-.8 4-2M9 12h.01M15 12h.01M8 8c-2 3-2 7 1 9M16 8c2 3 2 7-1 9" />
            </SocialLink>
            <SocialLink href={site.twitter} label="Twitter (X)">
              <Glyph d="M5 5l14 14M19 5L5 19" />
            </SocialLink>
            <SocialLink href={site.linkedin} label="LinkedIn">
              <Glyph d="M7 10v8M7 7v.01M11 18v-5.5c0-2 3-2.2 3 0V18M11 10.5V18" />
            </SocialLink>
            <SocialLink href={site.github} label="GitHub">
              <Glyph d="M9 19c-3 1.5-3-1.5-4-2m9 4v-3.5c0-1 .1-1.4-.5-2 2.6-.3 5.3-1.3 5.3-6A4.1 4.1 0 0 0 18 6.5 3.8 3.8 0 0 0 17.9 4S16.7 3.7 14 5.5a12 12 0 0 0-6 0C5.3 3.7 4.1 4 4.1 4A3.8 3.8 0 0 0 4 6.5 4.1 4.1 0 0 0 3.2 9.5c0 4.7 2.7 5.7 5.3 6-.6.5-.6 1.2-.5 2V21" />
            </SocialLink>
          </div>
          <p
            className={cn(
              "mt-5 text-[10px] tracking-[0.28em] text-muted uppercase",
              collapsed && "sr-only",
            )}
          >
            Updates:
          </p>
          {dappUpdates.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "mt-2 flex items-center gap-2 text-sm text-cream/70 hover:text-cream",
                collapsed && "justify-center",
              )}
            >
              <Glyph d="M6 4h12v16H6zM9 8h6M9 12h6M9 16h4" className="h-3.5 w-3.5" />
              <span className={cn(collapsed && "sr-only")}>{item.label}</span>
            </Link>
          ))}
        </div>
      </aside>

      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col transition-[padding] duration-300",
          collapsed ? "lg:pl-[76px]" : "lg:pl-[248px]",
        )}
      >
        <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-white/8 bg-canvas/90 px-4 backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="grid h-10 w-10 place-items-center border border-white/10 lg:hidden"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              {mobileOpen ? (
                <Glyph d="M6 6l12 12M18 6L6 18" />
              ) : (
                <Glyph d="M5 8h14M5 16h14" />
              )}
            </button>
            <nav aria-label="Breadcrumb" className="hidden items-center gap-2 text-[13px] text-muted sm:flex">
              <Link href="/" className="hover:text-cream" aria-label="Home">
                <Glyph d="M4 11l8-7 8 7M6 10v9h12v-9" className="h-4 w-4" />
              </Link>
              <span>›</span>
              <Link href="/app" className="hover:text-cream">
                Dashboard
              </Link>
              <span>›</span>
              <span className="capitalize text-cream">{crumbs}</span>
            </nav>
            <p className="capitalize text-cream sm:hidden">{crumbs}</p>
          </div>
          <button
            type="button"
            onClick={() => setWalletOpen(true)}
            className="h-10 border border-line px-4 text-[13px] tracking-wide text-cream transition hover:border-gold"
          >
            <span className="sm:hidden">Wallet</span>
            <span className="hidden sm:inline">Connect Wallet</span>
          </button>
        </header>

        <main className="min-w-0 flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {walletOpen ? (
        <DemoDialog
          title="Connect wallet"
          body="Choose a wallet to continue."
          onClose={() => setWalletOpen(false)}
        />
      ) : null}
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid h-8 w-8 place-items-center border border-white/10 text-cream/60 transition hover:border-gold/40 hover:text-cream"
    >
      {children}
    </a>
  );
}
