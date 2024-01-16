import moment, { Moment } from 'moment';

const today = moment();

const yesterday = moment().subtract(1, 'd');

export const isToday = (date: Moment) => date.isSame(today, 'd');

export const isYesterday = (date: Moment) => date.isSame(yesterday, 'd');

export const formatUnit = (value: number) =>
  `${value < 10 ? `0${value}` : value}`;

export const durationToMMSS = (milliseconds: number) => {
  const duration = moment.duration(milliseconds);
  return formatUnit(duration.minutes()) + ':' + formatUnit(duration.seconds());
};
