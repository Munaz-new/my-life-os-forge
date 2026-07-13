import { motion } from "framer-motion";
import { toneColor, toneGlow, type Tone } from "@/lib/genome-mock";

export function GenomeNode({
  cx,
  cy,
  r = 26,
  label,
  glyph,
  tone,
  level,
  active,
  dim,
  delay = 0,
  onSelect,
  labelOutside = true,
}: {
  cx: number;
  cy: number;
  r?: number;
  label: string;
  glyph: string;
  tone: Tone;
  level: number;
  active?: boolean;
  dim?: boolean;
  delay?: number;
  onSelect: () => void;
  labelOutside?: boolean;
}) {
  const color = toneColor(tone);
  const glow = toneGlow(tone);

  return (
    <motion.g
      style={{ cursor: "pointer", transformOrigin: `${cx}px ${cy}px` }}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{
        opacity: dim ? 0.28 : 1,
        scale: 1,
      }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      onClick={onSelect}
    >
      <motion.g
        animate={{ y: [0, -3, 0] }}
        transition={{
          duration: 5 + (delay % 2),
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* soft glow */}
        <circle
          cx={cx}
          cy={cy}
          r={r + 10}
          fill={color}
          opacity={active ? 0.28 : 0.14}
          style={{ filter: "blur(10px)" }}
        />
        {/* body */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="oklch(0.18 0.03 265 / 90%)"
          stroke={color}
          strokeWidth={active ? 2 : 1}
          style={{ filter: active ? `drop-shadow(${glow})` : undefined }}
        />
        {/* pulse ring */}
        <motion.circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={1}
          animate={{ r: [r, r + 8], opacity: [0.6, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: delay + 0.4,
            ease: "easeOut",
          }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
        <text
          x={cx}
          y={cy + 4}
          textAnchor="middle"
          fill="white"
          style={{ fontSize: 14, fontWeight: 600 }}
        >
          {glyph}
        </text>
      </motion.g>

      {labelOutside ? (
        <>
          <text
            x={cx}
            y={cy + r + 16}
            textAnchor="middle"
            className="fill-white/85"
            style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase" }}
          >
            {label}
          </text>
          <text
            x={cx}
            y={cy + r + 28}
            textAnchor="middle"
            className="fill-white/50"
            style={{ fontSize: 9 }}
          >
            LV {level}
          </text>
        </>
      ) : (
        <text
          x={cx}
          y={cy + r + 12}
          textAnchor="middle"
          className="fill-white/70"
          style={{ fontSize: 9 }}
        >
          {label} · {level}
        </text>
      )}
    </motion.g>
  );
}
