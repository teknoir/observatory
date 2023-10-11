import { styled } from "@mui/material/styles";
import { rightSideBarWidth } from "../enums.ts";

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
  openRight?: boolean;
}>(({ theme, open, openRight }) => ({
  border: '1px solid red',
  flexGrow: 1,
  paddingTop: theme.spacing(8),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  marginRight: `-${rightSideBarWidth}px`,
  ...(openRight && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}));

export default Main;
