import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AmbientBackground } from "@/components/lifeos/AmbientBackground";
import { GlassCard } from "@/components/lifeos/GlassCard";
import { XPBar } from "@/components/lifeos/XPBar";
import { LogoMark } from "@/components/lifeos/LogoMark";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Dashboard — LifeOS" },
      { name: "description", content: "Your Life System at a glance." },
    ],
  }),
  component: Home,
});

const mockSkills = [
  { name: "Programming", value: 72, tone: "primary" },
  { name: "Discipline", value: 58, tone: "cyan" },
  { name: "Fitness", value: 41, tone: "violet" },
  { name: "Communication", value: 63, tone: "primary" },
  { name: "Reading", value: 36, tone: "cyan" },
  { name: "Leadership", value: 49, tone: "violet" },
];

const achievements = [
  { icon: "◆", label: "7-Day Streak" },
  { icon: "✦", label: "First Quest" },
  { icon: "◈", label: "Skill Awakened" },
  { icon: "❋", label: "Focus Master" },
];

function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden pb-24">
      <AmbientBackground />

      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <LogoMark size={38} />
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              LifeOS
            </p>
            <p className="text-sm font-medium">Core Dashboard</p>
          </div>
        </div>
        <div className="hidden items-center gap-4 text-xs text-muted-foreground sm:flex">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            Online
          </span>
          <span>v1.0</span>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <p className="text-sm text-muted-foreground">Welcome back,</p>
          <h1 className="mt-1 text-3xl font-semibold sm:text-4xl">
            <span className="text-gradient">Operator</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your system is calibrated. Today's window of growth is open.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/core"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-neon)] transition hover:brightness-110"
              style={{ background: "var(--gradient-hero)" }}
            >
              ◉ Open CORE
              <span aria-hidden>→</span>
            </Link>
            <Link
              to="/missions"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-foreground/90 transition hover:bg-white/10"
            >
              ◆ Mission Center
              <span aria-hidden>→</span>
            </Link>
            <Link
              to="/genome"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-foreground/90 transition hover:bg-white/10"
            >
              ❋ Evolution Genome
              <span aria-hidden>→</span>
            </Link>
            <Link
              to="/evolution"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-foreground/90 transition hover:bg-white/10"
            >
              ◈ Evolution Review
              <span aria-hidden>→</span>
            </Link>
            <Link
              to="/memory"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-foreground/90 transition hover:bg-white/10"
            >
              ⬢ CORE Memory
              <span aria-hidden>→</span>
            </Link>
            <Link
              to="/system"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-foreground/90 transition hover:bg-white/10"
            >
              ◎ Open System Window
              <span aria-hidden>→</span>
            </Link>
          </div>
        </motion.div>


        <div className="grid gap-5 lg:grid-cols-3">
          {/* Level + XP */}
          <GlassCard glow className="lg:col-span-2">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Current Level
                </p>
                <p className="mt-1 text-5xl font-bold">
                  <span className="text-gradient">17</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Rank
                </p>
                <p className="mt-1 text-lg font-semibold">Ascendant II</p>
              </div>
            </div>
            <div className="mt-6">
              <XPBar value={2340} max={3200} />
            </div>
          </GlassCard>

          {/* Streak */}
          <GlassCard>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Daily Streak
            </p>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-5xl font-bold text-gradient">12</span>
              <span className="text-sm text-muted-foreground">days</span>
            </div>
            <div className="mt-5 flex gap-1.5">
              {Array.from({ length: 7 }).map((_, i) => (
                <span
                  key={i}
                  className={
                    "h-8 flex-1 rounded-md " +
                    (i < 6
                      ? "[background:var(--gradient-hero)] shadow-[var(--glow-primary)]"
                      : "bg-white/10")
                  }
                />
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              One more session today keeps the flame alive.
            </p>
          </GlassCard>

          {/* Main Quest */}
          <GlassCard className="lg:col-span-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Today's Main Quest
                </p>
                <h3 className="mt-2 text-2xl font-semibold">
                  Deep Focus: 90-Minute Session
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Enter a single-task flow state. No context switching. No notifications.
                </p>
              </div>
              <span
                className="rounded-lg px-3 py-1 text-xs font-semibold text-primary-foreground"
                style={{ background: "var(--gradient-hero)" }}
              >
                +240 XP
              </span>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex gap-2 text-xs text-muted-foreground">
                <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1">
                  Focus
                </span>
                <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1">
                  Deep Work
                </span>
              </div>
              <button
                className="rounded-xl px-4 py-2 text-sm font-medium text-primary-foreground shadow-[var(--shadow-neon)] transition hover:brightness-110"
                style={{ background: "var(--gradient-hero)" }}
              >
                Begin Quest →
              </button>
            </div>
          </GlassCard>

          {/* Achievements */}
          <GlassCard>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Recent Achievements
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {achievements.map((a) => (
                <div
                  key={a.label}
                  className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-center"
                >
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-lg text-primary-foreground"
                    style={{ background: "var(--gradient-hero)" }}
                  >
                    {a.icon}
                  </span>
                  <span className="text-xs text-foreground/80">{a.label}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Skills */}
          <GlassCard className="lg:col-span-3">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Skill Overview
              </p>
              <span className="text-xs text-muted-foreground">6 tracked</span>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {mockSkills.map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{s.name}</span>
                    <span className="text-xs text-muted-foreground">
                      Lv {Math.floor(s.value / 10)}
                    </span>
                  </div>
                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${s.value}%` }}
                      transition={{ duration: 1.2, delay: 0.2 + i * 0.05 }}
                      className="h-full rounded-full"
                      style={{ background: "var(--gradient-hero)" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Quick Action FAB */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
        className="fixed bottom-8 right-8 flex h-14 w-14 items-center justify-center rounded-full text-2xl text-primary-foreground shadow-[var(--shadow-neon)] transition hover:scale-105"
        style={{ background: "var(--gradient-hero)" }}
        aria-label="Quick action"
      >
        +
      </motion.button>
    </main>
  );
}
