<template>
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
</template>

<script setup lang="ts">
import BaseCard from '../base/BaseCard.vue';

interface CardResultProps {
  result: number | null;
}

defineProps<CardResultProps>();
</script>
