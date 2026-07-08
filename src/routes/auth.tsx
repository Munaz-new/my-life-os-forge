import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { AmbientBackground } from "@/components/lifeos/AmbientBackground";
import { NeonButton } from "@/components/lifeos/NeonButton";
import { LogoMark } from "@/components/lifeos/LogoMark";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign In — LifeOS" },
      { name: "description", content: "Access your Life System." },
    ],
  }),
  component: Auth,
});

function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  const handle = (e: FormEvent) => {
    e.preventDefault();
    navigate({ to: "/setup" });
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-10">
      <AmbientBackground />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass w-full max-w-md rounded-3xl p-8 sm:p-10"
      >
        <div className="flex flex-col items-center text-center">
          <LogoMark size={64} />
          <h1 className="mt-6 text-2xl font-semibold">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "signin"
              ? "Continue your journey."
              : "Begin building your Life System."}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-1 rounded-xl bg-white/5 p-1 ring-1 ring-white/10">
          {(["signin", "signup"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                "rounded-lg py-2 text-sm font-medium transition",
                mode === m
                  ? "text-primary-foreground shadow-[var(--shadow-neon)] [background:var(--gradient-hero)]"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {m === "signin" ? "Sign In" : "Create Account"}
            </button>
          ))}
        </div>

        <form onSubmit={handle} className="mt-6 space-y-4">
          {mode === "signup" && (
            <Field label="Name" type="text" placeholder="Your name" />
          )}
          <Field label="Email" type="email" placeholder="you@lifeos.app" />
          <Field label="Password" type="password" placeholder="••••••••" />

          {mode === "signin" && (
            <div className="flex justify-end">
              <Link
                to="/auth/forgot"
                className="text-xs text-muted-foreground transition hover:text-foreground"
              >
                Forgot password?
              </Link>
            </div>
          )}

          <NeonButton type="submit" size="lg" className="w-full">
            {mode === "signin" ? "Sign In" : "Create Account"}
          </NeonButton>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-white/10" />
          or continue with
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <button
          onClick={() => navigate({ to: "/setup" })}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-medium transition hover:bg-white/10"
        >
          <GoogleIcon />
          Continue with Google
        </button>
      </motion.div>
    </main>
  );
}

function Field({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <input
        required
        {...props}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition focus:border-primary/60 focus:bg-white/10 focus:ring-2 focus:ring-primary/30"
      />
    </label>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.8-6.8C35.5 2.5 30 0 24 0 14.6 0 6.5 5.4 2.5 13.3l7.9 6.1C12.4 13.3 17.7 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.2-.4-4.7H24v9h12.7c-.6 3-2.3 5.6-4.9 7.3l7.7 6c4.5-4.1 7-10.3 7-17.6z" />
      <path fill="#FBBC05" d="M10.4 28.6a14 14 0 0 1 0-9.2l-7.9-6.1a24 24 0 0 0 0 21.4l7.9-6.1z" />
      <path fill="#34A853" d="M24 48c6 0 11.1-2 14.8-5.4l-7.7-6c-2.1 1.4-4.8 2.3-7.1 2.3-6.3 0-11.6-3.8-13.6-9.3l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
    </svg>
  );
}
