import Typography from '@mui/material/Typography';
import AppBar from 'components/AppBar/AppBar';
import MainContent from 'components/MainContent/MainContent';
import RightSideBar from "layouts/MainLayout/RightSideBar";
import Tabs from "../DarkTheme/Tabs";

const MotionsAlerts = () => {
  return (
    <>
      <AppBar>
        Motions & Alerts
      </AppBar>
      <MainContent>
        <Typography variant="h5" gutterBottom>
          Motions & Alerts
        </Typography>
      </MainContent>
      <RightSideBar>
        <Tabs />
      </RightSideBar>
    </>
  )
}

export default MotionsAlerts;
