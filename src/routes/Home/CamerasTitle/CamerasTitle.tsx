import { Typography } from '@mui/material';
import { Videocam } from '@mui/icons-material';
import styles from './CamerasTitle.module.scss';

const CamerasTitle = () => {
  return (
    <div className={styles.root}>
      {/* TODO: Replace with icon and add number of cameras from Home context  */}
      <Videocam />
      <Typography variant="TitleMedium">All cameras: (0)</Typography>
    </div>
  );
};

export default CamerasTitle;
