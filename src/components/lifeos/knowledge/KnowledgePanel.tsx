import { AnimatePresence, motion } from "framer-motion";
import { toneColor } from "@/lib/genome-mock";
import { neighborsOf, nodeById } from "@/lib/knowledge-mock";

interface Props {
  nodeId: string | null;
  onClose: () => void;
  onSelect: (id: string) => void;
}

function Sparkline({ points, color }: { points: number[]; color: string }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const span = Math.max(1, max - min);
  const d = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * 100;
      const y = 30 - ((p - min) / span) * 26;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg viewBox="0 0 100 32" preserveAspectRatio="none" className="h-10 w-full">
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={1.6}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9 }}
        style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      />
    </svg>
  );
}

export function KnowledgePanel({ nodeId, onClose, onSelect }: Props) {
  const node = nodeId ? nodeById.get(nodeId) : undefined;

  return (
    <AnimatePresence>
      {node && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
            className="glass-strong fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  {node.kind === "core" ? "Origin Node" : node.kind === "domain" ? "Cluster" : "Node"}
                </p>
                <h2 className="mt-1 flex items-center gap-2 text-2xl font-semibold">
                  <span style={{ color: toneColor(node.tone) }}>{node.glyph}</span>
                  {node.label}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs transition hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">{node.summary}</p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                  Importance
                </p>
                <p className="mt-1 text-lg font-semibold">{node.importance}%</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                  30d Growth
                </p>
                <p
                  className="mt-1 text-lg font-semibold"
                  style={{ color: node.growth >= 0 ? toneColor("cyan") : "var(--destructive)" }}
                >
                  {node.growth >= 0 ? "+" : ""}
                  {node.growth}%
                </p>
              </div>
            </div>

            <section className="mt-6">
              <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                Growth Trend
              </p>
              <Sparkline points={node.trend} color={toneColor(node.tone)} />
            </section>

            <section className="mt-5">
              <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                Connected Nodes
              </p>
              <div className="mt-2 space-y-2">
                {neighborsOf(node.id)
                  .slice(0, 8)
                  .map(({ edge, other }) => (
                    <button
                      key={`${edge.from}-${edge.to}`}
                      onClick={() => onSelect(other.id)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-left transition hover:bg-white/10"
                    >
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <span style={{ color: toneColor(other.tone) }}>{other.glyph}</span>
                          {other.label}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {edge.strength}% strength
                        </span>
                      </div>
                      <div className="mt-1.5 grid grid-cols-3 gap-2 text-[10px] text-muted-foreground">
                        <span>conf {edge.confidence}%</span>
                        <span>growth {edge.growth >= 0 ? "+" : ""}{edge.growth}%</span>
                        <span>infl {edge.influence}%</span>
                      </div>
                    </button>
                  ))}
              </div>
            </section>

            <section className="mt-5">
              <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                CORE Recommendations
              </p>
              <ul className="mt-2 space-y-2">
                {node.recommendations.map((r) => (
                  <li
                    key={r}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-foreground/85"
                  >
                    → {r}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-5 pb-8">
              <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                Future Opportunities
              </p>
              <ul className="mt-2 space-y-2">
                {node.opportunities.map((o) => (
                  <li
                    key={o}
                    className="rounded-xl border px-3 py-2 text-xs"
                    style={{
                      borderColor: `${toneColor(node.tone)}44`,
                      background: `${toneColor(node.tone)}0f`,
                    }}
                  >
                    ✧ {o}
                  </li>
                ))}
              </ul>
            </section>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
