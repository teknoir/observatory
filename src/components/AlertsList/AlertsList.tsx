import _map from 'lodash/map';
import { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import Select from 'muiComponents/Select/Select';
import AlertsGroup from 'components/AlertsGroup/AlertsGroup';
import { IAlertEvent } from 'ts/types';
import { AlertPeriod } from './enums';
import styleVariables from 'enums/styleVariables.module.scss';
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
        <InputLabel id="alertPeriodLabel">
          <Typography variant="LabelLarge" color={styleVariables.totalWhite}>
            Alerts from:
          </Typography>
        </InputLabel>
        <Select
          labelId="alertPeriodLabel"
          value={period}
          options={periodOptions}
          onChange={handleChangePeriod}
        />
      </div>
      <Box
        className={styles.alertsWrapper}
        sx={{
          '& .BoxClass': {
            borderRight: '1px solid white',
            position: 'relative',
          },
          '& .BoxOpen': {
            borderTop: '1px solid white',
            borderLeft: '1px solid white',
          },
          '& .BoxClosed::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '10px',
            display: 'inline-block',
            width: 'calc(100% - 10px)',
            height: '100%',
            borderTop: '1px solid white',
          },
          '& .BoxClosed::after': {
            position: 'absolute',
            top: '10px',
            left: 0,
            display: 'inline-block',
            width: '1px',
            height: 'calc(100% - 10px)',
            borderLeft: '1px solid white',
          },
          '& .BoxClosed #box_border_1': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '14px',
            height: '14px',
          },
          '& .BoxClosed #box_border_1::before': {
            content: '""',
            position: 'absolute',
            top: '0.5px',
            left: '-9.3px',
            width: '100%',
            height: '100%',
            borderBottom: '1px solid white',
            transform: 'rotate(-45deg)',
            transformOrigin: '0 0',
          },
          '& .BoxClosed #box_border_2': {
            content: '""',
            position: 'absolute',
            top: '10px',
            left: 0,
            width: '10px',
            height: 'calc(100% - 9px)',
            borderLeft: '1px solid white',
            borderBottom: '1px solid white',
          },
          '& .BoxOpen + .BoxClosed': {
            position: 'relative',
          },
          '& .BoxOpen + .BoxClosed::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '10px',
            height: '10px',
            borderLeft: '1px solid white',
          },
          '&>:last-child': {
            borderBottom: '1px solid white',
          },
        }}
      >
        {_map(groupsKeys, (dayStr) => (
          <AlertsGroup group={groups[dayStr]} dayStr={dayStr} key={dayStr} />
        ))}
      </Box>
    </div>
  );
};

export default AlertsList;
