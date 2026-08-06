import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AmbientBackground } from "@/components/lifeos/AmbientBackground";
import { LogoMark } from "@/components/lifeos/LogoMark";
import { CoreOrb } from "@/components/lifeos/core/CoreOrb";
import { BriefingCard } from "@/components/lifeos/core/BriefingCard";
import { PriorityCard } from "@/components/lifeos/core/PriorityCard";
import { EnergyRing } from "@/components/lifeos/core/EnergyRing";
import { AnalysisCard } from "@/components/lifeos/core/AnalysisCard";
import { OpportunityCard } from "@/components/lifeos/core/OpportunityCard";
import { RiskCard } from "@/components/lifeos/core/RiskCard";
import { MomentumChart } from "@/components/lifeos/core/MomentumChart";
import { RecommendationCard } from "@/components/lifeos/core/RecommendationCard";
import { CoreCommandButton } from "@/components/lifeos/core/CoreCommandButton";
import { useCoreModule } from "@/lib/core-engine";
import {
  energyRings,
  opportunities,
  priorities,
  recommendations,
  risks,
  weeklyIntelligence,
} from "@/lib/core-mock";

export const Route = createFileRoute("/core")({
  head: () => ({
    meta: [
      { title: "CORE — LifeOS" },
      {
        name: "description",
        content:
          "CORE — the personal intelligence center behind LifeOS. Daily briefing, priorities, energy, opportunities, risks, and recommendations.",
      },
    ],
  }),
  component: CorePage,
});

function Section({
  title,
  eyebrow,
  children,
  delay = 0,
  right,
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
  delay?: number;
  right?: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="mt-12"
    >
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          {eyebrow && (
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              {eyebrow}
            </p>
          )}
          <h2 className="mt-1 text-xl font-semibold sm:text-2xl">{title}</h2>
        </div>
        {right}
      </div>
      {children}
    </motion.section>
  );
}

function CorePage() {
  useCoreModule("core");
  const sync = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <main className="relative min-h-screen overflow-hidden pb-32">
      <AmbientBackground />

      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link to="/home" className="flex items-center gap-3">
          <LogoMark size={38} />
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">LifeOS</p>
            <p className="text-sm font-medium">CORE</p>
          </div>
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/decisions"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-foreground/80 transition hover:bg-white/10"
          >
            ◐ Decisions
          </Link>
          <Link
            to="/evolution"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-foreground/80 transition hover:bg-white/10"
          >
            ◈ Evolution
          </Link>
          <Link
            to="/genome"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-foreground/80 transition hover:bg-white/10"
          >
            ❋ Genome
          </Link>
          <Link
            to="/memory"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-foreground/80 transition hover:bg-white/10"
          >
            ⬢ Memory
          </Link>
          <Link
            to="/missions"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-foreground/80 transition hover:bg-white/10"
          >
            ◆ Missions
          </Link>
          <Link
            to="/system"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-foreground/80 transition hover:bg-white/10"
          >
            ◈ System
          </Link>
          <Link
            to="/knowledge"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-foreground/80 transition hover:bg-white/10"
          >
            ⬡ Knowledge
          </Link>
          <Link
            to="/twin"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-foreground/80 transition hover:bg-white/10"
          >
            ◬ Twin
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
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center pt-4 text-center"
        >
          <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
            Personal Intelligence Center
          </p>
          <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">
            <span className="text-gradient">CORE</span>
          </h1>

          <div className="mt-2">
            <CoreOrb size={240} />
          </div>

          <div className="-mt-6 flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.3em]">
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-[color:var(--cyan-accent)]"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                style={{ boxShadow: "var(--glow-cyan)" }}
              />
              CORE Online
            </div>
            <p className="text-sm text-foreground/80">All Systems Operational</p>
            <p className="text-[11px] text-muted-foreground">
              System Status · Synchronized {sync}
            </p>
          </div>
        </motion.div>

        {/* Daily Briefing */}
        <Section title="Daily Briefing" eyebrow="Situation Report" delay={0.05}>
          <BriefingCard />
        </Section>

        {/* Priorities */}
        <Section title="Today's Priorities" eyebrow="Directive" delay={0.1}>
          <div className="grid gap-4 md:grid-cols-3">
            {priorities.map((p) => (
              <PriorityCard key={p.name} priority={p} />
            ))}
          </div>
        </Section>

        {/* Energy Analysis */}
        <Section title="Energy Analysis" eyebrow="Bio-Signals" delay={0.15}>
          <AnalysisCard>
            <div className="flex flex-wrap items-center justify-around gap-6">
              {energyRings.map((r) => (
                <EnergyRing key={r.key} label={r.label} value={r.value} tone={r.tone} />
              ))}
            </div>
          </AnalysisCard>
        </Section>

        {/* Opportunities */}
        <Section title="Opportunity Scanner" eyebrow="Growth Vectors" delay={0.2}>
          <div className="grid gap-4 sm:grid-cols-2">
            {opportunities.map((o) => (
              <OpportunityCard key={o.title} {...o} />
            ))}
          </div>
        </Section>

        {/* Risks */}
        <Section title="Risk Detection" eyebrow="Interference" delay={0.25}>
          <div className="grid gap-3 sm:grid-cols-2">
            {risks.map((r) => (
              <RiskCard key={r.title} {...r} />
            ))}
          </div>
        </Section>

        {/* Momentum */}
        <Section title="Momentum Timeline" eyebrow="Projected Output" delay={0.3}>
          <AnalysisCard>
            <MomentumChart />
          </AnalysisCard>
        </Section>

        {/* Weekly Intelligence */}
        <Section title="Weekly Intelligence" eyebrow="Signal Summary" delay={0.35}>
          <AnalysisCard>
            <div className="grid gap-4 sm:grid-cols-3">
              {weeklyIntelligence.map((w) => (
                <div key={w.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {w.label}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-gradient">{w.value}</p>
                </div>
              ))}
            </div>
          </AnalysisCard>
        </Section>

        {/* Recommendations */}
        <Section title="CORE Recommendations" eyebrow="Suggested Moves" delay={0.4}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((r) => (
              <RecommendationCard key={r.title} {...r} />
            ))}
          </div>
        </Section>
      </div>

      <CoreCommandButton />
    </main>
  );
}
