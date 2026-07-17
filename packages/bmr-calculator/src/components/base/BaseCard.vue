<template>
  <div class="base-card">
    <div class="base-card__headline">
      <slot name="heading" />
    </div>
    <div class="base-card__body">
      <slot name="body" />
    </div>
    <div class="base-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.base-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--_gap-small);
  border-radius: var(--_radius-small);
  padding: var(--_padding-big);
  box-shadow: var(--_shadow);
  background-color: var(--_bg-surface);
  border: 1px solid var(--_border-color);
}

.base-card__headline {
  font-family: var(--_font-heading);
}
</style>
