import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { AmbientBackground } from "@/components/lifeos/AmbientBackground";
import { LogoMark } from "@/components/lifeos/LogoMark";

export const Route = createFileRoute("/")({
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate({ to: "/onboarding" }), 2800);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      <AmbientBackground />
      <div className="flex flex-col items-center text-center">
        <LogoMark size={128} />
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-10 text-5xl font-bold tracking-tight sm:text-6xl"
        >
          <span className="text-gradient">LifeOS</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mt-4 max-w-sm text-sm text-muted-foreground sm:text-base"
        >
          Become who you're meant to become.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="mt-12 flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-muted-foreground"
        >
          <span className="h-1 w-1 animate-pulse rounded-full bg-primary" />
          Initializing system
        </motion.div>
      </div>
    </main>
  );
}
