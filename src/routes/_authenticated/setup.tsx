import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AmbientBackground } from "@/components/lifeos/AmbientBackground";
import { NeonButton } from "@/components/lifeos/NeonButton";
import { SelectableChip } from "@/components/lifeos/SelectableChip";
import { LogoMark } from "@/components/lifeos/LogoMark";

export const Route = createFileRoute("/_authenticated/setup")({
  head: () => ({
    meta: [
      { title: "Configure Your Life System — LifeOS" },
      { name: "description", content: "Calibrate LifeOS to your ambitions." },
    ],
  }),
  component: Setup,
});

const goals = [
  "AI Engineer", "Software Developer", "Entrepreneur", "Designer",
  "Doctor", "Student", "Athlete", "Creator",
];
const skills = [
  "Programming", "Communication", "Fitness", "Reading",
  "Leadership", "Discipline", "Money", "Languages",
];
const hours = ["30 minutes", "1 hour", "2 hours", "3+ hours"];

function Setup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<string>("");
  const [customGoal, setCustomGoal] = useState<string>("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [time, setTime] = useState<string>("");

  const totalSteps = 4;

  useEffect(() => {
    if (step === 3) {
      const t = setTimeout(() => navigate({ to: "/home" }), 2600);
      return () => clearTimeout(t);
    }
  }, [step, navigate]);

  const canNext =
    (step === 0 && (goal || customGoal.trim())) ||
    (step === 1 && selectedSkills.length > 0) ||
    (step === 2 && time);

  const toggleSkill = (s: string) =>
    setSelectedSkills((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden px-6 py-8">
      <AmbientBackground />

      {step < 3 && (
        <div className="mx-auto w-full max-w-2xl">
          <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-wider text-muted-foreground">
            <span>Setup</span>
            <span>Step {step + 1} of 3</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "var(--gradient-hero)" }}
              animate={{ width: `${((step + 1) / 3) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      )}

      <section className="flex flex-1 items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-2xl"
          >
            {step === 0 && (
              <div className="glass rounded-3xl p-8 sm:p-10">
                <h2 className="text-3xl font-semibold sm:text-4xl">
                  What do you want to <span className="text-gradient">become</span>?
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Choose a path — or forge your own.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {goals.map((g) => (
                    <SelectableChip
                      key={g}
                      label={g}
                      selected={goal === g}
                      onClick={() => {
                        setGoal(g);
                        setCustomGoal("");
                      }}
                    />
                  ))}
                </div>
                <div className="mt-6">
                  <input
                    value={customGoal}
                    onChange={(e) => {
                      setCustomGoal(e.target.value);
                      setGoal("");
                    }}
                    placeholder="Or type your own goal…"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm outline-none transition focus:border-primary/60 focus:bg-white/10 focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="glass rounded-3xl p-8 sm:p-10">
                <h2 className="text-3xl font-semibold sm:text-4xl">
                  Which skills would you like to <span className="text-gradient">improve</span>?
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Pick as many as you'd like. Your skill graph will grow around them.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {skills.map((s) => (
                    <SelectableChip
                      key={s}
                      label={s}
                      selected={selectedSkills.includes(s)}
                      onClick={() => toggleSkill(s)}
                    />
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="glass rounded-3xl p-8 sm:p-10">
                <h2 className="text-3xl font-semibold sm:text-4xl">
                  How many hours can you <span className="text-gradient">invest daily</span>?
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  We'll shape your quests to fit your rhythm.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {hours.map((h) => (
                    <button
                      key={h}
                      onClick={() => setTime(h)}
                      className={
                        "rounded-2xl border p-5 text-sm font-medium transition-all duration-200 active:scale-[0.98] " +
                        (time === h
                          ? "border-transparent text-primary-foreground shadow-[var(--shadow-neon)] [background:var(--gradient-hero)]"
                          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10")
                      }
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && <Generating />}
          </motion.div>
        </AnimatePresence>
      </section>

      {step < 3 && (
        <footer className="mx-auto flex w-full max-w-2xl items-center justify-between gap-3 pt-6">
          <NeonButton
            variant="ghost"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            Back
          </NeonButton>
          <NeonButton
            size="lg"
            disabled={!canNext}
            onClick={() => setStep((s) => s + 1)}
            className="min-w-[160px]"
          >
            {step === 2 ? "Generate System" : "Continue"}
          </NeonButton>
        </footer>
      )}
    </main>
  );
}

function Generating() {
  return (
    <div className="flex flex-col items-center text-center">
      <LogoMark size={112} />
      <h2 className="mt-10 text-2xl font-semibold sm:text-3xl">
        Generating your <span className="text-gradient">Life System</span>…
      </h2>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        Calibrating your neural profile, quest engine, and skill graph.
      </p>
      <div className="mt-10 w-full max-w-xs">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
          <motion.div
            className="h-full w-1/3 rounded-full"
            style={{ background: "var(--gradient-hero)" }}
            animate={{ x: ["-100%", "300%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}
