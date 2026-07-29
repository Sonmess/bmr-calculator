<template>
  <base-card class="bmr-calculator__result">
    <template #heading>
      <h2>Results</h2>
    </template>

    <template #body>
      <p>Base metabolic rate: {{ result }}</p>
    </template>
  </base-card>
</template>

<script setup lang="ts">
import BaseCard from '../base/BaseCard.vue';
import { useBmrForm } from '../../composables/useBmrForm';

const { result } = useBmrForm();
</script>

<style scoped>
.bmr-calculator__result {
}
</style>
