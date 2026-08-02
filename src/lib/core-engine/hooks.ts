import { useCallback, useEffect, useSyncExternalStore } from "react";
import { attachCoreStateToBus, coreState, initialCoreState } from "./core-state";
import { eventBus, emptyHistory } from "./event-bus";
import { attachRegistryToBus, moduleRegistry } from "./module-registry";
import { seedEvents } from "./seed";
import type { CoreEventInput, ModuleId } from "./types";

let booted = false;
export function bootCore() {
  if (booted) return;
  booted = true;
  attachCoreStateToBus();
  attachRegistryToBus();
  eventBus.hydrate(seedEvents());
}

const serverState = initialCoreState();
const serverModules = moduleRegistry.list();

export function useCoreState() {
  return useSyncExternalStore(
    coreState.subscribe,
    coreState.get,
    () => serverState,
  );
}

export function useCoreEvents(limit?: number) {
  const events = useSyncExternalStore(
    eventBus.subscribe,
    eventBus.history,
    () => emptyHistory,
  );
  return typeof limit === "number" ? events.slice(0, limit) : events;
}

export function useModuleRegistry() {
  return useSyncExternalStore(
    moduleRegistry.subscribe,
    moduleRegistry.list,
    () => serverModules,
  );
}

export function useEmitCoreEvent() {
  return useCallback((input: CoreEventInput) => eventBus.emit(input), []);
}

/** Registers a module with CORE while the page is mounted. */
export function useCoreModule(id: ModuleId) {
  useEffect(() => {
    bootCore();
    moduleRegistry.register(id);
    return () => moduleRegistry.unregister(id);
  }, [id]);
}
