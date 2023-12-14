import _groupBy from 'lodash/groupBy';
import Typography from '@mui/material/Typography';
import NotificationItem from 'routes/Notifications/NotificationItem/NotificationItem';
import {
  NotificationStatus,
  NotificationsStatusKey,
} from 'enums/notifications';
import { INotificationsExtended } from 'ts/types';
import styles from './NotificationsContent.module.scss';

interface NotificationsContentProps {
  data: INotificationsExtended[];
}

const NotificationsContent = ({ data }: NotificationsContentProps) => {
  const groupData = _groupBy(data, NotificationsStatusKey);

  return (
    <>
      {groupData[NotificationStatus.New]?.length > 0 && (
        <Typography variant="LabelXL" className={styles.text}>
          New
        </Typography>
      )}
      {groupData[NotificationStatus.New]?.map((item) => (
        <NotificationItem key={item.detection_id} data={item} />
      ))}
      {groupData[NotificationStatus.Unverified]?.length > 0 && (
        <Typography variant="LabelXL" className={styles.text}>
          Unverified
        </Typography>
      )}
      {groupData[NotificationStatus.Unverified]?.map((item) => (
        <NotificationItem key={item.detection_id} data={item} />
      ))}
    </>
  );
};

export default NotificationsContent;
