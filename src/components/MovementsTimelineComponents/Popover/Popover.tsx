import { NavLink as RouterLink } from 'react-router-dom';
import _upperFirst from 'lodash/upperFirst';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { generatePath } from 'utils/router';
import VideoPlayer from 'components/VideoPlayer/VideoPlayer';
import { PopoverInfoProps } from 'ts/types';
import APP_URLS from 'enums/urls';
import { durationToMMSS } from 'utils/moment';
import styles from './Popover.module.scss';

// enum ALERT_INFO_KEYS {
//   DETECTION_ID = 'detection_id',
//   DURATION = 'duration',
//   PERIPHERAL_ID = 'peripheral_id',
//   PERIPHERAL_NAME = 'peripheral_name',
//   SEVERITY = 'severity',
//   START_TIME = 'start_time',
//   TYPE = 'type',
//   VIDEO_URL = 'video_url',
// }

interface MovementsTimelinePopoverProps {
  anchorEl: SVGCircleElement | null;
  alertInfo: PopoverInfoProps;
  handleClose: () => void;
}

const PopoverComponent = ({
  anchorEl,
  alertInfo,
  handleClose,
}: MovementsTimelinePopoverProps) => {
  console.log(alertInfo?.type);
  return (
    <Popover
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      slotProps={{
        paper: {
          className: styles.paper,
        },
      }}
    >
      <Card className={styles.card} onMouseLeave={handleClose}>
        <CardContent className={styles.cardContent}>
          <Box>
            <Typography variant="LabelMedium" className={styles.field}>
              Alert type:
            </Typography>
            <Typography variant="LabelMedium" className={styles.value}>
              {/* &emsp;{_upperFirst(alertInfo[ALERT_INFO_KEYS.TYPE])} */}
              &emsp;{_upperFirst(alertInfo?.type)}
            </Typography>
          </Box>
          <Box>
            <Typography variant="LabelMedium" className={styles.field}>
              Camera:
            </Typography>
            <Typography variant="LabelMedium" className={styles.value}>
              &emsp;{alertInfo?.peripheral_name}
            </Typography>
          </Box>
          <Box>
            <Typography variant="LabelMedium" className={styles.field}>
              Duration:
            </Typography>
            <Typography variant="LabelMedium" className={styles.value}>
              &emsp;{durationToMMSS(alertInfo?.duration)}
            </Typography>
          </Box>
        </CardContent>
        <CardActions className={styles.cardActions}>
          <Link
            component={RouterLink}
            to={generatePath(APP_URLS.alerts, {
              peripheralId: alertInfo?.peripheral_id,
              detectionId: alertInfo?.detection_id,
            })}
            color="inherit"
            align="center"
          >
            <VideoPlayer
              url={alertInfo?.video_url}
              width={250}
              height="auto"
              autoPlay
            />
          </Link>
        </CardActions>
      </Card>
    </Popover>
  );
};

export default PopoverComponent;
