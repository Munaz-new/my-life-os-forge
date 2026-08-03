import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { reasoning, toneVar } from "@/lib/decisions-mock";
import { useCountUp } from "@/hooks/use-count-up";

export function ReasoningCard() {
  const [open, setOpen] = useState(true);
  const c = useCountUp(reasoning.confidence, 1400);

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            CORE recommendation
          </p>
          <h3 className="mt-1 text-xl font-semibold text-gradient">
            {reasoning.recommendation}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{reasoning.reasonShort}</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-semibold text-gradient">{Math.round(c)}%</p>
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Confidence
          </p>
        </div>
      </div>

      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${reasoning.confidence}%` }}
          transition={{ duration: 1.2 }}
          className="h-full rounded-full"
          style={{ background: "var(--gradient-hero)" }}
        />
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Block label="Current Situation" text={reasoning.situation} />
        <Block label="Observed Pattern" text={reasoning.pattern} />
      </div>

      <button
        onClick={() => setOpen((v) => !v)}
        className="mt-5 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium transition hover:bg-white/10"
      >
        {open ? "Hide evidence" : "Show evidence"}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-2">
              {reasoning.evidence.map((e, i) => (
                <motion.div
                  key={e.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="flex flex-wrap items-baseline justify-between gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                >
                  <span className="text-xs font-medium">{e.label}</span>
                  <span className="text-xs text-muted-foreground">{e.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="mt-5 rounded-xl border px-4 py-3"
        style={{ borderColor: toneVar(reasoning.risk.tone) }}
      >
        <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Risk</p>
        <p className="mt-0.5 text-sm font-semibold" style={{ color: toneVar(reasoning.risk.tone) }}>
          {reasoning.risk.level}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{reasoning.risk.note}</p>
      </div>
    </div>
  );
}

function Block({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{label}</p>
      <p className="mt-1.5 text-sm text-foreground/90">{text}</p>
    </div>
  );
}
