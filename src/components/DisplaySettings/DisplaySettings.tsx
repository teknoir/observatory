import styles from './DisplaySettings.module.scss';
import classNames from 'classnames';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Collapse from '@mui/material/Collapse';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useMainLayoutContext } from 'context/mainLayoutContext.tsx';
import { useDisplaySettingsContext } from 'context/DisplaySettingsContext/displaySettingsContext.tsx';
import { ChangeEvent } from 'react';

const DisplaySettings = () => {
  const { closeRightOverlay } = useMainLayoutContext();
  const {
    boundaryBoxesChecked,
    setBoundaryBoxesChecked,
    objectLabelsChecked,
    setObjectLabelsChecked,
    colorFillBoxesChecked,
    setColorFillBoxesChecked,
  } = useDisplaySettingsContext();

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
