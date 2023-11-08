import _map from 'lodash/map';
import { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Select from 'muiComponents/Select/Select';
import AlertsGroup from 'components/AlertsGroup/AlertsGroup';
import { IAlertEvent } from 'ts/types';
import { AlertPeriod } from './enums';
import styles from './AlertsList.module.scss';

interface Props {
  groups: { [key: string]: IAlertEvent[] };
  groupsKeys: string[];
  period: AlertPeriod;
  handleChangePeriod: (e: SelectChangeEvent<unknown>) => void;
}

const periodOptions = [
  { value: AlertPeriod.DAYS_7, label: 'Last 7 days' },
  { value: AlertPeriod.DAYS_30, label: 'Last 30 days' },
];

const AlertsList = ({
  period,
  handleChangePeriod,
  groups,
  groupsKeys,
}: Props) => {
  return (
    <div className={styles.root}>
      <div className={styles.selectWrapper}>
        <InputLabel id="alertPeriodLabel">Alerts from: </InputLabel>
        <Select
          labelId="alertPeriodLabel"
          value={period}
          options={periodOptions}
          onChange={handleChangePeriod}
        />
      </div>
      {_map(groupsKeys, (dayStr) => (
        <AlertsGroup group={groups[dayStr]} dayStr={dayStr} key={dayStr} />
      ))}
    </div>
  );
};

export default AlertsList;
