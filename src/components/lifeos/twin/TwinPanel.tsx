import { AnimatePresence, motion } from "framer-motion";
import { toneVar, twinAxes } from "@/lib/twin-mock";

export function TwinPanel({
  axisId,
  onClose,
}: {
  axisId: string | null;
  onClose: () => void;
}) {
  const axis = twinAxes.find((a) => a.id === axisId) ?? null;

  return (
    <AnimatePresence>
      {axis && (
        <motion.aside
          key={axis.id}
          initial={{ x: 380, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 380, opacity: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 28 }}
          className="glass-strong fixed right-0 top-0 z-40 h-full w-[min(360px,90vw)] overflow-y-auto p-6"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                Twin Region
              </p>
              <h3 className="mt-1 text-2xl font-semibold" style={{ color: toneVar(axis.tone) }}>
                {axis.glyph} {axis.label}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-muted-foreground transition hover:bg-white/10"
            >
              ✕
            </button>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">{axis.note}</p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {[
              { k: "Current State", v: `${axis.state}` },
              { k: "Trend", v: `${axis.delta >= 0 ? "+" : ""}${axis.delta}%` },
              { k: "Confidence", v: `${axis.confidence}%` },
              { k: "Velocity", v: `${axis.velocity >= 0 ? "+" : ""}${axis.velocity.toFixed(1)}/wk` },
            ].map((m) => (
              <div key={m.k} className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{m.k}</p>
                <p className="mt-1 text-lg font-semibold">{m.v}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              10-week signal
            </p>
            <div className="mt-3 flex h-24 items-end gap-1">
              {axis.trend.map((t, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t"
                  style={{ background: toneVar(axis.tone), opacity: 0.35 + i * 0.06 }}
                  initial={{ height: 0 }}
                  animate={{ height: `${(t / Math.max(...axis.trend)) * 100}%` }}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                />
              ))}
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
