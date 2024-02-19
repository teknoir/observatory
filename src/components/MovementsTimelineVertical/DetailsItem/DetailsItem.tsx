import { useCallback } from 'react';
import loiteringIcon from 'assets/icons/loiteringIcon.svg';
import personDownIcon from 'assets/icons/personDownIcon.svg';
import theftIcon from 'assets/icons/theftIcon.svg';
import Icon from 'components/Icon/Icon';
import { getUrlJpeg } from 'utils/media';
import { AlertTypes, IEventDocumentWithPeripheral, IconSizes } from 'ts/types';
import styles from './DetailsItem.module.scss';

interface DetailsItemProps {
  data: IEventDocumentWithPeripheral & { ground_truth?: AlertTypes };
}

const DetailsItem = ({ data }: DetailsItemProps) => {
  const { type, ground_truth: groundTruth } = data;
  let { video_snapshot: videoSnapshot } = data;
  // TODO: remove test url in future
  videoSnapshot = videoSnapshot
    ? getUrlJpeg(videoSnapshot)
    : 'https://picsum.photos/200/300';

  const alertType = groundTruth || type;

  const getIcon = useCallback(() => {
    switch (alertType) {
      case AlertTypes.loitering:
        return loiteringIcon;
      case AlertTypes.theft:
        return theftIcon;
      case AlertTypes.on_ground:
        return personDownIcon;
      default:
        return '';
    }
  }, [alertType]);

  const icon = getIcon();

  return (
    <div className={styles.details}>
      <div className={styles.icons}>
        <div className={styles.iconWrapper}>
          <Icon icon={icon} size={IconSizes.sm} />
        </div>
      </div>
      <div className={styles.imgWrapper}>
        <img src={videoSnapshot} alt="img" className={styles.videoSnapshot} />
      </div>
    </div>
  );
};

export default DetailsItem;
