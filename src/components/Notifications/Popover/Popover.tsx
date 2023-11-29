// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Link } from 'react-router-dom';
// import _groupBy from 'lodash/groupBy';
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

// TODO: Uncomment this if we are going to split data in verified/unverified
// enum GroupKeys {
//   verified = 'true',
//   notVerified = 'false',
// }

const PopoverComponent = ({
  isOpen,
  anchorEl,
  handleClose,
  isLoading,
  data,
}: Props) => {
  // TODO: Uncomment this if data is grouped by is_verified
  // const dataGrouped = _groupBy(data, 'is_verified');
  const dataGrouped = data;

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
            {/* TODO: Showing all notifications */}
            {dataGrouped.map((item) => (
              <NotificationItem {...item} />
            ))}

            {/* TODO: Uncomment this if we are going to split data in verified/unverified */}
            {/* {dataGrouped[GroupKeys.notVerified]?.map((item) => (
              <NotificationItem {...item} />
            ))}
            <Typography variant="LabelLarge" className={styles.subTitle}>
              Unverified
            </Typography>
            {dataGrouped[GroupKeys.verified]?.map((item) => (
              <NotificationItem {...item} />
            ))} */}
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
        <Typography variant="LabelLarge">See all notifications</Typography>
      </Button>
    </Popover>
  );
};

export default PopoverComponent;
