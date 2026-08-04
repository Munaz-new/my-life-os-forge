import { motion } from "framer-motion";
import { toneColor } from "@/lib/genome-mock";
import type { Opportunity } from "@/lib/knowledge-mock";

export function OpportunityCard({ opp, index }: { opp: Opportunity; index: number }) {
  const color = toneColor(opp.tone);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="glass group relative overflow-hidden rounded-2xl p-5"
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-20 blur-2xl transition group-hover:opacity-40"
        style={{ background: color }}
      />
      <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
        Opportunity · +{opp.lift}% lift
      </p>
      <h3 className="mt-2 text-sm font-semibold leading-snug">{opp.title}</h3>
      <p className="mt-2 text-xs text-muted-foreground">{opp.detail}</p>

      <div className="mt-4">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-foreground/70">Readiness</span>
          <span className="text-muted-foreground">{opp.readiness}%</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full"
            style={{ background: color, boxShadow: `0 0 10px ${color}` }}
            initial={{ width: 0 }}
            whileInView={{ width: `${opp.readiness}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
          />
        </div>
      </div>

      <p className="mt-3 text-[11px] text-muted-foreground">
        Unlocks <span className="text-foreground/80">{opp.unlocks}</span>
      </p>
    </motion.div>
  );
}
