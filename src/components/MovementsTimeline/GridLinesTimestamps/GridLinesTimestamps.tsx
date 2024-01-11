import { ScaleTime } from 'd3';
import { useChartDimensions } from 'components/ChartUtilities/Chart/ChartContext';
import styles from './GridLinesTimestamps.module.scss';

interface GridLinesTimestampsProps {
  scale: ScaleTime<number, number, never>;
  numberOfTicks?: number;
}

const GridLinesTimestamps = ({
  scale,
  numberOfTicks,
}: GridLinesTimestampsProps) => {
  const dimensions = useChartDimensions();
  const autoNumberOfTicks =
    dimensions.boundedScrollWidth < 600
      ? dimensions.boundedScrollWidth / 100
      : dimensions.boundedScrollWidth / 100;

  const ticks = scale.ticks(numberOfTicks ? numberOfTicks : autoNumberOfTicks);

  return (
    <g>
      {ticks.map((tick, i) => (
        <line
          key={i}
          className={styles.line}
          y1={25}
          y2={dimensions.boundedHeight - 20}
          transform={`translate(${scale(tick)}, 0)`}
        />
      ))}
    </g>
  );
};

export default GridLinesTimestamps;
