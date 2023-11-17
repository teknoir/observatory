import _map from 'lodash/map';
import _isEmpty from 'lodash/isEmpty';
import { SelectChangeEvent } from '@mui/material/Select';
import CircleIcon from '@mui/icons-material/Circle';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import Select from 'muiComponents/Select/Select';
import { IMotionsCounts } from 'ts/types';
import { MotionsPeriod } from './enums';
import styleVariables from 'enums/styleVariables.module.scss';
import styles from './MotionsList.module.scss';

interface Props {
  data?: IMotionsCounts;
  period: MotionsPeriod;
  handleChangePeriod: (e: SelectChangeEvent<unknown>) => void;
}

const periodOptions = [
  { value: MotionsPeriod.DAYS_7, label: 'Last 7 days' },
  { value: MotionsPeriod.DAYS_30, label: 'Last 30 days' },
];

const MotionsList = ({ data, period, handleChangePeriod }: Props) => {
  return (
    <div className={styles.root}>
      <div className={styles.selectWrapper}>
        <InputLabel id="motionsPeriodLabel">
          <Typography variant="LabelLarge" color={styleVariables.totalWhite}>
            Motions from:
          </Typography>
        </InputLabel>
        <Select
          labelId="motionsPeriodLabel"
          value={period}
          options={periodOptions}
          onChange={handleChangePeriod}
        />
      </div>
      <div className={styles.list}>
        {_isEmpty(data) ? (
          <div>No data</div>
        ) : (
          _map(data, (count, title) => (
            <div className={styles.listItem}>
              <CircleIcon color="primary" className={styles.icon} />
              <div>{`${title}: ${count}`}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MotionsList;
