import { NavLink as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import TitleContainer from 'components/SurveillanceCarousel/TitleContainer/TitleContainer';
import { ImageProps } from 'ts/types';
import APP_URLS from 'enums/urls';
import { generatePath } from 'utils/router';
import styles from './CarouselImage.module.scss';

function CarouselImageMobile({ id, src, title, status }: ImageProps) {
  return (
    <div className={styles.root}>
      <Link
        component={RouterLink}
        to={generatePath(APP_URLS.devices, {
          peripheralId: id,
          peripheralName: title,
        })}
        color="inherit"
        underline="none"
      >
        <img src={src} className={styles.image} />
        <TitleContainer title={title} status={status} />
      </Link>
    </div>
  );
}

export default CarouselImageMobile;
