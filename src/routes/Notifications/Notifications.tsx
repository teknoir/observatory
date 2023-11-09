import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Typography from '@mui/material/Typography';
import CircularProgress from 'muiComponents/CircularProgress/CircularProgress';
import AppBar from 'components/AppBar/AppBar';
import MainContent from 'components/MainContent/MainContent';
import { fetchNotifications } from 'services/apiRequests';
import { notifications } from 'enums/queryKeys';
import NotificationItem from './NotificationItem/NotificationItem';

const Notifications = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);

  const queryKey = [notifications];
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: () => fetchNotifications(),
  });

  console.log('location', location);
  console.log('query', query);
  console.log('page', page);

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
          <Pagination
            page={page}
            count={10}
            color="secondary"
            sx={{
              '& .MuiPagination-ul': {
                justifyContent: 'center',
              },
            }}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`/notifications${
                  item.page === 1 ? '' : `?page=${item.page}`
                }`}
                sx={{
                  '& .MuiButtonBase-root.MuiPaginationItem-root.Mui-selected ':
                    {
                      borderRadius: 0,
                      backgroundColor: 'red',
                    },
                }}
                {...item}
              />
            )}
          />
        </div>
      </MainContent>
    </>
  );
};

export default Notifications;
