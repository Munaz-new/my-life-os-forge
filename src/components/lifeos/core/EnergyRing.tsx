import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/use-count-up";

const TONE_STOPS: Record<string, [string, string]> = {
  primary: ["oklch(0.65 0.20 255)", "oklch(0.72 0.17 200)"],
  cyan: ["oklch(0.78 0.15 200)", "oklch(0.65 0.20 255)"],
  violet: ["oklch(0.65 0.24 300)", "oklch(0.65 0.20 255)"],
};

export function EnergyRing({
  label,
  value,
  tone = "primary",
  size = 120,
}: {
  label: string;
  value: number;
  tone?: "primary" | "cyan" | "violet";
  size?: number;
}) {
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const pct = Math.max(0, Math.min(100, value));
  const offset = circ - (pct / 100) * circ;
  const animated = useCountUp(pct, 1400);
  const [a, b] = TONE_STOPS[tone];
  const gradId = `er-${label.replace(/\s+/g, "")}-${tone}`;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={a} />
              <stop offset="100%" stopColor={b} />
            </linearGradient>
          </defs>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="oklch(1 0 0 / 8%)"
            strokeWidth={stroke}
            fill="none"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={`url(#${gradId})`}
            strokeWidth={stroke}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            style={{ filter: `drop-shadow(0 0 8px ${a})` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-semibold text-gradient">
            {Math.round(animated)}%
          </span>
        </div>
      </div>
      <p className="mt-2 text-[11px] uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
    </div>
  );
}
