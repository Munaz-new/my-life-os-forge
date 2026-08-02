import { eventBus } from "./event-bus";
import type { CoreEvent } from "./types";

/** Placeholder engine — mock memory writes only. */
export const memoryEngine = {
  id: "MemoryEngine" as const,
  status: "placeholder" as const,
  describe: () => "Persists and recalls long-term signals. Mock implementation.",
  record(title: string, action: "added" | "updated" | "pinned" | "recalled" = "added"): CoreEvent {
    return eventBus.emit({
      type: "MemoryEvent",
      module: "memory",
      tone: "violet",
      label: `Memory ${action}: ${title}`,
      payload: { memoryId: `mem_${title.length}_${action}`, title, action },
    });
  },
};
