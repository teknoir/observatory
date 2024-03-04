import { startTimeAccessor as yAccessor } from 'components/ChartUtilities/accessors';
import {
  useChartDimensions,
  IDimensions,
} from 'components/ChartUtilities/utils';
import { yScale as yScaleFunction } from 'components/MovementsTimelineVertical/utils.ts';

interface Props {
  peripherals: string[];
  period: number;
  startTime: Date;
  initialDimensions?: IDimensions;
  scrollLengthMultiplier?: number;
}

const useMovementsTimelineDataVertical = ({
  startTime,
  period,
  initialDimensions,
  scrollLengthMultiplier = period * 15,
}: Props) => {
  const [ref, dimensions] = useChartDimensions(
    initialDimensions,
    scrollLengthMultiplier
  );

  const yScale = yScaleFunction(startTime, dimensions);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const yAccessorScaled = (d: object) => yScale(yAccessor(d));

  return {
    dimensions,
    ref,
    yScale,
    yAccessorScaled,
  };
};

export default useMovementsTimelineDataVertical;
