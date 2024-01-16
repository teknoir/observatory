import { ScalePoint } from 'd3';
import { generatePath } from 'utils/router';
import { useChartDimensions } from 'components/ChartUtilities/Chart/ChartContext';
import DeviceLink from 'components/MovementsTimeline/DeviceLink/DeviceLink';
import APP_URLS from 'enums/urls';
import styles from './AxisVerticalRight.module.scss';

interface AxisVerticalRightProps {
  scale: ScalePoint<string>;
  ids: string[];
}

const AxisVerticalRight = ({ scale, ids }: AxisVerticalRightProps) => {
  const dimensions = useChartDimensions();
  const ticks = scale.domain();

  return (
    <g transform={`translate(${dimensions.boundedWidth}, 0)`}>
      <rect
        width={dimensions.marginRight}
        height="100%"
        className={styles.rectBackground}
      />
      {ticks.map((tick, i) => (
        <foreignObject
          key={tick}
          x={32}
          y={(scale(tick) ?? 0) - 10.5}
          width={1}
          height={1}
          className={styles.foreignObject}
        >
          {ids[i] && tick && (
            <DeviceLink
              link={generatePath(APP_URLS.devices, {
                peripheralId: ids[i],
                peripheralName: tick,
              })}
            />
          )}
        </foreignObject>
      ))}
    </g>
  );
};

export default AxisVerticalRight;
