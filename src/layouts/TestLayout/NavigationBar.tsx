import DrawerHeader from "./components/DrawerHeader.tsx";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Drawer from "@mui/material/Drawer";
import { useMainLayoutContext } from "context/mainLayoutContext";
import { leftSideBarWidth, leftSideBarClosedWidth } from "./enums.ts";

const NavigationBar = () => {
  const { isOpenedLeft, openLeft, closeLeft } = useMainLayoutContext();
  return (
    <Drawer
      sx={{
        width: isOpenedLeft ? leftSideBarWidth : leftSideBarClosedWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isOpenedLeft ? leftSideBarWidth : leftSideBarClosedWidth,
          boxSizing: 'border-box',
          alignItems: isOpenedLeft ? 'inherit' : 'center',
        },
      }}
      variant="permanent"
      anchor="left"
      open={isOpenedLeft}
    >
      <DrawerHeader>
        <IconButton onClick={isOpenedLeft ? closeLeft : openLeft}>
          {isOpenedLeft ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </DrawerHeader>
      {isOpenedLeft ? (
        <>
          <Divider />
          <List>
            {['Surveillance', 'Home', 'Motions & Alerts'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index === 0 && <StarBorderIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        <Avatar>T</Avatar>
      )}
    </Drawer>
  );
}

export default NavigationBar;
