import { motion } from "framer-motion";
import type { MissionCategory } from "@/lib/missions-mock";

const TONE: Record<string, { glow: string; text: string; bar: string }> = {
  primary: {
    glow: "oklch(0.65 0.20 255 / 45%)",
    text: "text-[color:var(--primary)]",
    bar: "var(--gradient-hero)",
  },
  cyan: {
    glow: "oklch(0.72 0.17 200 / 45%)",
    text: "text-[color:var(--cyan-accent)]",
    bar: "linear-gradient(90deg, oklch(0.72 0.17 200), oklch(0.65 0.20 255))",
  },
  violet: {
    glow: "oklch(0.65 0.24 300 / 45%)",
    text: "text-[color:var(--violet-accent)]",
    bar: "linear-gradient(90deg, oklch(0.65 0.24 300), oklch(0.65 0.20 255))",
  },
};

export function MissionCard({ category }: { category: MissionCategory }) {
  const t = TONE[category.tone];
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md transition-shadow"
      style={{ boxShadow: `0 0 0 1px transparent` }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `0 0 30px ${t.glow}` }}
      />
      <div className="flex items-start justify-between gap-3">
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lg ${t.text}`}
          style={{ boxShadow: `inset 0 0 20px ${t.glow}` }}
        >
          {category.icon}
        </span>
        <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
          {category.difficulty}
        </span>
      </div>
      <h4 className="mt-4 text-sm font-semibold">{category.name}</h4>
      <p className="mt-1 text-xs text-muted-foreground">{category.tagline}</p>
      <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/5">
        <div className="h-full w-2/3 rounded-full" style={{ background: t.bar }} />
      </div>
      <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
        <span>{category.duration}</span>
        <span className={t.text}>+{category.xp} XP</span>
      </div>
    </motion.div>
  );
}
