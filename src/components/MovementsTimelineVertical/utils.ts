import * as d3 from 'd3';
import moment from 'moment';
import { ChartDimensions } from 'ts/types';

export const formatDateByDay = d3.timeFormat('%-b %-d');
export const formatDateByTime = d3.timeFormat('%-I:%M %p');

export const yScale = (startTime: Date, dimensions: ChartDimensions) => {
  return d3
    .scaleTime()
    .domain([startTime, moment().toDate()])
    .range([dimensions.boundedScrollHeight, 0]);
};
