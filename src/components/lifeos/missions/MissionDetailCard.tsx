import { missionDetail } from "@/lib/missions-mock";

export function MissionDetailCard() {
  return (
    <div className="glass rounded-2xl p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Primary Objective
          </p>
          <h3 className="mt-1 text-2xl font-semibold text-gradient">{missionDetail.name}</h3>
          <p className="mt-2 max-w-2xl text-sm text-foreground/80">{missionDetail.objective}</p>
        </div>
        <div className="flex gap-2">
          <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-muted-foreground">
            {missionDetail.duration}
          </span>
          <span
            className="rounded-md px-2.5 py-1 text-[11px] font-semibold text-primary-foreground"
            style={{ background: "var(--gradient-hero)" }}
          >
            {missionDetail.difficulty}
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Why CORE selected this
          </p>
          <p className="mt-2 text-sm text-foreground/85">{missionDetail.reason}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Expected Outcome
          </p>
          <p className="mt-2 text-sm text-foreground/85">{missionDetail.expectedOutcome}</p>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
          Growth Areas
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {missionDetail.growthAreas.map((g) => (
            <span
              key={g}
              className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs"
            >
              {g}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
          Preparation Tips
        </p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {missionDetail.prepTips.map((tip) => (
            <li
              key={tip}
              className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-sm"
            >
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[10px] text-primary-foreground"
                style={{ background: "var(--gradient-hero)" }}
              >
                ✓
              </span>
              <span className="text-foreground/85">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
