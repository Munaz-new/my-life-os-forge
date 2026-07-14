import { motion } from "framer-motion";
import { connectionChain, memoryById, categoryByKey } from "@/lib/memory-mock";
import { toneColor } from "@/lib/genome-mock";

export function MemoryConnection() {
  const nodes = connectionChain.map((id) => memoryById[id]).filter(Boolean);
  return (
    <div className="glass rounded-2xl p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            Featured Trace
          </p>
          <p className="mt-1 text-sm text-foreground/80">
            How a side project became a north-star.
          </p>
        </div>
        <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          {nodes.length} links
        </span>
      </div>

      <div className="relative flex items-stretch gap-3 overflow-x-auto pb-2">
        {nodes.map((m, i) => {
          const cat = categoryByKey[m.category];
          const color = toneColor(cat.tone);
          return (
            <div key={m.id} className="flex items-center gap-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative min-w-[160px] rounded-xl border p-3"
                style={{
                  borderColor: color,
                  boxShadow: `0 0 14px ${color}`,
                  background: "oklch(0.18 0.03 265 / 70%)",
                }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded-md text-[11px]"
                    style={{ color, border: `1px solid ${color}` }}
                  >
                    {cat.glyph}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {cat.label}
                  </span>
                </div>
                <p className="mt-2 text-sm font-semibold">{m.title}</p>
              </motion.div>

              {i < nodes.length - 1 && (
                <div className="relative h-10 w-16">
                  <svg viewBox="0 0 64 40" className="h-full w-full">
                    <motion.line
                      x1={0}
                      y1={20}
                      x2={64}
                      y2={20}
                      stroke={color}
                      strokeWidth={1.2}
                      strokeOpacity={0.5}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, delay: 0.2 + i * 0.12 }}
                    />
                    <motion.circle
                      r={2.5}
                      fill={color}
                      style={{ filter: `drop-shadow(0 0 4px ${color})` }}
                      animate={{ cx: [0, 64], opacity: [0, 1, 0] }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "linear",
                      }}
                      cy={20}
                    />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
