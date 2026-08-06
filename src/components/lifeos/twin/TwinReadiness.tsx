import { motion } from "framer-motion";
import { GlassCard } from "@/components/lifeos/GlassCard";
import { toneVar, type Readiness } from "@/lib/twin-mock";

export function TwinReadiness({ item, index }: { item: Readiness; index: number }) {
  const color = toneVar(item.tone);
  const r = 34;
  const c = 2 * Math.PI * r;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
    >
      <GlassCard className="h-full p-5">
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20 shrink-0">
            <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
              <circle cx="40" cy="40" r={r} fill="none" stroke="oklch(1 0 0 / 8%)" strokeWidth="6" />
              <motion.circle
                cx="40"
                cy="40"
                r={r}
                fill="none"
                stroke={color}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={c}
                initial={{ strokeDashoffset: c }}
                whileInView={{ strokeDashoffset: c - (c * item.score) / 100 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: index * 0.06 }}
                style={{ filter: `drop-shadow(0 0 8px ${color})` }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold">
              {item.score}
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold">{item.label}</p>
            <p className="mt-1 text-[11px] text-muted-foreground">{item.gap}</p>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {item.factors.map((f, i) => (
            <div key={f.label}>
              <div className="flex justify-between text-[11px] text-muted-foreground">
                <span>{f.label}</span>
                <span>{f.value}</span>
              </div>
              <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${f.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 + i * 0.06 }}
                />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}
