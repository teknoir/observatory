import { forwardRef, useState } from 'react';
import { ImagePreviewProps } from 'ts/types';
import classNames from 'classnames';
import styles from "./SurveillanceCarousel.module.scss"
import { NavLink as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import APP_URLS from "enums/urls";

const CarrouselImagePreview = forwardRef<HTMLImageElement, ImagePreviewProps>(({
  src,
  className = '',
  onClick = () => { }
}: ImagePreviewProps, ref) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={styles.imagePreviewContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
      <div className={isHovered ? styles.hoverState : styles.hoverStateHide}>
        {/* TODO: Replace url to be dynamic */}
        <Link
          component={RouterLink}
          to={APP_URLS.alerts}
          color="inherit"
          underline="none"
        >
          View device
        </Link>
      </div>
    </div>
  )
})

export default CarrouselImagePreview;
