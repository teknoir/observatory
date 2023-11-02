import AppBar from 'components/AppBar/AppBar';
import MainContent from 'components/MainContent/MainContent';
import MovementsTimelineContainer from 'components/MovementsTimeline/MovementsTimelineContainer';

const MotionsAlerts = () => {
  return (
    <>
      <AppBar>
        Motions & Alerts
      </AppBar>
      <MainContent>
        <MovementsTimelineContainer />
      </MainContent>
    </>
  )
}

export default MotionsAlerts;
