// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { NavLink as RouterLink } from "react-router-dom"
import classNames from "classnames"
import Link from "@mui/material/Link"
import cameraImage from 'assets/device_camera.png'
import APP_URLS from "enums/urls"
import styles from "./Axis.module.scss"

export default function AxisVertical({ dimensions, label, formatTick, scale, idAccessor, background, side, ids, ...props }) {
  const numberOfTicks = dimensions.boundedHeight / 70
  // const ticks = scale.ticks(numberOfTicks)

  const ticks = scale.domain()

  return (
    <g
      className={classNames(styles.Axis, styles.AxisVertical)}
      {...props}
    >
      {
        background &&
        <rect
          x={side === "right" ? dimensions.width - dimensions.marginRight * 2 : -dimensions.marginLeft}
          y="0"
          width={side === "right" ? dimensions.marginRight : dimensions.marginLeft}
          height="100%"
          className={styles.rectBackground}
        />
      }
      {/* Commented the line because it looks like neither the MovementsTimeline nor the LineCharts will need it. Keep it just in case. */}
      {/* <line */}
      {/*   className={styles.Axis__line} */}
      {/*   // x1, x2, y1 are 0, so there's no need to add them. */}
      {/*   y2={dimensions.boundedHeight} */}
      {/* /> */}
      {
        ticks.map((tick, i) => (
          side === "right" ?
            <foreignObject
              key={tick}
              x={dimensions.boundedWidth + 16}
              y={scale(tick) - 10.5}
              width="1"
              height="1"
              style={{ overflow: "visible" }}
            >
              <Link
                component={RouterLink}
                to={APP_URLS.devices + "/" + ids[i]}
                color="inherit"
                underline="none"
              >
                Open
              </Link>
            </foreignObject>
            :
            <foreignObject
              key={tick}
              x={side === "right" ? dimensions.width - dimensions.marginRight : -100}
              y={scale(tick) - 15}
              width="100"
              height="50"
            // width="1"
            // height="1"
            // style={{ overflow: "visible" }}
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
                  }}
                  title={formatTick ? tick : formatTick(tick)}
                >
                  {formatTick ? tick : formatTick(tick)}
                </span>
              </div>
              {/* <text */}
              {/*   key={tick} */}
              {/*   className={styles.Axis__tick} */}
              {/*   transform={`translate(${side === "right" ? dimensions.width - dimensions.marginRight : -16}, ${scale(tick)})`} */}
              {/* > */}
              {/*   {formatTick ? tick : formatTick(tick)} */}
              {/* </text> */}
            </foreignObject>
        ))
      }
      {
        label && (
          <text
            className={styles.Axis__label}
            transform={`translate(-56px, ${dimensions.boundedHeight / 2}px rotate(-90deg))`}
          >
            {label}
          </text>
        )
      }
    </g >
  )
}
