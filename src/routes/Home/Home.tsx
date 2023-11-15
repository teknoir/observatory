import { useSearchParams } from 'react-router-dom';
import AppBar from 'components/AppBar/AppBar';
import MainContent from 'components/MainContent/MainContent';
import MovementsTimelineContainer from 'components/MovementsTimeline/MovementsTimelineContainer';
import SurveillanceCarousel from 'components/SurveillanceCarousel';
import SelectLayout from 'components/SurveillanceCarousel/SelectLayout/SelectLayout';
import HomeDataProvider from 'context/HomeContext/HomeDataProvider';
import { useMainLayoutContext } from 'context/mainLayoutContext';
import CamerasTitle from './CamerasTitle/CamerasTitle';
import styles from './Home.module.scss';

function Home() {
  const { isOpenedRight, closeRight } = useMainLayoutContext();
  const [searchParams] = useSearchParams();
  const hideMotionsAlerts =
    Boolean(searchParams.get('hideMotionsAlerts')) || false;

  if (isOpenedRight && hideMotionsAlerts) {
    closeRight();
  }

  return (
    <HomeDataProvider>
      <AppBar>
        <div className={styles.toolbar}>
          <CamerasTitle />
          <SelectLayout />
        </div>
      </AppBar>
      <MainContent>
        <div className={styles.mainContent}>
          <SurveillanceCarousel />
          {!hideMotionsAlerts && <MovementsTimelineContainer />}
        </div>
      </MainContent>
    </HomeDataProvider>
  );
}

export default Home;
