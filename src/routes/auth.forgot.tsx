import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { AmbientBackground } from "@/components/lifeos/AmbientBackground";
import { NeonButton } from "@/components/lifeos/NeonButton";

export const Route = createFileRoute("/auth/forgot")({
  head: () => ({
    meta: [
      { title: "Reset Password — LifeOS" },
      { name: "description", content: "Recover access to your Life System." },
    ],
  }),
  component: Forgot,
});

function Forgot() {
  const [sent, setSent] = useState(false);
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-10">
      <AmbientBackground />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass w-full max-w-md rounded-3xl p-8 sm:p-10"
      >
        <h1 className="text-2xl font-semibold">Recover your account</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter your email and we'll send you a reset link.
        </p>

        {sent ? (
          <div className="mt-8 rounded-2xl border border-primary/30 bg-primary/10 p-5 text-sm">
            <p className="font-medium text-foreground">Check your inbox</p>
            <p className="mt-1 text-muted-foreground">
              If an account exists for that email, a reset link is on its way.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              setSent(true);
            }}
            className="mt-8 space-y-4"
          >
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Email
              </span>
              <input
                required
                type="email"
                placeholder="you@lifeos.app"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-primary/60 focus:bg-white/10 focus:ring-2 focus:ring-primary/30"
              />
            </label>
            <NeonButton type="submit" size="lg" className="w-full">
              Send reset link
            </NeonButton>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link
            to="/auth"
            className="text-sm text-muted-foreground transition hover:text-foreground"
          >
            ← Back to sign in
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
