import { motion } from "framer-motion";
import { useMemo } from "react";

export function AmbientParticles({ count = 18 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 3,
        dur: 8 + Math.random() * 10,
        delay: Math.random() * 6,
        drift: 20 + Math.random() * 40,
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
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background:
              "radial-gradient(circle, oklch(0.72 0.17 200 / 90%), transparent 70%)",
            boxShadow: "0 0 8px oklch(0.72 0.17 200 / 60%)",
          }}
          animate={{
            y: [0, -p.drift, 0],
            opacity: [0.15, 0.9, 0.15],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
