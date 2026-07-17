<template>
  <section class="bmr-calculator__info">
    <base-card>
      <template #heading>
        <h2>{{ headline }}</h2>
      </template>

      <template #body>
        <p>
          Fill in the weight, height, age and sex attributes below to calculate
          your basal metabolism rate:
        </p>
      </template>

      <template #footer>
        <p>
          BMR Definition: Your Basal Metabolic Rate (BMR) is the number of
          calories you burn as your body performs basic (basal) life-sustaining
          function. Commonly also termed as Resting Metabolic Rate (RMR), which
          is the calories burned if you stayed in bed all day. In either case,
          many utilize the basal metabolic rate formula to calculate their
          body’s metabolism rate. Your BMR defines your basal metabolism rate
          which makes up about 60-70% of the calories we use (“burn” or expend).
          This includes the energy your body uses to maintain the basic function
          of your living and breathing body, including: The beating of our heart
          Cell production Respiration The maintenance of body temperature
          Circulation Nutrient processing Your unique metabolism rate, or BMR,
          is influenced by a number of factors including age, weight, height,
          gender, environmental temperature, dieting, and exercise habits.
        </p>
      </template>
    </base-card>
  </section>
</template>

<script setup lang="ts">
import BaseCard from '../base/BaseCard.vue';

defineProps({
  headline: String,
});
</script>
