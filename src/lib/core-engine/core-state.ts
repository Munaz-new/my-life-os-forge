import { eventBus } from "./event-bus";
import type { CoreEvent, CoreState } from "./types";

const clamp = (n: number, min = 0, max = 100) => Math.min(max, Math.max(min, n));

export function initialCoreState(): CoreState {
  return {
    currentFocus: "Deep Work — Programming",
    currentGoal: "Ship the Evolution Engine",
    currentMission: "90-minute focused coding block",
    learningVelocity: 74,
    growthMomentum: 68,
    energy: 62,
    recovery: 55,
    mood: "Driven",
    consistency: 81,
    lastUpdated: 0,
  };
}

let state: CoreState = initialCoreState();
const listeners = new Set<() => void>();

function set(patch: Partial<CoreState>) {
  state = { ...state, ...patch, lastUpdated: Date.now() };
  listeners.forEach((l) => l());
}

export function reduceCoreState(current: CoreState, event: CoreEvent): Partial<CoreState> {
  switch (event.type) {
    case "MissionEvent": {
      if (event.payload.action === "completed") {
        return {
          growthMomentum: clamp(current.growthMomentum + 3),
          consistency: clamp(current.consistency + 1),
          energy: clamp(current.energy - 4),
        };
      }
      if (event.payload.action === "accepted" || event.payload.action === "generated") {
        return { currentMission: event.payload.title };
      }
      if (event.payload.action === "regenerated") {
        return { currentMission: event.payload.title };
      }
      return { consistency: clamp(current.consistency - 2) };
    }
    case "SkillEvent":
      return {
        learningVelocity: clamp(current.learningVelocity + event.payload.delta / 2),
        currentFocus: event.payload.skill,
      };
    case "MemoryEvent":
      return { growthMomentum: clamp(current.growthMomentum + 0.5) };
    case "GrowthEvent":
      return { growthMomentum: clamp(current.growthMomentum + event.payload.delta) };
    case "HealthEvent": {
      const { metric, value } = event.payload;
      if (metric === "energy") return { energy: clamp(value) };
      if (metric === "recovery") return { recovery: clamp(value) };
      if (metric === "consistency") return { consistency: clamp(value) };
      return {};
    }
    case "RecommendationEvent":
      return { currentFocus: event.payload.title };
    default:
      return {};
  }
}

export const coreState = {
  get(): CoreState {
    return state;
  },
  set,
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  reset() {
    state = initialCoreState();
    listeners.forEach((l) => l());
  },
};

let attached = false;
/** Wire the bus into CORE state exactly once, on the client. */
export function attachCoreStateToBus() {
  if (attached) return;
  attached = true;
  eventBus.on((event) => {
    const patch = reduceCoreState(state, event);
    if (Object.keys(patch).length) set(patch);
  });
}
