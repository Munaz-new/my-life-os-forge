import { motion } from "framer-motion";
import type { CoreInsight } from "@/lib/ai/core-schema";

export function CoreReasoning({ insight }: { insight: CoreInsight }) {
  const pct = Math.round(insight.confidence * 100);
  return (
    <div className="glass rounded-2xl p-5">
      <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
        Why CORE recommends this
      </p>
      <p className="mt-3 text-sm text-foreground/90">{insight.reasoning}</p>

      {insight.evidence.length > 0 && (
        <div className="mt-4">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Evidence</p>
          <ul className="mt-2 space-y-1.5">
            {insight.evidence.map((e, i) => (
              <motion.li
                key={e}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
                className="flex gap-2 text-xs text-foreground/80"
              >
                <span className="text-gradient">◆</span>
                {e}
              </motion.li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
          <span>Confidence</span>
          <span className="text-gradient font-semibold">{pct}%</span>
        </div>
        <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-white/5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1.1 }}
            className="h-full rounded-full"
            style={{ background: "var(--gradient-hero)" }}
          />
        </div>
      </div>

      {insight.caution && (
        <p className="mt-4 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-muted-foreground">
          {insight.caution}
        </p>
      )}
    </div>
  );
}

export function CoreResultActions({
  applied,
  onApply,
  onDismiss,
}: {
  applied: "applied" | "dismissed" | null;
  onApply: () => void;
  onDismiss: () => void;
}) {
  if (applied === "applied") {
    return (
      <p className="text-xs text-muted-foreground">
        Saved as a memory. Nothing else in your data was changed.
      </p>
    );
  }
  if (applied === "dismissed") {
    return <p className="text-xs text-muted-foreground">Dismissed. CORE made no changes.</p>;
  }
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={onApply}
        className="rounded-xl px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
        style={{ background: "var(--gradient-hero)" }}
      >
        Apply Recommendation
      </button>
      <button
        onClick={onDismiss}
        className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-foreground/80 transition hover:bg-white/10"
      >
        Dismiss
      </button>
    </div>
  );
}
