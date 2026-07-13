import { motion } from "framer-motion";
import { heatmap } from "@/lib/genome-mock";

const bandColor = (band: "strong" | "balanced" | "weak") =>
  band === "strong"
    ? "oklch(0.65 0.20 255)"
    : band === "balanced"
      ? "oklch(0.78 0.15 200)"
      : "oklch(0.65 0.24 300)";

export function Heatmap() {
  const size = 420;
  const cx = size / 2;
  const cy = size / 2;
  const rMin = 40;
  const rMax = 170;
  const n = heatmap.length;
  const step = (Math.PI * 2) / n;

  const wedges = heatmap.map((h, i) => {
    const a0 = i * step - Math.PI / 2 - step / 2;
    const a1 = a0 + step;
    const r = rMin + (rMax - rMin) * h.intensity;
    const p0 = [cx + Math.cos(a0) * rMin, cy + Math.sin(a0) * rMin];
    const p1 = [cx + Math.cos(a1) * rMin, cy + Math.sin(a1) * rMin];
    const p2 = [cx + Math.cos(a1) * r, cy + Math.sin(a1) * r];
    const p3 = [cx + Math.cos(a0) * r, cy + Math.sin(a0) * r];
    const d = `M ${p0[0]} ${p0[1]} L ${p1[0]} ${p1[1]} A ${r} ${r} 0 0 1 ${p2[0]} ${p2[1]} L ${p3[0]} ${p3[1]} A ${rMin} ${rMin} 0 0 0 ${p0[0]} ${p0[1]} Z`;
    const mid = (a0 + a1) / 2;
    const lx = cx + Math.cos(mid) * (rMax + 22);
    const ly = cy + Math.sin(mid) * (rMax + 22);
    return { ...h, d, color: bandColor(h.band), lx, ly };
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <svg viewBox={`0 0 ${size} ${size}`} className="h-[380px] w-full max-w-[420px]">
        {/* concentric guides */}
        {[0.33, 0.66, 1].map((f) => (
          <circle
            key={f}
            cx={cx}
            cy={cy}
            r={rMin + (rMax - rMin) * f}
            fill="none"
            stroke="oklch(1 0 0 / 6%)"
          />
        ))}
        {wedges.map((w, i) => (
          <motion.path
            key={w.id}
            d={w.d}
            fill={w.color}
            fillOpacity={0.35 + w.intensity * 0.4}
            stroke={w.color}
            strokeOpacity={0.7}
            strokeWidth={0.6}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            style={{ transformOrigin: `${cx}px ${cy}px`, filter: `drop-shadow(0 0 8px ${w.color})` }}
          />
        ))}
        {/* center core */}
        <circle
          cx={cx}
          cy={cy}
          r={rMin - 6}
          fill="oklch(0.18 0.03 265 / 90%)"
          stroke="oklch(1 0 0 / 12%)"
        />
        <text
          x={cx}
          y={cy + 4}
          textAnchor="middle"
          className="fill-white/80"
          style={{ fontSize: 11, letterSpacing: "0.2em" }}
        >
          YOU
        </text>
        {/* labels */}
        {wedges.map((w) => (
          <text
            key={`l-${w.id}`}
            x={w.lx}
            y={w.ly}
            textAnchor="middle"
            className="fill-white/75"
            style={{ fontSize: 10, letterSpacing: "0.12em" }}
          >
            {w.domain}
          </text>
        ))}
      </svg>
      <div className="flex flex-wrap justify-center gap-4 text-[11px] text-muted-foreground">
        <Legend color={bandColor("strong")} label="Strong" />
        <Legend color={bandColor("balanced")} label="Balanced" />
        <Legend color={bandColor("weak")} label="Weak" />
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className="h-2 w-2 rounded-full"
        style={{ background: color, boxShadow: `0 0 8px ${color}` }}
      />
      {label}
    </span>
  );
}
