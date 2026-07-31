<template>
  <base-card class="bmr-calculator__input">
    <template #heading>
      <h2>🔰&nbsp;Your details</h2>
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
        <base-gender-select
          label="Gender"
          name="gender"
          v-model="input.gender"
        />
        <base-formula-select label="Formula" name="formula" v-model="formula" />
        <base-number-input
          v-if="needsBodyFat"
          label="Body fat %"
          name="bodyFatPct"
          v-model="input.bodyFatPct"
        />
      </form>
    </template>
  </base-card>
</template>

<script setup lang="ts">
import BaseCard from '../base/BaseCard.vue';
import BaseNumberInput from '../base/BaseNumberInput.vue';
import BaseGenderSelect from '../base/BaseGenderSelect.vue';
import BaseFormulaSelect from '../base/BaseFormulaSelect.vue';
import { useBmrForm } from '../../composables/useBmrForm';

// Shared state from the widget. `input` is the reactive object itself (not a
// prop), so binding v-model to its fields is legitimate two-way editing.
const { input, needsBodyFat, formula } = useBmrForm();
</script>

<style scoped>
.bmr-calculator__input form {
  display: flex;
  gap: var(--_gap-big);
  flex-direction: column;
}
</style>
