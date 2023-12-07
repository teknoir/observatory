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
import { NotificationStatus } from 'ts/types';
import Popover from './Popover/Popover';
import styles from './Notifications.module.scss';

const Notifications = () => {
  const { lastMessage } = useWSSContext();
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [count, setCount] = useState(0);

  const fromDate = moment().subtract(7, 'days').startOf('day');
  const toDate = moment();
  const limit = 10;

  const isOpen = Boolean(anchorEl);

  const queryKey = [notifications];
  const { data: dataNew, isLoading: isLoadingNew } = useQuery({
    queryKey,
    queryFn: () =>
      fetchNotifications({
        fromDate,
        toDate,
        status: NotificationStatus.New,
        limit,
      }),
    enabled: isOpen,
  });

  const { data: dataUnverified, isLoading: isLoadingUnverified } = useQuery({
    queryKey,
    queryFn: () =>
      fetchNotifications({
        fromDate,
        toDate,
        status: NotificationStatus.Unverified,
        limit,
      }),
    enabled: isOpen,
  });

  const data = {
    new: dataNew,
    unverified: dataUnverified,
  };

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
        isLoading={isLoadingNew || isLoadingUnverified}
        data={data}
      />
    </div>
  );
};

export default Notifications;
