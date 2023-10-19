import { useState } from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import Typography from "@mui/material/Typography";
import styles from "./Notifications.module.scss";

const Notifications = () => {
  const [hasNotifications, setHasNotifications] = useState(false);

  const toggleNotifications = () => {
    setHasNotifications(!hasNotifications);
  }

  return (
    <div className={styles.root} onClick={toggleNotifications}>
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
  )
}

export default Notifications;
