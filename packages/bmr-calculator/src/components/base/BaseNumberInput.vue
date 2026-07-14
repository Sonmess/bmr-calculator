<template>
  <div class="base-number-input">
    <label class="base-number-input__label" :for="inputId">{{ label }}</label>
    <input
      class="base-number-input__field"
      type="number"
      :id="inputId"
      :name="name"
      v-model.number="modelValue"
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
  gap: var(--bmr-flex-gap-small);
}
</style>
