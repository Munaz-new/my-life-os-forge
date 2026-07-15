import { motion } from "framer-motion";
import { trajectory, trajectoryDelta, trajectoryDirection } from "@/lib/evolution-mock";

export function TrajectoryGraph() {
  const w = 720;
  const h = 220;
  const pad = { l: 28, r: 24, t: 24, b: 32 };
  const iw = w - pad.l - pad.r;
  const ih = h - pad.t - pad.b;
  const min = Math.min(...trajectory.map((p) => p.score)) - 4;
  const max = Math.max(...trajectory.map((p) => p.score)) + 4;
  const range = max - min || 1;

  const pts = trajectory.map((t, i) => ({
    x: pad.l + (i / (trajectory.length - 1)) * iw,
    y: pad.t + ih - ((t.score - min) / range) * ih,
    t,
  }));
  const line = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const area =
    `M ${pts[0].x} ${pad.t + ih} L ` +
    pts.map((p) => `${p.x} ${p.y}`).join(" L ") +
    ` L ${pts[pts.length - 1].x} ${pad.t + ih} Z`;

  const last = pts[pts.length - 1];

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            14-day trajectory
          </p>
          <p className="mt-1 text-lg font-semibold">
            Current direction:{" "}
            <span className="text-gradient">{trajectoryDirection}</span>
          </p>
        </div>
        <span
          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold"
          style={{ color: "var(--cyan-accent)" }}
        >
          +{trajectoryDelta}% vs. prior fortnight
        </span>
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} className="mt-4 h-[220px] w-full">
        <defs>
          <linearGradient id="tj-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.65 0.20 255 / 55%)" />
            <stop offset="100%" stopColor="oklch(0.65 0.20 255 / 0%)" />
          </linearGradient>
          <linearGradient id="tj-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.72 0.17 200)" />
            <stop offset="50%" stopColor="oklch(0.65 0.20 255)" />
            <stop offset="100%" stopColor="oklch(0.65 0.24 300)" />
          </linearGradient>
        </defs>
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
          fill="url(#tj-area)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />
        <motion.polyline
          fill="none"
          stroke="url(#tj-line)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          points={line}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          style={{ filter: "drop-shadow(0 0 6px oklch(0.65 0.20 255 / 70%))" }}
        />
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={2.5} fill="white" opacity={0.6} />
        ))}
        <motion.circle
          cx={last.x}
          cy={last.y}
          r={6}
          fill="white"
          animate={{ r: [5, 8, 5], opacity: [0.9, 0.5, 0.9] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "drop-shadow(0 0 10px oklch(0.72 0.17 200))" }}
        />
      </svg>
    </div>
  );
}
