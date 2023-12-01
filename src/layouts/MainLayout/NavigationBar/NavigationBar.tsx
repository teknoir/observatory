import { NavLink as RouterLink } from 'react-router-dom';
import classNames from 'classnames';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Drawer from '@mui/material/Drawer';
import logo from 'assets/logo.svg';
import homeIcon from 'assets/icons/home.svg';
import aimIcon from 'assets/icons/aim.svg';
import { useMainLayoutContext } from 'context/mainLayoutContext';
import APP_URLS from 'enums/urls';
import { generatePath } from 'utils/router';
import DrawerHeader from '../components/DrawerHeader';
import { leftSideBarWidth, leftSideBarClosedWidth } from '../enums';
import styles from './NavigationBar.module.scss';

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
const NavigationBar = () => {
  const { isOpenedLeft, openLeft, closeLeft } = useMainLayoutContext();
  return (
    <Drawer
      sx={{
        width: isOpenedLeft ? leftSideBarWidth : leftSideBarClosedWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isOpenedLeft ? leftSideBarWidth : leftSideBarClosedWidth,
          boxSizing: 'border-box',
          alignItems: isOpenedLeft ? 'inherit' : 'center',
        },
      }}
      variant="permanent"
      anchor="left"
      open={isOpenedLeft}
    >
      <DrawerHeader className={styles.header}>
        {isOpenedLeft && <img src={logo} alt="logo" className={styles.logo} />}
        <IconButton onClick={isOpenedLeft ? closeLeft : openLeft}>
          {isOpenedLeft ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
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
                <div
                  className={classNames({ [styles.textHide]: !isOpenedLeft })}
                >
                  {name}
                </div>
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default NavigationBar;
