import { motion } from "framer-motion";
import { timeline } from "@/lib/missions-mock";

export function MissionTimeline() {
  return (
    <ol className="relative ml-3">
      <div
        aria-hidden
        className="absolute left-3 top-2 bottom-2 w-px"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.65 0.20 255 / 60%), oklch(0.72 0.17 200 / 30%), transparent)",
        }}
      />
      {timeline.map((step, i) => {
        const active = step.state === "active";
        return (
          <motion.li
            key={step.phase}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
            className="relative flex gap-4 pb-6 pl-10 last:pb-0"
          >
            <span
              className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-background text-[10px]"
              style={
                active
                  ? {
                      background: "var(--gradient-hero)",
                      boxShadow: "var(--glow-primary)",
                      color: "hsl(var(--primary-foreground))",
                    }
                  : undefined
              }
            >
              {active ? (
                <motion.span
                  className="h-2 w-2 rounded-full bg-white"
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                />
              ) : (
                i + 1
              )}
            </span>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-3">
                <h4 className="text-sm font-semibold">{step.phase}</h4>
                <span className="text-[11px] text-muted-foreground">{step.time}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{step.detail}</p>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
