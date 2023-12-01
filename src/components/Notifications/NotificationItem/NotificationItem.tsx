import { Link } from 'react-router-dom';
import moment from 'moment';
import Typography from '@mui/material/Typography';
// import CircleIcon from '@mui/icons-material/Circle';
import { generatePath } from 'utils/router';
import APP_URLS from 'enums/urls';
import styles from './NotificationItem.module.scss';

interface Props {
  detection_id: string;
  duration: number;
  peripheral_id: string;
  peripheral_name: string;
  severity: string;
  start_time: string;
  is_verified: boolean;
}

const NotificationItem = ({
  detection_id: detectionId,
  duration,
  peripheral_id: peripheralId,
  peripheral_name: peripheralName,
  severity,
  start_time: startTime,
}: Props) => {
  const durationSeconds = Math.ceil(duration / 1000);
  const startDate = moment(startTime);
  const startDateFormat = startDate.format('HH:mm A');
  const href = generatePath(APP_URLS.alerts, {
    detectionId,
    peripheralId,
  });
  return (
    <div className={styles.root}>
      {/* TODO: Add when we have is_seen property */}
      {/*<CircleIcon color="error" className={styles.statusIcon} /> */}
      <div className={styles.imgWrapper}></div>
      <div>
        <Typography variant="BodyMedium" className={styles.text}>
          {/*TODO: use real type (Theft or another)*/}
          <span>
            Theft alert in Camera: {peripheralName} -{' '}
            {`${startDateFormat} (${durationSeconds}s)`}.
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
