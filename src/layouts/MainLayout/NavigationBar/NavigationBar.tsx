import { NavLink as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import { useMainLayoutContext } from 'context/mainLayoutContext';
import APP_URLS from 'enums/urls';
import DrawerHeader from '../components/DrawerHeader';
import { leftSideBarWidth, leftSideBarClosedWidth } from '../enums';
import styles from './NavigationBar.module.scss';

const navigationItems = [
  {
    name: 'Home',
    url: APP_URLS.home,
  },
  {
    name: 'Motions & Alerts',
    url: APP_URLS.motionsAlerts,
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
      <DrawerHeader>
        <IconButton onClick={isOpenedLeft ? closeLeft : openLeft}>
          {isOpenedLeft ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </DrawerHeader>
      {isOpenedLeft ? (
        <>
          <Divider />
          <List>
            {navigationItems.map(({ name, url }) => (
              <ListItem key={url} disablePadding>
                <ListItemButton>
                  <Link
                    component={RouterLink}
                    to={url}
                    color="inherit"
                    underline="none"
                    className={styles.link}
                  >
                    {name}
                  </Link>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        <Avatar>T</Avatar>
      )}
    </Drawer>
  );
};

export default NavigationBar;
