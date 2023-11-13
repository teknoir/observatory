import AppBar from 'components/AppBar/AppBar';
import MainContent from 'components/MainContent/MainContent';
import MovementsTimelineContainer from 'components/MovementsTimeline/MovementsTimelineContainer';
import SurveillanceCarousel from 'components/SurveillanceCarrousel';
import GridViewControls from 'components/SurveillanceCarrousel/GridViewControls';
import HomeDataProvider from 'context/HomeContext/HomeDataProvider';
import styles from './Home.module.scss';

function Home() {
  return (
    <HomeDataProvider>
      <AppBar>
        <GridViewControls />
      </AppBar>
      <MainContent>
        <main className={styles.homeContainer}>
          <SurveillanceCarousel />
          <MovementsTimelineContainer />
        </main>
      </MainContent>
    </HomeDataProvider>
  );
}

export default Home;
