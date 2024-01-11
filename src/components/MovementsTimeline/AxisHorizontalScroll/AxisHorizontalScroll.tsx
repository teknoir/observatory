import { ScaleTime } from 'd3';
import classNames from 'classnames';
import Typography from '@mui/material/Typography';
import { useChartDimensions } from 'components/ChartUtilities/Chart/ChartContext';
import styles from './AxisHorizontalScroll.module.scss';

interface AxisHorizontalScrollProps {
  scale: ScaleTime<number, number, never>;
  formatTick: (date: Date) => string;
  numberOfTicks?: number;
  position?: 'top' | 'bottom';
}

const AxisHorizontalScroll = ({
  scale,
  formatTick,
  numberOfTicks,
  position = 'top',
}: AxisHorizontalScrollProps) => {
  const dimensions = useChartDimensions();
  const autoNumberOfTicks =
    dimensions.boundedScrollWidth < 600
      ? dimensions.boundedScrollWidth / 100
      : dimensions.boundedScrollWidth / 100;

  const ticks = scale.ticks(numberOfTicks ? numberOfTicks : autoNumberOfTicks);
  const translateY = position === 'top' ? 0 : dimensions.boundedHeight - 20;

  return (
    <g className={classNames(styles.Axis, styles.AxisHorizontal)}>
      {ticks.map((tick) => (
        <foreignObject
          key={String(tick)}
          transform={`translate(${scale(tick)}, ${translateY})`}
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
