import { motion } from "framer-motion";
import { categoryByKey, type Memory } from "@/lib/memory-mock";
import { toneColor, toneGlow } from "@/lib/genome-mock";

export function PinnedMemory({
  memory,
  index = 0,
  onOpen,
}: {
  memory: Memory;
  index?: number;
  onOpen: () => void;
}) {
  const cat = categoryByKey[memory.category];
  const color = toneColor(cat.tone);
  const glow = toneGlow(cat.tone);
  return (
    <motion.button
      onClick={onOpen}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      whileHover={{ y: -3 }}
      className="glass group relative overflow-hidden rounded-2xl p-5 text-left"
      style={{ boxShadow: glow }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 20% 0%, ${color}, transparent 60%)`,
        }}
      />
      <div className="relative flex items-center justify-between">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-semibold"
          style={{ color, border: `1px solid ${color}`, boxShadow: `0 0 10px ${color}` }}
        >
          {cat.glyph}
        </span>
        <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          Pinned
        </span>
      </div>
      <p className="relative mt-4 text-lg font-semibold">{memory.title}</p>
      <p className="relative mt-1 line-clamp-2 text-xs text-muted-foreground">
        {memory.summary}
      </p>
      <div className="relative mt-4 flex items-center justify-between text-[10px] text-muted-foreground">
        <span>{cat.label}</span>
        <span>Confidence {memory.confidence}%</span>
      </div>
    </motion.button>
  );
}
