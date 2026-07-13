<script setup lang="ts">
// Imported from the local library via the workspace symlink (pnpm).
// Editing the library updates this instantly — no rebuild, no republish.
import { BmrCalculator } from 'bmr-calculator'
</script>

<template>
  <main class="site">
    <h1>BMR Calculator</h1>
    <p class="tagline">Estimate your Basal Metabolic Rate.</p>
    <BmrCalculator />
  </main>
</template>

<style scoped>
.site {
  max-width: 640px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: system-ui, sans-serif;
}

.tagline {
  color: #6b7280;
  margin-bottom: 1.5rem;
}
</style>
