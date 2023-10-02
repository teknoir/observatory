import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import { NumberValue } from "d3"
import { Axis, Chart, Circles, GridLines } from "components/ChartUtilities"
import { useChartDimensions } from "./ChartUtilities/utils"

const formatDateDayMonth = d3.timeFormat("%-b %-d")
// const formatDateDayMonthHour = d3.timeFormat("%H:%M, %-b %-d")
const formatDateDayMonthHour = d3.timeFormat("%I %p, %-b %-d")

interface MovementsTimeLineParams {
  data: Array<object>
  xAccessor: (d: object) => Date | NumberValue
  yAccessor: (d: object) => string
}

interface TimelapseParams {
  title: string
  timeRange: Array<Date | NumberValue>
  format: (d: Date) => string
}

export const MovementsTimeline = ({ data, xAccessor, yAccessor }: MovementsTimeLineParams) => {
  const [timelapse, setTimelapse] = useState<TimelapseParams>({
    title: "Data Time",
    timeRange: d3.extent(data, xAccessor) as Array<Date | NumberValue>,
    format: formatDateDayMonthHour
  })
  const [ref, dimensions] = useChartDimensions(null)
  const [defaultTranslate, setDefaultTranslate] = useState<number>(0)
  const scrollGroupRef = useRef<SVGGElement | null>(null)
  const peripherals = Array.from(new Set(data.map(yAccessor)))
  const currentTime = new Date()
  const time24HoursAgo = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000)
  const time1WeekAgo = new Date(currentTime.getTime() - 24 * 8 * 60 * 60 * 1000)
  // const time1MonthAgo = new Date(currentTime.getTime() - 24 * 7 * 4 * 60 * 60 * 1000)

  const xScale = d3.scaleTime()
    .domain(timelapse.timeRange)
    .range([0, dimensions.boundedWidth * 6])

  const yScale = d3.scalePoint()
    .domain(peripherals)
    .range([dimensions.boundedHeight, 0])
    .padding(1)

  const xAccessorScaled = (d: object) => xScale(xAccessor(d))
  const yAccessorScaled = (d: object) => yScale(yAccessor(d))
  const keyAccessor = (_: null, i: number) => i

  useEffect(() => {
    setDefaultTranslate(-dimensions.boundedScrollWidth + dimensions.boundedWidth)
  }, [dimensions])

  useEffect(() => {
    const scrollGroup = d3.select<SVGGElement, unknown>(scrollGroupRef.current!)
    const timelineContainer = d3.select<HTMLElement, unknown>(ref.current!)

    const d3Zoom = d3.zoom<HTMLElement, unknown>()
      .scaleExtent([1, 1])
      .on("zoom", () => onScroll(scrollGroup as d3.Selection<SVGGElement, unknown, null, undefined>))

    timelineContainer
      .call(d3Zoom)

    timelineContainer
      .call(d3Zoom.transform, d3.zoomIdentity)

    scrollGroup
      .attr("transform", `translate(${defaultTranslate}, 0)`)
  }, [defaultTranslate])

  function onScroll(scrollGroup: d3.Selection<SVGGElement, unknown, null, undefined>) {
    const transformObj = d3.zoomTransform(scrollGroup.node() as SVGGElement)
    // TODO: This approach is an alternative to not modify the resulting
    // d3.zoomTransform() object, but it needs some logic to work 
    // const transformObj = { ...d3.zoomTransform(scrollGroup.node()) }

    const maxStartTranslate = 0
    const maxEndTranslate = dimensions.boundedScrollWidth - dimensions.boundedWidth

    // TODO: Replace these @ts-ignore comments for a different logic where is
    // no necessary to replace the x property of transformObj (which comes from
    // d3.zoomTransform). These properties of the object are read-only by definition
    // and should not be modified as I'm currently doing right now:
    // 
    // @ts-ignore
    transformObj.x = Math.max(transformObj.x, maxStartTranslate)
    // @ts-ignore
    transformObj.x = Math.min(transformObj.x, maxEndTranslate)

    const translateX = defaultTranslate + transformObj.x
    scrollGroup.attr("transform", `translate(${translateX}, 0)`)
  }

  return (
    <div className="bg-[#1C1C1C] text-[#E0DED9]">
      {/* TODO: Still have to figure out how to handle top menu for charts. For example this chart displays some data and has
      a couple of buttons to change the timeframe of the x axis. At the moment these are not part of the ref (Timeline) nor Chart component*/}
      <nav className="flex justify-between items-center p-5">
        <div className="flex flex-col items-end">
          All Cameras
          <span>{peripherals.length} Total</span>
        </div>
        <div className="flex gap-5">
          Movement {timelapse.title}
          <div className="flex items-center gap-1">
            <div className="w-[10px] h-[10px] bg-[#3B61BF] rounded-full"></div>
            Detections
          </div>
          <div className="flex items-center gap-1">
            <div className="w-[10px] h-[10px] bg-[#9B357D] rounded-full"></div>
            Motion
          </div>
        </div>
        <div className="flex items-center gap-1">
          <a className="text-[#E0DED9]">Show All Cameras</a>
          <button
            onClick={() => {
              setTimelapse({
                title: "Data Time",
                timeRange: d3.extent(data, xAccessor) as Array<Date | NumberValue>,
                format: formatDateDayMonthHour
              })
            }}
          >
            Data time
          </button>
          <button
            onClick={() => {
              setTimelapse({
                title: "Last 24 Hrs",
                timeRange: [time24HoursAgo, currentTime],
                format: formatDateDayMonthHour
              })
            }}
          >
            Last 24 hours
          </button>
          <button
            onClick={() => {
              setTimelapse({
                title: "Last Week",
                timeRange: [time1WeekAgo, currentTime],
                format: formatDateDayMonth
              })
            }}
          >
            Last week
          </button>
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
            background="true"
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
