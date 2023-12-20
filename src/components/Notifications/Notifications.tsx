import { useContext, useState, useEffect, MouseEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment/moment';
import _last from 'lodash/last';
import Typography from '@mui/material/Typography';
import bellIcon from 'assets/icons/bellIcon.svg';
import bellRedIcon from 'assets/icons/bellRedIcon.svg';
import { fetchNotifications } from 'services/apiRequests';
import { HomeContext } from 'context/HomeContext/HomeContext';
import { useWSSContext } from 'context/webSocketContext';
import Icon from 'components/Icon/Icon';
import {
  NotificationStatus,
  NotificationsCount,
  NotificationsPeriod,
} from 'enums/notifications';
import { notificationsNew, notificationsUnverified } from 'enums/queryKeys';
import { TOPICS, TYPES } from 'enums/wss';
import { INotifications } from 'ts/types';
import Popover from './Popover/Popover';
import styles from './Notifications.module.scss';

const Notifications = () => {
  const { lastMessage } = useWSSContext();
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [count, setCount] = useState(0);
  const { peripheralIdNotified, setPeripheralIdNotified } =
    useContext(HomeContext);

  const fromDate = moment()
    .subtract(NotificationsPeriod.DAYS_365, 'days')
    .startOf('day');
  const toDate = moment();
  const isOpen = Boolean(anchorEl);

  const {
    data: dataNew,
    isLoading: isLoadingNew,
    error: errorNew,
  } = useQuery({
    queryKey: [notificationsNew],
    queryFn: () =>
      fetchNotifications({
        fromDate,
        toDate,
        status: NotificationStatus.New,
        limit: NotificationsCount.ITEMS_20,
      }),
    enabled: isOpen,
  });

  const {
    data: dataUnverified,
    isLoading: isLoadingUnverified,
    error: errorUnverified,
  } = useQuery({
    queryKey: [notificationsUnverified],
    queryFn: () =>
      fetchNotifications({
        fromDate,
        toDate,
        status: NotificationStatus.Unverified,
        limit: NotificationsCount.ITEMS_20,
      }),
    enabled: isOpen,
  });

  useEffect(() => {
    if (peripheralIdNotified) {
      const interval = setInterval(() => {
        setPeripheralIdNotified('');
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [peripheralIdNotified, setPeripheralIdNotified]);

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

  function sliceData(
    dataNew: INotifications[],
    dataUnverified: INotifications[],
    numItems: number
  ) {
    const dataNewSliced = dataNew?.slice(0, numItems);
    const dataUnverifiedSliced = dataUnverified?.slice(
      0,
      numItems - dataNewSliced?.length
    );
    return {
      [NotificationStatus.New]: dataNewSliced,
      [NotificationStatus.Unverified]: dataUnverifiedSliced,
    };
  }

  const slicedData = sliceData(
    dataNew,
    dataUnverified,
    NotificationsCount.ITEMS_20
  );

  if (dataNew?.length > 0) {
    setPeripheralIdNotified((_last(dataNew) as INotifications).peripheral_id);
  }

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
        data={slicedData}
        error={!!(errorNew || errorUnverified)}
      />
    </div>
  );
};

export default Notifications;
