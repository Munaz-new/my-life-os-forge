import { motion } from "framer-motion";
import type { Priority } from "@/lib/core-mock";

export function PriorityCard({ priority }: { priority: Priority }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="glass relative flex h-full flex-col overflow-hidden rounded-2xl p-6"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[3px] opacity-90"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            {priority.rank}
          </p>
          <h3 className="mt-1 text-xl font-semibold">{priority.name}</h3>
        </div>
        <span
          className="flex h-11 w-11 items-center justify-center rounded-xl text-lg text-primary-foreground shadow-[var(--shadow-neon)]"
          style={{ background: "var(--gradient-hero)" }}
        >
          {priority.icon}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <Meta label="Duration" value={priority.duration} />
        <Meta label="Importance" value={priority.importance} accent />
        <div className="col-span-2">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Energy Required
          </p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${priority.energy}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ background: "var(--gradient-hero)" }}
            />
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">{priority.energy}% capacity</p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
        <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
          Expected Impact
        </span>
        <span className="text-sm font-semibold text-gradient">{priority.impact}</span>
      </div>
    </motion.div>
  );
}

function Meta({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className={"mt-1 text-sm " + (accent ? "font-semibold text-gradient" : "font-medium")}>
        {value}
      </p>
    </div>
  );
}
