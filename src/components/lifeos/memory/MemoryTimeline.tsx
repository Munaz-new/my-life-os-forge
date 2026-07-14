import { motion } from "framer-motion";
import { activeMemories, categoryByKey, type Memory } from "@/lib/memory-mock";
import { toneColor } from "@/lib/genome-mock";

const BUCKETS: { key: Memory["bucket"]; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "week", label: "This Week" },
  { key: "month", label: "This Month" },
  { key: "year", label: "This Year" },
];

export function MemoryTimeline({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <div className="relative">
      <div className="absolute bottom-0 left-3 top-0 w-px bg-gradient-to-b from-primary/60 via-cyan-400/30 to-transparent" />
      <div className="space-y-8">
        {BUCKETS.map((b, bi) => {
          const items = activeMemories.filter((m) => m.bucket === b.key);
          if (items.length === 0) return null;
          return (
            <motion.div
              key={b.key}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: bi * 0.05 }}
              className="relative pl-10"
            >
              <span
                className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-primary/50 bg-background text-[10px] font-semibold text-primary"
                style={{ boxShadow: "var(--glow-primary)" }}
              >
                ●
              </span>
              <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                {b.label}
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {items.map((m) => {
                  const cat = categoryByKey[m.category];
                  const color = toneColor(cat.tone);
                  return (
                    <button
                      key={m.id}
                      onClick={() => onOpen(m.id)}
                      className="glass flex items-start gap-3 rounded-xl p-3 text-left transition hover:bg-white/[0.06]"
                    >
                      <span
                        className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs"
                        style={{ color, border: `1px solid ${color}` }}
                      >
                        {cat.glyph}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{m.title}</p>
                        <p className="line-clamp-1 text-[11px] text-muted-foreground">
                          {m.summary}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
