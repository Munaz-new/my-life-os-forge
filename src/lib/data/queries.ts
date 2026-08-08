import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserProfile, getUserPreferences } from "./profile.functions";
import { getUserGoals, createGoal } from "./goals.functions";
import { getUserSkills } from "./skills.functions";
import { getUserMissions, getMissionResults, completeMission } from "./missions.functions";
import { getUserMemories, createMemory } from "./memories.functions";
import { getEvolutionEvents, getUserAchievements } from "./evolution.functions";

const STALE = 60_000;

export const profileQuery = queryOptions({
  queryKey: ["profile"],
  queryFn: () => getUserProfile(),
  staleTime: STALE,
});

export const preferencesQuery = queryOptions({
  queryKey: ["preferences"],
  queryFn: () => getUserPreferences(),
  staleTime: STALE,
});

export const goalsQuery = queryOptions({
  queryKey: ["goals"],
  queryFn: () => getUserGoals(),
  staleTime: STALE,
});

export const skillsQuery = queryOptions({
  queryKey: ["user-skills"],
  queryFn: () => getUserSkills(),
  staleTime: STALE,
});

export const missionsQuery = queryOptions({
  queryKey: ["missions"],
  queryFn: () => getUserMissions(),
  staleTime: STALE,
});

export const missionResultsQuery = queryOptions({
  queryKey: ["mission-results"],
  queryFn: () => getMissionResults(),
  staleTime: STALE,
});

export const memoriesQuery = queryOptions({
  queryKey: ["memories"],
  queryFn: () => getUserMemories(),
  staleTime: STALE,
});

export const evolutionEventsQuery = queryOptions({
  queryKey: ["evolution-events"],
  queryFn: () => getEvolutionEvents(),
  staleTime: STALE,
});

export const achievementsQuery = queryOptions({
  queryKey: ["achievements"],
  queryFn: () => getUserAchievements(),
  staleTime: STALE,
});

export function useCreateGoal() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Parameters<typeof createGoal>[0]) => createGoal(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["goals"] }),
  });
}

export function useCreateMemory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Parameters<typeof createMemory>[0]) => createMemory(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["memories"] }),
  });
}

export function useCompleteMission() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Parameters<typeof completeMission>[0]) => completeMission(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["missions"] });
      qc.invalidateQueries({ queryKey: ["mission-results"] });
      qc.invalidateQueries({ queryKey: ["evolution-events"] });
    },
  });
}
