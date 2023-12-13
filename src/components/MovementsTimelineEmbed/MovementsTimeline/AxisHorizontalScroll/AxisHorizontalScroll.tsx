import { ScaleTime } from 'd3';
import classNames from 'classnames';
import Typography from '@mui/material/Typography';
import { useChartDimensions } from 'components/ChartUtilities/Chart/ChartContext';
import styles from './AxisHorizontalScroll.module.scss';

interface AxisHorizontalScrollProps {
  scale: ScaleTime<number, number, never>;
  formatTick: (date: Date) => string;
  numberOfTicks?: number;
}

const AxisHorizontalScroll = ({
  scale,
  formatTick, // numberOfTicks,
}: AxisHorizontalScrollProps) => {
  const dimensions = useChartDimensions();
  console.log(dimensions.boundedScrollWidth);
  // TODO: Temporary fix for the number of ticks
  const autoNumberOfTicks =
    dimensions.boundedScrollWidth < 1800
      ? dimensions.boundedScrollWidth / 150
      : 24;

  // const ticks = scale.ticks(numberOfTicks ? numberOfTicks : autoNumberOfTicks);
  const ticks = scale.ticks(autoNumberOfTicks);

  return (
    <g className={classNames(styles.Axis, styles.AxisHorizontal)}>
      {ticks.map((tick) => (
        <foreignObject
          key={String(tick)}
          transform={`translate(${scale(tick)}, -40)`}
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
