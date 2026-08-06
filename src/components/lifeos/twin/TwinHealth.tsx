import { motion } from "framer-motion";
import { GlassCard } from "@/components/lifeos/GlassCard";
import { toneVar, twinHealth } from "@/lib/twin-mock";

function StabilityRing({ value }: { value: number }) {
  const r = 62;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-40 w-40">
      <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
        <circle cx="80" cy="80" r={r} fill="none" stroke="oklch(1 0 0 / 8%)" strokeWidth="10" />
        <motion.circle
          cx="80"
          cy="80"
          r={r}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c - (c * value) / 100 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: "easeOut" }}
          style={{ filter: "drop-shadow(0 0 10px var(--primary))" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-4xl font-semibold"
          animate={{ opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 3.2, repeat: Infinity }}
        >
          {value}
        </motion.span>
        <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Stability
        </span>
      </div>
    </div>
  );
}

export function TwinHealth() {
  return (
    <GlassCard className="p-6">
      <div className="flex flex-col items-center gap-8 lg:flex-row">
        <div className="flex flex-col items-center">
          <StabilityRing value={twinHealth.stability} />
          <p className="mt-3 max-w-[200px] text-center text-xs text-muted-foreground">
            {twinHealth.stabilityLabel}
          </p>
        </div>

        <div className="grid w-full flex-1 gap-4 sm:grid-cols-2">
          {twinHealth.metrics.map((m, i) => {
            const color = toneVar(m.tone);
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <div className="flex items-baseline justify-between">
                  <p className="text-sm font-medium">{m.label}</p>
                  <p className="text-lg font-semibold" style={{ color }}>
                    {m.value}
                  </p>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: color, boxShadow: `0 0 10px ${color}` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${m.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.08 }}
                  />
                </div>
                <p className="mt-2 text-[11px] text-muted-foreground">{m.hint}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </GlassCard>
  );
}
