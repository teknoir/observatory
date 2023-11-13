import { expect, test } from 'vitest';
import moment from 'moment';
import { isToday, isYesterday } from './moment';

test('check if date is today', () => {
  const date = moment();
  expect(isToday(date)).toEqual(true);
});

test('check if date is yesterday', () => {
  const date = moment().subtract(1, 'day');
  expect(isYesterday(date)).toEqual(true);
});
