import { useMemo } from "react";
import { motion } from "framer-motion";
import { activeMemories, categoryByKey } from "@/lib/memory-mock";
import { toneColor } from "@/lib/genome-mock";

interface Props {
  onOpen: (id: string) => void;
  hoveredId?: string | null;
}

export function MemoryGraph({ onOpen }: Props) {
  const w = 720;
  const h = 420;

  const layout = useMemo(() => {
    // cluster by category around 6 anchor points
    const cats = Array.from(new Set(activeMemories.map((m) => m.category)));
    const anchors = new Map<string, { x: number; y: number }>();
    cats.forEach((c, i) => {
      const a = (i / cats.length) * Math.PI * 2 - Math.PI / 2;
      const R = 150;
      anchors.set(c, { x: w / 2 + Math.cos(a) * R, y: h / 2 + Math.sin(a) * R });
    });
    return activeMemories.map((m, i) => {
      const anchor = anchors.get(m.category)!;
      const jitter = ((i * 47) % 60) - 30;
      const jitterY = ((i * 89) % 50) - 25;
      return {
        m,
        x: anchor.x + jitter,
        y: anchor.y + jitterY,
        r: 4 + m.importance * 1.6,
      };
    });
  }, []);

  const edges = useMemo(() => {
    const map = new Map(layout.map((n) => [n.m.id, n]));
    const out: { a: (typeof layout)[number]; b: (typeof layout)[number]; color: string }[] = [];
    for (const n of layout) {
      for (const rid of n.m.related) {
        const b = map.get(rid);
        if (!b) continue;
        if (n.m.id < rid) {
          out.push({ a: n, b, color: toneColor(categoryByKey[n.m.category].tone) });
        }
      }
    }
    return out;
  }, [layout]);

  return (
    <div className="glass relative overflow-hidden rounded-2xl p-4">
      <div className="mb-3 flex items-center justify-between px-2">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            Vault Constellation
          </p>
          <p className="mt-1 text-sm text-foreground/80">
            Every memory is a node. Every link is a lived connection.
          </p>
        </div>
        <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          {layout.length} nodes · {edges.length} links
        </span>
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} className="h-[380px] w-full sm:h-[440px]">
        {edges.map((e, i) => (
          <motion.line
            key={i}
            x1={e.a.x}
            y1={e.a.y}
            x2={e.b.x}
            y2={e.b.y}
            stroke={e.color}
            strokeOpacity={0.35}
            strokeWidth={0.8}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: i * 0.03 }}
          />
        ))}
        {layout.map((n, i) => {
          const color = toneColor(categoryByKey[n.m.category].tone);
          return (
            <motion.g
              key={n.m.id}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.02 }}
              style={{
                cursor: "pointer",
                transformOrigin: `${n.x}px ${n.y}px`,
              }}
              onClick={() => onOpen(n.m.id)}
            >
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r + 6}
                fill={color}
                opacity={0.18}
                style={{ filter: "blur(6px)" }}
              />
              <motion.circle
                cx={n.x}
                cy={n.y}
                r={n.r}
                fill="oklch(0.18 0.03 265 / 95%)"
                stroke={color}
                strokeWidth={1.2}
                animate={{ opacity: [0.85, 1, 0.85] }}
                transition={{
                  duration: 3 + (i % 4),
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {n.m.importance >= 5 && (
                <motion.circle
                  cx={n.x}
                  cy={n.y}
                  r={n.r}
                  fill="none"
                  stroke={color}
                  strokeWidth={1}
                  animate={{ r: [n.r, n.r + 8], opacity: [0.7, 0] }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeOut",
                  }}
                  style={{ transformOrigin: `${n.x}px ${n.y}px` }}
                />
              )}
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
