import { ReactNode, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import LastPageIcon from "@mui/icons-material/LastPage";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import { useMainLayoutContext } from "context/mainLayoutContext";
import { rightSideBarWidth } from "./enums.ts";
import DrawerHeader from "./components/DrawerHeader.tsx";

interface Props {
  children: ReactNode;
}

const RightSideBar = ({
  children
}: Props) => {
  const { isOpenedRight, openRight, closeRight } = useMainLayoutContext();

  useEffect(() => {
    return () => openRight();
  }, []);

  return (
    <Drawer
      sx={{
        width: rightSideBarWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: rightSideBarWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="right"
      open={isOpenedRight}
    >
      <DrawerHeader direction="center">
        <IconButton onClick={closeRight}>
          <LastPageIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      {children}
    </Drawer>
  )
}

export default RightSideBar;
