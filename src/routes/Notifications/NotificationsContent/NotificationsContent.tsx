import Typography from '@mui/material/Typography';
import NotificationItem from 'routes/Notifications/NotificationItem/NotificationItem';
import { INotifications } from 'ts/types';
import styles from './NotificationsContent.module.scss';

interface NotificationsContentProps {
  data: INotifications[];
  newLength: number;
}

const NotificationsContent = ({
  data,
  newLength,
}: NotificationsContentProps) => {
  return (
    <>
      {data?.map((item: INotifications, index: number) => (
        <>
          {newLength > 0 && index === 0 ? (
            <Typography variant="LabelXL" className={styles.text}>
              New
            </Typography>
          ) : index === newLength ? (
            <Typography variant="LabelXL" className={styles.text}>
              Unverified
            </Typography>
          ) : null}
          <NotificationItem key={item.detection_id} data={item} />
        </>
      ))}
    </>
  );
};

export default NotificationsContent;
