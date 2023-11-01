import { NavLink as RouterLink, generatePath } from "react-router-dom"
import moment from "moment";
import _startCase from "lodash/startCase";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link"
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import VideoPlayer from "components/VideoPlayer/VideoPlayer";
import { PopoverInfoProps } from "ts/types";
import APP_URLS from "enums/urls";

export enum ALERT_INFO_KEYS {
  DETECTION_ID = "detection_id",
  DURATION = "duration",
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
        vertical: 'center',
        horizontal: 'center',
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          padding: "20px 16px",
          background: "white",
          color: "black",
          borderRadius: 4,
        }}
      >
        <Typography variant="h6">
          {alertInfo[ALERT_INFO_KEYS.TYPE]} alert - {_startCase(alertInfo[ALERT_INFO_KEYS.SEVERITY]?.toLowerCase())}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            color: "black",
          }}
        >
          <CloseIcon />
        </IconButton>
        <span>Alert type: {alertInfo[ALERT_INFO_KEYS.TYPE]}</span>
        <span>Date: {moment(alertInfo[ALERT_INFO_KEYS.START_TIME]).format("MMMM D, h:mm A")}</span>
        <span>Duration: {Math.round(alertInfo[ALERT_INFO_KEYS.DURATION] / 1000)}s</span>
        <Link
          component={RouterLink}
          to={generatePath(APP_URLS.alerts, {
            detectionId: alertInfo[ALERT_INFO_KEYS.DETECTION_ID],
          })}
          color="inherit"
        >
          <VideoPlayer
            url={alertInfo[ALERT_INFO_KEYS.VIDEO_URL]}
            width={250}
            height="auto"
          />
        </Link>
      </div>
    </Popover>
  )
}

export default PopoverComponent
