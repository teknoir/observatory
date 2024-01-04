import { NavLink as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import styles from './DeviceLink.module.scss';

interface DeviceLinkProps {
  link: string;
}

const DeviceLink = ({ link }: DeviceLinkProps) => {
  return (
    <Link
      component={RouterLink}
      to={link}
      color="inherit"
      underline="none"
      className={styles.link}
    >
      <Typography variant="LabelLarge">Open</Typography>
    </Link>
  );
};

export default DeviceLink;
