import { useCallback, CSSProperties } from 'react';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import classNames from 'classnames';
import Typography from '@mui/material/Typography';
import CircleIcon from '@mui/icons-material/Circle';
import Tooltip from '@mui/material/Tooltip';
import loiteringIcon from 'assets/icons/loiteringIcon.svg';
import personDownIcon from 'assets/icons/personDownIcon.svg';
import theftIcon from 'assets/icons/theftIcon.svg';
import Icon from 'components/Icon/Icon';
import Verified, { Sizes } from 'components/Verified/Verified';
import APP_URLS from 'enums/urls';
import { generatePath } from 'utils/router';
import { getUrlJpeg } from 'utils/media';
import {
  IEventDocumentWithPeripheral,
  IconSizes,
  AlertTypes,
  EventStatus,
} from 'ts/types';
import styles from './AlertItem.module.scss';

interface Props {
  data: IEventDocumentWithPeripheral[];
  index: number;
  style: CSSProperties;
}

const AlertItem = ({ data, index, style }: Props) => {
  const { detectionId: detectionIdUrl } = useParams();
  const item = data[index];
  const {
    detection_id: detectionId,
    peripheral_id: peripheralId,
    peripheral_name: name,
    type,
    severity,
    start_time: startTime,
    duration,
    status,
  } = item;
  let { video_snapshot: videoSnapshot } = item;
  // TODO: remove test url in future
  videoSnapshot = videoSnapshot
    ? getUrlJpeg(videoSnapshot)
    : 'https://picsum.photos/200/300';
  const startDate = moment(startTime);
  const durationSecs = Math.round(duration / 1000);
  const startDateFormat = startDate.format('HH:mm');
  const isVerified = status === EventStatus.Verified;

  const hasLink = detectionId && peripheralId;
  const isSelected = detectionIdUrl === detectionId;

  const getIcon = useCallback(() => {
    switch (type) {
      case AlertTypes.loitering:
        return loiteringIcon;
      case AlertTypes.theft:
        return theftIcon;
      case AlertTypes.on_ground:
        return personDownIcon;
      default:
        return '';
    }
  }, [type]);

  const getTooltipText = useCallback(() => {
    switch (type) {
      case AlertTypes.loitering:
        return 'Loitering';
      case AlertTypes.theft:
        return 'Catalytic Converter Theft';
      case AlertTypes.on_ground:
        return 'Person Down';
      default:
        return '';
    }
  }, [type]);

  const icon = getIcon();
  const tooltipText = getTooltipText();

  const renderContent = () => (
    <>
      <div className={styles.titleLine}>
        <div className={styles.leftTitleLine}>
          <CircleIcon color="error" className={styles.statusIcon} />
          <Typography variant="LabelMedium">
            {`${startDateFormat} (${durationSecs}s)`}
          </Typography>
        </div>
        <div className={styles.status}>
          <div className={styles.statusIcon}></div>
          {isVerified && <Verified size={Sizes.small} />}
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.imgWrapper}>
          <img src={videoSnapshot} alt="img" className={styles.videoSnapshot} />
        </div>
        <div className={styles.details}>
          <Typography variant="BodySmall" display="block" gutterBottom>
            {name}
          </Typography>
          <Typography variant="BodySmall" display="block">
            Severity: {severity}
          </Typography>
        </div>
        <div className={styles.actionIcons}>
          {!!icon && (
            <Tooltip title={tooltipText} placement="bottom" arrow>
              <div>
                <Icon icon={icon} size={IconSizes.lg} />
              </div>
            </Tooltip>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div
      className={classNames(styles.root, {
        [styles.selected]: isSelected,
      })}
      style={style}
    >
      {hasLink ? (
        <Link
          to={generatePath(APP_URLS.alerts, { detectionId, peripheralId })}
          className={styles.rootLink}
        >
          {renderContent()}
        </Link>
      ) : (
        renderContent()
      )}
    </div>
  );
};

export default AlertItem;
