import moment from 'moment';
import Typography from '@mui/material/Typography';
import thumbUpIcon from 'assets/icons/thumbUp.svg';
import thumbUpRedIcon from 'assets/icons/thumbUpRed.svg';
import Icon from 'components/Icon/Icon';
import Verified from 'components/Verified/Verified';
import { IAlertEvent, IFeedback } from 'ts/types';
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

const Info = ({
  username,
  creation_time: creationTime,
  severity,
  type,
  start_time: startTime,
  duration,
  peripheral_name: peripheralName,
  comment,
  ground_truth: isGroundTruth,
}: Props) => {
  const startDate = moment(startTime);
  const durationSec = Math.round(duration / 1000);
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
      <div className={styles.itemWithTheft}>
        <Typography variant="LabelXLBold">Was this an actual theft?</Typography>
        <div className={styles.hasTheftIcons}>
          <Icon icon={isGroundTruth ? thumbUpRedIcon : thumbUpIcon} />
          <Icon icon={isGroundTruth ? thumbUpIcon : thumbUpRedIcon} rotated />
        </div>
      </div>
      <div className={styles.itemComment}>
        <Typography variant="LabelXLBold">Comment: </Typography>
        <Typography variant="BodyLarge">{comment && `"${comment}"`}</Typography>
      </div>
      <div className={styles.item}>
        <div className={styles.valueItem}>
          <Typography variant="LabelXLBold">Type:</Typography>
          <Typography variant="BodyLarge">{type}</Typography>
        </div>
        <div className={styles.valueItem}>
          <Typography variant="LabelXLBold">Camera:</Typography>
          <Typography variant="BodyLarge">
            {peripheralName} - {startDateFormat}
          </Typography>
        </div>
        <div className={styles.valueItem}>
          <Typography variant="LabelXLBold">Duration:</Typography>
          <Typography variant="BodyLarge">{durationSec}s</Typography>
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
