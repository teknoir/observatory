import classNames from 'classnames';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { SelectChangeEvent } from '@mui/material/Select';
import MultiSelect from 'muiComponents/MultiSelectCheckbox/MultiSelectCheckbox';
import carIcon from 'assets/icons/carIcon.svg';
import loiteringIcon from 'assets/icons/loiteringIcon.svg';
import peopleIcon from 'assets/icons/peopleIcon.svg';
import personDownIcon from 'assets/icons/personDownIcon.svg';
import theftIcon from 'assets/icons/theftIcon.svg';
import { useMainLayoutContext } from 'context/mainLayoutContext.tsx';
import { useDisplayFiltersContext } from 'context/DisplayFiltersContext/displayFiltersContext.tsx';
import { AlertTypes, EventLabels } from 'ts/types';
import styles from './DisplayFilters.module.scss';

const timelineOptions = [
  { value: AlertTypes.Theft, label: 'Theft', icon: theftIcon },
  { value: AlertTypes.Loitering, label: 'Loitering', icon: loiteringIcon },
  { value: AlertTypes.OnGround, label: 'Man down', icon: personDownIcon },
  { value: EventLabels.Car, label: 'Cars', icon: carIcon },
  { value: EventLabels.Person, label: 'People', icon: peopleIcon },
];

const DisplayFilters = () => {
  const { filters, setFilters } = useDisplayFiltersContext();
  const { closeRightOverlayFilters } = useMainLayoutContext();

  const defaultTypes = [
    AlertTypes.Theft,
    AlertTypes.Loitering,
    AlertTypes.OnGround,
  ];
  const defaultLabels = [EventLabels.Person, EventLabels.Car];

  const handleChangeFilterBy = (e: SelectChangeEvent<unknown>) => {
    const { value } = e.target as { value: (AlertTypes | EventLabels)[] };
    const alertsFilter = value.filter((item) =>
      defaultTypes.includes(item as AlertTypes)
    );
    const motionsFilter = value.filter((item) =>
      defaultLabels.includes(item as EventLabels)
    );
    setFilters({
      types: alertsFilter as AlertTypes[],
      labels: motionsFilter as EventLabels[],
    });
  };

  const filterArr = [...filters.types, ...filters.labels];

  return (
    <div className={styles.overlay}>
      <div className={styles.displayFiltersContainer}>
        <div className={classNames(styles.displayFilters, styles.title)}>
          <IconButton onClick={closeRightOverlayFilters}>
            <CloseIcon />
          </IconButton>
        </div>
        <MultiSelect
          label="Filter by:"
          labelId="timelineFilterByLabel"
          options={timelineOptions}
          value={filterArr}
          onChange={handleChangeFilterBy}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
          }}
        />
      </div>
    </div>
  );
};

export default DisplayFilters;
