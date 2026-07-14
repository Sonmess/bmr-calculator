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
  gap: var(--brm-flex-gap);
  border-radius: var(--bmr-radius-big);
  padding: var(--bmr-padding-big);
}
</style>
