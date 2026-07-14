import { motion } from "framer-motion";
import { categoryByKey, type Memory } from "@/lib/memory-mock";
import { toneColor } from "@/lib/genome-mock";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function MemoryCard({
  memory,
  onOpen,
  index = 0,
}: {
  memory: Memory;
  onOpen: () => void;
  index?: number;
}) {
  const cat = categoryByKey[memory.category];
  const color = toneColor(cat.tone);
  return (
    <motion.button
      onClick={onOpen}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      whileHover={{ y: -2 }}
      className="glass group relative rounded-2xl p-5 text-left transition"
      style={memory.fading ? { opacity: 1 - (memory.fading ?? 0) * 0.55 } : undefined}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold"
          style={{ color, border: `1px solid ${color}` }}
        >
          {cat.glyph}
        </span>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className="h-1 w-1 rounded-full"
              style={{
                background: i < memory.importance ? color : "oklch(1 0 0 / 15%)",
                boxShadow: i < memory.importance ? `0 0 6px ${color}` : undefined,
              }}
            />
          ))}
        </div>
      </div>

      <p className="mt-3 text-sm font-semibold">{memory.title}</p>
      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{memory.summary}</p>

      <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full"
          style={{
            width: `${memory.confidence}%`,
            background: `linear-gradient(90deg, ${color}, transparent)`,
            boxShadow: `0 0 8px ${color}`,
          }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
        <span>Updated {formatDate(memory.updatedAt)}</span>
        <span>
          {memory.related.length} link{memory.related.length === 1 ? "" : "s"}
        </span>
      </div>
    </motion.button>
  );
}
