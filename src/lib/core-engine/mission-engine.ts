import { eventBus } from "./event-bus";
import type { CoreEvent } from "./types";

/** Placeholder engine — mock mission generation only. */
export const missionEngine = {
  id: "MissionEngine" as const,
  status: "placeholder" as const,
  describe: () => "Generates adaptive daily missions from CORE state. Mock implementation.",
  generate(title = "90-minute focused coding block"): CoreEvent {
    return eventBus.emit({
      type: "MissionEvent",
      module: "missions",
      tone: "primary",
      label: `Mission generated: ${title}`,
      payload: { action: "generated", missionId: "m_generated", title },
    });
  },
  regenerate(title = "Realigned mission: ship one vertical slice"): CoreEvent {
    return eventBus.emit({
      type: "MissionEvent",
      module: "missions",
      tone: "cyan",
      label: `Mission regenerated: ${title}`,
      payload: { action: "regenerated", missionId: "m_regenerated", title },
    });
  },
  accept(missionId: string, title: string): CoreEvent {
    return eventBus.emit({
      type: "MissionEvent",
      module: "missions",
      tone: "primary",
      label: `Mission accepted: ${title}`,
      payload: { action: "accepted", missionId, title },
    });
  },
  complete(missionId: string, title: string, xp = 240): CoreEvent {
    return eventBus.emit({
      type: "MissionEvent",
      module: "missions",
      tone: "cyan",
      label: `Mission completed: ${title}`,
      payload: { action: "completed", missionId, title, xp },
    });
  },
  skip(missionId: string, title: string): CoreEvent {
    return eventBus.emit({
      type: "MissionEvent",
      module: "missions",
      tone: "destructive",
      label: `Mission skipped: ${title}`,
      payload: { action: "skipped", missionId, title },
    });
  },
};
