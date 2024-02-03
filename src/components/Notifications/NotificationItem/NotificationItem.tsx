import { Link } from 'react-router-dom';
import moment from 'moment';
import Typography from '@mui/material/Typography';
import CircleIcon from '@mui/icons-material/Circle';
import VideoStub from 'components/VideoStub/VideoStub';
import { NotificationStatus } from 'enums/notifications';
import APP_URLS from 'enums/urls';
import { generatePath } from 'utils/router';
import { durationToMMSS } from 'utils/moment';
import { getUrlJpeg } from 'utils/media';
import { INotificationsExtended } from 'ts/types';
import styles from './NotificationItem.module.scss';

interface NotificationItemProps {
  data: INotificationsExtended;
}

const NotificationItem = ({ data }: NotificationItemProps) => {
  const {
    duration,
    type,
    severity,
    start_time: startTime,
    status,
    detection_id: detectionId,
    peripheral_id: peripheralId,
    peripheral_name: peripheralName,
    video_url: videoUrl,
  } = data;
  let { video_snapshot: videoSnapshot } = data;
  // TODO: remove test url in future
  videoSnapshot = videoSnapshot
    ? getUrlJpeg(videoSnapshot)
    : 'https://picsum.photos/200/300';
  const hasVideo = !!videoUrl;
  const startDate = moment(startTime);
  const startDateFormat = startDate.format('hh:mm A');
  const href = generatePath(APP_URLS.alerts, {
    detectionId,
    peripheralId,
  });
  return (
    <div className={styles.root}>
      {status === NotificationStatus.New && (
        <CircleIcon color="error" className={styles.statusIcon} />
      )}
      <div className={styles.imgWrapper}>
        <img src={videoSnapshot} alt="img" className={styles.videoSnapshot} />
        {!hasVideo && <VideoStub />}
      </div>
      <div>
        <Typography variant="BodyMedium" className={styles.text}>
          <span>
            {type} in Camera: {peripheralName} -{' '}
            {`${startDateFormat} (${durationToMMSS(duration)})`}.
          </span>
          <br />
          <span>Severity: {severity}</span>
        </Typography>
      </div>
      <Link to={href} className={styles.buttonLink}>
        <Typography variant="LabelLarge">View</Typography>
      </Link>
    </div>
  );
};

export default NotificationItem;
