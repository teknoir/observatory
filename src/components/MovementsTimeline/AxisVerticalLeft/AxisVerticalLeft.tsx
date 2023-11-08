// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { ScalePoint } from "d3"
import classNames from "classnames"
import cameraImage from 'assets/device_camera.png'
import { useChartDimensions } from "components/ChartUtilities/Chart/Chart"
import styles from "./AxisVerticalLeft.module.scss"

interface AxisVerticalLeftProps {
  scale: ScalePoint<string>,
}

export default function AxisVerticalLeft({ scale, ...props }: AxisVerticalLeftProps) {
  const dimensions = useChartDimensions()
  const ticks = scale.domain()

  return (
    <g
      className={classNames(styles.Axis, styles.AxisVertical)}
      {...props}
    >
      <rect
        x={-dimensions.marginLeft}
        y="0"
        width={dimensions.marginLeft}
        height="100%"
        className={styles.rectBackground}
      />
      <text
        className={styles.axisVerticalTitle}
        x={-dimensions.marginLeft}
        y={dimensions.marginTop / 2}
      >
        Cameras ({ticks.length})
      </text>
      {
        ticks.map((tick: string) => (
          <foreignObject
            key={tick}
            x={-dimensions.marginLeft}
            y={scale(tick) - 15}
            // width="100%"
            height="50"
            style={{
              width: 250
            }}
          >
            <div
              style={{
                display: "flex",
                justifyItems: "flex-start",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <img src={cameraImage} width={32} height={32} />
              <span
                style={{
                  color: "white",
                  whiteSpace: "nowrap",
                  overflowX: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "14ch",
                }}
                title={tick}
              >
                {tick}
              </span>
            </div>
          </foreignObject>
        ))
      }
    </g>
  )
}
