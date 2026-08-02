import { eventBus } from "./event-bus";
import type { CoreEvent } from "./types";

/** Placeholder engine — mock growth math only. */
export const growthEngine = {
  id: "GrowthEngine" as const,
  status: "placeholder" as const,
  describe: () => "Translates activity into genome + trajectory movement. Mock implementation.",
  applySkillGain(skill: string, delta: number): CoreEvent {
    return eventBus.emit({
      type: "SkillEvent",
      module: "genome",
      tone: "primary",
      label: `${skill} improved +${delta}%`,
      payload: { skillId: skill.toLowerCase().replace(/\s+/g, "-"), skill, delta },
    });
  },
  recordGrowth(metric: string, delta: number, note?: string): CoreEvent {
    return eventBus.emit({
      type: "GrowthEvent",
      module: "evolution",
      tone: delta >= 0 ? "cyan" : "destructive",
      label: `${metric} ${delta >= 0 ? "+" : ""}${delta}`,
      payload: { metric, delta, note },
    });
  },
};
