import { motion } from "framer-motion";
import { ProgressRing } from "@/components/lifeos/system/ProgressRing";
import { useCountUp } from "@/hooks/use-count-up";
import { dailyBriefing } from "@/lib/core-mock";

export function BriefingCard() {
  const score = useCountUp(dailyBriefing.focusScore, 1600);

  return (
    <div className="glass-strong rounded-2xl p-6 md:p-8">
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            Daily Briefing
          </p>
          <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
            <span className="text-gradient">{dailyBriefing.greeting}</span>
          </h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                Yesterday Summary
              </p>
              <ul className="mt-3 space-y-2">
                {dailyBriefing.yesterday.map((it, i) => (
                  <motion.li
                    key={it.text}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                    className="flex items-center gap-2 text-sm"
                  >
                    <span
                      className={
                        "flex h-5 w-5 items-center justify-center rounded-md text-[11px] " +
                        (it.good
                          ? "text-primary-foreground [background:var(--gradient-hero)]"
                          : "border border-white/10 bg-white/5 text-muted-foreground")
                      }
                    >
                      {it.icon}
                    </span>
                    <span className={it.good ? "text-foreground" : "text-muted-foreground"}>
                      {it.text}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                Today's Strategy
              </p>
              <p className="mt-3 text-sm text-foreground/90">{dailyBriefing.strategy}</p>
              <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {dailyBriefing.windowLabel}
                </p>
                <p className="mt-1 text-sm font-semibold text-gradient">
                  {dailyBriefing.windowRange}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            Today's Focus Score
          </p>
          <ProgressRing value={dailyBriefing.focusScore} size={168} stroke={10}>
            <div className="text-center">
              <p className="text-4xl font-bold text-gradient">{Math.round(score)}</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Percent
              </p>
            </div>
          </ProgressRing>
          <p className="text-xs text-muted-foreground">Optimal conditions detected</p>
        </div>
      </div>
    </div>
  );
}
