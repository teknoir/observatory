import { NavLink as RouterLink, generatePath } from "react-router-dom";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import StarBorderIcon from "@mui/icons-material/StarBorder";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Drawer from "@mui/material/Drawer";
import { useMainLayoutContext } from "context/mainLayoutContext";
import APP_URLS from "enums/urls";
import DrawerHeader from "../components/DrawerHeader";
import { leftSideBarWidth, leftSideBarClosedWidth } from "../enums";
import styles from "./NavigationBar.module.scss";

const navigationItems = [
  {
    name: "Home",
    url: APP_URLS.home,
  },
  {
    name: "Motions & Alerts",
    url: APP_URLS.motionsAlerts,
  },
  // TODO: this item will be removed
  {
    name: "Alert verified (for testing)",
    url: generatePath(APP_URLS.alerts, {
      detectionId: '111111111111',
    })
  },
  {
    name: "Alert not verified (for testing)",
    url: generatePath(APP_URLS.alerts, {
      detectionId: '222222222222',
    })
  },
  {
    name: "Device boxerproperty3 (for testing)",
    url: generatePath(APP_URLS.devices, {
      peripheralId: 'boxerproperty3',
      peripheralName: 'boxerproperty3',
    })
  }
];
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
            <ListItem disablePadding>
              <ListItemButton>
                {/*<ListItemIcon>*/}
                {/*  <StarBorderIcon />*/}
                {/*</ListItemIcon>*/}
                <ListItemText primary="Surveillance" />
              </ListItemButton>
            </ListItem>
            {navigationItems.map(({ name, url }) => (
              <ListItem key={url} disablePadding>
                <ListItemButton>
                  <Link
                    component={RouterLink}
                    to={url}
                    color="inherit"
                    underline="none"
                    className={styles.link}
                  >
                    {name}
                  </Link>
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
