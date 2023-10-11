import { ReactNode } from "react";
import Toolbar from "@mui/material/Toolbar";
import AppBar from 'layouts/TestLayout/components/AppBar';
import { useMainLayoutContext } from "context/mainLayoutContext";

interface Props {
  children: ReactNode;
}

const AppBarComponent = ({ children }: Props) => {
  const { isOpenedLeft } = useMainLayoutContext();
  return (
    <AppBar position="fixed" open={isOpenedLeft}>
      <Toolbar>
        {children}
      </Toolbar>
    </AppBar>
  )
}

export default AppBarComponent;
