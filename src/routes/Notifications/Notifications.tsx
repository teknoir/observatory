import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import _filter from 'lodash/filter';
import _groupBy from 'lodash/groupBy';
import Box from '@mui/material/Box';
import CircularProgress from 'muiComponents/CircularProgress/CircularProgress';
import AppBar from 'components/AppBar/AppBar';
import MainContent from 'components/MainContent/MainContent';
// import { fetchNotifications } from 'services/apiRequests';
import { fetchNotificationsTEST } from 'services/apiRequests';
import { notificationsByPage } from 'enums/queryKeys';
import Pagination from './Pagination/Pagination';
import styles from './Notifications.module.scss';
import NotificationsContent from './NotificationsContent/NotificationsContent';

const Notifications = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const { data, isLoading } = useQuery({
    queryKey: [notificationsByPage, page],
    queryFn: () => fetchNotificationsTEST(page, 10),
  });

  // TODO: We need to double check how we want to handle data.
  // We are currently filtering out verified notifications, and grouping by seen/not-seen.
  // We probably also need to sort by most recent.
  console.log(data);
  const dataUnverified = _filter(data, ['is_verified', false]);
  const dataGrouped = _groupBy(dataUnverified, 'is_seen');
  return (
    <>
      <AppBar>Notifications</AppBar>
      <MainContent>
        <Box className={styles.wrapper}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <NotificationsContent data={dataGrouped} />
          )}
          <Box>
            {/* TODO: Change count to be dynamic */}
            <Pagination page={page} count={5} />
          </Box>
        </Box>
      </MainContent>
    </>
  );
};

export default Notifications;
