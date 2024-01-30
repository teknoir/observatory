import { Link } from 'react-router-dom';
import moment from 'moment';
import Typography from '@mui/material/Typography';
import CircleIcon from '@mui/icons-material/Circle';
import { generatePath } from 'utils/router';
import { NotificationStatus } from 'enums/notifications';
import APP_URLS from 'enums/urls';
import { durationToMMSS } from 'utils/moment';
import { INotificationsExtended } from 'ts/types';
import styles from './NotificationItem.module.scss';

interface NotificationItemProps {
  data: INotificationsExtended;
}

const NotificationItem = ({ data }: NotificationItemProps) => {
  const startDate = moment(data.start_time);
  const startDateFormat = startDate.format('hh:mm A');
  const href = generatePath(APP_URLS.alerts, {
    detectionId: data.detection_id,
    peripheralId: data.peripheral_id,
  });
  return (
    <div className={styles.root}>
      {data.status === NotificationStatus.New && (
        <CircleIcon color="error" className={styles.statusIcon} />
      )}
      <div className={styles.imgWrapper}></div>
      <div>
        <Typography variant="BodyMedium" className={styles.text}>
          <span>
            {data.type} in Camera: {data.peripheral_name} -{' '}
            {`${startDateFormat} (${durationToMMSS(data.duration)})`}.
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
