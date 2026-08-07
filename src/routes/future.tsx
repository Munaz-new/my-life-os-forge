import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { AmbientBackground } from "@/components/lifeos/AmbientBackground";
import { LogoMark } from "@/components/lifeos/LogoMark";
import { GlassCard } from "@/components/lifeos/GlassCard";
import { FutureTimeline } from "@/components/lifeos/future/FutureTimeline";
import { ScenarioCard } from "@/components/lifeos/future/ScenarioCard";
import { TrajectoryChart } from "@/components/lifeos/future/TrajectoryChart";
import { TurningPointCard } from "@/components/lifeos/future/TurningPointCard";
import { OpportunityForecast } from "@/components/lifeos/future/OpportunityForecast";
import { RiskForecast } from "@/components/lifeos/future/RiskForecast";
import {
  SimulationControl,
  whatIfBase,
} from "@/components/lifeos/future/SimulationControl";
import {
  bendCurve,
  currentDirection,
  futureQuote,
  horizonNarrative,
  horizons,
  scenarios,
  toneVar,
  type FuturePath,
  type HorizonId,
} from "@/lib/future-mock";
import { eventBus, useCoreModule } from "@/lib/core-engine";

export const Route = createFileRoute("/future")({
  head: () => ({
    meta: [
      { title: "Future Simulator — Explore the Future You're Creating" },
      {
        name: "description",
        content:
          "Scenario planning inside LifeOS: compare best case, expected and risk paths, explore turning points, and simulate how today's habits reshape your future.",
      },
      { property: "og:title", content: "Future Simulator — Explore the Future You're Creating" },
      {
        property: "og:description",
        content:
          "A cinematic scenario planner: three future paths, interactive horizons, turning points, opportunity and risk forecasts, and a live what-if simulator.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FuturePage,
});

function NavLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-foreground/80 transition hover:bg-white/10"
    >
      {label}
    </Link>
  );
}

function Section({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mt-14"
    >
      <div className="mb-4">
        {eyebrow && (
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">{eyebrow}</p>
        )}
        <h2 className="mt-1 text-xl font-semibold sm:text-2xl">{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}

const PATH_TO_SCENARIO: Record<FuturePath["id"], string> = {
  best: "b",
  expected: "a",
  risk: "c",
};
const SCENARIO_TO_PATH: Record<string, FuturePath["id"]> = {
  a: "expected",
  b: "best",
  c: "risk",
};

function FuturePage() {
  useCoreModule("core");
  const [pathId, setPathId] = useState<FuturePath["id"]>("expected");
  const [scenarioId, setScenarioId] = useState("a");
  const [horizonId, setHorizonId] = useState<HorizonId>("90d");
  const [values, setValues] = useState<Record<string, number>>(whatIfBase);

  const scenario = scenarios.find((s) => s.id === scenarioId) ?? scenarios[0];
  const accent = toneVar(scenario.tone);

  const curves = useMemo(
    () =>
      Object.fromEntries(scenarios.map((s) => [s.id, bendCurve(s.curve, values)])) as Record<
        string,
        number[]
      >,
    [values],
  );

  const drift = useMemo(() => {
    const base = scenario.horizons[horizonId];
    const bent = curves[scenario.id];
    const idx = horizons.findIndex((h) => h.id === horizonId) + 1;
    return Math.round(bent[idx] - base);
  }, [curves, horizonId, scenario]);

  const selectScenario = (id: string) => {
    setScenarioId(id);
    setPathId(SCENARIO_TO_PATH[id] ?? "expected");
    const s = scenarios.find((x) => x.id === id);
    eventBus.emit({
      type: "RecommendationEvent",
      module: "core",
      tone: s?.tone === "destructive" ? "primary" : (s?.tone ?? "primary"),
      label: `Future scenario simulated: ${s?.title ?? id}`,
      payload: {
        title: s?.title ?? id,
        reason: s?.premise ?? "Scenario planning",
        confidence: (s?.confidence ?? 70) / 100,
      },
    });
  };

  const selectPath = (id: FuturePath["id"]) => {
    setPathId(id);
    setScenarioId(PATH_TO_SCENARIO[id]);
  };

  const onWhatIf = (id: string, v: number) => {
    setValues((prev) => ({ ...prev, [id]: v }));
    eventBus.emit({
      type: "GrowthEvent",
      module: "core",
      tone: "cyan",
      label: `Future what-if: ${id} → ${v}`,
      payload: { metric: id, delta: v, note: "Future Simulator what-if control" },
    });
  };

  return (
    <main className="relative min-h-screen overflow-hidden pb-32">
      <AmbientBackground />

      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link to="/home" className="flex items-center gap-3">
          <LogoMark size={38} />
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">LifeOS</p>
            <p className="text-sm font-medium">Future Simulator</p>
          </div>
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <NavLink to="/core" label="◉ CORE" />
          <NavLink to="/twin" label="◬ Twin" />
          <NavLink to="/knowledge" label="⬡ Knowledge" />
          <NavLink to="/home" label="← Dashboard" />
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pt-2 text-center"
        >
          <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
            CORE Future Simulator
          </p>
          <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">
            <span className="text-gradient">Future Simulator</span>
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">Explore the Future You're Creating</p>
        </motion.div>

        <div className="mt-8">
          <FutureTimeline activeId={pathId} onSelect={selectPath} />
        </div>

        <Section title="Current Direction" eyebrow="Where you are pointed today">
          <GlassCard glow className="p-6">
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              Current Goal
            </p>
            <h3 className="mt-1 text-2xl font-semibold text-gradient">{currentDirection.goal}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{currentDirection.trajectory}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {currentDirection.stats.map((s) => (
                <div key={s.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {s.label}
                  </p>
                  <p className="mt-1 text-2xl font-semibold" style={{ color: toneVar(s.tone) }}>
                    {s.value}
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">{s.hint}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </Section>

        <Section title="Scenario Cards" eyebrow="Three ways today could compound">
          <div className="grid gap-4 lg:grid-cols-3">
            {scenarios.map((s, i) => (
              <ScenarioCard
                key={s.id}
                scenario={s}
                index={i}
                active={s.id === scenarioId}
                onSelect={() => selectScenario(s.id)}
              />
            ))}
          </div>
        </Section>

        <Section title="Timeline Projection" eyebrow="Move through the horizon">
          <div className="flex flex-wrap gap-2">
            {horizons.map((h) => (
              <button
                key={h.id}
                type="button"
                onClick={() => setHorizonId(h.id)}
                className="rounded-xl border px-4 py-2 text-xs transition"
                style={{
                  borderColor: h.id === horizonId ? accent : "oklch(1 0 0 / 10%)",
                  background:
                    h.id === horizonId
                      ? `color-mix(in oklab, ${accent} 15%, transparent)`
                      : "oklch(1 0 0 / 5%)",
                }}
              >
                {h.label}
              </button>
            ))}
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_320px]">
            <TrajectoryChart activeId={scenarioId} curves={curves} />

            <GlassCard className="p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${scenarioId}-${horizonId}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                    {scenario.tag} · {horizons.find((h) => h.id === horizonId)?.label}
                  </p>
                  <div className="mt-2 flex items-end gap-2">
                    <p className="text-5xl font-semibold" style={{ color: accent }}>
                      {scenario.horizons[horizonId] + drift}
                    </p>
                    <span className="pb-2 text-xs text-muted-foreground">
                      projected index
                      {drift !== 0 && (
                        <span className="ml-1" style={{ color: accent }}>
                          ({drift > 0 ? "+" : ""}
                          {drift} what-if)
                        </span>
                      )}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {horizonNarrative[scenario.id][horizonId]}
                  </p>
                </motion.div>
              </AnimatePresence>
            </GlassCard>
          </div>
        </Section>

        <Section title="Turning Points" eyebrow="Moments that bend the curve">
          <div className="grid gap-4 md:grid-cols-2">
            {turningPointList()}
          </div>
        </Section>

        <Section title="Opportunity Forecast" eyebrow="Where the upside is hiding">
          <OpportunityForecast />
        </Section>

        <Section title="Risk Forecast" eyebrow="Gentle signals worth watching">
          <RiskForecast />
        </Section>

        <Section title="What-If Simulator" eyebrow="Change an input, watch the future move">
          <SimulationControl
            values={values}
            onChange={onWhatIf}
            onReset={() => setValues(whatIfBase())}
          />
        </Section>

        <Section title="Future Reflection" eyebrow="Closing thought">
          <GlassCard glow className="p-10 text-center">
            <motion.p
              animate={{ opacity: [0.75, 1, 0.75] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="mx-auto max-w-2xl text-xl font-medium leading-relaxed text-gradient sm:text-2xl"
            >
              “{futureQuote.text}”
            </motion.p>
            <p className="mt-4 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              {futureQuote.attribution}
            </p>
          </GlassCard>
        </Section>
      </div>
    </main>
  );
}

function turningPointList() {
  return turningPoints.map((p, i) => <TurningPointCard key={p.id} point={p} index={i} />);
}

import { turningPoints } from "@/lib/future-mock";
