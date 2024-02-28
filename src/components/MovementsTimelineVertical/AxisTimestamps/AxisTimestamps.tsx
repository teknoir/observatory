import { ScaleTime } from 'd3';
import Typography from '@mui/material/Typography';
import {
  formatDateByDay,
  formatDateByTime,
} from 'components/MovementsTimelineVertical/utils';
import { ChartDimensions } from 'ts/types';
import styles from './AxisTimestamps.module.scss';

interface AxisTimestampsProps {
  scale: ScaleTime<number, number, never>;
  numberOfTicks?: number;
  dimensions?: ChartDimensions;
}

const AxisTimestamps = ({
  scale,
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
      {ticks.map((tick) => {
        let tickText = formatDateByTime(tick);
        if (tick.getHours() === 0 && tick.getMinutes() === 0) {
          tickText = formatDateByDay(tick);
        }
        return (
          <foreignObject
            key={String(tick)}
            transform={`translate(0, ${scale(tick)})`}
            width={1}
            height={1}
            className={styles.foreignObject}
          >
            <div className={styles.text}>
              <Typography variant="BodySmall">{tickText}</Typography>
            </div>
          </foreignObject>
        );
      })}
    </g>
  );
};

export default AxisTimestamps;
