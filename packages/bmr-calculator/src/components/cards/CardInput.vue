<template>
  <section class="bmr-calculator__input">
    <base-card>
      <template #heading>
        <h2>Your details</h2>
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
</template>

<script setup lang="ts">
import BaseCard from '../base/BaseCard.vue';
import BaseNumberInput from '../base/BaseNumberInput.vue';
import type { BmrInput } from '../../core/types';

defineProps<{
  input: BmrInput;
}>();
</script>
