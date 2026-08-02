## Phase 8 — CORE Intelligence Architecture

Introduce a client-side intelligence layer that every module talks to, plus a hidden Developer Preview page. No visual redesign of existing pages, mock data only.

### Core layer (`src/lib/core-engine/`)
- `types.ts` — event union and payloads: `MissionEvent`, `SkillEvent`, `MemoryEvent`, `GrowthEvent`, `HealthEvent`, `RecommendationEvent`. Shared shape: `{ id, type, module, label, at, payload, tone }`.
- `event-bus.ts` — tiny pub/sub (`emit`, `on`, `off`, `history`), capped ring buffer of recent events, subscription via `useSyncExternalStore`.
- `core-state.ts` — mock CORE State store: current focus, current goal, current mission, learning velocity, growth momentum, energy, recovery, mood, consistency, plus `lastUpdated`. Reducer applies events to state.
- `module-registry.ts` — registers the six modules (Dashboard, Mission Center, System, Genome, Memory, Evolution Review) with id, label, route, glyph, status (online/idle), last event time, emitted event types.
- Engine placeholders: `recommendation-engine.ts`, `memory-engine.ts`, `growth-engine.ts`, `mission-engine.ts` — each a named object with documented no-op/mock methods returning mock results and emitting events.
- `flows.ts` — declarative interaction flows (Mission Complete → Genome → Evolution Review → Memory → Dashboard; Goal Changed → recommendations → mission regenerated → Dashboard) executed step-by-step with small delays so the timeline shows the cascade.
- `seed.ts` — seeded timeline entries (09:15 Mission Generated, 09:45 Programming Improved, …) built lazily, never at module scope.

### Provider + hooks
- `src/components/core/CoreProvider.tsx` mounted in `__root.tsx` around `<Outlet />`: initializes state/registry on the client (in `useEffect`), no SSR side effects.
- Hooks: `useCoreState()`, `useCoreEvents(limit?)`, `useEmitCoreEvent()`, `useModuleRegistry()`.

### Module wiring (no UI redesign)
Each existing page registers itself on mount and emits its mock events from existing controls only — no new buttons, no layout changes:
- Missions: accept/complete actions emit `MissionEvent` and run the Mission Complete flow.
- Genome: node selection emits `SkillEvent`.
- Memory: pin/select emits `MemoryEvent`.
- Evolution Review: mount emits `GrowthEvent` (review finished).
- System: mount emits `HealthEvent` (energy/recovery snapshot).
- Dashboard: subscribes only; renders nothing new.

### Developer Preview page
- New route `src/routes/dev.tsx` (hidden — not linked from any nav; opened by URL). Dev Mode toggle stored in `localStorage` (read in `useEffect`); when off, the page shows a gated notice.
- Sections, all in existing glass/neon language: CORE State grid, Connected Modules list with status dots, Event Timeline (live, timestamped, tone-colored), System Health bars, Mock Intelligence Pipeline diagram (input → engines → modules) with a "Run flow" control to trigger the two demo flows.
- Own `head()` metadata, `robots: noindex`.

### Constraints
No backend, no API, no AI, no auth changes, no changes to existing page visuals beyond emit hooks.
