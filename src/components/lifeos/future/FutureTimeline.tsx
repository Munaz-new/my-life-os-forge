import { motion } from "framer-motion";
import { FutureParticles } from "./FutureParticles";
import { futurePaths, toneVar, type FuturePath } from "@/lib/future-mock";

const W = 900;
const H = 320;

const pathD = (curve: number[]) => {
  const step = W / (curve.length - 1);
  return curve
    .map((v, i) => {
      const x = i * step;
      const y = H - 30 - (v / 100) * (H - 70);
      if (i === 0) return `M ${x} ${y}`;
      const px = (i - 1) * step;
      const py = H - 30 - (curve[i - 1] / 100) * (H - 70);
      return `C ${px + step / 2} ${py}, ${x - step / 2} ${y}, ${x} ${y}`;
    })
    .join(" ");
};

export function FutureTimeline({
  activeId,
  onSelect,
}: {
  activeId: FuturePath["id"];
  onSelect: (id: FuturePath["id"]) => void;
}) {
  return (
    <div className="glass relative overflow-hidden rounded-3xl p-6">
      <FutureParticles />

      <svg viewBox={`0 0 ${W} ${H}`} className="relative w-full" role="img" aria-label="Future simulation paths">
        <defs>
          {futurePaths.map((p) => (
            <linearGradient key={p.id} id={`fp-${p.id}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={toneVar(p.tone)} stopOpacity="0.15" />
              <stop offset="100%" stopColor={toneVar(p.tone)} stopOpacity="1" />
            </linearGradient>
          ))}
        </defs>

        {/* horizon grid */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line
            key={i}
            x1={(i * W) / 5}
            y1={20}
            x2={(i * W) / 5}
            y2={H - 20}
            stroke="oklch(1 0 0 / 7%)"
            strokeDasharray="3 8"
          />
        ))}
        <line x1={0} y1={H - 30} x2={W} y2={H - 30} stroke="oklch(1 0 0 / 10%)" />

        {futurePaths.map((p) => {
          const active = p.id === activeId;
          const color = toneVar(p.tone);
          return (
            <g
              key={p.id}
              className="cursor-pointer"
              onClick={() => onSelect(p.id)}
              opacity={active ? 1 : 0.45}
            >
              <motion.path
                d={pathD(p.curve)}
                fill="none"
                stroke={`url(#fp-${p.id})`}
                strokeWidth={active ? 3.4 : 2}
                strokeLinecap="round"
                style={{ filter: `drop-shadow(0 0 ${8 * p.glow + (active ? 8 : 0)}px ${color})` }}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.6, ease: "easeInOut" }}
              />
              <motion.circle
                r={active ? 6 : 4}
                fill={color}
                style={{ filter: `drop-shadow(0 0 10px ${color})` }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.4, repeat: Infinity }}
                cx={W}
                cy={H - 30 - (p.curve[p.curve.length - 1] / 100) * (H - 70)}
              />
            </g>
          );
        })}
      </svg>

      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center">
        <motion.p
          animate={{ opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 3.2, repeat: Infinity }}
          className="text-[11px] uppercase tracking-[0.45em] text-muted-foreground"
        >
          Future Simulation Ready
        </motion.p>
      </div>

      <div className="relative mt-4 grid gap-3 sm:grid-cols-3">
        {futurePaths.map((p) => {
          const active = p.id === activeId;
          const color = toneVar(p.tone);
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelect(p.id)}
              className="rounded-xl border p-3 text-left transition"
              style={{
                borderColor: active ? `${color}` : "oklch(1 0 0 / 10%)",
                background: active ? `color-mix(in oklab, ${color} 14%, transparent)` : "oklch(1 0 0 / 5%)",
                boxShadow: active ? `0 0 22px color-mix(in oklab, ${color} 35%, transparent)` : undefined,
              }}
            >
              <span className="text-sm font-semibold" style={{ color }}>
                {p.label}
              </span>
              <p className="mt-1 text-xs text-muted-foreground">{p.caption}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
