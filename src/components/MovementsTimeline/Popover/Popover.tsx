import { NavLink as RouterLink, generatePath } from "react-router-dom";
import moment from "moment";
import _startCase from "lodash/startCase";
import CloseIcon from '@mui/icons-material/Close';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import VideoPlayer from "components/VideoPlayer/VideoPlayer";
import { PopoverInfoProps } from "ts/types";
import APP_URLS from "enums/urls";
import styles from "./Popover.module.scss"

enum ALERT_INFO_KEYS {
  DETECTION_ID = "detection_id",
  DURATION = "duration",
  PERIPHERAL_ID = "peripheral_id",
  SEVERITY = "severity",
  START_TIME = "start_time",
  TYPE = "type",
  VIDEO_URL = "video_url",
}

interface PopoverComponentProps {
  anchorEl: SVGCircleElement | null
  alertInfo: PopoverInfoProps
  handleClose: () => void
}

function PopoverComponent({
  anchorEl,
  alertInfo,
  handleClose
}: PopoverComponentProps) {
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
    >
      <Card className={styles.card} onMouseLeave={handleClose}>
        <CardContent className={styles.cardContent}>
          <Typography variant="subtitle1" align="center" className={styles.title}>
            {alertInfo[ALERT_INFO_KEYS.TYPE]} TEST - {_startCase(alertInfo[ALERT_INFO_KEYS.SEVERITY]?.toLowerCase())} TEST
          </Typography>
          <IconButton aria-label="close" onClick={handleClose} size="small" className={styles.iconButton}>
            <CloseIcon />
          </IconButton>
          <Box>
            <Typography variant="body2" display="inline" className={styles.field}>
              Alert type:
            </Typography>
            <Typography variant="body2" display="inline" className={styles.value}>
              {alertInfo[ALERT_INFO_KEYS.TYPE]} TEST
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" display="inline" className={styles.field}>
              Date:
            </Typography>
            <Typography variant="body2" display="inline" className={styles.value}>
              {moment(alertInfo[ALERT_INFO_KEYS.START_TIME]).format("MMMM D, h:mm A")}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" display="inline" className={styles.field}>
              Duration:
            </Typography>
            <Typography variant="body2" display="inline" className={styles.value}>
              {Math.round(alertInfo[ALERT_INFO_KEYS.DURATION] / 1000)}s
            </Typography>
          </Box>
        </CardContent>
        <CardActions className={styles.cardActions}>
          <Link
            component={RouterLink}
            to={generatePath(APP_URLS.alerts, {
              peripheralId: alertInfo[ALERT_INFO_KEYS.PERIPHERAL_ID],
              detectionId: alertInfo[ALERT_INFO_KEYS.DETECTION_ID]
            })}
            color="inherit"
            align="center"
          >
            <VideoPlayer
              url={alertInfo[ALERT_INFO_KEYS.VIDEO_URL]}
              width={250}
              height="auto"
            />
          </Link>
        </CardActions>
      </Card>
    </Popover>
  )
}

export default PopoverComponent
