import { motion } from "framer-motion";
import { opportunityForecast, toneVar } from "@/lib/future-mock";

export function OpportunityForecast() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {opportunityForecast.map((group, gi) => {
        const color = toneVar(group.tone);
        return (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: gi * 0.07 }}
            className="glass rounded-2xl p-5"
          >
            <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Forecast</p>
            <h3 className="mt-1 text-base font-semibold" style={{ color }}>
              {group.title}
            </h3>

            <ul className="mt-4 space-y-3">
              {group.items.map((item) => (
                <li key={item.label} className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-medium">{item.label}</span>
                    {item.value !== undefined && (
                      <span className="text-xs" style={{ color }}>
                        {item.value}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{item.note}</p>
                  {item.value !== undefined && (
                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: color, boxShadow: `0 0 8px ${color}` }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        );
      })}
    </div>
  );
}
