import { ImageProps } from "ts/types"
import styles from "./SurveillanceCarousel.module.scss"
import { useState } from "react"
import { NavLink as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import APP_URLS from "enums/urls";

function CarrouselImage({ src }: ImageProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={styles.mainImageContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={src}
        className={styles.image}
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
}

export default CarrouselImage
