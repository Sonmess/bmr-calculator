<script setup lang="ts">
// The public demo site. Once the workspace link is wired (add "bmr-calculator":
// "workspace:*" to this app's package.json and re-run pnpm install), import and
// render the library:
//   import { BmrCalculator } from 'bmr-calculator'
</script>

<template>
  <main class="site">
    <h1>BMR Calculator</h1>
    <p>Demo site — the calculator component will be mounted here.</p>
  </main>
</template>

<style scoped>
.site {
  max-width: 640px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: system-ui, sans-serif;
}
</style>
