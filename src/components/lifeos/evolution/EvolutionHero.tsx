import { motion } from "framer-motion";
import { today } from "@/lib/evolution-mock";

export function EvolutionHero() {
  const size = 260;
  const r = 108;
  const c = 2 * Math.PI * r;
  const growthLen = (today.growth / 100) * c;
  const setbackLen = (today.setbacks / 100) * c;

  return (
    <div className="glass rounded-3xl p-6 sm:p-8">
      <div className="grid items-center gap-8 sm:grid-cols-[auto_1fr]">
        <div className="relative mx-auto" style={{ width: size, height: size }}>
          <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full">
            <defs>
              <linearGradient id="ev-growth" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(0.72 0.17 200)" />
                <stop offset="100%" stopColor="oklch(0.65 0.20 255)" />
              </linearGradient>
              <linearGradient id="ev-setback" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(0.68 0.20 25)" />
                <stop offset="100%" stopColor="oklch(0.65 0.24 300)" />
              </linearGradient>
              <radialGradient id="ev-core" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="oklch(0.85 0.15 220 / 60%)" />
                <stop offset="100%" stopColor="oklch(0.2 0.03 265 / 0%)" />
              </radialGradient>
            </defs>
            <circle cx={size / 2} cy={size / 2} r={r + 20} fill="url(#ev-core)" />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke="oklch(1 0 0 / 8%)"
              strokeWidth={10}
            />
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke="url(#ev-growth)"
              strokeWidth={10}
              strokeLinecap="round"
              strokeDasharray={`${growthLen} ${c}`}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              initial={{ strokeDashoffset: c }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 1.6, ease: "easeOut" }}
              style={{ filter: "drop-shadow(0 0 12px oklch(0.65 0.20 255 / 70%))" }}
            />
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={r - 18}
              fill="none"
              stroke="url(#ev-setback)"
              strokeWidth={4}
              strokeLinecap="round"
              strokeDasharray={`${setbackLen} ${c}`}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              initial={{ strokeDashoffset: c }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
              opacity={0.75}
            />
            <text
              x="50%"
              y="46%"
              textAnchor="middle"
              className="fill-white/60"
              style={{ fontSize: 10, letterSpacing: "0.3em" }}
            >
              NET EVOLUTION
            </text>
            <text
              x="50%"
              y="58%"
              textAnchor="middle"
              className="fill-white"
              style={{ fontSize: 42, fontWeight: 700 }}
            >
              +{today.net}%
            </text>
            <text
              x="50%"
              y="70%"
              textAnchor="middle"
              className="fill-white/70"
              style={{ fontSize: 11 }}
            >
              {today.headline}
            </text>
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Stat label="Today's Growth" value={`+${today.growth}%`} tone="cyan" />
          <Stat label="Today's Setbacks" value={`-${today.setbacks}%`} tone="destructive" />
          <Stat label="Net Progress" value={`+${today.net}%`} tone="primary" />
          <Stat label="Evolution Score" value={today.score} tone="violet" />
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string | number;
  tone: "primary" | "cyan" | "violet" | "destructive";
}) {
  const color =
    tone === "cyan"
      ? "var(--cyan-accent)"
      : tone === "violet"
        ? "var(--violet-accent)"
        : tone === "destructive"
          ? "var(--destructive)"
          : "var(--primary)";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-white/10 bg-white/5 p-4"
      style={{ boxShadow: `0 0 18px ${color}` }}
    >
      <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-semibold" style={{ color }}>
        {value}
      </p>
    </motion.div>
  );
}
