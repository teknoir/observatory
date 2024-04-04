import classNames from 'classnames';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import motionAlertsIcon from 'assets/icons/motionAlerts.svg';
import Drawer from '@mui/material/Drawer';
import { useMainLayoutContext } from 'context/mainLayoutContext';
import Icon from 'components/Icon/Icon';
import RightSideBarTabs from 'components/RightSideBarTabs/RightSideBarTabs';
import DisplaySettings from 'components/DisplaySettings/DisplaySettings';
import DisplayFilters from 'components/DisplayFilters/DisplayFilters';
import styleVariables from 'enums/styleVariables.module.scss';
import { IconSizes } from 'ts/types';
import DrawerHeader from '../components/DrawerHeader';
import { rightSideBarWidth, rightSideBarClosedWidth } from '../enums';
import styles from './RightSideBar.module.scss';

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
      {isOpenedRightOverlay && <DisplayFilters />}
    </Drawer>
  );
};

const RightSideBarMobile = () => {
  const {
    isOpenedRight,
    openRight,
    closeRight,
    isOpenedRightOverlay,
    isOpenedRightBar,
  } = useMainLayoutContext();
  const sxIcon = { color: styleVariables.deepSpaceBlack };
  return (
    <>
      <div
        className={classNames(
          styles.root,
          isOpenedRightBar ? styles.visible : styles.hidden,
          isOpenedRightOverlay && styles.visibleRightOverlay
        )}
      >
        <RightSideBarTabs />
        {isOpenedRightOverlay && <DisplaySettings />}
        {isOpenedRightOverlay && <DisplayFilters />}
      </div>
      <div
        className={classNames(
          isOpenedRight
            ? styles.bottomIconWrapperOpened
            : styles.bottomIconWrapper,
          isOpenedRightOverlay && styles.hidden
        )}
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
