import { motion } from "framer-motion";
import { toneVar, type Scenario } from "@/lib/future-mock";

export function ScenarioCard({
  scenario,
  active,
  index,
  onSelect,
}: {
  scenario: Scenario;
  active: boolean;
  index: number;
  onSelect: () => void;
}) {
  const color = toneVar(scenario.tone);

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="glass rounded-2xl p-6 text-left transition"
      style={{
        borderColor: active ? color : undefined,
        boxShadow: active ? `0 0 30px color-mix(in oklab, ${color} 28%, transparent)` : undefined,
      }}
    >
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{scenario.tag}</p>
        <span
          className="rounded-lg px-2 py-0.5 text-[10px]"
          style={{ color, background: `color-mix(in oklab, ${color} 16%, transparent)` }}
        >
          {active ? "Simulating" : "Select"}
        </span>
      </div>

      <h3 className="mt-2 text-lg font-semibold">{scenario.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{scenario.premise}</p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Goal Completion</p>
          <p className="mt-1 text-base font-semibold" style={{ color }}>
            {scenario.completion}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Growth Rate</p>
          <p className="mt-1 text-base font-semibold" style={{ color }}>
            +{scenario.growthRate}/mo
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span>Confidence</span>
          <span>{scenario.confidence}%</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full"
            style={{ background: color, boxShadow: `0 0 10px ${color}` }}
            initial={{ width: 0 }}
            whileInView={{ width: `${scenario.confidence}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          />
        </div>
      </div>

      <div className="mt-5 space-y-3 text-xs">
        <div>
          <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">Benefits</p>
          <ul className="mt-1.5 space-y-1">
            {scenario.benefits.map((b) => (
              <li key={b} className="text-foreground/80">
                ↗ {b}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">Risks</p>
          <ul className="mt-1.5 space-y-1">
            {scenario.risks.map((r) => (
              <li key={r} className="text-muted-foreground">
                ◇ {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.button>
  );
}
