import { NavLink as RouterLink } from 'react-router-dom';
import classNames from 'classnames';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Select from 'muiComponents/Select/Select';
import SelectCheckbox from 'muiComponents/SelectCheckbox/SelectCheckbox';
import carIcon from 'assets/icons/carIcon.svg';
import loiteringIcon from 'assets/icons/loiteringIcon.svg';
import peopleIcon from 'assets/icons/peopleIcon.svg';
import personDownIcon from 'assets/icons/personDownIcon.svg';
import theftIcon from 'assets/icons/theftIcon.svg';
import { MovementsTimelinePeriod } from 'components/MovementsTimeline/enums';
import { AlertTypes, EventLabels } from 'ts/types';
import { generatePath } from 'utils/router';
import APP_URLS from 'enums/urls';
import styles from './ToolBar.module.scss';

const timelineOptions = [
  { value: AlertTypes.theft, label: 'Theft', icon: theftIcon },
  { value: AlertTypes.loitering, label: 'Loitering', icon: loiteringIcon },
  { value: AlertTypes.on_ground, label: 'Man down', icon: personDownIcon },
  { value: EventLabels.car, label: 'Cars', icon: carIcon },
  { value: EventLabels.person, label: 'People', icon: peopleIcon },
];

const periodOptions = [
  { value: MovementsTimelinePeriod.DAYS_1, label: 'Today' },
  { value: MovementsTimelinePeriod.DAYS_7, label: 'Last 7 days' },
  { value: MovementsTimelinePeriod.DAYS_30, label: 'Last 30 days' },
];

interface ToolBarProps {
  filter: (AlertTypes | EventLabels)[];
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
      <Typography variant="LabelLarge">Motions & Alerts</Typography>
      <Box className={styles.filters}>
        <InputLabel id="timelineFilterByLabel" className={styles.inputLabel}>
          <Typography variant="LabelLarge">Filter by: </Typography>
        </InputLabel>
        <SelectCheckbox
          labelId="timelineFilterByLabel"
          options={timelineOptions}
          value={filter}
          onChange={handleChangeFilter}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
          }}
        />
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
      </Box>
    </nav>
  );
};

export default ToolBar;
