import Link from "next/link";
import { ChevronsRight } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Tone = "on-dark" | "on-light" | "inverse";

type Shared = {
  href?: string;
  tone?: Tone;
  withChevron?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = Shared &
  Omit<ComponentProps<"button">, "className" | "children"> & { href?: undefined };

type ButtonAsLink = Shared &
  Omit<ComponentProps<typeof Link>, "className" | "children" | "href"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const tones: Record<Tone, string> = {
  "on-dark":
    "border-line bg-canvas text-cream hover:border-gold",
  "on-light":
    "border-cream bg-cream text-canvas hover:bg-white",
  inverse:
    "border-line bg-raised text-cream hover:border-gold",
};

export function Button(props: ButtonProps) {
  const {
    href,
    tone = "on-dark",
    withChevron = true,
    className,
    children,
    ...rest
  } = props;

  const classes = cn(
    "group inline-flex h-12 items-stretch overflow-hidden border text-[13px] font-medium tracking-wide transition",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
    tones[tone],
    className,
  );

  const inner = (
    <>
      {withChevron ? (
        <span className="grid w-12 shrink-0 place-items-center border-r border-current/20">
          <ChevronsRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      ) : null}
      <span className="flex items-center px-5">{children}</span>
    </>
  );

  if (href) {
    const linkProps = rest as Omit<ButtonAsLink, keyof Shared>;
    if (href.startsWith("http") || href.startsWith("#")) {
      return (
        <a
          href={href}
          className={classes}
          {...(href.startsWith("http")
            ? { target: "_blank", rel: "noreferrer" }
            : {})}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...linkProps}>
        {inner}
      </Link>
    );
  }

  const buttonProps = rest as Omit<ButtonAsButton, keyof Shared>;
  return (
    <button className={classes} {...buttonProps}>
      {inner}
    </button>
  );
}
