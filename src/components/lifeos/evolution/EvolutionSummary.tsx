import { motion } from "framer-motion";
import { summaryLines, toneVar } from "@/lib/evolution-mock";

export function EvolutionSummary() {
  return (
    <div className="glass rounded-2xl p-6">
      <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        CORE narrative
      </p>
      <div className="mt-4 space-y-3">
        {summaryLines.map((s, i) => {
          const c = toneVar(s.tone);
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex items-center gap-3"
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-lg text-sm"
                style={{ color: c, border: `1px solid ${c}`, boxShadow: `0 0 10px ${c}` }}
              >
                {s.glyph}
              </span>
              <p className="text-sm text-foreground/90">{s.text}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
