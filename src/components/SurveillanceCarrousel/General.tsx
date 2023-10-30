import { useEffect, useRef, /* useContext */ } from "react"
import { CarouselProps, RefImage } from "ts/types"
import CarrouselImage from "./CarrouselImage"
import CarrouselImagePreview from "./CarrouselImagePreview"
import styles from "./SurveillanceCarousel.module.scss"
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

  const {
    src: mainSrc = "",
    peripheralName: mainPeripheralName = "",
    peripheralId: mainPeripheralId = ""
  } = sources.get(mainSource) ?? {}

  return (
    <section className={styles.containerGeneral}>
      <CarrouselImage
        id={mainPeripheralId}
        src={mainSrc}
        title={mainPeripheralName}
      />
      <div
        ref={galleryRef}
        className={styles.galleryScroll}
      >
        {
          sources.size > 0 ?
            [...sources.keys()].map((sourceKey) => {
              const {
                src = "",
                peripheralName = ""
              } = sources.get(sourceKey) ?? {}
              return (
                <div
                  key={src}
                  onClick={() => setMainSource(sourceKey)}
                  ref={(ref: HTMLImageElement) => setSelectedImageRef(ref, sourceKey)}
                >
                  <CarrouselImagePreview
                    id={sourceKey}
                    src={src}
                    title={peripheralName}
                    className={`${mainSource === sourceKey ? styles.galleryItemBorder : ""}`}
                  />
                </div>
              )
            }) :
            <div>Loading...</div>
        }
      </div>
    </section>
  )
}

export default SurveillanceCarouselGeneral
