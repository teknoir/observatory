import { useChartDimensions } from 'components/ChartUtilities/Chart/ChartContext';
import styles from './GridLines.module.scss';

const GridLines = () => {
  const dimensions = useChartDimensions();

  return (
    <g>
      <line
        className={styles.line}
        x2={dimensions.width}
        transform={`translate(${-dimensions.marginLeft}, 0)`}
      />
    </g>
  );
};

export default GridLines;
