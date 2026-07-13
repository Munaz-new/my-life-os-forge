import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AmbientBackground } from "@/components/lifeos/AmbientBackground";
import { LogoMark } from "@/components/lifeos/LogoMark";
import { AnalysisCard } from "@/components/lifeos/core/AnalysisCard";
import { AmbientParticles } from "@/components/lifeos/missions/AmbientParticles";
import { MissionHeroCard } from "@/components/lifeos/missions/MissionHeroCard";
import { MissionCard } from "@/components/lifeos/missions/MissionCard";
import { MissionDetailCard } from "@/components/lifeos/missions/MissionDetailCard";
import { GrowthProjection } from "@/components/lifeos/missions/GrowthProjection";
import { MissionTimeline } from "@/components/lifeos/missions/MissionTimeline";
import { MissionReason } from "@/components/lifeos/missions/MissionReason";
import { MissionControls } from "@/components/lifeos/missions/MissionControls";
import { ReflectionCard } from "@/components/lifeos/missions/ReflectionCard";
import { categories } from "@/lib/missions-mock";

export const Route = createFileRoute("/missions")({
  head: () => ({
    meta: [
      { title: "Mission Center — LifeOS" },
      {
        name: "description",
        content:
          "Today's Evolution Path — CORE-designed daily missions, growth projections, and reflection.",
      },
    ],
  }),
  component: MissionsPage,
});

function Section({
  title,
  eyebrow,
  children,
  delay = 0,
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="mt-12"
    >
      <div className="mb-4">
        {eyebrow && (
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-1 text-xl font-semibold sm:text-2xl">{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}

function MissionsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden pb-32">
      <AmbientBackground />

      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link to="/home" className="flex items-center gap-3">
          <LogoMark size={38} />
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">LifeOS</p>
            <p className="text-sm font-medium">Mission Center</p>
          </div>
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/genome"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-foreground/80 transition hover:bg-white/10"
          >
            ❋ Genome
          </Link>
          <Link
            to="/core"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-foreground/80 transition hover:bg-white/10"
          >
            ◉ CORE
          </Link>
          <Link
            to="/system"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-foreground/80 transition hover:bg-white/10"
          >
            ◈ System
          </Link>
          <Link
            to="/home"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-foreground/80 transition hover:bg-white/10"
          >
            ← Dashboard
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6">
        {/* Hero */}
        <div className="relative">
          <AmbientParticles />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative pt-2 text-center"
          >
            <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
              Adaptive Mission Engine
            </p>
            <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">
              <span className="text-gradient">Mission Center</span>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">Today's Evolution Path</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative mt-8"
          >
            <MissionHeroCard />
          </motion.div>
        </div>

        <Section title="CORE Reasoning" eyebrow="Why this mission" delay={0.15}>
          <MissionReason />
        </Section>

        <Section title="Mission Categories" eyebrow="Available Vectors" delay={0.2}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <MissionCard key={c.key} category={c} />
            ))}
          </div>
        </Section>

        <Section title="Today's Mission" eyebrow="Directive" delay={0.25}>
          <MissionDetailCard />
        </Section>

        <Section title="Growth Projection" eyebrow="Expected Deltas" delay={0.3}>
          <AnalysisCard>
            <GrowthProjection />
          </AnalysisCard>
        </Section>

        <Section title="Mission Timeline" eyebrow="Execution Path" delay={0.35}>
          <AnalysisCard>
            <MissionTimeline />
          </AnalysisCard>
        </Section>

        <Section title="Mission Controls" eyebrow="Command" delay={0.4}>
          <MissionControls />
        </Section>

        <Section title="Reflection" eyebrow="After the mission" delay={0.45}>
          <ReflectionCard />
        </Section>
      </div>
    </main>
  );
}
