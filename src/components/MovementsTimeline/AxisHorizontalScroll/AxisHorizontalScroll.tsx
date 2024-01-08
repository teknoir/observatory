import { ScaleTime } from 'd3';
import Typography from '@mui/material/Typography';
import { useChartDimensions } from 'components/ChartUtilities/Chart/ChartContext';
// import styles from './AxisHorizontalScroll.module.scss';

interface AxisHorizontalScrollProps {
  scale: ScaleTime<number, number, never>;
  formatTick: (date: Date) => string;
  numberOfTicks?: number;
}

const AxisHorizontalScroll = ({
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
    // <foreignObject width={1} height={1} className={styles.foreignObject}>
    <div
      id="axis_horizontal_scroll"
      style={{
        width: dimensions.boundedScrollWidth,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {ticks.map((tick) => (
        <div>
          <Typography variant="BodySmall">
            {formatTick(tick).split(',')[0]}
          </Typography>
          <Typography variant="BodySmall">
            {formatTick(tick).split(',')[1]}
          </Typography>
        </div>
      ))}
    </div>
    // </foreignObject>

    // <g id="axis_horizontal_scroll">
    //   {ticks.map((tick) => (
    //     <foreignObject
    //       key={String(tick)}
    //       transform={`translate(${scale(tick)}, 0)`}
    //       width={1}
    //       height={1}
    //       className={styles.foreignObject}
    //     >
    //       <Typography variant="BodySmall">
    //         {formatTick(tick).split(',')[0]}
    //       </Typography>
    //       <Typography variant="BodySmall">
    //         {formatTick(tick).split(',')[1]}
    //       </Typography>
    //     </foreignObject>
    //   ))}
    // </g>
  );
};

export default AxisHorizontalScroll;
