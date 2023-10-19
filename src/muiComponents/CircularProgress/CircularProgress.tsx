import CircularProgress from '@mui/material/CircularProgress';
import styles from "./CircularProgress.module.scss";

export default function CircularProgressMUI() {
  return (
    <div className={styles.root}>
      <CircularProgress />
    </div>
  );
}
