// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useState, useEffect, MouseEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import Typography from "@mui/material/Typography";
import { fetchNotifications } from "services/apiRequests";
import { useWSSContext } from "context/webSocketContext";
import { notifications } from 'enums/queryKeys';
import { TOPICS, TYPES } from 'enums/wss';
import Popover from "./Popover/Popover";
import styles from "./Notifications.module.scss";

const Notifications = () => {
  const { lastMessage } = useWSSContext();
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [count, setCount] = useState(0);

  const isOpen = Boolean(anchorEl);

  const queryKey = [notifications];
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: () => fetchNotifications(),
    enabled: isOpen
  })

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
  }, [lastMessage, setCount])

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
            <NotificationsIcon color={"error"} />
            <Typography variant="body2" display="block" className={styles.text}>
              +{count}
            </Typography>
          </div>
        ) : (
          <NotificationsOutlinedIcon />
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
  )
}

export default Notifications;
