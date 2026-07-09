## Phase 2 — Core System Window

Add a new `/system` route as the heart of LifeOS. Reuse Phase 1's visual identity (glass cards, neon gradient, dark background, existing fonts) — no changes to existing pages, colors, or type. Only additions.

### Navigation entry
- On `/home`, add a prominent "Open System" button (glowing, gradient) near the header or main quest area that links to `/system`.
- Keep everything else on `/home` intact.

### New route
- `src/routes/system.tsx` — the System page, mounts `<AmbientBackground />` for continuity, uses framer-motion for entrance/float animations.

### New reusable components (in `src/components/lifeos/system/`)
- `OperatorCard.tsx` — avatar (initials placeholder in gradient circle), name, title, rank, level, total XP, member since, with animated `ProgressRing` wrapped around avatar.
- `ProgressRing.tsx` — SVG circular progress with animated stroke-dashoffset + soft glow; configurable size, value, label.
- `AttributeCard.tsx` — icon, name, level, `XPBar`, %, trend arrow (▲ ▼ –). Slight float animation on hover.
- `XPBar.tsx` — reuse existing `src/components/lifeos/XPBar.tsx` (already built).
- `StatusBadge.tsx` — glowing animated chip with pulse dot.
- `BuffCard.tsx` — positive effect, icon, name, mock timer (e.g. `2d 14h left`), gradient border glow.
- `DebuffCard.tsx` — same shape as buff but with subtle amber/red warning tone (using existing destructive/warning tokens; no new palette).
- `MilestoneCard.tsx` — timeline entry with icon, type tag, title, timestamp, connector line.
- `LifeDomainCard.tsx` — domain name, level, progress bar, tiny inline SVG sparkline (mock points).
- `FloatingStatusPanel.tsx` — floating circular button (bottom-right) + slide-in side panel (framer-motion `AnimatePresence`), shows level, XP, today's focus, energy, mood, quick stats, recent achievement, system status.

### System page section layout
Sections stacked in a max-w-6xl container, each wrapped in `GlassCard` where appropriate:

```text
┌─────────────────────────────────────────────┐
│ 1. Operator Profile (avatar + XP ring)      │
├──────────────────────────┬──────────────────┤
│ 3. Overall Progress ring │ 4. Current Status│
├──────────────────────────┴──────────────────┤
│ 2. Core Attributes (grid of 8 AttributeCard)│
├──────────────────────┬──────────────────────┤
│ 5. Active Buffs      │ 6. Current Debuffs   │
├──────────────────────┴──────────────────────┤
│ 7. Personal Records (stat grid)             │
├─────────────────────────────────────────────┤
│ 8. Life Domains (grid of 7 LifeDomainCard)  │
├─────────────────────────────────────────────┤
│ 9. Recent Milestones (vertical timeline)    │
└─────────────────────────────────────────────┘
   + FloatingStatusPanel (fixed bottom-right)
```

Note: the existing `/home` FAB stays on `/home` only. The System page uses its own `FloatingStatusPanel` button so they don't collide.

### Animations
- Entry: staggered `fade-in` + slight y-translate per section via framer-motion.
- XP bars & rings: animate width / stroke-dashoffset from 0 on mount.
- Numbers: count-up hook (`useCountUp`) for level, XP totals, %.
- Cards: soft float loop (`y: [0, -3, 0]` with long duration) on attribute/domain cards, subtle scale on hover.
- Badges: pulse dot + gradient shimmer.
- Side panel: slide-in-right with backdrop blur.

### Mock data
- Colocated in `src/lib/system-mock.ts` — attributes, buffs, debuffs, records, domains, milestones, operator profile.

### Head metadata
- `title: "System — LifeOS"`, description about the personal operating system view. No og:image change.

### Out of scope (per user)
No backend, no auth, no quest logic, no real data, no notifications, no color/typography changes.
