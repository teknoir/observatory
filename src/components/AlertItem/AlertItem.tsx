import moment from "moment";
import Typography from "@mui/material/Typography";
import CircleIcon from '@mui/icons-material/Circle';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import styles from './AlertItem.module.scss';

interface Props {
  name: string;
  startTime: string;
  endTime: string;
  severity: string;
  isVerified: boolean;
  hasComment: boolean;
  hasTheft: boolean;
}

const AlertItem = ({
  name,
  severity,
  startTime,
  endTime,
  isVerified,
  hasTheft,
  hasComment
}: Props) => {
  const startDate = moment(startTime);
  const endDate = moment(endTime);
  const duration = moment.duration(endDate.diff(startDate)).seconds();
  const startDateFormat = startDate.format('HH:mm');

  return (
    <div className={styles.root}>
      <div className={styles.titleLine}>
        <div className={styles.leftTitleLine}>
          <CircleIcon color="error" className={styles.statusIcon} />
          <div className={styles.duration}>{`${startDateFormat} (${duration}s)`}</div>
        </div>
        <div className={styles.status}>
          <div className={styles.statusIcon}></div>
          {isVerified && (
            <div className={styles.verified}>
              <VerifiedOutlinedIcon className={styles.verifiedIcon} />
              <Typography variant="body2" display="block" className={styles.verifiedText}>
                Verified
              </Typography>
            </div>
          )}
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
    </div>
  )
}

export default AlertItem;
