import { expect, test } from 'vitest';
import displayPhone from './displayPhone';

test('displays phone number in a user-friendly format', () => {
  expect(displayPhone('1234567890')).toBe('(123) 456-7890');
});