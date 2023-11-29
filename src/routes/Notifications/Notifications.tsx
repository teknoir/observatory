import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment/moment';
// import _filter from 'lodash/filter';
// import _groupBy from 'lodash/groupBy';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from 'muiComponents/CircularProgress/CircularProgress';
import AppBar from 'components/AppBar/AppBar';
import MainContent from 'components/MainContent/MainContent';
import Pagination from 'components/Pagination/Pagination';
import { fetchNotifications } from 'services/apiRequests';
// import { fetchNotificationsPaginated } from 'services/apiRequests';
import APP_URLS from 'enums/urls';
import { notificationsByPage } from 'enums/queryKeys';
import NotificationsContent from './NotificationsContent/NotificationsContent';
import styles from './Notifications.module.scss';

// enum NotificationKeys {
//   data = 'data',
//   totalPages = 'total_pages',
// }

const NOTIFICATIONS_PER_PAGE = 10;

const Notifications = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  // TODO: Define time period to use
  const fromDate = moment().subtract(1, 'days').startOf('day');
  const toDate = moment();

  const { data, isLoading, isPreviousData, error } = useQuery({
    queryKey: [notificationsByPage, page],
    // TODO: Uncomment this when/if we have pagination available.
    // queryFn: () => fetchNotificationsPaginated(page, 10),
    queryFn: () => fetchNotifications({ fromDate, toDate }),
    keepPreviousData: true,
  });

  // TODO: Placeholder for error handling
  if (error) return <div>Something went wrong...</div>;

  // TODO: Placeholder using all data from API without pagination.
  const totalPages = Math.ceil(data?.length / NOTIFICATIONS_PER_PAGE);
  const dataByPage = data?.slice(
    (page - 1) * NOTIFICATIONS_PER_PAGE,
    page * NOTIFICATIONS_PER_PAGE
  );

  // TODO: We need to double check how we want to handle data.
  // We are currently filtering out verified notifications, and grouping by seen/not-seen.
  // We probably also need to sort by most recent.

  // TODO: Uncomment this when totalPages comes from API
  // const totalPages = data?.[NotificationKeys.totalPages] ?? 0;
  // const dataByPage = data?.[NotificationKeys.data] ?? [];

  // TODO: Uncomment this if we want to filter out verified notifications.
  // const dataUnverified = _filter(dataByPage, ['is_verified', false]);
  // const dataGrouped = _groupBy(dataUnverified, 'is_seen');
  return (
    <>
      <AppBar>
        <Typography variant="LabelMedium">Notifications</Typography>
      </AppBar>
      <MainContent>
        <Box className={styles.wrapper}>
          {isLoading || isPreviousData ? (
            <CircularProgress />
          ) : (
            // TODO: Uncomment if we want data to be grouped.
            // <NotificationsContent data={dataGrouped} />
            <NotificationsContent data={dataByPage} />
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
