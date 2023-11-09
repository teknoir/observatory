// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import styles from './GridLines.module.scss';

export default function GridLineVertical({ dimensions, scale, ...props }) {
  const ticks = scale.domain();

  return (
    <g {...props}>
      {ticks.map((tick, i) => (
        <line
          key={i}
          className={styles.GridLine__line}
          x2={dimensions.boundedWidth}
          transform={`translate(0, ${scale(tick)})`}
        />
      ))}
    </g>
  );
}
