import { motion } from "framer-motion";

const SEVERITY: Record<string, string> = {
  Low: "text-[color:var(--cyan-accent)]",
  Moderate: "text-[color:var(--primary)]",
  High: "text-[color:var(--violet-accent)]",
};

export function RiskCard({
  icon,
  title,
  detail,
  severity,
}: {
  icon: string;
  title: string;
  detail: string;
  severity: string;
}) {
  return (
    <motion.div
      whileHover={{ x: 2 }}
      className="glass flex items-start gap-4 rounded-2xl p-5"
    >
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lg"
        style={{ boxShadow: "inset 0 0 20px oklch(0.72 0.17 200 / 15%)" }}
      >
        {icon}
      </span>
      <div className="flex-1">
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-sm font-semibold">{title}</h4>
          <span
            className={
              "rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest " +
              (SEVERITY[severity] ?? "text-muted-foreground")
            }
          >
            {severity}
          </span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
      </div>
    </motion.div>
  );
}
