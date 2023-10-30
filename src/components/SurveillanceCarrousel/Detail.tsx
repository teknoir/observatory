import { CarouselProps } from "ts/types"
import CarrouselImage from "./CarrouselImage"
import CarrouselImagePreview from "./CarrouselImagePreview"

function SurveillanceCarouselDetail({ sources, mainSource, setMainSource }: CarouselProps) {
  return (
    <section className="flex flex-col">
      <CarrouselImage
        id={sources.get(mainSource)?.peripheralId || ''}
        src={sources.get(mainSource)?.src || ''}
        title={sources.get(mainSource)?.peripheralName || ''}
      />
      <div className="flex">
        <button>&lt;</button>
        <div className="flex flex-row overflow-auto">
          {
            sources.size > 0 ?
              [...sources.keys()].map((sourceKey) => {
                const src = sources.get(sourceKey)!.src;
                const peripheralName = sources.get(sourceKey)!.peripheralName;
                return (
                  <div
                    key={src}
                    onClick={() => setMainSource(sourceKey)}
                  >
                    <CarrouselImagePreview
                      id={sourceKey}
                      src={src}
                      title={peripheralName}
                    />
                  </div>
                )
              }) :
              <div>Loading...</div>
          }
        </div>
        <button>&gt;</button>
      </div>
    </section>
  )
}

export default SurveillanceCarouselDetail
