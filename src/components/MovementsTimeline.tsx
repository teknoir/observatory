import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import { useChartDimensions } from "./ChartUtilities/utils"
import Chart from "./ChartUtilities/Chart"
import Circles from "./ChartUtilities/Circles"
import Axis from "./ChartUtilities/Axis"
import GridLines from "./ChartUtilities/GridLines"

const formatDateDayMonth = d3.timeFormat("%-b %-d")
const formatDateDayMonthHour = d3.timeFormat("%H:%M, %-b %-d")

export const MovementsTimeline = ({ data, xAccessor, yAccessor }) => {
  const lineWidth = 1
  const yAxisWidth = 0
  const chartWidth = 400

  const [timelapse, setTimelapse] = useState({ title: "Data Time", data: d3.extent(data, xAccessor), format: formatDateDayMonthHour })
  const [ref, dimensions] = useChartDimensions(null)
  const uniquePeripherals = [...new Set(data.map(yAccessor))];
  const scrollGroupRef = useRef(null)

  const defaultTranslate = yAxisWidth + lineWidth - dimensions.width / 2

  const currentTime = new Date()
  const time24HoursAgo = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000)
  const time1WeekAgo = new Date(currentTime.getTime() - 24 * 8 * 60 * 60 * 1000)
  const time1MonthAgo = new Date(currentTime.getTime() - 24 * 7 * 4 * 60 * 60 * 1000)

  const xScale = d3.scaleTime()
    // .domain(d3.extent(data, xAccessor))
    .domain(timelapse.data)
    .range([0, dimensions.boundedWidth * 7])

  const yScale = d3.scalePoint()
    .domain(uniquePeripherals)
    .range([dimensions.boundedHeight, 0])
    .padding(1)

  const xAccessorScaled = d => xScale(xAccessor(d))
  const yAccessorScaled = d => yScale(yAccessor(d))
  const keyAccessor = (d, i) => i

  function onScroll(scrollGroup, timelineContainer) {
    const timelineContainerWidth = timelineContainer.getBoundingClientRect().width
    const marginLeft = yAxisWidth + lineWidth
    const transformObj = d3.zoomTransform(scrollGroup.node())
    const maxStartTranslate = chartWidth / 2
    const maxEndTranslate = timelineContainerWidth - chartWidth / 2 - marginLeft

    let transformObjX = Math.max(transformObj.x, maxEndTranslate)
    transformObjX = Math.min(transformObj.x, maxStartTranslate)

    let translateX = defaultTranslate + transformObjX
    if (translateX > 0) translateX = 0
    scrollGroup.attr("transform", `translate(${translateX}, 0)`)
  }

  useEffect(() => {
    const scrollGroup = d3.select(scrollGroupRef.current)
    const timelineContainer = ref.current

    const d3Zoom = d3.zoom()
      .scaleExtent([1, 1])
      .on("zoom", () => onScroll(scrollGroup, timelineContainer))

    d3.select(timelineContainer)
      .call(d3Zoom)

    d3.select(timelineContainer)
      .call(d3Zoom.transform, d3.zoomIdentity)

    scrollGroup.attr("transform", `translate(${defaultTranslate}, 0)`)
  }, [])

  return (
    <div className="bg-[#1B263B] text-white">
      {/* TODO: Still have to figure out how to handle top menu for charts. For example this chart displays some data and has
      a couple of buttons to change the timeframe of the x axis. At the moment these are not part of the ref (Timeline) nor Chart component*/}
      <nav className="flex justify-between items-center p-5">
        <div className="flex flex-col items-end">
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
        <div className="flex items-center gap-1">
          <a>Show All Cameras</a>
          <button onClick={() => setTimelapse({ title: "Data Time", data: d3.extent(data, xAccessor), format: formatDateDayMonthHour })}>Data time</button>
          <button onClick={() => setTimelapse({ title: "Last 24 Hrs", data: [time24HoursAgo, currentTime], format: formatDateDayMonthHour })}>Last 24 hours</button>
          <button onClick={() => setTimelapse({ title: "Last Week", data: [time1WeekAgo, currentTime], format: formatDateDayMonth })}>Last week</button>
        </div>
      </nav>
      <div className="Timeline" ref={ref}>
        <Chart dimensions={dimensions}>
          <g ref={scrollGroupRef}>
            <Axis
              dimension="xScroll"
              scale={xScale}
              formatTick={timelapse.format}
            />
            <Circles
              data={data}
              keyAccessor={keyAccessor}
              xAccessor={xAccessorScaled}
              yAccessor={yAccessorScaled}
            />
          </g>
          <Axis
            dimension="y"
            scale={yScale}
          />
          <GridLines
            dimension="y"
            scale={yScale}
          />
        </Chart>
      </div >
    </div>
  )
}
