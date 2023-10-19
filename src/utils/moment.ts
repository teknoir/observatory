import moment, { Moment } from 'moment';

const today = moment();

const yesterday = moment().subtract(1, 'd');

export const isToday = (date: Moment) => date.isSame(today, 'd');

export const isYesterday = (date: Moment) => date.isSame(yesterday, 'd');
