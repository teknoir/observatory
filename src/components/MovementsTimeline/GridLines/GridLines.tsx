import { ScalePoint } from 'd3';
import { useChartDimensions } from 'components/ChartUtilities/Chart/ChartContext';
import styles from './GridLines.module.scss';

interface GridLinesProps {
  scale: ScalePoint<string>;
}

const GridLines = ({ scale }: GridLinesProps) => {
  const dimensions = useChartDimensions();
  const ticks = scale.domain();

  return (
    <div
      id="gridlines"
      style={{
        width: dimensions.boundedWidth,
        height: dimensions.height,
        position: 'absolute',
        top: 25,
        right: 0,
        left: 0,
        margin: 'auto',
      }}
    >
      <svg
        width="100%"
        height="100%"
        // width={dimensions.boundedWidth} height={dimensions.height}
      >
        <g>
          {ticks.map((tick, i) => (
            <line
              key={i}
              className={styles.line}
              x2={dimensions.boundedWidth}
              transform={`translate(0, ${scale(tick)})`}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default GridLines;
