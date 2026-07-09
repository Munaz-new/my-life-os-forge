import { motion } from "framer-motion";

interface LifeDomainCardProps {
  name: string;
  level: number;
  progress: number;
  spark: number[];
}

export function LifeDomainCard({ name, level, progress, spark }: LifeDomainCardProps) {
  const w = 100;
  const h = 32;
  const max = Math.max(...spark);
  const min = Math.min(...spark);
  const range = Math.max(1, max - min);
  const pts = spark
    .map((v, i) => {
      const x = (i / (spark.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <motion.div
      whileHover={{ y: -3 }}
      animate={{ y: [0, -2, 0] }}
      transition={{ y: { duration: 7, repeat: Infinity, ease: "easeInOut" } }}
      className="glass rounded-2xl p-5"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs text-muted-foreground">Lv {level}</p>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="mt-3 h-8 w-full">
        <defs>
          <linearGradient id={`spark-${name}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.65 0.20 255)" />
            <stop offset="100%" stopColor="oklch(0.65 0.24 300)" />
          </linearGradient>
        </defs>
        <motion.polyline
          fill="none"
          stroke={`url(#spark-${name})`}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={pts}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: "var(--gradient-hero)" }}
        />
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground">{progress}% to next level</p>
    </motion.div>
  );
}
