import { CarouselProps } from "../../ts/types"
import CarrouselImage from "./CarrouselImage"

function SurveillanceCarouselDetail({ sources, mainSource, setMainSource }: CarouselProps) {
  return (
    <section className="flex flex-col">
      <CarrouselImage src={sources[mainSource]} />
      <div className="flex">
        <button>&lt;</button>
        <div className="flex flex-row overflow-auto">
          {
            sources.length > 0 && sources.map((source, index) =>
              <img key={source + '' + index} src={source}
                className="p-3"
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
