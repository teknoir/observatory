import { NavLink as RouterLink, generatePath } from 'react-router-dom';
import Link from '@mui/material/Link';
import TitleContainer from 'components/SurveillanceCarousel/TitleContainer/TitleContainer';
import { ImageProps } from 'ts/types';
import APP_URLS from 'enums/urls';
import styles from './CarouselImage.module.scss';

function CarouselImage({ id, src, title, status }: ImageProps) {
  return (
    <>
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
    </>
  );
}

export default CarouselImage;
