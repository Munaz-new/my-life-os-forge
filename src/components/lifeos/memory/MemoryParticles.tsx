import { useMemo } from "react";
import { motion } from "framer-motion";

export function MemoryParticles({ count = 22 }: { count?: number }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        d: 6 + Math.random() * 10,
        s: 1 + Math.random() * 2,
        delay: Math.random() * 4,
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
            background: "var(--cyan-accent)",
            boxShadow: "0 0 8px var(--cyan-accent)",
          }}
          animate={{ opacity: [0.1, 0.8, 0.1], y: [0, -12, 0] }}
          transition={{
            duration: p.d,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
