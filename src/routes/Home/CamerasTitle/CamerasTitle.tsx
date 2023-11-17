import { useContext } from 'react';
import { Typography } from '@mui/material';
import { HomeContext } from 'context/HomeContext/HomeContext';
import styles from './CamerasTitle.module.scss';

const CamerasTitle = () => {
  const { numCameras } = useContext(HomeContext);
  return (
    <div className={styles.root}>
      <Typography variant="LabelMedium">Cameras ({numCameras ?? 0})</Typography>
    </div>
  );
};

export default CamerasTitle;
