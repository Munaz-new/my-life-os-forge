import { motion } from "framer-motion";
import { ProgressRing } from "./ProgressRing";
import { useCountUp } from "@/hooks/use-count-up";
import { operator } from "@/lib/system-mock";

export function OperatorCard() {
  const pct = Math.round((operator.xpInLevel / operator.xpToNext) * 100);
  const level = useCountUp(operator.level);
  const xp = useCountUp(operator.totalXp);

  return (
    <div className="glass rounded-2xl p-6 md:p-8">
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:gap-8">
        <div className="relative">
          <ProgressRing value={pct} size={168} stroke={8}>
            <div
              className="flex h-[132px] w-[132px] items-center justify-center rounded-full text-3xl font-bold text-primary-foreground"
              style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-neon)" }}
            >
              {operator.initials}
            </div>
          </ProgressRing>
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-background/90 px-3 py-0.5 text-[11px] font-semibold tracking-wider text-foreground"
          >
            LV {Math.round(level)}
          </motion.span>
        </div>

        <div className="flex-1 text-center md:text-left">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Operator</p>
          <h2 className="mt-1 text-3xl font-semibold md:text-4xl">
            <span className="text-gradient">{operator.name}</span>
          </h2>
          <p className="mt-1 text-sm text-foreground/80">{operator.title}</p>

          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat label="Rank" value={operator.rank} />
            <Stat label="Level" value={String(Math.round(level))} />
            <Stat label="Total XP" value={Math.round(xp).toLocaleString()} />
            <Stat label="Member Since" value={operator.memberSince} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}
