import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/use-count-up";

interface Props {
  icon: string;
  title: string;
  growth: string;
  xp: number;
  difficulty: string;
  impact: string;
}

export function OpportunityCard({ icon, title, growth, xp, difficulty, impact }: Props) {
  const xpAnim = useCountUp(xp, 1400);
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.005 }}
      className="glass flex h-full flex-col rounded-2xl p-5"
    >
      <div className="flex items-start gap-3">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-xl text-lg text-primary-foreground"
          style={{ background: "var(--gradient-hero)" }}
        >
          {icon}
        </span>
        <div className="flex-1">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Opportunity
          </p>
          <h4 className="mt-0.5 text-sm font-semibold leading-snug">{title}</h4>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-[11px]">
        <Cell label="Growth" value={growth} accent />
        <Cell label="Est. XP" value={`+${Math.round(xpAnim)}`} accent />
        <Cell label="Difficulty" value={difficulty} />
        <Cell label="Impact" value={impact} />
      </div>
    </motion.div>
  );
}

function Cell({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-2">
      <p className="text-[9px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className={"mt-0.5 " + (accent ? "font-semibold text-gradient" : "text-foreground/90")}>
        {value}
      </p>
    </div>
  );
}
