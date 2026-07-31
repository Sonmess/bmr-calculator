import { describe, it, expect } from 'vitest';
import { calculateTdee, ACTIVITY_LEVELS } from './activity';

describe('calculateTdee', () => {
  // 1780 * 1.2 = 2136
  it('computes maintenance calories for a given multiplier', () => {
    expect(calculateTdee(1780, 1.2)).toBe(2136);
  });

  it('rounds to the nearest whole calorie', () => {
    expect(calculateTdee(1751, 1.375)).toBe(Math.round(1751 * 1.375));
  });
});

describe('ACTIVITY_LEVELS', () => {
  it('is ordered from least to most active', () => {
    const multipliers = ACTIVITY_LEVELS.map((row) => row.multiplier);
    const sorted = [...multipliers].sort((a, b) => a - b);
    expect(multipliers).toEqual(sorted);
  });
});
