<script setup lang="ts">
// Local dev harness ONLY. This is not part of the published library — it exists
// so `pnpm --filter bmr-calculator dev` renders the component in isolation while
// you build it. The library's real entry is src/index.ts.
import BmrCalculator from './components/BmrCalculator.vue'
</script>

<template>
  <div class="dev-harness">
    <h1>bmr-calculator · dev harness</h1>
    <BmrCalculator />
  </div>
</template>

<style scoped>
.dev-harness {
  max-width: 640px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: system-ui, sans-serif;
}
</style>
