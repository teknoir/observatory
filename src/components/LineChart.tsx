// @ts-nocheck
import { useState } from "react"
import * as d3 from "d3"
import { useChartDimensions } from "./ChartUtilities/utils"
import Axis from "./ChartUtilities/Axis"
import Chart from "./ChartUtilities/Chart"
import Line from "./ChartUtilities/Line"

const formatDateDayMonth = d3.timeFormat("%-b %-d")
const formatDateDayMonthHour = d3.timeFormat("%H:%M, %-b %-d")

export const LineChart = ({ data, xAccessor, yAccessor }) => {
//export const LineChart = ({ data, xAccessor, yAccessor, colorAccessor }) => { 
  const [timelapse, setTimelapse] = useState({ data: d3.extent(data, xAccessor), format: formatDateDayMonth })
  const [ref, dimensions] = useChartDimensions(null)

  const currentTime = new Date()
  const time24HoursAgo = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000)
  const time1WeekAgo = new Date(currentTime.getTime() - 24 * 8 * 60 * 60 * 1000)
  const time1MonthAgo = new Date(currentTime.getTime() - 24 * 7 * 4 * 60 * 60 * 1000)

  const xScale = d3.scaleTime()
    // .domain(d3.extent(data, xAccessor))
    .domain(timelapse.data)
    .range([0, dimensions.boundedWidth])

  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yAccessor))
    .range([dimensions.boundedHeight, 0])
  
  const inScale = data.filter((item) => item.context == "in")
  const outScale = data.filter((item) => item.context == "out")
  const emptyScale = data.filter((item) => item.context == "")

  {/*
  const colorScale = d3.scaleOrdinal()
    .domain(["in", "out"])
    .range(["blue", "red"]);
   */}
  const xAccessorScaled = d => xScale(xAccessor(d))
  const yAccessorScaled = d => yScale(yAccessor(d))
  const keyAccessor = (d, i) => i

  //const colorAccessorFormated = d  => colorScale(colorAccessor(d))

  
  
  return (
    <div className="Timeline" ref={ref}>
      <button style={{ marginRight: '5px' }} onClick={() => setTimelapse({ data: d3.extent(data, xAccessor), format: formatDateDayMonth })}>Data time</button>
      <button style={{ marginRight: '5px' }} onClick={() => setTimelapse({ data: [time24HoursAgo, currentTime], format: formatDateDayMonthHour })}>Last 24 hours</button>
      <button style={{ marginRight: '5px' }} onClick={() => setTimelapse({ data: [time1WeekAgo, currentTime], format: formatDateDayMonth })}>Last week</button>
      <button style={{ marginRight: '5px' }} onClick={() => setTimelapse({ data: [time1MonthAgo, currentTime], format: formatDateDayMonth })}>Last month</button>
      <Chart dimensions={dimensions}>
        <Axis
          dimension="x"
          scale={xScale}
          formatTick={timelapse.format}
        />
        <Axis
          dimension="y"
          scale={yScale}
        />
        <Line
          data={inScale}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorScaled}
          color="blue"
        />
        <Line
          data={outScale}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorScaled}
          color="fuchsia"
        />
      </Chart>
    </div >
  )
}
