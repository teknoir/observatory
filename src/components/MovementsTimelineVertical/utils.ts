import * as d3 from 'd3';
import moment from 'moment';
import { ChartDimensions } from 'ts/types';
import { MovementsTimelinePeriod } from './enums';

const formatDateByDay = d3.timeFormat('%-b %-d');
const formatDateByTime = d3.timeFormat('%-I:%M %p');

export const formatDate = (period: MovementsTimelinePeriod) => {
  return period === MovementsTimelinePeriod.DAYS_1
    ? formatDateByTime
    : formatDateByDay;
};

export const yScale = (startTime: Date, dimensions: ChartDimensions) => {
  return d3
    .scaleTime()
    .domain([startTime, moment().toDate()])
    .range([0, dimensions.boundedScrollHeight]);
};
