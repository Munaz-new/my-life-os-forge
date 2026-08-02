import { useEffect, type ReactNode } from "react";
import { bootCore } from "@/lib/core-engine/hooks";

/** Boots the CORE intelligence layer on the client. Renders no UI. */
export function CoreProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    bootCore();
  }, []);

  return <>{children}</>;
}
