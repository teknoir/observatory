import { ImageProps } from "ts/types"
import styles from "./SurveillanceCarousel.module.scss"

function CarrouselImage({ src }: ImageProps) {
  return (
    <div className={styles.mainImageContainer}>
      <img
        src={src}
        className={styles.mainImage}
      />
      <div className={styles.titleContainer}>
        <p className={styles.titleText}>
          {src}
        </p>
        <div className={styles.titleStatusIndicator}></div>
      </div>
    </div>
  )
}

export default CarrouselImage
