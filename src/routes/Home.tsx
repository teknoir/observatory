import { useMemo } from 'react'
import '../App.css'
import { MovementsTimeline } from '../components/MovementsTimeline'
import { SurveillanceCarousel } from '../components/SurveillanceCarrousel/SurveillanceCarousel'
import { createRandomImages } from '../components/SurveillanceCarrousel/utils.ts'
import movements from "../../datasets/movements.json"
import { dateAccessor, peripheralAccessor } from '../components/ChartUtilities/accessors'
import { CarouselMode } from '../ts/types.ts'

function Home() {
  const carouselSources = useMemo(() => createRandomImages(100), []);

  return (
    <main>
      <div className="grid grid-cols-3 gap-6 m-6">
        <div className="col-span-2">
          <SurveillanceCarousel
            mode={CarouselMode.General}
            sources={carouselSources}
          />
        </div>
        <div className="w-full bg-black col-span-1"></div>
      </div>
      <div className="grid grid-cols-3 gap-6 m-6">
        <div className="col-span-2">
          <MovementsTimeline
            data={movements}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            xAccessor={dateAccessor}
            yAccessor={peripheralAccessor}
          />
        </div>
        <div className="w-full bg-black col-span-1"></div>
      </div>
    </main>
  )
}

export default Home
