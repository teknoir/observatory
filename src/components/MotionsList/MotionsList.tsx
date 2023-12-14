import _map from 'lodash/map';
import _isEmpty from 'lodash/isEmpty';
import { SelectChangeEvent } from '@mui/material/Select';
// import DirectionsCar from '@mui/icons-material/DirectionsCar';
// import PeopleAlt from '@mui/icons-material/PeopleAlt';
// import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import Select from 'muiComponents/Select/Select';
import {
  // IMotionsActions,
  // IMotionsTypes
  IMotionsAggregationResponse,
} from 'ts/types';
import { MotionsPeriod } from './enums';
import styleVariables from 'enums/styleVariables.module.scss';
import styles from './MotionsList.module.scss';

interface Props {
  data?: IMotionsAggregationResponse;
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
      <Grid container>
        {_isEmpty(data) ? (
          <div>No data</div>
        ) : (
          _map(data, ({ count, label }) => (
            <Grid item xs={6} className={styles.listItem}>
              <div className={styles.listItemIcons}>
                {/*TODO: check response schema*/}
                {/*<SwapHorizIcon*/}
                {/*  sx={{*/}
                {/*    color:*/}
                {/*      count.action === IMotionsActions.In*/}
                {/*        ? styleVariables.greenSuccess*/}
                {/*        : styleVariables.redAlert,*/}
                {/*  }}*/}
                {/*/>*/}
                {/*{count.type == IMotionsTypes.Cars && <DirectionsCar />}*/}
                {/*{count.type == IMotionsTypes.People && <PeopleAlt />}*/}
              </div>
              <Typography variant="LabelLarge">{`${label}: ${count}`}</Typography>
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
};

export default MotionsList;
