import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AmbientBackground } from "@/components/lifeos/AmbientBackground";
import { LogoMark } from "@/components/lifeos/LogoMark";
import { DecisionGraph } from "@/components/lifeos/decisions/DecisionGraph";
import { DecisionPipeline } from "@/components/lifeos/decisions/DecisionPipeline";
import { ReasoningCard } from "@/components/lifeos/decisions/ReasoningCard";
import { TradeOffCard } from "@/components/lifeos/decisions/TradeOffCard";
import { SimulationCard } from "@/components/lifeos/decisions/SimulationCard";
import { DecisionHistory } from "@/components/lifeos/decisions/DecisionHistory";
import { QuestionCard } from "@/components/lifeos/decisions/QuestionCard";
import { decisionGoal, options } from "@/lib/decisions-mock";
import { eventBus, useCoreModule } from "@/lib/core-engine";

export const Route = createFileRoute("/decisions")({
  head: () => ({
    meta: [
      { title: "Decision Engine — Understand Why CORE Recommends This" },
      {
        name: "description",
        content:
          "CORE Decision Engine — transparent reasoning behind every recommendation: context, evidence, trade-offs and simulated futures.",
      },
      { property: "og:title", content: "Decision Engine — Understand Why CORE Recommends This" },
      {
        property: "og:description",
        content:
          "See how CORE moves from your goal and constraints to a recommendation, with evidence, alternatives and long-range simulations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://my-life-os-forge.lovable.app/decisions" },
    ],
    links: [{ rel: "canonical", href: "https://my-life-os-forge.lovable.app/decisions" }],
  }),
  component: DecisionsPage,
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
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">{eyebrow}</p>
        )}
        <h2 className="mt-1 text-xl font-semibold sm:text-2xl">{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}

function DecisionsPage() {
  useCoreModule("core");
  const [selectedId, setSelectedId] = useState(options[0].id);
  const selected = options.find((o) => o.id === selectedId) ?? options[0];

  const select = (id: string) => {
    setSelectedId(id);
    const opt = options.find((o) => o.id === id);
    if (!opt) return;
    eventBus.emit({
      type: "RecommendationEvent",
      module: "core",
      tone: "cyan",
      label: `Decision path evaluated: ${opt.title}`,
      payload: {
        title: opt.title,
        reason: opt.summary,
        confidence: opt.outcomeScore / 100,
      },
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
            <p className="text-sm font-medium">Decision Engine</p>
          </div>
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <NavLink to="/core" label="◉ CORE" />
          <NavLink to="/missions" label="◆ Missions" />
          <NavLink to="/genome" label="❋ Genome" />
          <NavLink to="/memory" label="⬢ Memory" />
          <NavLink to="/evolution" label="◇ Evolution" />
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
            CORE Decision Engine
          </p>
          <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">
            <span className="text-gradient">Decision Engine</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Understand Why CORE Recommends This
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Goal · <span className="text-foreground/80">{decisionGoal.label}</span> ·{" "}
            {decisionGoal.horizon}
          </p>
        </motion.div>

        <div className="mt-8">
          <DecisionGraph selectedId={selectedId} />
        </div>

        <Section title="Decision Pipeline" eyebrow="Chain of thought" delay={0.15}>
          <DecisionPipeline />
        </Section>

        <Section title="Reasoning" eyebrow="Why this, why now" delay={0.2}>
          <ReasoningCard />
        </Section>

        <Section
          title="Alternative Decisions"
          eyebrow="Paths CORE weighed · select one to simulate"
          delay={0.25}
        >
          <div className="grid gap-4 lg:grid-cols-3">
            {options.map((o, i) => (
              <TradeOffCard
                key={o.id}
                option={o}
                index={i}
                selected={o.id === selectedId}
                onSelect={() => select(o.id)}
              />
            ))}
          </div>
        </Section>

        <Section title="Future Simulation" eyebrow="30 days · 90 days · 1 year" delay={0.3}>
          <SimulationCard option={selected} />
        </Section>

        <Section title="Decision Journal" eyebrow="What CORE advised before" delay={0.35}>
          <DecisionHistory />
        </Section>

        <Section title="Ask CORE" eyebrow="Conversational reasoning" delay={0.4}>
          <QuestionCard />
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
