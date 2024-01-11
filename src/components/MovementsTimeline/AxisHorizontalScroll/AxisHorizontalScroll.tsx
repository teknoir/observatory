import { ScaleTime } from 'd3';
import Typography from '@mui/material/Typography';
import { useChartDimensions } from 'components/ChartUtilities/Chart/ChartContext';
import styles from './AxisHorizontalScroll.module.scss';

interface AxisHorizontalScrollProps {
  scale: ScaleTime<number, number, never>;
  formatTick: (date: Date) => string;
  numberOfTicks?: number;
  offsetY?: number;
}

const AxisHorizontalScroll = ({
  scale,
  formatTick,
  numberOfTicks,
  offsetY = 0,
}: AxisHorizontalScrollProps) => {
  const dimensions = useChartDimensions();
  const autoNumberOfTicks =
    dimensions.boundedScrollWidth < 600
      ? dimensions.boundedScrollWidth / 100
      : dimensions.boundedScrollWidth / 100;

  const ticks = scale.ticks(numberOfTicks ? numberOfTicks : autoNumberOfTicks);
  const translateY = offsetY > 140 ? offsetY - 110 : 0;

  return (
    <g transform={`translate(0, ${translateY})`}>
      <rect
        className={styles.rect}
        width={dimensions.boundedScrollWidth}
        height={40}
        y={-15}
      />
      {ticks.map((tick) => (
        <foreignObject
          key={String(tick)}
          transform={`translate(${scale(tick)})`}
          width={1}
          height={1}
          className={styles.foreignObject}
        >
          <div className={styles.text}>
            <Typography variant="BodySmall">
              {formatTick(tick).split(',')[0]}
            </Typography>
            <Typography variant="BodySmall">
              {formatTick(tick).split(',')[1]}
            </Typography>
          </div>
        </foreignObject>
      ))}
    </g>
  );
};

export default AxisHorizontalScroll;
