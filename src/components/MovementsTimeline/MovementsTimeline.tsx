import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import _debounce from "lodash/debounce"
import moment from "moment/moment"
import InputLabel from "@mui/material/InputLabel"
import { SelectChangeEvent } from "@mui/material/Select"
import Select from "muiComponents/Select/Select"
import { Axis, Chart, Circles, GridLines } from "components/ChartUtilities"
import { detectionIdAccessor } from "components/ChartUtilities/accessors"
import { useChartDimensions } from "components/ChartUtilities/utils"
import { MovementsTimelinePeriod } from "./enums"
import styles from "./MovementsTimeline.module.scss"

const formatDateDayMonth = d3.timeFormat("%-b %-d")
// const formatDate = d3.timeFormat("%-I:%M %p")

interface MovementsTimeLineParams {
  startTime: Date
  dataMotions: Array<object>
  dataAlerts: Array<object>
  xAccessor: (d: object) => Date | number
  yAccessor: (d: object) => string
  peripherals: Array<string>
  ids: Array<string>
  period: MovementsTimelinePeriod
  handleChangePeriod: (e: SelectChangeEvent<unknown>) => void;
}

const periodOptions = [
  { value: MovementsTimelinePeriod.DAYS_1, label: "Last 24 hours" },
  { value: MovementsTimelinePeriod.DAYS_7, label: "Last 7 days" },
  { value: MovementsTimelinePeriod.DAYS_30, label: "Last 30 days" },
]

export const MovementsTimeline = ({
  startTime,
  dataMotions,
  dataAlerts,
  xAccessor,
  yAccessor,
  peripherals,
  ids,
  period,
  handleChangePeriod
}: MovementsTimeLineParams) => {
  const [ref, dimensions] = useChartDimensions(null)
  const [defaultTranslate, setDefaultTranslate] = useState<number>(0)
  const scrollGroupRef = useRef<SVGGElement | null>(null)

  const xScale = d3.scaleTime()
    .domain([startTime, moment().toDate()])
    .range([0, dimensions.boundedWidth * 6])

  const yScale = d3.scalePoint()
    .domain(peripherals)
    .range([dimensions.boundedHeight, 0])
    .padding(1)

  const xAccessorScaled = (d: object) => xScale(xAccessor(d))
  const yAccessorScaled = (d: object) => yScale(yAccessor(d))

  const debounceResize = _debounce(() => setDefaultTranslate(-dimensions.boundedScrollWidth + dimensions.boundedWidth), 200)

  useEffect(() => {
    debounceResize()
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
      <nav className={styles.menuLayout}>
        <div className={styles.menuItem}>
          <InputLabel id="movementsTimelinePeriodLabel">
            Filter by:{' '}
          </InputLabel>
          <Select
            labelId="movementsTimelinePeriodLabel"
            variant="standard"
            value={period}
            options={periodOptions}
            onChange={handleChangePeriod}
          />
        </div>
      </nav>
      <div
        className={styles.timeline}
        ref={ref}
        style={{
          height: peripherals.length * 64 + 200
        }}
      >
        <Chart dimensions={dimensions}>
          <GridLines
            dimension="y"
            scale={yScale}
          />
          <g ref={scrollGroupRef}>
            <Axis
              dimension="xScroll"
              scale={xScale}
              // formatTick={formatDate}
              formatTick={formatDateDayMonth}
            />
            <Circles
              data={dataMotions}
              keyAccessor={detectionIdAccessor}
              xAccessor={xAccessorScaled}
              yAccessor={yAccessorScaled}
              className={styles.circleMotion}
            />
            <Circles
              data={dataAlerts}
              keyAccessor={detectionIdAccessor}
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
            ids={ids}
            background="true"
          />
        </Chart>
      </div >
    </div>
  )
}
