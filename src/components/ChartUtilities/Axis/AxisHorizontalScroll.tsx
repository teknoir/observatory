// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import classNames from "classnames";
import styles from "./Axis.module.scss";

export default function AxisHorizontalScroll({ dimensions, label, formatTick, scale, ...props }) {
  const numberOfTicks = dimensions.boundedScrollWidth < 600
    ? dimensions.boundedScrollWidth / 100
    : dimensions.boundedScrollWidth / 100

  const ticks = scale.ticks(numberOfTicks)

  return (
    <g {...props}
      className={classNames(styles.Axis, styles.AxisHorizontal)}
    // transform={`translate(0, ${dimensions.boundedHeight})`}
    >
      {/* <line */}
      {/*   className={styles.Axis__line} */}
      {/*   // x1, y1, y2 are 0, so there's no need to add them. */}
      {/*   x2={dimensions.boundedScrollWidth} */}
      {/* /> */}
      {
        ticks.map((tick, i) => (
          <text
            key={tick}
            className={styles.Axis__tick}
            transform={`translate(${scale(tick)}, 20)`}
          >
            <tspan>
              {formatTick(tick).split(",")[0]}
            </tspan>
            <tspan x={0} dy={15}>
              {formatTick(tick).split(",")[1] ?? ""}
            </tspan>
          </text>
        ))
      }
      {
        label && (
          <text
            className={styles.Axis__label}
            transform={`translate(${dimensions.boundedScrollWidth / 2}, 60)`}
          >
            {label}
          </text>
        )
      }
    </g>
  )
}
