import { ScalePoint } from 'd3';
import Typography from '@mui/material/Typography';
import { useChartDimensions } from 'components/ChartUtilities/Chart/ChartContext';
import Icon from 'components/Icon/Icon';
import cctvCameraIcon from 'assets/icons/cctvCameraIcon.svg';
import { IconSizes } from 'ts/types';
import styles from './AxisVerticalLeft.module.scss';

interface AxisVerticalLeftProps {
  scale: ScalePoint<string>;
}

const AxisVerticalLeft = ({ scale, ...props }: AxisVerticalLeftProps) => {
  const dimensions = useChartDimensions();
  const ticks = scale.domain();

  return (
    <g dominantBaseline={'middle'} textAnchor="end" {...props}>
      <rect
        x={-dimensions.marginLeft}
        y="0"
        width={dimensions.marginLeft}
        height="100%"
        className={styles.rectBackground}
      />
      {ticks.map((tick) => (
        <foreignObject
          key={tick}
          x={-dimensions.marginLeft}
          y={(scale(tick) ?? 0) - 15}
          width={dimensions.marginLeft}
          height={1}
          className={styles.foreignObject}
        >
          <div className={styles.deviceName}>
            <Icon icon={cctvCameraIcon} size={IconSizes.lg} />
            <Typography
              variant="BodyMedium"
              title={tick}
              className={styles.deviceNameText}
            >
              {tick}
            </Typography>
          </div>
        </foreignObject>
      ))}
    </g>
  );
};

export default AxisVerticalLeft;
