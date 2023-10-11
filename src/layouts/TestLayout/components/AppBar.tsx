import { AppBarProps as MuiAppBarProps} from "@mui/material/AppBar/AppBar";
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import { leftSideBarWidth, leftSideBarClosedWidth } from "../enums.ts";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: `calc(100% - ${leftSideBarClosedWidth}px)`,
  marginLeft: `${leftSideBarClosedWidth}px`,
  ...(open && {
    width: `calc(100% - ${leftSideBarWidth}px)`,
    marginLeft: `${leftSideBarWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default AppBar;
