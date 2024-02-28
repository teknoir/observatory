import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import logo from 'assets/logo.svg';
import logoIcon from 'assets/logo_icon.svg';
import Icon from 'components/Icon/Icon';
import { useMainLayoutContext } from 'context/mainLayoutContext';
import NavigationList from 'layouts/components/NavigationList/NavigationList';
import DrawerHeader from '../components/DrawerHeader';
import { leftSideBarWidth, leftSideBarClosedWidth } from '../enums';
import styles from './NavigationBar.module.scss';

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
      className={styles.root}
    >
      <DrawerHeader className={styles.header}>
        {isOpenedLeft && <img src={logo} alt="logo" className={styles.logo} />}
        <IconButton onClick={isOpenedLeft ? closeLeft : openLeft}>
          {isOpenedLeft ? <FirstPageIcon /> : <Icon icon={logoIcon} />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <NavigationList />
    </Drawer>
  );
};

export default NavigationBar;
