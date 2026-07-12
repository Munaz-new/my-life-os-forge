import { motion } from "framer-motion";
import { ProgressRing } from "@/components/lifeos/system/ProgressRing";
import { useCountUp } from "@/hooks/use-count-up";
import { missionStatus } from "@/lib/missions-mock";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}

export function MissionHeroCard() {
  const confidence = useCountUp(missionStatus.confidence, 1500);
  return (
    <div className="glass relative overflow-hidden rounded-2xl p-6 shadow-[var(--shadow-neon)] sm:p-8">
      {/* Scanning line */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.72 0.17 200 / 90%), transparent)",
        }}
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
      />
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8">
        <ProgressRing value={missionStatus.confidence} size={160} stroke={10}>
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Confidence
            </p>
            <p className="text-3xl font-bold text-gradient">{Math.round(confidence)}%</p>
          </div>
        </ProgressRing>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-primary-foreground"
              style={{ background: "var(--gradient-hero)" }}
            >
              {missionStatus.status}
            </span>
            <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
              Difficulty · {missionStatus.difficulty}
            </span>
            <span className="text-[11px] text-muted-foreground">
              Generated {missionStatus.generatedAt}
            </span>
          </div>
          <h3 className="mt-3 text-xl font-semibold sm:text-2xl">
            Today's mission has been calibrated.
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            CORE analyzed 47 signals from the last 14 days to design the optimal path.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Stat label="Estimated Time" value={missionStatus.eta} />
            <Stat label="Expected Growth" value={missionStatus.expectedGrowth} />
            <Stat label="Mission Confidence" value={`${missionStatus.confidence}%`} />
          </div>
        </div>
      </div>
    </div>
  );
}
