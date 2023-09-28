import { useEffect, useRef } from "react"
import { CarouselProps } from "../../ts/types"
import CarrouselImage from "./CarrouselImage"

function SurveillanceCarouselGeneral({ sources, mainSource, setMainSource }: CarouselProps) {
  const galleryRef = useRef<HTMLDivElement | null>(null)
  const selectedImageRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    if (selectedImageRef.current && galleryRef.current) {
      const selectedImageElement = selectedImageRef.current
      const galleryElement = galleryRef.current
      const offsetTop = selectedImageElement.offsetTop

      galleryElement.scrollTop = offsetTop - galleryElement.clientHeight / 2
    }
  }, [mainSource])

  return (
    <section className="grid grid-cols-2 max-h-[100%] w-full h-[500px]">
      <CarrouselImage
        src={sources[mainSource]}
      />
      <div
        ref={galleryRef}
        className="grid grid-cols-2 overflow-y-scroll"
      >
        {
          sources.length > 0 && sources.map((imageSrc, index) =>
            <img
              key={sources + '_' + index}
              src={imageSrc}
              className={`p-3 ${mainSource === index ? "border border-red-200" : ""}`}
              onClick={() => setMainSource(index)}
              ref={ref => {
                if (mainSource === index) {
                  selectedImageRef.current = ref
                }
              }}
            />
          )
        }
      </div>
    </section>
  )
}

export default SurveillanceCarouselGeneral
