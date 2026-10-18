"use client";

import { useMemo, useState } from "react";
import { EmptyState, ErrorState, Skeleton } from "@/components/dapp/states";
import type {
  ChartRangeId,
  ChartSeries,
  ChartTokenId,
  OhlcvPoint,
} from "@/lib/dapp/types";
import { CHART_RANGES, CHART_TOKEN_IDS } from "@/lib/dapp/types";
import { cn } from "@/lib/cn";

export function PriceChart({
  series,
  token,
  range,
  loading,
  onToken,
  onRange,
  onRetry,
}: {
  series: ChartSeries;
  token: ChartTokenId;
  range: ChartRangeId;
  loading: boolean;
  onToken: (id: ChartTokenId) => void;
  onRange: (id: ChartRangeId) => void;
  onRetry: () => void;
}) {
  const candles = useMemo(() => buildCandles(series.points), [series.points]);
  const [hover, setHover] = useState<number | null>(null);
  const active = hover != null ? candles[hover] : candles.at(-1);

  return (
    <section className="dapp-panel p-5 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-4">
            {CHART_TOKEN_IDS.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => onToken(id)}
                className={cn(
                  "font-display text-2xl tracking-tight transition sm:text-3xl",
                  token === id
                    ? "text-cream [text-shadow:0_0_18px_rgba(244,239,230,0.45)]"
                    : "text-muted hover:text-cream/80",
                )}
              >
                {id}
              </button>
            ))}
          </div>
          <h3 className="mt-3 font-display text-3xl tracking-tight text-cream">
            {token} Chart
          </h3>
          <p className="mt-1 text-sm text-muted">{series.caption}</p>
        </div>
        <div className="flex flex-wrap gap-1">
          {CHART_RANGES.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => onRange(id)}
              className={cn(
                "px-3 py-1.5 text-[12px] tracking-[0.16em] uppercase transition",
                range === id
                  ? "bg-white/8 text-cream"
                  : "text-muted hover:text-cream",
              )}
            >
              {id}
            </button>
          ))}
        </div>
      </div>

      {active && !loading && series.status === "ok" ? (
        <p className="mt-4 font-mono text-[12px] tracking-wide text-muted">
          {new Date(active.point.t).toISOString().slice(0, 10)} · O{" "}
          {active.point.o.toFixed(4)} H {active.point.h.toFixed(4)} L{" "}
          {active.point.l.toFixed(4)} C {active.point.c.toFixed(4)}
        </p>
      ) : null}

      <div className="mt-4 min-h-[260px]">
        {loading ? (
          <div className="flex h-[260px] flex-col justify-end gap-3">
            <Skeleton className="h-[180px] w-full" />
            <Skeleton className="h-3 w-40" />
          </div>
        ) : series.status === "unavailable" ? (
          <ErrorState
            title="Chart unavailable"
            body={series.errorMessage ?? "Chart could not be drawn."}
            onRetry={onRetry}
          />
        ) : series.status === "empty" || series.points.length === 0 ? (
          <EmptyState
            title="No candles"
            body="This range has no series. Choose 7D, 30D, or 90D."
          />
        ) : (
          <svg
            viewBox="0 0 800 260"
            className="h-[260px] w-full"
            role="img"
            aria-label={`${token} candlesticks`}
            onMouseLeave={() => setHover(null)}
            onMouseMove={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              const x = ((event.clientX - rect.left) / rect.width) * 800;
              const i = Math.min(
                candles.length - 1,
                Math.max(0, Math.round((x / 800) * (candles.length - 1))),
              );
              setHover(i);
            }}
          >
            {[0.25, 0.5, 0.75].map((n) => (
              <line
                key={n}
                x1="0"
                x2="800"
                y1={20 + n * 220}
                y2={20 + n * 220}
                stroke="rgba(255,255,255,0.06)"
              />
            ))}
            {candles.map((candle, i) => (
              <g key={candle.point.t}>
                <line
                  x1={candle.x}
                  x2={candle.x}
                  y1={candle.high}
                  y2={candle.low}
                  stroke={candle.up ? "#c9a46a" : "#8a8178"}
                  strokeWidth="1.2"
                />
                <rect
                  x={candle.x - candle.width / 2}
                  y={candle.bodyTop}
                  width={candle.width}
                  height={Math.max(1.4, candle.bodyBot - candle.bodyTop)}
                  fill={candle.up ? "#c9a46a" : "#5c564e"}
                  opacity={hover === i ? 1 : 0.88}
                />
              </g>
            ))}
            {hover != null && candles[hover] ? (
              <line
                x1={candles[hover].x}
                x2={candles[hover].x}
                y1="8"
                y2="252"
                stroke="rgba(244,239,230,0.18)"
                strokeDasharray="3 4"
              />
            ) : null}
          </svg>
        )}
      </div>
    </section>
  );
}

type Candle = {
  x: number;
  high: number;
  low: number;
  bodyTop: number;
  bodyBot: number;
  width: number;
  up: boolean;
  point: OhlcvPoint;
};

function buildCandles(points: OhlcvPoint[]): Candle[] {
  if (points.length === 0) return [];
  const min = Math.min(...points.map((p) => p.l));
  const max = Math.max(...points.map((p) => p.h));
  const span = max - min || 0.01;
  const padX = 16;
  const padY = 18;
  const innerW = 800 - padX * 2;
  const innerH = 260 - padY * 2;
  const slot = innerW / points.length;
  const y = (value: number) =>
    padY + innerH - ((value - min) / span) * innerH;

  return points.map((point, i) => {
    const open = y(point.o);
    const close = y(point.c);
    return {
      x: padX + i * slot + slot / 2,
      high: y(point.h),
      low: y(point.l),
      bodyTop: Math.min(open, close),
      bodyBot: Math.max(open, close),
      width: Math.max(3, slot * 0.52),
      up: point.c >= point.o,
      point,
    };
  });
}
