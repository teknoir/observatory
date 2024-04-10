import { NavLink as RouterLink } from 'react-router-dom';
import classNames from 'classnames';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import FilterList from '@mui/icons-material/FilterList';
import Select from 'muiComponents/Select/Select';
import { MovementsTimelinePeriod } from 'components/MovementsTimeline/enums';
import { useMainLayoutContext } from 'context/mainLayoutContext';
import { generatePath } from 'utils/router';
import APP_URLS from 'enums/urls';
import styles from './ToolBar.module.scss';

const periodOptions = [
  { value: MovementsTimelinePeriod.DAYS_1, label: 'Today' },
  { value: MovementsTimelinePeriod.DAYS_7, label: 'Last 7 days' },
  { value: MovementsTimelinePeriod.DAYS_30, label: 'Last 30 days' },
];

interface ToolBarProps {
  period: MovementsTimelinePeriod;
  handleChangePeriod: (e: SelectChangeEvent<unknown>) => void;
  isViewAll?: boolean;
  className?: string;
}

const ToolBar = ({
  period,
  handleChangePeriod,
  isViewAll = true,
  className,
}: ToolBarProps) => {
  const {
    isOpenedRightOverlayFilters,
    openRightOverlayFilters,
    closeRightOverlayFilters,
  } = useMainLayoutContext();
  return (
    <nav className={classNames(styles.menuLayout, className)}>
      <Box className={styles.filters}>
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
        {isViewAll && (
          <Link
            component={RouterLink}
            to={generatePath(APP_URLS.motionsAlerts)}
            color="inherit"
          >
            <Typography variant="LabelLarge">View all</Typography>
          </Link>
        )}
      </Box>
      <IconButton
        aria-label="filters"
        onClick={
          isOpenedRightOverlayFilters
            ? closeRightOverlayFilters
            : openRightOverlayFilters
        }
      >
        <FilterList />
      </IconButton>
    </nav>
  );
};

export default ToolBar;
