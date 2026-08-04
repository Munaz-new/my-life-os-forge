import { motion } from "framer-motion";
import { toneColor } from "@/lib/genome-mock";
import { allEdges, nodeById, type RelationshipChain } from "@/lib/knowledge-mock";

interface Props {
  chain: RelationshipChain;
  active: boolean;
  onActivate: () => void;
}

const edgeBetween = (a: string, b: string) =>
  allEdges.find((e) => (e.from === a && e.to === b) || (e.from === b && e.to === a));

export function RelationshipCard({ chain, active, onActivate }: Props) {
  const nodes = chain.path.map((id) => nodeById.get(id)!).filter(Boolean);

  return (
    <motion.button
      layout
      onClick={onActivate}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`glass w-full rounded-2xl p-5 text-left transition ${
        active ? "ring-1 ring-primary/60" : "hover:bg-white/[0.07]"
      }`}
    >
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          Relationship Explorer
        </p>
        <span className="text-[10px] text-muted-foreground">{chain.confidence}% confidence</span>
      </div>
      <h3 className="mt-1.5 text-sm font-semibold">{chain.title}</h3>

      <div className="mt-4 space-y-0">
        {nodes.map((n, i) => {
          const next = nodes[i + 1];
          const e = next ? edgeBetween(n.id, next.id) : undefined;
          return (
            <div key={n.id}>
              <div className="flex items-center gap-3">
                <span
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border text-xs"
                  style={{
                    borderColor: `${toneColor(n.tone)}66`,
                    color: toneColor(n.tone),
                    background: `${toneColor(n.tone)}12`,
                  }}
                >
                  {n.glyph}
                </span>
                <span className="text-sm">{n.label}</span>
              </div>
              {next && (
                <div className="ml-4 border-l border-white/10 py-2 pl-6">
                  <p className="text-[11px] text-muted-foreground">{chain.narration[i]}</p>
                  {e && (
                    <div className="mt-1.5 grid grid-cols-4 gap-2 text-[10px] text-muted-foreground">
                      <span>str {e.strength}</span>
                      <span>conf {e.confidence}</span>
                      <span>
                        grw {e.growth >= 0 ? "+" : ""}
                        {e.growth}
                      </span>
                      <span>infl {e.influence}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-4 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-foreground/80">
        <span className="text-primary">CORE ·</span> {chain.conclusion}
      </p>
    </motion.button>
  );
}
