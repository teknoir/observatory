import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Link from "@mui/material/Link"
import CloseIcon from '@mui/icons-material/Close';
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import moment from "moment";
import APP_URLS from "enums/urls";
import { NavLink as RouterLink } from "react-router-dom"

export enum ALERT_INFO_KEYS {
  TYPE = "type",
  DURATION = "duration",
  START_TIME = "start_time",
  DETECTION_ID = "detection_id",
}

// FIX: Replace any's
interface PopoverComponentProps {
  anchorEl: any
  alertInfo: any
  handleClose: any
}

function PopoverComponent({
  anchorEl,
  alertInfo,
  handleClose
}: PopoverComponentProps) {
  console.log(anchorEl)
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
        <Typography variant="h6">Theft alert - Low</Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
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
          to={APP_URLS.alerts + `/${alertInfo[ALERT_INFO_KEYS.DETECTION_ID]}`}
          color="inherit"
        >
          <Skeleton
            sx={{
              bgcolor: "rgba(0, 0, 0, 0.13)",
            }}
            variant="rectangular"
            width={190}
            height={90}
          />
        </Link>
      </div>
    </Popover>
  )
}

export default PopoverComponent
