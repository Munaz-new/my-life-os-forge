import { eventBus } from "./event-bus";
import type { ModuleDescriptor, ModuleId, ModuleRuntime } from "./types";

export const MODULES: ModuleDescriptor[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    route: "/home",
    glyph: "▣",
    emits: ["RecommendationEvent"],
  },
  {
    id: "missions",
    label: "Mission Center",
    route: "/missions",
    glyph: "◆",
    emits: ["MissionEvent", "GrowthEvent"],
  },
  {
    id: "system",
    label: "System",
    route: "/system",
    glyph: "◈",
    emits: ["HealthEvent"],
  },
  {
    id: "genome",
    label: "Evolution Genome",
    route: "/genome",
    glyph: "❋",
    emits: ["SkillEvent"],
  },
  {
    id: "memory",
    label: "Memory",
    route: "/memory",
    glyph: "⬢",
    emits: ["MemoryEvent"],
  },
  {
    id: "evolution",
    label: "Evolution Review",
    route: "/evolution",
    glyph: "◇",
    emits: ["GrowthEvent"],
  },
  {
    id: "core",
    label: "CORE",
    route: "/core",
    glyph: "◉",
    emits: ["RecommendationEvent"],
  },
];

function baseRuntime(): Record<ModuleId, ModuleRuntime> {
  return MODULES.reduce(
    (acc, m) => {
      acc[m.id] = { ...m, status: "idle", lastEventAt: null, eventCount: 0 };
      return acc;
    },
    {} as Record<ModuleId, ModuleRuntime>,
  );
}

let runtime = baseRuntime();
let snapshot: ModuleRuntime[] = MODULES.map((m) => runtime[m.id]);
const listeners = new Set<() => void>();

function emitChange() {
  runtime = { ...runtime };
  snapshot = MODULES.map((m) => runtime[m.id]);
  listeners.forEach((l) => l());
}

export const moduleRegistry = {
  list(): ModuleRuntime[] {
    return snapshot;
  },
  get(id: ModuleId) {
    return runtime[id];
  },
  register(id: ModuleId) {
    const mod = runtime[id];
    if (!mod || mod.status === "online") return;
    runtime[id] = { ...mod, status: "online" };
    emitChange();
  },
  unregister(id: ModuleId) {
    const mod = runtime[id];
    if (!mod || mod.status === "idle") return;
    runtime[id] = { ...mod, status: "idle" };
    emitChange();
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};

let attached = false;
export function attachRegistryToBus() {
  if (attached) return;
  attached = true;
  eventBus.on((event) => {
    const mod = runtime[event.module];
    if (!mod) return;
    runtime[event.module] = {
      ...mod,
      status: "online",
      lastEventAt: event.at,
      eventCount: mod.eventCount + 1,
    };
    emitChange();
  });
}
