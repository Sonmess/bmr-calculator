// Pure BMR formulas. No Vue, no DOM — just numbers in, numbers out.
// Each returns Basal Metabolic Rate in kilocalories per day (kcal/day).
//
// Keeping these pure (no side effects, no reliance on outside state) is what
// makes them trivial to unit-test and safe to reuse anywhere, including Nuxt SSR.

import type { BmrInput, Formula } from './types'

/**
 * Mifflin-St Jeor (1990) — the modern default, generally most accurate for the
 * average person.
 *   men:   10·kg + 6.25·cm − 5·age + 5
 *   women: 10·kg + 6.25·cm − 5·age − 161
 */
export function mifflinStJeor({ weightKg, heightCm, age, sex }: BmrInput): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age
  return sex === 'male' ? base + 5 : base - 161
}

/**
 * Harris-Benedict, revised by Roza & Shizgal (1984).
 *   men:   88.362 + 13.397·kg + 4.799·cm − 5.677·age
 *   women: 447.593 +  9.247·kg + 3.098·cm − 4.330·age
 */
export function harrisBenedict({ weightKg, heightCm, age, sex }: BmrInput): number {
  return sex === 'male'
    ? 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age
    : 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * age
}

/**
 * Katch-McArdle — based on lean body mass, so it needs body-fat % and ignores
 * sex, height and age.
 *   BMR = 370 + 21.6 · leanMassKg,  where leanMassKg = kg · (1 − bodyFat%/100)
 *
 * @throws if bodyFatPct is not provided.
 */
export function katchMcArdle({ weightKg, bodyFatPct }: BmrInput): number {
  if (bodyFatPct == null) {
    throw new Error('katchMcArdle requires bodyFatPct (0–100)')
  }
  const leanMassKg = weightKg * (1 - bodyFatPct / 100)
  return 370 + 21.6 * leanMassKg
}

/**
 * Dispatch to the chosen formula. Handy for the UI, which holds the selected
 * formula as a string. The `never` in the default branch makes TypeScript fail
 * the build if a new Formula value is added but not handled here.
 */
export function calculateBmr(formula: Formula, input: BmrInput): number {
  switch (formula) {
    case 'mifflin':
      return mifflinStJeor(input)
    case 'harris-benedict':
      return harrisBenedict(input)
    case 'katch-mcardle':
      return katchMcArdle(input)
    default: {
      const exhaustiveCheck: never = formula
      throw new Error(`Unknown formula: ${exhaustiveCheck}`)
    }
  }
}
