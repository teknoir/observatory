import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import CircularProgress from 'muiComponents/CircularProgress/CircularProgress';
import { INotifications } from 'ts/types';
import { NotificationStatus, NotificationsPeriod } from 'enums/notifications';
import APP_URLS from 'enums/urls';
import styleVariables from 'enums/styleVariables.module.scss';
import { generatePath } from 'utils/router';
import NotificationItem from '../NotificationItem/NotificationItem';
import styles from './Popover.module.scss';

interface Props {
  isOpen: boolean;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  isLoading: boolean;
  data: {
    new: INotifications[];
    unverified: INotifications[];
  };
  error?: boolean;
}

const PopoverComponent = ({
  isOpen,
  anchorEl,
  handleClose,
  isLoading,
  data,
  error,
}: Props) => {
  return (
    <Popover
      id="notifications-popover"
      open={isOpen}
      disableScrollLock
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      sx={{
        '& .MuiPopover-paper': {
          width: 616,
          maxHeight: 472,
          color: styleVariables.fadedBlack,
          borderRadius: 0,
          background: styleVariables.totalWhite,
          padding: '20px',
        },
      }}
    >
      <Typography variant="LabelXL" className={styles.title}>
        Notifications
      </Typography>
      <div className={styles.list}>
        {isLoading ? (
          <CircularProgress />
        ) : error ? (
          <Typography variant="LabelLarge">Something went wrong...</Typography>
        ) : data[NotificationStatus.New]?.length === 0 &&
          data[NotificationStatus.Unverified]?.length === 0 ? (
          <Typography variant="LabelLarge">
            No notifications found for the last {NotificationsPeriod.DAYS_30}{' '}
            days
          </Typography>
        ) : (
          <>
            {data[NotificationStatus.New].length > 0 && (
              <Typography variant="LabelLarge" className={styles.subTitle}>
                New
              </Typography>
            )}
            {data[NotificationStatus.New].map((item) => {
              const notificationWithStatus = {
                ...item,
                status: NotificationStatus.New,
              };
              return <NotificationItem data={notificationWithStatus} />;
            })}
            <br />
            {data[NotificationStatus.Unverified].length > 0 && (
              <Typography variant="LabelLarge" className={styles.subTitle}>
                Unverified
              </Typography>
            )}
            {data[NotificationStatus.Unverified].map((item) => {
              const notificationWithStatus = {
                ...item,
                status: NotificationStatus.Unverified,
              };
              return <NotificationItem data={notificationWithStatus} />;
            })}
          </>
        )}
      </div>
      <Button
        component={Link}
        to={generatePath(APP_URLS.notifications)}
        variant="contained"
        color="primary"
        fullWidth
        className={styles.buttonAll}
      >
        <Typography variant="LabelLarge">See all notifications</Typography>
      </Button>
    </Popover>
  );
};

export default PopoverComponent;
