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
import { AlertTypes, PopoverInfoProps } from 'ts/types';
import APP_URLS from 'enums/urls';
import { dateFormat, durationToMMSS } from 'utils/moment';
import { getUrlMp4 } from 'utils/media';
import styles from './Popover.module.scss';
import { useCallback } from 'react';

enum ALERT_INFO_KEYS {
  DETECTION_ID = 'detection_id',
  DURATION = 'duration',
  PERIPHERAL_ID = 'peripheral_id',
  PERIPHERAL_NAME = 'peripheral_name',
  SEVERITY = 'severity',
  START_TIME = 'start_time',
  TYPE = 'type',
  VIDEO_URL = 'video_url',
  GROUND_TRUTH = 'ground_truth',
}

interface MovementsTimelinePopoverProps {
  anchorEl: SVGCircleElement | null;
  alertInfo: PopoverInfoProps;
  handleClose: () => void;
}

const fallbackVideoUrl =
  'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4';

const PopoverComponent = ({
  anchorEl,
  alertInfo,
  handleClose,
}: MovementsTimelinePopoverProps) => {
  const videoUrl = alertInfo[ALERT_INFO_KEYS.VIDEO_URL]
    ? getUrlMp4(alertInfo[ALERT_INFO_KEYS.VIDEO_URL])
    : fallbackVideoUrl;

  const alertType =
    alertInfo[ALERT_INFO_KEYS.GROUND_TRUTH] || alertInfo[ALERT_INFO_KEYS.TYPE];
  const getTooltipText = useCallback(() => {
    switch (alertType) {
      case AlertTypes.Loitering:
        return 'Loitering';
      case AlertTypes.Theft:
        return 'Theft';
      case AlertTypes.OnGround:
        return 'Person Down';
      default:
        return '';
    }
  }, [alertType]);

  const tooltipText = getTooltipText();

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
              &emsp;{tooltipText}
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
              Date:
            </Typography>
            <Typography variant="LabelMedium" className={styles.value}>
              &emsp;{dateFormat(alertInfo[ALERT_INFO_KEYS.START_TIME])}
            </Typography>
          </Box>
          <Box>
            <Typography variant="LabelMedium" className={styles.field}>
              Duration:
            </Typography>
            <Typography variant="LabelMedium" className={styles.value}>
              &emsp;{durationToMMSS(alertInfo[ALERT_INFO_KEYS.DURATION])}
            </Typography>
          </Box>
        </CardContent>
        <CardActions className={styles.cardActions}>
          <Link
            component={RouterLink}
            to={generatePath(
              APP_URLS.alerts,
              {
                peripheralId: alertInfo[ALERT_INFO_KEYS.PERIPHERAL_ID],
                detectionId: alertInfo[ALERT_INFO_KEYS.DETECTION_ID],
              },
              { type: alertInfo[ALERT_INFO_KEYS.TYPE] }
            )}
            color="inherit"
            align="center"
          >
            <VideoPlayer url={videoUrl} width={250} height="auto" autoPlay />
          </Link>
        </CardActions>
      </Card>
    </Popover>
  );
};

export default PopoverComponent;
