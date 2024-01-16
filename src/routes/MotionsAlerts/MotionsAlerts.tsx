import { Typography } from '@mui/material';
import AppBar from 'components/AppBar/AppBar';
import MainContent from 'components/MainContent/MainContent';
import MovementsTimelineContainer from 'components/MovementsTimeline/MovementsTimelineContainer';

const MotionsAlerts = () => {
  return (
    <>
      <AppBar>
        <Typography variant="LabelMedium">Motions & Alerts</Typography>
      </AppBar>
      <MainContent>
        <MovementsTimelineContainer fullHeight fixToolbar />
      </MainContent>
    </>
  );
};

export default MotionsAlerts;
