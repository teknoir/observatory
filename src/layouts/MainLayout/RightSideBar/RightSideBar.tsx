import classNames from 'classnames';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import motionAlertsIcon from 'assets/icons/motionAlerts.svg';
import Drawer from '@mui/material/Drawer';
import { useMainLayoutContext } from 'context/mainLayoutContext';
import Icon from 'components/Icon/Icon';
import RightSideBarTabs from 'components/RightSideBarTabs/RightSideBarTabs';
import styleVariables from 'enums/styleVariables.module.scss';
import { IconSizes } from 'ts/types';
import DrawerHeader from '../components/DrawerHeader';
import { rightSideBarWidth, rightSideBarClosedWidth } from '../enums';
import styles from './RightSideBar.module.scss';

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
          backgroundColor: styleVariables.fadedBlack,
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
      <div style={{ display: isOpenedRight ? 'block' : 'none' }}>
        <RightSideBarTabs />
      </div>
    </Drawer>
  );
};

const RightSideBarMobile = () => {
  const { isOpenedRight, openRight, closeRight } = useMainLayoutContext();
  const sxIcon = { color: styleVariables.deepSpaceBlack };
  return (
    <>
      <div
        className={classNames(
          styles.root,
          isOpenedRight ? styles.visible : styles.hidden
        )}
      >
        <RightSideBarTabs />
      </div>
      <div
        className={
          isOpenedRight
            ? styles.bottomIconWrapperOpened
            : styles.bottomIconWrapper
        }
      >
        <div
          className={
            isOpenedRight ? styles.bottomIconOpened : styles.bottomIcon
          }
        >
          <IconButton onClick={isOpenedRight ? closeRight : openRight}>
            {isOpenedRight ? (
              <LastPageIcon sx={sxIcon} />
            ) : (
              <Icon icon={motionAlertsIcon} size={IconSizes.lg} />
            )}
          </IconButton>
        </div>
      </div>
    </>
  );
};

const RightSideBarBase = () => {
  const { isSmall } = useMainLayoutContext();
  return isSmall ? <RightSideBarMobile /> : <RightSideBar />;
};

export default RightSideBarBase;
