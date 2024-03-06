import { useCallback, CSSProperties } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
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
import VideoStub from 'components/VideoStub/VideoStub';
import APP_URLS from 'enums/urls';
import { generatePath } from 'utils/router';
import { getUrlJpeg } from 'utils/media';
import { durationToMMSS } from 'utils/moment';
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
  const [searchParams] = useSearchParams();
  const item = data[index];
  const {
    detection_id: detectionId,
    peripheral_id: peripheralId,
    peripheral_name: name,
    type,
    ground_truth: groundTruth,
    severity,
    start_time: startTime,
    duration,
    status,
    video_url: videoUrl,
  } = item;
  let { video_snapshot: videoSnapshot } = item;
  // TODO: remove test url in future
  videoSnapshot = videoSnapshot
    ? getUrlJpeg(videoSnapshot)
    : 'https://picsum.photos/200/300';
  const hasVideo = !!videoUrl;
  const startDate = moment(startTime);
  const startDateFormat = startDate.format('HH:mm');
  const isVerified = status === EventStatus.Verified;

  const hasLink = detectionId && peripheralId;
  const isSelected =
    detectionIdUrl === detectionId && type === searchParams.get('type');
  const alertType = groundTruth || type;

  const getIcon = useCallback(() => {
    switch (alertType) {
      case AlertTypes.Loitering:
        return loiteringIcon;
      case AlertTypes.Theft:
        return theftIcon;
      case AlertTypes.OnGround:
        return personDownIcon;
      default:
        return '';
    }
  }, [alertType]);

  const getTooltipText = useCallback(() => {
    switch (alertType) {
      case AlertTypes.Loitering:
        return 'Loitering';
      case AlertTypes.Theft:
        return 'Catalytic Converter Theft';
      case AlertTypes.OnGround:
        return 'Person Down';
      default:
        return '';
    }
  }, [alertType]);

  const icon = getIcon();
  const tooltipText = getTooltipText();

  const renderContent = () => (
    <>
      <div className={styles.titleLine}>
        <div className={styles.leftTitleLine}>
          <CircleIcon color="error" className={styles.statusIcon} />
          <Typography variant="LabelMedium">
            {`${startDateFormat} (${durationToMMSS(duration)})`}
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
          {!hasVideo && <VideoStub />}
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
          to={generatePath(
            APP_URLS.alerts,
            { detectionId, peripheralId },
            { type }
          )}
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
