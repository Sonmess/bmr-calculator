// Public entry point of the library.
// Whatever is exported here is what other projects — including your Nuxt apps —
// will import. This file is the library's true "entry", replacing the app-style
// main.ts (main.ts stays only as a local dev harness; see App.vue).

export { default as BmrCalculator } from './components/BmrCalculator.vue'

// Pure calculation logic — reusable without the component.
export {
  mifflinStJeor,
  harrisBenedict,
  katchMcArdle,
  calculateBmr,
} from './core/formulas'
export type { BmrInput, Sex, Formula } from './core/types'
