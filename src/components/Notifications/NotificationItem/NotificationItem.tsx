import { Link } from 'react-router-dom';
import moment from 'moment';
import Typography from '@mui/material/Typography';
import CircleIcon from '@mui/icons-material/Circle';
import { generatePath } from 'utils/router';
import APP_URLS from 'enums/urls';
import { INotifications, NotificationStatus } from 'ts/types';
import styles from './NotificationItem.module.scss';

interface Props {
  data: INotifications;
  status: NotificationStatus;
}

const NotificationItem = ({ data, status }: Props) => {
  const durationSeconds = Math.ceil(data.duration / 1000);
  const startDate = moment(data.start_time);
  const startDateFormat = startDate.format('HH:mm A');
  const href = generatePath(APP_URLS.alerts, {
    detectionId: data.detection_id,
    peripheralId: data.peripheral_id,
  });
  return (
    <div className={styles.root}>
      {status === NotificationStatus.New && (
        <CircleIcon color="error" className={styles.statusIcon} />
      )}
      <div className={styles.imgWrapper}></div>
      <div>
        <Typography variant="BodyMedium" className={styles.text}>
          {/*TODO: use real type (Theft or another)*/}
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
