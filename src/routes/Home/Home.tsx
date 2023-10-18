import { useMemo } from 'react'
import AppBar from 'components/AppBar/AppBar';
import MainContent from 'components/MainContent/MainContent';
import { CarouselMode } from 'ts/types.ts'
import MovementsTimelineContainer from 'components/MovementsTimeline/MovementsTimelineContainer';
import { SurveillanceCarousel } from 'components/SurveillanceCarrousel/SurveillanceCarousel'
import GridViewControls from "components/SurveillanceCarrousel/GridViewControls"
import { createRandomImages } from 'components/SurveillanceCarrousel/utils.ts'
import '../../App.css'
import styles from "./Home.module.scss"

function Home() {
  const carouselSources = useMemo(() => createRandomImages(100), []);

  return (
    <>
      <AppBar>
        <GridViewControls />
      </AppBar>
      <MainContent>
        <main className={styles.homeContainer}>
          <SurveillanceCarousel
            mode={CarouselMode.General}
            sources={carouselSources}
          />
          <MovementsTimelineContainer />
        </main>
      </MainContent>
    </>
  )
}

export default Home
