import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ContentBar from 'components/ContentBar/ContentBar';
import MainContent from 'components/MainContent/MainContent';
import MovementsTimelineContainer from 'components/MovementsTimeline/MovementsTimelineContainer';
import SurveillanceCarousel from 'components/SurveillanceCarousel';
import SelectLayout from 'components/SurveillanceCarousel/SelectLayout/SelectLayout';
import HomeDataProvider from 'context/HomeContext/HomeDataProvider';
import { useMainLayoutContext } from 'context/mainLayoutContext';
import CamerasTitle from './CamerasTitle/CamerasTitle';
import styles from './Home.module.scss';

function Home() {
  const { closeRight, isSmall } = useMainLayoutContext();
  const [searchParams] = useSearchParams();
  const hideMotionsAlerts =
    Boolean(searchParams.get('hideMotionsAlerts')) || false;

  useEffect(() => {
    if (hideMotionsAlerts) {
      closeRight();
    }
  }, [hideMotionsAlerts]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <HomeDataProvider>
      <ContentBar>
        <div className={styles.toolbar}>
          <CamerasTitle />
          <SelectLayout />
        </div>
      </ContentBar>
      <MainContent>
        <div className={styles.mainContent}>
          <SurveillanceCarousel />
          {!hideMotionsAlerts && !isSmall && <MovementsTimelineContainer />}
        </div>
      </MainContent>
    </HomeDataProvider>
  );
}

export default Home;
