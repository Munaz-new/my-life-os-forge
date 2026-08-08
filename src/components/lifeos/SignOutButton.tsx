import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/** Signs the operator out and clears cached personal data. */
export function SignOutButton({ className = "" }: { className?: string }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  return (
    <button
      onClick={signOut}
      className={
        "text-xs text-muted-foreground transition hover:text-foreground " + className
      }
    >
      Sign out
    </button>
  );
}
