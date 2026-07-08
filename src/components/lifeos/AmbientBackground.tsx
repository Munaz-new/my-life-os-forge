import { motion } from "framer-motion";

export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="grid-overlay absolute inset-0 opacity-40" />
      <motion.div
        className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full"
        style={{ background: "var(--gradient-orb-blue)" }}
        animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-40 h-[560px] w-[560px] rounded-full"
        style={{ background: "var(--gradient-orb-violet)" }}
        animate={{ x: [0, -60, 0], y: [0, 60, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 left-1/4 h-[480px] w-[480px] rounded-full"
        style={{ background: "var(--gradient-orb-cyan)" }}
        animate={{ x: [0, 50, 0], y: [0, -40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
