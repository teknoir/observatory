// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Link } from 'react-router-dom';
import _groupBy from 'lodash/groupBy';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import CircularProgress from 'muiComponents/CircularProgress/CircularProgress';
import { IAlertEvent } from 'ts/types';
import APP_URLS from 'enums/urls';
import styleVariables from 'enums/styleVariables.module.scss';
import NotificationItem from '../NotificationItem/NotificationItem';
import styles from './Popover.module.scss';

interface Props {
  isOpen: boolean;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  isLoading: boolean;
  data: IAlertEvent[];
}

enum GroupKeys {
  verified = 'true',
  notVerified = 'false',
}

const PopoverComponent = ({
  isOpen,
  anchorEl,
  handleClose,
  isLoading,
  data,
}: Props) => {
  const dataGrouped = _groupBy(data, 'is_verified');
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
      <Typography variant="body2" display="block" className={styles.title}>
        Notifications
      </Typography>
      <div className={styles.list}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography
              variant="body2"
              display="block"
              className={styles.subTitle}
            >
              New
            </Typography>
            {dataGrouped[GroupKeys.notVerified]?.map((item) => (
              <NotificationItem {...item} />
            ))}
            <Typography
              variant="body2"
              display="block"
              className={styles.subTitle}
            >
              This week
            </Typography>
            {dataGrouped[GroupKeys.verified]?.map((item) => (
              <NotificationItem {...item} />
            ))}
          </>
        )}
      </div>
      <Button
        component={Link}
        to={APP_URLS.notifications}
        variant="contained"
        color="primary"
        fullWidth
        className={styles.buttonAll}
      >
        See All Notifications
      </Button>
    </Popover>
  );
};

export default PopoverComponent;
