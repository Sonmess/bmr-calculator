<template>
  <base-card v-if="result" class="bmr-calculator__result">
    <template #heading>
      <h2>Results</h2>
    </template>

    <template #body>
      <p>Base metabolic rate: {{ result }}</p>

      <table class="bmr-calculator__activity-table">
        <thead>
          <tr>
            <th>Activity Level</th>
            <th>Calories</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in ACTIVITY_LEVELS" :key="row.level">
            <td>{{ row.label }}</td>
            <td>{{ calculateTdee(result, row.multiplier) }}</td>
          </tr>
        </tbody>
      </table>
    </template>
  </base-card>
</template>

<script setup lang="ts">
import BaseCard from '../base/BaseCard.vue';
import { useBmrForm } from '../../composables/useBmrForm';
import { ACTIVITY_LEVELS, calculateTdee } from '../../core/activity';

const { result } = useBmrForm();
</script>

<style scoped>
.bmr-calculator__activity-table {
  width: 100%;
  border-collapse: collapse;
}

.bmr-calculator__activity-table th,
.bmr-calculator__activity-table td {
  padding: var(--_padding-small);
  text-align: left;
  border-bottom: 1px solid var(--_border-color);
}

.bmr-calculator__activity-table th {
  color: var(--_color-secondary);
  font-weight: normal;
}

.bmr-calculator__activity-table td:last-child,
.bmr-calculator__activity-table th:last-child {
  text-align: right;
}
</style>
