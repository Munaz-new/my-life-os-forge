import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AmbientBackground } from "@/components/lifeos/AmbientBackground";
import { LogoMark } from "@/components/lifeos/LogoMark";
import { EvolutionParticles } from "@/components/lifeos/evolution/EvolutionParticles";
import { EvolutionHero } from "@/components/lifeos/evolution/EvolutionHero";
import { EvolutionSummary } from "@/components/lifeos/evolution/EvolutionSummary";
import { DecisionImpactCard } from "@/components/lifeos/evolution/DecisionImpactCard";
import { TrajectoryGraph } from "@/components/lifeos/evolution/TrajectoryGraph";
import { ProjectionCard } from "@/components/lifeos/evolution/ProjectionCard";
import { TimelineComparison } from "@/components/lifeos/evolution/TimelineComparison";
import { ReflectionCard } from "@/components/lifeos/evolution/ReflectionCard";
import { TomorrowPreview } from "@/components/lifeos/evolution/TomorrowPreview";
import { EvolutionScoreRadar } from "@/components/lifeos/evolution/EvolutionScoreRadar";
import { decisions, projections } from "@/lib/evolution-mock";
import { useEffect } from "react";
import { growthEngine, useCoreModule } from "@/lib/core-engine";

export const Route = createFileRoute("/_authenticated/evolution")({
  head: () => ({
    meta: [
      { title: "Evolution Review — How Today Changed You" },
      {
        name: "description",
        content:
          "CORE Evolution Engine — an intelligent assessment of how today's decisions reshape your long-term trajectory.",
      },
    ],
  }),
  component: EvolutionPage,
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

function EvolutionPage() {
  useCoreModule("evolution");
  useEffect(() => {
    growthEngine.recordGrowth("Evolution Review", 1, "Daily review opened");
  }, []);
  return (
    <main className="relative min-h-screen overflow-hidden pb-32">
      <AmbientBackground />

      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link to="/home" className="flex items-center gap-3">
          <LogoMark size={38} />
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">LifeOS</p>
            <p className="text-sm font-medium">Evolution Review</p>
          </div>
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <NavLink to="/core" label="◉ CORE" />
          <NavLink to="/missions" label="◆ Missions" />
          <NavLink to="/decisions" label="◐ Decisions" />
          <NavLink to="/genome" label="❋ Genome" />
          <NavLink to="/memory" label="⬢ Memory" />
          <NavLink to="/system" label="◈ System" />
          <NavLink to="/knowledge" label="⬡ Knowledge" />
          <NavLink to="/twin" label="◬ Twin" />
          <NavLink to="/future" label="◎ Future" />
          <NavLink to="/home" label="← Dashboard" />
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6">
        <div className="relative">
          <EvolutionParticles />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative pt-2 text-center"
          >
            <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
              CORE Evolution Engine
            </p>
            <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">
              <span className="text-gradient">Evolution Review</span>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">How Today Changed You</p>
          </motion.div>

          <div className="relative mt-8">
            <EvolutionHero />
          </div>
        </div>

        <Section title="CORE Summary" eyebrow="Narrative" delay={0.15}>
          <EvolutionSummary />
        </Section>

        <Section title="Decision Impact" eyebrow="Choices → Future" delay={0.2}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {decisions.map((d, i) => (
              <DecisionImpactCard key={d.id} decision={d} index={i} />
            ))}
          </div>
        </Section>

        <Section title="Trajectory Analysis" eyebrow="Direction" delay={0.25}>
          <TrajectoryGraph />
        </Section>

        <Section title="Future Projection" eyebrow="If today's pattern continues" delay={0.3}>
          <div className="grid gap-4 lg:grid-cols-3">
            {projections.map((p, i) => (
              <ProjectionCard key={p.id} index={i} {...p} />
            ))}
          </div>
        </Section>

        <Section title="Alternate Timeline" eyebrow="Counterfactuals" delay={0.35}>
          <TimelineComparison />
        </Section>

        <Section title="Growth Reflection" eyebrow="Signal" delay={0.4}>
          <ReflectionCard />
        </Section>

        <Section title="Tomorrow Preview" eyebrow="Forecast" delay={0.45}>
          <TomorrowPreview />
        </Section>

        <Section title="Evolution Score" eyebrow="Composite" delay={0.5}>
          <EvolutionScoreRadar />
        </Section>
      </div>
    </main>
  );
}

function NavLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-foreground/80 transition hover:bg-white/10"
    >
      {label}
    </Link>
  );
}
