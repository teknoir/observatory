import { useContext } from 'react';
import { Typography } from '@mui/material';
import { Videocam } from '@mui/icons-material';
import { HomeContext } from 'context/HomeContext/HomeContext';
import styles from './CamerasTitle.module.scss';

const CamerasTitle = () => {
  const { numCameras } = useContext(HomeContext);
  return (
    <div className={styles.root}>
      {/* TODO: Replace with icon from design */}
      <Videocam />
      <Typography variant="TitleMedium">
        All cameras ({numCameras ?? 0})
      </Typography>
    </div>
  );
};

export default CamerasTitle;
