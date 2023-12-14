import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import CircularProgress from 'muiComponents/CircularProgress/CircularProgress';
import { generatePath } from 'utils/router';
import { INotifications, NotificationStatus } from 'ts/types';
import APP_URLS from 'enums/urls';
import styleVariables from 'enums/styleVariables.module.scss';
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
}

const PopoverComponent = ({
  isOpen,
  anchorEl,
  handleClose,
  isLoading,
  data,
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
        ) : (
          <>
            <Typography variant="LabelLarge" className={styles.subTitle}>
              New
            </Typography>
            {data[NotificationStatus.New].map((item) => (
              <NotificationItem {...item} />
            ))}
            <br />
            <Typography variant="LabelLarge" className={styles.subTitle}>
              Unverified
            </Typography>
            {data[NotificationStatus.Unverified].map((item) => (
              <NotificationItem {...item} />
            ))}
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
