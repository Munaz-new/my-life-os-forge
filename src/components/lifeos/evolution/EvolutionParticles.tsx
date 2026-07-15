import { useMemo } from "react";
import { motion } from "framer-motion";

export function EvolutionParticles({ count = 26 }: { count?: number }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        d: 5 + Math.random() * 10,
        s: 1 + Math.random() * 2,
        delay: Math.random() * 4,
        c: i % 3 === 0 ? "var(--violet-accent)" : i % 3 === 1 ? "var(--cyan-accent)" : "var(--primary)",
      })),
    [count],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.s,
            height: p.s,
            background: p.c,
            boxShadow: `0 0 8px ${p.c}`,
          }}
          animate={{ opacity: [0.1, 0.85, 0.1], y: [0, -14, 0] }}
          transition={{ duration: p.d, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
