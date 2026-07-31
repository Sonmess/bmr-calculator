<template>
  <section class="base-card">
    <div class="base-card__headline">
      <slot name="heading" />
    </div>
    <div class="base-card__body">
      <slot name="body" />
    </div>
    <div v-if="$slots.footer" class="base-card__footer">
      <slot name="footer" />
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.base-card {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--_gap-big);
  border-radius: var(--_radius-small);
  padding: var(--_padding-small);
  box-shadow: var(--_shadow);
  background-color: var(--_bg-surface);
  border: 1px solid var(--_border-color);
}

.base-card__headline {
  font-family: var(--_font-heading);
  border-bottom: 1px solid var(--_border-color);
  padding-bottom: 0.25rem;
  text-align: center;
}

.base-card :deep(p) {
  padding: 0;
  margin: 0;
}

.base-card :deep(h2) {
  font-size: 1.5rem;
  line-height: 1.25;
  padding: 0;
  margin: 0;
}

.base-card__body {
  display: flex;
  flex-direction: column;
  gap: var(--_gap-big);
}
</style>
