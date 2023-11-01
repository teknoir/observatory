import { NavLink as RouterLink, generatePath } from "react-router-dom";
import Link from "@mui/material/Link";
import { ImageProps } from "ts/types"
import APP_URLS from "enums/urls";
import styles from "./SurveillanceCarousel.module.scss"

function CarrouselImage({
  id,
  src,
  title
}: ImageProps) {
  return (
    <div className={styles.mainImageContainer}>
      <img
        src={src}
        className={styles.image}
      />
      <div className={styles.titleContainer}>
        <p className={styles.titleText}>
          {title}
        </p>
        <div className={styles.titleStatusIndicator}></div>
      </div>
      <div className={styles.hoverState}>
        {/* TODO: Replace url to be dynamic */}
        <Link
          component={RouterLink}
          to={generatePath(APP_URLS.devices, {
            peripheralId: id,
            peripheralName: title,
          })}
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
