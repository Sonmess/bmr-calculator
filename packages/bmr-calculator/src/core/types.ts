// Shared types for the BMR core logic.
// Everything is metric: weight in kg, height in cm, age in years.

export type Sex = 'male' | 'female'

export type Formula = 'mifflin' | 'harris-benedict' | 'katch-mcardle'

export interface BmrInput {
  /** Body weight in kilograms. */
  weightKg: number
  /** Height in centimetres. */
  heightCm: number
  /** Age in years. */
  age: number
  /** Biological sex — used by Mifflin-St Jeor and Harris-Benedict. */
  sex: Sex
  /**
   * Body-fat percentage (0–100).
   * Required ONLY by the Katch-McArdle formula, which ignores sex/height/age.
   */
  bodyFatPct?: number
}
