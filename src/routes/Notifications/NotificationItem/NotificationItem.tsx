import { Link } from 'react-router-dom';
import moment from 'moment';
import classNames from 'classnames';
import Typography from '@mui/material/Typography';
import CircleIcon from '@mui/icons-material/Circle';
import Box from '@mui/material/Box';
import { generatePath } from 'utils/router';
import APP_URLS from 'enums/urls';
import styles from './NotificationItem.module.scss';

interface Props {
  detection_id: string;
  peripheral_id: string;
  peripheral_name: string;
  severity: string;
  start_time: string;
  end_time: string;
  is_verified?: boolean;
  is_seen?: boolean;
}

const NotificationItem = ({
  detection_id: detectionId,
  peripheral_id: peripheralId,
  peripheral_name: peripheralName,
  severity,
  start_time: startTime,
  end_time: endTime,
  // is_verified: isVerified,
  is_seen: isSeen,
}: Props) => {
  const startDate = moment(startTime);
  const endDate = moment(endTime);
  const duration = moment.duration(endDate.diff(startDate)).seconds();
  const startDateFormat = startDate.format('HH:mm A');
  const href = generatePath(APP_URLS.alerts, {
    detectionId,
    peripheralId,
  });
  return (
    <div className={styles.root}>
      <Box className={styles.generalInfoContainer}>
        {!isSeen && <CircleIcon color="error" className={styles.statusIcon} />}
        <div className={styles.imgWrapper}></div>
        <div>
          <Typography variant="body2" display="block" className={styles.text}>
            {/*TODO: use real type (Theft or another)*/}
            Theft alert in Camera: {peripheralName} -{' '}
            {`${startDateFormat} (${duration}s)`}. Severity: {severity}
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
