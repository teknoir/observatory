import { ScalePoint } from 'd3';
import Typography from '@mui/material/Typography';
import cameraImage from 'assets/device_camera.png';
import { useChartDimensions } from 'components/ChartUtilities/Chart/ChartContext';
import styles from './AxisVerticalLeft.module.scss';

interface AxisVerticalLeftProps {
  scale: ScalePoint<string>;
}

export default function AxisVerticalLeft({
  scale,
  ...props
}: AxisVerticalLeftProps) {
  const dimensions = useChartDimensions();
  const ticks = scale.domain();

  return (
    <g dominantBaseline={'middle'} className={styles.root} {...props}>
      <rect
        x={-dimensions.marginLeft}
        y="0"
        width={dimensions.marginLeft}
        height="100%"
        className={styles.rectBackground}
      />
      <foreignObject
        x={-dimensions.marginLeft}
        width={1}
        height={1}
        className={styles.foreignObject}
      >
        <Typography variant="LabelMedium">
          Cameras ({ticks.length ?? 0})
        </Typography>
      </foreignObject>
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
            <img src={cameraImage} width={32} height={32} />
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
}
