import { useContext, useEffect } from 'react';
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
import { DisplaySettingsContext } from 'context/DisplaySettingsContext/DisplaySettingsContext.ts';

const localStorageNamespace = 'displaySettings';

const getLocalStorage = (key: string, defaultValue: unknown) => {
  const storedValue = localStorage.getItem(`${localStorageNamespace}.${key}`);
  return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
};

const setLocalStorage = (key: string, value: unknown) => {
  localStorage.setItem(
    `${localStorageNamespace}.${key}`,
    JSON.stringify(value)
  );
};

const DisplaySettings = () => {
  const { closeRightOverlay } = useMainLayoutContext();
  const {
    boundaryBoxesChecked,
    setBoundaryBoxesChecked,
    objectLabelsChecked,
    setObjectLabelsChecked,
    colorFillBoxesChecked,
    setColorFillBoxesChecked,
  } = useContext(DisplaySettingsContext);

  useEffect(() => {
    setBoundaryBoxesChecked(
      getLocalStorage('boundaryBoxesChecked', boundaryBoxesChecked)
    );
    setObjectLabelsChecked(
      getLocalStorage('objectLabelsChecked', objectLabelsChecked)
    );
    setColorFillBoxesChecked(
      getLocalStorage('colorFillBoxesChecked', colorFillBoxesChecked)
    );
  }, []);

  const handleCheckedSettingsChange = (
    setSettingsChecked: (
      value: ((prevState: boolean) => boolean) | boolean
    ) => void,
    localStorageKey: string
  ) => {
    setSettingsChecked((prev) => {
      const newValue = !prev;
      setLocalStorage(localStorageKey, newValue);
      return newValue;
    });
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
                onChange={() =>
                  handleCheckedSettingsChange(
                    setBoundaryBoxesChecked,
                    'boundaryBoxesChecked'
                  )
                }
              />
            }
            label="Boundary Boxes"
            labelPlacement={'start'}
            className={styles.displaySetting}
          />
          <Collapse in={boundaryBoxesChecked}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={colorFillBoxesChecked}
                  onChange={() =>
                    handleCheckedSettingsChange(
                      setColorFillBoxesChecked,
                      'colorFillBoxesChecked'
                    )
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
                onChange={() =>
                  handleCheckedSettingsChange(
                    setObjectLabelsChecked,
                    'objectLabelsChecked'
                  )
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
