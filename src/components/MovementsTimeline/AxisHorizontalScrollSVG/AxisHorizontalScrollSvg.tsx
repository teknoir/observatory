import { ScaleTime } from 'd3';
import Typography from '@mui/material/Typography';
import styles from './AxisHorizontalScroll.module.scss';
import { useChartDimensions } from 'components/ChartUtilities/Chart/ChartContext';

interface AxisHorizontalScrollProps {
  scale: ScaleTime<number, number, never>;
  formatTick: (date: Date) => string;
  numberOfTicks?: number;
}

const AxisHorizontalScrollSvg = ({
  scale,
  formatTick,
  numberOfTicks,
}: AxisHorizontalScrollProps) => {
  const dimensions = useChartDimensions();
  const autoNumberOfTicks =
    dimensions.boundedScrollWidth < 600
      ? dimensions.boundedScrollWidth / 100
      : dimensions.boundedScrollWidth / 100;

  const ticks = scale.ticks(numberOfTicks ? numberOfTicks : autoNumberOfTicks);

  return (
    <g>
      {ticks.map((tick) => (
        <foreignObject
          key={String(tick)}
          transform={`translate(${scale(tick)}, 0)`}
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

export default AxisHorizontalScrollSvg;
