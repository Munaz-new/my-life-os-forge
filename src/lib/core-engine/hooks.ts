import { useCallback, useEffect, useState } from "react";
import { attachCoreStateToBus, coreState, initialCoreState } from "./core-state";
import { eventBus } from "./event-bus";
import { attachRegistryToBus, moduleRegistry } from "./module-registry";
import { seedEvents } from "./seed";
import type { CoreEvent, CoreEventInput, CoreState, ModuleId, ModuleRuntime } from "./types";

let booted = false;
export function bootCore() {
  if (booted) return;
  booted = true;
  attachCoreStateToBus();
  attachRegistryToBus();
  eventBus.hydrate(seedEvents());
}

export function useCoreState(): CoreState {
  const [state, setState] = useState<CoreState>(initialCoreState);
  useEffect(() => {
    bootCore();
    setState(coreState.get());
    return coreState.subscribe(() => setState(coreState.get()));
  }, []);
  return state;
}

export function useCoreEvents(limit?: number): CoreEvent[] {
  const [events, setEvents] = useState<CoreEvent[]>([]);
  useEffect(() => {
    bootCore();
    setEvents(eventBus.history());
    return eventBus.subscribe(() => setEvents(eventBus.history()));
  }, []);
  return typeof limit === "number" ? events.slice(0, limit) : events;
}

export function useModuleRegistry(): ModuleRuntime[] {
  const [modules, setModules] = useState<ModuleRuntime[]>(() => moduleRegistry.list());
  useEffect(() => {
    bootCore();
    setModules(moduleRegistry.list());
    return moduleRegistry.subscribe(() => setModules(moduleRegistry.list()));
  }, []);
  return modules;
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
