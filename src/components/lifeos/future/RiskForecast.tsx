import { motion } from "framer-motion";
import { riskForecast, toneVar } from "@/lib/future-mock";

export function RiskForecast() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {riskForecast.map((risk, i) => {
        const color = toneVar(risk.tone);
        return (
          <motion.div
            key={risk.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
            className="glass rounded-2xl p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
                  Watch signal
                </p>
                <h3 className="mt-1 text-base font-semibold">{risk.label}</h3>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold" style={{ color }}>
                  {risk.level}
                </p>
                <p className="text-[10px] text-muted-foreground">pressure</p>
              </div>
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full"
                style={{ background: color, boxShadow: `0 0 10px ${color}` }}
                initial={{ width: 0 }}
                whileInView={{ width: `${risk.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </div>

            <p className="mt-4 text-sm text-muted-foreground">{risk.reading}</p>
            <p
              className="mt-3 rounded-xl border p-3 text-xs"
              style={{
                borderColor: `color-mix(in oklab, ${color} 35%, transparent)`,
                background: `color-mix(in oklab, ${color} 10%, transparent)`,
              }}
            >
              {risk.guidance}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
