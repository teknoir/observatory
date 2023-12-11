import { Link } from 'react-router-dom';
import moment from 'moment';
import classNames from 'classnames';
import CircleIcon from '@mui/icons-material/Circle';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { generatePath } from 'utils/router';
import APP_URLS from 'enums/urls';
import { INotifications, NotificationStatus } from 'ts/types';
import styles from './NotificationItem.module.scss';

const NotificationItem = ({
  detection_id: detectionId,
  duration,
  peripheral_id: peripheralId,
  peripheral_name: peripheralName,
  severity,
  start_time: startTime,
  status,
}: INotifications) => {
  const durationSeconds = Math.ceil(duration / 1000);
  const startDate = moment(startTime);
  const startDateFormat = startDate.format('HH:mm A');
  const href = generatePath(APP_URLS.alerts, {
    detectionId,
    peripheralId,
  });
  return (
    <div className={styles.root}>
      <Box className={styles.generalInfoContainer}>
        {status === NotificationStatus.New && (
          <CircleIcon color="error" className={styles.statusIcon} />
        )}
        <div className={styles.imgWrapper}></div>
        <div>
          <Typography variant="body2" display="block" className={styles.text}>
            {/*TODO: use real type (Theft or another)*/}
            Theft alert in Camera: {peripheralName} -{' '}
            {`${startDateFormat} (${durationSeconds}s)`}. Severity: {severity}
          </Typography>
        </div>
      </Box>
      <Link
        to={href}
        className={classNames(styles.buttonLink, {
          // [styles.buttonLinkVerified]: isVerified,
        })}
      >
        View
      </Link>
    </div>
  );
};

export default NotificationItem;
