import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import _filter from 'lodash/filter';
import _groupBy from 'lodash/groupBy';
import CircularProgress from 'muiComponents/CircularProgress/CircularProgress';
import AppBar from 'components/AppBar/AppBar';
import MainContent from 'components/MainContent/MainContent';
// import { fetchNotifications } from 'services/apiRequests';
import { fetchNotificationsTEST } from 'services/apiRequests';
import { notifications } from 'enums/queryKeys';
import Pagination from './Pagination/Pagination';
import styles from './Notifications.module.scss';
import NotificationsContent from './NotificationsContent/NotificationsContent';

const Notifications = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);

  const queryKey = [notifications];
  const { data, isLoading } = useQuery({
    queryKey: [queryKey, page],
    queryFn: () => fetchNotificationsTEST(page, 10),
  });

  console.log(data);

  const dataUnverified = _filter(data, ['is_verified', false]);
  const dataGrouped = _groupBy(dataUnverified, 'is_seen');
  return (
    <>
      <AppBar>Notifications</AppBar>
      <MainContent>
        <div className={styles.wrapper}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <NotificationsContent data={dataGrouped} />
          )}
          <Pagination page={page} count={10} />
        </div>
      </MainContent>
    </>
  );
};

export default Notifications;
