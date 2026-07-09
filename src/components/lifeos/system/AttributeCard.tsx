import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/use-count-up";
import type { Trend } from "@/lib/system-mock";

interface AttributeCardProps {
  name: string;
  icon: string;
  level: number;
  value: number;
  max: number;
  trend: Trend;
}

export function AttributeCard({ name, icon, level, value, max, trend }: AttributeCardProps) {
  const pct = Math.round((value / max) * 100);
  const animated = useCountUp(pct, 1400);
  const trendGlyph = trend === "up" ? "▲" : trend === "down" ? "▼" : "–";
  const trendColor =
    trend === "up"
      ? "text-[color:var(--cyan-accent)]"
      : trend === "down"
        ? "text-[color:var(--destructive)]"
        : "text-muted-foreground";

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      animate={{ y: [0, -2, 0] }}
      transition={{ y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
      className="glass rounded-2xl p-5"
    >
      <div className="flex items-start justify-between">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-xl text-lg text-primary-foreground"
          style={{ background: "var(--gradient-hero)" }}
        >
          {icon}
        </span>
        <span className={`text-xs font-semibold ${trendColor}`}>{trendGlyph}</span>
      </div>
      <div className="mt-4 flex items-baseline justify-between">
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs text-muted-foreground">Lv {level}</p>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: "var(--gradient-hero)", boxShadow: "var(--glow-primary)" }}
        />
      </div>
      <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
        <span>{value.toLocaleString()} / {max.toLocaleString()}</span>
        <span>{Math.round(animated)}%</span>
      </div>
    </motion.div>
  );
}
