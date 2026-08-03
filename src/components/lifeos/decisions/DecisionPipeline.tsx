import { motion } from "framer-motion";
import { pipelineSteps } from "@/lib/decisions-mock";

export function DecisionPipeline() {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="relative pl-8">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "100%" }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
          className="absolute left-[11px] top-2 w-px"
          style={{ background: "var(--gradient-hero)" }}
        />
        {pipelineSteps.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: i * 0.18 }}
            className="relative pb-7 last:pb-0"
          >
            <motion.span
              className="absolute -left-8 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-background text-[10px] font-semibold"
              animate={{ boxShadow: ["0 0 0 var(--primary)", "0 0 12px var(--primary)", "0 0 0 var(--primary)"] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3 }}
            >
              {i + 1}
            </motion.span>
            <p className="text-sm font-semibold">{s.label}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.detail}</p>
            <p className="mt-2 inline-block rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-gradient">
              {s.output}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
