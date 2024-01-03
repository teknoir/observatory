import { Typography } from '@mui/material';
import ContentBar from 'components/ContentBar/ContentBar';
import MainContent from 'components/MainContent/MainContent';
import MovementsTimelineContainer from 'components/MovementsTimeline/MovementsTimelineContainer';

const MotionsAlerts = () => {
  return (
    <>
      <ContentBar>
        <Typography variant="LabelMedium">Motions & Alerts</Typography>
      </ContentBar>
      <MainContent>
        <MovementsTimelineContainer />
      </MainContent>
    </>
  );
};

export default MotionsAlerts;
