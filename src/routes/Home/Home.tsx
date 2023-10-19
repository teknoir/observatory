import { useMemo } from 'react'
import AppBar from 'components/AppBar/AppBar';
import MainContent from 'components/MainContent/MainContent';
import { CarouselMode } from 'ts/types.ts'
import { MovementsTimeline } from 'components/MovementsTimeline/MovementsTimeline'
import { SurveillanceCarousel } from 'components/SurveillanceCarrousel/SurveillanceCarousel'
import GridViewControls from "components/SurveillanceCarrousel/GridViewControls"
import { createRandomImages } from 'components/SurveillanceCarrousel/utils.ts'
import { dateAccessor, peripheralAccessor } from 'components/ChartUtilities/accessors'
import movements from "../../../datasets/movements.json"
import '../../App.css'
import styles from "./Home.module.scss"

function Home() {
  const carouselSources = useMemo(() => createRandomImages(100), []);

  return (
    <>
      <AppBar hasRightSideBar={false}>
        <GridViewControls />
      </AppBar>
      <MainContent>
        <main className={styles.homeContainer}>
          <SurveillanceCarousel
            mode={CarouselMode.General}
            sources={carouselSources}
          />
          <MovementsTimeline
            data={movements}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            xAccessor={dateAccessor}
            yAccessor={peripheralAccessor}
          />
        </main>
      </MainContent>
    </>
  )
}

export default Home
