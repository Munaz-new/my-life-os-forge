import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GenomeCoreNode } from "./GenomeCoreNode";
import { GenomeNode } from "./GenomeNode";
import { GenomeConnection } from "./GenomeConnection";
import { GenomeParticles } from "./GenomeParticles";
import { coreNode, majorNodes } from "@/lib/genome-mock";

interface Props {
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

export function GenomeCanvas({ selectedId, onSelect }: Props) {
  const w = 720;
  const h = 720;
  const cx = w / 2;
  const cy = h / 2;
  const majorR = 240;
  const childR = 96;

  const layout = useMemo(
    () =>
      majorNodes.map((n) => ({
        node: n,
        x: cx + Math.cos(n.angle) * majorR,
        y: cy + Math.sin(n.angle) * majorR,
      })),
    [cx, cy],
  );

  const expanded = useMemo(() => {
    if (!selectedId) return null;
    const m = layout.find((l) => l.node.id === selectedId);
    if (!m) {
      // maybe a child
      for (const l of layout) {
        if (l.node.children.find((c) => c.id === selectedId)) return l;
      }
      return null;
    }
    return m;
  }, [selectedId, layout]);

  const activeChildId =
    selectedId && expanded && !majorNodes.find((m) => m.id === selectedId)
      ? selectedId
      : null;

  return (
    <div className="relative w-full">
      <GenomeParticles />
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="relative z-10 h-[520px] w-full sm:h-[620px] lg:h-[680px]"
        onClick={() => onSelect(null)}
      >
        {/* connections core → major */}
        {layout.map((l, i) => (
          <GenomeConnection
            key={`core-${l.node.id}`}
            x1={cx}
            y1={cy}
            x2={l.x}
            y2={l.y}
            tone={l.node.tone}
            intensity={l.node.progress / 100}
            active={expanded?.node.id === l.node.id}
            delay={i * 0.08}
          />
        ))}

        {/* expanded children connections + nodes */}
        <AnimatePresence>
          {expanded && (
            <motion.g
              key={`children-${expanded.node.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {expanded.node.children.map((c, i) => {
                const count = expanded.node.children.length;
                // fan around the major node, oriented outward
                const base = expanded.node.angle;
                const spread = Math.PI * 0.9;
                const a = base - spread / 2 + (i / Math.max(1, count - 1)) * spread;
                const rx = expanded.x + Math.cos(a) * childR;
                const ry = expanded.y + Math.sin(a) * childR;
                return (
                  <g key={c.id} onClick={(e) => e.stopPropagation()}>
                    <GenomeConnection
                      x1={expanded.x}
                      y1={expanded.y}
                      x2={rx}
                      y2={ry}
                      tone={expanded.node.tone}
                      intensity={c.level / 30}
                      active={c.id === activeChildId}
                      delay={i * 0.06}
                    />
                    <GenomeNode
                      cx={rx}
                      cy={ry}
                      r={16}
                      label={c.label}
                      glyph="•"
                      tone={expanded.node.tone}
                      level={c.level}
                      active={c.id === activeChildId}
                      delay={0.1 + i * 0.05}
                      onSelect={() => onSelect(c.id)}
                      labelOutside={false}
                    />
                  </g>
                );
              })}
            </motion.g>
          )}
        </AnimatePresence>

        {/* major nodes */}
        {layout.map((l, i) => (
          <g key={l.node.id} onClick={(e) => e.stopPropagation()}>
            <GenomeNode
              cx={l.x}
              cy={l.y}
              r={26}
              label={l.node.label}
              glyph={l.node.glyph}
              tone={l.node.tone}
              level={l.node.level}
              active={expanded?.node.id === l.node.id}
              dim={!!expanded && expanded.node.id !== l.node.id}
              delay={i * 0.06}
              onSelect={() => onSelect(l.node.id)}
            />
          </g>
        ))}

        {/* core */}
        <g onClick={(e) => e.stopPropagation()}>
          <GenomeCoreNode
            cx={cx}
            cy={cy}
            level={coreNode.level}
            active={!selectedId}
            onSelect={() => onSelect(null)}
          />
        </g>
      </svg>
    </div>
  );
}
