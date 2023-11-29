// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Typography from '@mui/material/Typography';
import NotificationItem from 'routes/Notifications/NotificationItem/NotificationItem';
import { IAlertEvent } from 'ts/types';

const GroupKeys = {
  seen: 'true',
  notSeen: 'false',
};

interface NotificationsContentProps {
  data: {
    [key: string]: IAlertEvent[];
  };
}

const NotificationsContent = ({ data }: NotificationsContentProps) => {
  return (
    <>
      <Typography
        variant="body2"
        display="block"
        // className={styles.title}
      >
        New
      </Typography>
      {data[GroupKeys.notSeen]?.map((item: IAlertEvent) => (
        <NotificationItem key={item.detection_id} {...item} />
      ))}
      <Typography
        variant="body2"
        display="block"
        // className={styles.title}
      >
        Unverified
      </Typography>
      {data[GroupKeys.seen]?.map((item: IAlertEvent) => (
        <NotificationItem key={item.detection_id} {...item} />
      ))}
    </>
  );
};

export default NotificationsContent;
