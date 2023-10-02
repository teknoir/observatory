import { CarouselProps } from "ts/types"
import CarrouselImage from "./CarrouselImage"
import CarrouselImagePreview from "./CarrouselImagePreview"

function SurveillanceCarouselDetail({ sources, mainSource, setMainSource }: CarouselProps) {
  return (
    <section className="flex flex-col">
      <CarrouselImage src={sources[mainSource]} />
      <div className="flex">
        <button>&lt;</button>
        <div className="flex flex-row overflow-auto">
          {
            sources.length > 0 && sources.map((source, index) =>
              <CarrouselImagePreview
                key={source + '' + index}
                src={source}
                onClick={() => setMainSource(index)}
              />
            )
          }
        </div>
        <button>&gt;</button>
      </div>
    </section>
  )
}

export default SurveillanceCarouselDetail
