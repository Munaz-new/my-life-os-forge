import { motion } from "framer-motion";
import { momentum } from "@/lib/core-mock";

export function MomentumChart() {
  const W = 720;
  const H = 200;
  const pad = { l: 24, r: 24, t: 16, b: 28 };
  const iw = W - pad.l - pad.r;
  const ih = H - pad.t - pad.b;
  const max = 100;
  const step = iw / (momentum.length - 1);

  const points = momentum.map((p, i) => ({
    x: pad.l + i * step,
    y: pad.t + ih - (p.value / max) * ih,
  }));

  const linePath = points
    .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
    .join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${pad.t + ih} L ${points[0].x} ${pad.t + ih} Z`;

  const zones = [
    { label: "Morning", from: 0, to: 2 },
    { label: "Afternoon", from: 3, to: 5 },
    { label: "Evening", from: 6, to: 7 },
  ];

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        <defs>
          <linearGradient id="mc-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.65 0.20 255)" />
            <stop offset="50%" stopColor="oklch(0.72 0.17 200)" />
            <stop offset="100%" stopColor="oklch(0.65 0.24 300)" />
          </linearGradient>
          <linearGradient id="mc-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.65 0.20 255 / 45%)" />
            <stop offset="100%" stopColor="oklch(0.65 0.20 255 / 0%)" />
          </linearGradient>
        </defs>

        {/* grid lines */}
        {[0.25, 0.5, 0.75].map((t) => (
          <line
            key={t}
            x1={pad.l}
            x2={W - pad.r}
            y1={pad.t + ih * t}
            y2={pad.t + ih * t}
            stroke="oklch(1 0 0 / 6%)"
            strokeDasharray="3 6"
          />
        ))}

        {/* area */}
        <motion.path
          d={areaPath}
          fill="url(#mc-fill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.6 }}
        />

        {/* line */}
        <motion.path
          d={linePath}
          fill="none"
          stroke="url(#mc-line)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          style={{ filter: "drop-shadow(0 0 6px oklch(0.65 0.20 255 / 55%))" }}
        />

        {/* points */}
        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={3.5}
            fill="oklch(0.97 0.005 250)"
            stroke="oklch(0.65 0.20 255)"
            strokeWidth={1.5}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 + i * 0.05, type: "spring", stiffness: 220 }}
          />
        ))}

        {/* zone labels */}
        {zones.map((z) => {
          const mid = (points[z.from].x + points[z.to].x) / 2;
          return (
            <text
              key={z.label}
              x={mid}
              y={H - 8}
              textAnchor="middle"
              fill="oklch(0.68 0.03 260)"
              fontSize={11}
              style={{ letterSpacing: "0.2em", textTransform: "uppercase" }}
            >
              {z.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
