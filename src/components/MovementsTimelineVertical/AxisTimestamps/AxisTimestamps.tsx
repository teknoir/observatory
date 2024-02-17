import { ScaleTime } from 'd3';
import Typography from '@mui/material/Typography';
import { ChartDimensions } from 'ts/types';
import styles from './AxisTimestamps.module.scss';

interface AxisTimestampsProps {
  scale: ScaleTime<number, number, never>;
  formatTick: (date: Date) => string;
  numberOfTicks?: number;
  dimensions?: ChartDimensions;
}

const AxisTimestamps = ({
  scale,
  formatTick,
  numberOfTicks,
  dimensions,
}: AxisTimestampsProps) => {
  let autoNumberOfTicks = 0;
  if (dimensions) {
    autoNumberOfTicks =
      dimensions.boundedScrollWidth < 600
        ? dimensions.boundedScrollWidth / 100
        : dimensions.boundedScrollWidth / 100;
  }

  const ticks = scale?.ticks(numberOfTicks ? numberOfTicks : autoNumberOfTicks);

  return (
    <g transform="translate(0, -12)">
      {ticks.map((tick) => (
        <foreignObject
          key={String(tick)}
          transform={`translate(0, ${scale(tick)})`}
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

export default AxisTimestamps;
