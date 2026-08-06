import { motion } from "framer-motion";
import { GlassCard } from "@/components/lifeos/GlassCard";
import { toneVar, type TwinObservation } from "@/lib/twin-mock";

export function TwinInsight({
  obs,
  index,
  onSelect,
}: {
  obs: TwinObservation;
  index: number;
  onSelect?: () => void;
}) {
  const color = toneVar(obs.tone);
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="text-left"
    >
      <GlassCard className="h-full p-5">
        <div className="flex items-start gap-3">
          <motion.span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm"
            style={{ color, background: `color-mix(in oklab, ${color} 16%, transparent)` }}
            animate={{ boxShadow: [`0 0 0px ${color}`, `0 0 16px ${color}`, `0 0 0px ${color}`] }}
            transition={{ duration: 3.6, repeat: Infinity, delay: index * 0.4 }}
          >
            {obs.glyph}
          </motion.span>
          <div>
            <p className="text-sm font-medium">{obs.text}</p>
            <p className="mt-2 text-[11px] text-muted-foreground">{obs.detail}</p>
            <p className="mt-3 text-[10px] uppercase tracking-[0.2em]" style={{ color }}>
              Confidence {obs.confidence}%
            </p>
          </div>
        </div>
      </GlassCard>
    </motion.button>
  );
}
