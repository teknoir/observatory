// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import styles from './GridLine.module.scss';

export default function GridLineHorizontal({ dimensions, label, formatTick, scale, ...props }) {
  const numberOfTicks = dimensions.boundedWidth < 600
    ? dimensions.boundedWidth / 100
    : dimensions.boundedWidth / 250

  const ticks = scale.ticks(numberOfTicks)

  return (
    <g {...props}
       transform={`translate(0, ${dimensions.boundedHeight})`}
    >
      <line
        className={styles.GridLine__line}
        // x1, y1, y2 are 0, so there's no need to add them.
        x2={dimensions.boundedWidth}
      />
      {
        ticks.map((tick, i) => (
          <text
            key={tick}
            transform={`translate(${scale(tick)}, 25)`}
          >
            {formatTick(tick)}
          </text>
        ))
      }
      {
        label && (
          <text
            transform={`translate(${dimensions.boundedWidth / 2}, 60)`}
          >
            {label}
          </text>
        )
      }
    </g>
  )
}