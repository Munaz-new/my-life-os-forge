import { motion } from "framer-motion";

interface BuffCardProps {
  icon: string;
  name: string;
  detail: string;
  timer: string;
}

export function BuffCard({ icon, name, detail, timer }: BuffCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="glass flex items-center gap-3 rounded-xl border border-[color:var(--primary)]/25 p-3"
      style={{ boxShadow: "0 0 24px oklch(0.72 0.17 200 / 18%)" }}
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-base text-primary-foreground"
        style={{ background: "var(--gradient-hero)" }}
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{name}</p>
        <p className="truncate text-xs text-muted-foreground">{detail}</p>
      </div>
      <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] tabular-nums text-foreground/80">
        {timer}
      </span>
    </motion.div>
  );
}
