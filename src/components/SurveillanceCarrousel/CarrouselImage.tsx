import { NavLink as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import { ImageProps } from "ts/types"
import APP_URLS from "enums/urls";
import styles from "./SurveillanceCarousel.module.scss"

function CarrouselImage({ src }: ImageProps) {
  return (
    <div className={styles.mainImageContainer}>
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
      <div className={styles.hoverState}>
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
