import { ReactNode } from "react";
import { styled } from "@mui/material/styles";
import { useMainLayoutContext } from "context/mainLayoutContext.tsx";
import { rightSideBarWidth } from "../enums.ts";

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
  openRight?: boolean;
}>(({ theme, open, openRight }) => ({
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

const MainContent = ({ children }: {
  children: ReactNode;
}) => {
  const { isOpenedLeft, isOpenedRight } = useMainLayoutContext();
  return (
    <Main open={isOpenedLeft} openRight={isOpenedRight}>
      {children}
    </Main>
  )
}

export default MainContent;
