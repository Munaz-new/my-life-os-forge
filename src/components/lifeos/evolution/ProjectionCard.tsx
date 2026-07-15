import { motion } from "framer-motion";
import { toneVar, type Tone } from "@/lib/evolution-mock";

export function ProjectionCard({
  label,
  headline,
  detail,
  scoreDelta,
  tone,
  index = 0,
}: {
  label: string;
  headline: string;
  detail: string;
  scoreDelta: number;
  tone: Tone;
  index?: number;
}) {
  const c = toneVar(tone);
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass relative overflow-hidden rounded-2xl p-6"
      style={{ boxShadow: `0 0 22px ${c}` }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-1 opacity-40"
        style={{
          background: `linear-gradient(120deg, transparent 40%, ${c} 50%, transparent 60%)`,
          mixBlendMode: "screen",
        }}
        animate={{ backgroundPositionX: ["0%", "200%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <div className="relative flex items-start justify-between">
        <p className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground">{label}</p>
        <span
          className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-semibold"
          style={{ color: c }}
        >
          +{scoreDelta} score
        </span>
      </div>
      <p className="relative mt-4 text-lg font-semibold">{headline}</p>
      <p className="relative mt-2 text-xs text-muted-foreground">{detail}</p>
    </motion.div>
  );
}
