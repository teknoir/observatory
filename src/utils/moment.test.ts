import { expect, test } from 'vitest';
import moment from 'moment';
import { isToday, isYesterday, formatUnit, durationToMMSS } from './moment';

test('check if date is today', () => {
  const date = moment();
  expect(isToday(date)).toEqual(true);
});

test('check if date is yesterday', () => {
  const date = moment().subtract(1, 'day');
  expect(isYesterday(date)).toEqual(true);
});

test('format value less 10', () => {
  expect(formatUnit(8)).toEqual('08');
});

test('format value more 10', () => {
  expect(formatUnit(12)).toEqual('12');
});

test('convert value in milliseconds to MM:SS', () => {
  expect(durationToMMSS(121000)).toEqual('02:01');
});
