"use client";

import { useState } from "react";
import { EmptyState } from "@/components/dapp/states";
import { allocationLanes } from "@/lib/dapp/fixtures";
import type { AllocationLane } from "@/lib/dapp/types";
import { cn } from "@/lib/cn";

type Hover = {
  lane: AllocationLane["id"];
  asset?: string;
};

export function AllocationPanel() {
  const [hover, setHover] = useState<Hover>({ lane: "faith" });
  const activeLane =
    allocationLanes.find((lane) => lane.id === hover.lane) ?? allocationLanes[0];
  const activeAsset = activeLane?.assets.find((asset) => asset.id === hover.asset);

  return (
    <section className="dapp-panel p-5 sm:p-6">
      <p className="text-[10px] tracking-[0.28em] text-gold uppercase">
        Treasury mix
      </p>
      <h3 className="mt-2 font-display text-3xl text-cream">
        Asset Allocation (RWA)
      </h3>
      <p className="mt-2 text-sm text-muted">
        Hover to explore allocation details: asset type distribution within each
        lane.
      </p>

      <div className="mt-6 flex h-56 gap-1.5">
        {allocationLanes.map((lane) => (
          <div
            key={lane.id}
            className="flex min-w-0 flex-col gap-1.5"
            style={{ flex: lane.percent }}
          >
            <button
              type="button"
              onMouseEnter={() => setHover({ lane: lane.id })}
              onFocus={() => setHover({ lane: lane.id })}
              className={cn(
                "flex min-h-0 flex-1 flex-col justify-between p-3 text-left transition",
                lane.id === "faith" ? "bg-gold/85 text-[#1a140c]" : "bg-[#a1a8c4]/80 text-[#101218]",
                hover.lane === lane.id && !hover.asset
                  ? "brightness-110"
                  : "brightness-95",
              )}
            >
              <span className="text-[11px] tracking-[0.16em] uppercase">
                {lane.label}
              </span>
              <span className="font-num text-3xl">{lane.percent}%</span>
            </button>
            <div className="flex h-[42%] min-h-[72px] gap-1">
              {lane.assets.map((asset) => (
                <button
                  type="button"
                  key={asset.id}
                  onMouseEnter={() =>
                    setHover({ lane: lane.id, asset: asset.id })
                  }
                  onFocus={() => setHover({ lane: lane.id, asset: asset.id })}
                  style={{ flex: asset.percentOfLane }}
                  className={cn(
                    "flex min-w-0 flex-col justify-end p-2 text-left text-[10px] tracking-[0.08em] uppercase transition",
                    lane.id === "faith"
                      ? "bg-gold/55 text-[#1a140c]"
                      : "bg-[#c5cbe0]/70 text-[#101218]",
                    hover.asset === asset.id
                      ? "brightness-125"
                      : "brightness-90",
                  )}
                >
                  <span className="truncate">{asset.label}</span>
                  <span>{asset.percentOfLane}%</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex gap-6 text-sm">
        {allocationLanes.map((lane) => (
          <p key={lane.id} className="flex items-center gap-2 text-muted">
            <span
              className={cn(
                "h-2 w-2",
                lane.id === "faith" ? "bg-gold" : "bg-[#a1a8c4]",
              )}
            />
            {lane.label}
          </p>
        ))}
      </div>

      {activeLane ? (
        <div className="mt-6 border-t border-white/8 pt-5">
          <p className="font-display text-2xl text-cream">
            {activeAsset ? activeAsset.label : activeLane.label}
          </p>
          <p className="mt-1 text-sm text-muted">
            {activeAsset
              ? `${activeAsset.percentOfLane}% of the ${activeLane.label} lane.`
              : activeLane.description}
          </p>
          {activeAsset ? null : (
            <ul className="mt-4 space-y-2">
              {activeLane.assets.map((asset) => (
                <li
                  key={asset.id}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-cream/80">{asset.label}</span>
                  <span className="text-muted">{asset.percentOfLane}%</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <EmptyState
          title="Select a lane"
          body="Hover or focus a segment to read the mix."
        />
      )}
    </section>
  );
}
