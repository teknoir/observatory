import { useChartDimensions } from 'components/ChartUtilities/Chart/ChartContext';
import styles from './GridLines.module.scss';

interface GridLinesProps {
  xPos: number;
}

const GridLines = ({ xPos }: GridLinesProps) => {
  const dimensions = useChartDimensions();

  return (
    <g>
      <line
        className={styles.line}
        y2={dimensions.boundedHeight}
        transform={`translate(${xPos}, 0)`}
      />
    </g>
  );
};

export default GridLines;
