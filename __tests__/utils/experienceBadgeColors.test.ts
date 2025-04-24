import { describe, it, expect } from 'vitest';
import { experienceBadgeColors } from '@/lib/utils';

describe('experienceBadgeColors', () => {
  it('returns correct colors for Entry Level', () => {
    expect(experienceBadgeColors('Entry Level')).toBe(
      'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
    );
  });

  it('returns correct colors for Mid Level', () => {
    expect(experienceBadgeColors('Mid Level')).toBe(
      'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
    );
  });

  it('returns correct colors for Senior Level', () => {
    expect(experienceBadgeColors('Senior Level')).toBe(
      'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300'
    );
  });

  it('returns correct colors for Executive', () => {
    expect(experienceBadgeColors('Executive')).toBe(
      'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
    );
  });

  it('returns default colors for unknown experience level', () => {
    expect(experienceBadgeColors('Unknown')).toBe(
      'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
    );
  });
});