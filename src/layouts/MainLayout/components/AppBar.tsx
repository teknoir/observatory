import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useMainLayoutContext } from 'context/mainLayoutContext';
import Notifications from 'components/Notifications/Notifications';
import Icon from 'components/Icon/Icon';
import logoIcon from 'assets/logo_icon.svg';

const AppBar = () => {
  const { isOpenedLeft, openLeft, closeLeft } = useMainLayoutContext();
  const MenuIconComponent = isOpenedLeft ? CloseIcon : MenuIcon;
  return (
    <MuiAppBar position="fixed">
      <Toolbar>
        <Icon icon={logoIcon} />
        <Notifications />
        <MenuIconComponent
          sx={{ marginLeft: '20px' }}
          onClick={isOpenedLeft ? closeLeft : openLeft}
        />
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
