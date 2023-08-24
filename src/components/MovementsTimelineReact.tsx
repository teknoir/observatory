import { useState } from "react"
import * as d3 from "d3"
import { useChartDimensions } from "./ChartUtilities/utils"
import Chart from "./ChartUtilities/Chart"
import Circles from "./ChartUtilities/Circles"
import Axis from "./ChartUtilities/Axis"
import GridLines from "./ChartUtilities/GridLines"

const formatDateDayMonth = d3.timeFormat("%-b %-d")
const formatDateDayMonthHour = d3.timeFormat("%H:%M, %-b %-d")

export const MovementsTimelineReact = ({ data, xAccessor, yAccessor }) => {
  const [timelapse, setTimelapse] = useState({ title: "Data Time", data: d3.extent(data, xAccessor), format: formatDateDayMonth })
  const [ref, dimensions] = useChartDimensions(null)
  const uniquePeripherals = [...new Set(data.map(yAccessor))];

  const currentTime = new Date()
  const time24HoursAgo = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000)
  const time1WeekAgo = new Date(currentTime.getTime() - 24 * 8 * 60 * 60 * 1000)
  const time1MonthAgo = new Date(currentTime.getTime() - 24 * 7 * 4 * 60 * 60 * 1000)

  const xScale = d3.scaleTime()
    // .domain(d3.extent(data, xAccessor))
    .domain(timelapse.data)
    .range([0, dimensions.boundedWidth])

  const yScale = d3.scalePoint()
    .domain(uniquePeripherals)
    .range([dimensions.boundedHeight, 0])
    .padding(1)

  const xAccessorScaled = d => xScale(xAccessor(d))
  const yAccessorScaled = d => yScale(yAccessor(d))
  const keyAccessor = (d, i) => i

  return (
    <div className="Timeline" ref={ref}>
      {/* <button onClick={() => setTimelapse({ title: "Last Month", data: [time1MonthAgo, currentTime], format: formatDateDayMonth })}>Last month</button> */}
      <nav className="flex justify-between items-start">
        <div className="flex flex-col">
          All Cameras
          <span>{uniquePeripherals.length} Total</span>
        </div>
        <div className="flex gap-5">
          Movement {timelapse.title}
          <div className="flex items-center gap-1">
            <div className="w-[10px] h-[10px] bg-[#F875DA] rounded-full"></div>
            Detections
          </div>
          <div className="flex items-center gap-1">
            <div className="w-[10px] h-[10px] bg-[#9980FA] rounded-full"></div>
            Motion
          </div>
        </div>
        <div>
          <a>Show All Cameras</a>
          <button onClick={() => setTimelapse({ title: "Data Time", data: d3.extent(data, xAccessor), format: formatDateDayMonth })}>Data time</button>
          <button onClick={() => setTimelapse({ title: "Last 24 Hrs", data: [time24HoursAgo, currentTime], format: formatDateDayMonthHour })}>Last 24 hours</button>
          <button onClick={() => setTimelapse({ title: "Last Week", data: [time1WeekAgo, currentTime], format: formatDateDayMonth })}>Last week</button>
        </div>
      </nav>
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
        <GridLines
          dimension="y"
          scale={yScale}
        />
        <Circles
          data={data}
          keyAccessor={keyAccessor}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorScaled}
        />
      </Chart>
    </div >
  )
}
