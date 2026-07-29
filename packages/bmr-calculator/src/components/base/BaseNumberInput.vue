<template>
  <div class="base-number-input">
    <label class="base-number-input__label" :for="inputId">{{ label }}</label>
    <input
      class="base-number-input__field"
      type="number"
      :id="inputId"
      :name="name"
      v-model.number="modelValue"
      placeholder=" "
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  label: String,
  name: String,
});

const modelValue = defineModel<number>();

const inputId = computed(() => 'input-group-' + props.name);
</script>

<style scoped>
.base-number-input {
  display: flex;
  flex-direction: column;
  position: relative;
}

.base-number-input__label {
  position: absolute;
  top: 50%;
  left: 0.5rem;
  transform: translateY(-50%);
  transform-origin: left top;
  color: var(--_color-secondary);
  font-size: 1rem;
  line-height: 1.5rem;
  padding: 0.125rem 0.25rem;
  cursor: text;
  pointer-events: none;
  transition:
    transform 0.2s ease,
    color 0.2s ease;
}

.base-number-input__field {
  width: 100%;
  color: var(--_color-primary);
  background-color: var(--_bg-surface-2);
  border: 1px solid var(--_border-color);
  border-radius: var(--_radius-small);
  padding: var(--_padding-small);
  outline: 0;
  font-size: 1.375rem;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.base-number-input__field::-webkit-inner-spin-button,
.base-number-input__field::-webkit-outer-spin-button {
  display: none;
}

.base-number-input__field:focus {
  border-color: var(--_color-accent);
  box-shadow: 0 0 0 1px var(--_color-accent);
}

/* floated state: focused OR has a value */
.base-number-input:has(.base-number-input__field:focus)
  .base-number-input__label,
.base-number-input:has(.base-number-input__field:not(:placeholder-shown))
  .base-number-input__label {
  top: 0;
  transform: translateY(-50%) scale(0.8);
  color: var(--_color-accent);
  background-color: var(--_bg-surface-2);
  border: 1px solid var(--_color-accent);
  border-radius: var(--_radius-fancy-small);
}
</style>
