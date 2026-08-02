import type { CoreEvent } from "./types";

function at(hour: number, minute: number) {
  const d = new Date();
  d.setHours(hour, minute, 0, 0);
  return d.getTime();
}

/** Built lazily on the client — never at module scope. */
export function seedEvents(): CoreEvent[] {
  const raw: CoreEvent[] = [
    {
      id: "seed_1",
      type: "MissionEvent",
      module: "missions",
      tone: "primary",
      label: "Mission Generated",
      at: at(9, 15),
      payload: {
        action: "generated",
        missionId: "m_primary",
        title: "90-minute focused coding block",
      },
    },
    {
      id: "seed_2",
      type: "SkillEvent",
      module: "genome",
      tone: "primary",
      label: "Programming Improved",
      at: at(9, 45),
      payload: { skillId: "programming", skill: "Programming", delta: 3, level: 12 },
    },
    {
      id: "seed_3",
      type: "MemoryEvent",
      module: "memory",
      tone: "violet",
      label: "Memory Updated",
      at: at(10, 30),
      payload: { memoryId: "mem_focus", title: "Deep work works best pre-noon", action: "updated" },
    },
    {
      id: "seed_4",
      type: "HealthEvent",
      module: "system",
      tone: "cyan",
      label: "Focus Increased",
      at: at(11, 20),
      payload: { metric: "energy", value: 68, delta: 6 },
    },
    {
      id: "seed_5",
      type: "GrowthEvent",
      module: "evolution",
      tone: "cyan",
      label: "Weekly Review Finished",
      at: at(12, 5),
      payload: { metric: "Growth Momentum", delta: 2, note: "Consistency holding" },
    },
  ];
  return raw.sort((a, b) => b.at - a.at);
}
