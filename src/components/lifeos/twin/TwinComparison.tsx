import { motion } from "framer-motion";
import { GlassCard } from "@/components/lifeos/GlassCard";
import { snapshots, toneVar, twinAxes } from "@/lib/twin-mock";

export function TwinComparison({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const active = snapshots.find((s) => s.id === activeId) ?? snapshots[2];

  return (
    <GlassCard className="p-6">
      <div className="flex flex-wrap gap-2">
        {snapshots.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onSelect(s.id)}
            className="rounded-xl border px-3 py-2 text-xs font-medium transition"
            style={{
              borderColor: s.id === active.id ? "var(--primary)" : "oklch(1 0 0 / 10%)",
              background:
                s.id === active.id
                  ? "color-mix(in oklab, var(--primary) 18%, transparent)"
                  : "oklch(1 0 0 / 5%)",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-baseline gap-4">
        <motion.p
          key={active.id}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-semibold text-gradient"
        >
          {active.overall}
        </motion.p>
        <p className="text-sm text-muted-foreground">{active.caption}</p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {twinAxes.map((a) => {
          const v = active.axes[a.id] ?? a.state;
          const color = toneVar(a.tone);
          return (
            <div key={a.id}>
              <div className="flex justify-between text-[11px]">
                <span className="text-muted-foreground">{a.label}</span>
                <motion.span key={v} initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color }}>
                  {v}
                </motion.span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: color }}
                  animate={{ width: `${v}%` }}
                  transition={{ type: "spring", stiffness: 90, damping: 20 }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
