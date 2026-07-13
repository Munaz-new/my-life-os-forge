import { motion } from "framer-motion";
import { useMemo } from "react";

export function GenomeParticles({ count = 26 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        d: 8 + Math.random() * 14,
        s: 1 + Math.random() * 2,
        delay: Math.random() * 4,
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
            background: "oklch(0.78 0.15 200 / 60%)",
            boxShadow: "0 0 6px oklch(0.78 0.15 200 / 60%)",
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.15, 0.7, 0.15],
          }}
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
