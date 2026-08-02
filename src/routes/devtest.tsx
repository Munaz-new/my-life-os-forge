import { createFileRoute } from "@tanstack/react-router";
import { useCoreEvents, useCoreModule, useCoreState, useModuleRegistry } from "@/lib/core-engine";

export const Route = createFileRoute("/devtest")({ component: T });

function T() {
  useCoreModule("core");
  const s = useCoreState();
  const e = useCoreEvents(5);
  const m = useModuleRegistry();
  return <div>{s.mood} {e.length} {m.length}</div>;
}
