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

export const dateFormat = (date: string) => {
  const startDate = moment(date);
  let dayName = '';
  if (startDate.isSame(moment(), 'day')) {
    dayName = 'Today, ';
  } else if (startDate.isSame(moment().subtract(1, 'day'), 'day')) {
    dayName = 'Yesterday, ';
  } else {
    dayName = startDate.format('MMMM DD, YYYY') + ', ';
  }
  return dayName + ' ' + startDate.format('HH:mm');
};
