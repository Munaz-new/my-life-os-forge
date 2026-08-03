import { motion } from "framer-motion";
import { options, toneVar, type DecisionOption } from "@/lib/decisions-mock";

export function SimulationCard({ option }: { option: DecisionOption }) {
  const color = toneVar(option.tone);
  const others = options.filter((o) => o.id !== option.id);

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Simulating Option {option.letter}
        </p>
        <p className="text-sm font-semibold" style={{ color }}>
          {option.title}
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {option.simulation.map((s, i) => (
          <motion.div
            key={s.horizon}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="rounded-xl border border-white/10 bg-white/5 p-4"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              {s.horizon}
            </p>
            <p className="mt-1.5 text-sm font-semibold" style={{ color }}>
              {s.headline}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{s.detail}</p>
            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/5">
              <motion.div
                key={option.id + s.horizon}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, s.delta * 1.7)}%` }}
                transition={{ duration: 1 }}
                className="h-full rounded-full"
                style={{ background: color }}
              />
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">
              +{s.delta} projected goal velocity
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 border-t border-white/10 pt-4">
        <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Compared with
        </p>
        <div className="mt-3 space-y-3">
          {others.map((o) => {
            const c = toneVar(o.tone);
            const oneYear = o.simulation[o.simulation.length - 1];
            const mine = option.simulation[option.simulation.length - 1];
            return (
              <div key={o.id} className="flex flex-wrap items-center gap-3">
                <span className="w-40 shrink-0 text-xs" style={{ color: c }}>
                  {o.letter} · {o.title}
                </span>
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, oneYear.delta * 1.7)}%` }}
                    transition={{ duration: 1 }}
                    className="h-full rounded-full"
                    style={{ background: c, opacity: 0.6 }}
                  />
                </div>
                <span className="w-24 text-right text-[11px] text-muted-foreground">
                  {oneYear.delta - mine.delta >= 0 ? "+" : ""}
                  {oneYear.delta - mine.delta} @ 1y
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
