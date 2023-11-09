import AppBar from 'components/AppBar/AppBar';
import MainContent from 'components/MainContent/MainContent';
import MovementsTimelineContainer from 'components/MovementsTimeline/MovementsTimelineContainer';
import SurveillanceCarousel from 'components/SurveillanceCarrousel';
import { HomeDataProvider } from 'context/HomeContext/homeContext';
import { CarouselMode } from 'ts/types.ts';
import styles from './Home.module.scss';

function Home() {
  return (
    <>
      <AppBar>{/* TODO: Add "All Cameras" text. */}</AppBar>
      <MainContent>
        <HomeDataProvider>
          <main className={styles.homeContainer}>
            <SurveillanceCarousel mode={CarouselMode.General} />
            <MovementsTimelineContainer />
          </main>
        </HomeDataProvider>
      </MainContent>
    </>
  );
}

export default Home;
