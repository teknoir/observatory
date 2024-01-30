import { NavLink as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from './VideoPlayerStub.module.scss';

interface Props {
  deviceUrl: string;
  onClick: () => void;
}

const VideoPlayerStub = ({ deviceUrl, onClick }: Props) => (
  <div className={styles.root}>
    <div className={styles.content}>
      <div>The alert is not ready to view.</div>
      <div>
        Please try again or{' '}
        <Link
          component={RouterLink}
          to={deviceUrl}
          underline="always"
          className={styles.deviceLink}
        >
          watch the live feed.
        </Link>
      </div>
      <Button
        variant="contained"
        color="inherit"
        onClick={onClick}
        className={styles.btn}
        size="large"
      >
        <Typography variant="LabelLarge">Try again</Typography>
      </Button>
    </div>
  </div>
);

export default VideoPlayerStub;
