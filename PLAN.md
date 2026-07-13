# BMR Calculator — Implementation Plan

## Decisions
- **Architecture:** library-first monorepo. Build the calculator once as a versioned Vue 3 package; the demo site and (later) Nuxt projects consume it.
- **Formulas:** user-selectable — Mifflin-St Jeor, Harris-Benedict, Katch-McArdle.
- **Units:** metric only (kg / cm / years). Imperial deferred.
- **Styling:** scoped CSS exposing CSS custom properties for theming.
- **Stack:** Vite + Vue 3 `<script setup>` + TypeScript + Vitest.

## Target structure
```
bmr-calculator/
├── package.json                 # workspace root (private)
├── pnpm-workspace.yaml          # declares packages/* and apps/*
├── packages/
│   └── bmr-calculator/          # THE reusable library (ships to npm / Nuxt)
│       ├── package.json
│       ├── vite.config.ts       # library mode build
│       └── src/
│           ├── index.ts         # public entry: exports component + core fns
│           ├── core/            # pure TS — no Vue, no DOM
│           │   ├── formulas.ts  # mifflin, harrisBenedict, katchMcArdle
│           │   └── types.ts
│           └── components/
│               └── BmrCalculator.vue
└── apps/
    └── site/                    # plain HTML demo site (deployable static site)
        ├── index.html
        ├── vite.config.ts
        └── src/main.ts          # mounts BmrCalculator onto the page
```

## Architectural principles (what makes Nuxt reuse painless)
1. **Separate pure logic from UI.** Math lives in `core/formulas.ts` as plain functions (numbers in, numbers out). The `.vue` file is just the UI wrapper. Independently testable.
2. **SSR-safety for Nuxt.** Never touch `window`/`document` at module top level or in `setup()` — only inside `onMounted` or event handlers.
3. **`vue` is a peer dependency**, externalized in the library build. Don't bundle a second copy of Vue into host apps.
4. **Theme via CSS custom properties.** Scoped CSS reads `var(--bmr-accent, #2563eb)` etc.; host apps override the variables. No build config on their side.

## Formulas (metric)
- **Mifflin-St Jeor:** `10*kg + 6.25*cm - 5*age + (male ? 5 : -161)`
- **Harris-Benedict (revised):** sex-specific constants.
- **Katch-McArdle:** `370 + 21.6*leanMass`, where `leanMass = kg*(1 - bodyFat%/100)`.
  ⚠️ Needs body-fat %; ignores sex/height/age.

## Phased build order
- [ ] **Phase 0 — Scaffold monorepo.** Install pnpm (or use npm workspaces). Root `package.json` (`"private": true`) + `pnpm-workspace.yaml`. Scaffold library and site with Vite (Vue + TS). *Milestone: site dev server runs.*
- [ ] **Phase 1 — Formulas (pure logic).** Implement the three formulas in `core/formulas.ts`. Write Vitest unit tests with known values. *Milestone: math is trusted before any UI.*
- [ ] **Phase 2 — Component.** `BmrCalculator.vue`: formula selector, reactive inputs, computed result, per-formula field show/hide, validation, scoped themeable CSS. *Milestone: works in the site.*
- [ ] **Phase 3 — HTML site.** `index.html` + `main.ts` mounts the component. *Milestone: `build` produces a static site to host.*
- [ ] **Phase 4 — Library build & Nuxt-readiness.** Vite library mode (ESM, `vue` external, emit `.d.ts` via `vite-plugin-dts`). Set `package.json` `exports`/`types`/`files`. *Milestone: `dist/` is publishable.*
- [ ] **Phase 5 (optional) — TDEE.** Activity-level multipliers for maintenance calories.

## Open choices
- pnpm (recommended) vs npm workspaces.
- Whether/when to publish to npm vs consume via git/workspace link in Nuxt.
