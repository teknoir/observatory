// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useContext, useEffect, useState, MouseEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import _last from 'lodash/last';
import Typography from '@mui/material/Typography';
import bellIcon from 'assets/icons/bellIcon.svg';
import bellRedIcon from 'assets/icons/bellRedIcon.svg';
import { fetchNotifications } from 'services/apiRequests';
import { HomeContext } from 'context/HomeContext/HomeContext';
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
  const { peripheralIdNotified, setPeripheralIdNotified } =
    useContext(HomeContext);
  // TODO: State for testing, remove later
  const [fromWs, setFromWs] = useState(false);

  const isOpen = Boolean(anchorEl);

  const queryKey = [notifications];
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: () => fetchNotifications(),
    enabled: isOpen,
  });

  if (data?.length > 0 && fromWs) {
    setPeripheralIdNotified(_last(data)?.peripheral_id);
    setFromWs(false);
  }

  // TODO: Remove after testing
  const handleClickBtn2 = () => {
    setPeripheralIdNotified('2');
  };
  const handleClickBtn3 = () => {
    setPeripheralIdNotified('3');
  };

  // set interval to reset serPEripheralIdNotified to empty string after 1000ms only if setPeripheralIdNotified is not empty string
  useEffect(() => {
    if (peripheralIdNotified) {
      const interval = setInterval(() => {
        setPeripheralIdNotified('');
      }, 2000);
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
      setFromWs(true);
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
      <button onClick={handleClickBtn2}>2</button>
      <button onClick={handleClickBtn3}>3</button>
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
        data={data}
      />
    </div>
  );
};

export default Notifications;
