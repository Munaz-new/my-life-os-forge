# Phase 15 — Adaptive Mission Engine v1

Connect CORE reasoning to real missions: CORE proposes a mission from your actual context, you approve it, run it, report the result, and the outcome feeds back into the next proposal. No redesign — the existing Mission Center, CORE components, data services and auth are reused.

## The loop

```text
context → CORE analysis → proposed mission → your decision
       → active mission → completion feedback → evolution update → next proposal adapts
```

## 1. Data foundation (database change)

The current `missions` table only stores title/description/type/difficulty/status/minutes. Phase 15 needs the richer generated structure, so one migration adds:

- `missions`: objective, priority, reason (why CORE chose it), expected_impact, related_goal, related_skills, preparation, success_criteria, confidence, source (`core` or `manual`), accepted_at, abandoned_at. New statuses used: `proposed`, `accepted`, `paused`, `completed`, `abandoned`, `dismissed`.
- `mission_results`: completion_status (`yes` / `partial` / `no`) and difficulty_feedback (`easy` / `moderate` / `hard` / `very_hard`).

Existing rows keep working (all new columns nullable or defaulted). Access rules stay as they are: each person can only see and change their own missions and results.

## 2. Server-side mission generation

New `src/lib/ai/mission-generation.functions.ts` (authenticated server function, key stays server-side):

- Builds a focused mission context (extends the Phase 14 `core-context.server.ts` with mission-completion history, difficulty feedback, daily available minutes, today's mission count, and — on regenerate — the rejection reason). Only goal/skill/mission/preference slices are sent; nothing unrelated.
- Calls the Lovable AI gateway through the existing provider with a new mission-generation instruction that enforces the quality rules: no repeats of recent titles, realistic minutes within available time, must tie to an active goal, must have concrete success criteria, no motivational filler.
- Validates the response with a Zod mission schema (`src/lib/ai/mission-schema.ts`), clamping minutes/confidence and restricting `mission_type` to the eight supported types. Invalid output is rejected, logged server-side, and surfaced as "CORE could not generate a mission right now. Your data is safe."
- Only on successful validation is the mission persisted with status `proposed`.

Adaptive rules live in a small modular `src/lib/ai/mission-adaptation.server.ts`: streak of easy completions → nudge difficulty up; repeated abandons → down; "hard/very hard" feedback → shorter/easier next; low available minutes → shorter missions. These are computed as hints and passed into the prompt.

Daily capacity (default 1 Main + 2 Side) is enforced server-side before generating, and generation only happens on explicit user action — never on page load or refresh.

## 3. Mission review (approval gate)

New `MissionProposalCard` in the existing Mission Center style shows: CORE GENERATED A MISSION, title, objective, estimated time, difficulty, why CORE selected this, expected impact, related goal, related skills, confidence ring. Buttons: **Accept**, **Regenerate** (with optional reason chips: too difficult / too time-consuming / not relevant / not interested / already completed / other), **Edit** (title, description, minutes, difficulty), **Dismiss**.

Nothing becomes active without approval.

## 4. Mission execution

Accepting sets status `accepted`. An `ActiveMissionCard` shows the objective, success criteria, estimated time, elapsed timer, and Pause / Complete / Abandon.

## 5. Completion + feedback

Complete opens a three-step confirmation: did you complete it (Yes / Partially / No) → how difficult (Easy / Moderate / Hard / Very Hard) → optional "what did you learn". Stores completion status, difficulty feedback, reflection, actual time, completed_at against the mission and user.

## 6. Evolution update

Conservative, modular scoring in `src/lib/data/mission-progression.server.ts`: a completed mission writes a `MissionCompleted` evolution event and small `+1` progress bumps to related skills (`SkillImproved`), plus `MomentumChanged` / `GoalProgressUpdated` events. Partial completion gives a reduced bump; abandoned gives none. No exaggerated jumps.

Then a concise MISSION COMPLETE panel: "CORE has recorded your progress" with growth areas, skill impact, goal impact, momentum impact.

## 7. Dashboard + CORE connection

- `/home` gains a compact Active Mission block (title, priority, estimated time, progress) when a mission is accepted; otherwise a prompt to generate one.
- The Phase 14 CORE context gains recent mission results, so daily briefings and future generations reference yesterday's outcome.

## Technical notes

- New files: `src/lib/ai/mission-schema.ts`, `src/lib/ai/mission-prompt.server.ts`, `src/lib/ai/mission-adaptation.server.ts`, `src/lib/ai/mission-generation.functions.ts`, `src/lib/data/mission-progression.server.ts`, and mission components (`MissionProposalCard`, `ActiveMissionCard`, `MissionCompletionDialog`, `MissionImpactSummary`) under `src/components/lifeos/missions/`.
- Extended: `missions.functions.ts` (accept / edit / pause / abandon / complete-with-feedback), `queries.ts` (proposed + active mission queries and mutations), `MissionHeroCard` and the Mission Center page to render real proposal/active state instead of mock status, `core-context.server.ts`.
- Generation runs only via mutation; proposals are persisted so refreshes reuse them.
- No autonomous execution, no automatic goal edits, no external integrations, no voice.
