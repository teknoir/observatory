import { ReactNode } from "react";
import { AppBarProps as MuiAppBarProps} from "@mui/material/AppBar/AppBar";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import { useMainLayoutContext } from "context/mainLayoutContext.tsx";
import Notifications from "components/Notifications";
import {
  leftSideBarWidth,
  leftSideBarClosedWidth,
  rightSideBarWidth
} from "../enums";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  openRight?: boolean;
  hasRightSideBar: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({
  theme,
  open,
  openRight,
  hasRightSideBar
}) => {
  let widthDiff = leftSideBarClosedWidth;
  let marginLeft = leftSideBarClosedWidth;
  let marginRight = 0;
  if (open) {
    widthDiff = leftSideBarWidth;
    marginLeft = leftSideBarWidth;
  }
  if (hasRightSideBar && openRight) {
    widthDiff += rightSideBarWidth;
    marginRight = rightSideBarWidth;
  }
  return {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: `calc(100% - ${widthDiff}px)`,
    marginLeft: `${marginLeft}px`,
    marginRight: `${marginRight}px`,
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
  children
}: {
  hasRightSideBar?: boolean;
  children: ReactNode;
}) => {
  const { isOpenedLeft, isOpenedRight } = useMainLayoutContext();
  return (
    <AppBar
      position="fixed"
      open={isOpenedLeft}
      openRight={isOpenedRight}
      hasRightSideBar={hasRightSideBar}
    >
      <Toolbar>
        {children}
        <Notifications />
      </Toolbar>
    </AppBar>
  )
}

export default AppBarComponent;
