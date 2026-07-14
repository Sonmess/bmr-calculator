<script setup lang="ts">
// Phase 2 lives here. Build the real UI:
//   - a formula selector: Mifflin-St Jeor / Harris-Benedict / Katch-McArdle
//   - reactive metric inputs (kg / cm / years; + body-fat % for Katch-McArdle)
//   - a computed result driven by the pure functions in ../core/formulas
//   - per-formula field show/hide + input validation
//
// Keep it SSR-safe for Nuxt: no window/document access here or at module top
// level — only inside onMounted or event handlers.
import { calculateBmr } from '../core/formulas';
import type { Formula, BmrInput } from '../core/types';
import { ref, computed, reactive } from 'vue';
import BaseCard from './base/BaseCard.vue';
import BaseNumberInput from './base/BaseNumberInput.vue';

const baseCardHeadline = 'Calculate base metabolic rate';
const formula = ref<Formula>('mifflin');

const input = reactive<BmrInput>({
  weightKg: 70,
  heightCm: 175,
  age: 30,
  sex: 'male',
  bodyFatPct: 22,
});

const result = computed(() => {
  if (!isValid.value) {
    return null;
  }

  return Math.round(calculateBmr(formula.value, input));
});

const isValid = computed(() => {
  // insert validation here
  if (needsBodyFat.value) {
    return false;
  }
  return true;
});

const needsBodyFat = computed(() => {
  return formula.value === 'katch-mcardle';
});
</script>

<template>
  <main class="bmr-calculator">
    <section class="bmr-calculator__input">
      <base-card>
        <template #heading>
          <h2>{{ baseCardHeadline }}</h2>
        </template>

        <template #body>
          <form>
            <base-number-input label="Age" name="age" v-model="input.age" />
            <base-number-input
              label="Weight"
              name="weight"
              v-model="input.weightKg"
            />
            <base-number-input
              label="Height"
              name="height"
              v-model="input.heightCm"
            />
          </form>
        </template>
      </base-card>
    </section>

    <section class="bmr-calculator__result">
      <base-card>
        <template #heading>
          <h2>Results</h2>
        </template>

        <template #body>
          <p>Base metabolic rate: {{ result }}</p>
        </template>
      </base-card>
    </section>
  </main>
</template>

<style scoped>
.bmr-calculator {
  /* Theme hooks: host apps override these CSS variables to restyle the widget.
     Always provide a fallback so the component looks right with zero config. */

  --bmr-radius-big: 2rem;
  --bmr-radius-small: 1rem;
  --bmr-padding-big: 2rem;
  --bmr-padding-small: 1rem;
  --bmr-bg-color: #fff;
  --bmr-color: #1f2937;
  --bmr-ff: system-ui, 'Segoe UI', Roboto, sans-serif;
  --bmr-flex-gap-big: 2rem;
  --bmr-flex-gap-small: 1rem;
  --bmr-border-color: white;

  color: var(--bmr-color);
  background: var(--bmr-bg-color);
  font-family: var(--bmr-ff);
  border-radius: var(--bmr-radius-big);
  padding: var(--bmr-padding-big);
  border: 1px solid var(--bmr-border-color);
}
</style>
