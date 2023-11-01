import { CSSProperties } from "react";
import { Link, generatePath } from "react-router-dom";
import moment from "moment";
import Typography from "@mui/material/Typography";
import CircleIcon from '@mui/icons-material/Circle';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Verified, { Sizes } from "components/Verified/Verified";
import APP_URLS from "enums/urls";
import { IAlertEvent } from "ts/types";
import styles from './AlertItem.module.scss';

interface Props {
  data: IAlertEvent[];
  index: number;
  style: CSSProperties;
}

const AlertItem = ({
  data,
  index,
  style
}: Props) => {
  const item = data[index];
  const {
    detection_id: detectionId,
    peripheral_id: peripheralId,
    peripheral_name: name,
    severity,
    start_time: startTime,
    end_time: endTime,
  } = item;
  // TODO: it's temporary solution, we need to use real data here
  let isVerified = false;
  let hasTheft = false;
  let hasComment = false;
  if (detectionId.slice(-1).match(/[a-z]/i)) {
    isVerified = true;
    hasTheft = true;
    hasComment = true;
  }

  const startDate = moment(startTime);
  const endDate = moment(endTime);
  const duration = moment.duration(endDate.diff(startDate)).seconds();
  const startDateFormat = startDate.format('HH:mm');

  return (
    <div className={styles.root} style={style}>
      <Link
        to={generatePath(APP_URLS.alerts, { detectionId, peripheralId })}
        className={styles.rootLink}
      >
        <div className={styles.titleLine}>
          <div className={styles.leftTitleLine}>
            <CircleIcon color="error" className={styles.statusIcon} />
            <div className={styles.duration}>{`${startDateFormat} (${duration}s)`}</div>
          </div>
          <div className={styles.status}>
            <div className={styles.statusIcon}></div>
            {isVerified && <Verified size={Sizes.small} />}
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.imgWrapper}></div>
          <div className={styles.details}>
            <Typography variant="body2" display="block" gutterBottom>
              {name}
            </Typography>
            <Typography variant="body2" display="block">
              Severity: {severity}
            </Typography>
          </div>
          <div className={styles.actionIcons}>
            {hasComment && <ChatBubbleIcon />}
            {hasTheft ? (
              <DirectionsRunIcon />
            ) : (
              <DirectionsWalkIcon />
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default AlertItem;
