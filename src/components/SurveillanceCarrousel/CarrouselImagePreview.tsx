import { forwardRef } from 'react';
import { ImagePreviewProps } from 'ts/types';
import classNames from 'classnames';
import styles from "./SurveillanceCarousel.module.scss"

const CarrouselImagePreview = forwardRef<HTMLImageElement, ImagePreviewProps>(({
  src,
  className = '',
  onClick = () => { }
}: ImagePreviewProps, ref) => (
  <div className={styles.imageContainer}>
    <img
      src={src}
      className={classNames(styles.image, className)}
      onClick={onClick}
      ref={ref}
    />
    <span className={styles.title}>
      Front Parking North
      <div className={styles.titleStatusIndicator}></div>
    </span>
  </div>
))

export default CarrouselImagePreview;
