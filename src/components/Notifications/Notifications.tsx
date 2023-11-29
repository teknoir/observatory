import { useState, useEffect, MouseEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment/moment';
import Typography from '@mui/material/Typography';
import bellIcon from 'assets/icons/bellIcon.svg';
import bellRedIcon from 'assets/icons/bellRedIcon.svg';
import { fetchNotifications } from 'services/apiRequests';
import { useWSSContext } from 'context/webSocketContext';
import Icon from 'components/Icon/Icon';
import { notifications } from 'enums/queryKeys';
import { TOPICS, TYPES } from 'enums/wss';
import Popover from './Popover/Popover';
import styles from './Notifications.module.scss';

const Notifications = () => {
  const { lastMessage } = useWSSContext();
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [count, setCount] = useState(0);

  // TODO: Define time period to use
  const fromDate = moment().subtract(1, 'days').startOf('day');
  const toDate = moment();

  const isOpen = Boolean(anchorEl);

  const queryKey = [notifications];
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: () => fetchNotifications({ fromDate, toDate }),
    enabled: isOpen,
  });

  // TODO: Using sliced data to limit the number of notifications for the moment.
  const dataSliced = data?.slice(0, 20);

  useEffect(() => {
    if (lastMessage) {
      const data = JSON.parse(lastMessage.data);
      const { type } = data;
      switch (type) {
        case TYPES.MESSAGE: {
          const { topic } = data;
          if (topic === TOPICS.FRONT_END_ALERT) {
            setCount((prevCount) => prevCount + 1);
          }
          break;
        }
      }
    }
  }, [lastMessage, setCount]);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.root}>
      <div onClick={handleClick}>
        {count ? (
          <div className={styles.iconWrapper}>
            <Icon icon={bellRedIcon} />
            <Typography variant="LabelMedium" display="block">
              +{count}
            </Typography>
          </div>
        ) : (
          <Icon icon={bellIcon} />
        )}
      </div>
      <Popover
        isOpen={isOpen}
        anchorEl={anchorEl}
        handleClose={handleClose}
        isLoading={isLoading}
        // TODO: Using sliced data to limit the number of notifications for the moment.
        // data={data}
        data={dataSliced}
      />
    </div>
  );
};

export default Notifications;
