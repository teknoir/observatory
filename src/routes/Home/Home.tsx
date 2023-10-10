import { CarouselMode } from 'ts/types.ts'
import { MovementsTimeline } from 'components/MovementsTimeline/MovementsTimeline'
import SurveillanceCarousel from 'components/SurveillanceCarrousel'
import { dateAccessor, peripheralAccessor } from 'components/ChartUtilities/accessors'
import movements from "../../../datasets/movements.json"
import '../../App.css'
import styles from "./Home.module.scss"

function Home() {
  return (
    <main className={styles.homeContainer}>
      <SurveillanceCarousel
        mode={CarouselMode.General}
      />
      <MovementsTimeline
        data={movements}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        xAccessor={dateAccessor}
        yAccessor={peripheralAccessor}
      />
    </main>
  )
}

export default Home
