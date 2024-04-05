// import { ChangeEvent } from 'react';
import classNames from 'classnames';
// import Checkbox from '@mui/material/Checkbox';
import CloseIcon from '@mui/icons-material/Close';
// import Collapse from '@mui/material/Collapse';
// import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormGroup from '@mui/material/FormGroup';
import { SelectChangeEvent } from '@mui/material/Select';
// import Switch from '@mui/material/Switch';
// import Typography from '@mui/material/Typography';
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
  const { closeRightOverlay } = useMainLayoutContext();
  const { filters, setFilters } = useDisplayFiltersContext();
  console.log(filters);

  //   const handleCheckedSettingsChange =
  //     (
  //       setSettingsChecked: (
  //         value: ((prevState: boolean) => boolean) | boolean
  //       ) => void
  //     ) =>
  //     (event: ChangeEvent<HTMLInputElement>) => {
  //       setSettingsChecked(event.target.checked);
  //     };

  //   const handleFiltersChange =
  //     (
  //       setFilters: (value: ((prevState: boolean) => boolean) | boolean) => void
  //     ) =>
  //     (event: ChangeEvent<HTMLInputElement>) => {
  //       //   setFilters(event.target.checked);
  //       setFilters((prevState) => !prevState);
  //     };

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
          <label>Display Filters</label>
          <IconButton onClick={closeRightOverlay}>
            <CloseIcon />
          </IconButton>
        </div>
        {/* <button onClick={handleFiltersChange(setFilters)}>Change state!</button> */}

        <MultiSelect
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

        {/* <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={boundaryBoxesChecked}
                onChange={(event) =>
                  handleCheckedSettingsChange(setBoundaryBoxesChecked)(event)
                }
              />
            }
            label="Bounding Boxes"
            labelPlacement={'start'}
            className={styles.displayFilters}
          />
          <Collapse in={boundaryBoxesChecked}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={colorFillBoxesChecked}
                  onChange={(event) =>
                    handleCheckedSettingsChange(setColorFillBoxesChecked)(event)
                  }
                />
              }
              label={
                <Typography className={styles.displayFiltersOptions}>
                  Color Fill Boxes
                </Typography>
              }
              labelPlacement={'start'}
              className={styles.displayFilters}
            />
          </Collapse>
          <Divider variant="middle" sx={{ bgcolor: 'secondary.light' }} />
          <FormControlLabel
            control={
              <Switch
                checked={objectLabelsChecked}
                onChange={(event) =>
                  handleCheckedSettingsChange(setObjectLabelsChecked)(event)
                }
              />
            }
            label="Object Labels"
            labelPlacement={'start'}
            className={styles.displayFilters}
          />
        </FormGroup> */}
      </div>
    </div>
  );
};

export default DisplayFilters;
