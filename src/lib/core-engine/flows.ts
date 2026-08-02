import { coreState } from "./core-state";
import { eventBus } from "./event-bus";
import { growthEngine } from "./growth-engine";
import { memoryEngine } from "./memory-engine";
import { missionEngine } from "./mission-engine";
import { recommendationEngine } from "./recommendation-engine";

export interface FlowStep {
  label: string;
  run: () => void;
}

export interface CoreFlow {
  id: string;
  title: string;
  chain: string[];
  steps: FlowStep[];
}

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export function missionCompleteFlow(
  missionId = "m_primary",
  title = "90-minute focused coding block",
): CoreFlow {
  return {
    id: "mission-complete",
    title: "Mission Complete",
    chain: ["Mission", "Genome", "Evolution Review", "Memory", "Dashboard"],
    steps: [
      { label: "Mission completed", run: () => missionEngine.complete(missionId, title) },
      { label: "Genome updated", run: () => growthEngine.applySkillGain("Programming", 4) },
      {
        label: "Evolution Review updated",
        run: () => growthEngine.recordGrowth("Growth Momentum", 3, "Mission completion"),
      },
      { label: "Memory written", run: () => memoryEngine.record(title, "added") },
      {
        label: "Dashboard notified",
        run: () =>
          eventBus.emit({
            type: "RecommendationEvent",
            module: "dashboard",
            tone: "cyan",
            label: "Dashboard refreshed with new momentum",
            payload: {
              title: "Keep the streak — schedule tomorrow's block",
              reason: "Momentum is rising after a completed mission",
              confidence: 0.76,
            },
          }),
      },
    ],
  };
}

export function goalChangedFlow(goal = "Become a systems-level engineer"): CoreFlow {
  return {
    id: "goal-changed",
    title: "Goal Changed",
    chain: ["Goal", "Recommendations", "Mission", "Dashboard"],
    steps: [
      {
        label: "Goal updated",
        run: () => {
          coreState.set({ currentGoal: goal });
          growthEngine.recordGrowth("Goal Alignment", 2, goal);
        },
      },
      {
        label: "CORE recalculates recommendations",
        run: () => recommendationEngine.recalculate(goal),
      },
      { label: "Mission regenerated", run: () => missionEngine.regenerate() },
      {
        label: "Dashboard updated",
        run: () =>
          eventBus.emit({
            type: "RecommendationEvent",
            module: "dashboard",
            tone: "violet",
            label: "Dashboard realigned to new goal",
            payload: {
              title: "New primary vector applied",
              reason: goal,
              confidence: 0.71,
            },
          }),
      },
    ],
  };
}

export async function runFlow(flow: CoreFlow, stepDelayMs = 450) {
  for (const step of flow.steps) {
    step.run();
    await wait(stepDelayMs);
  }
}

export const FLOW_DIAGRAMS = [
  "Mission Complete → Genome → Evolution Review → Memory → Dashboard",
  "Goal Changed → Recommendations → Mission Regenerated → Dashboard",
];
