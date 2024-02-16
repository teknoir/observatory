import { Link } from 'react-router-dom';
import moment from 'moment';
import classNames from 'classnames';
import CircleIcon from '@mui/icons-material/Circle';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
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
  const href = generatePath(
    APP_URLS.alerts,
    {
      detectionId,
      peripheralId,
    },
    { type }
  );

  return (
    <div className={styles.root}>
      <Box className={styles.generalInfoContainer}>
        {status === NotificationStatus.New && (
          <CircleIcon color="error" className={styles.statusIcon} />
        )}
        <div className={styles.imgWrapper}>
          <img src={videoSnapshot} alt="img" className={styles.videoSnapshot} />
          {!hasVideo && <VideoStub />}
        </div>
        <div>
          <Typography variant="body2" display="block" className={styles.text}>
            {type} in Camera: {peripheralName} -{' '}
            {`${startDateFormat} (${durationToMMSS(duration)})`}. Severity:{' '}
            {severity}
          </Typography>
        </div>
      </Box>
      <Link to={href} className={classNames(styles.buttonLink, {})}>
        View
      </Link>
    </div>
  );
};

export default NotificationItem;
