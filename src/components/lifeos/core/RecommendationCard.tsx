import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/use-count-up";

export function RecommendationCard({
  title,
  reason,
  benefit,
  confidence,
}: {
  title: string;
  reason: string;
  benefit: string;
  confidence: number;
}) {
  const c = useCountUp(confidence, 1400);
  return (
    <motion.div whileHover={{ y: -2 }} className="glass flex h-full flex-col rounded-2xl p-5">
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-sm font-semibold">{title}</h4>
        <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-gradient">
          {Math.round(c)}%
        </span>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        <span className="text-foreground/70">Reason · </span>
        {reason}
      </p>
      <div className="mt-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
          Expected Benefit
        </p>
        <p className="mt-0.5 text-sm font-semibold text-gradient">{benefit}</p>
      </div>
      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${confidence}%` }}
          transition={{ duration: 1.2 }}
          className="h-full rounded-full"
          style={{ background: "var(--gradient-hero)" }}
        />
      </div>
      <p className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
        Confidence
      </p>
    </motion.div>
  );
}
