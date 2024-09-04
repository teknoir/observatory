/* eslint-disable @typescript-eslint/no-unused-vars */

import { ScalePoint } from 'd3';
import { generatePath } from 'utils/router';
import { useChartDimensions } from 'components/ChartUtilities/Chart/ChartContext';
import DeviceLink from 'components/MovementsTimeline/DeviceLink/DeviceLink';
import APP_URLS from 'enums/urls';
import styles from './AxisVerticalRight.module.scss';

interface AxisVerticalRightProps {
  scale: ScalePoint<string>;
  idToNameMap: Map<string, string>;
}

const AxisVerticalRight = ({ scale, idToNameMap }: AxisVerticalRightProps) => {
  const dimensions = useChartDimensions();
  const ticks = scale.domain();

  return (
    <g transform={`translate(${dimensions.boundedWidth}, 0)`}>
      <rect
        width={dimensions.marginRight}
        height="100%"
        className={styles.rectBackground}
      />
      {ticks.map((tick) => {
        const peripheralId = Array.from(idToNameMap.entries()).find(
          ([_a, name]) => name === tick
        )?.[0];

        return (
          <foreignObject
            key={tick}
            x={32}
            y={(scale(tick) ?? 0) - 10.5}
            width={1}
            height={1}
            className={styles.foreignObject}
          >
            {peripheralId && tick && (
              <DeviceLink
                link={generatePath(APP_URLS.devices, {
                  peripheralId: peripheralId,
                  peripheralName: tick,
                })}
              />
            )}
          </foreignObject>
        );
      })}
    </g>
  );
};

export default AxisVerticalRight;
