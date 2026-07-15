import { motion } from "framer-motion";
import type { DecisionImpact } from "@/lib/evolution-mock";

export function DecisionImpactCard({
  decision,
  index = 0,
}: {
  decision: DecisionImpact;
  index?: number;
}) {
  const positive = decision.type === "positive";
  const color = positive ? "var(--cyan-accent)" : "var(--destructive)";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="glass group relative overflow-hidden rounded-2xl p-5 transition hover:-translate-y-0.5"
      style={{ boxShadow: `0 0 22px ${color}` }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40 transition group-hover:opacity-70"
        style={{
          background: `radial-gradient(500px circle at 100% 0%, ${color} 0%, transparent 60%)`,
          mixBlendMode: "screen",
        }}
      />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {decision.time}
          </p>
          <p className="mt-1 text-base font-semibold">{decision.title}</p>
        </div>
        <span
          className="rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-widest"
          style={{ color, border: `1px solid ${color}` }}
        >
          {positive ? "Positive" : "Negative"}
        </span>
      </div>

      <p className="relative mt-3 text-xs text-muted-foreground">Future impact</p>
      <div className="relative mt-2 flex flex-wrap gap-2">
        {decision.effects.map((e) => (
          <span
            key={e.label}
            className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs"
            style={{ color: e.delta >= 0 ? "var(--cyan-accent)" : "var(--destructive)" }}
          >
            {e.delta >= 0 ? "+" : ""}
            {e.delta} {e.label}
          </span>
        ))}
      </div>

      <p className="relative mt-4 text-xs text-foreground/70">{decision.reason}</p>
    </motion.div>
  );
}
