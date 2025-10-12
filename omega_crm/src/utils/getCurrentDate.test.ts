import { expect, test } from 'vitest';
import getCurrentDate, { prefixNum } from './getCurrentDate';


test('prefixes single digits with a zero and returns as a string', () => {
  expect(prefixNum(9)).toBe('09');
  expect(prefixNum(10)).toBe('10');
});

test('function returns a date in string format that the date picker accepts', () => {
  const date = new Date(2025, 9, 12);

  expect(getCurrentDate(date)).toBe('2025-10-12');
});