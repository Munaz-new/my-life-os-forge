# Phase 13 — CORE Persistent Data Foundation

Add a real backend behind EVOLVE: Google sign-in, per-user persistent data, a clean data-service layer, and graceful empty/loading/error states. No visual redesign — existing screens keep their layout, colors, motion and navigation.

## 1. Backend

Enable Lovable Cloud (the project has no backend yet — no `src/integrations/`, no `.env`). This provisions the database, auth and server runtime. No duplicate databases, no existing data to destroy.

## 2. Authentication — Google only

- Rework `/auth` in place (same glass card, logo, ambient background) to a single "Continue with Google" action; remove the mock email/password form and the tab switcher. `/auth/forgot` is deleted since it no longer applies.
- Google sign-in goes through the managed Lovable broker; the provider is enabled in the same step.
- After sign-in: new users land on `/setup`, returning users on `/home`.
- Sign-out control added to the existing header/nav area (same styling as current links).

## 3. Route protection

All module pages move under an authenticated layout and keep their URLs unchanged:
`/home, /system, /core, /missions, /genome, /memory, /evolution, /decisions, /knowledge, /twin, /future, /setup, /dev`.
Public: `/` (splash), `/onboarding`, `/auth`. Unauthenticated visits redirect to `/auth`.

## 4. Data model

Tables exactly as specified, all keyed to the signed-in user:
`profiles, user_goals, skills, user_skills, missions, mission_results, memories, achievements, user_achievements, evolution_events, user_preferences`.

- `skills` and `achievements` are shared catalogs (readable by any signed-in user, writable only by the system).
- Every other table is private to its owner.
- A signup trigger creates the profile row (display name + avatar from the Google account) and a preferences row automatically.

## 5. Security

- Row-level security on every table; policies scope reads and writes to the owner's ID, so no user can ever see or modify another user's profile, goals, skills, missions, memories, achievements, evolution events or preferences.
- Explicit table grants so the app can reach the data; catalogs are read-only to users.
- No credentials in client code.

## 6. Data services

One service module per domain under `src/lib/data/`, called through server functions that run as the signed-in user:
`getUserProfile, updateUserProfile, getUserGoals, createGoal, updateGoal, getUserSkills, updateSkillProgress, getUserMissions, createMission, completeMission, getUserMemories, createMemory, getEvolutionEvents, recordEvolutionEvent, getUserPreferences, updateUserPreferences`.

UI components never query the database directly — they call typed hooks backed by React Query so shared data (profile, skills) is fetched once and cached.

## 7. Connecting the UI

Wired to real data, falling back to the current demo visuals when a user has no rows yet:

- Profile name + avatar (dashboard header, System operator card).
- Dashboard skills list and Genome/System skill values from `user_skills`.
- Mission Center list and completion history from `missions` / `mission_results`.
- CORE Memory list from `memories`.
- Goals from `user_goals` (surfaced where the current goal/objective text already appears).
- `/setup` writes its answers (goal, chosen skills, daily minutes) into `user_goals`, `user_skills` and `user_preferences` instead of discarding them.
- `/dev` gains a read-only view of stored evolution events alongside the in-memory bus.

Every other page keeps its existing mock data untouched this phase.

## 8. Empty, loading and error states

New small components in the existing glass/neon language:

- No goals: "CORE is waiting for your first objective."
- No missions: "Your first mission will appear here."
- No memories: "CORE has not learned your story yet."
- No skills: "Your evolution map is waiting to be initialized."
- Skeleton shimmer for loading; a calm "CORE lost connection" card for failures. Raw database errors are never shown; the app never crashes on missing data.

## 9. Demo data

No fake rows written into real accounts. Existing mock modules stay as clearly separated development fixtures.

## Technical notes

- TanStack Start server functions with the authenticated Supabase middleware; RLS enforced as the user. No edge functions.
- Layering: routes/components (UI) → hooks (React Query) → `src/lib/data/*` services → server functions → database. Future CORE intelligence plugs in above the service layer without touching UI.
- The in-memory CORE event bus stays; `recordEvolutionEvent` mirrors significant events into `evolution_events` for persistence.
- `evolution_events.metadata` and `user_preferences.notification_preferences` stored as JSON.

## Out of scope

No AI, no autonomous recommendations, no predictive analytics, no external integrations, no new UI pages.
