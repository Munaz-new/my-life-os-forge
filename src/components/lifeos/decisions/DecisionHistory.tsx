import { motion } from "framer-motion";
import { journal, toneVar } from "@/lib/decisions-mock";

const outcomeTone = {
  followed: "cyan",
  ignored: "destructive",
  partial: "warning",
} as const;

export function DecisionHistory() {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="space-y-3">
        {journal.map((j, i) => {
          const color = toneVar(outcomeTone[j.outcome]);
          return (
            <motion.div
              key={j.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    {j.date}
                  </span>
                  <h4 className="text-sm font-semibold">{j.decision}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest"
                    style={{ color, borderColor: color }}
                  >
                    {j.outcome}
                  </span>
                  <span className="text-xs font-semibold" style={{ color }}>
                    {j.delta >= 0 ? "+" : ""}
                    {j.delta}
                  </span>
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                <span className="text-foreground/70">Reason · </span>
                {j.reason}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                <span className="text-foreground/70">Result · </span>
                {j.result}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
