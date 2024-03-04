import { useChartDimensions } from 'components/ChartUtilities/Chart/ChartContext';
import styles from './GridLines.module.scss';

interface GridLinesProps {
  xPos: number;
}

const GridLines = ({ xPos }: GridLinesProps) => {
  const dimensions = useChartDimensions();

  return (
    <g transform={`translate(${xPos}, 0)`}>
      <line
        className={styles.line}
        y2={dimensions.boundedScrollHeight + dimensions.marginBottom}
      />
    </g>
  );
};

export default GridLines;
