import IconButton from '@mui/material/IconButton';
import LastPageIcon from '@mui/icons-material/LastPage';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import { useMainLayoutContext } from 'context/mainLayoutContext';
import RightSideBarTabs from 'components/RightSideBarTabs/RightSideBarTabs';
import DrawerHeader from './components/DrawerHeader.tsx';
import { rightSideBarWidth, rightSideBarClosedWidth } from './enums.ts';
import FirstPageIcon from '@mui/icons-material/FirstPage';

const RightSideBar = () => {
  const { isOpenedRight, openRight, closeRight } = useMainLayoutContext();

  return (
    <Drawer
      sx={{
        width: isOpenedRight ? rightSideBarWidth : rightSideBarClosedWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isOpenedRight ? rightSideBarWidth : rightSideBarClosedWidth,
          boxSizing: 'border-box',
          alignItems: isOpenedRight ? 'inherit' : 'center',
        },
      }}
      variant="permanent"
      anchor="right"
      open={isOpenedRight}
    >
      <DrawerHeader direction="center">
        <IconButton onClick={isOpenedRight ? closeRight : openRight}>
          {isOpenedRight ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <div style={{ display: isOpenedRight ? 'block' : 'none' }}>
        <RightSideBarTabs />
      </div>
    </Drawer>
  );
};

export default RightSideBar;
