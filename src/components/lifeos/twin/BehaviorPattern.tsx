import { motion } from "framer-motion";
import { GlassCard } from "@/components/lifeos/GlassCard";
import { toneVar, type BehaviorPatternData } from "@/lib/twin-mock";

export function BehaviorPattern({ data, index }: { data: BehaviorPatternData; index: number }) {
  const color = toneVar(data.tone);
  const max = Math.max(...data.points);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
    >
      <GlassCard className="h-full p-5">
        <p className="text-sm font-semibold">{data.label}</p>
        <p className="mt-1 text-[11px] text-muted-foreground">{data.summary}</p>

        <div className="mt-4 flex h-24 items-end gap-1.5">
          {data.points.map((p, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <motion.div
                className="w-full rounded-t"
                style={{
                  background: `linear-gradient(180deg, ${color}, color-mix(in oklab, ${color} 20%, transparent))`,
                }}
                initial={{ height: 0 }}
                whileInView={{ height: `${(p / max) * 84}px` }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
              />
              <span className="text-[9px] text-muted-foreground">{data.axisLabels[i]}</span>
            </div>
          ))}
        </div>

        <p className="mt-3 border-t border-white/10 pt-3 text-[11px] text-muted-foreground">
          {data.insight}
        </p>
      </GlassCard>
    </motion.div>
  );
}
