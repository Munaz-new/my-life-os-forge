import { motion } from "framer-motion";

export function GenomeCoreNode({
  cx,
  cy,
  r = 44,
  label = "YOU",
  level,
  active,
  onSelect,
}: {
  cx: number;
  cy: number;
  r?: number;
  label?: string;
  level: number;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <g style={{ cursor: "pointer" }} onClick={onSelect}>
      {/* halo pulses */}
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="oklch(0.65 0.20 255 / 45%)"
          strokeWidth={1}
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 1.3,
            ease: "easeOut",
          }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      ))}
      {/* breathing outer ring */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={r + 8}
        fill="none"
        stroke="oklch(0.72 0.17 200 / 40%)"
        strokeWidth={1}
        animate={{ r: [r + 6, r + 12, r + 6], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* core body */}
      <defs>
        <radialGradient id="core-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.85 0.15 220)" />
          <stop offset="60%" stopColor="oklch(0.65 0.20 255)" />
          <stop offset="100%" stopColor="oklch(0.35 0.15 265)" />
        </radialGradient>
      </defs>
      <motion.circle
        cx={cx}
        cy={cy}
        r={r}
        fill="url(#core-grad)"
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          transformOrigin: `${cx}px ${cy}px`,
          filter: "drop-shadow(0 0 24px oklch(0.65 0.20 255 / 70%))",
        }}
      />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={active ? "oklch(0.95 0.02 250)" : "oklch(1 0 0 / 25%)"}
        strokeWidth={active ? 2 : 1}
      />
      <text
        x={cx}
        y={cy - 4}
        textAnchor="middle"
        className="fill-white"
        style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.25em" }}
      >
        {label}
      </text>
      <text
        x={cx}
        y={cy + 14}
        textAnchor="middle"
        className="fill-white/70"
        style={{ fontSize: 10, letterSpacing: "0.2em" }}
      >
        LV {level}
      </text>
    </g>
  );
}
