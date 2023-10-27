import { NavLink as RouterLink } from "react-router-dom"
import classNames from "classnames";
import { CirclesProps } from "ts/types";
import styles from './Circles.module.scss';

import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Link from "@mui/material/Link"
import CloseIcon from '@mui/icons-material/Close';
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import moment from "moment";
import APP_URLS from "enums/urls";

export enum ALERT_INFO_KEYS {
  TYPE = "type",
  DURATION = "duration",
  START_TIME = "start_time",
  DETECTION_ID = "detection_id",
}

interface AlertInfoProps {
  type: string,
  duration: number,
  start_time: string,
  detection_id: string,
}

const Circles = ({ data, keyAccessor, xAccessor, yAccessor, radius = 8, className, popover }: CirclesProps) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [alertInfo, setAlertInfo] = useState<AlertInfoProps>({
    type: "",
    duration: 0,
    start_time: "",
    detection_id: ""
  })

  function handleClick(event: any, d: any) {
    if (popover) {
      setAnchorEl(event.currentTarget)
      setAlertInfo(d)
    }
  }

  function handleClose() {
    setAnchorEl(null)
  }

  return (
    <g>
      {
        data && data.map((d) => (
          <circle
            className={classNames(styles.circle, className)}
            key={keyAccessor(d)}
            cx={xAccessor(d)}
            cy={yAccessor(d)}
            r={radius}
            onClick={(e) => handleClick(e, d)}
          />
        ))
      }
      {
        popover &&
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
      }
    </g>
  )
}

export default Circles
