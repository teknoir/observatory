import { ImageProps } from "ts/types"
import styles from "./SurveillanceCarousel.module.scss"
import classNames from "classnames"

function CarrouselImage({ src }: ImageProps) {
  return (
    <div className={styles.imageContainer}>
      <img
        src={src}
        className={classNames(styles.image, styles.imageFullWidth)}
      />
      <span className={styles.title}>
        Front Parking North
        <div className={styles.titleStatusIndicator}></div>
      </span>
    </div>
  )
}

export default CarrouselImage
