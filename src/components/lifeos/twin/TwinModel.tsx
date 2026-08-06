import { motion } from "framer-motion";
import { TwinParticles } from "./TwinParticles";
import { toneVar, twinAxes, type TwinAxis } from "@/lib/twin-mock";

interface Props {
  aura: number;
  activeId: string | null;
  onSelect: (id: string) => void;
  axisValues: Record<string, number>;
}

/** Abstract holographic silhouette — layered geometry, never realistic. */
export function TwinModel({ aura, activeId, onSelect, axisValues }: Props) {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px] select-none sm:max-w-[460px]">
      <TwinParticles />

      <motion.svg
        viewBox="0 0 400 500"
        className="relative h-full w-full"
        animate={{ scale: [1, 1.022, 1] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="twinBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--cyan-accent)" stopOpacity="0.55" />
            <stop offset="55%" stopColor="var(--primary)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--violet-accent)" stopOpacity="0.45" />
          </linearGradient>
          <radialGradient id="twinGlow" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.32 * aura} />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </radialGradient>
          <filter id="twinBlur" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>

        <ellipse cx="200" cy="240" rx="185" ry="230" fill="url(#twinGlow)" />

        {/* orbiting rings */}
        {[0, 1, 2].map((i) => (
          <motion.ellipse
            key={i}
            cx="200"
            cy={250}
            rx={150 - i * 26}
            ry={40 + i * 8}
            fill="none"
            stroke={i === 1 ? "var(--cyan-accent)" : i === 2 ? "var(--violet-accent)" : "var(--primary)"}
            strokeOpacity={0.22 + aura * 0.2}
            strokeWidth="1"
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 26 + i * 9, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "200px 250px" }}
          />
        ))}

        {/* abstract figure */}
        <g opacity={0.55 + aura * 0.4}>
          <motion.g
            filter="url(#twinBlur)"
            animate={{ opacity: [0.35, 0.7, 0.35] }}
            transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <polygon points="200,58 226,90 200,124 174,90" fill="url(#twinBody)" />
            <polygon points="200,132 258,178 240,318 160,318 142,178" fill="url(#twinBody)" />
          </motion.g>

          <polygon
            points="200,58 226,90 200,124 174,90"
            fill="none"
            stroke="var(--cyan-accent)"
            strokeOpacity="0.8"
            strokeWidth="1.4"
          />
          <polygon
            points="200,132 258,178 240,318 160,318 142,178"
            fill="url(#twinBody)"
            fillOpacity="0.35"
            stroke="var(--primary)"
            strokeOpacity="0.75"
            strokeWidth="1.4"
          />
          {/* limbs */}
          <polyline points="142,178 104,246 118,318" fill="none" stroke="var(--violet-accent)" strokeOpacity="0.7" strokeWidth="1.4" />
          <polyline points="258,178 296,246 282,318" fill="none" stroke="var(--violet-accent)" strokeOpacity="0.7" strokeWidth="1.4" />
          <polyline points="176,318 168,404 158,462" fill="none" stroke="var(--cyan-accent)" strokeOpacity="0.65" strokeWidth="1.4" />
          <polyline points="224,318 232,404 242,462" fill="none" stroke="var(--cyan-accent)" strokeOpacity="0.65" strokeWidth="1.4" />
          {/* internal lattice */}
          {Array.from({ length: 6 }).map((_, i) => (
            <line
              key={i}
              x1={148 + i * 2}
              y1={190 + i * 22}
              x2={252 - i * 2}
              y2={190 + i * 22}
              stroke="var(--primary)"
              strokeOpacity={0.18}
              strokeWidth="1"
            />
          ))}
        </g>

        {/* scan line */}
        <motion.rect
          x="60"
          width="280"
          height="2"
          fill="var(--cyan-accent)"
          opacity="0.35"
          animate={{ y: [70, 460, 70] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.svg>

      {/* region markers */}
      {twinAxes.map((a: TwinAxis) => {
        const active = activeId === a.id;
        const value = axisValues[a.id] ?? a.state;
        return (
          <button
            key={a.id}
            type="button"
            onClick={() => onSelect(a.id)}
            aria-label={`${a.label}: ${value}`}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full outline-none"
            style={{ left: `${a.region.x}%`, top: `${a.region.y}%` }}
          >
            <motion.span
              className="flex h-7 w-7 items-center justify-center rounded-full border text-[10px]"
              style={{
                borderColor: toneVar(a.tone),
                color: toneVar(a.tone),
                background: `color-mix(in oklab, ${toneVar(a.tone)} ${active ? 34 : 14}%, transparent)`,
                boxShadow: active ? `0 0 18px ${toneVar(a.tone)}` : "none",
              }}
              animate={{ scale: active ? [1, 1.16, 1] : [1, 1.06, 1] }}
              transition={{ duration: active ? 1.6 : 3.4, repeat: Infinity, ease: "easeInOut" }}
            >
              {a.glyph}
            </motion.span>
          </button>
        );
      })}
    </div>
  );
}
