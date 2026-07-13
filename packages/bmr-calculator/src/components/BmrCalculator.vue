<script setup lang="ts">
// Phase 2 lives here. Build the real UI:
//   - a formula selector: Mifflin-St Jeor / Harris-Benedict / Katch-McArdle
//   - reactive metric inputs (kg / cm / years; + body-fat % for Katch-McArdle)
//   - a computed result driven by the pure functions in ../core/formulas
//   - per-formula field show/hide + input validation
//
// Keep it SSR-safe for Nuxt: no window/document access here or at module top
// level — only inside onMounted or event handlers.
</script>

<template>
  <div class="bmr-calculator">
    <p>BMR Calculator — component stub. Build the UI here in Phase 2.</p>
  </div>
</template>

<style scoped>
.bmr-calculator {
  /* Theme hooks: host apps override these CSS variables to restyle the widget.
     Always provide a fallback so the component looks right with zero config. */
  color: var(--bmr-fg, #1f2937);
  background: var(--bmr-bg, #ffffff);
  font-family: var(--bmr-font, system-ui, sans-serif);
  border-radius: var(--bmr-radius, 12px);
  padding: var(--bmr-padding, 1.5rem);
}
</style>
