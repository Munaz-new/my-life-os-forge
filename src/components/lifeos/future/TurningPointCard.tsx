import { motion } from "framer-motion";
import { toneVar, type TurningPoint } from "@/lib/future-mock";

export function TurningPointCard({ point, index }: { point: TurningPoint; index: number }) {
  const color = toneVar(point.tone);
  return (
    <motion.div
      initial={{ opacity: 0, x: -14 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="glass rounded-2xl p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.26em] text-muted-foreground">{point.when}</p>
          <h3 className="mt-1 text-base font-semibold">{point.label}</h3>
        </div>
        <span
          className="shrink-0 rounded-lg px-2 py-1 text-[11px] font-medium"
          style={{ color, background: `color-mix(in oklab, ${color} 15%, transparent)` }}
        >
          {point.impact} impact
        </span>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{point.why}</p>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color, boxShadow: `0 0 10px ${color}` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${point.impact}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
      </div>
    </motion.div>
  );
}
