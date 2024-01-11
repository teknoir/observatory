import { ScaleTime } from 'd3';
import Typography from '@mui/material/Typography';
import { useChartDimensions } from 'components/ChartUtilities/Chart/ChartContext';
import styles from './GridLinesTimestamps.module.scss';

interface GridLinesTimestampsProps {
  scale: ScaleTime<number, number, never>;
  formatTick: (date: Date) => string;
  numberOfTicks?: number;
  timestamps?: boolean;
}

const GridLinesTimestamps = ({
  scale,
  numberOfTicks,
  timestamps = false,
  formatTick,
}: GridLinesTimestampsProps) => {
  const dimensions = useChartDimensions();
  const autoNumberOfTicks =
    dimensions.boundedScrollWidth < 600
      ? dimensions.boundedScrollWidth / 100
      : dimensions.boundedScrollWidth / 100;

  const ticks = scale.ticks(numberOfTicks ? numberOfTicks : autoNumberOfTicks);

  return (
    <g>
      {ticks.map((tick, i) => (
        <>
          <line
            key={i}
            className={styles.line}
            y1={25}
            y2={dimensions.boundedHeight - 20}
            transform={`translate(${scale(tick)}, 0)`}
          />
          {timestamps && (
            <foreignObject
              key={String(tick)}
              transform={`translate(${scale(tick) - 10}, ${
                dimensions.boundedHeight / 2
              })`}
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
          )}
        </>
      ))}
    </g>
  );
};

export default GridLinesTimestamps;
