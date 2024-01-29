import { Link } from 'react-router-dom';
import moment from 'moment';
import Typography from '@mui/material/Typography';
import CircleIcon from '@mui/icons-material/Circle';
import VideoStub from 'components/VideoStub/VideoStub';
import { generatePath } from 'utils/router';
import { NotificationStatus } from 'enums/notifications';
import APP_URLS from 'enums/urls';
import { INotificationsExtended } from 'ts/types';
import styles from './NotificationItem.module.scss';

interface NotificationItemProps {
  data: INotificationsExtended;
}

const NotificationItem = ({ data }: NotificationItemProps) => {
  const {
    duration,
    start_time: startTime,
    status,
    detection_id: detectionId,
    peripheral_id: peripheralId,
    video_snapshot: videoSnapshot,
    video_url: videoUrl,
  } = data;
  const durationSeconds = Math.ceil(duration / 1000);
  const startDate = moment(startTime);
  const startDateFormat = startDate.format('hh:mm A');
  const href = generatePath(APP_URLS.alerts, {
    detectionId,
    peripheralId,
  });
  const hasVideo = !!videoUrl;
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
            {data.type} in Camera: {data.peripheral_name} -{' '}
            {`${startDateFormat} (${durationSeconds}s)`}.
          </span>
          <br />
          <span>Severity: {data.severity}</span>
        </Typography>
      </div>
      <Link to={href} className={styles.buttonLink}>
        <Typography variant="LabelLarge">View</Typography>
      </Link>
    </div>
  );
};

export default NotificationItem;
