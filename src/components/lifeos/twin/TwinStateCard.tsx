import { motion } from "framer-motion";
import { GlassCard } from "@/components/lifeos/GlassCard";
import { toneVar, type TwinAxis } from "@/lib/twin-mock";
import { cn } from "@/lib/utils";

function Spark({ points, color }: { points: number[]; color: string }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const span = Math.max(1, max - min);
  const d = points
    .map((p, i) => `${(i / (points.length - 1)) * 100},${28 - ((p - min) / span) * 24}`)
    .join(" ");
  return (
    <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="h-8 w-full">
      <motion.polyline
        points={d}
        fill="none"
        stroke={color}
        strokeWidth="1.6"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />
    </svg>
  );
}

export function TwinStateCard({
  axis,
  value,
  active,
  onSelect,
  index,
}: {
  axis: TwinAxis;
  value: number;
  active: boolean;
  onSelect: () => void;
  index: number;
}) {
  const color = toneVar(axis.tone);
  const up = axis.delta >= 0;

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="text-left"
    >
      <GlassCard
        className={cn("h-full p-5 transition", active && "ring-1")}
        style={active ? { boxShadow: `0 0 26px color-mix(in oklab, ${color} 32%, transparent)` } : undefined}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg text-sm"
              style={{ color, background: `color-mix(in oklab, ${color} 16%, transparent)` }}
            >
              {axis.glyph}
            </span>
            <div>
              <p className="text-sm font-semibold">{axis.label}</p>
              <p className="text-[11px] text-muted-foreground">{axis.stateLabel}</p>
            </div>
          </div>
          <div className="text-right">
            <motion.p
              key={value}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-semibold"
              style={{ color }}
            >
              {value}
            </motion.p>
            <p className="text-[11px]" style={{ color: up ? "var(--cyan-accent)" : "var(--destructive)" }}>
              {up ? "▲" : "▼"} {Math.abs(axis.delta)}%
            </p>
          </div>
        </div>

        <Spark points={axis.trend} color={color} />

        <div className="mt-2 space-y-2">
          <div>
            <div className="flex justify-between text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              <span>Confidence</span>
              <span>{axis.confidence}%</span>
            </div>
            <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full"
                style={{ background: color }}
                initial={{ width: 0 }}
                whileInView={{ width: `${axis.confidence}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
              />
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Velocity{" "}
            <span style={{ color: axis.velocity >= 0 ? "var(--cyan-accent)" : "var(--destructive)" }}>
              {axis.velocity >= 0 ? "+" : ""}
              {axis.velocity.toFixed(1)} pts/wk
            </span>
          </p>
        </div>
      </GlassCard>
    </motion.button>
  );
}
