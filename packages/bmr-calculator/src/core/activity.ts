// TDEE (Total Daily Energy Expenditure) — a pure derivation of BMR by a fixed
// activity-level multiplier. No Vue, no DOM, same spirit as formulas.ts.

export type ActivityLevel =
  | 'sedentary'
  | 'light'
  | 'moderate'
  | 'active'
  | 'very-active';

export interface ActivityLevelOption {
  level: ActivityLevel;
  label: string;
  multiplier: number;
}

/**
 * Standard Harris-Benedict-derived activity multipliers, used by most BMR
 * calculators to estimate maintenance calories from BMR.
 */
export const ACTIVITY_LEVELS: ActivityLevelOption[] = [
  { level: 'sedentary', label: 'Little to no exercise', multiplier: 1.2 },
  {
    level: 'light',
    label: 'Light exercise 1-3 times per week',
    multiplier: 1.375,
  },
  {
    level: 'moderate',
    label: 'Moderate exercise 3-5 times per week',
    multiplier: 1.55,
  },
  {
    level: 'active',
    label: 'Heavy exercise 5-6 times per week',
    multiplier: 1.725,
  },
  {
    level: 'very-active',
    label: 'Heavy exercise 6-7 times per week',
    multiplier: 1.9,
  },
];

/** Maintenance calories (kcal/day) for a given BMR and activity multiplier. */
export function calculateTdee(bmr: number, multiplier: number): number {
  return Math.round(bmr * multiplier);
}
