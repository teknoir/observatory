import moment from 'moment';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import Verified from 'components/Verified/Verified';
import styles from './Info.module.scss';

interface Props {
  name: string;
  date: string;
  endTime: string;
  severity: string;
  startTime: string;
  type: string;
  peripheralName: string;
  comment: string;
  hasTheft: boolean;
}

const Info = ({
  name,
  date,
  severity,
  type,
  startTime,
  endTime,
  peripheralName,
  comment,
  hasTheft,
}: Props) => {
  const startDate = moment(startTime);
  const endDate = moment(endTime);
  const duration = moment.duration(endDate.diff(startDate)).seconds();
  const startDateFormat = startDate.format('hh:mm A');

  return (
    <div>
      <div className={styles.item}>
        <div className={styles.verifiedBlock}>
          <Verified />
          <Typography variant="body2" className={styles.text}>
            This was verified by @{name} at @{date}
          </Typography>
        </div>
      </div>
      <div className={styles.item}>
        <Typography variant="body2" className={styles.title}>
          Was this an actual theft?
        </Typography>
        <div className={styles.status}>
          <div className={styles.statusItem}>
            {hasTheft ? (
              <CheckCircleOutlineIcon />
            ) : (
              <RadioButtonUncheckedIcon />
            )}
            <Typography variant="body2" className={styles.label}>
              Yes
            </Typography>
          </div>
          <div className={styles.statusItem}>
            {hasTheft ? (
              <RadioButtonUncheckedIcon />
            ) : (
              <CheckCircleOutlineIcon />
            )}
            <Typography variant="body2" className={styles.label}>
              No
            </Typography>
          </div>
        </div>
      </div>
      <div className={styles.item}>
        <Typography variant="body2" className={styles.title}>
          Comment
        </Typography>
        <Typography variant="body2" className={styles.text}>
          {comment && `"${comment}"`}
        </Typography>
      </div>
      <div className={styles.item}>
        <Typography variant="body2" className={styles.valueItem}>
          Type: {type}
        </Typography>
        <Typography variant="body2" className={styles.valueItem}>
          Camera: {peripheralName} - {startDateFormat}
        </Typography>
        <Typography variant="body2" className={styles.valueItem}>
          Duration: {duration}s
        </Typography>
        <Typography variant="body2" className={styles.valueItem}>
          Severity: {severity}
        </Typography>
      </div>
    </div>
  );
};

export default Info;
