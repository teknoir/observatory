import { forwardRef, memo } from 'react';
import { NavLink as RouterLink, generatePath } from 'react-router-dom';
import classNames from 'classnames';
import Link from '@mui/material/Link';
import { ImagePreviewProps } from 'ts/types';
import APP_URLS from 'enums/urls';
import styles from './SurveillanceCarousel.module.scss';

const CarrouselImagePreview = forwardRef<HTMLImageElement, ImagePreviewProps>(
  (
    { id, src, title, className = '', onClick = () => {} }: ImagePreviewProps,
    ref
  ) => {
    return (
      <div className={styles.imagePreviewContainer}>
        <img
          src={src}
          className={classNames(styles.image, className)}
          onClick={onClick}
          ref={ref}
        />
        <div className={styles.titleContainer}>
          <p className={styles.titleText}>{title}</p>
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
    );
  }
);

const CarrouselImagePreviewMemo = memo(CarrouselImagePreview);
export default CarrouselImagePreviewMemo;
