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
    <g>
      {ticks.map((tick, i) => (
        <line
          key={i}
          className={styles.line}
          // x2={dimensions.boundedWidth}
          // transform={`translate(0, ${scale(tick)})`}
          y2={dimensions.boundedWidth}
          transform={`translate(${scale(tick)}, 0)`}
        />
      ))}
    </g>
  );
};

export default GridLines;
