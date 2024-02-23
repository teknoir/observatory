import IconButton from '@mui/material/IconButton';
import LastPageIcon from '@mui/icons-material/LastPage';
import Drawer from '@mui/material/Drawer';
import { useMainLayoutContext } from 'context/mainLayoutContext';
import RightSideBarTabs from 'components/RightSideBarTabs/RightSideBarTabs';
import DrawerHeader from './components/DrawerHeader.tsx';
import { rightSideBarWidth, rightSideBarClosedWidth } from './enums.ts';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import styleVariables from 'enums/styleVariables.module.scss';
import DisplaySettings from 'components/DisplaySettings/DisplaySettings.tsx';

const RightSideBar = () => {
  const {
    isOpenedRight,
    openRight,
    closeRight,
    isOpenedRightOverlay,
    isOpenedRightBar,
  } = useMainLayoutContext();

  return (
    <Drawer
      sx={{
        width: isOpenedRightBar ? rightSideBarWidth : rightSideBarClosedWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isOpenedRightBar ? rightSideBarWidth : rightSideBarClosedWidth,
          boxSizing: 'border-box',
          alignItems: isOpenedRightBar ? 'inherit' : 'center',
          backgroundColor: styleVariables.fadedBlack,
        },
      }}
      variant="permanent"
      anchor="right"
      open={isOpenedRightBar}
    >
      <DrawerHeader direction="center">
        <IconButton onClick={isOpenedRight ? closeRight : openRight}>
          {isOpenedRight ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
      </DrawerHeader>
      <div style={{ display: isOpenedRight ? 'block' : 'none' }}>
        <RightSideBarTabs />
      </div>
      {isOpenedRightOverlay && <DisplaySettings />}
    </Drawer>
  );
};

export default RightSideBar;
