import AppBar from 'components/AppBar/AppBar';
import MainContent from 'components/MainContent/MainContent';
import MovementsTimelineContainer from 'components/MovementsTimeline/MovementsTimelineContainer';
import RightSideBar from "layouts/MainLayout/RightSideBar";
import AlertsMotionsTabs from "components/AlertsMotionsTabs/AlertsMotionsTabs";

const MotionsAlerts = () => {
  return (
    <>
      <AppBar>
        Motions & Alerts
      </AppBar>
      <MainContent>
        <MovementsTimelineContainer />
      </MainContent>
      <RightSideBar>
        <AlertsMotionsTabs />
      </RightSideBar>
    </>
  )
}

export default MotionsAlerts;
