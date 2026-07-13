import { describe, it, expect } from 'vitest';
import {
  mifflinStJeor,
  harrisBenedict,
  katchMcArdle,
  calculateBmr,
} from './formulas';
import type { BmrInput } from './types';

// A single reference person we reuse across tests.
// 80 kg, 180 cm, 30 years, 20% body fat.
const male: BmrInput = {
  weightKg: 80,
  heightCm: 180,
  age: 30,
  sex: 'male',
  bodyFatPct: 20,
};
const female: BmrInput = { ...male, sex: 'female' };

describe('mifflinStJeor', () => {
  // 10*80 + 6.25*180 - 5*30 + 5 = 800 + 1125 - 150 + 5
  it('computes male BMR', () => {
    expect(mifflinStJeor(male)).toBe(1780);
  });

  // 10*80 + 6.25*180 - 5*30 - 161 = 800 + 1125 - 150 - 161
  it('computes female BMR', () => {
    expect(mifflinStJeor(female)).toBe(1614);
  });

  it('male differs from female by 166 (the +5 vs -161 constant gap)', () => {
    expect(mifflinStJeor(male) - mifflinStJeor(female)).toBe(166);
  });
});

describe('harrisBenedict', () => {
  it('computes male BMR', () => {
    expect(harrisBenedict(male)).toBeCloseTo(1853.632, 3);
  });

  it('computes female BMR', () => {
    expect(harrisBenedict(female)).toBeCloseTo(1615.093, 3);
  });
});

describe('katchMcArdle', () => {
  // leanMass = 80 * (1 - 0.20) = 64 kg;  370 + 21.6*64 = 1752.4
  it('computes BMR from lean body mass', () => {
    expect(katchMcArdle(male)).toBeCloseTo(1752.4, 5);
  });

  it('ignores sex (same result for male and female inputs)', () => {
    expect(katchMcArdle(male)).toBe(katchMcArdle(female));
  });

  it('at 0% body fat, lean mass equals full weight', () => {
    // 370 + 21.6 * 80 = 2098
    expect(katchMcArdle({ ...male, bodyFatPct: 0 })).toBeCloseTo(2098, 5);
  });

  it('throws when bodyFatPct is missing', () => {
    const noFat: BmrInput = {
      weightKg: 80,
      heightCm: 180,
      age: 30,
      sex: 'male',
    };
    expect(() => katchMcArdle(noFat)).toThrow(/bodyFatPct/);
  });
});

describe('calculateBmr (dispatcher)', () => {
  it('routes to the correct formula', () => {
    expect(calculateBmr('mifflin', male)).toBe(mifflinStJeor(male));
    expect(calculateBmr('harris-benedict', male)).toBe(harrisBenedict(male));
    expect(calculateBmr('katch-mcardle', male)).toBe(katchMcArdle(male));
  });
});
