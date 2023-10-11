import { ReactNode } from "react";
import IconButton from "@mui/material/IconButton";
import LastPageIcon from "@mui/icons-material/LastPage";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import { rightSideBarWidth } from "./enums.ts";
import DrawerHeader from "./components/DrawerHeader.tsx";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  children: ReactNode;
}

const RightSideBar = ({
  isOpen,
  handleClose,
  children
}: Props) => {
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
      open={isOpen}
    >
      <DrawerHeader direction="center">
        <IconButton onClick={handleClose}>
          <LastPageIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      {children}
    </Drawer>
  )
}

export default RightSideBar;
