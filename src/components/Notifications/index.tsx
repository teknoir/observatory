// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useState, MouseEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import Typography from "@mui/material/Typography";
import { fetchNotifications } from "services/apiRequests";
import { notifications } from 'enums/queryKeys';
import Popover from "./Popover/Popover";
import styles from "./Notifications.module.scss";

const Notifications = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [hasNotifications, setHasNotifications] = useState(false);

  const isOpen = Boolean(anchorEl);

  const { data, isLoading } = useQuery({
    queryKey: [notifications],
    queryFn: () => fetchNotifications(),
    enabled: isOpen
  })

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.root}>
      <div onClick={handleClick}>
        {hasNotifications ? (
          <>
            <NotificationsIcon color={"error"} />
            <Typography variant="body2" display="block" className={styles.text}>
              +1
            </Typography>
          </>
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
