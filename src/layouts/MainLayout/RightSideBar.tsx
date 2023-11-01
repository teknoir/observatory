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
import { rightSideBarWidth } from "./enums.ts";

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
      <Routes>
        <Route path={APP_URLS.home} element={<AlertsMotionsTabs />} />
        <Route path={APP_URLS.motionsAlerts} element={<AlertsMotionsTabs />} />
        <Route path={APP_URLS.alerts} element={<AlertsPerformanceTabs peripheralId={peripheralId} />} />
        <Route path={APP_URLS.devices} element={<AlertsMotionsTabs peripheralId={peripheralId} />} />
      </Routes>
    </Drawer>
  )
}

export default RightSideBar;
