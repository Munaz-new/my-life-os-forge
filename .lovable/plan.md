## Phase 14 — CORE AI Intelligence v1

Connect CORE to a real AI model through Lovable AI (server-side only), reusing the Phase 13 data layer and the existing CORE screen. No visual redesign.

### What the user gets
- The Daily Briefing block on CORE becomes real: CORE analyzes the signed-in user's goals, skills, recent missions and evolution events and returns a summary, observation, recommended focus, reasoning, evidence, next action and a confidence indicator.
- A Goal Analysis panel on the same page: pick one active goal, CORE returns goal status, strengths, bottlenecks, recommendation, next action, reasoning and confidence.
- While CORE works, the existing CORE orb animation plays with a "CORE ANALYZING" label — no generic spinner.
- Every result carries a "Why CORE recommends this" block with evidence, reasoning and confidence.
- Results are advisory only: "Apply Recommendation" / "Dismiss". Apply only stores a lightweight, user-confirmed note; it never edits goals, profile, health data, or completes missions.
- Empty context → CORE says it doesn't have enough information yet and lists what would help (e.g. add a goal, log a mission).
- AI failure → "CORE is temporarily unavailable. Your data is safe. Try again shortly." No technical error text.

### Technical approach

**AI access (server-only)**
- Use Lovable AI Gateway via the AI SDK (`ai` + `@ai-sdk/openai-compatible`), with the gateway provider helper in a new `src/lib/ai-gateway.server.ts`. `LOVABLE_API_KEY` is read inside handlers only; nothing AI-related ships to the browser.

**Reasoning layer** (`src/lib/ai/`)
- `core-identity.server.ts` — the CORE system instruction (calm, clear, analytical, honest, non-judgmental; never fabricate; caution + professional-guidance nudge on medical/financial/legal topics).
- `core-modes.ts` — mode enum: `DAILY_BRIEFING`, `GOAL_ANALYSIS` functional; `MISSION_ADVICE`, `SKILL_ANALYSIS`, `EVOLUTION_ANALYSIS`, `GENERAL_QUESTION` registered as placeholders that return a "not available yet" result.
- `core-schema.ts` — zod schema for the structured response (`summary`, `observation`, `recommendation`, `reasoning`, `evidence[]`, `confidence`, `expectedImpact`, `nextAction`, plus optional `goalStatus`, `strengths[]`, `bottlenecks[]` for goal analysis). Responses are validated before display; a validation failure degrades to the unavailable state.
- `core-context.server.ts` — contextual retrieval: per mode, select only the needed slices via the existing Supabase queries under the caller's RLS session (profile display name + preferences, active goals, top skills, last ~5 missions and their results, recent evolution events, and for goal analysis only the memories/skills tied to that goal's category). Each slice is trimmed and capped before it reaches the model. No full-table dumps, no other users' data.

**Server function** (`src/lib/ai/core.functions.ts`)
- One `createServerFn` with `.middleware([requireSupabaseAuth])`, input `{ mode, goalId? }`, which builds context, calls the gateway with streaming consumed server-side, validates the JSON, and returns the structured result plus a `contextSufficient` flag. Gateway status handling follows the standard contract: 429/5xx retry once with backoff; 402/403/400/401 are terminal and surface the friendly unavailable message.

**Cost control**
- React Query wrappers in `src/lib/data/queries.ts` with a long `staleTime` and a stable key (`["core-ai", mode, goalId]`) so revisits and identical requests don't re-call the model; explicit refresh control only. Structured for a later persisted cache.

**UI (reuse only)**
- `BriefingCard.tsx` reads the AI result instead of `core-mock`'s `dailyBriefing`, keeping the exact layout, ring and typography; mock stays as the shape reference for other sections.
- New small components in the existing `src/components/lifeos/core/` glass/neon language: `CoreAnalyzing` (orb + "CORE ANALYZING"), `CoreReasoning` (why/evidence/confidence), `CoreGoalAnalysis` (goal picker + result), `CoreResultActions` (Apply / Dismiss).
- Placed inside the existing CORE route sections; no navigation, palette, typography or spacing changes elsewhere.

### Out of scope
No autonomous actions, no automatic data changes, no memory auto-creation, no integrations, no voice, no predictive simulation, no mission generation.
