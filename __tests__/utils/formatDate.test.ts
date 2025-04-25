import { describe, it, expect } from 'vitest';
import { formatDate } from '@/lib/utils';

describe('formatDate', () => {
  it('returns "1 day ago" for a date from yesterday', () => {
    const yesterday = new Date();
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);
    expect(formatDate(yesterday.toISOString())).toBe('1 day ago');
  });

  it('returns "X days ago" for dates within the last 30 days', () => {
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
    expect(formatDate(fiveDaysAgo.toISOString())).toBe('5 days ago');
  });

  it('returns formatted date for dates older than 30 days', () => {
    const oldDate = new Date('2023-01-15');
    const formatted = formatDate(oldDate.toISOString());
    expect(formatted).toMatch(/^[A-Z][a-z]{2} \d{1,2}$/);
  });
});
