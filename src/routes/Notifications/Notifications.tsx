import { useQuery } from '@tanstack/react-query';
import CircularProgress from 'muiComponents/CircularProgress/CircularProgress';
import AppBar from 'components/AppBar/AppBar';
import MainContent from 'components/MainContent/MainContent';
import { notifications } from 'enums/queryKeys';
import { fetchNotifications } from 'services/apiRequests';
import NotificationItem from './NotificationItem/NotificationItem';
import { Typography } from '@mui/material';

const Notifications = () => {
  const queryKey = [notifications];
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: () => fetchNotifications(),
  });

  return (
    <>
      <AppBar>Notifications</AppBar>
      <MainContent>
        <div
          style={{
            padding: 32,
          }}
        >
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <Typography
                variant="body2"
                display="block"
                // className={styles.title}
              >
                Unverified
              </Typography>
              {/* TODO: Group by not new? */}
              {data?.map((item) => (
                <NotificationItem key={item.detection_id} {...item} />
              ))}
            </>
          )}
        </div>
      </MainContent>
    </>
  );
};

export default Notifications;
