import { motion } from "framer-motion";
import { coreExplanation } from "@/lib/missions-mock";

export function MissionReason() {
  return (
    <div className="glass relative overflow-hidden rounded-2xl p-6 sm:p-7">
      <div className="flex items-start gap-4">
        <motion.span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg text-primary-foreground"
          style={{ background: "var(--gradient-hero)", boxShadow: "var(--glow-primary)" }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          ◉
        </motion.span>
        <div className="flex-1">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            CORE Reasoning
          </p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/85">
            <span className="mr-1 text-gradient">“</span>
            {coreExplanation}
            <span className="ml-1 text-gradient">”</span>
          </p>
        </div>
      </div>
    </div>
  );
}
