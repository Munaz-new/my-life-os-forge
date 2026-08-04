import { motion } from "framer-motion";
import { toneColor } from "@/lib/genome-mock";
import type { Tone } from "@/lib/genome-mock";

interface Props {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  tone: Tone;
  strength: number;
  active?: boolean;
  dimmed?: boolean;
  delay?: number;
  pulse?: boolean;
}

export function KnowledgeEdge({
  x1,
  y1,
  x2,
  y2,
  tone,
  strength,
  active,
  dimmed,
  delay = 0,
  pulse = true,
}: Props) {
  const color = toneColor(tone);
  const width = 0.5 + (strength / 100) * 1.9;
  const opacity = dimmed ? 0.07 : active ? 0.75 : 0.28;

  return (
    <g>
      <motion.line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth={active ? width + 0.8 : width}
        strokeOpacity={opacity}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, delay }}
        style={{ filter: active ? `drop-shadow(0 0 6px ${color})` : undefined }}
      />
      {pulse && !dimmed && (
        <motion.circle
          r={active ? 2.4 : 1.6}
          fill={color}
          initial={{ cx: x1, cy: y1, opacity: 0 }}
          animate={{ cx: [x1, x2], cy: [y1, y2], opacity: [0, 0.9, 0] }}
          transition={{
            duration: 2.6 + (strength % 7) * 0.15,
            repeat: Infinity,
            delay: delay + (strength % 5) * 0.4,
            ease: "easeInOut",
          }}
        />
      )}
    </g>
  );
}
