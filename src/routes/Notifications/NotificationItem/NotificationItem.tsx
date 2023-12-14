import { Link } from 'react-router-dom';
import moment from 'moment';
import classNames from 'classnames';
import CircleIcon from '@mui/icons-material/Circle';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { generatePath } from 'utils/router';
import APP_URLS from 'enums/urls';
import { INotifications } from 'ts/types';
import styles from './NotificationItem.module.scss';

interface NotificationItemProps {
  data: INotifications;
}

const NotificationItem = ({
  data, // status
}: NotificationItemProps) => {
  const durationSeconds = Math.ceil(data.duration / 1000);
  const startDate = moment(data.start_time);
  const startDateFormat = startDate.format('HH:mm A');
  const href = generatePath(APP_URLS.alerts, {
    detectionId: data.detection_id,
    peripheralId: data.peripheral_id,
  });
  return (
    <div className={styles.root}>
      <Box className={styles.generalInfoContainer}>
        {/* {status === NotificationStatus.New && ( */}
        <CircleIcon color="error" className={styles.statusIcon} />
        {/* )} */}
        <div className={styles.imgWrapper}></div>
        <div>
          <Typography variant="body2" display="block" className={styles.text}>
            {data.type} in Camera: {data.peripheral_name} -{' '}
            {`${startDateFormat} (${durationSeconds}s)`}. Severity:{' '}
            {data.severity}
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
