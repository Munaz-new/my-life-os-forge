import { motion } from "framer-motion";
import { toneVar, tradeoffMetrics, type DecisionOption } from "@/lib/decisions-mock";

export function TradeOffCard({
  option,
  selected,
  index,
  onSelect,
}: {
  option: DecisionOption;
  selected: boolean;
  index: number;
  onSelect: () => void;
}) {
  const color = toneVar(option.tone);
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -3 }}
      className="glass rounded-2xl p-5 text-left transition"
      style={{
        borderColor: selected ? color : undefined,
        boxShadow: selected ? `0 0 24px ${color}` : undefined,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Option {option.letter}
          </p>
          <h4 className="mt-1 text-base font-semibold">{option.title}</h4>
        </div>
        <span
          className="rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest"
          style={{ color, borderColor: color }}
        >
          {option.outcome}
        </span>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{option.summary}</p>
      <p className="mt-2 text-[11px] uppercase tracking-[0.2em]" style={{ color }}>
        {option.timeLabel}
      </p>

      <div className="mt-4 space-y-2.5">
        {tradeoffMetrics.map((m, i) => {
          const v = option.tradeoffs[m.key];
          return (
            <div key={m.key}>
              <div className="flex items-baseline justify-between">
                <span className="text-[11px] text-muted-foreground">{m.label}</span>
                <span className="text-[11px] font-semibold" style={{ color }}>
                  {v}
                </span>
              </div>
              <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${v}%` }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.06 }}
                  className="h-full rounded-full"
                  style={{ background: color, opacity: m.invert ? 0.5 : 1 }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
        <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Expected outcome
        </span>
        <span className="text-sm font-semibold" style={{ color }}>
          {option.outcomeScore}
        </span>
      </div>
    </motion.button>
  );
}
