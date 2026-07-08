import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { AmbientBackground } from "@/components/lifeos/AmbientBackground";
import { NeonButton } from "@/components/lifeos/NeonButton";
import { StepDots } from "@/components/lifeos/StepDots";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Welcome — LifeOS" },
      { name: "description", content: "Discover how LifeOS turns your life into a measurable journey." },
    ],
  }),
  component: Onboarding,
});

const slides = [
  {
    icon: "◈",
    title: "Your life becomes measurable.",
    body: "Every action, every effort, every win — tracked, quantified, and visualized in real time.",
  },
  {
    icon: "◆",
    title: "Complete real-world quests.",
    body: "Daily missions crafted for your goals turn ordinary days into meaningful progress.",
  },
  {
    icon: "✦",
    title: "Grow your real skills.",
    body: "Watch discipline, focus, and mastery compound as your skill graph evolves with you.",
  },
  {
    icon: "❋",
    title: "An AI mentor evolves with you.",
    body: "A companion that adapts to your journey — challenging you, guiding you, becoming yours.",
  },
];

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const isLast = step === slides.length - 1;
  const slide = slides[step];

  const next = () => (isLast ? navigate({ to: "/auth" }) : setStep((s) => s + 1));
  const skip = () => navigate({ to: "/auth" });

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden">
      <AmbientBackground />

      <header className="flex items-center justify-between px-6 py-6">
        <span className="text-sm font-semibold tracking-wider text-gradient">LifeOS</span>
        <button
          onClick={skip}
          className="text-sm text-muted-foreground transition hover:text-foreground"
        >
          Skip
        </button>
      </header>

      <section className="flex flex-1 items-center justify-center px-6">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="glass rounded-3xl p-10 text-center"
            >
              <div
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl text-3xl text-primary-foreground shadow-[var(--shadow-neon)]"
                style={{ background: "var(--gradient-hero)" }}
              >
                {slide.icon}
              </div>
              <h2 className="mt-8 text-3xl font-semibold leading-tight sm:text-4xl">
                {slide.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {slide.body}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <footer className="flex flex-col items-center gap-6 px-6 pb-10">
        <StepDots total={slides.length} active={step} />
        <div className="flex w-full max-w-lg items-center justify-between gap-3">
          <NeonButton
            variant="ghost"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            Back
          </NeonButton>
          <NeonButton onClick={next} size="lg" className="min-w-[160px]">
            {isLast ? "Get Started" : "Next"}
          </NeonButton>
        </div>
      </footer>
    </main>
  );
}
