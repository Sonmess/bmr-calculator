<template>
  <div class="base-formula-select">
    <label class="base-formula-select__label" :for="inputId">{{ label }}</label>
    <select
      class="base-formula-select__field"
      :id="inputId"
      :name="name"
      v-model="modelValue"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <icon-chevron-down class="base-formula-select__icon" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import IconChevronDown from '../icons/IconChevronDown.vue';
import type { Formula } from '../../core/types';

const props = defineProps({
  label: String,
  name: String,
});

const modelValue = defineModel<Formula>();

const options: { value: Formula; label: string }[] = [
  { value: 'mifflin', label: 'Mifflin-St Jeor' },
  { value: 'harris-benedict', label: 'Harris-Benedict' },
  { value: 'katch-mcardle', label: 'Katch-McArdle' },
];

const inputId = computed(() => 'input-group-' + props.name);
</script>

<style scoped>
.base-formula-select {
  display: flex;
  flex-direction: column;
  position: relative;
}

.base-formula-select__label {
  position: absolute;
  top: 0;
  left: 0.5rem;
  transform: translateY(-50%) scale(0.8);
  transform-origin: left top;
  color: var(--_color-accent);
  font-size: 1rem;
  line-height: 1.5rem;
  padding: 0.125rem 0.25rem;
  background-color: var(--_bg-surface-2);
  border: 1px solid var(--_color-accent);
  border-radius: var(--_radius-fancy-small);
  pointer-events: none;
}

.base-formula-select__field {
  width: 100%;
  appearance: none;
  color: var(--_color-primary);
  background-color: var(--_bg-surface-2);
  border: 1px solid var(--_border-color);
  border-radius: var(--_radius-small);
  padding: 1rem;
  padding-right: 2.5rem;
  outline: 0;
  font-size: 1rem;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.base-formula-select__field:focus {
  border-color: var(--_color-accent);
  box-shadow: 0 0 0 1px var(--_color-accent);
}

.base-formula-select__icon {
  position: absolute;
  top: 50%;
  right: 0.75rem;
  transform: translateY(-50%);
  width: 1rem;
  height: 1rem;
  color: var(--_color-secondary);
  pointer-events: none;
  transition:
    transform 0.2s ease,
    color 0.2s ease;
}

.base-formula-select__field:focus ~ .base-formula-select__icon {
  transform: translateY(-50%) rotate(180deg);
  color: var(--_color-accent);
}
</style>
