import { NavLink as RouterLink } from 'react-router-dom';
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
import styles from './Popover.module.scss';

enum ALERT_INFO_KEYS {
  DETECTION_ID = 'detection_id',
  DURATION = 'duration',
  PERIPHERAL_ID = 'peripheral_id',
  PERIPHERAL_NAME = 'peripheral_name',
  SEVERITY = 'severity',
  START_TIME = 'start_time',
  TYPE = 'type',
  VIDEO_URL = 'video_url',
}

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
              &emsp;{alertInfo[ALERT_INFO_KEYS.TYPE]} TEST
            </Typography>
          </Box>
          <Box>
            <Typography variant="LabelMedium" className={styles.field}>
              Camera:
            </Typography>
            <Typography variant="LabelMedium" className={styles.value}>
              &emsp;{alertInfo[ALERT_INFO_KEYS.PERIPHERAL_NAME]}
            </Typography>
          </Box>
          <Box>
            <Typography variant="LabelMedium" className={styles.field}>
              Duration:
            </Typography>
            <Typography variant="LabelMedium" className={styles.value}>
              &emsp;{Math.round(alertInfo[ALERT_INFO_KEYS.DURATION] / 1000)}s
            </Typography>
          </Box>
        </CardContent>
        <CardActions className={styles.cardActions}>
          <Link
            component={RouterLink}
            to={generatePath(APP_URLS.alerts, {
              peripheralId: alertInfo[ALERT_INFO_KEYS.PERIPHERAL_ID],
              detectionId: alertInfo[ALERT_INFO_KEYS.DETECTION_ID],
            })}
            color="inherit"
            align="center"
          >
            <VideoPlayer
              url={alertInfo[ALERT_INFO_KEYS.VIDEO_URL]}
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
