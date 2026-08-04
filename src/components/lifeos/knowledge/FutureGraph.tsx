import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toneColor } from "@/lib/genome-mock";
import { futures } from "@/lib/knowledge-mock";

export function FutureGraph() {
  const [id, setId] = useState<(typeof futures)[number]["id"]>("30d");
  const snap = futures.find((f) => f.id === id)!;

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            Future Graph
          </p>
          <h3 className="mt-1 text-sm font-semibold">How your network reshapes itself</h3>
        </div>
        <div className="flex gap-2">
          {futures.map((f) => (
            <button
              key={f.id}
              onClick={() => setId(f.id)}
              className={`rounded-xl border px-3 py-1.5 text-xs transition ${
                f.id === id
                  ? "border-primary/60 bg-primary/15 text-foreground"
                  : "border-white/10 bg-white/5 text-foreground/70 hover:bg-white/10"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={snap.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className="mt-5"
        >
          <p className="text-lg font-semibold text-gradient">{snap.headline}</p>
          <p className="mt-2 text-sm text-muted-foreground">{snap.narrative}</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              { label: "Graph Density", value: snap.density, tone: "primary" as const },
              { label: "Active Clusters", value: snap.clusters * 10, display: snap.clusters, tone: "cyan" as const },
              { label: "Confidence", value: snap.confidence, tone: "violet" as const },
            ].map((m) => (
              <div key={m.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                  {m.label}
                </p>
                <p className="mt-1 text-xl font-semibold">
                  {"display" in m ? m.display : `${m.value}%`}
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: toneColor(m.tone),
                      boxShadow: `0 0 8px ${toneColor(m.tone)}`,
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, m.value)}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                New Nodes
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {snap.newNodes.map((n, i) => (
                  <motion.span
                    key={n}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.06 }}
                    className="rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-1 text-xs"
                    style={{ borderColor: `${toneColor("cyan")}55`, background: `${toneColor("cyan")}12` }}
                  >
                    + {n}
                  </motion.span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                Strengthened Edges
              </p>
              <ul className="mt-2 space-y-1.5">
                {snap.strengthened.map((s) => (
                  <li key={s} className="text-xs text-foreground/80">
                    ↗ {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
