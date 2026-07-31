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

<style>
@import '../assets/vars.css';
</style>

<style scoped>
.bmr-calculator {
  /* ---- component styles: consume ONLY the private --_* tokens ---- */
  display: flex;
  flex-flow: row wrap;
  gap: var(--_gap-layout);
  color: var(--_color-primary);
  background: var(--_bg-page);
  font-family: var(--_font-text);
  border: 1px solid var(--_border-color);
  border-radius: var(--_radius-big);
  padding: var(--_padding-layout);
}
</style>
