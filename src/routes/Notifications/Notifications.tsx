import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import _concat from 'lodash/concat';
import _groupBy from 'lodash/groupBy';
import moment from 'moment/moment';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from 'muiComponents/CircularProgress/CircularProgress';
import AppBar from 'components/AppBar/AppBar';
import MainContent from 'components/MainContent/MainContent';
import Pagination from 'components/Pagination/Pagination';
import { fetchNotifications } from 'services/apiRequests';
import APP_URLS from 'enums/urls';
import { notificationsByPage } from 'enums/queryKeys';
import { NotificationStatus } from 'ts/types';
import NotificationsContent from './NotificationsContent/NotificationsContent';
import styles from './Notifications.module.scss';

const NOTIFICATIONS_PER_PAGE = 10;

const Notifications = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  // TODO: Define time period to use
  const fromDate = moment().subtract(1, 'days').startOf('day');
  const toDate = moment();

  const { data, isLoading, isPreviousData, error } = useQuery({
    queryKey: [notificationsByPage, page],
    queryFn: () => fetchNotifications({ fromDate, toDate }),
    keepPreviousData: true,
  });

  // TODO: Placeholder for error handling
  if (error) return <div>Something went wrong...</div>;

  const dataGrouped = _groupBy(data, 'status');
  const dataSorted = _concat(
    dataGrouped[NotificationStatus.New],
    dataGrouped[NotificationStatus.Unverified]
  );
  const newLength = dataGrouped[NotificationStatus.New]?.length;
  const totalPages = Math.ceil(dataSorted?.length / NOTIFICATIONS_PER_PAGE);
  const dataByPage = dataSorted?.slice(
    (page - 1) * NOTIFICATIONS_PER_PAGE,
    page * NOTIFICATIONS_PER_PAGE
  );

  return (
    <>
      <AppBar>
        <Typography variant="LabelMedium">Notifications</Typography>
      </AppBar>
      <MainContent>
        <Box className={styles.wrapper}>
          {isLoading || isPreviousData ? (
            <CircularProgress />
          ) : dataGrouped['undefined'] ? (
            <Typography variant="LabelMedium">
              Looks like there's no data
            </Typography>
          ) : (
            <NotificationsContent data={dataByPage} newLength={newLength} />
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
