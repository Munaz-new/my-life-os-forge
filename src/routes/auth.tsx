import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState, type FormEvent } from "react";
import { AmbientBackground } from "@/components/lifeos/AmbientBackground";
import { LogoMark } from "@/components/lifeos/LogoMark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const [busy, setBusy] = useState<"email" | "google" | null>(null);
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

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

  const signInWithGoogle = async () => {
    setBusy("google");
    setError(null);
    setNotice(null);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        setError("Sign-in could not be completed. Try again.");
        setBusy(null);
        return;
      }
      if (result.redirected) return;
      navigate({ to: "/home", replace: true });
    } catch {
      setError("Sign-in could not be completed. Try again.");
      setBusy(null);
    }
  };

  const handleEmailSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy("email");
    setError(null);
    setNotice(null);

    try {
      if (mode === "sign-up") {
        const { data, error: authError } = await supabase.auth.signUp({ email, password });
        if (authError) {
          setError("We couldn't create your account. Check your details and try again.");
        } else if (data.session) {
          navigate({ to: "/home", replace: true });
        } else {
          setNotice("Check your email for a confirmation link to finish creating your account.");
        }
      } else {
        const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
        if (authError) {
          setError("Email or password doesn't match. Try again.");
        } else if (data.session) {
          navigate({ to: "/home", replace: true });
        }
      }
    } catch {
      setError("We couldn't complete that request. Please try again.");
    } finally {
      setBusy(null);
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

        <div role="tablist" aria-label="Account access" className="mt-8 grid grid-cols-2 gap-1 rounded-lg bg-muted p-1">
          <Button
            type="button"
            role="tab"
            aria-selected={mode === "sign-in"}
            variant={mode === "sign-in" ? "secondary" : "ghost"}
            className="w-full"
            onClick={() => {
              setMode("sign-in");
              setError(null);
              setNotice(null);
            }}
          >
            Sign in
          </Button>
          <Button
            type="button"
            role="tab"
            aria-selected={mode === "sign-up"}
            variant={mode === "sign-up" ? "secondary" : "ghost"}
            className="w-full"
            onClick={() => {
              setMode("sign-up");
              setError(null);
              setNotice(null);
            }}
          >
            Create account
          </Button>
        </div>

        <form onSubmit={handleEmailSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              disabled={busy !== null}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              disabled={busy !== null}
            />
          </div>
          <Button type="submit" className="w-full" disabled={busy !== null}>
            {busy === "email" ? "Please wait…" : mode === "sign-in" ? "Sign in with email" : "Create account"}
          </Button>
        </form>

        <div className="mt-6 flex items-center gap-3" aria-hidden="true">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">or continue with</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={signInWithGoogle}
          disabled={busy !== null}
          className="mt-5 h-11 w-full border-[#747775] bg-white px-3 text-[#1F1F1F] shadow-none hover:bg-white/90 hover:text-[#1F1F1F]"
        >
          <GoogleIcon />
          {busy === "google" ? "Connecting…" : "Continue with Google"}
        </Button>

        {error && <p role="alert" className="mt-4 text-center text-xs text-destructive">{error}</p>}
        {notice && <p role="status" className="mt-4 text-center text-xs text-muted-foreground">{notice}</p>}

        <p className="mt-6 text-center text-xs text-muted-foreground">
          CORE stores your profile, goals and progress securely — visible only to you.
        </p>
      </motion.div>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z" />
      <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z" />
    </svg>
  );
}
