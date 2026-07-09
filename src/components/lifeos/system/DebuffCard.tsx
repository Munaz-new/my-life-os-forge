import { motion } from "framer-motion";

interface DebuffCardProps {
  icon: string;
  name: string;
  detail: string;
  timer: string;
}

export function DebuffCard({ icon, name, detail, timer }: DebuffCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="glass flex items-center gap-3 rounded-xl border border-[color:var(--destructive)]/30 p-3"
      style={{ boxShadow: "0 0 20px oklch(0.65 0.24 22 / 15%)" }}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[color:var(--destructive)]/20 text-base text-[color:var(--destructive)]">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{name}</p>
        <p className="truncate text-xs text-muted-foreground">{detail}</p>
      </div>
      <span className="rounded-md border border-[color:var(--destructive)]/25 bg-[color:var(--destructive)]/10 px-2 py-1 text-[11px] tabular-nums text-[color:var(--destructive)]">
        {timer}
      </span>
    </motion.div>
  );
}
