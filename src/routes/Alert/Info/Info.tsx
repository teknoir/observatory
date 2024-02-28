import moment from 'moment';
import Typography from '@mui/material/Typography';
import Verified from 'components/Verified/Verified';
import { durationToMMSS } from 'utils/moment';
import { AlertTypes, IAlertEvent, IFeedback } from 'ts/types';
import styles from './Info.module.scss';

type Props = Pick<
  IAlertEvent &
    IFeedback & {
      username: string;
    },
  | 'username'
  | 'creation_time'
  | 'severity'
  | 'type'
  | 'start_time'
  | 'duration'
  | 'peripheral_name'
  | 'comment'
  | 'ground_truth'
>;

const alertOptions = {
  [AlertTypes.theft]: 'Theft',
  [AlertTypes.loitering]: 'Loitering',
  [AlertTypes.no_alert]: 'No alert',
  [AlertTypes.on_ground]: 'Man down',
};

const Info = ({
  username,
  creation_time: creationTime,
  severity,
  type,
  start_time: startTime,
  duration,
  peripheral_name: peripheralName,
  comment,
  ground_truth: groundTruth,
}: Props) => {
  const startDate = moment(startTime);
  const startDateFormat = startDate.format('hh:mm A');

  return (
    <div>
      <div className={styles.item}>
        <div className={styles.verifiedBlock}>
          <Verified />
          <Typography variant="BodyLarge">
            This was verified by @{username} at @{creationTime}
          </Typography>
        </div>
      </div>
      <div className={styles.item}>
        <Typography variant="LabelXLBold">Detected alert: </Typography>
        <Typography variant="BodyLarge">{alertOptions[groundTruth]}</Typography>
      </div>
      <div className={styles.itemComment}>
        <Typography variant="LabelXLBold">Comment: </Typography>
        <Typography variant="BodyLarge">{comment && `"${comment}"`}</Typography>
      </div>
      <div className={styles.item}>
        <div className={styles.valueItem}>
          <Typography variant="LabelXLBold">Type: </Typography>
          <Typography variant="BodyLarge">{alertOptions[type]}</Typography>
        </div>
        <div className={styles.valueItem}>
          <Typography variant="LabelXLBold">Camera: </Typography>
          <Typography variant="BodyLarge">
            {peripheralName} - {startDateFormat}
          </Typography>
        </div>
        <div className={styles.valueItem}>
          <Typography variant="LabelXLBold">Duration: </Typography>
          <Typography variant="BodyLarge">
            {durationToMMSS(duration)}
          </Typography>
        </div>
        <div className={styles.valueItem}>
          <Typography variant="LabelXLBold">Severity:</Typography>
          <Typography variant="BodyLarge">{severity}</Typography>
        </div>
      </div>
    </div>
  );
};

export default Info;
