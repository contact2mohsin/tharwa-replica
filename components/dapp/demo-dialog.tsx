"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DemoDialog({
  title,
  body,
  onClose,
}: {
  title: string;
  body: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
      <button
        type="button"
        aria-label="Dismiss dialog"
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-dialog-title"
        className="relative w-full max-w-md border border-gold/25 bg-[#120f0c] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-cream/60 transition hover:text-cream"
          aria-label="Close dialog"
        >
          <X className="h-4 w-4" />
        </button>
        <h2
          id="demo-dialog-title"
          className="font-display text-3xl tracking-tight text-cream"
        >
          {title}
        </h2>
        <p className="mt-4 text-sm leading-6 text-muted">{body}</p>
        <Button type="button" className="mt-7" onClick={onClose}>
          Understood
        </Button>
      </div>
    </div>
  );
}
