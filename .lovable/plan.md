# LifeOS — Phase 1 (UI & Flow Only)

Build the visual identity and navigation flow for an original AI Life Operating System. No backend, no logic, no data persistence — all state is local component state and hardcoded mock content.

## Visual Identity

- **Name:** LifeOS — **Tagline:** "Become who you're meant to become."
- **Mode:** Dark by default (force `.dark` on `<html>`; no theme toggle in Phase 1).
- **Palette (accents):** Electric Blue `#3B82F6`, Cyan `#22D3EE`, Violet `#8B5CF6`, on a deep near-black base (`oklch(~0.12 0.02 265)`) with layered glass surfaces.
- **Signature effects:** glassmorphism cards (translucent bg + `backdrop-blur` + hairline border), soft neon glows via layered box-shadows, animated gradient orbs in the background, subtle grid/noise overlay.
- **Typography:** Space Grotesk (display/headings) + Inter (body), loaded via `<link>` in `__root.tsx` head. Registered in `@theme` as `--font-display` / `--font-sans`.
- **Motion:** framer-motion for page transitions, staggered reveals, progress bar fills, floating orbs. Rounded 2xl cards. No Solo Leveling references, names, or artwork.

## Screens & Flow

```text
/  (splash) ── 2.5s ──▶ /onboarding ──▶ /auth ──▶ /setup ──▶ /home
                          (skip)──────────────────────────────▲
```

1. **`/` Splash** — animated LifeOS logomark (glowing hex/orbit SVG), name, tagline, ambient orbs. Auto-navigate to `/onboarding` after ~2.5s.
2. **`/onboarding`** — 4 paginated slides (single route, internal step state) with the 4 headlines provided, illustrative iconography, dot indicators, `Skip` (→ `/auth`), `Next`, and `Get Started` on the final slide (→ `/auth`).
3. **`/auth`** — tabbed Sign In / Create Account, Google button (visual only), `Forgot Password` link → `/auth/forgot`. Submitting any form navigates to `/setup` (no validation logic beyond required fields).
4. **`/auth/forgot`** — email field + confirmation state, link back to `/auth`.
5. **`/setup`** — 4 steps in one route: (a) "What do you want to become?" chip grid + custom input, (b) "Which skills to improve?" multi-select chips, (c) daily time commitment (4 options), (d) "Generating your Life System..." animated loader (~2s) → `/home`. Progress bar across the top.
6. **`/home`** — futuristic dashboard with hardcoded mock data:
   - Welcome header ("Welcome back, Operator")
   - Level card + animated XP progress bar
   - Rank badge (e.g. "Ascendant II")
   - Today's Main Quest card (mock title + CTA)
   - Daily streak flame counter
   - Skill overview grid (4–6 mock skills with mini bars)
   - Recent achievements row (mock badges)
   - Floating Quick Action button (bottom-right, glow)

## Technical Details

**Routes (TanStack Start file-based, under `src/routes/`):**
- `index.tsx` (splash, replaces placeholder), `onboarding.tsx`, `auth.tsx`, `auth.forgot.tsx`, `setup.tsx`, `home.tsx`.
- Each route defines its own `head()` with unique title + description + og tags.

**Design system (`src/styles.css`):**
- Rewrite `:root` and `.dark` tokens to the LifeOS palette (electric blue primary, cyan secondary, violet accent, deep dark bg/card/popover, glass borders using `oklch(... / 10%)`).
- Add semantic tokens: `--glow-primary`, `--glow-accent`, `--gradient-hero`, `--gradient-orb`, `--shadow-glass`, `--shadow-neon`.
- Register `--font-display` and `--font-sans` in `@theme`.
- Force dark: add `className="dark"` to `<html>` in `__root.tsx` shell.

**Reusable components (`src/components/lifeos/`):**
- `LogoMark.tsx` — animated SVG logo.
- `GlassCard.tsx` — glassmorphism wrapper (variants: default, glow).
- `NeonButton.tsx` — primary/secondary/ghost variants with glow.
- `AmbientBackground.tsx` — animated gradient orbs + subtle grid overlay (used on splash, onboarding, auth, setup, home).
- `XPBar.tsx` — animated gradient progress bar.
- `RankBadge.tsx`, `SkillTile.tsx`, `AchievementChip.tsx`, `QuestCard.tsx`, `StreakBadge.tsx` (all mock-driven via props).
- `SelectableChip.tsx` — used by setup (single + multi variants).
- `StepDots.tsx` — pagination indicator.

**Navigation:** `<Link>` and `useNavigate` from `@tanstack/react-router`. Splash auto-nav via `useEffect` + `setTimeout`.

**Dependencies to add:** `framer-motion`.

**Font loading:** `<link>` to Google Fonts (Space Grotesk + Inter) added in `__root.tsx` head `links`. No `@import` of remote URLs in CSS.

**Out of scope (explicitly not built):** quest engine, AI, database/Cloud, auth backend, XP calculations, skill trees, inventory, shop, notifications, boss battles, persistence — all buttons that would trigger these are visual only or navigate between the screens above.

## Deliverable

A polished, immersive dark futuristic flow the user can click through end-to-end (splash → onboarding → auth → setup → home), with a coherent design system and reusable component library ready for Phase 2 to plug logic into.
