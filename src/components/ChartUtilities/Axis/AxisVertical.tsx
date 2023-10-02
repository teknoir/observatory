// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import classNames from "classnames";
import styles from "./Axis.module.scss";

export default function AxisVertical({ dimensions, label, formatTick, scale, background, ...props }) {
  const numberOfTicks = dimensions.boundedHeight / 70
  // const ticks = scale.ticks(numberOfTicks)

  const ticks = scale.domain()

  return (
    <g
      className={classNames(styles.Axis, styles.AxisVertical)}
      {...props}
    >
      {/* TODO: Make this fill color come from a global variable */}
      {
        background &&
        <rect
          x={-dimensions.marginLeft}
          y="0"
          width={dimensions.marginLeft}
          height="100%"
          fill="#1C1C1C"
        />
      }
      <line
        className={styles.Axis__line}
        // x1, x2, y1 are 0, so there's no need to add them.
        y2={dimensions.boundedHeight}
      />
      {
        ticks.map((tick, i) => (
          <text
            key={tick}
            className={styles.Axis__tick}
            transform={`translate(-16, ${scale(tick)})`}
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
    </g>
  )
}
