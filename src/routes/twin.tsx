import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AmbientBackground } from "@/components/lifeos/AmbientBackground";
import { LogoMark } from "@/components/lifeos/LogoMark";
import { GlassCard } from "@/components/lifeos/GlassCard";
import { TwinModel } from "@/components/lifeos/twin/TwinModel";
import { TwinPanel } from "@/components/lifeos/twin/TwinPanel";
import { TwinStateCard } from "@/components/lifeos/twin/TwinStateCard";
import { TwinHealth } from "@/components/lifeos/twin/TwinHealth";
import { TwinReadiness } from "@/components/lifeos/twin/TwinReadiness";
import { GrowthSimulation } from "@/components/lifeos/twin/GrowthSimulation";
import { TwinComparison } from "@/components/lifeos/twin/TwinComparison";
import { BehaviorPattern } from "@/components/lifeos/twin/BehaviorPattern";
import { TwinInsight } from "@/components/lifeos/twin/TwinInsight";
import {
  behaviors,
  observations,
  readiness,
  recommendations,
  snapshots,
  toneVar,
  twinAxes,
  twinOverall,
} from "@/lib/twin-mock";
import { eventBus, useCoreModule } from "@/lib/core-engine";

export const Route = createFileRoute("/twin")({
  head: () => ({
    meta: [
      { title: "Digital Twin — Your Living Evolution Model" },
      {
        name: "description",
        content:
          "A continuously updating model of your current state: mind, body, focus and recovery, with readiness scores, a growth simulator and CORE observations.",
      },
      { property: "og:title", content: "Digital Twin — Your Living Evolution Model" },
      {
        property: "og:description",
        content:
          "Look into a futuristic mirror: holographic twin, ten life axes, twin health, readiness scores, growth simulation and behaviour patterns.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TwinPage,
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

function TwinPage() {
  useCoreModule("core");
  const [activeAxis, setActiveAxis] = useState<string | null>(null);
  const [snapshotId, setSnapshotId] = useState("now");

  const snapshot = snapshots.find((s) => s.id === snapshotId) ?? snapshots[2];

  const selectAxis = (id: string) => {
    const axis = twinAxes.find((a) => a.id === id);
    if (!axis) return;
    setActiveAxis(id);
    eventBus.emit({
      type: "MemoryEvent",
      module: "core",
      tone: axis.tone === "destructive" ? "primary" : axis.tone,
      label: `Twin region inspected: ${axis.label}`,
      payload: { memoryId: `twin.${axis.id}`, title: axis.label, action: "recalled" },
    });
  };

  const onSimulate = (id: string, v: number) => {
    eventBus.emit({
      type: "GrowthEvent",
      module: "core",
      tone: "cyan",
      label: `Twin simulation: ${id} → ${v}`,
      payload: { metric: id, delta: v, note: "Digital Twin growth simulation" },
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
            <p className="text-sm font-medium">Digital Twin</p>
          </div>
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <NavLink to="/core" label="◉ CORE" />
          <NavLink to="/knowledge" label="⬡ Knowledge" />
          <NavLink to="/genome" label="❋ Genome" />
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
            CORE Digital Twin
          </p>
          <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">
            <span className="text-gradient">Digital Twin</span>
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">Your Living Evolution Model</p>
        </motion.div>

        <div className="mt-8 grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
          <TwinModel
            aura={snapshot.aura}
            activeId={activeAxis}
            onSelect={selectAxis}
            axisValues={snapshot.axes}
          />

          <GlassCard glow className="p-6">
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              Twin State — {snapshot.label}
            </p>
            <div className="mt-3 flex items-end gap-3">
              <motion.p
                key={snapshot.id}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl font-semibold text-gradient"
              >
                {snapshot.overall}
              </motion.p>
              <p className="pb-2 text-xs text-muted-foreground">
                model index · live baseline {twinOverall}
              </p>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{snapshot.caption}</p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {twinAxes.slice(0, 4).map((a) => (
                <div key={a.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {a.label}
                  </p>
                  <p className="mt-1 text-lg font-semibold" style={{ color: toneVar(a.tone) }}>
                    {snapshot.axes[a.id] ?? a.state}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[11px] text-muted-foreground">
              Tap any glyph on the twin to open that region.
            </p>
          </GlassCard>
        </div>

        <Section title="Body Sections" eyebrow="Ten axes of the model">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {twinAxes.map((a, i) => (
              <TwinStateCard
                key={a.id}
                axis={a}
                value={snapshot.axes[a.id] ?? a.state}
                active={activeAxis === a.id}
                onSelect={() => selectAxis(a.id)}
                index={i}
              />
            ))}
          </div>
        </Section>

        <Section title="Twin Health" eyebrow="Structural integrity of the model">
          <TwinHealth />
        </Section>

        <Section title="Twin Readiness" eyebrow="How close each identity is">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {readiness.map((r, i) => (
              <TwinReadiness key={r.id} item={r} index={i} />
            ))}
          </div>
        </Section>

        <Section title="Growth Simulator" eyebrow="Move an input, watch the twin respond">
          <GrowthSimulation onChange={onSimulate} />
        </Section>

        <Section title="Twin Comparison" eyebrow="How the model has changed">
          <TwinComparison activeId={snapshotId} onSelect={setSnapshotId} />
        </Section>

        <Section title="Behavior Patterns" eyebrow="Rhythms CORE has observed">
          <div className="grid gap-4 sm:grid-cols-2">
            {behaviors.map((b, i) => (
              <BehaviorPattern key={b.id} data={b} index={i} />
            ))}
          </div>
        </Section>

        <Section title="CORE Observations" eyebrow="What the twin reveals">
          <div className="grid gap-4 sm:grid-cols-2">
            {observations.map((o, i) => (
              <TwinInsight key={o.id} obs={o} index={i} />
            ))}
          </div>
        </Section>

        <Section title="Recommendations" eyebrow="Generated by CORE">
          <div className="grid gap-4 sm:grid-cols-2">
            {recommendations.map((r, i) => {
              const color = toneVar(r.tone);
              return (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                >
                  <GlassCard className="h-full p-5">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-semibold">{r.title}</p>
                      <span
                        className="shrink-0 rounded-full px-2 py-1 text-[10px] uppercase tracking-[0.15em]"
                        style={{
                          color,
                          background: `color-mix(in oklab, ${color} 16%, transparent)`,
                        }}
                      >
                        {r.priority}
                      </span>
                    </div>
                    <p className="mt-2 text-[11px] text-muted-foreground">{r.reason}</p>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                          Expected impact
                        </p>
                        <p className="mt-1 text-xs font-medium" style={{ color }}>
                          {r.impact}
                        </p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                          Confidence
                        </p>
                        <p className="mt-1 text-xs font-medium">{r.confidence}%</p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </Section>
      </div>

      <TwinPanel axisId={activeAxis} onClose={() => setActiveAxis(null)} />
    </main>
  );
}
