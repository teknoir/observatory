import styles from './DisplaySettings.module.scss';
import classNames from 'classnames';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Collapse from '@mui/material/Collapse';
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useMainLayoutContext } from 'context/mainLayoutContext.tsx';
import { useDisplaySettingsContext } from 'context/DisplaySettingsContext/displaySettingsContext.tsx';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { EventLabels } from 'ts/types.ts';
import Button from '@mui/material/Button';

const DisplaySettings = () => {
  const { closeRightOverlay } = useMainLayoutContext();
  const {
    boundaryBoxesChecked,
    setBoundaryBoxesChecked,
    objectLabelsChecked,
    setObjectLabelsChecked,
    colorFillBoxesChecked,
    setColorFillBoxesChecked,
    objectsFilterChecked,
    setObjectsFilterChecked,
  } = useDisplaySettingsContext();
  const [objectsFilterExpanded, setObjectsFilterExpanded] = useState(false);
  const eventLabelsCount = Object.keys(EventLabels).length;

  const handleCheckedSettingsChange =
    (
      setSettingsChecked: (
        value: ((prevState: boolean) => boolean) | boolean
      ) => void
    ) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setSettingsChecked(event.target.checked);
    };

  const handleObjectsFilterExpand = (event: SyntheticEvent) => {
    event.preventDefault();
    setObjectsFilterExpanded(!objectsFilterExpanded);
  };

  // Handle checkbox change
  const handleObjectsFilterCheckboxChange =
    (key: string) => (event: ChangeEvent<HTMLInputElement>) => {
      setObjectsFilterChecked({
        ...objectsFilterChecked,
        [key]: event.target.checked,
      });
    };

  // handle show all button click
  const handleShowAllClick = () => {
    setObjectsFilterChecked(
      Object.keys(EventLabels).reduce(
        (acc, label) => {
          acc[label] = true;
          return acc;
        },
        {} as Record<string, boolean>
      )
    );
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.displaySettingsContainer}>
        <div className={classNames(styles.displaySetting, styles.title)}>
          <label>Display Settings</label>
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
            className={styles.displaySetting}
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
                <Typography className={styles.displaySettingOptions}>
                  Color Fill Boxes
                </Typography>
              }
              labelPlacement={'start'}
              className={styles.displaySetting}
            />
            <FormControlLabel
              control={
                <IconButton
                  aria-label="expand"
                  onClick={handleObjectsFilterExpand}
                >
                  {objectsFilterExpanded ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </IconButton>
              }
              label={
                <Typography className={styles.displaySettingOptions}>
                  Objects ({eventLabelsCount})
                </Typography>
              }
              labelPlacement={'start'}
              className={styles.displaySetting}
            />
            <Collapse in={objectsFilterExpanded}>
              <FormControlLabel
                control={
                  <Button
                    variant={'text'}
                    aria-label="show-all"
                    onClick={handleShowAllClick}
                  />
                }
                label={
                  <Typography className={styles.displaySettingOptions}>
                    Show all
                  </Typography>
                }
                labelPlacement={'start'}
                className={styles.displaySetting}
              />
              {Object.keys(EventLabels).map((key) => (
                <FormControlLabel
                  key={key}
                  control={
                    <Checkbox
                      checked={objectsFilterChecked[key]}
                      onChange={(event) =>
                        handleObjectsFilterCheckboxChange(key)(event)
                      }
                    />
                  }
                  label={
                    <Typography className={styles.displaySettingOptions}>
                      {key}
                    </Typography>
                  }
                  labelPlacement={'start'}
                  className={styles.displaySetting}
                />
              ))}
            </Collapse>
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
            className={styles.displaySetting}
          />
        </FormGroup>
      </div>
    </div>
  );
};

export default DisplaySettings;
