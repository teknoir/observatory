import { Link } from 'react-router-dom';
import moment from 'moment';
import classNames from 'classnames';
import CircleIcon from '@mui/icons-material/Circle';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { NotificationStatus } from 'enums/notifications';
import APP_URLS from 'enums/urls';
import { INotificationsExtended } from 'ts/types';
import { generatePath } from 'utils/router';
import { durationToMMSS } from 'utils/moment';
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
      <Box className={styles.generalInfoContainer}>
        {data.status === NotificationStatus.New && (
          <CircleIcon color="error" className={styles.statusIcon} />
        )}
        <div className={styles.imgWrapper}></div>
        <div>
          <Typography variant="body2" display="block" className={styles.text}>
            {data.type} in Camera: {data.peripheral_name} -{' '}
            {`${startDateFormat} (${durationToMMSS(data.duration)})`}. Severity:{' '}
            {data.severity}
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
