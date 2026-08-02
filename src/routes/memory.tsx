import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AmbientBackground } from "@/components/lifeos/AmbientBackground";
import { LogoMark } from "@/components/lifeos/LogoMark";
import { MemoryParticles } from "@/components/lifeos/memory/MemoryParticles";
import { MemorySearch } from "@/components/lifeos/memory/MemorySearch";
import { PinnedMemory } from "@/components/lifeos/memory/PinnedMemory";
import { MemoryCard } from "@/components/lifeos/memory/MemoryCard";
import { MemoryTimeline } from "@/components/lifeos/memory/MemoryTimeline";
import { MemoryConnection } from "@/components/lifeos/memory/MemoryConnection";
import { MemoryGraph } from "@/components/lifeos/memory/MemoryGraph";
import { ForgottenMemories } from "@/components/lifeos/memory/ForgottenMemories";
import { MemoryDetail } from "@/components/lifeos/memory/MemoryDetail";
import { memoryEngine, useCoreModule } from "@/lib/core-engine";
import {
  activeMemories,
  memoryById,
  memoryStats,
  pinnedMemories,
} from "@/lib/memory-mock";

export const Route = createFileRoute("/memory")({
  head: () => ({
    meta: [
      { title: "CORE Memory — Long-Term Intelligence" },
      {
        name: "description",
        content:
          "The CORE Memory Engine — a living vault of goals, projects, moments, and connections that shape your evolution.",
      },
    ],
  }),
  component: MemoryPage,
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

function MemoryPage() {
  useCoreModule("memory");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const openMemory = (id: string | null) => {
    setOpenId(id);
    if (id) memoryEngine.record(memoryById(id)?.title ?? id, "recalled");
  };

  const filtered = useMemo(
    () =>
      activeCategory
        ? activeMemories.filter((m) => m.category === activeCategory)
        : activeMemories,
    [activeCategory],
  );

  const openMemory = openId ? memoryById[openId] ?? null : null;

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
            <p className="text-sm font-medium">CORE Memory</p>
          </div>
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/evolution"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-foreground/80 transition hover:bg-white/10"
          >
            ◈ Evolution
          </Link>
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
            to="/genome"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-foreground/80 transition hover:bg-white/10"
          >
            ❋ Genome
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
          <MemoryParticles />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative pt-2 text-center"
          >
            <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
              CORE Memory Engine
            </p>
            <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">
              <span className="text-gradient">CORE Memory</span>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">Long-Term Intelligence</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            <HeroStat label="Memories" value={memoryStats.total} />
            <HeroStat label="Pinned" value={memoryStats.pinned} tone="cyan" />
            <HeroStat label="Fading" value={memoryStats.fading} tone="violet" />
            <HeroStat
              label="Avg Confidence"
              value={`${memoryStats.avgConfidence}%`}
            />
          </motion.div>
        </div>

        <Section title="Search the Vault" eyebrow="Query" delay={0.15}>
          <MemorySearch
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </Section>

        <Section title="Pinned Memories" eyebrow="North Stars" delay={0.2}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pinnedMemories.map((m, i) => (
              <PinnedMemory
                key={m.id}
                memory={m}
                index={i}
                onOpen={() => setOpenId(m.id)}
              />
            ))}
          </div>
        </Section>

        <Section title="Vault Constellation" eyebrow="Graph" delay={0.25}>
          <MemoryGraph onOpen={setOpenId} />
        </Section>

        <Section title="Featured Connection" eyebrow="Trace" delay={0.3}>
          <MemoryConnection />
        </Section>

        <Section
          title={activeCategory ? "Filtered Memories" : "Recent Memories"}
          eyebrow="Browse"
          delay={0.35}
        >
          {filtered.length === 0 ? (
            <div className="glass rounded-2xl p-8 text-center text-sm text-muted-foreground">
              No memories in this category yet.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((m, i) => (
                <MemoryCard
                  key={m.id}
                  memory={m}
                  index={i}
                  onOpen={() => setOpenId(m.id)}
                />
              ))}
            </div>
          )}
        </Section>

        <Section title="Memory Timeline" eyebrow="Chronology" delay={0.4}>
          <MemoryTimeline onOpen={setOpenId} />
        </Section>

        <Section title="Forgotten Memories" eyebrow="Fading" delay={0.45}>
          <ForgottenMemories onOpen={setOpenId} />
        </Section>
      </div>

      <MemoryDetail
        memory={openMemory}
        onClose={() => setOpenId(null)}
        onOpen={setOpenId}
      />
    </main>
  );
}

function HeroStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number | string;
  tone?: "cyan" | "violet";
}) {
  const color =
    tone === "cyan"
      ? "var(--cyan-accent)"
      : tone === "violet"
        ? "var(--violet-accent)"
        : "var(--primary)";
  return (
    <div
      className="glass rounded-2xl p-4 text-center"
      style={{ boxShadow: `0 0 18px ${color}` }}
    >
      <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold" style={{ color }}>
        {value}
      </p>
    </div>
  );
}
