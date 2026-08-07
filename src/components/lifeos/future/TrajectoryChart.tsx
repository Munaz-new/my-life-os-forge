import { motion } from "framer-motion";
import { horizons, scenarios, toneVar } from "@/lib/future-mock";

const W = 820;
const H = 260;
const PAD = 34;

const points = (curve: number[]) =>
  curve.map((v, i) => {
    const x = PAD + (i * (W - PAD * 2)) / (curve.length - 1);
    const y = H - PAD - (v / 100) * (H - PAD * 2);
    return [x, y] as const;
  });

const smooth = (curve: number[]) => {
  const pts = points(curve);
  return pts
    .map(([x, y], i) => {
      if (i === 0) return `M ${x} ${y}`;
      const [px, py] = pts[i - 1];
      const mx = (px + x) / 2;
      return `C ${mx} ${py}, ${mx} ${y}, ${x} ${y}`;
    })
    .join(" ");
};

export function TrajectoryChart({
  activeId,
  curves,
}: {
  activeId: string;
  curves: Record<string, number[]>;
}) {
  const labels = ["Now", ...horizons.map((h) => h.label)];

  return (
    <div className="glass rounded-2xl p-6">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Scenario trajectory chart">
        {[0, 25, 50, 75, 100].map((g) => {
          const y = H - PAD - (g / 100) * (H - PAD * 2);
          return (
            <g key={g}>
              <line x1={PAD} y1={y} x2={W - PAD} y2={y} stroke="oklch(1 0 0 / 7%)" />
              <text x={8} y={y + 4} fontSize="10" fill="oklch(0.7 0.02 260 / 70%)">
                {g}
              </text>
            </g>
          );
        })}

        {scenarios.map((s) => {
          const color = toneVar(s.tone);
          const active = s.id === activeId;
          const curve = curves[s.id] ?? s.curve;
          return (
            <g key={s.id} opacity={active ? 1 : 0.3}>
              <motion.path
                d={smooth(curve)}
                fill="none"
                stroke={color}
                strokeWidth={active ? 3 : 1.6}
                strokeLinecap="round"
                style={{ filter: active ? `drop-shadow(0 0 8px ${color})` : undefined }}
                animate={{ d: smooth(curve) }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              />
              {active &&
                points(curve).map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r={3.5} fill={color} style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
                ))}
            </g>
          );
        })}

        {labels.map((l, i) => (
          <text
            key={l}
            x={PAD + (i * (W - PAD * 2)) / (labels.length - 1)}
            y={H - 8}
            fontSize="10"
            textAnchor="middle"
            fill="oklch(0.7 0.02 260 / 70%)"
          >
            {l}
          </text>
        ))}
      </svg>
    </div>
  );
}
