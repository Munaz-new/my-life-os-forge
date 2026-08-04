import { motion } from "framer-motion";
import { useMemo } from "react";

export function KnowledgeParticles({ count = 30 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: (i * 37) % 100,
        y: (i * 61) % 100,
        d: 9 + ((i * 13) % 12),
        s: 1 + ((i * 7) % 3),
        delay: (i % 9) * 0.5,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.s,
            height: p.s,
            background: "oklch(0.78 0.15 200 / 55%)",
            boxShadow: "0 0 6px oklch(0.78 0.15 200 / 55%)",
          }}
          animate={{ y: [0, -26, 0], opacity: [0.12, 0.6, 0.12] }}
          transition={{ duration: p.d, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
