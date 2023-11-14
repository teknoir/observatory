import AppBar from 'components/AppBar/AppBar';
import MainContent from 'components/MainContent/MainContent';
import MovementsTimelineContainer from 'components/MovementsTimeline/MovementsTimelineContainer';
import SurveillanceCarousel from 'components/SurveillanceCarousel';
import SelectLayout from 'components/SurveillanceCarousel/SelectLayout/SelectLayout';
import HomeDataProvider from 'context/HomeContext/HomeDataProvider';
import CamerasTitle from './CamerasTitle/CamerasTitle';
import styles from './Home.module.scss';

function Home() {
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
          <MovementsTimelineContainer />
        </div>
      </MainContent>
    </HomeDataProvider>
  );
}

export default Home;
