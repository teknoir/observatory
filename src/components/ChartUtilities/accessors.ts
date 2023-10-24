// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// D3 accessors

import * as d3 from "d3"

// Movements Timeline Accessors
export const timeParser = d3.timeParse("%m/%d/%Y")
export const formatTime = d => new Date(Number(d)).toLocaleDateString("en-US")
export const dateAccessor = d => timeParser(formatTime(d.timestamp))
export const startTimeAccessor = d => d3.isoParse(d.start_time)
export const detectionIdAccessor = d => d.detection_id
export const peripheralIdAccessor = d => d.peripheral_id
export const peripheralNameAccessor = d => d.peripheral_name
export const countAccessor = d => d.count

export const eventAccessor = d => d.event_name;
export const contextAccessor = d => d.context;

export const dateTemperatureAccessor = d => timeParser(d.date)
export const temperatureAccessor = d => d.temperature
