import { motion } from "framer-motion";

export function XPBar({ value, max = 100 }: { value: number; max?: number }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="w-full">
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-white/5 ring-1 ring-inset ring-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{
            background: "var(--gradient-hero)",
            boxShadow: "var(--glow-primary)",
          }}
        />
      </div>
      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        <span>
          {value.toLocaleString()} / {max.toLocaleString()} XP
        </span>
        <span>{Math.round(pct)}%</span>
      </div>
    </div>
  );
}
