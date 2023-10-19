import AppBar from 'components/AppBar/AppBar';
import MainContent from 'components/MainContent/MainContent';
import { CarouselMode } from 'ts/types.ts'
import MovementsTimelineContainer from 'components/MovementsTimeline/MovementsTimelineContainer';
import SurveillanceCarousel from 'components/SurveillanceCarrousel'
import GridViewControls from "components/SurveillanceCarrousel/GridViewControls"
import '../../App.css'
import styles from "./Home.module.scss"

function Home() {
  return (
    <>
      <AppBar>
        <GridViewControls />
      </AppBar>
      <MainContent>
        <main className={styles.homeContainer}>
          <SurveillanceCarousel
            mode={CarouselMode.General}
          />
          <MovementsTimelineContainer />
        </main>
      </MainContent>
    </>
  )
}

export default Home
