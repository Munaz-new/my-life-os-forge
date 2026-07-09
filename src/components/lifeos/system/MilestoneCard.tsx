import { motion } from "framer-motion";

interface MilestoneCardProps {
  icon: string;
  type: string;
  title: string;
  time: string;
  last?: boolean;
}

export function MilestoneCard({ icon, type, title, time, last }: MilestoneCardProps) {
  return (
    <div className="relative flex gap-4 pb-6">
      {!last && (
        <span className="absolute left-[19px] top-10 bottom-0 w-px bg-gradient-to-b from-white/20 to-transparent" />
      )}
      <span
        className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm text-primary-foreground"
        style={{ background: "var(--gradient-hero)", boxShadow: "var(--glow-primary)" }}
      >
        {icon}
      </span>
      <motion.div
        initial={{ opacity: 0, x: 6 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass flex-1 rounded-xl p-3"
      >
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{type}</p>
          <p className="text-[11px] text-muted-foreground">{time}</p>
        </div>
        <p className="mt-1 text-sm font-medium">{title}</p>
      </motion.div>
    </div>
  );
}
