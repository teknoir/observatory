import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import _filter from 'lodash/filter';
import _groupBy from 'lodash/groupBy';
import Box from '@mui/material/Box';
import CircularProgress from 'muiComponents/CircularProgress/CircularProgress';
import AppBar from 'components/AppBar/AppBar';
import MainContent from 'components/MainContent/MainContent';
import Pagination from 'components/Pagination/Pagination';
import { fetchNotificationsPaginated } from 'services/apiRequests';
import APP_URLS from 'enums/urls';
import { notificationsByPage } from 'enums/queryKeys';
import NotificationsContent from './NotificationsContent/NotificationsContent';
import styles from './Notifications.module.scss';

enum NotificationKeys {
  data = 'data',
  totalPages = 'total_pages',
}

const Notifications = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const { data, isLoading, isPreviousData, error } = useQuery({
    queryKey: [notificationsByPage, page],
    queryFn: () => fetchNotificationsPaginated(page, 10),
    keepPreviousData: true,
  });

  // TODO: Placeholder for error handling
  if (error) return <div>Something went wrong...</div>;

  // TODO: We need to double check how we want to handle data.
  // We are currently filtering out verified notifications, and grouping by seen/not-seen.
  // We probably also need to sort by most recent.
  const totalPages = data?.[NotificationKeys.totalPages] ?? 0;
  const dataByPage = data?.[NotificationKeys.data] ?? [];
  const dataUnverified = _filter(dataByPage, ['is_verified', false]);
  const dataGrouped = _groupBy(dataUnverified, 'is_seen');
  return (
    <>
      <AppBar>Notifications</AppBar>
      <MainContent>
        <Box className={styles.wrapper}>
          {isLoading || isPreviousData ? (
            <CircularProgress />
          ) : (
            <NotificationsContent data={dataGrouped} />
          )}
          <Box className={styles.pagination}>
            {(!dataByPage || dataByPage.length != 0) && (
              <Pagination
                page={page}
                count={totalPages}
                baseUrl={APP_URLS.notifications}
              />
            )}
          </Box>
        </Box>
      </MainContent>
    </>
  );
};

export default Notifications;
