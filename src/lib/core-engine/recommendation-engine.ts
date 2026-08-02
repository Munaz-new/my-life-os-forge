import { eventBus } from "./event-bus";
import type { CoreEvent } from "./types";

/**
 * Placeholder engine. Phase 8 ships architecture only — every method returns
 * mock output and emits a CORE event so the pipeline can be observed.
 */
export const recommendationEngine = {
  id: "RecommendationEngine" as const,
  status: "placeholder" as const,
  describe: () => "Ranks next-best actions from CORE state. Mock implementation.",
  recalculate(goal: string): CoreEvent {
    return eventBus.emit({
      type: "RecommendationEvent",
      module: "core",
      tone: "cyan",
      label: `Recommendations recalculated for “${goal}”`,
      payload: {
        title: "Protect the morning deep-work block",
        reason: `Highest leverage path toward ${goal}`,
        confidence: 0.82,
      },
    });
  },
};
