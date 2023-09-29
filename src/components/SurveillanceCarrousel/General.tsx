import { useEffect, useRef } from "react"
import { CarouselProps, RefImage } from "../../ts/types"
import CarrouselImage from "./CarrouselImage"
import CarrouselImagePreview from "./CarrouselImagePreview"

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

  const setSelectedImageRef = (element: RefImage, index: number) => {
    if (mainSource === index) {
      selectedImageRef.current = element
    }
  };

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
          sources.length > 0 && sources.map((imageSrc, index) => (
            <CarrouselImagePreview
              key={sources + '_' + index}
              src={imageSrc}
              className={`${mainSource === index ? "border border-red-200" : ""}`}
              onClick={() => setMainSource(index)}
              ref={(ref: HTMLImageElement) => setSelectedImageRef(ref, index)}
            />
          ))
        }
      </div>
    </section>
  )
}

export default SurveillanceCarouselGeneral
