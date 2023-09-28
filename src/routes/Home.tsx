// @ts-nocheck
import { useEffect, useState } from 'react'
import '../App.css'
import { MovementsTimeline } from '../components/MovementsTimeline'
import { SurveillanceCarousel } from '../components/SurveillanceCarrousel/SurveillanceCarousel'
import movements from "../../datasets/movements.json"
import { dateAccessor, peripheralAccessor } from '../components/ChartUtilities/accessors'

function Home() {
  return (
    <main>
      <div className="grid grid-cols-3 gap-6 m-6">
        <div className="col-span-2">
          <SurveillanceCarousel
            mode="general"
          />
        </div>
        <div className="w-full bg-black col-span-1"></div>
      </div>
      <div className="grid grid-cols-3 gap-6 m-6">
        <div className="col-span-2">
          <MovementsTimeline
            data={movements}
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
