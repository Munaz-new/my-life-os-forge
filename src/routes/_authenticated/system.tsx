import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AmbientBackground } from "@/components/lifeos/AmbientBackground";
import { LogoMark } from "@/components/lifeos/LogoMark";
import { OperatorCard } from "@/components/lifeos/system/OperatorCard";
import { AttributeCard } from "@/components/lifeos/system/AttributeCard";
import { StatusBadge } from "@/components/lifeos/system/StatusBadge";
import { BuffCard } from "@/components/lifeos/system/BuffCard";
import { DebuffCard } from "@/components/lifeos/system/DebuffCard";
import { MilestoneCard } from "@/components/lifeos/system/MilestoneCard";
import { LifeDomainCard } from "@/components/lifeos/system/LifeDomainCard";
import { ProgressRing } from "@/components/lifeos/system/ProgressRing";
import { FloatingStatusPanel } from "@/components/lifeos/system/FloatingStatusPanel";
import { useCountUp } from "@/hooks/use-count-up";
import { eventBus, useCoreModule } from "@/lib/core-engine";
import {
  attributes,
  buffs,
  debuffs,
  domains,
  milestones,
  operator,
  records,
  statuses,
} from "@/lib/system-mock";

export const Route = createFileRoute("/_authenticated/system")({
  head: () => ({
    meta: [
      { title: "System — LifeOS" },
      {
        name: "description",
        content:
          "The Core System Window: your operator profile, attributes, buffs, life domains, and milestones.",
      },
    ],
  }),
  component: SystemPage,
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
      className="mt-10"
    >
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          {eyebrow && (
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">{eyebrow}</p>
          )}
          <h2 className="mt-1 text-xl font-semibold sm:text-2xl">{title}</h2>
        </div>
        {right}
      </div>
      {children}
    </motion.section>
  );
}

function SystemPage() {
  useCoreModule("system");
  useEffect(() => {
    eventBus.emit({
      type: "HealthEvent",
      module: "system",
      tone: "cyan",
      label: "Vitals snapshot synced",
      payload: { metric: "recovery", value: 58, delta: 3 },
    });
  }, []);
  const overallPct = Math.round((operator.xpInLevel / operator.xpToNext) * 100);
  const overallAnimated = useCountUp(overallPct, 1600);
  const lifetime = useCountUp(operator.totalXp, 1600);

  return (
    <main className="relative min-h-screen overflow-hidden pb-32">
      <AmbientBackground />

      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link to="/home" className="flex items-center gap-3">
          <LogoMark size={38} />
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">LifeOS</p>
            <p className="text-sm font-medium">System Window</p>
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
            to="/core"
            className="rounded-xl px-4 py-2 text-xs font-semibold text-primary-foreground shadow-[var(--shadow-neon)] transition hover:brightness-110"
            style={{ background: "var(--gradient-hero)" }}
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
            to="/future"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-foreground/80 transition hover:bg-white/10"
          >
            ◎ Future
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
        {/* 1. Operator */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <OperatorCard />
        </motion.div>

        {/* 3. Overall Progress + 4. Current Status */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Section title="Overall Progress" eyebrow="Trajectory" delay={0.05}>
            <div className="glass flex flex-col items-center gap-6 rounded-2xl p-6 sm:flex-row sm:items-center sm:gap-8">
              <ProgressRing value={overallPct} size={180} stroke={12}>
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Growth</p>
                  <p className="text-3xl font-bold text-gradient">{Math.round(overallAnimated)}%</p>
                </div>
              </ProgressRing>
              <div className="flex-1 space-y-3 text-sm">
                <MetaRow label="Current Level" value={`Lv ${operator.level}`} accent />
                <MetaRow label="Next Level XP" value={`${operator.xpInLevel.toLocaleString()} / ${operator.xpToNext.toLocaleString()}`} />
                <MetaRow label="Lifetime XP" value={Math.round(lifetime).toLocaleString()} />
                <MetaRow label="Current Rank" value={operator.rank} />
              </div>
            </div>
          </Section>

          <div className="lg:col-span-1">
            <Section title="Current Status" eyebrow="Live State" delay={0.1}>
              <div className="glass flex flex-wrap gap-2 rounded-2xl p-5">
                {statuses.map((s) => (
                  <StatusBadge key={s} label={s} />
                ))}
              </div>
            </Section>
          </div>
        </div>

        {/* 2. Core Attributes */}
        <Section title="Core Attributes" eyebrow="Operator Matrix" delay={0.15}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {attributes.map(({ key, ...a }) => (
              <AttributeCard key={key} {...a} />
            ))}
          </div>
        </Section>

        {/* 5 + 6. Buffs / Debuffs */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Section title="Active Buffs" eyebrow="Amplifiers" delay={0.2}>
            <div className="space-y-2.5">
              {buffs.map((b) => (
                <BuffCard key={b.name} {...b} />
              ))}
            </div>
          </Section>
          <Section title="Current Debuffs" eyebrow="Interference" delay={0.25}>
            <div className="space-y-2.5">
              {debuffs.map((d) => (
                <DebuffCard key={d.name} {...d} />
              ))}
            </div>
          </Section>
        </div>

        {/* 7. Personal Records */}
        <Section title="Personal Records" eyebrow="Peak Signals" delay={0.3}>
          <div className="glass grid grid-cols-2 gap-4 rounded-2xl p-6 sm:grid-cols-3">
            {records.map((r) => (
              <div key={r.label}>
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{r.label}</p>
                <p className="mt-1 text-xl font-semibold text-gradient">{r.value}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* 8. Life Domains */}
        <Section title="Life Domains" eyebrow="Growth Vectors" delay={0.35}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {domains.map(({ key, ...d }) => (
              <LifeDomainCard key={key} {...d} />
            ))}
          </div>
        </Section>

        {/* 9. Milestones */}
        <Section title="Recent Milestones" eyebrow="Timeline" delay={0.4}>
          <div className="glass rounded-2xl p-6">
            {milestones.map((m, i) => (
              <MilestoneCard key={m.title} {...m} last={i === milestones.length - 1} />
            ))}
          </div>
        </Section>
      </div>

      <FloatingStatusPanel />
    </main>
  );
}

function MetaRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0 last:pb-0">
      <span className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <span className={accent ? "text-sm font-semibold text-gradient" : "text-sm font-medium text-foreground"}>
        {value}
      </span>
    </div>
  );
}
