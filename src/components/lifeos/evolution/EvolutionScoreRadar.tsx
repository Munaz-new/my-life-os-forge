import { motion } from "framer-motion";
import { evolutionAxes, evolutionScore, toneVar } from "@/lib/evolution-mock";

export function EvolutionScoreRadar() {
  const size = 380;
  const cx = size / 2;
  const cy = size / 2;
  const R = 140;
  const n = evolutionAxes.length;

  const pointFor = (i: number, v: number) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    const r = (v / 100) * R;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r] as const;
  };
  const axisPoint = (i: number, r = R) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r] as const;
  };

  const shape = evolutionAxes
    .map((ax, i) => {
      const [x, y] = pointFor(i, ax.score);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="glass rounded-2xl p-6">
      <div className="grid items-center gap-6 lg:grid-cols-[auto_1fr]">
        <div className="relative mx-auto" style={{ width: size, height: size }}>
          <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full">
            <defs>
              <radialGradient id="rad-fill" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="oklch(0.65 0.20 255 / 55%)" />
                <stop offset="100%" stopColor="oklch(0.65 0.24 300 / 20%)" />
              </radialGradient>
            </defs>
            {[0.25, 0.5, 0.75, 1].map((f, k) => (
              <polygon
                key={k}
                points={evolutionAxes.map((_, i) => axisPoint(i, R * f).join(",")).join(" ")}
                fill="none"
                stroke="oklch(1 0 0 / 8%)"
              />
            ))}
            {evolutionAxes.map((_, i) => {
              const [x, y] = axisPoint(i);
              return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="oklch(1 0 0 / 6%)" />;
            })}

            <motion.polygon
              points={shape}
              fill="url(#rad-fill)"
              stroke="oklch(0.72 0.17 200)"
              strokeWidth={2}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{ transformOrigin: `${cx}px ${cy}px`, filter: "drop-shadow(0 0 10px oklch(0.65 0.20 255 / 70%))" }}
            />
            {evolutionAxes.map((ax, i) => {
              const [x, y] = pointFor(i, ax.score);
              const [lx, ly] = axisPoint(i, R + 22);
              const c = toneVar(ax.tone);
              return (
                <g key={ax.key}>
                  <circle cx={x} cy={y} r={4} fill={c} style={{ filter: `drop-shadow(0 0 6px ${c})` }} />
                  <text
                    x={lx}
                    y={ly}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-white/80"
                    style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase" }}
                  >
                    {ax.label}
                  </text>
                </g>
              );
            })}

            <text x={cx} y={cy - 6} textAnchor="middle" className="fill-white/60" style={{ fontSize: 9, letterSpacing: "0.3em" }}>SCORE</text>
            <text x={cx} y={cy + 16} textAnchor="middle" className="fill-white" style={{ fontSize: 26, fontWeight: 700 }}>{evolutionScore}</text>
          </svg>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Evolution Score</p>
          <p className="mt-1 text-sm text-foreground/85">
            A composite of the seven axes that describe who you are becoming.
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {evolutionAxes.map((ax, i) => {
              const c = toneVar(ax.tone);
              return (
                <motion.div
                  key={ax.key}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2"
                >
                  <span className="text-xs text-foreground/80">{ax.label}</span>
                  <span className="flex items-center gap-2">
                    <span className="text-sm font-semibold" style={{ color: c }}>{ax.score}</span>
                    <span
                      className="text-[10px]"
                      style={{ color: ax.delta >= 0 ? "var(--cyan-accent)" : "var(--destructive)" }}
                    >
                      {ax.delta >= 0 ? "+" : ""}
                      {ax.delta}
                    </span>
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
