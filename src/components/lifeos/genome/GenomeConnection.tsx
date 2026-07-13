import { motion } from "framer-motion";
import { toneColor, type Tone } from "@/lib/genome-mock";

export function GenomeConnection({
  x1,
  y1,
  x2,
  y2,
  tone = "primary",
  intensity = 0.5,
  active = false,
  delay = 0,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  tone?: Tone;
  intensity?: number; // 0..1, brightness
  active?: boolean;
  delay?: number;
}) {
  const color = toneColor(tone);
  const opacity = 0.15 + intensity * 0.55 + (active ? 0.15 : 0);
  // Slight bend via quadratic control
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const bend = 12 * (active ? 0.2 : 1);
  const cx = mx + nx * bend;
  const cy = my + ny * bend;
  const path = `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;

  return (
    <g>
      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={active ? 1.4 : 1}
        strokeOpacity={opacity}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay, ease: "easeOut" }}
        style={
          active
            ? { filter: `drop-shadow(0 0 6px ${color})` }
            : undefined
        }
      />
      {/* traveling particle */}
      <motion.circle
        r={2}
        fill={color}
        style={{
          offsetPath: `path('${path}')`,
          filter: `drop-shadow(0 0 4px ${color})`,
        } as React.CSSProperties}
        animate={{ offsetDistance: ["0%", "100%"] } as unknown as Record<string, unknown>}
        transition={{
          duration: 4 + (delay % 2),
          repeat: Infinity,
          delay: delay + 0.6,
          ease: "linear",
        }}
      />
    </g>
  );
}
