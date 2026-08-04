import { motion } from "framer-motion";
import { toneColor } from "@/lib/genome-mock";
import { heatmap, nodeById, type KEdge } from "@/lib/knowledge-mock";

const bands: { key: keyof typeof heatmap; label: string; hint: string; tone: "primary" | "cyan" | "violet" }[] = [
  { key: "strongest", label: "Strongest Connections", hint: "Load-bearing edges", tone: "primary" },
  { key: "weakest", label: "Weak Connections", hint: "Fragile or under-used", tone: "violet" },
  { key: "emerging", label: "Emerging Areas", hint: "Fastest-growing links", tone: "cyan" },
];

function Row({ e, metric, tone, i }: { e: KEdge; metric: number; tone: "primary" | "cyan" | "violet"; i: number }) {
  const a = nodeById.get(e.from);
  const b = nodeById.get(e.to);
  const color = toneColor(tone);
  return (
    <div>
      <div className="flex items-center justify-between text-[11px]">
        <span className="truncate text-foreground/80">
          {a?.label} → {b?.label}
        </span>
        <span className="ml-2 shrink-0 text-muted-foreground">{metric}</span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color, boxShadow: `0 0 8px ${color}` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${Math.max(8, Math.abs(metric))}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.07 }}
        />
      </div>
    </div>
  );
}

export function Heatmap() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {bands.map((band, bi) => (
        <motion.div
          key={band.key}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: bi * 0.08 }}
          className="glass rounded-2xl p-5"
        >
          <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            {band.hint}
          </p>
          <h3 className="mt-1 text-sm font-semibold" style={{ color: toneColor(band.tone) }}>
            {band.label}
          </h3>
          <div className="mt-4 space-y-3">
            {heatmap[band.key].map((e, i) => (
              <Row
                key={`${e.from}-${e.to}`}
                e={e}
                metric={band.key === "emerging" ? e.growth * 3 : e.strength}
                tone={band.tone}
                i={i}
              />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
