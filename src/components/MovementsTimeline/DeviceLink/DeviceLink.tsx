import { NavLink as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
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
      Open
    </Link>
  );
};

export default DeviceLink;
