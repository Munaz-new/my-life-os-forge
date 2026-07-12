import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/use-count-up";
import { growthProjection } from "@/lib/missions-mock";

const TONE: Record<string, string> = {
  primary: "var(--gradient-hero)",
  cyan: "linear-gradient(90deg, oklch(0.72 0.17 200), oklch(0.65 0.20 255))",
  violet: "linear-gradient(90deg, oklch(0.65 0.24 300), oklch(0.65 0.20 255))",
};

function Row({ label, value, tone }: { label: string; value: number; tone: string }) {
  const v = useCountUp(value, 1400);
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="text-foreground/85">{label}</span>
        <span className="font-semibold text-gradient">+{v.toFixed(1)}%</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/5 ring-1 ring-inset ring-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, value * 6)}%` }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: TONE[tone], boxShadow: "var(--glow-primary)" }}
        />
      </div>
    </div>
  );
}

export function GrowthProjection() {
  return (
    <div className="grid gap-4">
      {growthProjection.map((g) => (
        <Row key={g.label} label={g.label} value={g.value} tone={g.tone} />
      ))}
    </div>
  );
}
