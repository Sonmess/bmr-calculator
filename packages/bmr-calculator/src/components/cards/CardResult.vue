<template>
  <base-card v-if="result" class="bmr-calculator__result">
    <template #heading>
      <h2>📑&nbsp;Results</h2>
    </template>

    <template #body>
      <p class="bmr-calculator__result-line">
        <span class="bmr-calculator__result-label">Base metabolic rate</span>
        <span class="bmr-calculator__result-badge">
          <icon-flame class="bmr-calculator__result-icon" />
          {{ result }} kCal / day
        </span>
      </p>

      <p class="bmr-calculator__activity-table-desc">
        Your daily calorie requirements based on activity level
      </p>
      <table class="bmr-calculator__activity-table">
        <thead>
          <tr>
            <th>Activity Level</th>
            <th>kCal</th>
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
import IconFlame from '../icons/IconFlame.vue';
import { useBmrForm } from '../../composables/useBmrForm';
import { ACTIVITY_LEVELS, calculateTdee } from '../../core/activity';

const { result } = useBmrForm();
</script>

<style scoped>
.bmr-calculator__activity-table-desc {
  margin-bottom: -1.75rem !important;
  font-weight: bold;
  text-align: center;
}

.bmr-calculator__result-line {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--_gap-small);
  font-weight: bold;
}

.bmr-calculator__result-label {
  color: var(--_color-primary);
}

.bmr-calculator__result-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.875rem;
  border: 1px solid var(--_color-danger);
  border-radius: var(--_radius-fancy-small);
  background-color: var(--_bg-surface-2);
  color: var(--_color-danger);
  font-size: 1.125rem;
}

.bmr-calculator__result-icon {
  width: 1.125rem;
  height: 1.125rem;
}

.bmr-calculator__activity-table {
  width: 100%;
  border-collapse: collapse;
}

.bmr-calculator__activity-table th,
.bmr-calculator__activity-table td {
  padding: var(--_padding-small);
  padding-left: 0;
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
  padding-right: 0;
}

.bmr-calculator__activity-table tbody tr:nth-child(odd) {
  background-color: var(--_bg-surface-2);
}
</style>
