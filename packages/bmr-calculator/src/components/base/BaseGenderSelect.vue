<template>
  <div class="base-gender-select">
    <span class="base-gender-select__label">{{ label }}</span>
    <div
      class="base-gender-select__group"
      role="radiogroup"
      :aria-label="label"
    >
      <label
        v-for="option in options"
        :key="option.value"
        class="base-gender-select__option"
        :class="{
          'base-gender-select__option--active': modelValue === option.value,
        }"
      >
        <input
          class="base-gender-select__input"
          type="radio"
          :name="name"
          :value="option.value"
          v-model="modelValue"
        />
        {{ option.label }}
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Gender } from '../../core/types';

defineProps({
  label: String,
  name: String,
});

const modelValue = defineModel<Gender>();

const options: { value: Gender; label: string }[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];
</script>

<style scoped>
.base-gender-select {
  display: flex;
  flex-direction: column;
  position: relative;
}

.base-gender-select__label {
  color: var(--_color-accent);
  position: absolute;
  left: 0;
  top: 0;
  transform: translateY(-50%) scale(0.8);
  padding: 0.125rem 0.25rem;
  background-color: var(--_bg-surface-2);
  border: 1px solid var(--_color-accent);
  border-radius: var(--_radius-fancy-small);
  line-height: 1.5rem;
}

.base-gender-select__group {
  display: flex;
  gap: 0.25rem;
  background-color: var(--_bg-surface-2);
  border: 1px solid var(--_border-color);
  border-radius: var(--_radius-small);
  padding: var(--_padding-small);
}

.base-gender-select__option {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.125rem 0.5rem;
  min-width: 6rem;
  border: 1px solid transparent;
  border-radius: var(--_radius-fancy-small);
  color: var(--_color-secondary);
  font-size: 1rem;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.base-gender-select__option--active {
  background-color: var(--_bg-surface);
  border-color: var(--_color-accent);
  color: var(--_color-primary);
}

.base-gender-select__input {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
}

.base-gender-select__option:has(.base-gender-select__input:focus-visible) {
  box-shadow: 0 0 0 1px var(--_color-accent);
}
</style>
