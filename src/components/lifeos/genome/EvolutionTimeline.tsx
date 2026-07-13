import { useState } from "react";
import { motion } from "framer-motion";
import { timeline } from "@/lib/genome-mock";

export function EvolutionTimeline() {
  const w = 720;
  const h = 200;
  const pad = { l: 32, r: 24, t: 24, b: 32 };
  const iw = w - pad.l - pad.r;
  const ih = h - pad.t - pad.b;
  const levels = timeline.map((t) => t.level);
  const min = Math.min(...levels) - 1;
  const max = Math.max(...levels) + 1;
  const range = max - min || 1;

  const points = timeline.map((t, i) => ({
    x: pad.l + (i / (timeline.length - 1)) * iw,
    y: pad.t + ih - ((t.level - min) / range) * ih,
    t,
  }));

  const line = points.map((p) => `${p.x},${p.y}`).join(" ");
  const area =
    `M ${points[0].x} ${pad.t + ih} L ` +
    points.map((p) => `${p.x} ${p.y}`).join(" L ") +
    ` L ${points[points.length - 1].x} ${pad.t + ih} Z`;

  const [hover, setHover] = useState<number>(points.length - 1);
  const active = points[hover];

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${w} ${h}`} className="h-[220px] w-full">
        <defs>
          <linearGradient id="tl-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.65 0.20 255 / 55%)" />
            <stop offset="100%" stopColor="oklch(0.65 0.20 255 / 0%)" />
          </linearGradient>
          <linearGradient id="tl-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.65 0.20 255)" />
            <stop offset="50%" stopColor="oklch(0.72 0.17 200)" />
            <stop offset="100%" stopColor="oklch(0.65 0.24 300)" />
          </linearGradient>
        </defs>

        {/* baseline grid */}
        {[0.25, 0.5, 0.75].map((f) => (
          <line
            key={f}
            x1={pad.l}
            x2={pad.l + iw}
            y1={pad.t + ih * f}
            y2={pad.t + ih * f}
            stroke="oklch(1 0 0 / 5%)"
          />
        ))}

        <motion.path
          d={area}
          fill="url(#tl-area)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />
        <motion.polyline
          fill="none"
          stroke="url(#tl-line)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          points={line}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />
        {points.map((p, i) => (
          <g
            key={i}
            onMouseEnter={() => setHover(i)}
            onClick={() => setHover(i)}
            style={{ cursor: "pointer" }}
          >
            <circle cx={p.x} cy={p.y} r={hover === i ? 5 : 3} fill="white" />
            <circle
              cx={p.x}
              cy={p.y}
              r={hover === i ? 5 : 3}
              fill="none"
              stroke="oklch(0.65 0.20 255)"
              strokeWidth={1}
              style={{ filter: "drop-shadow(0 0 6px oklch(0.65 0.20 255))" }}
            />
            <text
              x={p.x}
              y={h - 10}
              textAnchor="middle"
              className="fill-white/55"
              style={{ fontSize: 10 }}
            >
              {p.t.month}
            </text>
          </g>
        ))}
      </svg>
      <motion.div
        key={hover}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mt-2 flex flex-wrap items-baseline justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
      >
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {active.t.month}
          </p>
          <p className="mt-1 text-sm font-semibold">{active.t.highlight}</p>
        </div>
        <div className="flex gap-4 text-xs text-foreground/80">
          <span>
            LV <span className="font-semibold">{active.t.level}</span>
          </span>
          <span>
            XP{" "}
            <span className="font-semibold">
              {active.t.xp.toLocaleString()}
            </span>
          </span>
        </div>
      </motion.div>
    </div>
  );
}
