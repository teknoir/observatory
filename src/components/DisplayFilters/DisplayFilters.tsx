import { ChangeEvent } from 'react';
import classNames from 'classnames';
import Checkbox from '@mui/material/Checkbox';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { useMainLayoutContext } from 'context/mainLayoutContext.tsx';
import { useDisplayFiltersContext } from 'context/DisplayFiltersContext/displayFiltersContext.tsx';
import styles from './DisplayFilters.module.scss';

const DisplayFilters = () => {
  const { closeRightOverlay } = useMainLayoutContext();
  const {
    boundaryBoxesChecked,
    setBoundaryBoxesChecked,
    objectLabelsChecked,
    setObjectLabelsChecked,
    colorFillBoxesChecked,
    setColorFillBoxesChecked,
  } = useDisplayFiltersContext();

  const handleCheckedSettingsChange =
    (
      setSettingsChecked: (
        value: ((prevState: boolean) => boolean) | boolean
      ) => void
    ) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setSettingsChecked(event.target.checked);
    };

  return (
    <div className={styles.overlay}>
      <div className={styles.displayFiltersContainer}>
        <div className={classNames(styles.displayFilters, styles.title)}>
          <label>Display Filters</label>
          <IconButton onClick={closeRightOverlay}>
            <CloseIcon />
          </IconButton>
        </div>
        <FormGroup>
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
        </FormGroup>
      </div>
    </div>
  );
};

export default DisplayFilters;
