import * as d3 from 'd3';
import { MovementsTimelinePeriod } from './enums';
import moment from 'moment';

const formatDateByDay = d3.timeFormat('%-b %-d');
const formatDateByTime = d3.timeFormat('%-I:%M %p');

export const formatDate = (period: MovementsTimelinePeriod) => {
  return period === MovementsTimelinePeriod.DAYS_1
    ? formatDateByTime
    : formatDateByDay;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const xScale = (startTime: Date, dimensions) => {
  return d3
    .scaleTime()
    .domain([startTime, moment().toDate()])
    .range([0, dimensions.boundedWidth * 6]);
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const yScale = (peripherals: Array<string>, dimensions) => {
  return d3
    .scalePoint()
    .domain(peripherals)
    .range([dimensions.boundedHeight, 0])
    .padding(1);
};
