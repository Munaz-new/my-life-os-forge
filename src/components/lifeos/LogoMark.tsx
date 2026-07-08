import { motion } from "framer-motion";

export function LogoMark({ size = 96 }: { size?: number }) {
  return (
    <motion.div
      style={{ width: size, height: size }}
      className="relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="absolute inset-0 rounded-full blur-2xl"
        style={{ background: "var(--gradient-hero)" }}
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <svg viewBox="0 0 100 100" className="relative h-full w-full">
        <defs>
          <linearGradient id="lifeos-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.72 0.17 200)" />
            <stop offset="50%" stopColor="oklch(0.65 0.20 255)" />
            <stop offset="100%" stopColor="oklch(0.65 0.24 300)" />
          </linearGradient>
        </defs>
        <motion.polygon
          points="50,6 88,28 88,72 50,94 12,72 12,28"
          fill="none"
          stroke="url(#lifeos-grad)"
          strokeWidth="2"
          strokeLinejoin="round"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ originX: "50%", originY: "50%", transformBox: "fill-box" }}
        />
        <motion.polygon
          points="50,22 74,36 74,64 50,78 26,64 26,36"
          fill="none"
          stroke="url(#lifeos-grad)"
          strokeWidth="1.5"
          strokeLinejoin="round"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ originX: "50%", originY: "50%", transformBox: "fill-box" }}
        />
        <circle cx="50" cy="50" r="6" fill="url(#lifeos-grad)" />
      </svg>
    </motion.div>
  );
}
