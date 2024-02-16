import loiteringIcon from 'assets/icons/loiteringIcon.svg';
import personDownIcon from 'assets/icons/personDownIcon.svg';
import theftIcon from 'assets/icons/theftIcon.svg';
import styles from './AxisDetails.module.scss';
import Icon from 'components/Icon/Icon';
import { IconSizes } from 'ts/types';

type Accessor = (d: object) => number;

interface AxisDetailsProps {
  data: { type: string }[] | undefined;
  keyAccessor: Accessor;
  yAccessor: Accessor;
}

const AxisDetails = ({ data, keyAccessor, yAccessor }: AxisDetailsProps) => {
  const videoSnapshot = 'https://picsum.photos/200/300';
  return (
    <g>
      {data &&
        data.map((d) => (
          <foreignObject
            key={keyAccessor(d)}
            transform={`translate(245, ${yAccessor(d) - 30} )`}
            width={1}
            height={1}
            className={styles.foreignObject}
          >
            <div className={styles.details}>
              <div className={styles.icons}>
                <div className={styles.iconsLine} />
                <div className={styles.iconWrapper}>
                  <Icon icon={loiteringIcon} size={IconSizes.lg} />
                </div>
                <div className={styles.iconWrapper}>
                  <Icon icon={theftIcon} size={IconSizes.lg} />
                </div>
                <div className={styles.iconWrapper}>
                  <Icon icon={personDownIcon} size={IconSizes.lg} />
                </div>
              </div>
              <div className={styles.imgWrapper}>
                <img
                  src={videoSnapshot}
                  alt="img"
                  className={styles.videoSnapshot}
                />
              </div>
            </div>
          </foreignObject>
        ))}
    </g>
  );
};

export default AxisDetails;
