import { motion } from "framer-motion";
import { toneColor } from "@/lib/genome-mock";
import type { KNode } from "@/lib/knowledge-mock";

interface Props {
  node: KNode;
  x: number;
  y: number;
  r: number;
  active?: boolean;
  dimmed?: boolean;
  onSelect: (id: string) => void;
  delay?: number;
}

export function KnowledgeNode({ node, x, y, r, active, dimmed, onSelect, delay = 0 }: Props) {
  const color = toneColor(node.tone);

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: dimmed ? 0.18 : 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.6 }}
      transition={{ duration: 0.45, delay }}
      style={{ cursor: "pointer", transformOrigin: `${x}px ${y}px` }}
      onClick={() => onSelect(node.id)}
    >
      <motion.circle
        cx={x}
        cy={y}
        r={r + 9}
        fill={color}
        opacity={0.12}
        animate={{ r: [r + 7, r + 13, r + 7], opacity: [0.1, 0.22, 0.1] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: delay * 2 }}
      />
      <circle
        cx={x}
        cy={y}
        r={r}
        fill="oklch(0.16 0.02 260 / 85%)"
        stroke={color}
        strokeWidth={active ? 2.2 : 1.2}
        style={{ filter: active ? `drop-shadow(0 0 10px ${color})` : undefined }}
      />
      <text
        x={x}
        y={y + 3.5}
        textAnchor="middle"
        fontSize={r * 0.72}
        fill={color}
        style={{ pointerEvents: "none" }}
      >
        {node.glyph}
      </text>
      <text
        x={x}
        y={y + r + 14}
        textAnchor="middle"
        fontSize={10}
        fill="currentColor"
        className="fill-foreground/75"
        style={{ pointerEvents: "none" }}
      >
        {node.label}
      </text>
    </motion.g>
  );
}
