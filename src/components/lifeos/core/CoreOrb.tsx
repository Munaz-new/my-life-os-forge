import { motion } from "framer-motion";

export function CoreOrb({ size = 260 }: { size?: number }) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size * 1.6, height: size * 1.6 }}
    >
      {/* Ambient particles */}
      {Array.from({ length: 14 }).map((_, i) => {
        const angle = (i / 14) * Math.PI * 2;
        const r = size * (0.75 + (i % 3) * 0.12);
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        return (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/70"
            style={{ left: "50%", top: "50%" }}
            animate={{
              x: [x, x * 1.05, x],
              y: [y, y * 1.05, y],
              opacity: [0.15, 0.6, 0.15],
            }}
            transition={{
              duration: 6 + (i % 5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        );
      })}

      {/* Outer glow halo */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size * 1.4,
          height: size * 1.4,
          background:
            "radial-gradient(circle, oklch(0.72 0.17 200 / 25%) 0%, transparent 65%)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Rotating conic shimmer */}
      <motion.div
        className="absolute rounded-full opacity-40"
        style={{
          width: size * 1.15,
          height: size * 1.15,
          background:
            "conic-gradient(from 0deg, transparent, oklch(0.65 0.20 255 / 35%), transparent, oklch(0.65 0.24 300 / 35%), transparent)",
          filter: "blur(18px)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />

      {/* Middle breathing ring */}
      <motion.div
        className="absolute rounded-full border border-white/10"
        style={{ width: size * 1.05, height: size * 1.05 }}
        animate={{ scale: [1, 1.04, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Core sphere */}
      <motion.div
        className="relative rounded-full"
        style={{
          width: size,
          height: size,
          background:
            "radial-gradient(circle at 30% 30%, oklch(0.85 0.13 200 / 95%) 0%, oklch(0.65 0.20 255 / 90%) 40%, oklch(0.35 0.18 285 / 90%) 75%, oklch(0.18 0.10 275) 100%)",
          boxShadow:
            "0 0 80px oklch(0.65 0.20 255 / 55%), 0 0 140px oklch(0.65 0.24 300 / 35%), inset 0 0 60px oklch(1 0 0 / 15%)",
        }}
        animate={{ scale: [1, 1.035, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 70% 75%, oklch(0.65 0.24 300 / 55%) 0%, transparent 55%)",
          }}
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute rounded-full"
          style={{
            top: "18%",
            left: "22%",
            width: "28%",
            height: "20%",
            background:
              "radial-gradient(ellipse, oklch(1 0 0 / 55%) 0%, transparent 70%)",
            filter: "blur(4px)",
          }}
        />
      </motion.div>
    </div>
  );
}
