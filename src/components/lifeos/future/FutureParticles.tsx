import { motion } from "framer-motion";
import { useMemo } from "react";

export function FutureParticles({ count = 30 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: (i * 37) % 100,
        y: (i * 61) % 100,
        d: 9 + ((i * 7) % 12),
        s: 1 + ((i * 3) % 3),
        delay: (i % 6) * 0.7,
        hue: i % 3,
      })),
    [count],
  );

  const colors = [
    "oklch(0.72 0.17 262 / 55%)",
    "oklch(0.78 0.15 200 / 55%)",
    "oklch(0.68 0.18 300 / 55%)",
  ];

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
            background: colors[p.hue],
            boxShadow: `0 0 8px ${colors[p.hue]}`,
          }}
          animate={{ x: [0, 26, 0], opacity: [0.1, 0.6, 0.1] }}
          transition={{ duration: p.d, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
