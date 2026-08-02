export type Tone = "primary" | "cyan" | "violet" | "destructive" | "warning";

export type ModuleId =
  | "dashboard"
  | "missions"
  | "system"
  | "genome"
  | "memory"
  | "evolution"
  | "core";

export type CoreEventType =
  | "MissionEvent"
  | "SkillEvent"
  | "MemoryEvent"
  | "GrowthEvent"
  | "HealthEvent"
  | "RecommendationEvent";

export interface BaseCoreEvent<T extends CoreEventType, P> {
  id: string;
  type: T;
  module: ModuleId;
  label: string;
  at: number;
  tone: Tone;
  payload: P;
}

export type MissionEvent = BaseCoreEvent<
  "MissionEvent",
  {
    action: "generated" | "accepted" | "completed" | "skipped" | "regenerated";
    missionId: string;
    title: string;
    xp?: number;
  }
>;

export type SkillEvent = BaseCoreEvent<
  "SkillEvent",
  { skillId: string; skill: string; delta: number; level?: number }
>;

export type MemoryEvent = BaseCoreEvent<
  "MemoryEvent",
  { memoryId: string; title: string; action: "added" | "updated" | "pinned" | "recalled" }
>;

export type GrowthEvent = BaseCoreEvent<
  "GrowthEvent",
  { metric: string; delta: number; note?: string }
>;

export type HealthEvent = BaseCoreEvent<
  "HealthEvent",
  { metric: "energy" | "recovery" | "mood" | "consistency"; value: number; delta: number }
>;

export type RecommendationEvent = BaseCoreEvent<
  "RecommendationEvent",
  { title: string; reason: string; confidence: number }
>;

export type CoreEvent =
  | MissionEvent
  | SkillEvent
  | MemoryEvent
  | GrowthEvent
  | HealthEvent
  | RecommendationEvent;

export type CoreEventInput = {
  [K in CoreEvent as K["type"]]: Omit<K, "id" | "at"> & { at?: number };
}[CoreEventType];

export interface CoreState {
  currentFocus: string;
  currentGoal: string;
  currentMission: string;
  learningVelocity: number;
  growthMomentum: number;
  energy: number;
  recovery: number;
  mood: string;
  consistency: number;
  lastUpdated: number;
}

export interface ModuleDescriptor {
  id: ModuleId;
  label: string;
  route: string;
  glyph: string;
  emits: CoreEventType[];
}

export interface ModuleRuntime extends ModuleDescriptor {
  status: "online" | "idle";
  lastEventAt: number | null;
  eventCount: number;
}
