import { useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import LastPageIcon from "@mui/icons-material/LastPage";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import APP_URLS from "enums/urls";
import { useMainLayoutContext } from "context/mainLayoutContext";
import AlertsMotionsTabs from "components/AlertsMotionsTabs/AlertsMotionsTabs";
import AlertsPerformanceTabs from "components/AlertsPerformanceTabs/AlertsPerformanceTabs";
import DrawerHeader from "./components/DrawerHeader.tsx";
import { rightSideBarWidth, rightSideBarClosedWidth } from "./enums.ts";
import FirstPageIcon from "@mui/icons-material/FirstPage";

const RightSideBar = () => {
  const { peripheralId } = useParams();
  const { isOpenedRight, openRight, closeRight } = useMainLayoutContext();

  useEffect(() => {
    // return () => openRight();
    return () => {
      console.log('RightSideBar unmounted');
    };
  }, []);

  return (
    <Drawer
      sx={{
        width: isOpenedRight ? rightSideBarWidth : rightSideBarClosedWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isOpenedRight ? rightSideBarWidth : rightSideBarClosedWidth,
          boxSizing: 'border-box',
          alignItems: isOpenedRight ? 'inherit' : 'center',
        },
      }}
      variant="permanent"
      anchor="right"
      open={isOpenedRight}
    >
      <DrawerHeader direction="center">
        <IconButton onClick={isOpenedRight ? closeRight : openRight}>
          {isOpenedRight ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      {isOpenedRight && (
        <Routes>
          <Route path={APP_URLS.home} element={<AlertsMotionsTabs />} />
          <Route path={APP_URLS.motionsAlerts} element={<AlertsMotionsTabs />} />
          <Route path={APP_URLS.alerts} element={<AlertsPerformanceTabs peripheralId={peripheralId} />} />
          <Route path={APP_URLS.devices} element={<AlertsMotionsTabs peripheralId={peripheralId} />} />
        </Routes>
      )}
    </Drawer>
  )
}

export default RightSideBar;
