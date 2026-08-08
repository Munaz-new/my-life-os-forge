import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AmbientBackground } from "@/components/lifeos/AmbientBackground";
import { LogoMark } from "@/components/lifeos/LogoMark";
import { lovable } from "@/integrations/lovable/index";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign In — LifeOS" },
      { name: "description", content: "Access your Life System." },
      { property: "og:title", content: "Sign In — LifeOS" },
      { property: "og:description", content: "Access your Life System." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Auth,
});

function Auth() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active && data.session) navigate({ to: "/home", replace: true });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) navigate({ to: "/home", replace: true });
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  const signIn = async () => {
    setBusy(true);
    setError(null);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        setError("Sign-in could not be completed. Try again.");
        setBusy(false);
        return;
      }
      if (result.redirected) return;
      navigate({ to: "/home", replace: true });
    } catch {
      setError("Sign-in could not be completed. Try again.");
      setBusy(false);
    }
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
          <h1 className="mt-6 text-2xl font-semibold">Enter your Life System</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            One identity. Your entire evolution, remembered.
          </p>
        </div>

        <button
          onClick={signIn}
          disabled={busy}
          className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-medium transition hover:bg-white/10 disabled:opacity-60"
        >
          <GoogleIcon />
          {busy ? "Connecting…" : "Continue with Google"}
        </button>

        {error && <p className="mt-4 text-center text-xs text-destructive">{error}</p>}

        <p className="mt-6 text-center text-xs text-muted-foreground">
          CORE stores your profile, goals and progress securely — visible only to you.
        </p>
      </motion.div>
    </main>
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
