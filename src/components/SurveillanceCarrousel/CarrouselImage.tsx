import { NavLink as RouterLink, generatePath } from 'react-router-dom';
import Link from '@mui/material/Link';
import { ImageProps } from 'ts/types';
import APP_URLS from 'enums/urls';
import TitleContainer from './TitleContainer';
import styles from './SurveillanceCarousel.module.scss';

function CarrouselImage({ id, src, title, status }: ImageProps) {
  return (
    <div className={styles.mainImageContainer}>
      <img src={src} className={styles.image} />
      <TitleContainer title={title} status={status} />
      <div className={styles.hoverState}>
        <Link
          component={RouterLink}
          to={generatePath(APP_URLS.devices, {
            peripheralId: id,
            peripheralName: title,
          })}
          color="inherit"
          underline="none"
          className={styles.hoverStateLink}
        >
          View device
        </Link>
      </div>
    </div>
  );
}

export default CarrouselImage;
