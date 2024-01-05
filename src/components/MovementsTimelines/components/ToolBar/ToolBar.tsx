import { NavLink as RouterLink } from 'react-router-dom';
import classNames from 'classnames';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Select from 'muiComponents/Select/Select';
import {
  MovementsTimelinePeriod,
  TimelineFilterBy,
} from 'components/MovementsTimelines/enums';
import { generatePath } from 'utils/router';
import APP_URLS from 'enums/urls';
import styles from './ToolBar.module.scss';

const timelineOptions = [
  { value: TimelineFilterBy.MOTIONS_ALERTS, label: 'All' },
  { value: TimelineFilterBy.MOTIONS, label: 'Motions' },
  { value: TimelineFilterBy.ALERTS, label: 'Alerts' },
];

const periodOptions = [
  { value: MovementsTimelinePeriod.DAYS_1, label: 'Today' },
  { value: MovementsTimelinePeriod.DAYS_7, label: 'Last 7 days' },
  { value: MovementsTimelinePeriod.DAYS_30, label: 'Last 30 days' },
];

interface ToolBarProps {
  filter: string;
  handleChangeFilter: (e: SelectChangeEvent<unknown>) => void;
  period: MovementsTimelinePeriod;
  handleChangePeriod: (e: SelectChangeEvent<unknown>) => void;
  className?: string;
}

const ToolBar = ({
  filter,
  handleChangeFilter,
  period,
  handleChangePeriod,
  className,
}: ToolBarProps) => {
  return (
    <nav className={classNames(styles.menuLayout, className)}>
      <div className={styles.menuItem}>
        <Typography variant="LabelLarge">Motions & Alerts</Typography>
      </div>
      <div className={styles.menuItem}>
        <Box className={styles.menuItemBox}>
          <InputLabel id="timelineFilterByLabel" className={styles.inputLabel}>
            <Typography variant="LabelLarge">Filter by: </Typography>
          </InputLabel>
          <Select
            labelId="timelineFilterByLabel"
            value={filter}
            options={timelineOptions}
            onChange={handleChangeFilter}
            sx={{
              '& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input': {
                paddingLeft: 0,
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
            }}
          />
        </Box>
        <Select
          labelId="movementsTimelinePeriodLabel"
          value={period}
          options={periodOptions}
          onChange={handleChangePeriod}
          sx={{
            '& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input': {
              paddingLeft: 0,
            },
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
          }}
        />
        <Link
          component={RouterLink}
          to={generatePath(APP_URLS.motionsAlerts)}
          color="inherit"
        >
          <Typography variant="LabelLarge">View all</Typography>
        </Link>
      </div>
    </nav>
  );
};

export default ToolBar;
