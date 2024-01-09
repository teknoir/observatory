import { ScaleTime } from 'd3';
import Typography from '@mui/material/Typography';
import { useChartDimensions } from 'components/ChartUtilities/Chart/ChartContext';

interface AxisHorizontalScrollProps {
  dimensionsProps?: {
    boundedScrollWidth: number;
  };
  translateX?: number;
  scale: ScaleTime<number, number, never>;
  formatTick: (date: Date) => string;
  numberOfTicks?: number;
}

const AxisHorizontalScroll = ({
  translateX,
  dimensionsProps,
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
    <div
      id="axis_horizontal_scroll"
      style={{
        width:
          dimensionsProps?.boundedScrollWidth ?? dimensions.boundedScrollWidth,
        display: 'flex',
        justifyContent: 'space-between',
        transform: `translateX(${translateX}px)`,
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
  );
};

export default AxisHorizontalScroll;
