// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import classNames from "classnames";
import styles from "./Axis.module.scss";

export default function AxisVertical({ dimensions, label, formatTick, scale, background, side, ...props }) {
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
          width={dimensions.marginRight}
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
              x={dimensions.boundedWidth + 16}
              y={scale(tick) - 10.5}
              width="1"
              height="1"
              style={{ overflow: "visible" }}
            >
              <button>Open</button>
            </foreignObject>
            :
            <text
              key={tick}
              className={styles.Axis__tick}
              transform={`translate(${side === "right" ? dimensions.width - dimensions.marginRight : -16}, ${scale(tick)})`}
            >
              {formatTick ? tick : formatTick(tick)}
            </text>
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
