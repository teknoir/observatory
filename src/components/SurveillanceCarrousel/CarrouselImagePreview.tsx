import { forwardRef } from 'react';
import { ImagePreviewProps } from 'ts/types';
import classNames from 'classnames';
import styles from "./SurveillanceCarousel.module.scss"

const CarrouselImagePreview = forwardRef<HTMLImageElement, ImagePreviewProps>(({
  src,
  className = '',
  onClick = () => { }
}: ImagePreviewProps, ref) => (
  <>
    <div className={styles.carouselImagePreviewContainer}>
      <span className={styles.carouselImagePreviewTitle}>
        asdfasdf
      </span>
      <img
        src={src}
        className={classNames(styles.carouselImagePreview, className)}
        onClick={onClick}
        ref={ref}
      />
    </div>
  </>
))

export default CarrouselImagePreview;
