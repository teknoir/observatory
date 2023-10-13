import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import Button from "muiComponents/Button/Button"
import { Axis, Chart, Circles, GridLines } from "components/ChartUtilities"
import { useChartDimensions } from "components/ChartUtilities/utils"
import { MovementsTimeLineParams, TimelapseParams } from "ts/types"
import styles from "./MovementsTimeline.module.scss"

const formatDateDayMonth = d3.timeFormat("%-b %-d")
const formatDateDayMonthHour = d3.timeFormat("%I %p, %-b %-d")

export const MovementsTimeline = ({ dataMotions, dataAlerts, xAccessor, yAccessor }: MovementsTimeLineParams) => {
  const [ref, dimensions] = useChartDimensions(null)
  const [defaultTranslate, setDefaultTranslate] = useState<number>(0)
  const scrollGroupRef = useRef<SVGGElement | null>(null)
  const currentTime = new Date()
  const time24HoursAgo = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000)
  const time1WeekAgo = new Date(currentTime.getTime() - 24 * 8 * 60 * 60 * 1000)
  const [timelapse, setTimelapse] = useState<TimelapseParams>({
    title: "Data Time",
    timeRange: [0, 0],
    format: formatDateDayMonthHour
  })
  const [peripherals, setPeripherals] = useState([""])

  useEffect(() => {
    // TODO: is this condition necessary?
    if (dataMotions && dataAlerts) {
      setTimelapse(prevTimelapse => (
        {
          ...prevTimelapse,
          // TODO: fix concat
          timeRange: d3.extent(dataMotions.concat(dataAlerts), xAccessor) as Array<Date | number>,
        }
      ))
      // TODO: add dataAlerts
      setPeripherals(Array.from(new Set(dataMotions.map(yAccessor))))
    }
  }, [dataMotions, dataAlerts])

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
    <div className={styles.container}>
      {/* TODO: Still have to figure out how to handle top menu for charts. For example this chart displays some data and has
      a couple of buttons to change the timeframe of the x axis. At the moment these are not part of the ref (Timeline) nor Chart component*/}
      <nav className={styles.menuLayout}>
        <div className={styles.menuItem}>
          <a className={styles.linkText}>
            Show All Cameras
          </a>
          <Button
            onClick={() => {
              setTimelapse({
                title: "Data Time",
                timeRange: d3.extent(dataMotions.concat(dataAlerts), xAccessor) as Array<Date | number>,
                format: formatDateDayMonthHour
              })
            }}
          >
            Data time
          </Button>
          <Button
            onClick={() => {
              setTimelapse({
                title: "Last 24 Hrs",
                timeRange: [time24HoursAgo, currentTime],
                format: formatDateDayMonthHour
              })
            }}
          >
            Last 24 hours
          </Button>
          <Button
            onClick={() => {
              setTimelapse({
                title: "Last Week",
                timeRange: [time1WeekAgo, currentTime],
                format: formatDateDayMonth
              })
            }}
          >
            Last week
          </Button>
        </div>
      </nav>
      <div className="Timeline" ref={ref}>
        <Chart dimensions={dimensions}>
          <GridLines
            dimension="y"
            scale={yScale}
          />
          <g ref={scrollGroupRef}>
            <Axis
              dimension="xScroll"
              scale={xScale}
              formatTick={timelapse.format}
            />
            <Circles
              data={dataMotions}
              keyAccessor={keyAccessor}
              xAccessor={xAccessorScaled}
              yAccessor={yAccessorScaled}
              className={styles.circleMotion}
            />
            <Circles
              data={dataAlerts}
              keyAccessor={keyAccessor}
              xAccessor={xAccessorScaled}
              yAccessor={yAccessorScaled}
              className={styles.circleAlert}
            />
          </g>
          <Axis
            dimension="y"
            scale={yScale}
            background="true"
          />
          <Axis
            dimension="y"
            side="right"
            scale={yScale}
            background="true"
          />
        </Chart>
      </div >
    </div>
  )
}
