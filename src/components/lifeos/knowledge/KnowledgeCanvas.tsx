import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { KnowledgeNode } from "./KnowledgeNode";
import { KnowledgeEdge } from "./KnowledgeEdge";
import { KnowledgeParticles } from "./KnowledgeParticles";
import {
  allEdges,
  coreNode,
  crossEdges,
  domains,
  leaves,
  nodeById,
} from "@/lib/knowledge-mock";
import { toneColor } from "@/lib/genome-mock";

const W = 900;
const H = 620;
const CX = W / 2;
const CY = H / 2;
const R_DOMAIN = 205;
const R_LEAF = 96;

interface Props {
  selectedId: string | null;
  expandedId: string | null;
  highlighted: Set<string> | null;
  onSelect: (id: string) => void;
}

export function KnowledgeCanvas({ selectedId, expandedId, highlighted, onSelect }: Props) {
  const positions = useMemo(() => {
    const map = new Map<string, { x: number; y: number; r: number }>();
    map.set("you", { x: CX, y: CY, r: 34 });
    domains.forEach((d, i) => {
      const a = (i / domains.length) * Math.PI * 2 - Math.PI / 2;
      map.set(d.id, { x: CX + Math.cos(a) * R_DOMAIN, y: CY + Math.sin(a) * R_DOMAIN, r: 20 });
    });
    domains.forEach((d, i) => {
      const base = (i / domains.length) * Math.PI * 2 - Math.PI / 2;
      const kids = leaves.filter((l) => l.parent === d.id);
      const parent = map.get(d.id)!;
      kids.forEach((k, j) => {
        const spread = Math.PI * 0.95;
        const a =
          base - spread / 2 + (kids.length === 1 ? spread / 2 : (j / (kids.length - 1)) * spread);
        const rad = R_LEAF + (j % 2 === 0 ? 0 : 34);
        map.set(k.id, { x: parent.x + Math.cos(a) * rad, y: parent.y + Math.sin(a) * rad, r: 13 });
      });
    });
    return map;
  }, []);

  const visibleLeafIds = useMemo(() => {
    const set = new Set<string>();
    if (expandedId) leaves.filter((l) => l.parent === expandedId).forEach((l) => set.add(l.id));
    if (highlighted) highlighted.forEach((id) => nodeById.get(id)?.kind === "leaf" && set.add(id));
    if (selectedId && nodeById.get(selectedId)?.kind === "leaf") set.add(selectedId);
    return set;
  }, [expandedId, highlighted, selectedId]);

  const isVisible = (id: string) =>
    id === "you" || nodeById.get(id)?.kind === "domain" || visibleLeafIds.has(id);

  const dim = (id: string) => Boolean(highlighted && !highlighted.has(id));

  const visibleEdges = allEdges.filter((e) => isVisible(e.from) && isVisible(e.to));

  const focus = selectedId ? positions.get(selectedId) : undefined;
  const zoom = selectedId && selectedId !== "you" ? 1.18 : 1;
  const tx = focus ? (CX - focus.x) * (zoom - 1) * 0.85 : 0;
  const ty = focus ? (CY - focus.y) * (zoom - 1) * 0.85 : 0;

  return (
    <div className="glass relative overflow-hidden rounded-2xl p-4">
      <KnowledgeParticles count={28} />

      <div className="relative mb-2 flex items-center justify-between px-2">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            Living Network
          </p>
          <p className="mt-1 text-sm text-foreground/80">
            Select any node to expand its region and open the intelligence panel.
          </p>
        </div>
        <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          {1 + domains.length + visibleLeafIds.size} nodes · {visibleEdges.length} links
        </span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="relative h-[440px] w-full sm:h-[560px]">
        <motion.g
          animate={{ scale: zoom, x: tx, y: ty }}
          transition={{ type: "spring", stiffness: 90, damping: 18 }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        >
          {visibleEdges.map((e, i) => {
            const a = positions.get(e.from)!;
            const b = positions.get(e.to)!;
            const tone = nodeById.get(e.to)?.tone ?? "primary";
            const isCross = crossEdges.includes(e);
            const active =
              Boolean(highlighted && highlighted.has(e.from) && highlighted.has(e.to)) ||
              e.from === selectedId ||
              e.to === selectedId;
            return (
              <KnowledgeEdge
                key={`${e.from}-${e.to}-${i}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                tone={tone}
                strength={e.strength}
                active={active}
                dimmed={dim(e.from) || dim(e.to)}
                delay={i * 0.012}
                pulse={isCross || active}
              />
            );
          })}

          {/* core */}
          <motion.circle
            cx={CX}
            cy={CY}
            r={62}
            fill={toneColor("primary")}
            opacity={0.1}
            animate={{ r: [58, 74, 58], opacity: [0.08, 0.18, 0.08] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.g
            onClick={() => onSelect("you")}
            style={{ cursor: "pointer" }}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <circle
              cx={CX}
              cy={CY}
              r={34}
              fill="oklch(0.18 0.03 265 / 92%)"
              stroke={toneColor("primary")}
              strokeWidth={2}
              style={{ filter: `drop-shadow(0 0 18px ${toneColor("primary")})` }}
            />
            <text
              x={CX}
              y={CY + 5}
              textAnchor="middle"
              fontSize={15}
              className="fill-foreground"
              style={{ letterSpacing: "0.18em", pointerEvents: "none" }}
            >
              YOU
            </text>
          </motion.g>

          {domains.map((d, i) => {
            const p = positions.get(d.id)!;
            return (
              <KnowledgeNode
                key={d.id}
                node={d}
                x={p.x}
                y={p.y}
                r={p.r}
                active={selectedId === d.id || expandedId === d.id}
                dimmed={dim(d.id)}
                onSelect={onSelect}
                delay={i * 0.05}
              />
            );
          })}

          <AnimatePresence>
            {leaves
              .filter((l) => visibleLeafIds.has(l.id))
              .map((l, i) => {
                const p = positions.get(l.id)!;
                return (
                  <KnowledgeNode
                    key={l.id}
                    node={l}
                    x={p.x}
                    y={p.y}
                    r={p.r}
                    active={selectedId === l.id}
                    dimmed={dim(l.id)}
                    onSelect={onSelect}
                    delay={i * 0.04}
                  />
                );
              })}
          </AnimatePresence>
        </motion.g>
      </svg>
    </div>
  );
}

export { coreNode };
