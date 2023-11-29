// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Typography from '@mui/material/Typography';
import NotificationItem from 'routes/Notifications/NotificationItem/NotificationItem';
import { IAlertEvent } from 'ts/types';

// const GroupKeys = {
//   seen: 'true',
//   notSeen: 'false',
// };

interface NotificationsContentProps {
  data: {
    [key: string]: IAlertEvent[];
  };
}

const NotificationsContent = ({ data }: NotificationsContentProps) => {
  return (
    <>
      <Typography variant="LabelXL">All Notifications</Typography>
      {data?.map((item: IAlertEvent) => (
        <NotificationItem key={item.detection_id} {...item} />
      ))}

      {/* TODO: Uncomment this when/if we have isSeen property available */}
      {/* <Typography variant="LabelXL">New</Typography>
      {data[GroupKeys.notSeen]?.map((item: IAlertEvent) => (
        <NotificationItem key={item.detection_id} {...item} />
      ))}
      <Typography variant="LabelXL">Unverified</Typography>
      {data[GroupKeys.seen]?.map((item: IAlertEvent) => (
        <NotificationItem key={item.detection_id} {...item} />
      ))} */}
    </>
  );
};

export default NotificationsContent;
