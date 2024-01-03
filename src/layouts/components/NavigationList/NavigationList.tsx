import { NavLink as RouterLink } from 'react-router-dom';
import classNames from 'classnames';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import homeIcon from 'assets/icons/home.svg';
import aimIcon from 'assets/icons/aim.svg';
import { useMainLayoutContext } from 'context/mainLayoutContext';
import APP_URLS from 'enums/urls';
import { generatePath } from 'utils/router';
import styles from './NavigationList.module.scss';

const navigationItems = [
  {
    name: 'Home',
    url: generatePath(APP_URLS.home),
    iconSrc: homeIcon,
  },
  {
    name: 'Motions & Alerts',
    url: generatePath(APP_URLS.motionsAlerts),
    iconSrc: aimIcon,
  },
];
const NavigationList = () => {
  const { isOpenedLeft } = useMainLayoutContext();
  console.log('isOpenedLeft', isOpenedLeft);
  return (
    <List className={styles.list}>
      {navigationItems.map(({ name, url, iconSrc }) => (
        <ListItem key={url} disablePadding>
          <ListItemButton className={styles.navItem}>
            <Link
              component={RouterLink}
              to={url}
              color="inherit"
              underline="none"
              className={styles.link}
            >
              <img src={iconSrc} alt={name} />
              <div className={classNames({ [styles.textHide]: !isOpenedLeft })}>
                {name}
              </div>
            </Link>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default NavigationList;
