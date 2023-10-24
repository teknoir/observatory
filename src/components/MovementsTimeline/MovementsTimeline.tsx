import { useEffect, useRef, useState } from "react"
import { NavLink as RouterLink } from "react-router-dom"
import * as d3 from "d3"
import _debounce from "lodash/debounce"
import moment from "moment/moment"
import InputLabel from "@mui/material/InputLabel"
import Link from "@mui/material/Link"
import { SelectChangeEvent } from "@mui/material/Select"
import Select from "muiComponents/Select/Select"
import { Axis, Chart, Circles, GridLines } from "components/ChartUtilities"
import { detectionIdAccessor } from "components/ChartUtilities/accessors"
import { useChartDimensions } from "components/ChartUtilities/utils"
import APP_URLS from "enums/urls"
import { MovementsTimelinePeriod, TimelineFilterBy } from "./enums"
import styles from "./MovementsTimeline.module.scss"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"

const formatDateByDay = d3.timeFormat("%-b %-d")
const formatDateByTime = d3.timeFormat("%-I:%M %p")

interface MovementsTimeLineParams {
  startTime: Date
  dataMotions: Array<object>
  dataAlerts: Array<object>
  xAccessor: (d: object) => Date | number
  yAccessor: (d: object) => string
  peripherals: Array<string>
  ids: Array<string>
  filter: string
  handleChangeFilter: (e: SelectChangeEvent<unknown>) => void;
  period: MovementsTimelinePeriod
  handleChangePeriod: (e: SelectChangeEvent<unknown>) => void;
}

const timelineOptions = [
  { value: TimelineFilterBy.MOTIONS_ALERTS, label: "All" },
  { value: TimelineFilterBy.MOTIONS, label: "Motions" },
  { value: TimelineFilterBy.ALERTS, label: "Alerts" },
]

const periodOptions = [
  { value: MovementsTimelinePeriod.DAYS_1, label: "Today" },
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
  filter,
  handleChangeFilter,
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

  const formatDate = period === MovementsTimelinePeriod.DAYS_1 ? formatDateByTime : formatDateByDay

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
          <Typography variant="h5" gutterBottom>
            Motions & Alerts
          </Typography>
        </div>
        <div className={styles.menuItem}>
          <InputLabel id="timelineFilterByLabel">
            Filter by:{' '}
          </InputLabel>
          <Select
            labelId="timelineFilterByLabel"
            variant="standard"
            value={filter}
            options={timelineOptions}
            onChange={handleChangeFilter}
            disableUnderline
          />
          <Select
            labelId="movementsTimelinePeriodLabel"
            variant="standard"
            value={period}
            options={periodOptions}
            onChange={handleChangePeriod}
            disableUnderline
          />
          <Link
            component={RouterLink}
            to={APP_URLS.motionsAlerts}
            color="inherit"
          >
            View all
          </Link>
        </div>
      </nav >
      <Divider variant="middle" />
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
              formatTick={formatDate}
              numberOfTicks={period === MovementsTimelinePeriod.DAYS_1 ? 24 * 4 : period}
            />
            {(filter == TimelineFilterBy.MOTIONS ||
              filter == TimelineFilterBy.MOTIONS_ALERTS) &&
              period == MovementsTimelinePeriod.DAYS_1 &&
              <Circles
                data={dataMotions}
                keyAccessor={detectionIdAccessor}
                xAccessor={xAccessorScaled}
                yAccessor={yAccessorScaled}
                className={styles.circleMotion}
              />}
            {(filter == TimelineFilterBy.ALERTS ||
              filter == TimelineFilterBy.MOTIONS_ALERTS) &&
              <Circles
                data={dataAlerts}
                keyAccessor={detectionIdAccessor}
                xAccessor={xAccessorScaled}
                yAccessor={yAccessorScaled}
                className={styles.circleAlert}
              />}
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
    </div >
  )
}
