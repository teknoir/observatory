import { ImageProps } from "ts/types"
import styles from "./SurveillanceCarousel.module.scss"

function CarrouselImage({ src }: ImageProps) {
  return (
    <img
      className={styles.carouselImage}
      src={src}
    />
  )
}

export default CarrouselImage
