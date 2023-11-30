import { ScalePoint } from 'd3';
import { generatePath } from 'utils/router';
import { useChartDimensions } from 'components/ChartUtilities/Chart/ChartContext';
import DeviceLink from 'components/MovementsTimeline/DeviceLink/DeviceLink';
import APP_URLS from 'enums/urls';
import styles from './AxisVerticalRight.module.scss';

const marginLeftFromChart = 32;

interface AxisVerticalRightProps {
  scale: ScalePoint<string>;
  ids: string[];
}

const AxisVerticalRight = ({
  scale,
  ids,
  ...props
}: AxisVerticalRightProps) => {
  const dimensions = useChartDimensions();
  const ticks = scale.domain();

  return (
    <g {...props}>
      <rect
        x={dimensions.width - dimensions.marginRight - dimensions.marginLeft}
        y="0"
        width={dimensions.marginRight - marginLeftFromChart / 2}
        height="100%"
        className={styles.rectBackground}
      />
      {ticks.map((tick, i) => (
        <foreignObject
          key={tick}
          textAnchor="middle"
          x={dimensions.boundedWidth + marginLeftFromChart}
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
