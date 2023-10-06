import { useEffect, useRef, useContext } from "react"
import { CarouselProps, RefImage } from "ts/types"
import CarrouselImage from "./CarrouselImage"
import CarrouselImagePreview from "./CarrouselImagePreview"
import styles from "./SurveillanceCarousel.module.scss"
import { GridViewContext } from "./GridViewContext"

function SurveillanceCarouselGeneral({ sources, mainSource, setMainSource }: CarouselProps) {
  const galleryRef = useRef<HTMLDivElement | null>(null)
  const selectedImageRef = useRef<HTMLImageElement | null>(null)
  const gridView = useContext(GridViewContext)

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
    <section className={styles.containerGeneral}>
      <CarrouselImage
        src={sources[mainSource]}
      />
      <div
        ref={galleryRef}
        className={styles.galleryScroll}
      >
        {
          sources.length > 0 && sources.map((imageSrc, index) => (
            <CarrouselImagePreview
              key={sources + '_' + index}
              src={imageSrc}
              className={`${mainSource === index ? styles.galleryItemBorder : ""}`}
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
