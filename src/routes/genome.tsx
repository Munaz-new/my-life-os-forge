import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AmbientBackground } from "@/components/lifeos/AmbientBackground";
import { LogoMark } from "@/components/lifeos/LogoMark";
import { AnalysisCard } from "@/components/lifeos/core/AnalysisCard";
import { GenomeCanvas } from "@/components/lifeos/genome/GenomeCanvas";
import { SkillCard } from "@/components/lifeos/genome/SkillCard";
import { ForecastCard } from "@/components/lifeos/genome/ForecastCard";
import { Heatmap } from "@/components/lifeos/genome/Heatmap";
import { EvolutionTimeline } from "@/components/lifeos/genome/EvolutionTimeline";

export const Route = createFileRoute("/genome")({
  head: () => ({
    meta: [
      { title: "Evolution Genome — LifeOS" },
      {
        name: "description",
        content:
          "Your Living Intelligence Map — an animated neural network of your evolving capabilities.",
      },
      { property: "og:title", content: "Evolution Genome — LifeOS" },
      {
        property: "og:description",
        content:
          "A living intelligence map — the digital DNA of your personal evolution.",
      },
    ],
  }),
  component: GenomePage,
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

function GenomePage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const sync = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <main className="relative min-h-screen overflow-hidden pb-32">
      <AmbientBackground />

      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link to="/home" className="flex items-center gap-3">
          <LogoMark size={38} />
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              LifeOS
            </p>
            <p className="text-sm font-medium">Evolution Genome</p>
          </div>
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/core"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-foreground/80 transition hover:bg-white/10"
          >
            ◉ CORE
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
          className="flex flex-col items-center text-center"
        >
          <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
            Living Intelligence Map
          </p>
          <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">
            <span className="text-gradient">Evolution Genome</span>
          </h1>
          <p className="mt-3 max-w-xl text-sm text-foreground/80">
            The digital DNA of your evolution. Every skill, every connection,
            every pulse of growth — alive and adapting.
          </p>
          <div className="mt-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.3em]">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-[color:var(--cyan-accent)]"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              style={{ boxShadow: "var(--glow-cyan)" }}
            />
            Genome Online · Synchronized {sync}
          </div>
        </motion.div>

        {/* Canvas + Skill detail */}
        <Section title="Genome" eyebrow="Neural Growth Network" delay={0.05}>
          <AnalysisCard>
            <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
              <div className="relative">
                <GenomeCanvas
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                />
                <p className="mt-2 text-center text-[11px] text-muted-foreground">
                  Tap a node to expand · tap empty space to return to core
                </p>
              </div>
              <SkillCard
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            </div>
          </AnalysisCard>
        </Section>

        {/* Forecast */}
        <Section title="Evolution Forecast" eyebrow="Predicted Vectors" delay={0.1}>
          <ForecastCard />
        </Section>

        {/* Heatmap */}
        <Section title="Growth Heatmap" eyebrow="Radial Signal" delay={0.15}>
          <AnalysisCard>
            <Heatmap />
          </AnalysisCard>
        </Section>

        {/* Timeline */}
        <Section title="Evolution Timeline" eyebrow="Monthly Progression" delay={0.2}>
          <AnalysisCard>
            <EvolutionTimeline />
          </AnalysisCard>
        </Section>
      </div>
    </main>
  );
}
