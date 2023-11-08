// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { generatePath } from "react-router-dom"
import { useChartDimensions } from "components/ChartUtilities/Chart/Chart"
import DeviceLink from "components/MovementsTimeline/DeviceLink/DeviceLink"
import APP_URLS from "enums/urls"
import styles from "./AxisVerticalRight.module.scss"

const marginLeftFromChart = 32

export default function AxisVertical({ scale, ids, ...props }) {
  const dimensions = useChartDimensions()
  const ticks = scale.domain()

  return (
    <g
      className={styles.axisVertical}
      {...props}
    >
      <text
        className={styles.axisVerticalTitle}
        x={-dimensions.marginLeft}
        y={dimensions.marginTop / 2}
      >
        Cameras ({ticks.length})
      </text>
      <rect
        x={dimensions.width - dimensions.marginRight - dimensions.marginLeft}
        y="0"
        width={dimensions.marginRight}
        height="100%"
        className={styles.rectBackground}
      />
      {
        ticks.map((tick, i) => (
          <foreignObject
            key={tick}
            textAnchor="middle"
            x={dimensions.boundedWidth + marginLeftFromChart}
            y={scale(tick) - 10.5}
            width="1"
            height="1"
            style={{ overflow: "visible" }}
          >
            {ids[i] && tick && (
              <DeviceLink
                link={generatePath(APP_URLS.devices, {
                  peripheralId: ids[i],
                  peripheralName: tick,
                })}
              />
            )}
          </foreignObject>
        ))
      }
    </g>
  )
}
