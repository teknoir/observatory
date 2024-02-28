import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar/AppBar';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import { useMainLayoutContext } from 'context/mainLayoutContext';
import Notifications from 'components/Notifications/Notifications';
import GoBackButton from './GoBackButton/GoBackButton';
import {
  leftSideBarWidth,
  leftSideBarClosedWidth,
  rightSideBarWidth,
  rightSideBarClosedWidth,
} from '../enums';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  openRight?: boolean;
  hasRightSideBar: boolean;
  isSmall?: boolean;
}

const ContentBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open, openRight, hasRightSideBar, isSmall }) => {
  let widthDiff = 0;
  let marginLeft = 0;
  let marginRight = 0;
  if (!isSmall) {
    if (open) {
      widthDiff += leftSideBarWidth;
      marginLeft = leftSideBarWidth;
    } else {
      widthDiff += leftSideBarClosedWidth;
      marginLeft = leftSideBarClosedWidth;
    }
    if (hasRightSideBar && openRight) {
      widthDiff += rightSideBarWidth;
      marginRight = rightSideBarWidth;
    } else {
      widthDiff += rightSideBarClosedWidth;
      marginRight = rightSideBarClosedWidth;
    }
  }
  return {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: `calc(100% - ${widthDiff}px)`,
    marginLeft: `${marginLeft}px`,
    marginRight: `${marginRight}px`,
    marginTop: isSmall ? '64px' : '0',
    ...((open || openRight) && {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  };
});

const AppBarComponent = ({
  hasRightSideBar = true,
  children,
}: {
  hasRightSideBar?: boolean;
  children: ReactNode;
}) => {
  const { isOpenedLeft, isOpenedRightBar, isSmall } = useMainLayoutContext();
  const location = useLocation();
  return (
    <ContentBar
      position={isSmall ? 'relative' : 'fixed'}
      isSmall={isSmall}
      open={isOpenedLeft}
      openRight={isOpenedRightBar}
      hasRightSideBar={hasRightSideBar}
    >
      <Toolbar>
        {location.pathname !== '/' && <GoBackButton />}
        {children}
        {!isSmall && <Notifications />}
      </Toolbar>
    </ContentBar>
  );
};

export default AppBarComponent;
