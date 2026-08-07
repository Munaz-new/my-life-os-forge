import { motion } from "framer-motion";
import { GlassCard } from "@/components/lifeos/GlassCard";
import {
  projectFuture,
  toneVar,
  whatIfInputs,
  whatIfOutputs,
} from "@/lib/future-mock";

export const whatIfBase = () =>
  Object.fromEntries(whatIfInputs.map((i) => [i.id, i.base])) as Record<string, number>;

export function SimulationControl({
  values,
  onChange,
  onReset,
}: {
  values: Record<string, number>;
  onChange: (id: string, v: number) => void;
  onReset: () => void;
}) {
  return (
    <GlassCard className="p-6">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              What-If Controls
            </p>
            <button
              type="button"
              onClick={onReset}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-muted-foreground transition hover:bg-white/10"
            >
              Reset
            </button>
          </div>

          {whatIfInputs.map((input) => {
            const color = toneVar(input.tone);
            const v = values[input.id] ?? input.base;
            const diff = v - input.base;
            return (
              <div key={input.id}>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="font-medium">{input.label}</span>
                  <span style={{ color }}>
                    {v}
                    {diff !== 0 && (
                      <span className="ml-2 text-[11px] text-muted-foreground">
                        {diff > 0 ? "+" : ""}
                        {diff}
                      </span>
                    )}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={v}
                  aria-label={input.label}
                  onChange={(e) => onChange(input.id, Number(e.target.value))}
                  className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10"
                  style={{
                    background: `linear-gradient(90deg, ${color} ${v}%, oklch(1 0 0 / 10%) ${v}%)`,
                  }}
                />
                <p className="mt-1 text-[11px] text-muted-foreground">{input.hint}</p>
              </div>
            );
          })}
        </div>

        <div className="space-y-4">
          <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            Projected Future Response
          </p>
          {whatIfOutputs.map((out) => {
            const color = toneVar(out.tone);
            const v = projectFuture(values, out);
            const diff = v - out.base;
            return (
              <div key={out.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium">{out.label}</span>
                  <div className="flex items-baseline gap-2">
                    <motion.span
                      key={v}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xl font-semibold"
                      style={{ color }}
                    >
                      {v}
                    </motion.span>
                    <span
                      className="text-[11px]"
                      style={{
                        color:
                          diff === 0
                            ? "var(--muted-foreground)"
                            : diff > 0
                              ? "var(--cyan-accent)"
                              : "var(--destructive)",
                      }}
                    >
                      {diff > 0 ? "+" : ""}
                      {diff}
                    </span>
                  </div>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: color, boxShadow: `0 0 10px ${color}` }}
                    animate={{ width: `${v}%` }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  />
                </div>
              </div>
            );
          })}
          <p className="text-[11px] text-muted-foreground">
            Scenario planning only — nothing here is saved or predicted as fact.
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
