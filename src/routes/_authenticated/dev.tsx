import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AmbientBackground } from "@/components/lifeos/AmbientBackground";
import { LogoMark } from "@/components/lifeos/LogoMark";
import { GlassCard } from "@/components/lifeos/GlassCard";
import {
  FLOW_DIAGRAMS,
  goalChangedFlow,
  growthEngine,
  memoryEngine,
  missionCompleteFlow,
  missionEngine,
  recommendationEngine,
  runFlow,
  useCoreEvents,
  useCoreModule,
  useCoreState,
  useModuleRegistry,
  type CoreEvent,
} from "@/lib/core-engine";

const DEV_KEY = "evolve.devMode";

export const Route = createFileRoute("/_authenticated/dev")({
  head: () => ({
    meta: [
      { title: "CORE Developer Preview — EVOLVE" },
      {
        name: "description",
        content:
          "Internal developer preview of the CORE intelligence layer: state, modules, events, and pipeline.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DevPage,
});

const toneVar = (tone: CoreEvent["tone"]) =>
  tone === "cyan"
    ? "var(--cyan-accent)"
    : tone === "violet"
      ? "var(--violet-accent)"
      : tone === "destructive"
        ? "var(--destructive)"
        : "var(--primary)";

function time(at: number) {
  return new Date(at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function DevPage() {
  useCoreModule("core");
  const [devMode, setDevMode] = useState<boolean | null>(null);
  const state = useCoreState();
  const events = useCoreEvents(40);
  const modules = useModuleRegistry();
  const [running, setRunning] = useState<string | null>(null);

  useEffect(() => {
    setDevMode(window.localStorage.getItem(DEV_KEY) === "on");
  }, []);

  const toggle = () => {
    const next = !devMode;
    setDevMode(next);
    window.localStorage.setItem(DEV_KEY, next ? "on" : "off");
  };

  const trigger = async (which: "mission" | "goal") => {
    setRunning(which);
    await runFlow(which === "mission" ? missionCompleteFlow() : goalChangedFlow());
    setRunning(null);
  };

  const online = modules.filter((m) => m.status === "online").length;

  return (
    <main className="relative min-h-screen overflow-hidden pb-32">
      <AmbientBackground />

      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link to="/home" className="flex items-center gap-3">
          <LogoMark size={38} />
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">LifeOS</p>
            <p className="text-sm font-medium">Developer Preview</p>
          </div>
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={toggle}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-foreground/80 transition hover:bg-white/10"
          >
            Dev Mode: {devMode ? "ON" : "OFF"}
          </button>
          <Link
            to="/home"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-foreground/80 transition hover:bg-white/10"
          >
            ← Dashboard
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
            CORE Intelligence Architecture
          </p>
          <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">
            <span className="text-gradient">Developer Preview</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Hidden internal view of the CORE layer — mock data only.
          </p>
        </motion.div>

        {devMode === false ? (
          <GlassCard className="mt-10 text-center">
            <p className="text-sm text-foreground/80">
              Developer Mode is disabled. Enable it above to inspect the CORE intelligence layer.
            </p>
          </GlassCard>
        ) : devMode === null ? null : (
          <>
            {/* CORE State */}
            <Section title="CORE State" eyebrow="Central Intelligence">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <Stat label="Current Focus" value={state.currentFocus} />
                <Stat label="Current Goal" value={state.currentGoal} />
                <Stat label="Current Mission" value={state.currentMission} />
                <Stat label="Learning Velocity" value={`${Math.round(state.learningVelocity)}%`} />
                <Stat label="Growth Momentum" value={`${Math.round(state.growthMomentum)}%`} />
                <Stat label="Energy" value={`${Math.round(state.energy)}%`} />
                <Stat label="Recovery" value={`${Math.round(state.recovery)}%`} />
                <Stat label="Mood" value={state.mood} />
                <Stat label="Consistency" value={`${Math.round(state.consistency)}%`} />
              </div>
            </Section>

            {/* Modules */}
            <Section title="Connected Modules" eyebrow={`${online} online`}>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {modules.map((m) => (
                  <GlassCard key={m.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{m.glyph}</span>
                        <span className="text-sm font-medium">{m.label}</span>
                      </div>
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{
                          background:
                            m.status === "online" ? "var(--cyan-accent)" : "var(--muted-foreground)",
                          boxShadow: m.status === "online" ? "var(--glow-cyan)" : "none",
                        }}
                      />
                    </div>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                      {m.status} · {m.eventCount} events
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      emits: {m.emits.join(", ")}
                    </p>
                  </GlassCard>
                ))}
              </div>
            </Section>

            {/* Pipeline */}
            <Section title="Mock Intelligence Pipeline" eyebrow="Interaction Flows">
              <GlassCard>
                <div className="flex flex-wrap gap-2">
                  {[recommendationEngine, memoryEngine, growthEngine, missionEngine].map((e) => (
                    <span
                      key={e.id}
                      className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs"
                      title={e.describe()}
                    >
                      {e.id} · {e.status}
                    </span>
                  ))}
                </div>
                <div className="mt-4 space-y-2">
                  {FLOW_DIAGRAMS.map((d) => (
                    <pre
                      key={d}
                      className="overflow-x-auto rounded-xl border border-white/10 bg-black/20 p-3 text-[11px] text-foreground/80"
                    >
                      {d}
                    </pre>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    disabled={running !== null}
                    onClick={() => trigger("mission")}
                    className="rounded-xl bg-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-[var(--shadow-neon)] transition hover:opacity-90 disabled:opacity-50"
                  >
                    {running === "mission" ? "Running…" : "Run Mission Complete flow"}
                  </button>
                  <button
                    disabled={running !== null}
                    onClick={() => trigger("goal")}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium transition hover:bg-white/10 disabled:opacity-50"
                  >
                    {running === "goal" ? "Running…" : "Run Goal Changed flow"}
                  </button>
                </div>
              </GlassCard>
            </Section>

            {/* Events */}
            <Section title="Recent Events" eyebrow="Internal Timeline">
              <GlassCard>
                <ul className="space-y-2">
                  {events.map((e) => (
                    <motion.li
                      key={e.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 px-3 py-2"
                    >
                      <span className="w-12 shrink-0 text-[11px] text-muted-foreground">
                        {time(e.at)}
                      </span>
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: toneVar(e.tone) }}
                      />
                      <span className="min-w-0 flex-1 truncate text-xs">{e.label}</span>
                      <span className="shrink-0 rounded-lg border border-white/10 px-2 py-0.5 text-[10px] text-muted-foreground">
                        {e.type}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </GlassCard>
            </Section>

            {/* Health */}
            <Section title="System Health" eyebrow="Diagnostics">
              <GlassCard className="space-y-4">
                <Bar label="Event Bus" value={Math.min(100, events.length * 4 + 20)} />
                <Bar label="Module Coverage" value={(online / modules.length) * 100} />
                <Bar label="State Coherence" value={state.consistency} />
                <Bar label="Engine Readiness" value={40} />
                <p className="text-[11px] text-muted-foreground">
                  Engines are placeholders; readiness stays partial until real intelligence lands.
                </p>
              </GlassCard>
            </Section>
          </>
        )}
      </div>
    </main>
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
    <section className="mt-12">
      <div className="mb-4">
        {eyebrow && (
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">{eyebrow}</p>
        )}
        <h2 className="mt-1 text-xl font-semibold sm:text-2xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <GlassCard className="p-4">
      <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
      <p className="mt-1 truncate text-sm font-medium">{value}</p>
    </GlassCard>
  );
}

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs">
        <span className="text-foreground/80">{label}</span>
        <span className="text-muted-foreground">{Math.round(value)}%</span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(0, Math.min(100, value))}%` }}
          transition={{ duration: 0.8 }}
          style={{ boxShadow: "var(--glow-primary)" }}
        />
      </div>
    </div>
  );
}
