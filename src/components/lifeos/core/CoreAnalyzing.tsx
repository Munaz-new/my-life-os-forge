import { motion } from "framer-motion";
import { CoreOrb } from "@/components/lifeos/core/CoreOrb";

export function CoreAnalyzing({ label = "CORE Analyzing" }: { label?: string }) {
  return (
    <div className="glass-strong flex flex-col items-center justify-center rounded-2xl px-6 py-10">
      <CoreOrb size={140} />
      <motion.p
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="mt-2 text-[11px] uppercase tracking-[0.4em] text-muted-foreground"
      >
        {label}
      </motion.p>
    </div>
  );
}

export function CoreNotice({
  title,
  message,
  points,
  action,
}: {
  title: string;
  message: string;
  points?: string[];
  action?: React.ReactNode;
}) {
  return (
    <div className="glass rounded-2xl p-6">
      <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">{title}</p>
      <p className="mt-2 text-sm text-foreground/90">{message}</p>
      {points && points.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {points.map((p) => (
            <li key={p} className="flex gap-2 text-xs text-muted-foreground">
              <span className="text-gradient">▸</span>
              {p}
            </li>
          ))}
        </ul>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
