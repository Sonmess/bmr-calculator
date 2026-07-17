import {
  reactive,
  ref,
  computed,
  provide,
  inject,
  type Ref,
  type ComputedRef,
  type InjectionKey,
} from 'vue';
import { calculateBmr } from '../core/formulas';
import type { BmrInput, Formula } from '../core/types';

/**
 * The shape of the shared BMR form state. One instance is created per widget
 * and shared with every card via provide/inject.
 */
export interface BmrForm {
  /** Reactive user inputs (metric). Read and write freely from any card. */
  input: BmrInput;
  /** Currently selected formula. */
  formula: Ref<Formula>;
  /** True when the selected formula needs a body-fat %. */
  needsBodyFat: ComputedRef<boolean>;
  /** Whether every relevant input is present and sane. */
  isValid: ComputedRef<boolean>;
  /** BMR in kcal/day, or null while inputs are invalid/incomplete. */
  result: ComputedRef<number | null>;
}

/**
 * Build a fresh, self-contained slice of reactive form state. Kept private so
 * the only ways in are provide/use below — that guarantees a single shared
 * instance per widget rather than accidental duplicates.
 */
function createBmrForm(): BmrForm {
  const formula = ref<Formula>('mifflin');

  const input = reactive<BmrInput>({
    weightKg: 70,
    heightCm: 175,
    age: 30,
    sex: 'male',
    bodyFatPct: 22,
  });

  const needsBodyFat = computed(() => formula.value === 'katch-mcardle');

  const isValid = computed(() => {
    // Number.isFinite rejects both NaN and the empty-string an emptied number
    // input produces, so `result` stays null until every field is genuinely set.
    const measurements = [input.weightKg, input.heightCm, input.age];
    if (!measurements.every((n) => Number.isFinite(n) && n > 0)) {
      return false;
    }
    
    if (needsBodyFat.value) {
      const bf = input.bodyFatPct;
      return typeof bf === 'number' && Number.isFinite(bf) && bf >= 0 && bf < 100;
    }
    return true;
  });

  const result = computed<number | null>(() => {
    if (!isValid.value) return null;
    return Math.round(calculateBmr(formula.value, input));
  });

  return { input, formula, needsBodyFat, isValid, result };
}

// A unique InjectionKey makes inject() type-safe (returns BmrForm | undefined)
// and collision-proof against any other provided value.
const BMR_FORM_KEY: InjectionKey<BmrForm> = Symbol('bmr-form');

/**
 * Create the shared form state and provide it to descendants.
 * Call ONCE, at the top of the widget (BmrCalculator).
 */
export function provideBmrForm(): BmrForm {
  const form = createBmrForm();
  provide(BMR_FORM_KEY, form);
  return form;
}

/**
 * Access the shared form state from any descendant of BmrCalculator.
 * Throws if used with no provideBmrForm() ancestor — a loud, early failure
 * beats silently getting undefined.
 */
export function useBmrForm(): BmrForm {
  const form = inject(BMR_FORM_KEY);
  if (!form) {
    throw new Error(
      '[useBmrForm] No BMR form provided. Use this inside <BmrCalculator>, which calls provideBmrForm().',
    );
  }
  return form;
}
