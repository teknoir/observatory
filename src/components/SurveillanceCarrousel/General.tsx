import { useEffect, useRef, /* useContext */ } from "react"
import { CarouselProps, RefImage } from "ts/types"
import CarrouselImage from "./CarrouselImage"
import CarrouselImagePreview from "./CarrouselImagePreview"
// import { GridViewContext } from "./GridViewContext"

function SurveillanceCarouselGeneral({ sources, mainSource, setMainSource }: CarouselProps) {
  const galleryRef = useRef<HTMLDivElement | null>(null)
  const selectedImageRef = useRef<HTMLImageElement | null>(null)
  // const gridView = useContext(GridViewContext)

  useEffect(() => {
    if (selectedImageRef.current && galleryRef.current) {
      const selectedImageElement = selectedImageRef.current
      const galleryElement = galleryRef.current
      const offsetTop = selectedImageElement.offsetTop

      galleryElement.scrollTop = offsetTop - galleryElement.clientHeight / 2
    }
  }, [mainSource])

  const setSelectedImageRef = (element: RefImage, index: string) => {
    if (mainSource === index) {
      selectedImageRef.current = element
    }
  };

  return (
    <section className="grid grid-cols-2 max-h-[100%] w-full h-[500px]">
      <CarrouselImage
        src={sources.get(mainSource)?.src || ''}
      />
      <div
        ref={galleryRef}
        className="grid grid-cols-5 overflow-y-scroll"
      >
        {
          sources.size > 0 && [...sources.keys()].map((sourceKey) => {
            const src = sources.get(sourceKey)!.src;
            return (
              <div
                key={src}
                onClick={() => setMainSource(sourceKey)}
                ref={(ref: HTMLImageElement) => setSelectedImageRef(ref, sourceKey)}
              >
                <CarrouselImagePreview
                  src={src}
                  className={`${mainSource === sourceKey ? "border border-red-200" : ""}`}
                />
              </div>
            )
          })
        }
      </div>
    </section>
  )
}

export default SurveillanceCarouselGeneral
