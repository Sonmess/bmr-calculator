<script setup lang="ts">
// Phase 2 lives here. Build the real UI:
//   - a formula selector: Mifflin-St Jeor / Harris-Benedict / Katch-McArdle
//   - reactive metric inputs (kg / cm / years; + body-fat % for Katch-McArdle)
//   - a computed result driven by the pure functions in ../core/formulas
//   - per-formula field show/hide + input validation
//
// Keep it SSR-safe for Nuxt: no window/document access here or at module top
// level — only inside onMounted or event handlers.
import CardInfo from './cards/CardInfo.vue';
import CardResult from './cards/CardResult.vue';
import CardInput from './cards/CardInput.vue';
import { provideBmrForm } from '../composables/useBmrForm';

const baseCardHeadline = 'Calculate base metabolic rate';
const { showInfo } = defineProps({
  showInfo: {
    type: Boolean,
    required: false,
    default: true,
  },
});

// Create the shared form state and provide it to every card below.
// The cards reach it via useBmrForm() — no props drilled, no props mutated.
provideBmrForm();
</script>

<template>
  <main class="bmr-calculator">
    <card-info v-if="showInfo" :headline="baseCardHeadline" />
    <card-input />
    <card-result />
  </main>
</template>

<style scoped>
.bmr-calculator {
  /* fonts */
  --_font-heading: var(
    --bmr-font-heading,
    'Space Grotesk',
    system-ui,
    sans-serif
  );
  --_font-text: var(--bmr-font-text, 'Inter', system-ui, sans-serif);

  /* backgrounds */
  --_bg-page: var(--bmr-bg-page, #0d1117);
  --_bg-surface: var(--bmr-bg-surface, #161b22);
  --_bg-surface-2: var(--bmr-bg-surface-2, #1c2128);

  /* text / accent colors */
  --_color-primary: var(--bmr-color-primary, #e6edf3);
  --_color-secondary: var(--bmr-color-secondary, #8b949e);
  --_color-accent: var(--bmr-color-accent, #58a6ff);
  --_color-positive: var(--bmr-color-positive, #3fb950);
  --_color-danger: var(--bmr-color-danger, #f85149);
  --_color-warning: var(--bmr-color-warning, #d29922);

  /* borders / radii / shadow */
  --_border-color: var(--bmr-border-color, #30363d);
  --_radius-big: var(--bmr-radius-big, 2rem);
  --_radius-small: var(--bmr-radius-small, 1rem);
  --_shadow: var(
    --bmr-shadow,
    0 1px 2px rgba(0, 0, 0, 0.4),
    0 8px 24px rgba(0, 0, 0, 0.24)
  );

  /* spacing */
  --_padding-big: var(--bmr-padding-big, 2rem);
  --_padding-small: var(--bmr-padding-small, 1rem);
  --_gap-big: var(--bmr-gap-big, 2rem);
  --_gap-small: var(--bmr-gap-small, 1rem);

  /* ---- component styles: consume ONLY the private --_* tokens ---- */
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  gap: var(--_gap-big);
  color: var(--_color-primary);
  background: var(--_bg-page);
  font-family: var(--_font-text);
  border: 1px solid var(--_border-color);
  border-radius: var(--_radius-big);
  padding: var(--_padding-big);
}
</style>
