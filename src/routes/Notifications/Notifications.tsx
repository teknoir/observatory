import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment/moment';
import _concat from 'lodash/concat';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from 'muiComponents/CircularProgress/CircularProgress';
import AppBar from 'components/AppBar/AppBar';
import MainContent from 'components/MainContent/MainContent';
import Pagination from 'components/Pagination/Pagination';
import { fetchNotifications } from 'services/apiRequests';
import {
  NotificationStatus,
  NotificationsCount,
  NotificationsPeriod,
} from 'enums/notifications';
import APP_URLS from 'enums/urls';
import { notificationsNew, notificationsUnverified } from 'enums/queryKeys';
import { INotifications } from 'ts/types';
import NotificationsContent from './NotificationsContent/NotificationsContent';
import styles from './Notifications.module.scss';

const Notifications = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const fromDate = moment()
    .subtract(NotificationsPeriod.DAYS_365, 'days')
    .startOf('day');
  const toDate = moment();

  const {
    data: dataNew,
    isLoading: isLoadingNew,
    isPreviousData: isPreviousDataNew,
    error: errorNew,
  } = useQuery({
    queryKey: [notificationsNew, page],
    queryFn: () =>
      fetchNotifications({
        fromDate,
        toDate,
        status: NotificationStatus.New,
      }),
    keepPreviousData: true,
  });

  const {
    data: dataUnverified,
    isLoading: isLoadingUnverified,
    isPreviousData: isPreviousDataUnverified,
    error: errorUnverified,
  } = useQuery({
    queryKey: [notificationsUnverified, page],
    queryFn: () =>
      fetchNotifications({
        fromDate,
        toDate,
        status: NotificationStatus.Unverified,
      }),
    keepPreviousData: true,
  });

  const isLoading = isLoadingNew || isLoadingUnverified;
  const isPreviousData = isPreviousDataNew || isPreviousDataUnverified;

  const totalPages = Math.ceil(
    (dataNew?.length + dataUnverified?.length) / NotificationsCount.ITEMS_20
  );
  const dataNewLength = dataNew?.length;
  const allData = _concat(dataNew, dataUnverified);
  const paginatedData = paginateData(
    allData,
    page,
    NotificationsCount.ITEMS_20
  );

  function paginateData(
    data: Array<INotifications>,
    page: number,
    itemsPerPage: number
  ) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex).map((item, index) => ({
      ...item,
      status:
        startIndex + index < dataNewLength
          ? NotificationStatus.New
          : NotificationStatus.Unverified,
    }));
  }

  return (
    <>
      <AppBar>
        <Typography variant="LabelMedium">Notifications</Typography>
      </AppBar>
      <MainContent>
        <Box className={styles.wrapper}>
          {isLoading || isPreviousData ? (
            <CircularProgress />
          ) : errorNew && errorUnverified ? (
            <Typography variant="LabelMedium">
              Something went wrong...
            </Typography>
          ) : paginatedData?.length === 0 ? (
            <Typography variant="LabelMedium">
              No notifications found for the last {NotificationsPeriod.DAYS_30}{' '}
              days
            </Typography>
          ) : (
            <NotificationsContent data={paginatedData} />
          )}
          <Box className={styles.pagination}>
            {(!paginatedData || paginatedData.length != 0) && (
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
