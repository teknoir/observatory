import { forwardRef } from 'react';
import { ImagePreviewProps } from 'ts/types';
import classNames from 'classnames';
import styles from "./SurveillanceCarousel.module.scss"

const CarrouselImagePreview = forwardRef<HTMLImageElement, ImagePreviewProps>(({
  src,
  className = '',
  onClick = () => { }
}: ImagePreviewProps, ref) => (
  <div className={styles.imagePreviewContainer}>
    <img
      src={src}
      className={classNames(styles.image, className)}
      onClick={onClick}
      ref={ref}
    />
    <div className={styles.titleContainer}>
      <p className={styles.titleText}>
        {src}
      </p>
      <div className={styles.titleStatusIndicator}></div>
    </div>
  </div>
))

export default CarrouselImagePreview;
