import { NavLink as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import TitleContainer from 'components/SurveillanceCarousel/TitleContainer/TitleContainer';
import { ImageProps } from 'ts/types';
import APP_URLS from 'enums/urls';
import { generatePath } from 'utils/router';
import styles from './CarouselImage.module.scss';
import AnnotationsCanvas from 'components/AnnotationsCanvas/AnnotationsCanvas.tsx';

function CarouselImage({ id, src, title, status, detections }: ImageProps) {
  return (
    <div className={styles.root}>
      <AnnotationsCanvas
        src={src}
        detections={detections}
        stylesImage={styles.image}
        showBoundingBoxes={false}
        showLabels={false}
      />
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

export default CarouselImage;
